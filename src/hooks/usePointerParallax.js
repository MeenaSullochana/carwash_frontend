import { useEffect } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

const spring = { stiffness: 70, damping: 20, mass: 0.6 }

/**
 * Normalised pointer position (-0.5 … 0.5) relative to `ref` (or the window),
 * smoothed with a spring. Only listens when `enabled` is true.
 */
export function usePointerParallax(ref, enabled = true) {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, spring)
  const y = useSpring(rawY, spring)

  useEffect(() => {
    if (!enabled) {
      rawX.set(0)
      rawY.set(0)
      return undefined
    }
    const target = ref?.current ?? window
    let frame = 0

    const onMove = (event) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = ref?.current
          ? ref.current.getBoundingClientRect()
          : { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight }
        rawX.set((event.clientX - rect.left) / rect.width - 0.5)
        rawY.set((event.clientY - rect.top) / rect.height - 0.5)
      })
    }
    const onLeave = () => {
      rawX.set(0)
      rawY.set(0)
    }

    target.addEventListener('pointermove', onMove)
    target.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      target.removeEventListener('pointermove', onMove)
      target.removeEventListener('pointerleave', onLeave)
    }
  }, [ref, enabled, rawX, rawY])

  return { x, y }
}
