import ReviewPage from "@/components/pages/ReviewPage/Index";
import React from "react";

const page = async ({ params }) => {
  const { id } = await params;
  return <ReviewPage id={id} />;
};

export default page;
