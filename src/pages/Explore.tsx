import { useMemo, useState } from 'react'
import { getPokemonList } from '../api'
import PageHero from '../components/PageHero'
import PokemonCard from '../components/PokemonCard'
import SearchFilters from '../components/SearchFilters'
import StatusMessage from '../components/StatusMessage'
import { useFetch } from '../hooks/useFetch'
import type { FavoritesProps } from '../types'
import { generationOf, type Generation } from '../utils'

const PAGE = 24

export default function Explore({ favorites, onAdd, onRemove }: FavoritesProps) {
  const { data, loading, error, retry } = useFetch(getPokemonList, [])
  const [query, setQuery] = useState('')
  const [gen, setGen] = useState<Generation | 0>(0)
  const [visible, setVisible] = useState(PAGE)

  const filtered = useMemo(
    () => (data ?? []).filter((p) => p.name.includes(query.trim().toLowerCase()) && (gen === 0 || generationOf(p.id) === gen)),
    [data, query, gen],
  )

  return (
    <>
      <PageHero title="Explorar" accent="Pokémon" subtitle="Datos obtenidos en tiempo real desde la API">
        <SearchFilters query={query} gen={gen} onQuery={(v) => { setQuery(v); setVisible(PAGE) }} onGen={(v) => { setGen(v); setVisible(PAGE) }} />
      </PageHero>
      <div className="mx-auto max-w-6xl px-4 py-8">
        {loading && <StatusMessage kind="loading" />}
        {error && <StatusMessage kind="error" onRetry={retry} />}
        {!loading && !error && (
          <>
            <div className="mb-4 flex items-baseline justify-between">
              <h2 className="text-lg font-bold">Resultados</h2>
              <p className="text-xs text-slate-500">Mostrando {Math.min(visible, filtered.length)} de {filtered.length} resultados</p>
            </div>
            {filtered.length === 0 ? (
              <StatusMessage kind="empty" message="No se encontraron Pokémon con esa búsqueda." />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.slice(0, visible).map((p) => <PokemonCard key={p.id} pokemon={p} isFavorite={favorites.some((f) => f.id === p.id)} onAdd={onAdd} onRemove={onRemove} />)}
              </div>
            )}
            {visible < filtered.length && (
              <div className="mt-8 text-center">
                <button type="button" onClick={() => setVisible((v) => v + PAGE)} className="rounded-md bg-red-500 px-6 py-2 text-sm font-semibold text-white">Ver más</button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
