import Button from './Button'
import Reveal from './Reveal'

export default function SectionCta({ href, children, variant = 'ghost', className = 'mt-12 lg:mt-16' }) {
  return (
    <Reveal className={`flex justify-center ${className}`}>
      <Button href={href} variant={variant} size="lg">
        {children}
      </Button>
    </Reveal>
  )
}
