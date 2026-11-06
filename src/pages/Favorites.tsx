import { Link } from 'react-router-dom'
import PokemonCard from '../components/PokemonCard'
import type { FavoritesProps } from '../types'

export default function Favorites({ favorites, onAdd, onRemove }: FavoritesProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-extrabold">Mis Favoritos</h1>
      <p className="mt-1 text-xs text-slate-500">{favorites.length} items guardados</p>
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-20 text-sm text-slate-500">
          <span className="text-6xl text-slate-300" aria-hidden="true">★</span>
          <p>No tienes favoritos guardados</p>
          <Link to="/explorar" className="text-red-600 hover:underline">Explorar y agregar algunos</Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((p) => <PokemonCard key={p.id} pokemon={p} isFavorite onAdd={onAdd} onRemove={onRemove} />)}
        </div>
      )}
    </div>
  )
}
