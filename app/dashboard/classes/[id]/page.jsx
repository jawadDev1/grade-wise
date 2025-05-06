import ClassDetailPage from "@/components/pages/ClassDetailPage/Index";
import { getClassDetails } from "@/services/teacher";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({ params }) => {
  const { id } = await params;
  const res = await getClassDetails(id);
  const { classDetail } = await res.json();

  if (!classDetail) {
    notFound();
  }

  return (
    <>
      <ClassDetailPage classDetail={classDetail} />
    </>
  );
};

export default page;
