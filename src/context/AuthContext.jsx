import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { api } from '../lib/api'

const AuthContext = createContext(null)
const STORAGE_KEY = 'luxora_client_auth'

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
  const [authOpen, setAuthOpen] = useState(false)
  const [authIntent, setAuthIntent] = useState('login')

  useEffect(() => {
    if (!token) return
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
  }, [token])

  const persist = (nextToken, nextUser) => {
    setToken(nextToken)
    setUser(nextUser)
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: nextToken, user: nextUser }))
  }

  const value = useMemo(
    () => ({
      token,
      user,
      authOpen,
      authIntent,
      openAuth: (intent = 'login') => {
        setAuthIntent(intent)
        setAuthOpen(true)
      },
      closeAuth: () => setAuthOpen(false),
      login: async (email, password) => {
        const data = await api('/api/auth/login', { method: 'POST', body: { email, password } })
        persist(data.token, data.user)
        setAuthOpen(false)
        return data.user
      },
      register: async (payload) => {
        const data = await api('/api/auth/register', { method: 'POST', body: payload })
        persist(data.token, data.user)
        setAuthOpen(false)
        return data.user
      },
      logout: () => {
        setToken(null)
        setUser(null)
        localStorage.removeItem(STORAGE_KEY)
      },
      requireAuth: () => {
        if (token && user) return true
        setAuthIntent('login')
        setAuthOpen(true)
        return false
      },
    }),
    [token, user, authOpen, authIntent],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
