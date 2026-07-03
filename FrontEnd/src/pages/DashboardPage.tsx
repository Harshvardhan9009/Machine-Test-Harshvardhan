import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getAnalyticsSummary, getFeedback } from '../api/feedback'
import { CategoryChart } from '../components/CategoryChart'
import { FeedbackTable } from '../components/FeedbackTable'
import { FiltersBar } from '../components/FiltersBar'
import type { AnalyticsSummary, Feedback } from '../types/feedback'
import './DashboardPage.css'

export function DashboardPage() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null)
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('dashboard')

  function handleLogout() {
    logout()
    navigate('/')
  }

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

  const topCategory = analytics
    ? Object.entries(analytics.byCategory).sort((a, b) => b[1] - a[1])[0]
    : null

  return (
    <div className="dashboard-container">
      {/* Left Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon-circle">A</div>
          <div className="brand-text">
            <h2>Acowale CRM</h2>
            <p>Admin Dashboard</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`sidebar-link ${activeTab === 'dashboard' ? 'active' : ''}`}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => setActiveTab('submissions')}
            className={`sidebar-link ${activeTab === 'submissions' ? 'active' : ''}`}
          >
            💬 Submissions
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={`sidebar-link ${activeTab === 'alerts' ? 'active' : ''}`}
          >
            ⚠️ Alert Logs
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`sidebar-link ${activeTab === 'settings' ? 'active' : ''}`}
          >
            ⚙️ Settings
          </button>
        </nav>

        <div style={{ marginTop: 'auto', padding: '0.5rem' }}>
          <button onClick={handleLogout} className="sidebar-link" style={{ color: '#ef4444' }}>
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Topbar Header */}
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <div className="search-input-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search feedback, comments..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select className="date-select" defaultValue="today">
              <option value="today">Today</option>
              <option value="weekly">This Week</option>
              <option value="monthly">This Month</option>
            </select>
          </div>

          <div className="topbar-right">
            <div className="notification-bell">
              🔔
              <span className="bell-badge">3</span>
            </div>
            <div className="user-profile">
              <div className="profile-avatar">HS</div>
              <div className="profile-info">
                <p className="profile-name">Harshvardhan</p>
                <p className="profile-role">Admin Manager</p>
              </div>
            </div>
            <button onClick={handleLogout} className="dashboard-logout-btn">
              Logout
            </button>
          </div>
        </header>

        {error && (
          <p className="banner error" role="alert">
            {error}
          </p>
        )}

        {/* Welcome Section */}
        <section className="welcome-section">
          <h2>Good afternoon, Harshvardhan! ☀️</h2>
          <p>Here's what is happening with user feedback on your CRM today.</p>
        </section>

        {/* 4 Metrics Row */}
        <section className="metrics-row" aria-label="Quick metrics">
          <div className="metric-box">
            <div className="metric-icon-wrap">
              <span className="metric-symbol">📂</span>
              <span className="metric-badge green">+12.5%</span>
            </div>
            <h3>{loading ? '—' : (analytics?.total ?? 0)}</h3>
            <p>Total Feedback</p>
            <p className="metric-sub">vs yesterday</p>
          </div>

          <div className="metric-box">
            <div className="metric-icon-wrap">
              <span className="metric-symbol">🏷️</span>
              <span className="metric-badge green">All present</span>
            </div>
            <h3>{loading ? '—' : Object.keys(analytics?.byCategory ?? {}).length}</h3>
            <p>Categories Tracked</p>
            <p className="metric-sub">vs yesterday</p>
          </div>

          <div className="metric-box">
            <div className="metric-icon-wrap">
              <span className="metric-symbol">🏆</span>
              <span className="metric-badge gray">Top Feed</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', paddingTop: '0.5rem', paddingBottom: '0.4rem', fontWeight: 800 }}>
              {loading ? '—' : (topCategory?.[0] ?? 'N/A')}
            </h3>
            <p>Primary Category</p>
            <p className="metric-sub">today's leading trend</p>
          </div>

          <div className="metric-box">
            <div className="metric-icon-wrap">
              <span className="metric-symbol">👤</span>
              <span className="metric-badge green">Active</span>
            </div>
            <h3>{loading ? '—' : 5}</h3>
            <p>Active Staff on Shift</p>
            <p className="metric-sub">current shift</p>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="dashboard-grid-row">
          <CategoryChart analytics={analytics} loading={loading} />
        </div>

        {/* Submissions Section */}
        <section className="submissions-section">
          <div className="submissions-section-header">
            <h2>Filter & Review Submissions</h2>
            <p>Search and narrow feedback category logs</p>
          </div>
          <FiltersBar
            search={search}
            category={category}
            onSearchChange={setSearch}
            onCategoryChange={setCategory}
          />
          <FeedbackTable feedback={feedback} loading={loading} />
        </section>
      </main>
    </div>
  )
}
