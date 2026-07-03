import { describe, expect, it, beforeEach, afterEach } from 'vitest'
import { createApp } from '../app.js'
import type { Server } from 'node:http'
import { env } from '../config/env.js'

describe('Auth & Protected Routes', () => {
  let app: any
  let server: Server
  let baseUrl = ''

  beforeEach(() => {
    app = createApp()
    server = app.listen(0)
    const address = server.address()
    const port = typeof address === 'string' ? 0 : address?.port
    baseUrl = `http://localhost:${port}`
  })

  afterEach(() => {
    server.close()
  })

  it('allows public feedback submission but blocks GET reviews', async () => {
    const postRes = await fetch(`${baseUrl}/api/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category: 'Bug Report',
        comment: 'This is a test comment that has at least ten chars.',
      }),
    })
    expect(postRes.status).toBe(201)

    const getRes = await fetch(`${baseUrl}/api/feedback`)
    expect(getRes.status).toBe(401)
  })

  it('rejects incorrect credentials', async () => {
    const res = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'wrong-admin',
        password: 'wrong-password',
      }),
    })
    expect(res.status).toBe(401)
  })

  it('accepts correct credentials and returns token', async () => {
    const res = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: env.adminUsername,
        password: env.adminPassword,
      }),
    })
    expect(res.status).toBe(200)
    const body = (await res.json()) as { token: string; username: string }
    expect(body.token).toBeDefined()
    expect(body.username).toBe(env.adminUsername)

    const getRes = await fetch(`${baseUrl}/api/feedback`, {
      headers: {
        Authorization: `Bearer ${body.token}`,
      },
    })
    expect(getRes.status).toBe(200)
  })
})
