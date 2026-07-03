import type { CreateFeedbackInput, FeedbackQuery } from '../types/feedback.js'
import { Feedback } from '../models/feedback.model.js'
import { CATEGORIES } from '../constants/categories.js'

export async function createFeedback(input: CreateFeedbackInput) {
  const feedback = await Feedback.create(input)
  return feedback
}

export async function listFeedback(query: FeedbackQuery) {
  const { search, category, limit = 20 } = query

  const filters: any = {}

  if (category) {
    filters.category = category
  }

  if (search) {
    filters.comment = { $regex: search, $options: 'i' }
  }

  const data = await Feedback.find(filters)
    .sort({ createdAt: -1 })
    .limit(limit)

  const total = await Feedback.countDocuments(filters)

  return { data, total }
}

export async function getAnalyticsSummary() {
  const items = await Feedback.find()

  const byCategory = Object.fromEntries(
    CATEGORIES.map((category) => [category, 0]),
  )

  for (const item of items) {
    if (byCategory[item.category] !== undefined) {
      byCategory[item.category] += 1
    }
  }

  return {
    total: items.length,
    byCategory,
  }
}
