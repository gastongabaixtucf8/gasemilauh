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

  // A comic speech bubble that points down to the knight below it.
  return (
    <div
      onClick={advance}
      className="absolute bottom-[26%] left-1/2 z-30 w-[88%] max-w-md -translate-x-1/2 cursor-pointer"
    >
      <div
        className="bubble-pop relative rounded-2xl border-4 border-stone-900 bg-amber-50 px-5 py-4 text-center shadow-xl"
        style={{fontFamily: "var(--font-pixel)"}}
      >
        <p className="text-[10px] leading-relaxed text-stone-900 sm:text-xs sm:leading-loose">
          {typed}
        </p>
        {lineDone && (
          <span className="blink-arrow absolute bottom-2 right-3 text-stone-700">
            ▼
          </span>
        )}
        {/* tail pointing down to the knight */}
        <span className="absolute -bottom-3 left-1/2 h-5 w-5 -translate-x-1/2 rotate-45 border-b-4 border-r-4 border-stone-900 bg-amber-50" />
      </div>
      <p className="mt-4 text-center text-[8px] uppercase tracking-widest text-white/60" style={{fontFamily: "var(--font-pixel)"}}>
        click or press space
      </p>
    </div>
  );
}
