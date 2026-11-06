import { useState } from "react";
import { Link } from "react-router-dom";
import NewsletterModal from "../components/NewsletterModal";
import PageHero from "../components/PageHero";
import type { Notify } from "../types";

export default function Home({ onNotify }: { onNotify: Notify }) {
  const [dismissed, setDismissed] = useState(false);
  return (
    <>
      <PageHero
        size="lg"
        title="Descubre el"
        accent="Mundo Pokémon"
        subtitle="Explora los pokemones. Busca, filtra y guarda tus favoritos."
      >
        <Link
          to="/explorar"
          className="mt-6 inline-block rounded-md bg-red-500 px-6 py-2 text-sm font-semibold text-white hover:bg-red-600"
        >
          Explorar ahora
        </Link>
      </PageHero>
      {!dismissed && (
        <NewsletterModal
          onNotify={onNotify}
          onDone={() => setDismissed(true)}
        />
      )}
    </>
  );
}
