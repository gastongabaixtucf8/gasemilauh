/**
 * Four pixel-art castles, each styled to match its world.
 * All share a 32x28 viewBox and an items-end baseline so they line up.
 */

type CastleProps = {width?: number};

function Svg({children, width = 130}: {children: React.ReactNode; width?: number}) {
  return (
    <svg
      viewBox="0 0 32 28"
      width={width}
      className="pixel-sprite drop-shadow-[0_6px_0_rgba(0,0,0,0.4)]"
      role="img"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/** Chess — a black & white rook with a checkerboard band. */
export function ChessCastle({width}: CastleProps) {
  const light = "#ededed";
  const shade = "#c4c4c4";
  const dark = "#222222";
  return (
    <Svg width={width}>
      {/* side walls */}
      <rect x="2" y="15" width="11" height="13" fill={light} />
      <rect x="19" y="15" width="11" height="13" fill={light} />
      <rect x="2" y="15" width="11" height="1" fill="#fff" />
      <rect x="19" y="15" width="11" height="1" fill="#fff" />
      {/* wall crenellations */}
      {[2, 5, 8, 11, 20, 23, 26, 29].map((x) => (
        <rect key={x} x={x} y="14" width="2" height="1" fill={light} />
      ))}
      {/* central rook keep */}
      <rect x="10" y="6" width="12" height="22" fill={light} />
      <rect x="10" y="6" width="1" height="22" fill={shade} />
      <rect x="21" y="6" width="1" height="22" fill={shade} />
      {/* big rook crenellations */}
      <rect x="10" y="4" width="3" height="2" fill={light} />
      <rect x="15" y="4" width="2" height="2" fill={light} />
      <rect x="19" y="4" width="3" height="2" fill={light} />
      {/* checkerboard band */}
      {[0, 1, 2, 3, 4, 5].map((c) => (
        <rect
          key={c}
          x={10 + c * 2}
          y={c % 2 === 0 ? 12 : 14}
          width="2"
          height="2"
          fill={dark}
        />
      ))}
      <rect x="10" y="12" width="12" height="2" fill="none" />
      {/* gate */}
      <rect x="14" y="22" width="4" height="6" fill={dark} />
      {/* banner */}
      <rect x="16" y="0" width="1" height="4" fill={dark} />
      <polygon points="17,0 23,1.5 17,3" fill={dark} />
    </Svg>
  );
}

/** Video Games — a neon arcade keep with glowing pixel windows. */
export function GamesCastle({width}: CastleProps) {
  const body = "#312e81";
  const bodyD = "#1e1b4b";
  const neon = "#22d3ee";
  const pink = "#d946ef";
  return (
    <Svg width={width}>
      <rect x="2" y="15" width="11" height="13" fill={body} />
      <rect x="19" y="15" width="11" height="13" fill={body} />
      <rect x="2" y="15" width="11" height="13" fill="none" stroke={neon} strokeWidth="0.4" />
      <rect x="19" y="15" width="11" height="13" fill="none" stroke={neon} strokeWidth="0.4" />
      {[2, 5, 8, 11, 20, 23, 26, 29].map((x) => (
        <rect key={x} x={x} y="14" width="2" height="1" fill={body} />
      ))}
      {/* keep */}
      <rect x="10" y="6" width="12" height="22" fill={body} />
      <rect x="10" y="6" width="12" height="22" fill="none" stroke={pink} strokeWidth="0.5" />
      <rect x="10" y="6" width="1" height="22" fill={bodyD} />
      {[10, 13, 16, 19].map((x) => (
        <rect key={x} x={x} y="4" width="2" height="2" fill={body} />
      ))}
      {/* glowing pixel windows */}
      <rect x="12" y="9" width="2" height="2" fill={neon} />
      <rect x="18" y="9" width="2" height="2" fill={pink} />
      <rect x="12" y="14" width="2" height="2" fill={pink} />
      <rect x="18" y="14" width="2" height="2" fill={neon} />
      {/* gate */}
      <rect x="14" y="22" width="4" height="6" fill="#0b1020" />
      <rect x="14" y="22" width="4" height="6" fill="none" stroke={neon} strokeWidth="0.4" />
      {/* banner */}
      <rect x="16" y="0" width="1" height="4" fill="#c9c9c9" />
      <polygon points="17,0 23,1.5 17,3" fill={pink} />
    </Svg>
  );
}

/** Manga — stark white castle with heavy black ink outlines + screentone. */
export function MangaCastle({width}: CastleProps) {
  const white = "#fbfbfb";
  const ink = "#111111";
  return (
    <Svg width={width}>
      <rect x="2" y="15" width="11" height="13" fill={white} stroke={ink} strokeWidth="0.6" />
      <rect x="19" y="15" width="11" height="13" fill={white} stroke={ink} strokeWidth="0.6" />
      {[2, 5, 8, 11, 20, 23, 26, 29].map((x) => (
        <rect key={x} x={x} y="13" width="2" height="2" fill={white} stroke={ink} strokeWidth="0.5" />
      ))}
      {/* keep */}
      <rect x="10" y="6" width="12" height="22" fill={white} stroke={ink} strokeWidth="0.7" />
      {[10, 13, 16, 19].map((x) => (
        <rect key={x} x={x} y="4" width="2" height="2" fill={white} stroke={ink} strokeWidth="0.5" />
      ))}
      {/* screentone dots band */}
      {[11, 13, 15, 17, 19].map((x) => (
        <circle key={x} cx={x} cy="11" r="0.5" fill={ink} />
      ))}
      {/* windows + gate in heavy ink */}
      <rect x="12" y="14" width="1" height="2" fill={ink} />
      <rect x="19" y="14" width="1" height="2" fill={ink} />
      <rect x="14" y="22" width="4" height="6" fill={ink} />
      {/* banner */}
      <rect x="16" y="0" width="1" height="4" fill={ink} />
      <polygon points="17,0 23,1.5 17,3" fill={white} stroke={ink} strokeWidth="0.5" />
    </Svg>
  );
}

/** Warhammer — grimdark gothic fortress with iron spikes, skull and red banner. */
export function WarhammerCastle({width}: CastleProps) {
  const stone = "#34343b";
  const stoneD = "#1f1f24";
  const stoneL = "#4a4a52";
  const blood = "#7a1d1d";
  const iron = "#0d0d0f";
  const bone = "#d9d2c2";
  return (
    <Svg width={width}>
      <rect x="2" y="15" width="11" height="13" fill={stone} />
      <rect x="19" y="15" width="11" height="13" fill={stone} />
      <rect x="2" y="15" width="11" height="1" fill={stoneL} />
      <rect x="19" y="15" width="11" height="1" fill={stoneL} />
      {[2, 5, 8, 11, 20, 23, 26, 29].map((x) => (
        <rect key={x} x={x} y="14" width="2" height="1" fill={stone} />
      ))}
      {/* iron spikes on the walls */}
      {[3, 6, 9, 21, 24, 27].map((x) => (
        <polygon key={x} points={`${x},14 ${x + 1},11 ${x + 2},14`} fill={iron} />
      ))}
      {/* keep */}
      <rect x="10" y="5" width="12" height="23" fill={stone} />
      <rect x="10" y="5" width="1" height="23" fill={stoneD} />
      <rect x="21" y="5" width="1" height="23" fill={stoneL} />
      {[10, 13, 16, 19].map((x) => (
        <rect key={x} x={x} y="3" width="2" height="2" fill={stone} />
      ))}
      {/* spire spikes on the keep */}
      <polygon points="10,3 11,-1 12,3" fill={iron} />
      <polygon points="20,3 21,-1 22,3" fill={iron} />
      {/* glowing eyes / windows */}
      <rect x="12" y="9" width="2" height="1" fill={blood} />
      <rect x="18" y="9" width="2" height="1" fill={blood} />
      {/* skull over the gate */}
      <rect x="15" y="16" width="2" height="2" fill={bone} />
      <rect x="15" y="18" width="2" height="1" fill={bone} />
      {/* gate */}
      <rect x="14" y="22" width="4" height="6" fill={iron} />
      {/* banner */}
      <rect x="16" y="0" width="1" height="5" fill="#555" />
      <polygon points="17,0 23,2 17,4" fill={blood} />
    </Svg>
  );
}

export const CASTLES = {
  "/chess": ChessCastle,
  "/games": GamesCastle,
  "/manga": MangaCastle,
  "/warhammer": WarhammerCastle,
} as const;
