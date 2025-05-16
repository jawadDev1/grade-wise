"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { class_schema } from "@/schemas/classSchema";
import { CREATE_CLASS, UPDATE_CLASS } from "@/actions/teacher";
import { notifyError, notifySuccess } from "@/lib/utils";
import { Button } from "../ui/button";

const initialState = {
  name: "",
  subject: "",
  description: "",
};

const ClassModal = ({
  children = "Create a New Class",
  defaultValues = initialState,
  type = "create",
  id = "",
}) => {
  const [open, setOpen] = useState(false);

  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(class_schema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    const action = type == "create" ? CREATE_CLASS : UPDATE_CLASS;
    data.created_by = session?.user.id;
    const res = await action(data, id);

    if (res?.success) {
      notifySuccess(res.message);
    } else {
      notifyError("Internal server error");
    }

    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-md" onClick={() => setOpen(true)}>
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Class</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-heading-3 font-medium text-gray-700 mb-2"
            >
              Name
            </label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-heading-3 text-red-600 mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-heading-3 font-medium text-gray-700 mb-2"
            >
              Subject
            </label>
            <Input id="subject" {...register("subject")} />
            {errors.subject && (
              <p className="text-heading-3 text-red-600 mt-1">
                {errors.subject.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-heading-3 font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register("description")}
              className="w-full resize-none h-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.description && (
              <p className="text-heading-3 text-red-600 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full capitalize">
            {type}
          </Button>

          {/* <DevTool control={control} /> */}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ClassModal;
