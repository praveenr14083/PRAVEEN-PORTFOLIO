import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(1),

  description: z.string().optional(),

  technologies: z
    .string()
    .optional()
    .transform((val) => (val ? val.split(",") : [])),

  category: z.enum([
    "Web Development",
    "Mobile App",
    "UI/UX Design",
    "Backend",
    "Full Stack",
    "Other",
  ]),

  status: z.enum(["draft", "published"]).optional(),

  featured: z
    .string()
    .optional()
    .transform((val) => val === "true"),

  liveUrl: z
    .string()
    .url()
    .optional()
    .or(z.literal(""))
    .transform((val) => val || undefined),
  githubUrl: z
    .string()
    .url()
    .optional()
    .or(z.literal(""))
    .transform((val) => val || undefined),

  // Handle image field properly - can be a string (filename) or null/undefined
  image: z
    .string()
    .optional()
    .or(z.literal(""))
    .transform((val) => val || undefined),
  removeImage: z.string().optional(),
});
