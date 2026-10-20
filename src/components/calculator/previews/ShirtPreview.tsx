import type { CalcValues, UploadedImage } from "../../../types";

const ZONES: Record<string, { w: number; h: number }> = { logo: { w: 26, h: 26 }, a4: { w: 52, h: 70 }, a3: { w: 70, h: 94 } };
const FILL: Record<string, string> = { alb: "#fbfbfa", negru: "#1d1c1c", color: "#2f5fb3" };

/** Front and back of the T-shirt with the print zones at relative size. */
export function ShirtPreview({ v, image }: { v: CalcValues; image: UploadedImage | null }) {
  const fill = FILL[String(v.cul)];
  const stroke = v.cul === "alb" ? "var(--line)" : "#888";
  return (
    <svg viewBox="0 0 420 300" className="block h-auto max-h-[380px] w-full" role="img" aria-label="Previzualizare tricou față și spate">
      <Shirt ox={10} label="Față" zone={String(v.fata)} sleeve={v.maneca === true} fill={fill} stroke={stroke} image={image} />
      <Shirt ox={220} label="Spate" zone={String(v.spate)} sleeve={false} fill={fill} stroke={stroke} image={image} />
    </svg>
  );
}

function Shirt({ ox, label, zone, sleeve, fill, stroke, image }: { ox: number; label: string; zone: string; sleeve: boolean; fill: string; stroke: string; image: UploadedImage | null }) {
  const z = ZONES[zone];
  const zx = z ? ox + 95 - z.w / 2 : 0;
  const zy = zone === "logo" ? 80 : 84;
  const clipId = `shirt-zone-${ox}`;
  return (
    <g>
      <path
        d={`M${ox + 65} 40L${ox + 38} 52L${ox + 14} 96L${ox + 40} 108L${ox + 52} 88V250H${ox + 138}V88L${ox + 150} 108L${ox + 176} 96L${ox + 152} 52L${ox + 125} 40C${ox + 120} 56 ${ox + 108} 64 ${ox + 95} 64C${ox + 82} 64 ${ox + 70} 56 ${ox + 65} 40Z`}
        fill={fill} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round"
      />
      {z && (
        <>
          <clipPath id={clipId}><rect x={zx} y={zy} width={z.w} height={z.h} rx="3" /></clipPath>
          <g clipPath={`url(#${clipId})`}>
            {image?.url
              ? <image href={image.url} x={zx} y={zy} width={z.w} height={z.h} preserveAspectRatio="xMidYMid slice" />
              : <rect x={zx} y={zy} width={z.w} height={z.h} fill="#e3262d" />}
          </g>
          <rect x={zx} y={zy} width={z.w} height={z.h} rx="3" fill="none" stroke="#e3262d" strokeDasharray="4 3" />
        </>
      )}
      {sleeve && <rect x={ox + 150} y="74" width="12" height="12" transform={`rotate(25 ${ox + 156} 80)`} fill="#e3262d" />}
      <text x={ox + 95} y="276" textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize="13" fill="var(--ink-2)">{label}</text>
    </g>
  );
}
