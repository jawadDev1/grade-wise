"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DevTool } from "@hookform/devtools";

import { FileUpload } from "../ui/FileUpload";
import { StudentMultiSelect } from "../ui/SelectInput";
import { generateResponse } from "@/helpers/generateResponse";
import { useRouter } from "next/navigation";
import { notifySuccess } from "@/lib/utils";
import { assignment_schema } from "@/schemas";

const initialState = {
  title: "",
  description: "",
  deadline: "",
  criteria: {
    plagiarism: 2,
    relevance: 2,
    grammar: 2,
    content_quality: 4,
  },
};

export default function AssignmentForm({
  studentsList,
  action,
  defaultValues = initialState,
  id,
  type = "Create",
  classId,
}) {
  const defaultCriteria = [
    { label: "Plagiarism", name: "plagiarism", marks: 2 },
    { label: "Relevance", name: "relevance", marks: 2 },
    { label: "Grammar", name: "grammar", marks: 2 },
    { label: "Content Quality", name: "content_quality", marks: 4 },
  ];

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(
      z.object({
        title: z.string().min(1, "Title is required"),
        description: z.string().min(1, "Description is required"),
        deadline: z.string().min(1, "Deadline is required"),
        assignment: z.string().min(1, "Assignment file is required."),
        criteria: z.object({
          plagiarism: z.number().min(1, "Plagirism marks is required"),
          relevance: z.number().min(1, "Relevance marks is required"),
          grammar: z.number().min(1, "Grammar marks is required"),
          content_quality: z
            .number()
            .min(1, "Content Quality marks is required"),
        }),
        students: z.array(z.string()).min(1, "Choose atleast 1 student."),
      })
    ),
    defaultValues,
  });

  const onSubmit = async (data) => {
    try {
      data.class_id = classId;
      const response = await generateResponse(action(data, id));
      const result = await response.json();

      notifySuccess(result?.data.message);
      // router.refresh();
      router.back();
    } catch (error) {
      console.log("Error ============> ", error);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto p-6">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          {type} Assignment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      className="w-full resize-none h-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deadline</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="assignment"
              render={({ field }) => <FileUpload field={field} form={form} />}
            />

            {defaultCriteria.map((item) => (
              <FormField
                key={item.name}
                control={form.control}
                name={`criteria.${item.name}`}
                render={({ field }) => (
                  <FormItem className="flex items-center gap-4">
                    <span className="flex-grow">{item.label}</span>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        {...field}
                        value={field.value ?? 0}
                        onChange={(e) => {
                          const value = Number(e.target.value) || 0;
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <span className="text-sm">marks</span>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <div>
              <FormField
                control={form.control}
                name="students"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Students</FormLabel>
                    <FormControl>
                      <StudentMultiSelect
                        data={studentsList}
                        name="students"
                        control={form.control}
                        label="Select Students"
                        required
                        value={field.value}
                        onChange={field.onChange}
                        error={form.errors?.students?.message}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* <DevTool control={form.control} /> */}
            <Button type="submit" className="w-full">
              Assign
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
