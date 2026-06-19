"use client";

import Link from "next/link";
import PixelNpc from "./PixelNpc";

type Room = {
  href: string;
  label: string;
  color: string; // banner + accent colour
  roof: string;
};

const ROOMS: Room[] = [
  {href: "/chess", label: "Chess", color: "#e5e7eb", roof: "#a8a29e"},
  {href: "/games", label: "Video Games", color: "#d946ef", roof: "#a21caf"},
  {href: "/manga", label: "Manga", color: "#f5f5f5", roof: "#525252"},
  {href: "/warhammer", label: "Warhammer", color: "#d4af37", roof: "#7a1d1d"},
];

/** A pixel-art castle tower with a coloured banner. */
function Tower({color, roof}: {color: string; roof: string}) {
  const stone = "#8b8f96";
  const stoneDark = "#6c7077";
  const stoneLight = "#a7abb1";
  return (
    <svg
      viewBox="0 0 16 30"
      width="84"
      className="pixel-sprite drop-shadow-[0_6px_0_rgba(0,0,0,0.4)]"
      role="img"
      aria-hidden="true"
    >
      {/* body */}
      <rect x="4" y="9" width="8" height="21" fill={stone} />
      <rect x="4" y="9" width="1" height="21" fill={stoneDark} />
      <rect x="11" y="9" width="1" height="21" fill={stoneLight} />
      {/* crenellations */}
      <rect x="4" y="8" width="2" height="1" fill={stone} />
      <rect x="7" y="8" width="2" height="1" fill={stone} />
      <rect x="10" y="8" width="2" height="1" fill={stone} />
      <rect x="4" y="7" width="2" height="1" fill={stone} />
      <rect x="10" y="7" width="2" height="1" fill={stone} />
      {/* brick lines */}
      <rect x="4" y="14" width="8" height="1" fill={stoneDark} />
      <rect x="4" y="20" width="8" height="1" fill={stoneDark} />
      {/* windows */}
      <rect x="6" y="11" width="1" height="2" fill="#1b2a3a" />
      <rect x="9" y="11" width="1" height="2" fill="#1b2a3a" />
      {/* door */}
      <rect x="7" y="26" width="2" height="4" fill="#2b2320" />
      {/* flag pole + banner */}
      <rect x="8" y="1" width="1" height="7" fill="#c9c9c9" />
      <polygon points="9,1 14,2.5 9,4" fill={color} />
      <polygon points="9,1 14,2.5 9,4" fill="none" stroke={roof} strokeWidth="0.3" />
    </svg>
  );
}

export default function WorldScene({
  walk,
  arrived,
}: {
  walk: boolean;
  arrived: boolean;
}) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* sky */}
      <div className="absolute inset-x-0 top-0 h-[58%] bg-gradient-to-b from-indigo-950 via-purple-900 to-orange-300" />
      {/* sun glow on the horizon */}
      <div className="absolute left-1/2 top-[44%] h-40 w-40 -translate-x-1/2 rounded-full bg-amber-200/70 blur-2xl" />
      {/* ground */}
      <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-b from-emerald-900 to-emerald-950" />
      {/* road (trapezoid towards the horizon) */}
      <div
        className="absolute bottom-0 left-1/2 h-[42%] w-[80%] -translate-x-1/2 bg-neutral-700"
        style={{clipPath: "polygon(42% 0, 58% 0, 100% 100%, 0 100%)"}}
      />
      {/* dashed centre line */}
      <div
        className="absolute bottom-0 left-1/2 h-[42%] w-[3%] -translate-x-1/2"
        style={{
          clipPath: "polygon(46% 0, 54% 0, 70% 100%, 30% 100%)",
          backgroundImage:
            "repeating-linear-gradient(to top, #facc15 0 6%, transparent 6% 14%)",
        }}
      />

      {/* title */}
      <div className="absolute inset-x-0 top-6 z-10 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/60">
          Select a world
        </p>
        <h1 className="text-3xl font-black tracking-tight text-white drop-shadow sm:text-5xl">
          gasemilauh
        </h1>
      </div>

      {/* four towers along the horizon */}
      <div
        className={`absolute inset-x-0 top-[24%] z-10 flex items-end justify-center gap-3 px-3 transition-opacity duration-700 sm:gap-8 ${
          arrived ? "opacity-100" : "opacity-0"
        }`}
      >
        {ROOMS.map((room, i) => (
          <div
            key={room.href}
            className={`flex flex-col items-center ${arrived ? "tower-rise" : ""}`}
            style={arrived ? {animationDelay: `${i * 140}ms`} : undefined}
          >
            <Tower color={room.color} roof={room.roof} />
            <Link
              href={room.href}
              tabIndex={arrived ? 0 : -1}
              aria-label={`Enter ${room.label}`}
              className="mt-2 border-2 bg-black/70 px-2 py-1 text-center text-[9px] uppercase leading-tight tracking-widest text-white transition-colors hover:bg-black sm:px-3 sm:text-[10px]"
              style={{borderColor: room.color, color: room.color}}
            >
              <span className="block text-white">{room.label}</span>
              <span className="block">▶ Enter</span>
            </Link>
          </div>
        ))}
      </div>

      {/* Gaston, walking up the road then standing */}
      <div className="absolute bottom-[6%] left-1/2 z-20 -translate-x-1/2">
        <div className={walk ? "npc-walk" : arrived ? "npc-arrived" : ""}>
          <div className={walk ? "npc-step" : ""}>
            <PixelNpc width={130} className="drop-shadow-[0_8px_0_rgba(0,0,0,0.45)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
