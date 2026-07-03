import crypto from 'node:crypto'
import { env } from '../config/env.js'

export interface TokenPayload {
  username: string
  exp: number
}

export function generateToken(username: string): string {
  const header = JSON.stringify({ alg: 'HS256', typ: 'JWT' })
  // Token expires in 24 hours
  const payload: TokenPayload = {
    username,
    exp: Date.now() + 24 * 60 * 60 * 1000,
  }

  const base64Header = Buffer.from(header).toString('base64url')
  const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64url')

  const signature = crypto
    .createHmac('sha256', env.jwtSecret)
    .update(`${base64Header}.${base64Payload}`)
    .digest('base64url')

  return `${base64Header}.${base64Payload}.${signature}`
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null

    const [header, payload, signature] = parts
    const expectedSignature = crypto
      .createHmac('sha256', env.jwtSecret)
      .update(`${header}.${payload}`)
      .digest('base64url')

    if (signature !== expectedSignature) return null

    const decodedPayload = JSON.parse(
      Buffer.from(payload, 'base64url').toString('utf8'),
    ) as TokenPayload

    if (decodedPayload.exp && Date.now() > decodedPayload.exp) {
      return null // Token has expired
    }

    return decodedPayload
  } catch {
    return null
  }
}
