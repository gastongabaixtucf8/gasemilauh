"use client";

import {useEffect, useState} from "react";
import RetroIntro from "./RetroIntro";
import WorldScene from "./WorldScene";

type Phase = "intro" | "walking" | "arrived";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("intro");

  // Reduced-motion: skip the cutscene and walk; show the towers right away.
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setPhase("arrived");
    }
  }, []);

  // After Gaston starts walking, let him arrive when the walk finishes.
  useEffect(() => {
    if (phase !== "walking") return;
    const t = setTimeout(() => setPhase("arrived"), 3500);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <main className="flex-1">
      {phase === "intro" && <RetroIntro onDone={() => setPhase("walking")} />}
      <WorldScene walk={phase === "walking"} arrived={phase === "arrived"} />
    </main>
  );
}
