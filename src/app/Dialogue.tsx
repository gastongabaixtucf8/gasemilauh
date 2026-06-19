"use client";

import {useCallback, useEffect, useRef, useState} from "react";

const LINES = [
  "Hello, welcome to my website. My name is Gaston",
  "Follow me on the tour!",
];

export default function Dialogue({onDone}: {onDone: () => void}) {
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [lineDone, setLineDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Type out the current line.
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

  const advance = useCallback(() => {
    const full = LINES[idx];
    if (!lineDone) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setTyped(full);
      setLineDone(true);
      return;
    }
    if (idx < LINES.length - 1) setIdx((n) => n + 1);
    else onDone();
  }, [idx, lineDone, onDone]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onDone();
      else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        advance();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance, onDone]);

  return (
    <div
      onClick={advance}
      className="absolute inset-x-0 bottom-0 z-30 flex cursor-pointer justify-center px-4 pb-6"
      style={{fontFamily: "var(--font-pixel)"}}
    >
      <div className="w-full max-w-2xl">
        {/* name plate */}
        <div className="mb-[-2px] ml-2 inline-block rounded-t border-4 border-amber-700 bg-stone-900 px-3 py-1 text-[10px] text-amber-300">
          GASTON
        </div>
        {/* parchment / stone panel */}
        <div className="relative min-h-24 rounded-b rounded-tr border-4 border-amber-700 bg-stone-900/95 p-5 shadow-[0_0_0_4px_#1c1917]">
          <p className="text-[11px] leading-relaxed text-amber-50 sm:text-sm sm:leading-loose">
            {typed}
          </p>
          {lineDone && (
            <span className="blink-arrow absolute bottom-3 right-4 text-amber-300">
              ▼
            </span>
          )}
        </div>
        <p className="mt-3 text-center text-[9px] uppercase tracking-widest text-amber-100/40">
          click or press space to continue
        </p>
      </div>
    </div>
  );
}
