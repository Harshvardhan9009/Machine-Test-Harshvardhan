import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { env } from './config/env.js'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'
import { requestLogger } from './middleware/requestLogger.js'
import { analyticsRouter } from './routes/analytics.routes.js'
import { feedbackRouter } from './routes/feedback.routes.js'
import { healthRouter } from './routes/health.routes.js'

export function createApp() {
  const app = express()

  app.use(helmet())
  app.use(
    cors({
      origin: env.corsOrigin,
    }),
  )
  app.use(express.json({ limit: '1mb' }))
  app.use(requestLogger)

  app.use('/health', healthRouter)
  app.use('/api/feedback', feedbackRouter)
  app.use('/api/analytics', analyticsRouter)

  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}
