import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import { brands } from '../assets/brands'

const rows = [brands.slice(0, Math.ceil(brands.length / 2)), brands.slice(Math.ceil(brands.length / 2))]

function BrandCard({ name, logo, luxury, hidden }) {
  return (
    <li
      aria-hidden={hidden || undefined}
      className="group w-40 shrink-0 rounded-[22px] border border-ink/10 bg-gradient-to-b from-cloud to-paper p-3 transition-[transform,border-color,box-shadow] duration-500 ease-[var(--ease-premium)] hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[0_24px_60px_-30px_rgba(200,16,46,0.45)] sm:w-52 sm:p-4"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-gradient-to-b from-white to-[#e9edf5] shadow-[inset_0_-10px_24px_-18px_rgba(10,16,34,0.35)]">
        <img
          src={logo}
          alt={hidden ? '' : `${name} logo`}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="absolute inset-0 size-full object-contain object-center p-4 transition-transform duration-500 ease-[var(--ease-premium)] select-none group-hover:scale-105 sm:p-5"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 transition-[left,opacity] duration-700 group-hover:left-[120%] group-hover:opacity-100"
        />
      </div>
      <div className="mt-3 flex items-center justify-between gap-2 px-1">
        <span className="truncate font-display text-sm font-semibold tracking-tight text-ink">{name}</span>
        {luxury && (
          <span className="shrink-0 rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[9px] font-medium tracking-[0.18em] text-accent uppercase">
            Luxury
          </span>
        )}
      </div>
    </li>
  )
}

export default function Brands() {
  return (
    <section aria-labelledby="brands-title" className="section-y relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -z-10 size-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(239,43,53,0.08),transparent_65%)]"
      />
      <div className="container-lux">
        <SectionHeading
          id="brands-title"
          align="center"
          eyebrow="Brands We Care For"
          title={['Every make.', 'One standard.']}
          subtitle="From everyday hatchbacks to German luxury, our detailers are trained on the paint, trim and interiors of every major brand on Indian roads."
        />
      </div>

      <Reveal className="mt-14 flex flex-col gap-4 sm:mt-16 sm:gap-5 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        {rows.map((row, r) => (
          <div key={r} className="group/row overflow-hidden py-2">
            <ul
              className={`flex w-max animate-marquee gap-3 pr-3 [animation-duration:45s] group-hover/row:[animation-play-state:paused] sm:gap-4 sm:pr-4 ${
                r % 2 === 1 ? '[animation-direction:reverse]' : ''
              }`}
            >
              {[...row, ...row].map((brand, i) => (
                <BrandCard key={`${brand.name}-${i}`} {...brand} hidden={i >= row.length} />
              ))}
            </ul>
          </div>
        ))}
      </Reveal>

      <p className="container-lux mt-10 text-center text-sm text-mist">
        Don&apos;t see your car? We detail <span className="text-ink">every make and model</span> — just ask.
      </p>
    </section>
  )
}
