import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ToastContainer from "./components/ToastContainer";
import type { Notify, PokemonSummary, Toast } from "./types";
import Contact from "./pages/Contact";
import Detail from "./pages/Detail";
import Explore from "./pages/Explore";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { capitalize } from "./utils";

const FAVORITES_STORAGE_KEY = "pokemon-favorites";

function isPokemonSummary(value: unknown): value is PokemonSummary {
  if (typeof value !== "object" || value === null) return false;
  const pokemon = value as Record<string, unknown>;
  return (
    Number.isInteger(pokemon.id) &&
    typeof pokemon.name === "string" &&
    pokemon.name.length > 0
  );
}

function loadFavorites(): PokemonSummary[] {
  try {
    const stored = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (stored === null) return [];

    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed) || !parsed.every(isPokemonSummary)) {
      throw new Error("Los favoritos guardados tienen un formato inválido.");
    }
    return parsed;
  } catch (error) {
    console.error(
      "No se pudieron cargar los favoritos del almacenamiento local.",
      error,
    );
    return [];
  }
}

export default function App() {
  const [favorites, setFavorites] = useState<PokemonSummary[]>(loadFavorites);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(favorites),
      );
    } catch (error) {
      console.error(
        "No se pudieron guardar los favoritos en el almacenamiento local.",
        error,
      );
    }
  }, [favorites]);

  const dismiss = (id: number) =>
    setToasts((t) => t.filter((x) => x.id !== id));

  const notify: Notify = (type, message) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, type, message }]);
    setTimeout(() => dismiss(id), 3000);
  };

  const onAdd = (p: PokemonSummary) => {
    setFavorites((prev) =>
      prev.some((f) => f.id === p.id) ? prev : [...prev, p],
    );

    notify("success", `${capitalize(p.name)} agregado a favoritos`);
  };

  const onRemove = (p: PokemonSummary) => {
    setFavorites((prev) => prev.filter((f) => f.id !== p.id));
    notify("info", `${capitalize(p.name)} quitado de favoritos`);
  };

  const fav = { favorites, onAdd, onRemove };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Navbar favoritesCount={favorites.length} />
      <main>
        <Routes>
          <Route path="/" element={<Home onNotify={notify} />} />
          <Route path="/explorar" element={<Explore {...fav} />} />
          <Route path="/explorar/:id" element={<Detail {...fav} />} />
          <Route path="/favoritos" element={<Favorites {...fav} />} />
          <Route path="/contacto" element={<Contact onNotify={notify} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}
