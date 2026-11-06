import { useState } from 'react'
import type { PokemonSummary } from '../types'
import { capitalize } from '../utils'
import ConfirmDialog from './ConfirmDialog'

interface Props {
  pokemon: PokemonSummary
  isFavorite: boolean
  onAdd: (p: PokemonSummary) => void
  onRemove: (p: PokemonSummary) => void
  variant?: 'star' | 'full'
}

export default function FavoriteButton({ pokemon, isFavorite, onAdd, onRemove, variant = 'star' }: Props) {
  const [confirming, setConfirming] = useState(false)
  const name = capitalize(pokemon.name)

  const onClick = () => (isFavorite ? setConfirming(true) : onAdd(pokemon))
  const label = isFavorite ? `Quitar ${name} de favoritos` : `Agregar ${name} a favoritos`

  return (
    <>
      {variant === 'star' ? (
        <button type="button" onClick={onClick} aria-pressed={isFavorite} aria-label={label}
          className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-lg shadow ${isFavorite ? 'text-amber-400' : 'text-slate-400'}`}>
          ★
        </button>
      ) : (
        <button type="button" onClick={onClick} aria-pressed={isFavorite}
          className="rounded-lg bg-red-500 px-5 py-2 text-sm font-semibold text-white hover:bg-red-600">
          ★ {isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        </button>
      )}
      <ConfirmDialog
        open={confirming}
        title="¿Quitar de favoritos?"
        danger
        confirmText="Quitar"
        message={<>¿Estás seguro de que quieres quitar a <strong>{name}</strong> de tus favoritos?</>}
        onCancel={() => setConfirming(false)}
        onConfirm={() => {
          setConfirming(false)
          onRemove(pokemon)
        }}
      />
    </>
  )
}
