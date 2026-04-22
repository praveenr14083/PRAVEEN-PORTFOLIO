import { z } from "zod";

export const certificateSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type CertificateInput = z.infer<typeof certificateSchema>;
