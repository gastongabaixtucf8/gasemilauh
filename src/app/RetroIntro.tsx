"use client";

import {useCallback, useEffect, useRef, useState} from "react";

const LINES = [
  "Hello, welcome to my website. My name is Gaston",
  "Follow me on the tour!",
];

/** A little pixel-art NPC drawn with crisp SVG blocks. */
function PixelNpc() {
  const hair = "#5a3411";
  const skin = "#f2c79b";
  const eye = "#1b130a";
  const shirt = "#3b82f6";
  const shirtDark = "#1d4ed8";
  const pants = "#2b3242";
  const shoe = "#14181f";

  return (
    <svg
      viewBox="0 0 16 17"
      width="160"
      height="170"
      className="pixel-sprite drop-shadow-[0_8px_0_rgba(0,0,0,0.5)]"
      role="img"
      aria-label="Gaston, a pixel-art guide, waving"
    >
      {/* hair */}
      <rect x="4" y="1" width="8" height="3" fill={hair} />
      <rect x="3" y="2" width="1" height="2" fill={hair} />
      <rect x="12" y="2" width="1" height="2" fill={hair} />
      {/* face */}
      <rect x="4" y="3" width="8" height="4" fill={skin} />
      <rect x="4" y="3" width="8" height="1" fill={hair} />
      {/* eyes */}
      <rect x="6" y="4" width="1" height="1" fill={eye} />
      <rect x="9" y="4" width="1" height="1" fill={eye} />
      {/* mouth */}
      <rect x="7" y="6" width="2" height="1" fill="#c47b5a" />
      {/* body / shirt */}
      <rect x="4" y="7" width="8" height="5" fill={shirt} />
      <rect x="4" y="7" width="8" height="1" fill={shirtDark} />
      {/* left arm (down) */}
      <rect x="3" y="7" width="1" height="2" fill={shirt} />
      <rect x="3" y="9" width="1" height="1" fill={skin} />
      {/* right arm (waving) */}
      <g className="npc-wave">
        <rect x="12" y="6" width="1" height="2" fill={shirt} />
        <rect x="12" y="4" width="1" height="2" fill={skin} />
        <rect x="12" y="3" width="1" height="1" fill={skin} />
      </g>
      {/* belt */}
      <rect x="4" y="11" width="8" height="1" fill="#8a5a18" />
      {/* legs */}
      <rect x="5" y="12" width="2" height="4" fill={pants} />
      <rect x="9" y="12" width="2" height="4" fill={pants} />
      {/* shoes */}
      <rect x="5" y="16" width="2" height="1" fill={shoe} />
      <rect x="9" y="16" width="2" height="1" fill={shoe} />
    </svg>
  );
}

export default function RetroIntro({onDone}: {onDone: () => void}) {
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [lineDone, setLineDone] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const finish = useCallback(() => {
    setLeaving(true);
    setTimeout(onDone, 600); // matches the fade-out animation
  }, [onDone]);

  // Type out the current line, character by character.
  useEffect(() => {
    const full = LINES[idx];
    setTyped("");
    setLineDone(false);
    let i = 0;
    intervalRef.current = setInterval(() => {
      i += 1;
      setTyped(full.slice(0, i));
      if (i >= full.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setLineDone(true);
      }
    }, 45);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [idx]);

  // Advance: finish the line instantly, then move on / close.
  const advance = useCallback(() => {
    const full = LINES[idx];
    if (!lineDone) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setTyped(full);
      setLineDone(true);
      return;
    }
    if (idx < LINES.length - 1) {
      setIdx((n) => n + 1);
    } else {
      finish();
    }
  }, [idx, lineDone, finish]);

  // Keyboard: Enter/Space advance, Escape skips the whole intro.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        finish();
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        advance();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance, finish]);

  return (
    <div
      onClick={advance}
      className={`scanlines fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-black px-6 ${
        leaving ? "intro-leaving" : ""
      }`}
      style={{fontFamily: "var(--font-pixel)"}}
    >
      {/* skip */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          finish();
        }}
        className="absolute right-4 top-4 text-[10px] uppercase tracking-widest text-neutral-500 hover:text-white"
      >
        skip ▶
      </button>

      <div className="npc-idle">
        <PixelNpc />
      </div>

      {/* RPG dialogue box */}
      <div className="w-full max-w-2xl">
        <div className="mb-[-2px] ml-2 inline-block border-4 border-white bg-black px-3 py-1 text-[10px] text-emerald-300">
          GASTON
        </div>
        <div className="relative min-h-28 border-4 border-white bg-black p-5 shadow-[0_0_0_4px_#000,0_0_0_8px_#222]">
          <p className="text-[11px] leading-relaxed text-white sm:text-sm sm:leading-loose">
            {typed}
          </p>
          {lineDone && (
            <span className="blink-arrow absolute bottom-3 right-4 text-emerald-300">
              ▼
            </span>
          )}
        </div>
        <p className="mt-3 text-center text-[9px] uppercase tracking-widest text-neutral-600">
          click or press space to continue
        </p>
      </div>
    </div>
  );
}
