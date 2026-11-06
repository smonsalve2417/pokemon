import { Link, useParams } from 'react-router-dom'
import { getPokemon } from '../api'
import FavoriteButton from '../components/FavoriteButton'
import StatusMessage from '../components/StatusMessage'
import { useFetch } from '../hooks/useFetch'
import type { FavoritesProps } from '../types'
import { artwork, capitalize, generationOf, genInfo } from '../utils'

export default function Detail({ favorites, onAdd, onRemove }: FavoritesProps) {
  const { id = '' } = useParams()
  const { data: p, loading, error, retry } = useFetch((s) => getPokemon(id, s), [id])

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link to="/explorar" className="text-xs text-red-600 hover:underline">← Volver a explorar</Link>
      {loading && <StatusMessage kind="loading" />}
      {error && <StatusMessage kind="error" onRetry={retry} />}
      {p && (
        <article className="mt-4 overflow-hidden rounded-xl bg-white shadow sm:flex">
          <img src={artwork(p.id)} alt={capitalize(p.name)} className="w-full bg-slate-200 object-contain p-4 sm:w-1/2" />
          <div className="flex-1 space-y-2 p-6 text-sm text-slate-500">
            <h1 className="mb-3 text-2xl font-extrabold text-slate-900">{capitalize(p.name)}</h1>
            <p>Número: <b className="text-slate-800">#{String(p.id).padStart(3, '0')}</b></p>
            <p>Tipo: <b className="text-slate-800">{p.types.map((t) => capitalize(t.type.name)).join(', ')}</b></p>
            <p>Altura: <b className="text-slate-800">{p.height / 10} m</b></p>
            <p>Peso: <b className="text-slate-800">{p.weight / 10} kg</b></p>
            <p>Habilidades: <b className="text-slate-800">{p.abilities.map((a) => capitalize(a.ability.name)).join(', ')}</b></p>
            <p>Origen: <b className="text-slate-800">{genInfo[generationOf(p.id)].region}</b></p>
            {p.base_experience != null && <p>Experiencia base: <b className="text-slate-800">{p.base_experience}</b></p>}
            <div className="pt-3"><FavoriteButton pokemon={{ id: p.id, name: p.name }} isFavorite={favorites.some((f) => f.id === p.id)} onAdd={onAdd} onRemove={onRemove} variant="full" /></div>
          </div>
        </article>
      )}
    </div>
  )
}
