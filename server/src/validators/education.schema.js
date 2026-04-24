import { z } from "zod";

export const educationSchema = z
  .object({
    degree: z.string().min(1, "Degree is required"),
    institute: z.string().min(1, "Institute name is required"),
    location: z.string().optional().nullable(),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional().nullable(),
    isCurrent: z.boolean().optional().default(false),
    grade: z.string().optional().nullable(),
    gradeType: z.enum(["CGPA", "Percentage", "GPA"]).optional().nullable(),
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
