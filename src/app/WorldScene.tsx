"use client";

import Link from "next/link";
import PixelNpc from "./PixelNpc";
import Dialogue from "./Dialogue";
import {CASTLES} from "./Castles";

type Room = {href: keyof typeof CASTLES; label: string; color: string};

const ROOMS: Room[] = [
  {href: "/chess", label: "Chess", color: "#e5e7eb"},
  {href: "/games", label: "Video Games", color: "#d946ef"},
  {href: "/manga", label: "Manga", color: "#f5f5f5"},
  {href: "/warhammer", label: "Warhammer", color: "#d4af37"},
];

const STARFIELD_1 =
  "radial-gradient(1.5px 1.5px at 20% 30%, #fff, transparent), radial-gradient(1.5px 1.5px at 70% 18%, #fff, transparent), radial-gradient(1px 1px at 45% 50%, #fff, transparent), radial-gradient(1.5px 1.5px at 85% 38%, #fff, transparent), radial-gradient(1px 1px at 12% 62%, #fff, transparent), radial-gradient(2px 2px at 32% 12%, #fff, transparent), radial-gradient(1px 1px at 50% 35%, #fff, transparent), radial-gradient(1.5px 1.5px at 78% 55%, #fff, transparent), radial-gradient(1px 1px at 5% 40%, #fff, transparent), radial-gradient(1.5px 1.5px at 95% 25%, #fff, transparent)";
const STARFIELD_2 =
  "radial-gradient(1px 1px at 55% 14%, #fff, transparent), radial-gradient(1.5px 1.5px at 90% 60%, #fff, transparent), radial-gradient(1px 1px at 33% 22%, #fff, transparent), radial-gradient(1px 1px at 60% 44%, #fff, transparent), radial-gradient(1.5px 1.5px at 8% 28%, #fff, transparent), radial-gradient(2px 2px at 40% 8%, #fff, transparent), radial-gradient(1px 1px at 25% 48%, #fff, transparent), radial-gradient(1.5px 1.5px at 65% 30%, #fff, transparent), radial-gradient(1px 1px at 82% 12%, #fff, transparent), radial-gradient(1px 1px at 48% 58%, #fff, transparent)";

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
      <div className="sun-body absolute left-1/2 top-[34%] h-20 w-20 rounded-full bg-amber-200 shadow-[0_0_60px_30px_rgba(254,240,138,0.7)]" />

      {/* ---- SKY: night layer (fades in as time passes) ---- */}
      <div className="sky-night absolute inset-x-0 top-0 h-[60%] bg-gradient-to-b from-slate-950 via-indigo-950 to-indigo-800">
        <div className="stars absolute inset-0" style={{backgroundImage: STARFIELD_1}} />
        <div className="stars-2 absolute inset-0" style={{backgroundImage: STARFIELD_2}} />
        <div className="moon-body absolute left-1/2 top-[28%] h-14 w-14 rounded-full bg-stone-100 shadow-[0_0_40px_15px_rgba(255,255,255,0.4)]" />
      </div>

      {/* ---- GROUND ---- */}
      <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-b from-emerald-700 to-emerald-950" />

      {/* ---- CASTLES standing on the horizon, each with a road leading up ---- */}
      <div className="absolute inset-x-0 bottom-[40%] z-10 mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-y-16 px-6 sm:px-10">
        {ROOMS.map((room, i) => {
          const CastleComp = CASTLES[room.href];
          const delay = {animationDelay: `${i * 160}ms`};
          return (
            <Link
              key={room.href}
              href={room.href}
              tabIndex={arrived ? 0 : -1}
              aria-label={`Enter ${room.label}`}
              className={`group relative block ${
                arrived ? "pointer-events-auto" : "pointer-events-none"
              }`}
            >
              {/* dirt road running from the foreground up to this castle */}
              <span
                aria-hidden
                className="absolute left-1/2 top-full -z-10 -translate-x-1/2"
                style={{
                  height: "42vh",
                  width: "70px",
                  clipPath: "polygon(36% 0, 64% 0, 100% 100%, 0 100%)",
                  backgroundImage: "linear-gradient(to bottom, #5a4530, #7d6342)",
                }}
              />
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
      </div>

      {/* ---- The knight, standing on the road, gazing at the horizon ---- */}
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
