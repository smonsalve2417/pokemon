import { useEffect, useRef, type ReactNode } from 'react'

interface Props {
  open: boolean
  title: string
  message: ReactNode
  confirmText?: string
  danger?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({ open, title, message, confirmText = 'Confirmar', danger, onConfirm, onCancel }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  return (
    <dialog ref={ref} onClose={onCancel} aria-labelledby="confirm-title" className="m-auto w-full max-w-sm rounded-xl p-6 text-center backdrop:bg-black/50">
      <p className="text-3xl" aria-hidden="true">⚠️</p>
      <h2 id="confirm-title" className="mt-2 text-lg font-bold">{title}</h2>
      <p className="mt-2 text-sm text-slate-600">{message}</p>
      <div className="mt-5 flex justify-center gap-3">
        <button type="button" onClick={onCancel} className="rounded-lg bg-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-300">Cancelar</button>
        <button type="button" onClick={onConfirm} className={`rounded-lg px-5 py-2 text-sm font-semibold text-white ${danger ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'}`}>{confirmText}</button>
      </div>
    </dialog>
  )
}
