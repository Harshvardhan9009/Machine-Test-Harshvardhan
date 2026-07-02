import dotenv from 'dotenv'

dotenv.config()

function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

export const env = {
  port: Number(process.env.PORT ?? 3000),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
  dataFile: process.env.DATA_FILE ?? './data/feedback.json',
  rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS ?? 900_000),
  rateLimitMax: Number(process.env.RATE_LIMIT_MAX ?? 100),
}

if (Number.isNaN(env.port) || env.port <= 0) {
  throw new Error('PORT must be a positive number.')
}

export function assertRuntimeConfig() {
  required('DATA_FILE', env.dataFile)
}
