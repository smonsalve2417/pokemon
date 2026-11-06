import { Link } from 'react-router-dom'
import type { PokemonSummary } from '../types'
import { artwork, capitalize, generationOf, genInfo } from '../utils'
import FavoriteButton from './FavoriteButton'

interface Props {
  pokemon: PokemonSummary
  isFavorite: boolean
  onAdd: (p: PokemonSummary) => void
  onRemove: (p: PokemonSummary) => void
}

export default function PokemonCard({ pokemon, isFavorite, onAdd, onRemove }: Props) {
  const gen = genInfo[generationOf(pokemon.id)]
  const name = capitalize(pokemon.name)
  return (
    <article className="overflow-hidden rounded-xl bg-white shadow">
      <div className="relative bg-slate-200">
        <Link to={`/explorar/${pokemon.id}`} aria-label={`Ver detalle de ${name}`}>
          <img src={artwork(pokemon.id)} alt={name} loading="lazy" className="mx-auto h-44 object-contain p-2" />
        </Link>
        <FavoriteButton pokemon={pokemon} isFavorite={isFavorite} onAdd={onAdd} onRemove={onRemove} />
      </div>
      <div className="space-y-1 p-4 text-xs text-slate-500">
        <h2 className="mb-2 text-base font-bold text-slate-900">
          <Link to={`/explorar/${pokemon.id}`}>{name}</Link>
        </h2>
        <p>Número: <b className="text-slate-800">#{String(pokemon.id).padStart(3, '0')}</b></p>
        <p>Generación: <b className="text-slate-800">{gen.roman}</b></p>
        <span className="mt-1 inline-block rounded-full bg-red-100 px-2 py-0.5 text-red-800">{gen.region}</span>
      </div>
    </article>
  )
}
