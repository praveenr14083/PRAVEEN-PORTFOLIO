import { z } from "zod";

export const experienceSchema = z.object({
  role: z.string().min(1, "Role is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().optional(),
  employmentType: z.enum(["Full-Time", "Part-Time", "Internship", "Contract", "Freelance"]),
  description: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional().nullable(),
  isCurrent: z.boolean().default(false),
});

export type ExperienceInput = z.infer<typeof experienceSchema>;
