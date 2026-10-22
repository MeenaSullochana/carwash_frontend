import { ArrowUpRight } from 'lucide-react'

const base =
  'group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-display text-sm font-semibold tracking-wide uppercase transition-all duration-300 ease-[var(--ease-premium)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60'

const variants = {
  primary:
    'bg-accent text-white shadow-[0_10px_40px_-10px_rgba(239,43,53,0.7)] hover:bg-white hover:text-black hover:shadow-[0_14px_50px_-8px_rgba(255,255,255,0.45)]',
  accent:
    'bg-accent text-white shadow-[0_10px_40px_-10px_rgba(239,43,53,0.7)] hover:bg-white hover:text-black hover:shadow-[0_14px_50px_-8px_rgba(255,255,255,0.45)]',
  header:
    'bg-accent text-white shadow-[0_10px_40px_-10px_rgba(239,43,53,0.7)] hover:bg-white hover:text-black hover:shadow-[0_14px_50px_-8px_rgba(255,255,255,0.45)]',
  ghost:
    'border border-ink/15 bg-paper/70 text-ink backdrop-blur-md hover:border-ink/40 hover:bg-ink/5',
}

const sizes = {
  sm: 'h-10 px-5 text-xs',
  md: 'h-12 px-7',
  lg: 'h-14 px-8 sm:px-10',
}

/** Renders an <a> when `href` is given, otherwise a <button>. */
export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  icon = true,
  className = '',
  children,
  ...props
}) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`
  const content = (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-[350%]"
      />
      <span className="relative">{children}</span>
      {icon && (
        <ArrowUpRight
          aria-hidden="true"
          className="relative size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  )

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    )
  }
  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  )
}
