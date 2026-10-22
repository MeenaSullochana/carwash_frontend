import { motion } from 'framer-motion'
import { fadeUp, stagger } from './Reveal'

/**
 * `title` is an array of lines; the last line gets the metallic treatment.
 */
export default function SectionHeading({ eyebrow, title, subtitle, align = 'left', size = 'xl', className = '', id }) {
  const centered = align === 'center'
  return (
    <motion.div
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      className={`${centered ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}
    >
      {eyebrow && (
        <motion.p variants={fadeUp} className={`eyebrow ${centered ? 'justify-center' : ''}`}>
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        variants={fadeUp}
        id={id}
        className={`heading-xl mt-5 ${size === 'md' ? 'lg:text-[clamp(2.5rem,4.4vw,3.75rem)]' : ''}`}
      >
        {title.map((line, i) => (
          <span key={line} className={`block ${i === title.length - 1 ? 'text-metal' : ''}`}>
            {line}
          </span>
        ))}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className={`mt-5 max-w-xl text-base leading-relaxed text-mist sm:text-lg ${centered ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
