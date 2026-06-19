"use client";

import {useEffect, useState} from "react";
import WorldScene from "./WorldScene";

type Phase = "talking" | "arrived";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("talking");

  // Reduced-motion: skip the dialogue and reveal the castles right away.
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setPhase("arrived");
    }
  }, []);

  return (
    <main className="flex-1">
      <WorldScene
        talking={phase === "talking"}
        arrived={phase === "arrived"}
        onTalkDone={() => setPhase("arrived")}
      />
    </main>
  );
}
