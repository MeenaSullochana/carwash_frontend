import { lazy, Suspense, useRef } from 'react'
import { useInView } from 'framer-motion'

const AmbientScene = lazy(() => import('./AmbientScene'))

/** Loads the WebGL chunk on demand and pauses rendering while off-screen. */
export default function LazyScene({ className = '', ...props }) {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '200px 0px' })
  return (
    <div ref={ref} className={className} aria-hidden="true">
      <Suspense fallback={null}>
        <AmbientScene active={inView} {...props} />
      </Suspense>
    </div>
  )
}
