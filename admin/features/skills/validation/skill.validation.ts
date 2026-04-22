import { z } from "zod";

export const skillSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  icon: z.string().optional(),
  technologies: z.array(z.string()).default([]),
});

export type SkillInput = z.infer<typeof skillSchema>;
