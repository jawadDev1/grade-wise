"use client";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { generateResponse } from "@/helpers/generateResponse";
import { ACTIONS } from "@/actions";
import { cn } from "@/lib/utils";

export function FileUpload({ form, field }) {
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) setFile(file);
  };

  const handleFileUpload = async () => {
    setLoading(true);
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "documents");

    const response = await generateResponse(ACTIONS.USER.UPLOAD_FILE(formData));
    const { data } = await response.json();

    if (data) {
      form.setValue("assignment", data.data);
    }

    setLoading(false);
    return;
  };

  return (
    <div className="flex flex-col w-full">
      <Label className="text-sm font-medium">Assignment File</Label>
      <div className="flex gap-3 w-full">
        <div className="flex-1">
          <Input
            type="text"
            readOnly
            value={file.name || field?.value || ""}
            placeholder="No file chosen"
            className="bg-transparent border flex-1 border-gray-300 rounded-md px-3 py-4 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <span className="text-xs text-red-600 mt-2">
            {form?.formState.errors?.assignment &&
              form?.formState.errors?.assignment.message}
          </span>
        </div>
        <Label className="flex justify-center  items-center px-4 py-1 h-fit border border-gray-300 text-gray-700 dark:text-gray-300 rounded cursor-pointer">
          {file?.name ? "Change File" : "Select File"}

          <input
            type="file"
            className="hidden"
            accept=".doc,.docx"
            onChange={handleFileChange}
          />
        </Label>

        <Button
          type="button"
          className={cn("px-4 py-2 text-[16px]", { "bg-gray-400": loading })}
          disabled={!file || loading}
          onClick={handleFileUpload}
        >
          Upload
        </Button>
      </div>
    </div>
  );
}
