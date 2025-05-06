"use client";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function StudentCard({ student, className, ...props }) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{student.name}</CardTitle>
          <CardDescription>
            @{student.username} - {student.role}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex items-center space-x-4">
              <div>
                <h3 className="font-semibold">Email:</h3>
                <p>{student.email}</p>
              </div>
              <div>
                <h3 className="font-semibold">Gender:</h3>
                <p>{student.gender}</p>
              </div>
            </div>
            <div className="mt-4 flex space-x-8">
              <div className="text-center">
                <h4 className="text-lg font-semibold">
                  {student.pending_assignments?.length}
                </h4>
                <p className="text-sm text-gray-500">Pending Assignments</p>
              </div>
              <div className="text-center">
                <h4 className="text-lg font-semibold">
                  {student.completed_assignments?.length}
                </h4>
                <p className="text-sm text-gray-500">Completed Assignments</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
