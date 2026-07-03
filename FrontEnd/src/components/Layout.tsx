import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Layout.css'

export function Layout() {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  function handleLogout() {
    logout()
    navigate('/')
  }

  const isAdminDashboard = location.pathname === '/admin'

  if (isAdminDashboard) {
    return <Outlet />
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <span className="brand-mark">A</span>
          <div>
            <p className="brand-eyebrow">Acowale CRM by Harshvardhan Salunkhe</p>
            <h1 className="brand-title">Customer Feedback</h1>
          </div>
        </div>

        <nav className="app-nav" aria-label="Main navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Submit Feedback
          </NavLink>
          {isAuthenticated ? (
            <>
              <NavLink
                to="/admin"
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                Dashboard
              </NavLink>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/Adminlogin"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Admin Login
            </NavLink>
          )}
        </nav>
      </header>

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}
