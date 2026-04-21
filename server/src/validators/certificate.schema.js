import { z } from "zod";

export const certificateSchema = z.object({
  name: z.string().min(2, "Certificate name is required"),
});
