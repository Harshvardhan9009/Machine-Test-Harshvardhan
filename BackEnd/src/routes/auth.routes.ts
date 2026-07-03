import { Router } from 'express'
import { loginSchema } from '../schemas/auth.schema.js'
import { generateToken } from '../utils/token.js'
import { env } from '../config/env.js'
import { AppError } from '../utils/errors.js'

export const authRouter = Router()

authRouter.post('/login', (req, res, next) => {
  try {
    const { username, password } = loginSchema.parse(req.body)

    if (username !== env.adminUsername || password !== env.adminPassword) {
      throw new AppError('Invalid username or password.', 401)
    }

    const token = generateToken(username)
    res.json({ token, username })
  } catch (error) {
    next(error)
  }
})
