import type { CatalogProduct } from "../types";

/** A selection of real products from stickerie.ro, used as demo data. */
export const CATALOG: CatalogProduct[] = [
  { id: "inima-v10", name: "Inima v10", price: 5, size: "9,5×8,9", category: "Pentru fete", stickerText: "♥", color: "#e3262d" },
  { id: "fluture-v13", name: "Fluture v13", price: 5, size: "9,5×7,7", category: "Pentru fete", stickerText: "✿", color: "#c2185b" },
  { id: "only-speeding", name: "I Am Only Speeding", price: 5.5, size: "15×3,4", category: "Haioase", stickerText: "I AM ONLY SPEEDING", color: "#151414" },
  { id: "loud-pipes", name: "Loud Pipes Saves Lives V2", price: 5.5, size: "13×8", category: "Mesaje", stickerText: "LOUD PIPES SAVES LIVES", color: "#151414" },
  { id: "hang-on", name: "Hang On", price: 6.5, size: "15×7,5", category: "Mesaje", stickerText: "HANG ON!", color: "#e3262d" },
  { id: "stance-dance", name: "Stance Will Make Her Dance", price: 5.5, size: "15×7,8", category: "Mesaje", stickerText: "STANCE WILL MAKE HER DANCE", color: "#151414" },
  { id: "golf-r", name: "Golf R", price: 6.5, size: "15×8,2", category: "Siluete auto", stickerText: "GOLF R", color: "#1f6fd6" },
  { id: "baby-crown", name: "Baby On Board Crown", price: 5.5, size: "12×11", category: "Bebe la bord", stickerText: "BABY ON BOARD", color: "#f2c200" },
  { id: "mai-bine-imping", name: "Mai bine împing", price: 8, size: "20×3,1", category: "Personalizate", stickerText: "MAI BINE ÎMPING", color: "#e3262d" },
  { id: "yes-i-see-you", name: "Yes I see you – No I don’t care", price: 6.5, size: "10×10", category: "Mesaje", stickerText: "YES I SEE YOU. NO I DON’T CARE", color: "#151414" },
  { id: "real-muffler", name: "Get A Real Muffler", price: 5.5, size: "15×5", category: "Mesaje", stickerText: "GET A REAL MUFFLER", color: "#151414" },
  { id: "crap", name: "Crap", price: 6.5, size: "14,3×11,8", category: "Hobby", stickerText: "CRAP", color: "#151414" },
  { id: "litri-nu-kw", name: "Mulțumesc Doamne că asta consumă litri, nu kW", price: 7, size: "15×7,4", category: "Românisme", stickerText: "MULȚUMESC DOAMNE CĂ ASTA CONSUMĂ LITRI, NU KW", color: "#151414" },
  { id: "drifting", name: "Drifting is not a crime", price: 7, size: "15×5,7", category: "Mesaje", stickerText: "DRIFTING IS NOT A CRIME", color: "#e3262d" },
  { id: "tiktok", name: "Sticker TikTok personalizat", price: 3, oldPrice: 5, size: "h 2 cm", category: "Social media", stickerText: "@NUMELE.TĂU", color: "#151414" },
  { id: "instagram", name: "Sticker Instagram, siglă color", price: 4, oldPrice: 6, size: "h 2 cm", category: "Social media", stickerText: "@NUMELE.TĂU", color: "#e3262d" },
  { id: "praguri-citroen", name: "Protecții praguri – Citroen", price: 22, size: "4 buc", category: "Protecții prag", stickerText: "CITROEN", color: "#151414" },
  { id: "turn-down", name: "Turn Down", price: 6.5, size: "15×10", category: "Haioase", stickerText: "TURN DOWN", color: "#1f6fd6" },
  { id: "ce-ai-de-faci", name: "Ce ai de faci așa", price: 8, size: "10×9", category: "Românisme", stickerText: "CE AI DE FACI AȘA?!", color: "#e3262d" },
  { id: "autocrew", name: "Bucharest AutoCrew", price: 6, size: "10×4,7", category: "Parteneri oficiali", stickerText: "BUCHAREST AUTOCREW", color: "#151414" },
];

export const BEST_SELLER_IDS = CATALOG.slice(0, 8).map((p) => p.id);

export const CATALOG_CATEGORIES = ["Toate", ...new Set(CATALOG.map((p) => p.category))];

/** Products with a real size in cm can be tried on in the Studio. */
export const canTryOn = (p: CatalogProduct) => p.size.includes("×") && p.category !== "Protecții prag";

/** First number of the size, e.g. "15×3,4" → 15 */
export const widthFromSize = (size: string) => parseFloat(size.split("×")[0].replace(",", ".")) || 15;

export const sizeLabel = (p: CatalogProduct) => `${p.size}${p.size.includes("×") ? " cm" : ""}`;
