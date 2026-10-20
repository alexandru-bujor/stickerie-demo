/* Shared types for the whole app. */

export type IconName =
  | "sticker" | "banner" | "tricou" | "steag" | "tablou" | "rollup" | "vitrina" | "cana"
  | "prag" | "moto" | "car" | "plus" | "cart" | "search" | "menu" | "close" | "upload"
  | "sun" | "moon" | "warn" | "clock" | "truck";

/* ---------- catalog ---------- */
export interface CatalogProduct {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  /** Size as printed on the product page, e.g. "15×3,4" (cm) or "4 buc". */
  size: string;
  category: string;
  /** Text shown on the die-cut thumbnail. */
  stickerText: string;
  color: string;
}

/* ---------- calculators ---------- */
export type ProductId = "sticker" | "banner" | "tricou" | "steag" | "tablou" | "rollup" | "vitrina" | "cana";
export type RefMode = "none" | "a4" | "om" | "context";

/** Values the user picked in a calculator. Keys come from the product's fields. */
export interface CalcValues {
  qty: number;
  ref: RefMode;
  /** Width and height in cm, for products with a dims field. */
  w: number;
  h: number;
  [key: string]: string | number | boolean;
}

export type SegOption = [value: string, label: string, note?: string];

export type CalcField =
  | { id: string; type: "dims"; label: string; w: number; h: number; min: number; max: number; show?: (v: CalcValues) => boolean }
  | { id: string; type: "seg"; label: string; def: string; opts: SegOption[]; show?: (v: CalcValues) => boolean }
  | { id: string; type: "select"; label: string; def: string; opts: SegOption[]; show?: (v: CalcValues) => boolean }
  | { id: string; type: "check"; label: string; def: boolean; show?: (v: CalcValues) => boolean }
  | { id: string; type: "text"; label: string; def: string; hint?: string; show?: (v: CalcValues) => boolean }
  | { id: string; type: "color"; label: string; def: string; show?: (v: CalcValues) => boolean }
  | { id: string; type: "upload"; label: string }
  | { id: "qty"; type: "qty"; label: string; def: number; unit: string };

export type PreviewKind = "rect" | "banner" | "shirt" | "flag" | "canvas" | "rollup" | "window" | "mug";

export interface CalcResult {
  /** Price per unit before quantity discount. */
  unit: number;
  /** Receipt lines: label and value (number in lei, or a word like "inclus"). */
  lines: [string, number | string][];
  /** One-off cost added once, after the discount (e.g. installation). */
  fixed?: number;
  /** Real size in cm when it does not come from the dims field. */
  w?: number;
  h?: number;
  preview: PreviewKind;
  grommets?: boolean;
  /** Short human summary for the cart and the copied offer. */
  summary: string;
}

export interface CalculatorProduct {
  id: ProductId;
  name: string;
  short: string;
  icon: IconName;
  from: number;
  lead: string;
  description: string;
  defaultRef: RefMode;
  refs?: RefMode[];
  contextLabel?: string;
  fields: CalcField[];
  /** [minimum quantity, discount 0..1] */
  tiers: [number, number][];
  calc: (v: CalcValues) => CalcResult;
}

export interface CalcTotals extends CalcResult {
  qty: number;
  discountRate: number;
  subtotal: number;
  discount: number;
  total: number;
}

/* ---------- studio ---------- */
export type FontKey = "brico" | "bungee" | "marker" | "russo";
export type VehicleKey = "hatch" | "sedan" | "suv" | "brk" | "moto";

export interface UploadedImage { url: string; name: string; /** height / width */ ratio: number }

export interface StickerDesign {
  text: string;
  font: FontKey;
  /** Hex color or "crom". */
  color: string;
  reflective: boolean;
  /** Width in cm. */
  width: number;
  vehicle: VehicleKey;
  vehicleColor: string;
  night: boolean;
  /** Top-left position on the vehicle, in cm. null = place in the default zone. */
  x: number | null;
  y: number | null;
  zone: number;
  showZones: boolean;
}

/** [label, centerX, centerY, maxWidth, maxHeight] all in cm */
export type Zone = [string, number, number, number, number];

export interface Vehicle {
  name: string;
  length: number;
  groundY: number;
  wheelY: number;
  wheelR: number;
  wheels: number[];
  zones: Zone[];
  moto?: boolean;
  body?: string;
  windows?: string[];
  doors?: string;
  headlight?: [number, number, number, number];
  taillight?: [number, number, number, number];
}

/* ---------- cart & projects ---------- */
export interface CartItem { id: number; name: string; details: string; qty: number; total: number; icon: IconName }

export type SavedProject =
  | { id: number; kind: "studio"; date: string; title: string; summary: string; total: number; design: StickerDesign }
  | { id: number; kind: "calc"; date: string; title: string; summary: string; total: number; product: ProductId; values: CalcValues };

/* ---------- routing ---------- */
export type Route =
  | { page: "home" }
  | { page: "studio" }
  | { page: "calculator"; product: ProductId }
  | { page: "catalog"; filter?: string; query?: string }
  | { page: "contact" };
