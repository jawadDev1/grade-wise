"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ClassModal from "@/components/modules/ClassModal";
import { PencilIcon } from "lucide-react";
import { Trash } from "lucide-react";
import ShareButton from "@/components/ui/ShareButton";
import { DELETE_CLASS } from "@/actions/teacher";
import { notifyError, notifySuccess } from "@/lib/utils";
import { useRouter } from "next/navigation";
import useIsCreator from "@/hooks/useIsCreator";

export default function ClassDetailPage({ classDetail }) {
  const router = useRouter();
  const [tab, setTab] = useState("stream");

  const {
    assignments,
    students,
    name,
    subject,
    description,
    _id: id,
    created_by,
  } = classDetail;

  const isTeacher = useIsCreator(created_by);

  const initialState = {
    name: name,
    subject: subject,
    description: description,
  };

  const handleDelete = async (id) => {
    const res = await DELETE_CLASS(id);

    if (res?.success) {
      notifySuccess(res.message);
      router.push("/dashboard");
    } else {
      notifyError("Internal server error");
    }
  };

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold ">{name}</h1>
        <Link href={`/dashboard/assignments/add/${classDetail._id}`}>
          <Button>Create</Button>
        </Link>
      </div>

      <Tabs
        defaultValue="classwork"
        value={tab}
        onValueChange={setTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="stream">Stream</TabsTrigger>
          <TabsTrigger value="classwork">Classwork</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
        </TabsList>

        <TabsContent value="stream">
          <div className="space-y-4">
            {/* Class Info Header */}
            <div className="bg-white dark:bg-gray-950 border rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {classDetail.name}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Subject:{" "}
                    <span className="font-medium">{classDetail.subject}</span>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Created by:{" "}
                    <span className="font-medium">
                      {classDetail?.created_by?.name || "Unknown"}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Students Enrolled:{" "}
                    <span className="font-medium">
                      {classDetail?.students?.length || 0}
                    </span>
                  </p>
                </div>

                {/* Action Buttons */}
                {isTeacher && (
                  <div className="flex gap-2">
                    <ClassModal
                      defaultValues={initialState}
                      id={id}
                      type="update"
                    >
                      <PencilIcon size={20} />
                    </ClassModal>
                    <Button
                      className="bg-red-600 py-1 hover:bg-red-500"
                      onClick={() => handleDelete(id)}
                    >
                      <Trash size={49} />
                    </Button>
                    <ShareButton id={id} />
                  </div>
                )}
              </div>
              {/* Class Description */}
              <div className="mt-4 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {classDetail.description}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="classwork">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assignments.map((assignment) => (
              <Card
                key={assignment._id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <CardTitle>{assignment.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{assignment.description}</p>
                  <Link
                    href={`/dashboard/assignments/assignment-detail/${assignment._id}`}
                  >
                    <Button className="mt-4">View Assignment</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="students">
          <div className="space-y-4">
            {students.map(({ submitted = 0, ...student }) => (
              <Card
                key={student._id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <p className="text-lg font-medium">{student.name}</p>
                  <p>Total: {assignments.length}</p>
                  <p>Submitted: {submitted.length}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
