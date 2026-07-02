import type { AnalyticsSummary } from '../types/feedback'
import './StatsCards.css'

interface StatsCardsProps {
  analytics: AnalyticsSummary | null
  loading: boolean
}

export function StatsCards({ analytics, loading }: StatsCardsProps) {
  const topCategory = analytics
    ? Object.entries(analytics.byCategory).sort((a, b) => b[1] - a[1])[0]
    : null

  return (
    <section className="stats-grid" aria-label="Feedback statistics">
      <article className="stat-card">
        <p className="stat-label">Total feedback</p>
        <p className="stat-value">{loading ? '—' : (analytics?.total ?? 0)}</p>
      </article>

      <article className="stat-card">
        <p className="stat-label">Categories tracked</p>
        <p className="stat-value">
          {loading ? '—' : Object.keys(analytics?.byCategory ?? {}).length}
        </p>
      </article>

      <article className="stat-card">
        <p className="stat-label">Top category</p>
        <p className="stat-value stat-value-text">
          {loading ? '—' : (topCategory?.[0] ?? 'N/A')}
        </p>
      </article>
    </section>
  )
}
