import type { FontKey, StickerDesign } from "../types";

export const FONTS: Record<FontKey, { css: string; weight: number; label: string }> = {
  brico: { css: "'Bricolage Grotesque','Arial Black',sans-serif", weight: 800, label: "Grotesk" },
  bungee: { css: "Bungee,Impact,sans-serif", weight: 400, label: "Bungee" },
  marker: { css: "'Permanent Marker','Comic Sans MS',cursive", weight: 400, label: "Marker" },
  russo: { css: "'Russo One','Arial Black',sans-serif", weight: 400, label: "Russo" },
};

/** Vinyl colors: [value, adjective used in Romanian copy] */
export const FOIL_COLORS: [string, string][] = [
  ["#e3262d", "roșie"],
  ["#151414", "neagră"],
  ["#ffffff", "albă"],
  ["#f2c200", "galbenă"],
  ["#1f6fd6", "albastră"],
  ["crom", "crom"],
];

export const VEHICLE_COLORS: [string, string][] = [
  ["#f4f4f2", "albă"],
  ["#1a1a1a", "neagră"],
  ["#6b6e72", "gri"],
  ["#c4c7cb", "argintie"],
  ["#b3141c", "roșie"],
  ["#1f4f9a", "albastră"],
  ["#1e4d3a", "verde închis"],
  ["#f2c200", "galbenă"],
];

export const foilName = (c: string) => FOIL_COLORS.find((x) => x[0] === c)?.[1] ?? "personalizată";
export const vehicleColorName = (c: string) => VEHICLE_COLORS.find((x) => x[0] === c)?.[1] ?? "";

export const DEFAULT_DESIGN: StickerDesign = {
  text: "BEBE LA BORD",
  font: "brico",
  color: "#e3262d",
  reflective: false,
  width: 30,
  vehicle: "hatch",
  vehicleColor: "#f4f4f2",
  night: false,
  x: null,
  y: null,
  zone: 1,
  showZones: true,
};
