import { useCallback, useEffect, useState } from 'react'
import { getAnalyticsSummary, getFeedback } from '../api/feedback'
import { CategoryChart } from '../components/CategoryChart'
import { FeedbackTable } from '../components/FeedbackTable'
import { FiltersBar } from '../components/FiltersBar'
import { StatsCards } from '../components/StatsCards'
import type { AnalyticsSummary, Feedback } from '../types/feedback'
import './DashboardPage.css'

export function DashboardPage() {
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null)
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadDashboard = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const [summary, list] = await Promise.all([
        getAnalyticsSummary(),
        getFeedback({
          search: search || undefined,
          category: category || undefined,
          limit: 20,
        }),
      ])

      setAnalytics(summary)
      setFeedback(list.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard.')
    } finally {
      setLoading(false)
    }
  }, [search, category])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadDashboard()
    }, 300)

    return () => window.clearTimeout(timer)
  }, [loadDashboard])

  return (
    <div className="dashboard-page">
      <section className="page-intro">
        <h2>Admin dashboard</h2>
        <p>Monitor feedback trends, review recent submissions, and filter by category.</p>
      </section>

      {error && (
        <p className="banner error" role="alert">
          {error}
        </p>
      )}

      <StatsCards analytics={analytics} loading={loading} />

      <div className="dashboard-grid">
        <CategoryChart analytics={analytics} loading={loading} />

        <section className="panel filters-panel">
          <div className="panel-header">
            <h2>Filter submissions</h2>
            <p>Search comments or narrow by category</p>
          </div>
          <FiltersBar
            search={search}
            category={category}
            onSearchChange={setSearch}
            onCategoryChange={setCategory}
          />
        </section>
      </div>

      <FeedbackTable feedback={feedback} loading={loading} />
    </div>
  )
}
