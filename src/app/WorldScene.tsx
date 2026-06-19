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
  "radial-gradient(1.5px 1.5px at 20% 30%, #fff, transparent), radial-gradient(1.5px 1.5px at 70% 18%, #fff, transparent), radial-gradient(1px 1px at 45% 50%, #fff, transparent), radial-gradient(1.5px 1.5px at 85% 38%, #fff, transparent), radial-gradient(1px 1px at 12% 62%, #fff, transparent)";
const STARFIELD_2 =
  "radial-gradient(1px 1px at 55% 14%, #fff, transparent), radial-gradient(1.5px 1.5px at 90% 60%, #fff, transparent), radial-gradient(1px 1px at 33% 22%, #fff, transparent), radial-gradient(1px 1px at 60% 44%, #fff, transparent), radial-gradient(1.5px 1.5px at 8% 28%, #fff, transparent)";

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
      {/* dirt road towards the horizon */}
      <div
        className="absolute bottom-0 left-1/2 h-[40%] w-[78%] -translate-x-1/2 bg-[#6b5436]"
        style={{clipPath: "polygon(43% 0, 57% 0, 100% 100%, 0 100%)"}}
      />
      <div
        className="absolute bottom-0 left-1/2 h-[40%] w-[60%] -translate-x-1/2 bg-[#7d6342]"
        style={{clipPath: "polygon(46% 0, 54% 0, 82% 100%, 18% 100%)"}}
      />

      {/* ---- CASTLES on hills (rise from the ground when Gaston looks to the horizon) ---- */}
      <div className="absolute inset-x-0 top-[20%] z-10 mx-auto flex max-w-5xl flex-wrap items-end justify-center gap-x-4 gap-y-6 px-4 sm:gap-x-8">
        {ROOMS.map((room, i) => {
          const CastleComp = CASTLES[room.href];
          const delay = {animationDelay: `${i * 160}ms`};
          return (
            <div key={room.href} className="relative flex flex-col items-center">
              {/* grassy hill behind the castle */}
              <div className="absolute bottom-9 -z-10 h-16 w-36 rounded-[50%] bg-emerald-700" />
              {/* ground mask: the castle emerges from its bottom edge */}
              <div className="overflow-hidden">
                <div
                  className={arrived ? "rise-from-ground" : "underground"}
                  style={arrived ? delay : undefined}
                >
                  <CastleComp />
                </div>
              </div>
              <Link
                href={room.href}
                tabIndex={arrived ? 0 : -1}
                aria-label={`Enter ${room.label}`}
                style={{
                  borderColor: room.color,
                  color: room.color,
                  fontFamily: "var(--font-pixel)",
                  ...(arrived ? delay : {}),
                }}
                className={`mt-2 rounded-sm border-2 bg-black/75 px-2 py-1 text-center text-[9px] uppercase leading-tight tracking-widest transition-opacity duration-500 hover:bg-black sm:px-3 sm:text-[10px] ${
                  arrived ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                <span className="block text-white">{room.label}</span>
                <span className="block">▶ Enter</span>
              </Link>
            </div>
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
