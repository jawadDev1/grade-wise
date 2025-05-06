import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Connect } from "@/db/connection";
import { serializeMongooseDocument } from "@/lib/utils";
import { ReviewModel } from "@/models/Review";
import { GoogleGenerativeAI } from "@google/generative-ai";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const review = async ({ assignmentText, criteria, studentFileText }) => {
  let retries = 3;
  while (retries > 0) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
      ### Assignment Instructions:
      ${assignmentText}
      
      ### Student Submission:
      ${studentFileText}
      
      Make sure not to exceed the given criteria range. Example: If the range is 0-4, assign marks only within this range.

      ### Grading Criteria:
      1. **Plagiarism (0-${criteria["plagiarism"]} points)**
      2. **Relevance (0-${criteria["relevance"]} points)**
      3. **Grammar (0-${criteria["grammar"]} points)**
      4. **Content Quality (0-${criteria["content_quality"]} points)**

      ### Provide JSON Output:
      {
        "plagiarism": 2,
        "relevance": 9,
        "grammar": 4,
        "content_quality": 8,
        "feedback": "Your assignment is well-structured, but there are minor grammatical errors."
      }
      `;

      const result = await model.generateContent(prompt);
      let responseText = await result.response.text();

      // Extract valid JSON using regex
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("Invalid JSON response from AI");

      let parsedResponse = JSON.parse(jsonMatch[0]);

      // **Ensure values are within the defined range**
      parsedResponse.plagiarism = Math.min(
        Math.max(parsedResponse.plagiarism, 0),
        criteria["plagiarism"]
      );
      parsedResponse.relevance = Math.min(
        Math.max(parsedResponse.relevance, 0),
        criteria["relevance"]
      );
      parsedResponse.grammar = Math.min(
        Math.max(parsedResponse.grammar, 0),
        criteria["grammar"]
      );
      parsedResponse.content_quality = Math.min(
        Math.max(parsedResponse.content_quality, 0),
        criteria["content_quality"]
      );

      return parsedResponse;
    } catch (error) {
      if (error.status === 429) {
        console.warn(`Rate limit hit. Retrying in ${4 ** (3 - retries)}s...`);
        await delay(4 ** (3 - retries) * 1000);
        retries--;
      } else {
        console.error("Gemini AI Error:", error);
        throw error;
      }
    }
  }
  throw new Error("Exceeded maximum retries due to rate limit.");
};

export const createReview = async (data) => {
  await Connect();

  const review = await ReviewModel.create(data);

  return serializeMongooseDocument(review);
};

export const getStudentReviews = async () => {
  await Connect();
  const session = await getServerSession(authOptions);

  const pipeline = [
    {
      $match: {
        student_id: new mongoose.mongo.ObjectId(session.user.id),
      },
    },
    {
      $lookup: {
        from: "assignments",
        localField: "assignment_id",
        foreignField: "_id",
        as: "assignment",
        pipeline: [
          {
            $project: { _id: 0, title: 1, criteria: 1 },
          },
        ],
      },
    },
    { $sort: { created_at: -1 } },
    {
      $project: {
        title: "$$ROOT.assignment.title",
        criteria: "$$ROOT.assignment.criteria",
        marks: 1,
        review: 1,
      },
    },
  ];

  const reviews = await ReviewModel.aggregate(pipeline);

  return reviews;
};

export const getReviewDetails = async (id) => {
  await Connect();
  const session = await getServerSession(authOptions);

  const pipeline = [
    {
      $match: {
        _id: new mongoose.mongo.ObjectId(id),
        student_id: new mongoose.mongo.ObjectId(session.user.id),
      },
    },
    {
      $lookup: {
        from: "assignments",
        localField: "assignment_id",
        foreignField: "_id",
        as: "assignment",
        pipeline: [
          {
            $project: { _id: 0, title: 1, criteria: 1 },
          },
        ],
      },
    },

    {
      $project: {
        title: "$$ROOT.assignment.title",
        criteria: "$$ROOT.assignment.criteria",
        marks: 1,
        review: 1,
      },
    },
  ];

  const review = await ReviewModel.aggregate(pipeline);

  return review[0];
};
