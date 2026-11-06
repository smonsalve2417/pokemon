import { Link, NavLink } from 'react-router-dom'

const link = ({ isActive }: { isActive: boolean }) =>
  `border-b-2 py-1 text-sm ${isActive ? 'border-red-400 font-semibold text-white' : 'border-transparent text-slate-300 hover:text-white'}`

export default function Navbar({ favoritesCount }: { favoritesCount: number }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-900">
      <nav aria-label="Principal" className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
        <Link to="/" className="mr-auto flex items-center gap-2 text-lg font-bold text-white">
          <span aria-hidden="true" className="text-red-400">◉</span> Explorador
        </Link>
        <NavLink to="/" end className={link}>Inicio</NavLink>
        <NavLink to="/explorar" className={link}>Explorar</NavLink>
        <NavLink to="/favoritos" className={link}>Favoritos{favoritesCount > 0 && ` (${favoritesCount})`}</NavLink>
        <NavLink to="/contacto" className={link}>Contacto</NavLink>
      </nav>
    </header>
  )
}
