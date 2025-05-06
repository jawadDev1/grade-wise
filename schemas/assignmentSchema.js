import * as z from "zod";

export const assignment_schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  deadline: z.string().min(1, "Deadline is required"),
  assignment: z.string().min(1, "Assignment file is required."),
  criteria: z.object({
    plagiarism: z.number().min(1, "Plagirism marks is required"),
    relevance: z.number().min(1, "Relevance marks is required"),
    grammar: z.number().min(1, "Grammar marks is required"),
    content_quality: z.number().min(1, "Content Quality marks is required"),
  }),
  students: z.array(z.string()).min(1, "Choose atleast 1 student."),
});
