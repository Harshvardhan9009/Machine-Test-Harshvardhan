import type { Category } from '../constants/categories'

export interface Feedback {
  id: string
  category: Category | string
  comment: string
  createdAt: string
}

export interface SubmitFeedbackPayload {
  category: Category
  comment: string
}

export interface AnalyticsSummary {
  total: number
  byCategory: Record<string, number>
}

export interface FeedbackListResponse {
  data: Feedback[]
  total: number
}

export interface FeedbackQueryParams {
  search?: string
  category?: string
  limit?: number
}

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}
