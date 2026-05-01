import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional().or(z.literal("")),
  technologies: z.string().optional().or(z.literal("")),
  category: z.string().min(1, "Category is required"),
  status: z.enum(["draft", "published"]),
  featured: z.boolean().default(false),
  liveUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export type ProjectInput = z.infer<typeof projectSchema>;
