"use client";

import {useEffect, useState} from "react";
import Link from "next/link";

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

const MESSAGES = [
  "Hello, welcome to my website. My name is Gaston",
  "Follow me on the tour!",
];

export default function Home() {
  const [msgIndex, setMsgIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  // Respect users who prefer no motion: skip straight to the end.
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setMsgIndex(MESSAGES.length - 1);
      setTyped(MESSAGES[MESSAGES.length - 1]);
      setDone(true);
    }
  }, []);

  // Typewriter effect, one message after another.
  useEffect(() => {
    if (done) return;
    let cancelled = false;
    const full = MESSAGES[msgIndex];
    setTyped("");
    let i = 0;
    const typer = setInterval(() => {
      if (cancelled) return;
      i += 1;
      setTyped(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(typer);
        setTimeout(() => {
          if (cancelled) return;
          if (msgIndex < MESSAGES.length - 1) {
            setMsgIndex((m) => m + 1);
          } else {
            setDone(true);
          }
        }, 1100);
      }
    }, 45);
    return () => {
      cancelled = true;
      clearInterval(typer);
    };
  }, [msgIndex, done]);

  function skip() {
    setMsgIndex(MESSAGES.length - 1);
    setTyped(MESSAGES[MESSAGES.length - 1]);
    setDone(true);
  }

  return (
    <main className="flex-1 bg-neutral-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-10 px-6 py-16">
        <header className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-neutral-500">
            Select a world
          </p>
          <h1 className="mt-3 text-5xl font-black tracking-tight sm:text-7xl">
            gasemilauh
          </h1>
        </header>

        {/* Gaston the guide */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative max-w-md rounded-2xl bg-white px-5 py-4 text-center text-lg font-medium text-neutral-900 shadow-xl bubble-pop">
            <span aria-live="polite">{typed}</span>
            {!done && <span className="caret text-fuchsia-600">▌</span>}
            {/* little tail pointing down to Gaston */}
            <span className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-white" />
          </div>
          <div className="gaston-pop">
            <div className="gaston-bob text-6xl drop-shadow-lg sm:text-7xl">
              🙋
            </div>
          </div>
          {!done ? (
            <button
              onClick={skip}
              className="text-xs uppercase tracking-widest text-neutral-500 underline-offset-4 hover:text-neutral-300 hover:underline"
            >
              skip intro ▶
            </button>
          ) : (
            <p className="text-sm text-neutral-400">Pick a room to explore 👇</p>
          )}
        </div>

        {/* Tiles — locked until Gaston finishes speaking */}
        <nav
          aria-busy={!done}
          className={`grid w-full grid-cols-1 gap-6 transition-opacity duration-500 sm:grid-cols-2 ${
            done ? "opacity-100" : "pointer-events-none opacity-30 blur-[1px]"
          }`}
        >
          {ROOMS.map((room, i) => (
            <Link
              key={room.href}
              href={room.href}
              tabIndex={done ? 0 : -1}
              aria-disabled={!done}
              style={done ? {animationDelay: `${i * 80}ms`} : undefined}
              className={`group relative flex aspect-[16/9] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br p-7 ring-1 ring-white/10 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl ${
                done ? "tile-rise" : ""
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
  );
}
