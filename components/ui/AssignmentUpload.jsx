"use client";
import { ACTIONS } from "@/actions";
import { generateResponse } from "@/helpers/generateResponse";
import { Text } from "@radix-ui/themes/dist/cjs/components/callout";
import React, { useState } from "react";
import { Label } from "./label";
import { Input } from "./input";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { cn, notifySuccess } from "@/lib/utils";

const AssignmentUpload = ({ assignment, criteria, assignmentId, class_id }) => {
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) setFile(file);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "documents");

      const response = await generateResponse(
        ACTIONS.USER.UPLOAD_FILE(formData)
      );
      const { data } = await response.json();

      const res = await ACTIONS.TEACHER.REVIEW_ASSIGNMENT({
        assignment,
        studentFile: data.data,
        criteria,
        assignment_id: assignmentId,
        class_id
      });

      setLoading(false);
      notifySuccess("Assignment submitted successfully");
      router.push("/dashboard/progress");

      return;
    } catch (error) {
      setLoading(false);
      console.log("Error ============> ", error);
    }
  };

  return (
    <div className="mt-6 p-4 border rounded-lg">
      <Text as="p" className="text-lg font-semibold">
        Submit Your Assignment
      </Text>
      <form onSubmit={handleFileUpload} className="mt-4">
        <Label htmlFor="file-upload">Upload File</Label>
        <Input
          type="file"
          id="file-upload"
          onChange={handleFileChange}
          required
          accept=".doc,.docx"
        />
        <Button
          type="submit"
          className={cn("mt-2", { "bg-gray-400": loading })}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AssignmentUpload;
