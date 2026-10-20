import { dec1, round2 } from "../lib/format";
import type { CalcField, CalcTotals, CalcValues, CalculatorProduct, ProductId } from "../types";

/*
 * Demo price lists for every calculator. All prices are in lei with VAT.
 * Change the numbers here; the forms, receipts and charts follow automatically.
 */

const s = (v: CalcValues, k: string) => String(v[k]);
const b = (v: CalcValues, k: string) => v[k] === true;
const m2 = (n: number) => round2(n).toLocaleString("ro-RO");
const sum = (lines: [string, number | string][]) => lines.reduce((t, l) => t + (typeof l[1] === "number" ? l[1] : 0), 0);

const upload = (label = "Grafica ta"): CalcField => ({ id: "up", type: "upload", label });
const qty = (def: number, label = "Cantitate"): CalcField => ({ id: "qty", type: "qty", label, def, unit: "buc" });

export const CALCULATORS: Record<ProductId, CalculatorProduct> = {
  sticker: {
    id: "sticker", name: "Stickere personalizate", short: "Stickere", icon: "sticker", from: 4,
    lead: "Gata de expediere în 1–2 zile lucrătoare",
    description: "Decupate din folie sau printate și laminate, pentru mașină, vitrină sau laptop.",
    defaultRef: "a4", refs: ["none", "a4", "om"],
    fields: [
      { id: "text", type: "text", label: "Textul tău", hint: "opțional", def: "BEBE LA BORD" },
      { id: "dim", type: "dims", label: "Dimensiune", w: 15, h: 8, min: 3, max: 120 },
      { id: "tip", type: "seg", label: "Execuție", def: "cut", opts: [["cut", "Decupat din folie", "o culoare"], ["print", "Printat + laminat", "full color, UV"]] },
      { id: "folie", type: "seg", label: "Folie", def: "std", opts: [["std", "Standard", "×1"], ["lux", "Lucioasă premium", "+20%"], ["refl", "Reflectorizantă", "+50%"], ["crom", "Crom", "+70%"]] },
      { id: "col", type: "color", label: "Culoare sticker", def: "#e3262d", show: (v) => v.tip === "cut" },
      upload(),
      qty(5),
    ],
    tiers: [[5, 0.1], [10, 0.15], [25, 0.25], [50, 0.35]],
    calc(v) {
      const area = v.w * v.h;
      const cut = s(v, "tip") === "cut";
      const mult: Record<string, number> = { std: 1, lux: 1.2, refl: 1.5, crom: 1.7 };
      const unit = Math.max(4, (cut ? area * 0.022 + 2.5 : area * 0.03 + 3) * mult[s(v, "folie")]);
      const foil: Record<string, string> = { std: "standard", lux: "lucioasă", refl: "reflectorizantă", crom: "crom" };
      return {
        unit, preview: "rect",
        lines: [[`Sticker ${dec1(v.w)}×${dec1(v.h)} cm, ${cut ? "decupat" : "printat"}`, unit]],
        summary: `${dec1(v.w)}×${dec1(v.h)} cm, ${cut ? "decupat" : "printat"}, folie ${foil[s(v, "folie")]}`,
      };
    },
  },

  banner: {
    id: "banner", name: "Bannere", short: "Bannere", icon: "banner", from: 39,
    lead: "Producție în 2 zile lucrătoare",
    description: "Frontlit, mesh sau blockout, cu tiv și capse, pentru garduri, fațade și evenimente.",
    defaultRef: "context", refs: ["none", "a4", "om", "context"], contextLabel: "Pe gard",
    fields: [
      { id: "dim", type: "dims", label: "Dimensiune", w: 300, h: 100, min: 30, max: 1000 },
      { id: "mat", type: "seg", label: "Material", def: "f440", opts: [["f440", "Frontlit 440 g", "39 lei/m²"], ["f510", "Frontlit 510 g", "49 lei/m²"], ["mesh", "Mesh (plasă)", "55 lei/m²"], ["block", "Blockout 2 fețe", "75 lei/m²"]] },
      { id: "fin", type: "seg", label: "Finisare", def: "tiv", opts: [["tiv", "Tiv + capse", "3 lei/ml"], ["capse", "Doar capse", "1,5 lei/ml"], ["buz", "Buzunare țeavă", "5 lei/ml"], ["none", "Fără", "0"]] },
      upload(),
      qty(1),
    ],
    tiers: [[3, 0.08], [5, 0.12], [10, 0.18]],
    calc(v) {
      const area = Math.max(0.5, (v.w * v.h) / 1e4);
      const perM2: Record<string, number> = { f440: 39, f510: 49, mesh: 55, block: 75 };
      const perMl: Record<string, number> = { tiv: 3, capse: 1.5, buz: 5, none: 0 };
      const ml = (2 * (v.w + v.h)) / 100;
      const mat = s(v, "mat"), fin = s(v, "fin");
      const lines: [string, number][] = [[`Print ${m2(area)} m² × ${perM2[mat]} lei`, area * perM2[mat]]];
      if (perMl[fin]) lines.push([`Finisare ${dec1(ml)} ml`, ml * perMl[fin]]);
      const matName: Record<string, string> = { f440: "frontlit 440 g", f510: "frontlit 510 g", mesh: "mesh", block: "blockout" };
      const finName: Record<string, string> = { tiv: "tiv + capse", capse: "capse", buz: "buzunare", none: "fără finisare" };
      return { unit: sum(lines), lines, preview: "banner", grommets: fin === "tiv" || fin === "capse", summary: `${v.w}×${v.h} cm, ${matName[mat]}, ${finName[fin]}` };
    },
  },

  tricou: {
    id: "tricou", name: "Tricouri personalizate", short: "Tricouri", icon: "tricou", from: 41,
    lead: "Gata în 3–4 zile lucrătoare",
    description: "Print DTF față, spate și mânecă, pentru echipe, cluburi și evenimente.",
    defaultRef: "none",
    fields: [
      { id: "model", type: "seg", label: "Model", def: "b150", opts: [["b150", "Bumbac 150 g", "29 lei"], ["b190", "Premium 190 g", "39 lei"], ["polo", "Polo", "55 lei"], ["hano", "Hanorac", "95 lei"]] },
      { id: "cul", type: "seg", label: "Culoare tricou", def: "alb", opts: [["alb", "Alb", "+0"], ["negru", "Negru", "+4 lei"], ["color", "Color", "+4 lei"]] },
      { id: "fata", type: "seg", label: "Print față", def: "a4", opts: [["none", "Fără", "0"], ["logo", "Logo 10 cm", "12 lei"], ["a4", "A4", "22 lei"], ["a3", "A3", "32 lei"]] },
      { id: "spate", type: "seg", label: "Print spate", def: "none", opts: [["none", "Fără", "0"], ["a4", "A4", "22 lei"], ["a3", "A3", "32 lei"]] },
      { id: "maneca", type: "check", label: "Print pe mânecă (+8 lei)", def: false },
      { id: "marime", type: "select", label: "Mărime", def: "L", opts: [["S", "S"], ["M", "M"], ["L", "L"], ["XL", "XL"], ["XXL", "XXL (+5 lei)"]] },
      upload(),
      qty(10),
    ],
    tiers: [[10, 0.1], [25, 0.18], [50, 0.25], [100, 0.32]],
    calc(v) {
      const model: Record<string, [number, string]> = { b150: [29, "bumbac 150 g"], b190: [39, "premium 190 g"], polo: [55, "polo"], hano: [95, "hanorac"] };
      const [price, name] = model[s(v, "model")];
      const base = price + (s(v, "cul") === "alb" ? 0 : 4) + (s(v, "marime") === "XXL" ? 5 : 0);
      const front: Record<string, number> = { none: 0, logo: 12, a4: 22, a3: 32 };
      const back: Record<string, number> = { none: 0, a4: 22, a3: 32 };
      const fata = s(v, "fata"), spate = s(v, "spate");
      const lines: [string, number][] = [[`Tricou ${name}, ${s(v, "marime")}`, base]];
      if (front[fata]) lines.push([`Print față ${fata === "logo" ? "logo" : fata.toUpperCase()}`, front[fata]]);
      if (back[spate]) lines.push([`Print spate ${spate.toUpperCase()}`, back[spate]]);
      if (b(v, "maneca")) lines.push(["Print mânecă", 8]);
      const zone = (z: string) => (z === "none" ? "fără" : z === "logo" ? "logo" : z.toUpperCase());
      return { unit: sum(lines), lines, preview: "shirt", summary: `${s(v, "marime")}, față ${zone(fata)}, spate ${zone(spate)}` };
    },
  },

  steag: {
    id: "steag", name: "Steaguri și drapele", short: "Steaguri", icon: "steag", from: 35,
    lead: "Producție în 2–3 zile lucrătoare",
    description: "Poliester printat, pentru catarg, balcon, tribune sau beach flag.",
    defaultRef: "om", refs: ["none", "a4", "om"],
    fields: [
      { id: "fmt", type: "seg", label: "Format", def: "90x150", opts: [["60x90", "60×90 cm"], ["90x150", "90×150 cm"], ["100x200", "100×200 cm"], ["150x300", "150×300 cm"], ["custom", "Personalizat"]] },
      { id: "dim", type: "dims", label: "Dimensiune personalizată", w: 120, h: 80, min: 20, max: 600, show: (v) => v.fmt === "custom" },
      { id: "fete", type: "seg", label: "Print", def: "1", opts: [["1", "O față", "vizibil invers pe spate"], ["2", "Față-verso", "×1,8"]] },
      { id: "fin", type: "seg", label: "Prindere", def: "inele", opts: [["inele", "Tiv + 2 inele", "10 lei"], ["tunel", "Tunel catarg", "12 lei"], ["beach", "Beach flag cu suport", "+120 lei"]] },
      upload(),
      qty(1),
    ],
    tiers: [[5, 0.1], [10, 0.15], [25, 0.22]],
    calc(v) {
      let w = v.w, h = v.h;
      if (s(v, "fmt") !== "custom") [h, w] = s(v, "fmt").split("x").map(Number);
      const two = s(v, "fete") === "2";
      const print = Math.max(35, ((w * h) / 1e4) * 55) * (two ? 1.8 : 1);
      const fin: Record<string, [number, string]> = { inele: [10, "Tiv + inele"], tunel: [12, "Tunel catarg"], beach: [120, "Suport beach flag"] };
      const [finPrice, finName] = fin[s(v, "fin")];
      return {
        unit: print + finPrice, w, h, preview: "flag",
        lines: [[`Print ${w}×${h} cm, ${two ? "față-verso" : "o față"}`, print], [finName, finPrice]],
        summary: `${w}×${h} cm, ${two ? "față-verso" : "o față"}`,
      };
    },
  },

  tablou: {
    id: "tablou", name: "Tablouri canvas", short: "Tablouri", icon: "tablou", from: 59,
    lead: "Gata în 3 zile lucrătoare",
    description: "Pânză canvas pe șasiu de lemn, din poza ta. Îl vezi deasupra canapelei, la scară.",
    defaultRef: "context", refs: ["none", "a4", "om", "context"], contextLabel: "Pe perete",
    fields: [
      { id: "fmt", type: "seg", label: "Dimensiune", def: "90x60", opts: [["30x20", "30×20"], ["40x30", "40×30"], ["60x40", "60×40"], ["90x60", "90×60"], ["120x80", "120×80"], ["custom", "Alta"]] },
      { id: "dim", type: "dims", label: "Dimensiune personalizată", w: 70, h: 50, min: 20, max: 200, show: (v) => v.fmt === "custom" },
      { id: "sasiu", type: "seg", label: "Șasiu", def: "2", opts: [["2", "2 cm", "standard"], ["4", "4 cm", "+15%"]] },
      { id: "marg", type: "seg", label: "Margini", def: "mirror", opts: [["mirror", "Oglindite"], ["alb", "Albe"], ["neg", "Negre"]] },
      { id: "rama", type: "check", label: "Ramă lemn neagră (45 lei/ml)", def: false },
      { id: "panouri", type: "seg", label: "Panouri", def: "1", opts: [["1", "Un panou"], ["3", "Triptic", "+15% + 20 lei"]] },
      upload("Poza ta"),
      qty(1),
    ],
    tiers: [[3, 0.08], [5, 0.12]],
    calc(v) {
      let w = v.w, h = v.h;
      if (s(v, "fmt") !== "custom") [w, h] = s(v, "fmt").split("x").map(Number);
      const canvas = Math.max(59, ((w * h) / 1e4) * 160 + 25);
      const lines: [string, number][] = [[`Canvas ${w}×${h} cm pe șasiu`, canvas]];
      if (s(v, "sasiu") === "4") lines.push(["Șasiu 4 cm", canvas * 0.15]);
      if (s(v, "panouri") === "3") lines.push(["Împărțire în triptic", canvas * 0.15 + 20]);
      if (b(v, "rama")) {
        const ml = (2 * (w + h)) / 100;
        lines.push([`Ramă ${dec1(ml)} ml`, ml * 45]);
      }
      return { unit: sum(lines), lines, w, h, preview: "canvas", summary: `${w}×${h} cm${s(v, "panouri") === "3" ? ", triptic" : ""}${b(v, "rama") ? ", cu ramă" : ""}` };
    },
  },

  rollup: {
    id: "rollup", name: "Roll-up", short: "Roll-up", icon: "rollup", from: 189,
    lead: "Gata în 2 zile lucrătoare",
    description: "Stand cu mecanism și geantă de transport, pentru târguri și recepții.",
    defaultRef: "om", refs: ["none", "a4", "om"],
    fields: [
      { id: "fmt", type: "seg", label: "Lățime", def: "85", opts: [["85", "85×200 cm"], ["100", "100×200 cm"], ["120", "120×200 cm"]] },
      { id: "tip", type: "seg", label: "Mecanism", def: "eco", opts: [["eco", "Economic", "aluminiu ușor"], ["prem", "Premium", "bază lată"]] },
      { id: "doar", type: "check", label: "Doar print de schimb (am deja mecanism)", def: false },
      upload(),
      qty(1),
    ],
    tiers: [[3, 0.07], [5, 0.12]],
    calc(v) {
      const prices: Record<string, [number, number]> = { "85": [189, 269], "100": [219, 309], "120": [259, 359] };
      const width = s(v, "fmt"), eco = s(v, "tip") === "eco";
      const full = prices[width][eco ? 0 : 1];
      const reprint = b(v, "doar");
      const lines: [string, number | string][] = reprint
        ? [[`Print de schimb ${width}×200 cm`, full * 0.4]]
        : [[`Roll-up ${eco ? "economic" : "premium"} ${width}×200 cm`, full], ["Geantă de transport", "inclus"]];
      return { unit: reprint ? full * 0.4 : full, lines, w: Number(width), h: 200, preview: "rollup", summary: `${width}×200 cm, ${reprint ? "print de schimb" : eco ? "economic" : "premium"}` };
    },
  },

  vitrina: {
    id: "vitrina", name: "Autocolante vitrină", short: "Vitrine", icon: "vitrina", from: 65,
    lead: "Producție în 2–3 zile, montaj la programare",
    description: "Folie printată, microperforată sau sablată pentru vitrine, uși și birouri.",
    defaultRef: "context", refs: ["none", "om", "context"], contextLabel: "Pe fațadă",
    fields: [
      { id: "dim", type: "dims", label: "Suprafață geam", w: 200, h: 120, min: 20, max: 600 },
      { id: "fol", type: "seg", label: "Folie", def: "print", opts: [["print", "Printată", "65 lei/m²"], ["micro", "Microperforată", "85 lei/m²"], ["sabl", "Sablare decor", "70 lei/m²"], ["lit", "Litere decupate", "90 lei/m²"]] },
      { id: "montaj", type: "seg", label: "Montaj", def: "nu", opts: [["nu", "Îl aplic eu", "0"], ["da", "Montaj în București", "150 lei"]] },
      upload(),
      qty(1, "Geamuri identice"),
    ],
    tiers: [[3, 0.08], [6, 0.14]],
    calc(v) {
      const area = Math.max(0.5, (v.w * v.h) / 1e4);
      const perM2: Record<string, [number, string]> = { print: [65, "printată"], micro: [85, "microperforată"], sabl: [70, "sablare"], lit: [90, "litere decupate"] };
      const [price, name] = perM2[s(v, "fol")];
      const install = s(v, "montaj") === "da";
      return {
        unit: area * price, fixed: install ? 150 : 0, preview: "window",
        lines: [[`Folie ${m2(area)} m² × ${price} lei`, area * price]],
        summary: `${v.w}×${v.h} cm, ${name}${install ? ", cu montaj" : ""}`,
      };
    },
  },

  cana: {
    id: "cana", name: "Căni personalizate", short: "Căni", icon: "cana", from: 25,
    lead: "Gata în 1–2 zile lucrătoare",
    description: "Căni ceramice printate prin sublimare. Cana magică își arată imaginea doar când e caldă.",
    defaultRef: "none",
    fields: [
      { id: "tip", type: "seg", label: "Tip cană", def: "magic", opts: [["alba", "Albă 330 ml", "25 lei"], ["int", "Interior colorat", "32 lei"], ["magic", "Magică", "39 lei"]] },
      { id: "print", type: "seg", label: "Print", def: "o", opts: [["o", "O parte"], ["wrap", "Pe toată cana", "+6 lei"]] },
      { id: "text", type: "text", label: "Text pe cană", hint: "opțional", def: "Cel mai bun șofer" },
      upload("Poza ta"),
      qty(6),
    ],
    tiers: [[6, 0.08], [12, 0.15], [36, 0.25]],
    calc(v) {
      const types: Record<string, [number, string]> = { alba: [25, "albă"], int: [32, "cu interior colorat"], magic: [39, "magică"] };
      const [price, name] = types[s(v, "tip")];
      const wrap = s(v, "print") === "wrap";
      const unit = price + (wrap ? 6 : 0);
      const text = s(v, "text");
      return { unit, preview: "mug", lines: [[`Cană ${name}${wrap ? ", print complet" : ""}`, unit]], summary: `${name}${text ? `, „${text}”` : ""}` };
    },
  },
};

export const CALCULATOR_ORDER: ProductId[] = ["sticker", "banner", "tricou", "steag", "tablou", "rollup", "vitrina", "cana"];

export const REF_LABELS = { none: "Doar produsul", a4: "Lângă o foaie A4", om: "Lângă un om" } as const;

/** Discount for a quantity: the highest tier reached. */
export function tierDiscount(tiers: [number, number][], qty: number): number {
  let d = 0;
  for (const [min, rate] of tiers) if (qty >= min) d = rate;
  return d;
}

export function defaultValues(p: CalculatorProduct): CalcValues {
  const v: CalcValues = { qty: 1, ref: p.defaultRef, w: 0, h: 0 };
  for (const f of p.fields) {
    if (f.type === "dims") { v.w = f.w; v.h = f.h; }
    else if (f.type !== "upload") v[f.id] = f.def;
  }
  return v;
}

export function computeTotals(p: CalculatorProduct, v: CalcValues): CalcTotals {
  const r = p.calc(v);
  const qty = Math.max(1, Math.floor(v.qty));
  const discountRate = tierDiscount(p.tiers, qty);
  const subtotal = r.unit * qty;
  const discount = subtotal * discountRate;
  return { ...r, qty, discountRate, subtotal, discount, total: subtotal - discount + (r.fixed ?? 0) };
}

export const isProductId = (x: string): x is ProductId => x in CALCULATORS;
