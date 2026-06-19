"use client";

import {useEffect, useState} from "react";
import WorldScene from "./WorldScene";

type Phase = "talking" | "walking" | "arrived";

const INTRO_SEEN_KEY = "gaston-intro-seen";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("talking");
  // gate the scene until we've checked storage, so the bubble never flashes
  const [ready, setReady] = useState(false);

  // Skip the whole intro if it has already played this session, or if the
  // visitor prefers reduced motion.
  useEffect(() => {
    const alreadySeen = sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (alreadySeen || reducedMotion) setPhase("arrived");
    setReady(true);
  }, []);

  // Remember (for this session) that the intro has been shown.
  useEffect(() => {
    if (phase === "arrived") sessionStorage.setItem(INTRO_SEEN_KEY, "1");
  }, [phase]);

  // Once Gaston starts walking, let him arrive at the crossroads.
  useEffect(() => {
    if (phase !== "walking") return;
    const t = setTimeout(() => setPhase("arrived"), 3100);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <main className="flex-1">
      <WorldScene
        phase={phase}
        showDialogue={ready && phase === "talking"}
        onTalkDone={() => setPhase("walking")}
      />
    </main>
  );
}
