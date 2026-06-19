/**
 * Four pixel-art castles, each heavily decorated to match its world.
 * Shared viewBox "-8 -8 48 42" leaves margin around the keep for scenery.
 * All share the same box + an items-end baseline so they line up.
 */

type CastleProps = {width?: number};

function Svg({children, width = 180}: {children: React.ReactNode; width?: number}) {
  return (
    <svg
      viewBox="-8 -8 48 42"
      width={width}
      className="pixel-sprite drop-shadow-[0_6px_0_rgba(0,0,0,0.4)]"
      role="img"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/** Chess — black & white rook, a checkered courtyard and giant chess pieces. */
export function ChessCastle({width}: CastleProps) {
  const light = "#ededed";
  const shade = "#c4c4c4";
  const dark = "#1f1f1f";
  return (
    <Svg width={width}>
      {/* checkered courtyard */}
      {Array.from({length: 24}, (_, k) => -8 + k * 2).map((x, k) => (
        <rect key={x} x={x} y="30" width="2" height="4" fill={k % 2 === 0 ? dark : light} />
      ))}

      {/* giant black rook on the left */}
      <rect x="-7" y="23" width="5" height="7" fill={dark} />
      <rect x="-7" y="22" width="1" height="1" fill={dark} />
      <rect x="-5" y="22" width="1" height="1" fill={dark} />
      <rect x="-3" y="22" width="1" height="1" fill={dark} />
      {/* giant white queen on the right */}
      <rect x="33" y="23" width="5" height="7" fill={light} stroke={dark} strokeWidth="0.3" />
      <circle cx="35.5" cy="21" r="1.2" fill={light} stroke={dark} strokeWidth="0.3" />
      {[33.5, 35.5, 37.5].map((x) => (
        <rect key={x} x={x - 0.5} y="22" width="1" height="1" fill={light} stroke={dark} strokeWidth="0.2" />
      ))}

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
      {[0, 1, 2, 3, 4, 5].map((c) => (
        <rect key={c} x={10 + c * 2} y={c % 2 === 0 ? 11 : 13} width="2" height="2" fill={dark} />
      ))}
      <rect x="14" y="22" width="4" height="6" fill={dark} />

      {/* pieces standing on the castle */}
      <rect x="15" y="0" width="2" height="1" fill={dark} />
      <rect x="14" y="1" width="4" height="1" fill={dark} />
      <rect x="15" y="2" width="2" height="2" fill={dark} />
      <circle cx="7" cy="11" r="1.1" fill={dark} />
      <rect x="5" y="12" width="4" height="2" fill={dark} />
      <circle cx="25" cy="11" r="1.1" fill="#fff" stroke={dark} strokeWidth="0.4" />
      <rect x="23" y="12" width="4" height="2" fill="#fff" stroke={dark} strokeWidth="0.4" />
    </Svg>
  );
}

/** Video Games — neon arcade keep with pipe, ?-block, ghost, coins & items. */
export function GamesCastle({width}: CastleProps) {
  const body = "#1f2937";
  const bodyD = "#0f172a";
  const neon = "#4ade80";
  const pink = "#f472b6";
  return (
    <Svg width={width}>
      {/* arcade floor with neon grid line */}
      <rect x="-8" y="30" width="48" height="4" fill={bodyD} />
      <rect x="-8" y="30" width="48" height="0.4" fill={neon} />

      {/* green pipe on the right */}
      <rect x="32" y="23" width="7" height="2" fill="#22c55e" />
      <rect x="33" y="25" width="5" height="9" fill="#16a34a" />
      <rect x="33" y="25" width="1" height="9" fill="#4ade80" />

      {/* ?-block top-left */}
      <rect x="-7" y="-3" width="5" height="5" fill="#f59e0b" stroke="#b45309" strokeWidth="0.4" />
      <rect x="-5" y="-1" width="1" height="1" fill="#fff" />
      <rect x="-5" y="0" width="1" height="1" fill="#fff" />

      {/* red ghost on the left */}
      <circle cx="-4" cy="22" r="3" fill="#ef4444" />
      <rect x="-7" y="22" width="6" height="5" fill="#ef4444" />
      <circle cx="-5.3" cy="21.5" r="1" fill="#fff" />
      <circle cx="-2.7" cy="21.5" r="1" fill="#fff" />
      <circle cx="-5" cy="21.5" r="0.4" fill="#1d4ed8" />
      <circle cx="-2.4" cy="21.5" r="0.4" fill="#1d4ed8" />

      {/* floating coins */}
      <circle cx="30" cy="-4" r="1.6" fill="#facc15" />
      <circle cx="30" cy="-4" r="0.7" fill="#ca8a04" />

      {/* walls / keep */}
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
      <rect x="12" y="10" width="2" height="2" fill={neon} />
      <rect x="18" y="10" width="2" height="2" fill={pink} />
      <rect x="14" y="22" width="4" height="6" fill="#0b1020" stroke={neon} strokeWidth="0.4" />

      {/* pixel heart + star */}
      <rect x="24" y="9" width="1" height="1" fill="#ef4444" />
      <rect x="26" y="9" width="1" height="1" fill="#ef4444" />
      <rect x="24" y="10" width="3" height="1" fill="#ef4444" />
      <rect x="25" y="11" width="1" height="1" fill="#ef4444" />
      <polygon points="16,0 17,2 19,2 17.5,3.5 18,5.5 16,4.5 14,5.5 14.5,3.5 13,2 15,2" fill="#fde047" />
    </Svg>
  );
}

/** Manga — colourful anime castle exploding with speed lines and sparkles. */
export function MangaCastle({width}: CastleProps) {
  const white = "#fffdf7";
  const ink = "#1a1a1a";
  const pink = "#f472b6";
  const rose = "#ec4899";
  const sky = "#38bdf8";
  // speed lines bursting from above the keep out to the margins
  const burst: [number, number][] = [
    [-8, -8],
    [0, -8],
    [8, -8],
    [24, -8],
    [32, -8],
    [40, -8],
    [40, 2],
    [40, 12],
    [-8, 2],
    [-8, 12],
  ];
  return (
    <Svg width={width}>
      {burst.map(([x, y], k) => (
        <line key={k} x1="16" y1="-5" x2={x} y2={y} stroke={ink} strokeWidth="0.25" />
      ))}

      {/* floating island the castle sits on */}
      <polygon points="3,28 29,28 23,33 9,33" fill="#9c6b3f" stroke={ink} strokeWidth="0.4" />
      <polygon points="9,33 23,33 16,36" fill="#7a5230" stroke={ink} strokeWidth="0.4" />
      <ellipse cx="16" cy="28" rx="14" ry="2.4" fill="#86efac" stroke={ink} strokeWidth="0.4" />
      {/* little rubble drifting below */}
      <rect x="6" y="35" width="1.5" height="1.5" fill="#9c6b3f" />
      <rect x="24" y="34" width="1.5" height="1.5" fill="#9c6b3f" />

      <rect x="2" y="15" width="11" height="13" fill={white} stroke={ink} strokeWidth="0.6" />
      <rect x="19" y="15" width="11" height="13" fill={white} stroke={ink} strokeWidth="0.6" />
      {[2, 5, 8, 11, 20, 23, 26, 29].map((x) => (
        <rect key={x} x={x} y="13" width="2" height="2" fill={pink} stroke={ink} strokeWidth="0.5" />
      ))}
      <rect x="10" y="6" width="12" height="22" fill={white} stroke={ink} strokeWidth="0.7" />
      <rect x="10" y="6" width="12" height="2" fill={rose} />
      {[10, 13, 16, 19].map((x) => (
        <rect key={x} x={x} y="4" width="2" height="2" fill={pink} stroke={ink} strokeWidth="0.5" />
      ))}
      {[11, 13, 15, 17, 19, 21].map((x) => (
        <circle key={x} cx={x} cy="11" r="0.5" fill={ink} />
      ))}
      <rect x="12" y="14" width="2" height="2" fill={sky} stroke={ink} strokeWidth="0.4" />
      <rect x="18" y="14" width="2" height="2" fill={sky} stroke={ink} strokeWidth="0.4" />
      <rect x="14" y="22" width="4" height="6" fill={ink} />
      <rect x="16" y="0" width="1" height="4" fill={ink} />
      <polygon points="17,0 23,1.5 17,3" fill={pink} stroke={ink} strokeWidth="0.4" />

      {/* big sparkles */}
      <path d="M-6 -4 L-5 -2 L-3 -1 L-5 0 L-6 2 L-7 0 L-9 -1 L-7 -2 Z" fill={rose} />
      <path d="M35 -3 L36 -1 L38 0 L36 1 L35 3 L34 1 L32 0 L34 -1 Z" fill={ink} />
      <path d="M-6 24 L-5.3 25.3 L-4 26 L-5.3 26.7 L-6 28 L-6.7 26.7 L-8 26 L-6.7 25.3 Z" fill={pink} />
      {/* bold exclamation */}
      <rect x="34" y="22" width="1.5" height="4" fill={rose} />
      <rect x="34" y="27" width="1.5" height="1.5" fill={rose} />

      {/* little people standing on the castle */}
      {/* on the left wall */}
      <rect x="5" y="9" width="2" height="1" fill={ink} />
      <circle cx="6" cy="10.5" r="1" fill="#f2c79b" />
      <rect x="5" y="11.5" width="2" height="2.5" fill="#ef4444" />
      {/* on the right wall (pink-haired) */}
      <rect x="24" y="9" width="2" height="1" fill={rose} />
      <circle cx="25" cy="10.5" r="1" fill="#f2c79b" />
      <rect x="24" y="11.5" width="2" height="2.5" fill={sky} />
      {/* on the keep */}
      <rect x="15" y="0" width="2" height="1" fill={ink} />
      <circle cx="16" cy="1.5" r="1" fill="#f2c79b" />
      <rect x="15" y="2.5" width="2" height="2.5" fill="#fde047" />
    </Svg>
  );
}

/** Warhammer — grimdark fortress with a graveyard, braziers and many monsters. */
export function WarhammerCastle({width}: CastleProps) {
  const stone = "#34343b";
  const stoneD = "#1f1f24";
  const stoneL = "#4a4a52";
  const blood = "#7a1d1d";
  const iron = "#0d0d0f";
  const ghoul = "#4d7c0f";
  const slime = "#7c3aed";
  const bone = "#d9d2c2";
  const fire = "#f97316";
  const fireY = "#fde047";
  return (
    <Svg width={width}>
      {/* cracked dark earth */}
      <rect x="-8" y="30" width="48" height="4" fill="#141414" />

      {/* tombstones / crosses */}
      <rect x="-6.5" y="24" width="1" height="6" fill={stoneL} />
      <rect x="-8" y="26" width="4" height="1" fill={stoneL} />
      <rect x="34" y="25" width="4" height="5" fill={stoneL} />
      <rect x="34" y="25" width="4" height="1" fill={bone} />

      {/* braziers with flames */}
      <rect x="-3" y="28" width="3" height="2" fill={iron} />
      <polygon points="-3,28 -1.5,23 0,28" fill={fire} />
      <polygon points="-2.2,28 -1.5,25 -0.8,28" fill={fireY} />
      <rect x="30" y="28" width="3" height="2" fill={iron} />
      <polygon points="30,28 31.5,23 33,28" fill={fire} />
      <polygon points="30.8,28 31.5,25 32.2,28" fill={fireY} />

      {/* walls + spikes */}
      <rect x="2" y="15" width="11" height="13" fill={stone} />
      <rect x="19" y="15" width="11" height="13" fill={stone} />
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
      <polygon points="10,3 11,0 12,3" fill={iron} />
      <polygon points="20,3 21,0 22,3" fill={iron} />
      <rect x="12" y="9" width="2" height="1" fill={blood} />
      <rect x="18" y="9" width="2" height="1" fill={blood} />
      <rect x="14" y="22" width="4" height="6" fill={iron} />
      <rect x="16" y="0" width="1" height="5" fill="#555" />
      <polygon points="17,0 23,2 17,4" fill={blood} />

      {/* monsters: ghoul, slime, imp, gargoyle, skull, spider, demon, bats */}
      <rect x="2" y="24" width="4" height="4" fill={ghoul} />
      <rect x="3" y="25" width="1" height="1" fill="#ef4444" />
      <rect x="5" y="25" width="1" height="1" fill="#ef4444" />
      <rect x="3" y="27" width="3" height="1" fill="#fff" />
      <rect x="26" y="25" width="4" height="3" fill={slime} />
      <rect x="27" y="26" width="1" height="1" fill="#fff" />
      <rect x="29" y="26" width="1" height="1" fill="#fff" />
      <rect x="12" y="25" width="3" height="3" fill={blood} />
      <polygon points="12,25 12.5,23.5 13,25" fill={blood} />
      <polygon points="14,25 14.5,23.5 15,25" fill={blood} />
      <rect x="12" y="26" width="1" height="1" fill={fireY} />
      <rect x="14" y="26" width="1" height="1" fill={fireY} />
      <rect x="4" y="11" width="3" height="3" fill={stoneD} />
      <rect x="4" y="12" width="1" height="1" fill="#ef4444" />
      <rect x="6" y="12" width="1" height="1" fill="#ef4444" />
      {/* big skull on the ground */}
      <rect x="-7" y="30" width="4" height="3" fill={bone} />
      <rect x="-6" y="31" width="1" height="1" fill={iron} />
      <rect x="-4" y="31" width="1" height="1" fill={iron} />
      {/* spider on a thread, top-right */}
      <line x1="36" y1="-8" x2="36" y2="-3" stroke={iron} strokeWidth="0.3" />
      <circle cx="36" cy="-2" r="1.4" fill={iron} />
      <rect x="34" y="-2.4" width="4" height="0.3" fill={iron} />
      {/* winged demon, top-left */}
      <polygon points="-8,-6 -4,-8 -4,-4" fill={iron} />
      <polygon points="0,-6 -4,-8 -4,-4" fill={iron} />
      <rect x="-4.5" y="-6" width="1" height="2" fill={iron} />
      {/* bats */}
      <polygon points="24,8 26,6 26,8" fill={iron} />
      <polygon points="28,8 26,6 26,8" fill={iron} />
      <polygon points="6,5 8,3.5 8,5" fill={iron} />
      <polygon points="10,5 8,3.5 8,5" fill={iron} />
    </Svg>
  );
}

export const CASTLES = {
  "/chess": ChessCastle,
  "/games": GamesCastle,
  "/manga": MangaCastle,
  "/warhammer": WarhammerCastle,
} as const;
