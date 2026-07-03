import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { env } from '../config/env.js'
import {
  createFeedbackSchema,
  feedbackQuerySchema,
} from '../schemas/feedback.schema.js'
import { createFeedback, listFeedback } from '../services/feedback.service.js'
import { requireAdmin } from '../middleware/auth.js'

export const feedbackRouter = Router()

const submitLimiter = rateLimit({
  windowMs: env.rateLimitWindowMs,
  max: env.rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many requests. Please try again later.',
    message: 'Too many requests. Please try again later.',
  },
})

feedbackRouter.post('/', submitLimiter, async (req, res, next) => {
  try {
    const payload = createFeedbackSchema.parse(req.body)
    const feedback = await createFeedback(payload)
    res.status(201).json(feedback)
  } catch (error) {
    next(error)
  }
})

feedbackRouter.get('/', requireAdmin, async (req, res, next) => {
  try {
    const query = feedbackQuerySchema.parse(req.query)
    const result = await listFeedback(query)
    res.json(result)
  } catch (error) {
    next(error)
  }
})
