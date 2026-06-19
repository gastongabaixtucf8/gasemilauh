/**
 * Four pixel-art castles, each styled AND decorated to match its world.
 * All share a 32x28 viewBox and an items-end baseline so they line up.
 */

type CastleProps = {width?: number};

function Svg({children, width = 120}: {children: React.ReactNode; width?: number}) {
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

/** Chess — black & white rook with chess pieces standing on it. */
export function ChessCastle({width}: CastleProps) {
  const light = "#ededed";
  const shade = "#c4c4c4";
  const dark = "#1f1f1f";
  return (
    <Svg width={width}>
      {/* walls */}
      <rect x="2" y="15" width="11" height="13" fill={light} />
      <rect x="19" y="15" width="11" height="13" fill={light} />
      {[2, 5, 8, 11, 20, 23, 26, 29].map((x) => (
        <rect key={x} x={x} y="14" width="2" height="1" fill={light} />
      ))}
      {/* keep */}
      <rect x="10" y="6" width="12" height="22" fill={light} />
      <rect x="10" y="6" width="1" height="22" fill={shade} />
      <rect x="21" y="6" width="1" height="22" fill={shade} />
      <rect x="10" y="4" width="3" height="2" fill={light} />
      <rect x="15" y="4" width="2" height="2" fill={light} />
      <rect x="19" y="4" width="3" height="2" fill={light} />
      {/* checkerboard band */}
      {[0, 1, 2, 3, 4, 5].map((c) => (
        <rect key={c} x={10 + c * 2} y={c % 2 === 0 ? 11 : 13} width="2" height="2" fill={dark} />
      ))}
      {/* gate */}
      <rect x="14" y="22" width="4" height="6" fill={dark} />

      {/* --- chess pieces standing on it --- */}
      {/* black king on the keep */}
      <rect x="15" y="0" width="2" height="1" fill={dark} />
      <rect x="14" y="1" width="4" height="1" fill={dark} />
      <rect x="15" y="2" width="2" height="2" fill={dark} />
      {/* black pawn on the left wall */}
      <circle cx="7" cy="11" r="1.1" fill={dark} />
      <rect x="5" y="12" width="4" height="2" fill={dark} />
      {/* white pawn on the right wall (outlined so it reads) */}
      <circle cx="25" cy="11" r="1.1" fill="#fff" stroke={dark} strokeWidth="0.4" />
      <rect x="23" y="12" width="4" height="2" fill="#fff" stroke={dark} strokeWidth="0.4" />
    </Svg>
  );
}

/** Video Games — neon arcade keep with floating game items (coin, heart, star). */
export function GamesCastle({width}: CastleProps) {
  const body = "#312e81";
  const bodyD = "#1e1b4b";
  const neon = "#22d3ee";
  const pink = "#d946ef";
  return (
    <Svg width={width}>
      <rect x="2" y="15" width="11" height="13" fill={body} stroke={neon} strokeWidth="0.4" />
      <rect x="19" y="15" width="11" height="13" fill={body} stroke={neon} strokeWidth="0.4" />
      {[2, 5, 8, 11, 20, 23, 26, 29].map((x) => (
        <rect key={x} x={x} y="14" width="2" height="1" fill={body} />
      ))}
      <rect x="10" y="6" width="12" height="22" fill={body} stroke={pink} strokeWidth="0.5" />
      <rect x="10" y="6" width="1" height="22" fill={bodyD} />
      {[10, 13, 16, 19].map((x) => (
        <rect key={x} x={x} y="4" width="2" height="2" fill={body} />
      ))}
      {/* glowing pixel windows */}
      <rect x="12" y="10" width="2" height="2" fill={neon} />
      <rect x="18" y="10" width="2" height="2" fill={pink} />
      {/* gate */}
      <rect x="14" y="22" width="4" height="6" fill="#0b1020" stroke={neon} strokeWidth="0.4" />

      {/* --- video game items --- */}
      {/* gold coin */}
      <circle cx="6" cy="11" r="1.6" fill="#facc15" />
      <circle cx="6" cy="11" r="0.7" fill="#ca8a04" />
      {/* pixel heart */}
      <rect x="24" y="9" width="1" height="1" fill="#ef4444" />
      <rect x="26" y="9" width="1" height="1" fill="#ef4444" />
      <rect x="24" y="10" width="3" height="1" fill="#ef4444" />
      <rect x="25" y="11" width="1" height="1" fill="#ef4444" />
      {/* star above the keep */}
      <polygon points="16,0 17,2 19,2 17.5,3.5 18,5.5 16,4.5 14,5.5 14.5,3.5 13,2 15,2" fill="#fde047" />
    </Svg>
  );
}

/** Manga — stark white castle, heavy ink outlines, screentone + speed lines. */
export function MangaCastle({width}: CastleProps) {
  const white = "#fbfbfb";
  const ink = "#111111";
  return (
    <Svg width={width}>
      {/* manga speed lines bursting behind the keep */}
      {[
        [2, 1],
        [9, 0],
        [16, 0],
        [23, 0],
        [30, 1],
        [6, 3],
        [26, 3],
      ].map(([x, y], k) => (
        <line key={k} x1="16" y1="5" x2={x} y2={y} stroke={ink} strokeWidth="0.25" />
      ))}

      <rect x="2" y="15" width="11" height="13" fill={white} stroke={ink} strokeWidth="0.6" />
      <rect x="19" y="15" width="11" height="13" fill={white} stroke={ink} strokeWidth="0.6" />
      {[2, 5, 8, 11, 20, 23, 26, 29].map((x) => (
        <rect key={x} x={x} y="13" width="2" height="2" fill={white} stroke={ink} strokeWidth="0.5" />
      ))}
      <rect x="10" y="6" width="12" height="22" fill={white} stroke={ink} strokeWidth="0.7" />
      {[10, 13, 16, 19].map((x) => (
        <rect key={x} x={x} y="4" width="2" height="2" fill={white} stroke={ink} strokeWidth="0.5" />
      ))}
      {/* screentone dots */}
      {[11, 13, 15, 17, 19, 21].map((x) => (
        <circle key={x} cx={x} cy="11" r="0.5" fill={ink} />
      ))}
      <rect x="14" y="22" width="4" height="6" fill={ink} />
      {/* manga sparkle */}
      <path d="M26 6 L26.7 7.3 L28 8 L26.7 8.7 L26 10 L25.3 8.7 L24 8 L25.3 7.3 Z" fill={ink} />
    </Svg>
  );
}

/** Warhammer — grimdark fortress with monsters lurking around it. */
export function WarhammerCastle({width}: CastleProps) {
  const stone = "#34343b";
  const stoneD = "#1f1f24";
  const stoneL = "#4a4a52";
  const blood = "#7a1d1d";
  const iron = "#0d0d0f";
  const ghoul = "#4d7c0f";
  const slime = "#7c3aed";
  return (
    <Svg width={width}>
      <rect x="2" y="15" width="11" height="13" fill={stone} />
      <rect x="19" y="15" width="11" height="13" fill={stone} />
      {[3, 6, 9, 21, 24, 27].map((x) => (
        <polygon key={x} points={`${x},14 ${x + 1},11 ${x + 2},14`} fill={iron} />
      ))}
      <rect x="10" y="5" width="12" height="23" fill={stone} />
      <rect x="10" y="5" width="1" height="23" fill={stoneD} />
      <rect x="21" y="5" width="1" height="23" fill={stoneL} />
      {[10, 13, 16, 19].map((x) => (
        <rect key={x} x={x} y="3" width="2" height="2" fill={stone} />
      ))}
      <polygon points="10,3 11,0 12,3" fill={iron} />
      <polygon points="20,3 21,0 22,3" fill={iron} />
      {/* glowing windows */}
      <rect x="12" y="9" width="2" height="1" fill={blood} />
      <rect x="18" y="9" width="2" height="1" fill={blood} />
      <rect x="14" y="22" width="4" height="6" fill={iron} />
      {/* banner */}
      <rect x="16" y="0" width="1" height="5" fill="#555" />
      <polygon points="17,0 23,2 17,4" fill={blood} />

      {/* --- monsters --- */}
      {/* green ghoul at the left base */}
      <rect x="2" y="24" width="4" height="4" fill={ghoul} />
      <rect x="2" y="24" width="1" height="4" fill="#3f6212" />
      <rect x="3" y="25" width="1" height="1" fill="#ef4444" />
      <rect x="5" y="25" width="1" height="1" fill="#ef4444" />
      <rect x="3" y="27" width="3" height="1" fill="#fff" />
      {/* purple slime at the right base */}
      <rect x="26" y="25" width="4" height="3" fill={slime} />
      <rect x="27" y="26" width="1" height="1" fill="#fff" />
      <rect x="29" y="26" width="1" height="1" fill="#fff" />
      {/* a bat in the air */}
      <polygon points="24,8 26,6 26,8" fill={iron} />
      <polygon points="28,8 26,6 26,8" fill={iron} />
      <rect x="26" y="7" width="1" height="1" fill={iron} />
    </Svg>
  );
}

export const CASTLES = {
  "/chess": ChessCastle,
  "/games": GamesCastle,
  "/manga": MangaCastle,
  "/warhammer": WarhammerCastle,
} as const;
