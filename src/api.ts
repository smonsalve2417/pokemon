import type { PokemonDetail, PokemonSummary } from "./types";

const BASE = "https://pokeapi.co/api/v2/pokemon";

async function get<T>(url: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`La API respondió con error ${res.status}`);
  return res.json() as Promise<T>;
}

// Fetch 1: lista (generaciones I a III = 386 Pokémon)
export async function getPokemonList(
  signal?: AbortSignal,
): Promise<PokemonSummary[]> {
  const data = await get<{ results: { name: string; url: string }[] }>(
    `${BASE}?limit=386`,
    signal,
  );
  return data.results.map((r) => ({
    name: r.name,
    id: Number(r.url.split("/").filter(Boolean).pop()),
  }));
}
export async function getPokemonPagination(
  offset: number,
  limit: number,
  signal?: AbortSignal,
): Promise<PokemonSummary[]> {
  const data = await get<{ results: { name: string; url: string }[] }>(
    `${BASE}?offset=${offset}&limit=${limit}`,
    signal,
  );
  return data.results.map((r) => ({
    name: r.name,
    id: Number(r.url.split("/").filter(Boolean).pop()),
  }));
}

// Fetch 2: detalle por ID
export const getPokemon = (id: string, signal?: AbortSignal) =>
  get<PokemonDetail>(`${BASE}/${id}`, signal);
