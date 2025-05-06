import AssignmentUpdatePage from "@/components/pages/AssignmentUpdatePage/Index";
import React from "react";

const page = async ({ params }) => {
  const id = await params;

  return <AssignmentUpdatePage id={id} />;
};

export default page;
