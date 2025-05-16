import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { generateResponse } from "@/helpers/generateResponse";
import { SERVICES } from "@/services";
import { notFound } from "next/navigation";

const ReviewPage = async ({ id }) => {
  const response = await generateResponse(
    SERVICES.AIService.getReviewDetails(id)
  );

  const { data } = await response.json();

  if (!data) notFound();

  const { title, review, marks, student_assignment } = data;

  return (
    <div className="rounded-xl py-6 px-5 max-w-[800px] mx-auto flex flex-col border border-box-border bg-box-bg shadow-lg shadow-box-shadow relative overflow-hidden">
      <h2 className="text-lg md:text-xl font-semibold text-heading-2 hover:text-blue-700">
        {title}
      </h2>

      <div className="space-y-4 mt-4">
        <div className="space-y-2">
          <p>
            <strong>Review:</strong>
          </p>
          <p>{review}</p>
        </div>
        <p>
          <strong>Marks:</strong>
        </p>
        <ul className="list-disc ml-6">
          {Object?.entries(marks).map(([key, value]) => (
            <li key={key} className="capitalize">
              {key}: {value} Marks
            </li>
          ))}
        </ul>

        <Button variant="secondary">
          <a href={student_assignment} download>
            Download Submission
          </a>
        </Button>
      </div>
    </div>
  );
};

export default ReviewPage;
