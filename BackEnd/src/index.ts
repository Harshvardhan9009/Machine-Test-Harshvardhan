import { connectDB } from './config/db.js'
import { createApp } from './app.js'
import { assertRuntimeConfig, env } from './config/env.js'
import { logger } from './utils/logger.js'

assertRuntimeConfig()
await connectDB()

const app = createApp()

app.listen(env.port, () => {
  logger.info('Server started', {
    port: env.port,
    environment: env.nodeEnv,
    corsOrigin: env.corsOrigin,
  })
})
