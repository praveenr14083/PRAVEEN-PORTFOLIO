import { z } from "zod";

export const experienceSchema = z
  .object({
    role: z.string().min(1, "Role is required"),
    company: z.string().min(1, "Company name is required"),
    location: z.string().optional().nullable(),
    employmentType: z.enum([
      "Full-Time",
      "Part-Time",
      "Internship",
      "Contract",
      "Freelance",
    ]),
    description: z.string().optional().nullable(),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional().nullable(),
    isCurrent: z.boolean().optional().default(false),
  })
  .refine(
    (data) => {
      // Rule: if currently working → no endDate
      if (data.isCurrent && data.endDate) return false;
      return true;
    },
    {
      message: "End date should not be provided if currently working",
      path: ["endDate"],
    },
  );
