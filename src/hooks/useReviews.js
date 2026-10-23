import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { reviews as extraReviews, testimonials } from '../data/content'

function fallbackReviews() {
  return [
    ...testimonials.map((item, index) => ({ ...item, rating: 5, featured: true, _id: `home-${index}` })),
    ...extraReviews.map((item, index) => ({ ...item, rating: 5, featured: false, _id: `more-${index}` })),
  ]
}

export function summarizeReviews(list) {
  const total = list.length
  const average = total ? list.reduce((sum, item) => sum + (Number(item.rating) || 5), 0) / total : 0
  const breakdown = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    percent: total ? Math.round((list.filter((item) => Number(item.rating) === stars).length / total) * 100) : 0,
  }))
  return {
    rating: total ? average.toFixed(1) : '0.0',
    total: String(total),
    breakdown,
  }
}

export function splitReviews(list) {
  const featured = list.filter((item) => item.featured)
  const spotlight = featured.length ? featured : list.slice(0, 3)
  const more = list.filter((item) => !spotlight.some((spot) => spot._id === item._id))
  return { spotlight, more, summary: summarizeReviews(list) }
}

export function useReviews(skip = false) {
  const [reviews, setReviews] = useState([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (skip) return undefined
    let cancelled = false
    api('/api/reviews')
      .then((data) => {
        if (cancelled) return
        const list = data.reviews || []
        setReviews(list.length ? list : fallbackReviews())
      })
      .catch(() => {
        if (!cancelled) setReviews(fallbackReviews())
      })
      .finally(() => {
        if (!cancelled) setReady(true)
      })
    return () => {
      cancelled = true
    }
  }, [skip])

  return { reviews, ready, ...splitReviews(reviews) }
}
