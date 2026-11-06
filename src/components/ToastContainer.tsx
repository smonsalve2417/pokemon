import type { Toast, ToastType } from '../types'

const colors: Record<ToastType, string> = { success: 'bg-emerald-700', error: 'bg-red-700', info: 'bg-sky-700' }
const icons: Record<ToastType, string> = { success: '✓', error: '✕', info: 'ℹ' }

interface Props { toasts: Toast[]; onDismiss: (id: number) => void }

export default function ToastContainer({ toasts, onDismiss }: Props) {
  return (
    <div aria-live="polite" className="fixed right-4 top-16 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <div key={t.id} role="status" className={`${colors[t.type]} flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-white shadow-lg`}>
          <span aria-hidden="true">{icons[t.type]}</span>
          <span>{t.message}</span>
          <button type="button" onClick={() => onDismiss(t.id)} aria-label="Cerrar notificación" className="ml-2 opacity-80 hover:opacity-100">×</button>
        </div>
      ))}
    </div>
  )
}
