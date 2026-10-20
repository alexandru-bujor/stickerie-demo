/** Number formatting in Romanian: 1.234,50 */
export const fmt = (n: number) =>
  n.toLocaleString("ro-RO", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** "12,50 lei" */
export const lei = (n: number) => `${fmt(n)} lei`;

/** Round to 2 decimals (money). */
export const round2 = (n: number) => Math.round(n * 100) / 100;

/** One decimal, Romanian comma: 6,2 */
export const dec1 = (n: number) => (Math.round(n * 10) / 10).toLocaleString("ro-RO");

export const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

export const todayRo = () =>
  new Date().toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" });
