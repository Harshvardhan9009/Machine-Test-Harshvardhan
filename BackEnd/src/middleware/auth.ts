import type { NextFunction, Request, Response } from 'express'
import { verifyToken } from '../utils/token.js'
import { AppError } from '../utils/errors.js'

export interface AuthenticatedRequest extends Request {
  user?: {
    username: string
  }
}

export function requireAdmin(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return next(new AppError('Authorization header is missing.', 401))
  }

  const [scheme, token] = authHeader.split(' ')

  if (scheme !== 'Bearer' || !token) {
    return next(new AppError('Invalid authorization format. Use Bearer <token>.', 401))
  }

  const payload = verifyToken(token)

  if (!payload) {
    return next(new AppError('Session expired or invalid token. Please login again.', 401))
  }

  req.user = { username: payload.username }
  next()
}
