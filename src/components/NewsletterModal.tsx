import { useEffect, useRef } from "react";
import type { Notify } from "../types";

/* Dark Pattern */
export default function NewsletterModal({
  onDone,
  onNotify,
}: {
  onDone: () => void;
  onNotify: Notify;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const t = setTimeout(() => ref.current?.showModal(), 1000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    ref.current?.close();
    onDone();
  };

  return (
    <dialog
      ref={ref}
      onCancel={(e) => {
        e.preventDefault();
        console.log("Se bloqueó Escape");
      }} // bloquea Esc para que tenga q darle varis veces
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
