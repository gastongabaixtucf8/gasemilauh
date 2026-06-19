"use client";

import Link from "next/link";
import PixelNpc from "./PixelNpc";
import Dialogue from "./Dialogue";
import {CASTLES} from "./Castles";

type Phase = "talking" | "walking" | "arrived";

type Room = {
  href: keyof typeof CASTLES;
  label: string;
  color: string;
  x: number;
  bottom: string;
  floating?: boolean;
};

const ROOMS: Room[] = [
  {href: "/chess", label: "Chess", color: "#e5e7eb", x: 14, bottom: "40%"},
  {href: "/games", label: "Video Games", color: "#4ade80", x: 38, bottom: "40%"},
  {href: "/manga", label: "Manga", color: "#f472b6", x: 62, bottom: "52%", floating: true},
  {href: "/warhammer", label: "Warhammer", color: "#d4af37", x: 86, bottom: "40%"},
];

const JUNCTION = {x: 50, y: 92, halfWidth: 5};

const CLOUDS = [
  {top: "7%", scale: 1, dur: "95s", delay: "0s"},
  {top: "17%", scale: 0.7, dur: "130s", delay: "-50s"},
  {top: "4%", scale: 1.3, dur: "75s", delay: "-60s"},
  {top: "23%", scale: 0.6, dur: "150s", delay: "-100s"},
];

// trees lining the road / dotting the field (foreground big → distance small)
const TREES = [
  {x: 6, bottom: "3%", w: 130},
  {x: 95, bottom: "4%", w: 140},
  {x: 22, bottom: "9%", w: 95},
  {x: 78, bottom: "10%", w: 100},
  {x: 33, bottom: "25%", w: 52},
  {x: 67, bottom: "26%", w: 52},
  {x: 47, bottom: "31%", w: 40},
  {x: 53, bottom: "33%", w: 36},
];

// floating stepping stones leading up to the manga island
const SKY_STEPS = [
  {x: "57%", bottom: "41%", w: 26},
  {x: "60%", bottom: "44.5%", w: 30},
  {x: "62%", bottom: "48%", w: 34},
  {x: "62.5%", bottom: "51%", w: 38},
];

const STARFIELD_1 =
  "radial-gradient(1.5px 1.5px at 20% 30%, #fff, transparent), radial-gradient(1.5px 1.5px at 70% 18%, #fff, transparent), radial-gradient(1px 1px at 45% 50%, #fff, transparent), radial-gradient(1.5px 1.5px at 85% 38%, #fff, transparent), radial-gradient(1px 1px at 12% 62%, #fff, transparent), radial-gradient(2px 2px at 32% 12%, #fff, transparent), radial-gradient(1px 1px at 50% 35%, #fff, transparent), radial-gradient(1.5px 1.5px at 78% 55%, #fff, transparent), radial-gradient(1px 1px at 5% 40%, #fff, transparent), radial-gradient(1.5px 1.5px at 95% 25%, #fff, transparent)";
const STARFIELD_2 =
  "radial-gradient(1px 1px at 55% 14%, #fff, transparent), radial-gradient(1.5px 1.5px at 90% 60%, #fff, transparent), radial-gradient(1px 1px at 33% 22%, #fff, transparent), radial-gradient(1px 1px at 60% 44%, #fff, transparent), radial-gradient(1.5px 1.5px at 8% 28%, #fff, transparent), radial-gradient(2px 2px at 40% 8%, #fff, transparent), radial-gradient(1px 1px at 25% 48%, #fff, transparent), radial-gradient(1.5px 1.5px at 65% 30%, #fff, transparent), radial-gradient(1px 1px at 82% 12%, #fff, transparent), radial-gradient(1px 1px at 48% 58%, #fff, transparent)";
const STARFIELD_3 =
  "radial-gradient(2.5px 2.5px at 18% 16%, #fff, transparent), radial-gradient(2.5px 2.5px at 72% 40%, #fff, transparent), radial-gradient(2px 2px at 38% 32%, #fff, transparent), radial-gradient(2.5px 2.5px at 88% 20%, #fff, transparent), radial-gradient(2px 2px at 58% 52%, #fff, transparent), radial-gradient(2px 2px at 28% 58%, #fff, transparent)";

const PEBBLES: [number, number, number][] = [
  [0.2, -1.8, 0.9],
  [0.32, 1.6, 1.3],
  [0.46, -2.6, 1],
  [0.6, 2.4, 1.5],
  [0.74, -1.6, 1.1],
  [0.87, 2, 0.8],
];
const PEBBLE_SHADES = ["#8a6a3a", "#5a4530", "#9c7a45", "#6b5436"];

const TUFTS = Array.from({length: 40}, (_, i) => {
  const x = (i * 37 + 3) % 100;
  const y = 3 + ((i * 19) % 36);
  const s = 0.5 + (y / 40) * 1.3;
  return {x, y, s, shade: ["#15803d", "#166534", "#22c55e", "#14532d"][i % 4]};
});

function Cloud({scale}: {scale: number}) {
  return (
    <div className="relative h-10 w-28" style={{transform: `scale(${scale})`}}>
      <div className="absolute bottom-0 left-0 h-7 w-14 rounded-full bg-white/80 blur-[1px]" />
      <div className="absolute bottom-1 left-7 h-10 w-16 rounded-full bg-white/90 blur-[1px]" />
      <div className="absolute bottom-0 left-16 h-7 w-14 rounded-full bg-white/80 blur-[1px]" />
    </div>
  );
}

function Tree({w}: {w: number}) {
  return (
    <svg viewBox="0 0 16 20" width={w} className="pixel-sprite drop-shadow-[0_4px_0_rgba(0,0,0,0.3)]" aria-hidden>
      <rect x="7" y="13" width="2" height="6" fill="#6b4423" />
      <circle cx="8" cy="9" r="5" fill="#2f9e44" />
      <circle cx="4.5" cy="10.5" r="3.4" fill="#37b24d" />
      <circle cx="11.5" cy="10.5" r="3.4" fill="#2b8a3e" />
      <circle cx="8" cy="6.5" r="3.6" fill="#40c057" />
    </svg>
  );
}

/** A small charred floating rock with ember glow and a tiny flame. */
function SkyStone({w}: {w: number}) {
  return (
    <svg viewBox="0 0 16 13" width={w} className="pixel-sprite drop-shadow-[0_3px_6px_rgba(234,88,12,0.4)]" aria-hidden>
      <ellipse cx="8" cy="4" rx="7" ry="2.2" fill="#2a2320" />
      <ellipse cx="8" cy="3.4" rx="6" ry="0.9" fill="#3a3640" />
      <polygon points="2,4 14,4 11,9 5,9" fill="#1c1714" />
      <polygon points="5,9 11,9 8,12.5" fill="#120e0c" />
      {/* ember cracks */}
      <line x1="6" y1="5" x2="7.5" y2="8" stroke="#f97316" strokeWidth="0.4" />
      <line x1="10.5" y1="5" x2="9" y2="8" stroke="#f97316" strokeWidth="0.4" />
      {/* little flame on top */}
      <polygon points="6.8,4 8,0.8 9.2,4" fill="#f97316" className="flame-flicker" />
      <polygon points="7.4,4 8,2.2 8.6,4" fill="#fde047" />
    </svg>
  );
}

export default function WorldScene({
  phase,
  showDialogue,
  onTalkDone,
}: {
  phase: Phase;
  showDialogue: boolean;
  onTalkDone: () => void;
}) {
  const arrived = phase === "arrived";
  const poseClass =
    phase === "talking" ? "npc-stand-near" : phase === "walking" ? "npc-walk" : "";
  const stepClass = phase === "walking" ? "npc-step" : "npc-idle";

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

      {/* ---- drifting clouds (kept above the night layer so they show at night) ---- */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[45%] overflow-hidden">
        {CLOUDS.map((c, i) => (
          <div
            key={i}
            className="cloud absolute left-0"
            style={{top: c.top, animationDuration: c.dur, animationDelay: c.delay}}
          >
            <Cloud scale={c.scale} />
          </div>
        ))}
      </div>

      {/* sun + moon arc across the sky in time with the day/night colours */}
      <div className="sun-body absolute left-1/2 top-[58%] h-20 w-20 rounded-full bg-amber-200 shadow-[0_0_60px_30px_rgba(254,240,138,0.7)]" />
      <div className="moon-body absolute left-1/2 top-[58%] h-16 w-16 rounded-full bg-stone-100 shadow-[0_0_50px_18px_rgba(255,255,255,0.45)]" />

      {/* ---- GROUND ---- */}
      <div
        className="absolute inset-x-0 bottom-0 h-[40%]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(93deg, rgba(6,40,18,0.16) 0 1px, transparent 1px 4px), radial-gradient(140% 70% at 50% 100%, #166534 0%, transparent 62%), linear-gradient(to bottom, #2f9e44, #14532d)",
        }}
      />
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%] w-full"
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        aria-hidden
      >
        {TUFTS.map((t, i) => (
          <g key={i} fill={t.shade}>
            <polygon points={`${t.x},${t.y} ${t.x - 0.5 * t.s},${t.y - 1.7 * t.s} ${t.x + 0.2},${t.y}`} />
            <polygon points={`${t.x},${t.y} ${t.x},${t.y - 2 * t.s} ${t.x + 0.5},${t.y}`} />
            <polygon points={`${t.x},${t.y} ${t.x + 0.6 * t.s},${t.y - 1.6 * t.s} ${t.x + 0.9},${t.y}`} />
          </g>
        ))}
      </svg>

      {/* ---- ROADS converging to the crossroads (grounded castles only) ---- */}
      <svg
        className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        {ROOMS.filter((r) => !r.floating).map((room, i) => (
          <g key={room.href}>
            <polygon
              points={`${room.x - 3},60 ${room.x + 3},60 ${JUNCTION.x + JUNCTION.halfWidth},${JUNCTION.y} ${JUNCTION.x - JUNCTION.halfWidth},${JUNCTION.y}`}
              fill={i % 2 === 0 ? "#5f4a32" : "#6b5436"}
            />
            <polygon
              points={`${room.x - 1.6},60 ${room.x - 1},60 ${JUNCTION.x - 2},${JUNCTION.y} ${JUNCTION.x - 2.6},${JUNCTION.y}`}
              fill="#4a3826"
            />
            <polygon
              points={`${room.x + 1},60 ${room.x + 1.6},60 ${JUNCTION.x + 2.6},${JUNCTION.y} ${JUNCTION.x + 2},${JUNCTION.y}`}
              fill="#4a3826"
            />
            {PEBBLES.map(([t, dx, r], k) => (
              <ellipse
                key={k}
                cx={room.x + (JUNCTION.x - room.x) * t + dx}
                cy={60 + (JUNCTION.y - 60) * t}
                rx={r}
                ry={r * 0.8}
                fill={PEBBLE_SHADES[k % PEBBLE_SHADES.length]}
              />
            ))}
          </g>
        ))}
        <ellipse cx={JUNCTION.x} cy={JUNCTION.y} rx="13" ry="4" fill="#6b5436" />
        <ellipse cx={JUNCTION.x} cy={JUNCTION.y} rx="9" ry="2.6" fill="#5a4530" />
      </svg>

      {/* ---- floating sky-path up to the manga island ---- */}
      {SKY_STEPS.map((s, i) => (
        <div
          key={i}
          className="absolute z-[2] -translate-x-1/2"
          style={{left: s.x, bottom: s.bottom}}
        >
          <SkyStone w={s.w} />
        </div>
      ))}

      {/* ---- trees ---- */}
      {TREES.map((t, i) => (
        <div
          key={i}
          className="absolute z-[5] -translate-x-1/2"
          style={{left: `${t.x}%`, bottom: t.bottom}}
        >
          <Tree w={t.w} />
        </div>
      ))}

      {/* ---- CASTLES (rise when Gaston reaches the crossroads) ---- */}
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

      {/* ---- The knight: talks, then walks up to the crossroads ---- */}
      <div className="absolute bottom-[5%] left-1/2 z-20 -translate-x-1/2">
        <div className={poseClass}>
          <div className={stepClass}>
            <PixelNpc width={140} className="drop-shadow-[0_8px_0_rgba(0,0,0,0.45)]" />
          </div>
        </div>
      </div>

      {/* ---- Speech bubble ---- */}
      {showDialogue && <Dialogue onDone={onTalkDone} />}
    </section>
  );
}
