import { z } from "zod";

export const skillSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().optional(),
  icon: z.string().optional().default("code"),
  technologies: z
    .string()
    .optional()
    .transform((val) => (val ? val.split(",") : [])),
});
