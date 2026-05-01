import { z } from 'zod'

export const projectSchema = z.object({
  title: z.string().min(1),

  description: z.string().optional(),

  technologies: z
    .string()
    .optional()
    .transform((val) => (val ? val.split(',') : [])),

  category: z.string().optional(),

  status: z.enum(['draft', 'published']).optional(),

  featured: z
    .string()
    .optional()
    .transform((val) => val === 'true'),

  liveUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),

  // Handle image field properly - can be a string (filename) or null/undefined
  image: z
    .string()
    .optional()
    .or(z.literal("")),
  removeImage: z.string().optional(),
})
