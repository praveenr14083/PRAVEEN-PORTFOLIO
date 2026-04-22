import { z } from "zod";

export const educationSchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  institute: z.string().min(1, "Institute is required"),
  location: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional().nullable(),
  isCurrent: z.boolean().default(false),
  grade: z.string().optional(),
  gradeType: z.enum(["CGPA", "Percentage", "GPA"]).optional(),
});

export type EducationInput = z.infer<typeof educationSchema>;
