import { useState } from "react";
import type { CalcValues, UploadedImage } from "../../../types";

/** Mug preview. The magic mug is black until you hover or tap it, then the print appears. */
export function MugPreview({ v, image }: { v: CalcValues; image: UploadedImage | null }) {
  const [hot, setHot] = useState(false);
  const text = String(v.text ?? "");
  const wrap = v.print === "wrap";
  const magic = v.tip === "magic";
  const inner = ({ alba: "#ffffff", int: "#e3262d", magic: "#1d1c1c" } as Record<string, string>)[String(v.tip)];
  const body = magic ? "#1d1c1c" : "#ffffff";
  const ax = wrap ? 112 : 140, aw = wrap ? 176 : 120;

  return (
    <svg
      viewBox="0 0 420 300"
      className={`block h-auto max-h-[380px] w-full mug-hover ${hot ? "mug-hot" : ""}`}
      role="img"
      aria-label="Previzualizare cană"
      onClick={() => setHot((x) => !x)}
    >
      <path d="M290 110h28a32 32 0 0 1 0 64h-28" fill="none" stroke="var(--line)" strokeWidth="14" />
      <path d="M290 110h28a32 32 0 0 1 0 64h-28" fill="none" stroke={body} strokeWidth="9" />
      <path d="M110 70h180v150a20 20 0 0 1-20 20h-140a20 20 0 0 1-20-20Z" fill={body} stroke="var(--line)" strokeWidth="2.5" />
      <ellipse cx="200" cy="70" rx="90" ry="12" fill={inner} stroke="var(--line)" strokeWidth="2.5" />
      <clipPath id="mug-clip"><rect x={ax} y="100" width={aw} height="100" rx="4" /></clipPath>
      <g clipPath="url(#mug-clip)" className={magic ? "mug-reveal" : undefined}>
        {image?.url ? (
          <image href={image.url} x={ax} y="100" width={aw} height="100" preserveAspectRatio="xMidYMid slice" />
        ) : (
          <>
            <rect x={ax} y="100" width={aw} height="100" fill="#fde6e5" />
            <text x={ax + aw / 2} y="157" textAnchor="middle" fontFamily="Bricolage Grotesque,sans-serif" fontWeight="800" fontSize={Math.min(24, (aw * 1.7) / Math.max(6, text.length))} fill="#e3262d">{text}</text>
          </>
        )}
      </g>
      {magic && (
        <path d="M170 52c-6-8 6-12 0-22M200 50c-6-8 6-12 0-22M230 52c-6-8 6-12 0-22" fill="none" stroke="var(--ink-2)" strokeWidth="2" strokeLinecap="round" opacity=".6" />
      )}
      <text x="200" y="274" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="12" fill="var(--ink-2)">
        {magic ? "Neagră la rece. Treci cu mouse-ul sau atinge: apare imaginea." : "ceramică 330 ml"}
      </text>
    </svg>
  );
}
