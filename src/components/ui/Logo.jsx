import logo from '../../assets/logos/geekay-logo.png'

const sizes = {
  compact: 'h-9',
  md: 'h-14 md:h-16',
  lg: 'h-20 sm:h-24 lg:h-28',
}

export default function Logo({ className = '', compact = false, size = 'md' }) {
  return (
    <a href="/#home" className={`group inline-flex items-center ${className}`} aria-label="Geekay Klean Kare — home">
      <img
        src={logo}
        alt="Geekay Klean Kare"
        width="1024"
        height="385"
        decoding="async"
        draggable="false"
        className={`${compact ? sizes.compact : sizes[size]} w-auto select-none object-contain mix-blend-lighten`}
      />
    </a>
  )
}
