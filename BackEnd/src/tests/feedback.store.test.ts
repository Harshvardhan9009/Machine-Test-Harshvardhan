import { describe, expect, it, beforeEach, afterEach } from 'vitest'
import { mkdtempSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { FeedbackStore } from '../db/store.js'

describe('FeedbackStore', () => {
  let tempDir = ''
  let store: FeedbackStore

  beforeEach(() => {
    tempDir = mkdtempSync(join(tmpdir(), 'feedback-test-'))
    store = new FeedbackStore(join(tempDir, 'feedback.json'))
  })

  afterEach(() => {
    rmSync(tempDir, { recursive: true, force: true })
  })

  it('creates and lists feedback', () => {
    const created = store.create({
      category: 'Bug Report',
      comment: 'The login button is broken on mobile.',
    })

    const result = store.findAll()
    expect(result.total).toBe(1)
    expect(result.data[0]?.id).toBe(created.id)
  })

  it('filters by category and search term', () => {
    store.create({
      category: 'Bug Report',
      comment: 'Payment page crashes after submit.',
    })
    store.create({
      category: 'Feature Request',
      comment: 'Please add dark mode support.',
    })

    const filtered = store.findAll({ category: 'Bug Report', search: 'payment' })
    expect(filtered.total).toBe(1)
    expect(filtered.data[0]?.category).toBe('Bug Report')
  })

  it('returns analytics summary', () => {
    store.create({
      category: 'Support',
      comment: 'Need help resetting my password quickly.',
    })
    store.create({
      category: 'Support',
      comment: 'Account locked after too many attempts.',
    })

    const analytics = store.getAnalytics()
    expect(analytics.total).toBe(2)
    expect(analytics.byCategory['Support']).toBe(2)
  })
})
