import AddAssignmentPage from "@/components/pages/AddAssignmentPage/Index";
import React from "react";

const page = async ({ params }) => {
  const { id } = await params;

  return <AddAssignmentPage classId={id} />;
};

export default page;
