interface Props {
  kind: 'loading' | 'error' | 'empty'
  message?: string
  onRetry?: () => void
}

export default function StatusMessage({ kind, message, onRetry }: Props) {
  if (kind === 'loading') {
    return (
      <div role="status" className="flex flex-col items-center gap-3 py-20 text-slate-500">
        <span className="h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-red-500" />
        <span className="text-sm">{message ?? 'Cargando datos...'}</span>
      </div>
    )
  }
  if (kind === 'error') {
    return (
      <div role="alert" className="flex flex-col items-center gap-1 py-16 text-center text-sm text-red-600">
        <span className="text-4xl" aria-hidden="true">⚠️</span>
        <p className="mt-2">No se pudo cargar la información.</p>
        <p>{message ?? 'Verifica tu conexión e intenta de nuevo.'}</p>
        {onRetry && (
          <button type="button" onClick={onRetry} className="mt-4 rounded-lg bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700">
            Reintentar
          </button>
        )}
      </div>
    )
  }
  return <p className="py-16 text-center text-slate-500">{message ?? 'Sin resultados.'}</p>
}
