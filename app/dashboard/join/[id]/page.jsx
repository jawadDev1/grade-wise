import { notifyError, notifySuccess } from "@/lib/utils";
import { joinClass } from "@/services/user";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params }) => {
  const { id } = await params;

  const res = await joinClass(id);
  const data = await res.json();

  // if (data?.success) {
  //   notifySuccess(data.message);
  // } else {
  //   notifyError("Internal server error");
  // }

  redirect("/dashboard");

  return <div>page</div>;
};

export default page;
