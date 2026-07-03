import app from './index.js'
import { env } from './config/env.js'
import { logger } from './utils/logger.js'

app.listen(env.port, () => {
  logger.info('Server started locally', {
    port: env.port,
    environment: env.nodeEnv,
    corsOrigin: env.corsOrigin,
  })
})
