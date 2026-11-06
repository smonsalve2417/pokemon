import { useEffect, useMemo, useRef, useState } from "react";
import { getPokemonPagination } from "../api";
import PageHero from "../components/PageHero";
import PokemonCard from "../components/PokemonCard";
import SearchFilters from "../components/SearchFilters";
import StatusMessage from "../components/StatusMessage";
import { useFetch } from "../hooks/useFetch";
import type { FavoritesProps, PokemonSummary } from "../types";
import { generationOf, type Generation } from "../utils";

const PAGE = 24;
const TOTAL_POKEMON = 386;

export default function Explore({
  favorites,
  onAdd,
  onRemove,
}: FavoritesProps) {
  const { data, loading, error, retry } = useFetch(
    (signal) => getPokemonPagination(0, PAGE, signal),
    [],
  );
  const [additionalPokemon, setAdditionalPokemon] = useState<PokemonSummary[]>(
    [],
  );
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadMoreError, setLoadMoreError] = useState<string | null>(null);
  const [hasMorePages, setHasMorePages] = useState<boolean | null>(null);
  const [loadingAll, setLoadingAll] = useState(false);
  const [loadAllError, setLoadAllError] = useState<string | null>(null);
  const [loadAllAttempt, setLoadAllAttempt] = useState(0);
  const loadMoreController = useRef<AbortController | null>(null);
  const loadAllController = useRef<AbortController | null>(null);
  const [query, setQuery] = useState("");
  const [gen, setGen] = useState<Generation | 0>(0);
  const hasActiveFilter = Boolean(query.trim()) || gen !== 0;

  useEffect(
    () => () => {
      loadMoreController.current?.abort();
      loadAllController.current?.abort();
    },
    [],
  );

  useEffect(() => {
    if (!hasActiveFilter || loading || error || data === null) return;

    loadMoreController.current?.abort();
    setLoadingMore(false);

    const controller = new AbortController();
    loadAllController.current?.abort();
    loadAllController.current = controller;
    setLoadingAll(true);
    setLoadAllError(null);

    getPokemonPagination(0, TOTAL_POKEMON, controller.signal)
      .then((pokemon) => {
        setAdditionalPokemon(pokemon.slice(data.length));
        setHasMorePages(false);
      })
      .catch((e: unknown) => {
        if (e instanceof Error && e.name !== "AbortError") {
          setLoadAllError(e.message);
        }
      })
      .finally(() => {
        if (loadAllController.current === controller) {
          setLoadingAll(false);
          loadAllController.current = null;
        }
      });

    return () => controller.abort();
  }, [hasActiveFilter, loading, error, data, loadAllAttempt]);

  const allPokemon = useMemo(
    () => [...(data ?? []), ...additionalPokemon],
    [data, additionalPokemon],
  );

  async function handleLoadMore() {
    if (loadingMore || loadingAll) return;

    const controller = new AbortController();
    loadMoreController.current = controller;
    setLoadingMore(true);
    setLoadMoreError(null);
    try {
      const nextPage = await getPokemonPagination(
        allPokemon.length,
        PAGE,
        controller.signal,
      );
      setAdditionalPokemon((previous) => [...previous, ...nextPage]);
      setHasMorePages(nextPage.length === PAGE);
    } catch (e) {
      if (e instanceof Error && e.name === "AbortError") return;
      setLoadMoreError(e instanceof Error ? e.message : String(e));
    } finally {
      if (!controller.signal.aborted) {
        setLoadingMore(false);
        loadMoreController.current = null;
      }
    }
  }

  function retryLoadAll() {
    setLoadAllAttempt((attempt) => attempt + 1);
  }

  const filtered = useMemo(
    () =>
      allPokemon.filter(
        (p) =>
          p.name.includes(query.trim().toLowerCase()) &&
          (gen === 0 || generationOf(p.id) === gen),
      ),
    [allPokemon, query, gen],
  );
  const hasMore = hasMorePages ?? data?.length === PAGE;

  return (
    <>
      <PageHero
        title="Explorar"
        accent="Pokémon"
        subtitle="Datos obtenidos en tiempo real desde la API"
      >
        <SearchFilters
          query={query}
          gen={gen}
          onQuery={setQuery}
          onGen={setGen}
        />
      </PageHero>
      <div className="mx-auto max-w-6xl px-4 py-8">
        {loading && <StatusMessage kind="loading" />}
        {error && <StatusMessage kind="error" onRetry={retry} />}
        {!loading && !error && loadingAll && (
          <StatusMessage kind="loading" message="Cargando Pokémon para aplicar el filtro..." />
        )}
        {!loading && !error && loadAllError && (
          <StatusMessage
            kind="error"
            message={loadAllError}
            onRetry={retryLoadAll}
          />
        )}
        {!loading && !error && !loadingAll && !loadAllError && (
          <>
            <div className="mb-4 flex items-baseline justify-between">
              <h2 className="text-lg font-bold">Resultados</h2>
              <p className="text-xs text-slate-500">
                {filtered.length} resultados en los Pokémon cargados
              </p>
            </div>
            {filtered.length === 0 ? (
              <StatusMessage
                kind="empty"
                message="No se encontraron Pokémon con esa búsqueda."
              />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((p) => (
                  <PokemonCard
                    key={p.id}
                    pokemon={p}
                    isFavorite={favorites.some((f) => f.id === p.id)}
                    onAdd={onAdd}
                    onRemove={onRemove}
                  />
                ))}
              </div>
            )}
            {loadMoreError && (
              <StatusMessage
                kind="error"
                message={loadMoreError}
                onRetry={handleLoadMore}
              />
            )}
            {hasMore && !loadMoreError && (
              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="rounded-md bg-red-500 px-6 py-2 text-sm font-semibold text-white"
                >
                  {loadingMore ? "Cargando..." : "Ver más"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
