"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { SERVICES } from "@/services";
import { getServerSession } from "next-auth";

import { parseText } from "@/lib/utils";
import {
  createClass,
  deleteClass,
  getClassStudentsIds,
  updateClass,
} from "@/services/teacher";
import { revalidatePath } from "next/cache";

export const CREATE_ASSIGNMENT = async (data) => {
  "use server";
  const session = await getServerSession(authOptions);
  const studentsRes = await getClassStudentsIds(data?.class_id);
  const { students } = await studentsRes.json();
  const result = await SERVICES.TeacherService.createAssignment({
    ...data,
    teacher_id: session?.user.id,
    students,
  });

  revalidatePath(`/dashboard/classes/${data?.class_id}`);

  return {
    success: true,
    message: "Assignment created successfully",
    data: result,
  };
};

export const UPDATE_ASSIGNMENT = async (data, id) => {
  "use server";
  const session = await getServerSession(authOptions);

  const result = await SERVICES.TeacherService.updateAssignment(
    {
      ...data,
      teacher_id: session?.user.id,
    },
    id
  );

  return {
    success: true,
    message: "Assignment updated successfully",
    data: result,
  };
};

export const DELETE_ASSIGNMENT = async (id) => {
  "use server";

  const { assignment, ...result } =
    await SERVICES.TeacherService.deleteAssignment(id);

  revalidatePath(`/dashboard/classes/${result?.assignment?.class_id}`);

  return {
    success: true,
    message: "Assignment deleted successfully",
    data: result,
  };
};

export const REVIEW_ASSIGNMENT = async ({
  assignment,
  studentFile,
  criteria,
  assignment_id,
  class_id,
}) => {
  "use server";
  const assignmentText = await parseText(assignment);
  const studentFileText = await parseText(studentFile);

  const { feedback: review, ...marks } = await SERVICES.AIService.review({
    assignmentText,
    studentFileText,
    criteria,
  });

  const session = await getServerSession(authOptions);
  const data = {
    review,
    assignment_id,
    marks,
    student_id: session?.user.id,
    student_assignment: studentFile,
    class_id,
  };

  await SERVICES.AIService.createReview(data);

  revalidatePath(`/dashboard/assignments/assignment-detail/${assignment_id}`);

  return {
    success: true,
    message: "Assignment Reviewd successfully",
    data: {},
  };
};

export const CREATE_CLASS = async (data) => {
  const res = await createClass(data);

  revalidatePath("/dashboard");

  return await res.json();
};

export const UPDATE_CLASS = async (data, id) => {
  const res = await updateClass(data, id);

  revalidatePath(`/dashboard/classes/${id}`);

  return await res.json();
};

export const DELETE_CLASS = async (id) => {
  const res = await deleteClass(id);

  revalidatePath(`/dashboard/classes`);

  return await res.json();
};
