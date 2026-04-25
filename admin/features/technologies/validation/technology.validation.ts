import { z } from "zod";

export const technologySchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
});

export type TechnologyInput = z.infer<typeof technologySchema>;
