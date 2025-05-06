import { ACTIONS } from "@/actions";
import AssignmentForm from "@/components/modules/AssignmentForm";
import { generateResponse } from "@/helpers/generateResponse";
import { SERVICES } from "@/services";
import React from "react";

const AssignmentUpdatePage = async ({ id }) => {
  const response = await generateResponse(
    SERVICES.TeacherService.getAssignmentDetails({
      id,
      filters: [{ $project: { teacher: 0, _id: 0 } }],
    })
  );

  const { data } = await response.json();

  const studentsResponse = await generateResponse(
    SERVICES.UserService.getStudents([
      { $addFields: { label: "$$ROOT.name", value: "$$ROOT._id" } },
      { $project: { label: 1, value: 1 } },
    ])
  );

  const { data: students } = await studentsResponse.json();

  return (
    <>
      <AssignmentForm
        action={ACTIONS.TEACHER.UPDATE_ASSIGNMENT}
        id={id}
        studentsList={students}
        defaultValues={{ ...data, deadline: data?.deadline.slice(0, 16) }}
        type="Update"
      />
    </>
  );
};

export default AssignmentUpdatePage;
