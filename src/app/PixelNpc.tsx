/** A pixel-art armored knight with a sword and shield, drawn with crisp SVG blocks. */
export default function PixelNpc({
  width = 150,
  className = "",
}: {
  width?: number;
  className?: string;
}) {
  const steel = "#b8bcc2";
  const steelD = "#7f848b";
  const steelL = "#dde0e4";
  const visor = "#23272e";
  const plume = "#b91c1c";
  const gold = "#d4af37";
  const wood = "#6b4f1d";
  const blade = "#e6e9ed";
  const dark = "#23272e";

  // viewBox is 18 wide x 20 tall
  return (
    <svg
      viewBox="0 0 18 20"
      width={width}
      height={(width / 18) * 20}
      className={`pixel-sprite ${className}`}
      role="img"
      aria-label="Gaston, a pixel-art knight"
    >
      {/* plume */}
      <rect x="8" y="0" width="2" height="1" fill={plume} />
      {/* helmet */}
      <rect x="6" y="1" width="6" height="4" fill={steel} />
      <rect x="6" y="1" width="6" height="1" fill={steelD} />
      <rect x="6" y="3" width="6" height="1" fill={visor} />
      {/* gorget */}
      <rect x="7" y="5" width="4" height="1" fill={steelD} />

      {/* shield (left) */}
      <rect x="1" y="6" width="3" height="6" fill={wood} />
      <rect x="1" y="6" width="3" height="1" fill={steelD} />
      <rect x="1" y="11" width="3" height="1" fill={steelD} />
      <rect x="2" y="8" width="1" height="2" fill={gold} />

      {/* sword (right): blade, guard, grip */}
      <rect x="14" y="0" width="1" height="9" fill={blade} />
      <rect x="13" y="8" width="3" height="1" fill={gold} />
      <rect x="14" y="9" width="1" height="2" fill={wood} />

      {/* arms */}
      <rect x="4" y="6" width="1" height="4" fill={steel} />
      <rect x="13" y="6" width="1" height="3" fill={steel} />
      <rect x="13" y="9" width="1" height="1" fill={steel} />

      {/* breastplate */}
      <rect x="5" y="6" width="8" height="6" fill={steel} />
      <rect x="5" y="6" width="1" height="6" fill={steelD} />
      <rect x="12" y="6" width="1" height="6" fill={steelL} />
      {/* heraldic cross */}
      <rect x="8" y="7" width="2" height="4" fill={plume} />
      <rect x="7" y="8" width="4" height="2" fill={plume} />

      {/* belt */}
      <rect x="5" y="12" width="8" height="1" fill={wood} />
      {/* greaves */}
      <rect x="6" y="13" width="2" height="5" fill={steel} />
      <rect x="6" y="13" width="1" height="5" fill={steelD} />
      <rect x="10" y="13" width="2" height="5" fill={steel} />
      <rect x="10" y="13" width="1" height="5" fill={steelD} />
      {/* boots */}
      <rect x="6" y="18" width="2" height="1" fill={dark} />
      <rect x="10" y="18" width="2" height="1" fill={dark} />
    </svg>
  );
}
