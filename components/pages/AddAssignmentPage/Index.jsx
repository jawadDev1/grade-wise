import { ACTIONS } from "@/actions";

import AssignmentForm from "@/components/modules/AssignmentForm";
import { generateResponse } from "@/helpers/generateResponse";
import { SERVICES } from "@/services";
import { getClassStudents } from "@/services/user";

import React from "react";

const AddAssignmentPage = async ({ classId }) => {
  const res = await getClassStudents(classId);
  const { students } = await res.json();

  return (
    <AssignmentForm
      studentsList={students}
      action={ACTIONS.TEACHER.CREATE_ASSIGNMENT}
      classId={classId}
    />
  );
};

export default AddAssignmentPage;
