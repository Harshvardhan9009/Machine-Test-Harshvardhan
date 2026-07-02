import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { v4 as uuidv4 } from 'uuid'
import { CATEGORIES } from '../constants/categories.js'
import { env } from '../config/env.js'
import type {
  AnalyticsSummary,
  CreateFeedbackInput,
  Feedback,
  FeedbackQuery,
} from '../types/feedback.js'

interface FeedbackStoreData {
  feedback: Feedback[]
}

export class FeedbackStore {
  private readonly filePath: string

  constructor(filePath = env.dataFile) {
    this.filePath = resolve(filePath)
    this.ensureFile()
  }

  private ensureFile() {
    const dir = dirname(this.filePath)
    mkdirSync(dir, { recursive: true })

    if (!existsSync(this.filePath)) {
      this.write({ feedback: [] })
    }
  }

  private read(): FeedbackStoreData {
    const raw = readFileSync(this.filePath, 'utf-8')
    return JSON.parse(raw) as FeedbackStoreData
  }

  private write(data: FeedbackStoreData) {
    writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8')
  }

  create(input: CreateFeedbackInput): Feedback {
    const data = this.read()
    const feedback: Feedback = {
      id: uuidv4(),
      category: input.category,
      comment: input.comment,
      createdAt: new Date().toISOString(),
    }

    data.feedback.unshift(feedback)
    this.write(data)
    return feedback
  }

  findAll(query: FeedbackQuery = {}) {
    const { search, category, limit = 20 } = query
    let items = [...this.read().feedback]

    if (category) {
      items = items.filter((item) => item.category === category)
    }

    if (search) {
      const term = search.toLowerCase()
      items = items.filter((item) => item.comment.toLowerCase().includes(term))
    }

    items.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )

    const total = items.length
    const data = items.slice(0, limit)

    return { data, total }
  }

  getAnalytics(): AnalyticsSummary {
    const items = this.read().feedback
    const byCategory = Object.fromEntries(CATEGORIES.map((category) => [category, 0]))

    for (const item of items) {
      if (byCategory[item.category] !== undefined) {
        byCategory[item.category] += 1
      } else {
        byCategory[item.category] = 1
      }
    }

    return {
      total: items.length,
      byCategory,
    }
  }
}

export const feedbackStore = new FeedbackStore()
