export const STATUS_LABELS = {
  pending: 'Waiting for staff',
  in_progress: 'In progress',
  submitted: 'Ready for bill',
  billed: 'Bill generated',
  completed: 'Completed',
  cancelled: 'Cancelled',
  accepted: 'Accepted',
  quality_check: 'Quality check',
  payment_pending: 'Payment pending',
  ready_handover: 'Ready for handover',
}

export function statusLabel(status) {
  return STATUS_LABELS[status] || String(status || '').replaceAll('_', ' ')
}

export const rupee = (value) => `₹${Number(value || 0).toLocaleString('en-IN')}`
