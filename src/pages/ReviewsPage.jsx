import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import PageHero from '../components/PageHero'
import Testimonials from '../components/Testimonials'
import FinalCTA from '../components/FinalCTA'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import Reveal, { easePremium } from '../components/ui/Reveal'
import usePageTitle from '../hooks/usePageTitle'
import { splitReviews, useReviews } from '../hooks/useReviews'

function Stars({ className = 'size-4' }) {
  return Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`${className} fill-accent text-accent-deep`} aria-hidden="true" />)
}

function RatingSummary({ reviewSummary }) {
  if (!reviewSummary) return null
  return (
    <section aria-label="Rating summary" className="relative pb-4">
      <div className="container-lux">
        <Reveal className="mx-auto grid max-w-4xl items-center gap-10 rounded-[28px] border border-ink/10 bg-paper/80 p-7 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-10 md:grid-cols-[auto_1fr] md:gap-14">
          <div className="text-center md:text-left">
            <p className="font-display text-7xl font-semibold tracking-tight text-ink">{reviewSummary.rating}</p>
            <div className="mt-3 flex justify-center gap-1 md:justify-start" aria-label={`${reviewSummary.rating} out of 5 stars`}>
              <Stars />
            </div>
            <p className="mt-3 text-sm text-mist">from {reviewSummary.total} verified reviews</p>
          </div>
          <ul className="space-y-3">
            {reviewSummary.breakdown.map(({ stars, percent }) => (
              <li key={stars} className="flex items-center gap-4 text-sm">
                <span className="flex w-10 shrink-0 items-center gap-1 text-silver">
                  {stars} <Star className="size-3.5 fill-accent text-accent-deep" aria-hidden="true" />
                </span>
                <span className="relative h-2 flex-1 overflow-hidden rounded-full bg-ink/10">
                  <motion.span
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: easePremium, delay: (5 - stars) * 0.08 }}
                    className="absolute inset-y-0 left-0 rounded-full bg-accent"
                  />
                </span>
                <span className="w-10 shrink-0 text-right text-mist tabular-nums">{percent}%</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

function ReviewWall({ reviews }) {
  return (
    <section aria-labelledby="wall-title" className="section-y relative bg-cloud">
      <div aria-hidden="true" className="hairline absolute inset-x-0 top-0 h-px" />
      <div className="container-lux">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="wall-title" eyebrow="More reviews" title={['What our customers', 'are saying.']} />
          <div className="shrink-0">
            <Button href="/contact" variant="ghost">
              Share your experience
            </Button>
          </div>
        </div>
        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:mt-16 lg:columns-3">
          {reviews.map((r, i) => (
            <motion.figure
              key={r._id || r.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.8, ease: easePremium, delay: (i % 3) * 0.1 }}
              className="mb-5 break-inside-avoid rounded-[24px] border border-ink/10 bg-paper p-7 transition-all duration-500 hover:-translate-y-1 hover:border-accent/40"
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-1" aria-label={`${r.rating || 5} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, star) => (
                    <Star
                      key={star}
                      className={`size-3.5 ${star < (Number(r.rating) || 5) ? 'fill-accent text-accent-deep' : 'text-ink/15'}`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <Quote className="size-6 text-ink/10" aria-hidden="true" />
              </div>
              <blockquote className="mt-5 text-[15px] leading-relaxed text-silver">“{r.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-ink/10 pt-5">
                <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-accent/30 to-accent/5 font-display text-sm font-semibold text-accent-deep">
                  {r.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-medium text-ink">{r.name}</span>
                  <span className="block text-xs text-mist">
                    {r.car} · {r.service}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function ReviewsPage() {
  usePageTitle('Reviews')
  const { reviews, ready } = useReviews()
  const { spotlight, more, summary } = splitReviews(reviews)

  return (
    <>
      <PageHero
        id="reviews-page-title"
        eyebrow="Reviews"
        title={['Trusted by', 'our customers.']}
        subtitle="Don't take our word for it — here's what our customers say after driving away from Geekay Klean Kare."
      />
      <RatingSummary reviewSummary={ready ? summary : null} />
      <Testimonials items={spotlight} summary={summary} ready={ready} />
      {more.length > 0 && <ReviewWall reviews={more} />}
      <FinalCTA />
    </>
  )
}
