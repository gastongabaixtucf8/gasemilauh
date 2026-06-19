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

/** Manga — a dark, flame-wreathed fortress under a red moon, on a charred island. */
export function MangaCastle({width}: CastleProps) {
  const stone = "#26232b";
  const stoneD = "#161419";
  const stoneL = "#3a3640";
  const roof = "#7a1d1d";
  const roofD = "#4a1010";
  const lit = "#fb923c";
  const red = "#dc2626";
  const orange = "#f97316";
  const yellow = "#fde047";
  return (
    <Svg width={width}>
      {/* red moon behind */}
      <circle cx="3" cy="2" r="6" fill={red} />
      <circle cx="3" cy="2" r="6" fill="none" stroke="#7f1d1d" strokeWidth="0.5" />

      {/* charred floating island (kept within the canvas so it isn't clipped) */}
      <ellipse cx="16" cy="27.5" rx="15" ry="3" fill="#2a2320" />
      <polygon points="2,27.5 30,27.5 24,31 8,31" fill="#1c1714" />
      <polygon points="8,31 24,31 16,34" fill="#120e0c" />
      {/* ember cracks glowing in the rock */}
      <line x1="11" y1="28" x2="14" y2="32" stroke={orange} strokeWidth="0.4" />
      <line x1="21" y1="28" x2="18" y2="32" stroke={orange} strokeWidth="0.4" />
      <line x1="15" y1="31" x2="16" y2="33.5" stroke={red} strokeWidth="0.4" />

      {/* flames licking up behind the keep */}
      <polygon points="5,29 7,20 9,29" fill={red} className="flame-flicker" />
      <polygon points="23,29 25,19 27,29" fill={red} className="flame-flicker" />
      <polygon points="6,29 7,23 8.5,29" fill={orange} />
      <polygon points="23.5,29 25,22 26.5,29" fill={orange} />

      {/* base tier */}
      <rect x="9" y="20" width="14" height="9" fill={stone} stroke={stoneD} strokeWidth="0.5" />
      <rect x="9" y="20" width="1" height="9" fill={stoneD} />
      <rect x="22" y="20" width="1" height="9" fill={stoneL} />
      <rect x="11" y="23" width="2" height="2" fill={lit} />
      <rect x="19" y="23" width="2" height="2" fill={lit} />
      <rect x="15" y="25" width="2" height="4" fill="#0e0c0a" />
      {/* base roof */}
      <polygon points="6,20 9,16 23,16 26,20" fill={roof} stroke={roofD} strokeWidth="0.4" />
      <polygon points="6,20 4.5,18 7,19" fill={roof} />
      <polygon points="26,20 27.5,18 25,19" fill={roof} />

      {/* mid tier */}
      <rect x="11" y="13" width="10" height="4" fill={stone} stroke={stoneD} strokeWidth="0.5" />
      <rect x="13" y="14" width="2" height="2" fill={lit} />
      <rect x="17" y="14" width="2" height="2" fill={lit} />
      <polygon points="8,13 11,9.5 21,9.5 24,13" fill={roof} stroke={roofD} strokeWidth="0.4" />
      <polygon points="8,13 6.5,11 9,12" fill={roof} />
      <polygon points="24,13 25.5,11 23,12" fill={roof} />

      {/* top tier */}
      <rect x="13" y="6" width="6" height="3.5" fill={stone} stroke={stoneD} strokeWidth="0.5" />
      <rect x="15" y="7" width="2" height="2" fill={lit} />
      <polygon points="10,6 13,3 19,3 22,6" fill={roof} stroke={roofD} strokeWidth="0.4" />
      <polygon points="10,6 8.5,4 11,5" fill={roof} />
      <polygon points="22,6 23.5,4 21,5" fill={roof} />
      {/* flaming finial */}
      <polygon points="14.5,3 16,-1 17.5,3" fill={orange} className="flame-flicker" />
      <polygon points="15.2,3 16,0.5 16.8,3" fill={yellow} />

      {/* foreground flames rising over the base */}
      <polygon points="9,29 11,24 13,29" fill={orange} className="flame-flicker" />
      <polygon points="14,29 16,23 18,29" fill={red} className="flame-flicker" />
      <polygon points="19,29 21,25 23,29" fill={orange} className="flame-flicker" />
      <polygon points="14.7,29 16,26 17.3,29" fill={yellow} />
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
