import { Router } from 'express'
import { getAnalyticsSummary } from '../services/feedback.service.js'

export const analyticsRouter = Router()

analyticsRouter.get('/summary', async (_req, res, next) => {
  try {
    const summary = await getAnalyticsSummary()
    res.json(summary)
  } catch (error) {
    next(error)
  }
})
