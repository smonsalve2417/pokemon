export interface PokemonSummary {
  id: number;
  name: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number | null;
  types: { type: { name: string } }[];
  abilities: { ability: { name: string }; is_hidden: boolean }[];
}

export type ToastType = "success" | "error" | "info";

export interface Toast {
  id: number;
  type: ToastType;
  message: string;
}
export type Notify = (type: ToastType, message: string) => void;

export interface FavoritesProps {
  favorites: PokemonSummary[];
  onAdd: (p: PokemonSummary) => void;
  onRemove: (p: PokemonSummary) => void;
}
