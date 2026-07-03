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
  mongoUri: process.env.MONGO_URI ?? '',
  rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS ?? 900_000),
  rateLimitMax: Number(process.env.RATE_LIMIT_MAX ?? 100),
  adminUsername: process.env.ADMIN_USERNAME ?? 'admin',
  adminPassword: process.env.ADMIN_PASSWORD ?? 'admin123',
  jwtSecret: process.env.JWT_SECRET ?? 'acowale-crm-super-secret-key-change-me',
}

if (Number.isNaN(env.port) || env.port <= 0) {
  throw new Error('PORT must be a positive number.')
}

export function assertRuntimeConfig() {
  required('MONGO_URI', env.mongoUri)
}
