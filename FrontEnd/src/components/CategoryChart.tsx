import type { AnalyticsSummary } from '../types/feedback'
import './CategoryChart.css'

interface CategoryChartProps {
  analytics: AnalyticsSummary | null
  loading: boolean
}

export function CategoryChart({ analytics, loading }: CategoryChartProps) {
  const entries = Object.entries(analytics?.byCategory ?? {})
  const maxCount = entries.reduce((max, [, count]) => Math.max(max, count), 0)

  return (
    <section className="panel category-chart">
      <div className="panel-header">
        <h2>Category distribution</h2>
        <p>Breakdown of feedback by category</p>
      </div>

      {loading ? (
        <p className="empty-state">Loading chart...</p>
      ) : entries.length === 0 ? (
        <p className="empty-state">No feedback data yet.</p>
      ) : (
        <ul className="bar-list">
          {entries.map(([category, count]) => {
            const width = maxCount > 0 ? (count / maxCount) * 100 : 0
            return (
              <li key={category} className="bar-item">
                <div className="bar-meta">
                  <span>{category}</span>
                  <strong>{count}</strong>
                </div>
                <div className="bar-track" aria-hidden="true">
                  <div className="bar-fill" style={{ width: `${width}%` }} />
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
