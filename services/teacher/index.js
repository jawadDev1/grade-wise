import { authOptions } from "@/app/api/auth/[...nextauth]/options";

import { Connect } from "@/db/connection";
import { serializeMongooseDocument } from "@/lib/utils";
import { UserModel } from "@/models";
import { AssignmentModel } from "@/models/Assignments";
import { ClassModel } from "@/models/Class";
import { ReviewModel } from "@/models/Review";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const createAssignment = async (data) => {
  await Connect();
  await AssignmentModel.create(data);

  return { success: true };
};

export const updateAssignment = async (data, id) => {
  await Connect();
  await AssignmentModel.findOneAndUpdate(
    { _id: new mongoose.mongo.ObjectId(id) },
    data,
    {
      new: true,
    }
  );

  revalidatePath(`/dashboard/assignments/assignment-detail/${id}`);

  return { success: true };
};

export const deleteAssignment = async (id) => {
  await Connect();
  const assignment = await AssignmentModel.findByIdAndDelete({
    _id: new mongoose.mongo.ObjectId(id),
  });

  return { success: true, assignment: serializeMongooseDocument(assignment) };
};

export const getAssignments = async (filters = []) => {
  await Connect();
  const session = await getServerSession(authOptions);
  const id = [new mongoose.mongo.ObjectId(session?.user.id)];
  const filter =
    session?.user.role === "STUDENT"
      ? [
          {
            $match: { students: { $in: id } },
          },
        ]
      : [];

  const pipeline = [
    { $match: {} },
    ...filter,
    { $sort: { created_at: -1 } },
    ...filters,
  ];

  let assignments = await AssignmentModel.aggregate(pipeline);
  const reviews = await ReviewModel.aggregate([
    { $match: { student_id: { $in: id } } },
    {
      $group: {
        _id: null,
        assignmentIds: { $push: "$$ROOT.assignment_id" },
        studentIds: { $push: "$$ROOT.student_id" },
      },
    },
    { $project: { _id: 0, assignmentIds: 1, studentIds: 1 } },
  ]);

  if (reviews.length > 0) {
    assignments = assignments.filter(
      (asg) =>
        !(
          reviews[0].assignmentIds
            .map((aid) => aid.toString())
            .includes(asg._id.toString()) &&
          reviews[0].studentIds
            .map((sid) => sid.toString())
            .includes(id[0].toString())
        )
    );
  }
  return assignments;
};

export const getAssignmentDetails = async ({ id, filters = [] }) => {
  await Connect();
  const _id = new mongoose.mongo.ObjectId(id);

  const pipeline = [
    { $match: { _id } },
    {
      $lookup: {
        from: "users",
        localField: "teacher_id",
        foreignField: "_id",
        as: "teacher",
      },
    },
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "assignment_id",
        as: "submissions",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "student_id",
              foreignField: "_id",
              as: "student",
            },
          },
        ],
      },
    },
    ...filters,
  ];
  const assignment = await AssignmentModel.aggregate(pipeline);

  return assignment[0];
};

export const getStudents = async () => {
  await Connect();

  const pipeline = [
    { $match: { role: "STUDENT" } },
    {
      $lookup: {
        from: "users",
        localField: "teacher_id",
        foreignField: "_id",
        as: "teacher",
      },
    },
    {
      $lookup: {
        from: "assignments",
        localField: "_id",
        foreignField: "students",
        as: "assignments",
      },
    },
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "student_id",
        as: "completed_assignments",
      },
    },
    {
      $addFields: {
        pending_assignments: {
          $filter: {
            input: "$assignments",
            as: "assignment",
            cond: {
              $not: {
                $in: [
                  "$$assignment._id",
                  "$completed_assignments.assignment_id",
                ],
              },
            },
          },
        },
      },
    },
    {
      $project: {
        name: 1,
        email: 1,
        gender: 1,
        pending_assignments: 1,
        completed_assignments: 1,
        username: 1,
        role: 1,
      },
    },
  ];
  const students = await UserModel.aggregate(pipeline);

  return students;
};

export const createClass = async (data) => {
  try {
    await Connect();
    const index = Math.floor(Math.random() * 12) + 1;
    data.cover_img = `/classes/bg-${index}.jpg`;
    const teacherClass = await ClassModel.create(data);

    return NextResponse.json({
      success: true,
      message: "Class created successfully.",
      data: { class: serializeMongooseDocument(teacherClass) },
    });
  } catch (error) {
    console.log("Error in createClass :: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateClass = async (data, id) => {
  try {
    await Connect();

    const teacherClass = await ClassModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    return NextResponse.json({
      success: true,
      message: "Class updated successfully.",
      data: { class: serializeMongooseDocument(teacherClass) },
    });
  } catch (error) {
    console.log("Error in updateClass :: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteClass = async (id) => {
  try {
    await Connect();

    const teacherClass = await ClassModel.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Class deleted successfully.",
      class: serializeMongooseDocument(teacherClass),
    });
  } catch (error) {
    console.log("Error in deleteClass :: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getClasses = async (id) => {
  try {
    await Connect();

    const { user } = await getServerSession(authOptions);
    const userId = new mongoose.Types.ObjectId(user?.id);
    const classes = await ClassModel.aggregate([
      {
        $facet: {
          teaching: [{ $match: { created_by: userId } }],
          learning: [{ $match: { students: { $in: [userId] } } }],
        },
      },
    ]);

    return NextResponse.json({
      success: true,
      message: "Classes fetched successfully.",
      classes: {
        teaching: classes[0]?.teaching,
        learning: classes[0]?.learning,
      },
    });
  } catch (error) {
    console.log("Error in getClasses :: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
      classes: [],
    });
  }
};

export const getClassDetails = async (id) => {
  try {
    await Connect();

    const pipeline = [
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },

      {
        $lookup: {
          from: "assignments",
          localField: "_id",
          foreignField: "class_id",
          as: "assignments",
        },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "class_id",
          as: "reviews",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "students",
          foreignField: "_id",
          as: "students",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "created_by",
          foreignField: "_id",
          as: "createdBy",
        },
      },
      {
        $addFields: {
          students: {
            $map: {
              input: "$students",
              as: "student",
              in: {
                $mergeObjects: [
                  "$$student",
                  {
                    submitted: {
                      $filter: {
                        input: "$reviews",
                        as: "review",
                        cond: {
                          $eq: ["$$review.student_id", "$$student._id"],
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      },
    ];

    const classDetail = await ClassModel.aggregate(pipeline);

    return NextResponse.json({
      success: true,
      message: "Classes fetched successfully.",
      classDetail: classDetail[0],
    });
  } catch (error) {
    console.log("Error in getClasses :: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
      classDetail: {},
    });
  }
};

export const getClassStudentsIds = async (classId) => {
  await Connect();
  try {
    const pipeline = [
      {
        $match: {
          _id: new mongoose.mongo.ObjectId(classId),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "students",
          foreignField: "_id",
          as: "students",
          pipeline: [{ $project: { _id: 1 } }],
        },
      },
      {
        $project: {
          students: {
            $map: {
              input: "$students",
              as: "s",
              in: "$$s._id",
            },
          },
          _id: 0,
        },
      },
    ];

    const students = await ClassModel.aggregate(pipeline);

    return NextResponse.json({
      success: true,
      message: "students fetched successfully.",
      students: students[0]?.students || [],
    });
  } catch (error) {
    console.log("Error in getClassStudents :: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
      students: [],
    });
  }
};
