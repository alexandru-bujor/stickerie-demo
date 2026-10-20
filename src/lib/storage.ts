/** localStorage that never throws (private windows, blocked storage). */
export function readStore<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStore<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable: the app keeps working in memory */
  }
}

export const STORAGE_KEYS = {
  cart: "stk-cart-v2",
  projects: "stk-proj-v2",
  design: "stk-design",
} as const;
