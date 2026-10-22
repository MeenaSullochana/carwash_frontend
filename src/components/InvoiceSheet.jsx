import { rupee } from '../lib/status'

export default function InvoiceSheet({ booking }) {
  const invoice = booking?.invoice
  if (!invoice?.number) return null

  return (
    <article className="rounded-[28px] border border-ink/10 bg-paper p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-[0.28em] text-accent uppercase">Tax invoice</p>
          <h2 className="mt-2 font-display text-2xl text-ink">{invoice.number}</h2>
          <p className="mt-1 text-sm text-mist">Geekay Klean Kare · Sriperumbudur</p>
        </div>
        <div className="text-sm text-silver">
          <p>{booking.bookingCode}</p>
          <p>{booking.client?.name}</p>
          <p>{booking.phone || booking.client?.phone}</p>
          <p className="mt-2 text-ink">
            {booking.vehicleName || booking.vehicleType} {booking.vehicleNumber}
          </p>
          <p>
            {booking.scheduledDate} · {booking.scheduledTime}
          </p>
        </div>
      </div>

      <table className="mt-8 w-full text-left text-sm">
        <thead className="text-[11px] tracking-[0.18em] text-mist uppercase">
          <tr>
            <th className="pb-3 font-medium">Description</th>
            <th className="pb-3 text-right font-medium">Amount</th>
          </tr>
        </thead>
        <tbody>
          {(invoice.lines || []).map((line) => (
            <tr key={line.label} className="border-t border-ink/10">
              <td className="py-3 text-ink">{line.label}</td>
              <td className="py-3 text-right">{rupee(line.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-mist">Subtotal</dt>
          <dd>{rupee(invoice.subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-mist">Discount</dt>
          <dd>{rupee(invoice.discount)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-mist">Tax ({invoice.taxPercent || 0}%)</dt>
          <dd>{rupee(invoice.taxAmount)}</dd>
        </div>
        <div className="flex justify-between border-t border-ink/10 pt-3 font-display text-lg text-ink">
          <dt>Total</dt>
          <dd>{rupee(invoice.total)}</dd>
        </div>
      </dl>

      <p className="mt-6 text-sm text-mist">
        {invoice.status === 'paid' ? 'Paid' : 'Unpaid'}
        {invoice.method ? ` · ${invoice.method}` : ''}
        {invoice.notes ? ` · ${invoice.notes}` : ''}
      </p>
    </article>
  )
}
