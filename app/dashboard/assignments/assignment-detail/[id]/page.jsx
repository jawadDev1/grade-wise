import AssignmentDetailPage from "@/components/pages/AssignmentDetailPage/Index";
import React from "react";

const page = async ({ params }) => {
  const { id } = await params;
  return <AssignmentDetailPage id={id} />;
};

export default page;
