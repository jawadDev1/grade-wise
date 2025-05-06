import Typography from "@/components/common/Typography";
import { StudentCard } from "@/components/ui/StudentCard";
import { generateResponse } from "@/helpers/generateResponse";
import { SERVICES } from "@/services";

import React from "react";

const StudentsPage = async () => {
  const res = await generateResponse(SERVICES.TeacherService.getStudents());
  const { data } = await res.json();

  return (
    <section>
      <Typography className={"text-center"} variant="h1">
        Students
      </Typography>
      <div className="grid p-4 mt-7 gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data?.length > 0 &&
          data.map((student, i) => <StudentCard key={i} student={student} />)}
      </div>
    </section>
  );
};

export default StudentsPage;
