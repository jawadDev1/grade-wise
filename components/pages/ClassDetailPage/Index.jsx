// app/classes/[id]/page.tsx

"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const mockAssignments = [
  { id: 1, title: "Assignment 1", description: "Solve algebra problems." },
  {
    id: 2,
    title: "Assignment 2",
    description: "Read Chapter 3 and summarize.",
  },
];

const mockStudents = [
  { id: 1, name: "Alice Johnson" },
  { id: 2, name: "Bob Smith" },
  { id: 3, name: "Charlie Brown" },
];

export default function ClassDetailPage({ classDetail }) {
  const [tab, setTab] = useState("classwork");
  const { name } = classDetail;

  const { assignments, students } = classDetail;

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
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="classwork">Classwork</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
        </TabsList>

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
                  <Link href={`/dashboard/assignments/assignment-detail/${assignment._id}`}>
                    <Button className="mt-4">View Assignment</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="students">
          <div className="space-y-4">
            {students.map((student) => (
              <Card
                key={student._id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <p className="text-lg font-medium">{student.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
