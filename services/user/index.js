import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Connect } from "@/db/connection";
import { serializeMongooseDocument } from "@/lib/utils";
import { UserModel } from "@/models";
import { ClassModel } from "@/models/Class";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const getStudents = async (filters = []) => {
  await Connect();
  const pipeline = [{ $match: { role: "STUDENT" } }, ...filters];
  const students = await UserModel.aggregate(pipeline);

  return students;
};

export const joinClass = async (id) => {
  try {
    await Connect();

    const { user } = await getServerSession(authOptions);

    const teacherClass = await ClassModel.findByIdAndUpdate(
      id,
      {
        $push: { students: user.id },
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Class joined successfully.",
      class: serializeMongooseDocument(teacherClass),
    });
  } catch (error) {
    console.log("Error in joinClass :: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getClassStudents = async (id) => {
  try {
    await Connect();

    const pipeline = [
      {
        $match: {
          _id: new mongoose.mongo.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "students",
          foreignField: "_id",
          as: "students",
          pipeline: [
            { $addFields: { label: "$$ROOT.name", value: "$$ROOT._id" } },
            { $project: { label: 1, value: 1 } },
          ],
        },
      },
      {
        $project: {
          students: 1,
          _id: 0,
        },
      },
    ];

    const students = await ClassModel.aggregate(pipeline);

    return NextResponse.json({
      success: true,
      message: "Class joined successfully.",
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
