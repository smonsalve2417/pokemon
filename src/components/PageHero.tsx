import type { ReactNode } from "react";

interface Props {
  title: string;
  accent: string;
  subtitle: string;
  size?: "lg" | "md";
  children?: ReactNode;
}

export default function PageHero({
  title,
  accent,
  subtitle,
  size = "md",
  children,
}: Props) {
  return (
    <section
      className={`bg-gradient-to-b from-slate-900 to-slate-800 px-4 text-center text-white ${size === "lg" ? "py-24 sm:py-32" : "py-10"}`}
    >
      <h1
        className={`font-extrabold ${size === "lg" ? "text-4xl sm:text-5xl" : "text-3xl"}`}
      >
        {title} <span className="text-red-500">{accent}</span>
      </h1>
      <p className="mx-auto mt-3 max-w-sm text-sm text-slate-300">{subtitle}</p>
      {children}
    </section>
  );
}
