import { z } from "zod";

export const technologySchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.enum(["frontend", "backend", "database", "tools"]),
});

export type TechnologyInput = z.infer<typeof technologySchema>;
