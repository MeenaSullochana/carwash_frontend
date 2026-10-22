import { useEffect } from 'react'

export default function usePageTitle(title) {
  useEffect(() => {
    const previous = document.title
    document.title = `${title} — Geekay Klean Kare`
    return () => {
      document.title = previous
    }
  }, [title])
}
