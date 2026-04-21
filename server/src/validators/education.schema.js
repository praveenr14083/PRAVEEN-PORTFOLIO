import { z } from "zod";

export const educationSchema = z
  .object({
    degree: z.string().min(2, "Degree is required"),
    institute: z.string().min(2, "Institute name is required"),
    location: z.string().optional(),
    startDate: z.string(), // ISO string
    endDate: z.string().optional(),
    isCurrent: z.boolean().optional().default(false),
    grade: z.string().optional(),
    gradeType: z.enum(["CGPA", "Percentage", "GPA"]).optional(),
  })
  .refine(
    (data) => {
      // Rule: if currently studying → no endDate
      if (data.isCurrent && data.endDate) return false;
      return true;
    },
    {
      message: "End date should not be provided if currently studying",
      path: ["endDate"],
    },
  );
