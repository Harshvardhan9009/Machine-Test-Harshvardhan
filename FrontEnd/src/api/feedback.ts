import type {
  AnalyticsSummary,
  Feedback,
  FeedbackListResponse,
  FeedbackQueryParams,
  SubmitFeedbackPayload,
} from '../types/feedback'
import { ApiError } from '../types/feedback'

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  })

  if (!response.ok) {
    let message = 'Something went wrong. Please try again.'
    try {
      const body = (await response.json()) as { message?: string; error?: string }
      message = body.message ?? body.error ?? message
    } catch {
      // ignore parse errors
    }
    throw new ApiError(message, response.status)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

export async function submitFeedback(
  payload: SubmitFeedbackPayload,
): Promise<Feedback> {
  return request<Feedback>('/api/feedback', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function getFeedback(
  params: FeedbackQueryParams = {},
): Promise<FeedbackListResponse> {
  const query = new URLSearchParams()

  if (params.search) query.set('search', params.search)
  if (params.category) query.set('category', params.category)
  if (params.limit) query.set('limit', String(params.limit))

  const suffix = query.toString() ? `?${query.toString()}` : ''
  return request<FeedbackListResponse>(`/api/feedback${suffix}`)
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  return request<AnalyticsSummary>('/api/analytics/summary')
}
