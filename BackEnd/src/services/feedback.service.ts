import type { CreateFeedbackInput, FeedbackQuery } from '../types/feedback.js'
import { feedbackStore } from '../db/store.js'

export function createFeedback(input: CreateFeedbackInput) {
  return feedbackStore.create(input)
}

export function listFeedback(query: FeedbackQuery) {
  return feedbackStore.findAll(query)
}

export function getAnalyticsSummary() {
  return feedbackStore.getAnalytics()
}
