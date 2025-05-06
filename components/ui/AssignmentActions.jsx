"use client";
import React from "react";
import { Button } from "./button";
import { PencilIcon } from "lucide-react";
import { Trash } from "lucide-react";
import { cn, notifyError, notifySuccess } from "@/lib/utils";
import NextLink from "../common/NextLink";
import { ACTIONS } from "@/actions";
import { generateResponse } from "@/helpers/generateResponse";
import { useRouter } from "next/navigation";

const AssignmentActions = ({ id, className }) => {
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      const res = await generateResponse(ACTIONS.TEACHER.DELETE_ASSIGNMENT(id));
      const result = await res.json();
      // router.refresh();
      router.back();
      notifySuccess(result?.data.message);
    } catch (error) {
      notifyError(error.message);
    }
  };

  return (
    <div className={cn("flex gap-3 items-center px-2", className)}>
      <NextLink href={`/dashboard/assignments/update/${id}`}>
        <Button size="sm">
          <PencilIcon size={20} />
        </Button>
      </NextLink>
      <Button
        className="bg-red-600 hover:bg-red-500"
        onClick={() => handleDelete(id)}
        size="sm"
      >
        <Trash />
      </Button>
    </div>
  );
};

export default AssignmentActions;
