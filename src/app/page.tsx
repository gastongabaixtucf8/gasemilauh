"use client";

import {useEffect, useState} from "react";
import Link from "next/link";
import RetroIntro from "./RetroIntro";

const ROOMS = [
  {
    href: "/chess",
    label: "Chess",
    glyph: "♞",
    blurb: "Openings, ratings & trophies",
    className: "from-stone-100 to-stone-300 text-stone-900 hover:to-white",
  },
  {
    href: "/games",
    label: "Video Games",
    glyph: "🎮",
    blurb: "Records, ratings & wishlist",
    className: "from-fuchsia-600 to-indigo-700 text-white hover:to-indigo-500",
  },
  {
    href: "/manga",
    label: "Manga",
    glyph: "✷",
    blurb: "What I read, ranked",
    className: "from-neutral-50 to-neutral-200 text-black hover:to-white",
  },
  {
    href: "/warhammer",
    label: "Warhammer",
    glyph: "✠",
    blurb: "Figurines & battle plans",
    className: "from-zinc-800 to-black text-amber-200 hover:to-zinc-700",
  },
];

export default function Home() {
  // The retro intro plays on top until Gaston finishes (or the user skips).
  const [introDone, setIntroDone] = useState(false);

  // Respect reduced-motion: don't force the cutscene.
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIntroDone(true);
    }
  }, []);

  return (
    <>
      {!introDone && <RetroIntro onDone={() => setIntroDone(true)} />}

      <main className="flex-1 bg-neutral-950 text-white">
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-12 px-6 py-16">
          <header className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-neutral-500">
              Select a world
            </p>
            <h1 className="mt-3 text-5xl font-black tracking-tight sm:text-7xl">
              gasemilauh
            </h1>
            <p className="mt-3 text-neutral-400">A hub for the things I love.</p>
          </header>

          <nav
            className={`grid w-full grid-cols-1 gap-6 transition-opacity duration-500 sm:grid-cols-2 ${
              introDone ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            {ROOMS.map((room, i) => (
              <Link
                key={room.href}
                href={room.href}
                tabIndex={introDone ? 0 : -1}
                style={introDone ? {animationDelay: `${i * 90}ms`} : undefined}
                className={`group relative flex aspect-[16/9] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br p-7 ring-1 ring-white/10 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl ${
                  introDone ? "tile-rise" : ""
                } ${room.className}`}
              >
                <span className="text-5xl drop-shadow-sm transition-transform duration-200 group-hover:scale-110">
                  {room.glyph}
                </span>
                <span>
                  <span className="block text-2xl font-bold">{room.label}</span>
                  <span className="block text-sm opacity-80">{room.blurb}</span>
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </main>
    </>
  );
}
