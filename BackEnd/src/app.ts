import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { env } from './config/env.js'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'
import { requestLogger } from './middleware/requestLogger.js'
import { analyticsRouter } from './routes/analytics.routes.js'
import { feedbackRouter } from './routes/feedback.routes.js'
import { healthRouter } from './routes/health.routes.js'
import { authRouter } from './routes/auth.routes.js'
import { requireAdmin } from './middleware/auth.js'

export function createApp() {
  const app = express()

  app.use(helmet())
  const allowedOrigins = env.corsOrigin.split(',').map((o) => o.trim())
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true)
        if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
          return callback(null, true)
        }
        if (env.nodeEnv === 'development' && /^http:\/\/localhost:\d+$/.test(origin)) {
          return callback(null, true)
        }
        return callback(new Error('Not allowed by CORS'))
      },
    }),
  )
  app.use(express.json({ limit: '1mb' }))
  app.use(requestLogger)

  app.use('/health', healthRouter)
  app.use('/api/auth', authRouter)
  app.use('/api/feedback', feedbackRouter)
  app.use('/api/analytics', requireAdmin, analyticsRouter)

  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}
