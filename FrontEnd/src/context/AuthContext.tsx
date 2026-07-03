import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

interface AuthContextType {
  token: string | null
  username: string | null
  isAuthenticated: boolean
  login: (token: string, username: string) => void
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedToken = localStorage.getItem('acowale_crm_token')
    const savedUser = localStorage.getItem('acowale_crm_username')
    if (savedToken && savedUser) {
      setToken(savedToken)
      setUsername(savedUser)
    }
    setLoading(false)
  }, [])

  function login(newToken: string, newUsername: string) {
    localStorage.setItem('acowale_crm_token', newToken)
    localStorage.setItem('acowale_crm_username', newUsername)
    setToken(newToken)
    setUsername(newUsername)
  }

  function logout() {
    localStorage.removeItem('acowale_crm_token')
    localStorage.removeItem('acowale_crm_username')
    setToken(null)
    setUsername(null)
  }

  const isAuthenticated = !!token

  return (
    <AuthContext.Provider
      value={{
        token,
        username,
        isAuthenticated,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
