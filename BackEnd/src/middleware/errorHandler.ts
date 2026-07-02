import type { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import { env } from '../config/env.js'
import { logger } from '../utils/logger.js'
import { AppError } from '../utils/errors.js'

export function notFoundHandler(_req: Request, _res: Response, next: NextFunction) {
  next(new AppError('Route not found.', 404))
}

export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof ZodError) {
    const message = error.errors[0]?.message ?? 'Validation failed.'
    logger.warn('Validation failed', {
      path: req.path,
      issues: error.flatten(),
    })

    return res.status(400).json({
      error: message,
      message,
      details: error.flatten(),
    })
  }

  if (error instanceof AppError) {
    logger.warn(error.message, {
      path: req.path,
      statusCode: error.statusCode,
      details: error.details,
    })

    return res.status(error.statusCode).json({
      error: error.message,
      message: error.message,
      details: error.details,
    })
  }

  logger.error('Unhandled error', {
    path: req.path,
    error: error instanceof Error ? error.message : 'Unknown error',
    stack: error instanceof Error ? error.stack : undefined,
  })

  return res.status(500).json({
    error: 'Internal server error.',
    message: env.nodeEnv === 'development' && error instanceof Error
      ? error.message
      : 'Internal server error.',
  })
}
