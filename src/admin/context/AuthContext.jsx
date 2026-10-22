import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { api } from '../lib/api'

const AuthContext = createContext(null)
const STORAGE_KEY = 'luxora_admin_auth'

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}').token || null
    } catch {
      return null
    }
  })
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}').user || null
    } catch {
      return null
    }
  })
  const [loading, setLoading] = useState(Boolean(token))

  useEffect(() => {
    if (!token) {
      setLoading(false)
      return
    }
    api('/api/auth/me', { token })
      .then((data) => {
        setUser(data.user)
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, user: data.user }))
      })
      .catch(() => {
        setToken(null)
        setUser(null)
        localStorage.removeItem(STORAGE_KEY)
      })
      .finally(() => setLoading(false))
  }, [token])

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      isStaff: user && ['admin', 'supervisor', 'staff', 'washer'].includes(user.role),
      login: async (email, password) => {
        const data = await api('/api/auth/login', { method: 'POST', body: { email, password } })
        if (!['admin', 'supervisor', 'staff', 'washer'].includes(data.user.role)) {
          throw new Error('Staff login only — use the website for client accounts')
        }
        setToken(data.token)
        setUser(data.user)
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: data.token, user: data.user }))
        return data.user
      },
      logout: () => {
        setToken(null)
        setUser(null)
        localStorage.removeItem(STORAGE_KEY)
      },
    }),
    [token, user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
