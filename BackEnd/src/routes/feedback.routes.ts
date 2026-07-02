import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { env } from '../config/env.js'
import {
  createFeedbackSchema,
  feedbackQuerySchema,
} from '../schemas/feedback.schema.js'
import { createFeedback, listFeedback } from '../services/feedback.service.js'

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

feedbackRouter.post('/', submitLimiter, (req, res, next) => {
  try {
    const payload = createFeedbackSchema.parse(req.body)
    const feedback = createFeedback(payload)
    res.status(201).json(feedback)
  } catch (error) {
    next(error)
  }
})

feedbackRouter.get('/', (req, res, next) => {
  try {
    const query = feedbackQuerySchema.parse(req.query)
    const result = listFeedback(query)
    res.json(result)
  } catch (error) {
    next(error)
  }
})
