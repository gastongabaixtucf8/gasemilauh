/** A little pixel-art NPC drawn with crisp SVG blocks. */
export default function PixelNpc({
  width = 160,
  className = "",
}: {
  width?: number;
  className?: string;
}) {
  const hair = "#5a3411";
  const skin = "#f2c79b";
  const eye = "#1b130a";
  const shirt = "#3b82f6";
  const shirtDark = "#1d4ed8";
  const pants = "#2b3242";
  const shoe = "#14181f";

  return (
    <svg
      viewBox="0 0 16 17"
      width={width}
      height={(width / 16) * 17}
      className={`pixel-sprite ${className}`}
      role="img"
      aria-label="Gaston, a pixel-art guide"
    >
      {/* hair */}
      <rect x="4" y="1" width="8" height="3" fill={hair} />
      <rect x="3" y="2" width="1" height="2" fill={hair} />
      <rect x="12" y="2" width="1" height="2" fill={hair} />
      {/* face */}
      <rect x="4" y="3" width="8" height="4" fill={skin} />
      <rect x="4" y="3" width="8" height="1" fill={hair} />
      {/* eyes */}
      <rect x="6" y="4" width="1" height="1" fill={eye} />
      <rect x="9" y="4" width="1" height="1" fill={eye} />
      {/* mouth */}
      <rect x="7" y="6" width="2" height="1" fill="#c47b5a" />
      {/* body / shirt */}
      <rect x="4" y="7" width="8" height="5" fill={shirt} />
      <rect x="4" y="7" width="8" height="1" fill={shirtDark} />
      {/* left arm (down) */}
      <rect x="3" y="7" width="1" height="2" fill={shirt} />
      <rect x="3" y="9" width="1" height="1" fill={skin} />
      {/* right arm (waving) */}
      <g className="npc-wave">
        <rect x="12" y="6" width="1" height="2" fill={shirt} />
        <rect x="12" y="4" width="1" height="2" fill={skin} />
        <rect x="12" y="3" width="1" height="1" fill={skin} />
      </g>
      {/* belt */}
      <rect x="4" y="11" width="8" height="1" fill="#8a5a18" />
      {/* legs */}
      <rect x="5" y="12" width="2" height="4" fill={pants} />
      <rect x="9" y="12" width="2" height="4" fill={pants} />
      {/* shoes */}
      <rect x="5" y="16" width="2" height="1" fill={shoe} />
      <rect x="9" y="16" width="2" height="1" fill={shoe} />
    </svg>
  );
}
