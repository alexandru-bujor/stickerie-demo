import { VEHICLES } from "../data/vehicles";
import type { StickerDesign, UploadedImage } from "../types";
import { stickerSize } from "./sticker";

/** Fit the sticker inside a recommended zone of the current vehicle and center it there. */
export function placeInZone(d: StickerDesign, image: UploadedImage | null, zoneIndex: number): Partial<StickerDesign> {
  const zone = VEHICLES[d.vehicle].zones[zoneIndex];
  if (!zone) return {};
  const [, cx, cy, maxW, maxH] = zone;
  let w = maxW * 0.9;
  let { h } = stickerSize(d, image, w);
  if (h > maxH) {
    w = (w * maxH) / h;
    h = maxH;
  }
  w = Math.round(w * 10) / 10;
  return { width: w, x: cx - w / 2, y: cy - h / 2, zone: zoneIndex };
}

/** Put a sticker of a known real width at the center of a zone (used by "Probează pe mașină"). */
export function centerInZone(d: StickerDesign, image: UploadedImage | null, zoneIndex: number, width: number): Partial<StickerDesign> {
  const zone = VEHICLES[d.vehicle].zones[zoneIndex];
  if (!zone) return {};
  const { h } = stickerSize({ ...d, width }, image, width);
  return { width, x: zone[1] - width / 2, y: zone[2] - h / 2, zone: -1 };
}
