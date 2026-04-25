import { z } from "zod";

export const technologySchema = z.object({
  name: z.string().min(2),
  icon: z.string().optional(),
  category: z.string(),
  removeIcon: z.string().optional(),
});
