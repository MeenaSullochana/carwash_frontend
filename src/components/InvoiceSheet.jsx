import logo from '../assets/logos/geekay-logo.png'
import { brand } from '../data/content'
import { rupee } from '../lib/status'

function formatDate(value) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function InvoiceSheet({ booking }) {
  const invoice = booking?.invoice
  if (!invoice?.number) return null
  const paid = invoice.status === 'paid'
  const issued = formatDate(invoice.generatedAt)

  return (
    <article className="overflow-hidden rounded-[28px] border border-ink/10 bg-paper shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)]">
      <header className="bg-[#0e1016] px-6 py-6 text-white sm:px-8 sm:py-7">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <img src={logo} alt="Geekay Klean Kare" className="h-16 w-auto object-contain sm:h-[4.5rem]" />
          <div className="text-left sm:text-right">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-white/60 uppercase">Tax invoice</p>
            <h2 className="mt-2 font-display text-2xl tracking-tight">{invoice.number}</h2>
            {issued && <p className="mt-1 text-sm text-white/70">{issued}</p>}
          </div>
        </div>
      </header>
      <div className="h-1.5 bg-accent" />

      <div className="px-6 py-6 sm:px-8 sm:py-7">
        <p className="text-sm text-silver">
          Sriperumbudur studio · {brand.phone} · {brand.email}
        </p>
        <p className="mt-1 max-w-xl text-xs leading-relaxed text-mist">{brand.address}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-cloud px-5 py-4">
            <p className="text-[11px] font-semibold tracking-[0.2em] text-accent uppercase">Bill to</p>
            <p className="mt-2 font-display text-lg text-ink">{booking.client?.name || 'Customer'}</p>
            <p className="mt-1 text-sm text-silver">{booking.phone || booking.client?.phone}</p>
            {booking.email && <p className="text-sm text-silver">{booking.email}</p>}
            <p className="mt-1 text-sm text-mist">{booking.bookingCode}</p>
          </div>
          <div className="rounded-2xl bg-cloud px-5 py-4">
            <p className="text-[11px] font-semibold tracking-[0.2em] text-accent uppercase">Vehicle</p>
            <p className="mt-2 font-display text-lg text-ink">
              {[booking.vehicleName || booking.vehicleType, booking.vehicleNumber].filter(Boolean).join(' ')}
            </p>
            <p className="mt-1 text-sm text-silver">
              {booking.scheduledDate} · {booking.scheduledTime}
            </p>
          </div>
        </div>

        <table className="mt-7 w-full text-left text-sm">
          <thead>
            <tr className="bg-[#0e1016] text-[11px] tracking-[0.18em] text-white uppercase">
              <th className="rounded-l-xl px-4 py-3 font-semibold">Description</th>
              <th className="rounded-r-xl px-4 py-3 text-right font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {(invoice.lines || []).map((line, index) => (
              <tr key={`${line.label}-${index}`} className={index % 2 === 0 ? 'bg-cloud/80' : ''}>
                <td className="px-4 py-3 text-ink">{line.label}</td>
                <td className="px-4 py-3 text-right font-medium text-ink">{rupee(line.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-white uppercase ${paid ? 'bg-emerald-700' : 'bg-accent'}`}>
              {paid ? 'Paid' : 'Unpaid'}
            </span>
            {invoice.method && <p className="mt-3 text-sm text-silver">{invoice.method}</p>}
            {invoice.notes && <p className="mt-2 max-w-sm text-sm leading-relaxed text-mist">{invoice.notes}</p>}
          </div>
          <dl className="w-full max-w-xs rounded-2xl bg-cloud px-5 py-4 text-sm">
            <div className="flex justify-between py-1">
              <dt className="text-mist">Subtotal</dt>
              <dd className="text-ink">{rupee(invoice.subtotal)}</dd>
            </div>
            <div className="flex justify-between py-1">
              <dt className="text-mist">Discount</dt>
              <dd className="text-ink">{rupee(invoice.discount)}</dd>
            </div>
            <div className="flex justify-between py-1">
              <dt className="text-mist">Tax ({invoice.taxPercent || 0}%)</dt>
              <dd className="text-ink">{rupee(invoice.taxAmount)}</dd>
            </div>
            <div className="-mx-5 mt-3 flex justify-between bg-[#0e1016] px-5 py-3 font-display text-base text-white">
              <dt>Total</dt>
              <dd>{rupee(invoice.total)}</dd>
            </div>
          </dl>
        </div>
      </div>

      <footer className="bg-[#0e1016] px-6 py-4 text-white sm:px-8">
        <p className="font-display text-sm">Thank you for trusting Geekay Klean Kare.</p>
        <p className="mt-1 text-xs text-white/60">Payment is collected after you inspect the car.</p>
      </footer>
    </article>
  )
}
