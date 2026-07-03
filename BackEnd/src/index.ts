import { connectDB } from './config/db.js'
import { createApp } from './app.js'
import { assertRuntimeConfig } from './config/env.js'

assertRuntimeConfig()
await connectDB()

const app = createApp()

export default app
