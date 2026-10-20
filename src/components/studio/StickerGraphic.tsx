import { FONTS } from "../../data/design";
import { measureText, stickerSize } from "../../lib/sticker";
import type { StickerDesign, UploadedImage } from "../../types";

/** Gradients and filters used by sticker drawings. Render once inside each <svg>'s <defs>. */
export function StickerDefs() {
  return (
    <>
      <linearGradient id="cromG" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#6f7377" />
        <stop offset=".42" stopColor="#f6f7f8" />
        <stop offset=".55" stopColor="#9ea2a6" />
        <stop offset="1" stopColor="#e9ebec" />
      </linearGradient>
      <filter id="glow" x="-30%" y="-60%" width="160%" height="220%">
        <feGaussianBlur stdDeviation="2.2" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="lift" x="-10%" y="-10%" width="130%" height="140%">
        <feDropShadow dx=".25" dy=".35" stdDeviation=".25" floodColor="#000" floodOpacity=".45" />
      </filter>
    </>
  );
}

interface Props {
  design: StickerDesign;
  image: UploadedImage | null;
  /** Top-left corner and width, in the units of the surrounding SVG. */
  x: number;
  y: number;
  width: number;
  filter?: string;
  /** Thin dark outline so white vinyl stays visible on light backgrounds. */
  outlineWhite?: boolean;
}

/** Draws the sticker as vinyl letters (text) or as the uploaded image, at an exact width. */
export function StickerGraphic({ design, image, x, y, width, filter, outlineWhite }: Props) {
  const { h } = stickerSize(design, image, width);
  if (image) {
    return <image href={image.url} x={x} y={y} width={width} height={h} preserveAspectRatio="none" filter={filter} />;
  }
  const m = measureText(design.text, design.font);
  const k = width / m.width;
  const f = FONTS[design.font];
  const white = design.color === "#ffffff" && outlineWhite;
  return (
    <text
      x={x + m.left * k}
      y={y + m.ascent * k}
      fontFamily={f.css}
      fontWeight={f.weight}
      fontSize={100 * k}
      fill={design.color === "crom" ? "url(#cromG)" : design.color}
      stroke={white ? "#00000055" : undefined}
      strokeWidth={white ? k * 1.2 : undefined}
      filter={filter}
    >
      {design.text}
    </text>
  );
}
