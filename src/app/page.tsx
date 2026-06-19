"use client";

import {useEffect, useState} from "react";
import WorldScene from "./WorldScene";

type Phase = "talking" | "arrived";

const INTRO_SEEN_KEY = "gaston-intro-seen";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("talking");
  // gate the scene until we've checked storage, so the bubble never flashes
  const [ready, setReady] = useState(false);

  // Skip the intro if it has already played this session, or if the visitor
  // prefers reduced motion. (Stops the dialogue replaying when you come back
  // to the hub to pick another world.)
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

  return (
    <main className="flex-1">
      <WorldScene
        talking={ready && phase === "talking"}
        arrived={phase === "arrived"}
        onTalkDone={() => setPhase("arrived")}
      />
    </main>
  );
}
