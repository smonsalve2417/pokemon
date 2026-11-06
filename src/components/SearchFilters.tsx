import type { FormEvent } from 'react'
import type { Generation } from '../utils'

interface Props {
  query: string
  gen: Generation | 0
  onQuery: (v: string) => void
  onGen: (v: Generation | 0) => void
}

export default function SearchFilters({ query, gen, onQuery, onGen }: Props) {
  return (
    <form role="search" onSubmit={(e: FormEvent) => e.preventDefault()} className="mx-auto mt-6 flex max-w-xl flex-col gap-2 sm:flex-row">
      <div className="flex flex-1">
        <label htmlFor="q" className="sr-only">Buscar Pokémon</label>
        <input id="q" type="search" value={query} onChange={(e) => onQuery(e.target.value)} placeholder="Buscar Pokémon..."
          className="min-w-0 flex-1 rounded-l-md bg-white px-3 py-2 text-sm text-slate-900" />
        <button type="submit" className="rounded-r-md bg-red-500 px-4 py-2 text-sm font-semibold text-white">Buscar</button>
      </div>
      <label htmlFor="gen" className="sr-only">Generación</label>
      <select id="gen" value={gen} onChange={(e) => onGen(Number(e.target.value) as Generation | 0)} className="rounded-md bg-white px-3 py-2 text-sm text-slate-900">
        <option value={0}>Todas las generaciones</option>
        <option value={1}>Generación I (Kanto)</option>
        <option value={2}>Generación II (Johto)</option>
        <option value={3}>Generación III (Hoenn)</option>
      </select>
    </form>
  )
}
