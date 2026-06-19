"use client";

import Link from "next/link";
import PixelNpc from "./PixelNpc";
import Dialogue from "./Dialogue";

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

/** A pixel-art castle: a central keep flanked by crenellated walls. */
function Castle({color, roof}: {color: string; roof: string}) {
  const stone = "#8b8f96";
  const stoneD = "#6c7077";
  const stoneL = "#a7abb1";
  const slit = "#1b2a3a";
  return (
    <svg
      viewBox="0 0 32 28"
      width="130"
      className="pixel-sprite drop-shadow-[0_6px_0_rgba(0,0,0,0.4)]"
      role="img"
      aria-hidden="true"
    >
      {/* side walls */}
      <rect x="1" y="13" width="13" height="15" fill={stone} />
      <rect x="18" y="13" width="13" height="15" fill={stone} />
      <rect x="1" y="13" width="13" height="1" fill={stoneL} />
      <rect x="18" y="13" width="13" height="1" fill={stoneL} />
      {/* wall crenellations */}
      <rect x="1" y="12" width="2" height="1" fill={stone} />
      <rect x="4" y="12" width="2" height="1" fill={stone} />
      <rect x="7" y="12" width="2" height="1" fill={stone} />
      <rect x="10" y="12" width="2" height="1" fill={stone} />
      <rect x="20" y="12" width="2" height="1" fill={stone} />
      <rect x="23" y="12" width="2" height="1" fill={stone} />
      <rect x="26" y="12" width="2" height="1" fill={stone} />
      <rect x="29" y="12" width="2" height="1" fill={stone} />
      {/* wall arrow slits */}
      <rect x="6" y="16" width="1" height="2" fill={slit} />
      <rect x="25" y="16" width="1" height="2" fill={slit} />

      {/* central keep */}
      <rect x="10" y="5" width="12" height="23" fill={stone} />
      <rect x="10" y="5" width="1" height="23" fill={stoneD} />
      <rect x="21" y="5" width="1" height="23" fill={stoneL} />
      {/* keep crenellations */}
      <rect x="10" y="4" width="2" height="1" fill={stone} />
      <rect x="13" y="4" width="2" height="1" fill={stone} />
      <rect x="16" y="4" width="2" height="1" fill={stone} />
      <rect x="19" y="4" width="2" height="1" fill={stone} />
      {/* brick lines */}
      <rect x="10" y="11" width="12" height="1" fill={stoneD} />
      <rect x="10" y="17" width="12" height="1" fill={stoneD} />
      {/* windows */}
      <rect x="12" y="8" width="1" height="2" fill={slit} />
      <rect x="19" y="8" width="1" height="2" fill={slit} />
      {/* gate */}
      <rect x="14" y="22" width="4" height="6" fill="#2b2320" />
      <rect x="14" y="21" width="4" height="1" fill="#2b2320" />
      {/* banner */}
      <rect x="16" y="0" width="1" height="5" fill="#c9c9c9" />
      <polygon points="17,0 23,2 17,4" fill={color} />
      <polygon points="17,0 23,2 17,4" fill="none" stroke={roof} strokeWidth="0.4" />
    </svg>
  );
}

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
      {/* sun */}
      <div className="sun-body absolute left-1/2 top-[34%] h-20 w-20 rounded-full bg-amber-200 shadow-[0_0_60px_30px_rgba(254,240,138,0.7)]" />

      {/* ---- SKY: night layer (fades in as time passes) ---- */}
      <div
        className="sky-night absolute inset-x-0 top-0 h-[60%] bg-gradient-to-b from-slate-950 via-indigo-950 to-indigo-800"
        style={{
          backgroundImage:
            "radial-gradient(1.5px 1.5px at 20% 30%, #fff, transparent), radial-gradient(1.5px 1.5px at 70% 20%, #fff, transparent), radial-gradient(1px 1px at 40% 50%, #fff, transparent), radial-gradient(1.5px 1.5px at 85% 40%, #fff, transparent), radial-gradient(1px 1px at 55% 15%, #fff, transparent), radial-gradient(1px 1px at 10% 60%, #fff, transparent), radial-gradient(1.5px 1.5px at 90% 65%, #fff, transparent), linear-gradient(to bottom, #020617, #1e1b4b 60%, #3730a3)",
        }}
      >
        {/* moon */}
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

      {/* ---- CASTLES on hills (revealed when Gaston looks to the horizon) ---- */}
      <div
        className={`absolute inset-x-0 top-[20%] z-10 mx-auto flex max-w-5xl flex-wrap items-end justify-center gap-x-4 gap-y-6 px-4 transition-opacity duration-700 sm:gap-x-8 ${
          arrived ? "opacity-100" : "opacity-0"
        }`}
      >
        {ROOMS.map((room, i) => (
          <div
            key={room.href}
            className={`relative flex flex-col items-center ${
              arrived ? "tower-rise" : ""
            }`}
            style={arrived ? {animationDelay: `${i * 140}ms`} : undefined}
          >
            {/* grassy hill behind the castle */}
            <div className="absolute bottom-9 -z-10 h-16 w-36 rounded-[50%] bg-emerald-700 shadow-inner" />
            <Castle color={room.color} roof={room.roof} />
            <Link
              href={room.href}
              tabIndex={arrived ? 0 : -1}
              aria-label={`Enter ${room.label}`}
              className="mt-2 rounded-sm border-2 bg-black/75 px-2 py-1 text-center text-[9px] uppercase leading-tight tracking-widest transition-colors hover:bg-black sm:px-3 sm:text-[10px]"
              style={{
                borderColor: room.color,
                color: room.color,
                fontFamily: "var(--font-pixel)",
              }}
            >
              <span className="block text-white">{room.label}</span>
              <span className="block">▶ Enter</span>
            </Link>
          </div>
        ))}
      </div>

      {/* ---- The knight, standing on the road, gazing at the horizon ---- */}
      <div className="absolute bottom-[5%] left-1/2 z-20 -translate-x-1/2">
        <div className="npc-idle">
          <PixelNpc width={140} className="drop-shadow-[0_8px_0_rgba(0,0,0,0.45)]" />
        </div>
      </div>

      {/* ---- Dialogue (knight is already on the road) ---- */}
      {talking && <Dialogue onDone={onTalkDone} />}
    </section>
  );
}
