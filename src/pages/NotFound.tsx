import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-2 px-4 py-24 text-center">
      <p className="text-7xl font-extrabold text-red-500">404</p>
      <h1 className="mt-2 text-xl font-bold">Página no encontrada</h1>
      <p className="text-sm text-slate-500">La ruta que buscas no existe en esta aplicación.</p>
      <Link to="/" className="mt-4 rounded-md bg-red-500 px-6 py-2 text-sm font-semibold text-white hover:bg-red-600">Volver al inicio</Link>
    </div>
  )
}
