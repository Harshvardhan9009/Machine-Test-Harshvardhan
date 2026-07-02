import { z } from 'zod'
import { CATEGORIES } from '../constants/categories.js'

export const createFeedbackSchema = z.object({
  category: z.enum(CATEGORIES, {
    errorMap: () => ({ message: 'Invalid category selected.' }),
  }),
  comment: z
    .string({ required_error: 'Comment is required.' })
    .trim()
    .min(10, 'Comment must be at least 10 characters.'),
})

export const feedbackQuerySchema = z.object({
  search: z.string().trim().optional(),
  category: z.enum(CATEGORIES).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
})
