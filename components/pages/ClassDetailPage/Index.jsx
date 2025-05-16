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
import { cn, notifyError, notifySuccess } from "@/lib/utils";
import { useRouter } from "next/navigation";
import useIsCreator from "@/hooks/useIsCreator";
import Image from "next/image";
import { AssignmentCard } from "@/components/ui/AssignmentCard";

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
    createdBy,
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
        {isTeacher && (
          <Link
            href={`/dashboard/assignments/add/${classDetail._id}`}
            className="ml-auto"
          >
            <Button>Create</Button>
          </Link>
        )}
      </div>

      <Tabs
        defaultValue="classwork"
        value={tab}
        onValueChange={setTab}
        className="w-full"
      >
        <TabsList
          className={cn("grid w-full grid-cols-3 mb-4", {
            "grid-cols-2": !isTeacher,
          })}
        >
          <TabsTrigger value="stream">Stream</TabsTrigger>
          <TabsTrigger value="classwork">Classwork</TabsTrigger>
          {isTeacher && <TabsTrigger value="students">Students</TabsTrigger>}
        </TabsList>

        <TabsContent value="stream">
          <div className="space-y-4 max-w-[900px] mx-auto bg-white dark:bg-gray-950 border rounded-2xl shadow-sm overflow-hidden">
            {/* Class Info Header */}
            <div>
              <Image
                src={classDetail?.cover_img ?? null}
                width={600}
                height={600}
                className="w-full h-[30vh] object-cover"
                alt={classDetail?.name}
              />
            </div>
            <div className=" p-6 ">
              <div className="flex items-start justify-between">
                <div className=" rounded-2xl shadow-lg transition-all duration-300">
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                    {classDetail.name}
                  </h2>

                  <div className="mt-4 space-y-2 text-base sm:text-lg text-gray-700 dark:text-gray-300">
                    <p>
                      <span className="font-semibold text-gray-800 dark:text-white">
                        Subject:
                      </span>{" "}
                      <span className="font-medium">{classDetail.subject}</span>
                    </p>
                    <p>
                      <span className="font-semibold text-gray-800 dark:text-white">
                        Teacher:
                      </span>{" "}
                      <span className="font-medium">
                        {createdBy[0]?.name || "Unknown"}
                      </span>
                    </p>
                    <p>
                      <span className="font-semibold text-gray-800 dark:text-white">
                        Students Enrolled:
                      </span>{" "}
                      <span className="font-medium">
                        {classDetail?.students?.length || 0}
                      </span>
                    </p>
                  </div>
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
                      className="bg-red-600  hover:bg-red-500"
                      onClick={() => handleDelete(id)}
                    >
                      <Trash size={49} />
                    </Button>
                    <ShareButton id={id} />
                  </div>
                )}
              </div>
              {/* Class Description */}
              <div className="mt-4 text-sm lg:text-lg text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {classDetail.description}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="classwork">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {assignments.map(({ title, deadline, description, _id: id }) => (
              <AssignmentCard key={id} {...{ title, deadline, description, id }} />
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
