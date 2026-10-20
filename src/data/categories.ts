import type { IconName, ProductId } from "../types";

export interface HomeCategory {
  key: string;
  name: string;
  description: string;
  icon: IconName;
  /** Where the shortcut goes: a calculator, or the sticker catalog with a filter. */
  target: { kind: "calculator"; product: ProductId } | { kind: "catalog"; filter: string };
}

export const HOME_CATEGORIES: HomeCategory[] = [
  { key: "sticker", name: "Stickere", description: "Decupate sau printate", icon: "sticker", target: { kind: "calculator", product: "sticker" } },
  { key: "banner", name: "Bannere", description: "Frontlit, mesh, blockout", icon: "banner", target: { kind: "calculator", product: "banner" } },
  { key: "tricou", name: "Tricouri", description: "Print DTF față-spate", icon: "tricou", target: { kind: "calculator", product: "tricou" } },
  { key: "steag", name: "Steaguri", description: "Catarg, balcon, beach flag", icon: "steag", target: { kind: "calculator", product: "steag" } },
  { key: "tablou", name: "Tablouri canvas", description: "Din poza ta", icon: "tablou", target: { kind: "calculator", product: "tablou" } },
  { key: "rollup", name: "Roll-up", description: "Stand + geantă", icon: "rollup", target: { kind: "calculator", product: "rollup" } },
  { key: "vitrina", name: "Vitrine", description: "Folie, microperforat", icon: "vitrina", target: { kind: "calculator", product: "vitrina" } },
  { key: "cana", name: "Căni", description: "Sublimare, magice", icon: "cana", target: { kind: "calculator", product: "cana" } },
  { key: "prag", name: "Protecții prag", description: "Pe marca mașinii", icon: "prag", target: { kind: "catalog", filter: "Protecții prag" } },
  { key: "moto", name: "Stickere moto", description: "Tank pad, mesaje", icon: "moto", target: { kind: "catalog", filter: "Toate" } },
];

export const SHIPPING = {
  courier: { price: 19, days: "2–3 zile" },
  post: { price: 16, days: "4–5 zile" },
} as const;

export const PHONE = { display: "0755 16 16 86", raw: "0755161686" } as const;
