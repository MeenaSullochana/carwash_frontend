// Local dev stays on the same origin. Production builds call the Render API.
const RENDER_API = 'https://carwash-backend-h1aq.onrender.com'
const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? RENDER_API : '')

export function mediaUrl(path) {
  if (!path) return ''
  if (path.startsWith('http')) return path
  if (path.startsWith('/uploads')) return `${API_BASE}${path}`
  return path
}

export async function api(path, { method = 'GET', body, token, formData } = {}) {
  const headers = {}
  if (token) headers.Authorization = `Bearer ${token}`
  if (!formData) headers['Content-Type'] = 'application/json'

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: formData ? formData : body !== undefined ? JSON.stringify(body) : undefined,
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message || 'Request failed')
  return data
}

export async function downloadFile(path, { token, filename } = {}) {
  const headers = {}
  if (token) headers.Authorization = `Bearer ${token}`
  const res = await fetch(`${API_BASE}${path}`, { headers })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.message || 'Download failed')
  }
  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename || 'download'
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
