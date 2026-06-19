"use client";

import Link from "next/link";
import PixelNpc from "./PixelNpc";
import Dialogue from "./Dialogue";
import {CASTLES} from "./Castles";

type Room = {
  href: keyof typeof CASTLES;
  label: string;
  color: string;
  x: number; // horizontal position, %
  bottom: string; // distance from the bottom (grounded vs floating)
};

const ROOMS: Room[] = [
  {href: "/chess", label: "Chess", color: "#e5e7eb", x: 14, bottom: "40%"},
  {href: "/games", label: "Video Games", color: "#4ade80", x: 38, bottom: "40%"},
  {href: "/manga", label: "Manga", color: "#f472b6", x: 62, bottom: "52%"},
  {href: "/warhammer", label: "Warhammer", color: "#d4af37", x: 86, bottom: "40%"},
];

// roads converge to this clearing (in the 0..100 road-SVG space)
const JUNCTION = {x: 50, y: 92, halfWidth: 5};

const STARFIELD_1 =
  "radial-gradient(1.5px 1.5px at 20% 30%, #fff, transparent), radial-gradient(1.5px 1.5px at 70% 18%, #fff, transparent), radial-gradient(1px 1px at 45% 50%, #fff, transparent), radial-gradient(1.5px 1.5px at 85% 38%, #fff, transparent), radial-gradient(1px 1px at 12% 62%, #fff, transparent), radial-gradient(2px 2px at 32% 12%, #fff, transparent), radial-gradient(1px 1px at 50% 35%, #fff, transparent), radial-gradient(1.5px 1.5px at 78% 55%, #fff, transparent), radial-gradient(1px 1px at 5% 40%, #fff, transparent), radial-gradient(1.5px 1.5px at 95% 25%, #fff, transparent)";
const STARFIELD_2 =
  "radial-gradient(1px 1px at 55% 14%, #fff, transparent), radial-gradient(1.5px 1.5px at 90% 60%, #fff, transparent), radial-gradient(1px 1px at 33% 22%, #fff, transparent), radial-gradient(1px 1px at 60% 44%, #fff, transparent), radial-gradient(1.5px 1.5px at 8% 28%, #fff, transparent), radial-gradient(2px 2px at 40% 8%, #fff, transparent), radial-gradient(1px 1px at 25% 48%, #fff, transparent), radial-gradient(1.5px 1.5px at 65% 30%, #fff, transparent), radial-gradient(1px 1px at 82% 12%, #fff, transparent), radial-gradient(1px 1px at 48% 58%, #fff, transparent)";
const STARFIELD_3 =
  "radial-gradient(2.5px 2.5px at 18% 16%, #fff, transparent), radial-gradient(2.5px 2.5px at 72% 40%, #fff, transparent), radial-gradient(2px 2px at 38% 32%, #fff, transparent), radial-gradient(2.5px 2.5px at 88% 20%, #fff, transparent), radial-gradient(2px 2px at 58% 52%, #fff, transparent), radial-gradient(2px 2px at 28% 58%, #fff, transparent)";

// fixed pebble layout along a road (deterministic, no hydration mismatch)
const PEBBLES: [number, number, number][] = [
  [0.18, -2, 1],
  [0.3, 2, 1.2],
  [0.45, -3, 1],
  [0.58, 3, 1.3],
  [0.72, -2.5, 1],
  [0.85, 2.5, 1.1],
];
const PEBBLE_SHADES = ["#7d6342", "#5a4530", "#8a6a3a", "#6b5436"];

export default function WorldScene({
  talking,
  arrived,
  onTalkDone,
}: {
  talking: boolean;
  arrived: boolean;
  onTalkDone: () => void;
}) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* ---- SKY: day layer ---- */}
      <div className="absolute inset-x-0 top-0 h-[60%] bg-gradient-to-b from-sky-500 via-sky-300 to-amber-100" />

      {/* ---- SKY: night layer with stars ---- */}
      <div className="sky-night absolute inset-x-0 top-0 h-[60%] bg-gradient-to-b from-slate-950 via-indigo-950 to-indigo-900">
        <div className="stars absolute inset-0" style={{backgroundImage: STARFIELD_1}} />
        <div className="stars-2 absolute inset-0" style={{backgroundImage: STARFIELD_2}} />
        <div className="stars-3 absolute inset-0" style={{backgroundImage: STARFIELD_3}} />
      </div>

      {/* sun + moon arc across the sky and set below the horizon */}
      <div className="sun-body absolute left-1/2 top-[58%] h-20 w-20 rounded-full bg-amber-200 shadow-[0_0_60px_30px_rgba(254,240,138,0.7)]" />
      <div className="moon-body absolute left-1/2 top-[58%] h-16 w-16 rounded-full bg-stone-100 shadow-[0_0_50px_18px_rgba(255,255,255,0.45)]" />

      {/* ---- GROUND (textured grass) ---- */}
      <div
        className="absolute inset-x-0 bottom-0 h-[40%]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(5,46,22,0.35) 1px, transparent 1.6px), radial-gradient(circle, rgba(220,252,231,0.18) 1px, transparent 1.4px), linear-gradient(to bottom, #16a34a, #052e16)",
          backgroundSize: "8px 8px, 11px 11px, 100% 100%",
          backgroundPosition: "0 0, 4px 5px, 0 0",
        }}
      />

      {/* ---- ROADS converging to the clearing by the knight ---- */}
      <svg
        className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        {ROOMS.map((room, i) => (
          <polygon
            key={room.href}
            points={`${room.x - 2.5},60 ${room.x + 2.5},60 ${JUNCTION.x + JUNCTION.halfWidth},${JUNCTION.y} ${JUNCTION.x - JUNCTION.halfWidth},${JUNCTION.y}`}
            fill={i % 2 === 0 ? "#5f4a32" : "#6b5436"}
          />
        ))}
        {/* pebble texture following each road */}
        {ROOMS.flatMap((room) =>
          PEBBLES.map(([t, dx, r], k) => {
            const px = room.x + (JUNCTION.x - room.x) * t + dx;
            const py = 60 + (JUNCTION.y - 60) * t;
            return (
              <ellipse
                key={`${room.href}-${k}`}
                cx={px}
                cy={py}
                rx={r}
                ry={r}
                fill={PEBBLE_SHADES[k % PEBBLE_SHADES.length]}
              />
            );
          }),
        )}
        {/* a worn dirt clearing where the roads meet */}
        <ellipse cx={JUNCTION.x} cy={JUNCTION.y} rx="13" ry="4" fill="#6b5436" />
        <ellipse cx={JUNCTION.x} cy={JUNCTION.y} rx="9" ry="2.5" fill="#5f4a32" />
      </svg>

      {/* ---- CASTLES (grounded, except the floating manga island) ---- */}
      {ROOMS.map((room, i) => {
        const CastleComp = CASTLES[room.href];
        const delay = {animationDelay: `${i * 160}ms`};
        return (
          <Link
            key={room.href}
            href={room.href}
            tabIndex={arrived ? 0 : -1}
            aria-label={`Enter ${room.label}`}
            style={{left: `${room.x}%`, bottom: room.bottom}}
            className={`group absolute z-10 -translate-x-1/2 ${
              arrived ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            {/* selection pointer above the castle (on hover / focus) */}
            <span className="pointer-bounce pointer-events-none absolute bottom-full left-1/2 mb-1 -translate-x-1/2 whitespace-nowrap text-center opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
              <span
                className="block rounded border-2 bg-black/85 px-2 py-1 text-[8px] uppercase tracking-widest text-white sm:text-[9px]"
                style={{borderColor: room.color, fontFamily: "var(--font-pixel)"}}
              >
                {room.label}
              </span>
              <span className="text-sm" style={{color: room.color}}>
                ▼
              </span>
            </span>
            {/* ground mask: the castle emerges from its bottom edge */}
            <div className="overflow-hidden">
              <div
                className={arrived ? "rise-from-ground" : "underground"}
                style={arrived ? delay : undefined}
              >
                <CastleComp />
              </div>
            </div>
          </Link>
        );
      })}

      {/* ---- The knight, standing in the clearing, gazing at the horizon ---- */}
      <div className="absolute bottom-[5%] left-1/2 z-20 -translate-x-1/2">
        <div className="npc-idle">
          <PixelNpc width={140} className="drop-shadow-[0_8px_0_rgba(0,0,0,0.45)]" />
        </div>
      </div>

      {/* ---- Speech bubble (knight is already on the road) ---- */}
      {talking && <Dialogue onDone={onTalkDone} />}
    </section>
  );
}
