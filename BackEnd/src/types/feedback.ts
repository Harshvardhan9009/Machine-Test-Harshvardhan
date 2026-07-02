export interface Feedback {
  id: string
  category: string
  comment: string
  createdAt: string
}

export interface FeedbackListResponse {
  data: Feedback[]
  total: number
}

export interface AnalyticsSummary {
  total: number
  byCategory: Record<string, number>
}

export interface FeedbackQuery {
  search?: string
  category?: string
  limit?: number
}

export interface CreateFeedbackInput {
  category: string
  comment: string
}
