import { FONTS, foilName } from "../data/design";
import type { FontKey, StickerDesign, UploadedImage } from "../types";
import { dec1, round2 } from "./format";

export interface TextMetrics { width: number; left: number; ascent: number; descent: number }

let ctx: CanvasRenderingContext2D | null = null;

/** Measures text at 100px with the sticker font, so the real height in cm follows from the width. */
export function measureText(text: string, font: FontKey): TextMetrics {
  ctx ??= document.createElement("canvas").getContext("2d");
  const f = FONTS[font] ?? FONTS.brico;
  if (!ctx) return { width: Math.max(1, text.length * 60), left: 0, ascent: 72, descent: 0 };
  ctx.font = `${f.weight} 100px ${f.css}`;
  const m = ctx.measureText(text || " ");
  const left = m.actualBoundingBoxLeft || 0;
  const right = m.actualBoundingBoxRight || m.width;
  return {
    width: Math.max(1, left + right),
    left,
    ascent: Math.max(1, m.actualBoundingBoxAscent || 72),
    descent: Math.max(0, m.actualBoundingBoxDescent || 0),
  };
}

/** Real sticker size in cm for a given width. */
export function stickerSize(d: StickerDesign, image: UploadedImage | null, width = d.width) {
  if (image) return { w: width, h: width * image.ratio };
  const m = measureText(d.text, d.font);
  return { w: width, h: ((m.ascent + m.descent) * width) / m.width };
}

/**
 * Demo pricing for a single custom sticker.
 * Cut vinyl: area × 0,022 + 2,5 lei. Printed (own image): area × 0,03 + 3 lei.
 * Chrome ×1,7, reflective ×1,5, minimum 4 lei.
 */
export function stickerPrice(d: StickerDesign, image: UploadedImage | null): number {
  const { w, h } = stickerSize(d, image);
  const area = w * h;
  let base = image ? area * 0.03 + 3 : area * 0.022 + 2.5;
  if (!image && d.color === "crom") base *= 1.7;
  else if (d.reflective) base *= 1.5;
  return round2(Math.max(4, base));
}

export function foilLabel(d: StickerDesign, image: UploadedImage | null): string {
  if (image) return "print color + laminare";
  if (d.color === "crom") return "folie crom";
  return d.reflective ? "folie reflectorizantă" : "folie decupată";
}

export function stickerSummary(d: StickerDesign, image: UploadedImage | null): string {
  const { w, h } = stickerSize(d, image);
  const what = image
    ? "grafică proprie, printată"
    : `„${d.text}”, folie ${foilName(d.color)}${d.reflective && d.color !== "crom" ? " reflectorizantă" : ""}`;
  return `${what}, ${dec1(w)}×${dec1(h)} cm`;
}
