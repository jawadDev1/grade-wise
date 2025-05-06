import Typography from "@/components/common/Typography";
import { ProgressCard } from "@/components/ui/ProgressCard";
import { generateResponse } from "@/helpers/generateResponse";
import { formatMarks } from "@/lib/utils";
import { SERVICES } from "@/services";
import { Section } from "@radix-ui/themes";

const ProgressPage = async () => {
  const res = await generateResponse(SERVICES.AIService.getStudentReviews());

  const { data } = await res.json();

  return (
    <Section>
      <Typography className={"text-center mb-4"} variant="h1">
        Progress
      </Typography>
      <div className="grid grid-cols-1  gap-6 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {data?.length > 0 &&
          data.map(({ _id: id, title, marks, criteria, review }, i) => (
            <ProgressCard
              id={id}
              key={i}
              review={review}
              title={title[0]}
              marks={formatMarks(criteria[0], marks)}
            />
          ))}
      </div>
    </Section>
  );
};

export default ProgressPage;
