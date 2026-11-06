export const artwork = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, ' ')

export type Generation = 1 | 2 | 3
export const generationOf = (id: number): Generation => (id <= 151 ? 1 : id <= 251 ? 2 : 3)
export const genInfo: Record<Generation, { roman: string; region: string }> = {
  1: { roman: 'I', region: 'Kanto' },
  2: { roman: 'II', region: 'Johto' },
  3: { roman: 'III', region: 'Hoenn' },
}
