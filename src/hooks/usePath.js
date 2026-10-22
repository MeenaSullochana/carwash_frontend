import { useEffect, useState } from 'react'

/** Minimal client-side router: intercepts same-origin <a> clicks that change the pathname. */
export default function usePath() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = e.target.closest('a[href]')
      if (!link || link.target || link.hasAttribute('download') || link.origin !== window.location.origin) return
      if (link.pathname === window.location.pathname) return
      e.preventDefault()
      window.history.pushState(null, '', link.pathname + link.search + link.hash)
      setPath(link.pathname)
    }
    window.addEventListener('popstate', onPop)
    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('popstate', onPop)
      document.removeEventListener('click', onClick)
    }
  }, [])

  useEffect(() => {
    const target = window.location.hash && document.getElementById(window.location.hash.slice(1))
    if (target) target.scrollIntoView()
    else window.scrollTo({ top: 0, behavior: 'instant' })
  }, [path])

  return path
}
