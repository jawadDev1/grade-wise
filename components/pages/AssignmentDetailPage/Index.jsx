import { Text } from "@radix-ui/themes";
import { cn, formatDate, formatMarks } from "@/lib/utils";
import { generateResponse } from "@/helpers/generateResponse";
import { SERVICES } from "@/services";
import { redirect } from "next/navigation";
import AssignmentUpload from "@/components/ui/AssignmentUpload";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import NextLink from "@/components/common/NextLink";
import AssignmentActions from "@/components/ui/AssignmentActions";

const AssignmentDetailPage = async ({ id }) => {
  const response = await generateResponse(
    SERVICES.TeacherService.getAssignmentDetails({ id })
  );

  const { data } = await response.json();

  if (!data) redirect("/");

  const session = await getServerSession(authOptions);

  const { teacher, submissions, ...assignment } = data;

  const isTeacher = session.user?.id == teacher[0]?._id;

  const isPastDeadline = new Date() > new Date(assignment.deadline);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-4">{assignment.title}</h1>
        {isTeacher && <AssignmentActions id={id} />}
      </div>

      <Tabs defaultValue="instructions">
        <TabsList className="mb-6">
          <TabsTrigger value="instructions">Instructions</TabsTrigger>
          {isTeacher ? (
            <TabsTrigger value="submissions">Student Submissions</TabsTrigger>
          ) : null}
        </TabsList>

        <TabsContent value="instructions">
          <div className="space-y-4">
            <p>
              <strong>Description:</strong> {assignment.description}
            </p>
            <p>
              <strong>Deadline:</strong> {formatDate(assignment.deadline)}
            </p>
            <p>
              <strong>Criteria:</strong>
            </p>
            <ul className="list-disc ml-6">
              {Object.entries(assignment.criteria).map(([key, value]) => (
                <li key={key} className="capitalize">
                  {key}: {value} points
                </li>
              ))}
            </ul>

            {!isTeacher && (
              <>
                <Button variant="secondary">
                  <a href={assignment.assignment} download>
                    Download Assignment
                  </a>
                </Button>

                {isPastDeadline ? (
                  <p className="text-red-500">
                    Deadline passed. You can no longer submit.
                  </p>
                ) : (
                  <AssignmentUpload
                    assignment={assignment.assignment}
                    criteria={assignment.criteria}
                    assignmentId={id}
                  />
                )}
              </>
            )}
          </div>
        </TabsContent>

        {isTeacher && (
          <TabsContent value="submissions">
            <div className="space-y-4">
              {submissions?.length ? (
                submissions.map(({ student, ...sub }) => (
                  <div
                    key={sub._id}
                    className="border p-4 rounded-lg shadow-sm flex justify-between"
                  >
                    <div>
                      <p className="font-semibold ">{student[0].name}</p>
                      <p className="text-sm text-muted-foreground">
                        {student[0].email}
                      </p>
                      <p>{formatMarks(assignment.criteria, sub.marks)}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      View Submission
                    </Button>
                  </div>
                ))
              ) : (
                <p>No student submissions yet.</p>
              )}
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default AssignmentDetailPage;
