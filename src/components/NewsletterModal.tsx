import { useEffect, useRef } from "react";
import type { Notify } from "../types";

/*
 * ⚠️ DARK PATTERN INTENCIONAL (con fines educativos) ⚠️
 * Este modal usa varios patrones oscuros a la vez:
 *  1. CONFIRMSHAMING: el botón de rechazo tiene un texto que culpa al usuario
 *     ("prefiero quedarme sin novedades").
 *  2. JERARQUÍA VISUAL ENGAÑOSA: "Sí" es grande y colorido; "No" es texto gris diminuto.
 *  3. SIN BOTÓN DE CERRAR (X) y se bloquea Esc (evento `cancel`), para forzar una elección.
 * Un diseño ético tendría botones de igual peso, texto neutro y un cierre claro.
 */
export default function NewsletterModal({
  onDone,
  onNotify,
}: {
  onDone: () => void;
  onNotify: Notify;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const t = setTimeout(() => ref.current?.showModal(), 3000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    ref.current?.close();
    onDone();
  };

  return (
    <dialog
      ref={ref}
      onCancel={(e) => e.preventDefault()} // bloquea Esc (dark pattern)
      aria-labelledby="nl-title"
      className="m-auto w-full max-w-sm rounded-xl p-6 text-center backdrop:bg-black/70 dark:bg-slate-800 dark:text-white"
    >
      <h2 id="nl-title" className="text-xl font-bold">
        ¡No te pierdas ningún Pokémon nuevo!
      </h2>
      <p className="mt-2 text-sm">
        Recibe alertas y ofertas exclusivas cada día.
      </p>
      <button
        type="button"
        onClick={() => {
          onNotify("success", "¡Suscrito! (simulado)");
          close();
        }}
        className="mt-5 w-full rounded-lg bg-red-400 py-3 text-lg font-bold text-white"
      >
        ¡Sí, quiero suscribirme!
      </button>
      <button
        type="button"
        onClick={close}
        className="mt-4 text-[10px] text-slate-400"
      >
        No gracias, prefiero quedarme sin novedades
      </button>
    </dialog>
  );
}
