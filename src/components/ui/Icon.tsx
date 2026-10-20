import type { ReactNode } from "react";
import type { IconName } from "../../types";

/** Product and interface icons. Product icons use the theme tokens so they work in dark mode. */
const PATHS: Record<IconName, { viewBox: string; body: ReactNode }> = {
  sticker: { viewBox: "0 0 64 64", body: (<><path d="M10 14a4 4 0 0 1 4-4h36a4 4 0 0 1 4 4v22L36 54H14a4 4 0 0 1-4-4Z" fill="var(--plate)" /><path d="M54 36H40a4 4 0 0 0-4 4v14" fill="var(--red)" /><path d="M20 26h24M20 34h14" strokeLinecap="round" /></>) },
  banner: { viewBox: "0 0 64 64", body: (<><rect x="6" y="16" width="52" height="28" rx="2" fill="var(--red)" />{[[11, 21], [53, 21], [11, 39], [53, 39]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="2" fill="var(--plate)" />)}<path d="M20 30h24" stroke="var(--red-ink)" strokeLinecap="round" /></>) },
  tricou: { viewBox: "0 0 64 64", body: (<><path d="M23 8 12 13 4 27l9 5 4-6v32h30V26l4 6 9-5-8-14-11-5c-1 4-5 7-9 7s-8-3-9-7Z" fill="var(--plate)" /><rect x="25" y="26" width="14" height="12" rx="2" fill="var(--red)" stroke="none" /></>) },
  steag: { viewBox: "0 0 64 64", body: (<><path d="M12 6v54" strokeLinecap="round" /><path d="M12 10c9-4 17 3 26 0s14-3 20 0v24c-6-3-11-3-20 0s-17-4-26 0Z" fill="var(--red)" /></>) },
  tablou: { viewBox: "0 0 64 64", body: (<><rect x="8" y="12" width="48" height="38" rx="2" fill="var(--plate)" /><path d="M8 42l14-12 10 9 8-6 16 12" /><circle cx="44" cy="22" r="4" fill="var(--red)" stroke="none" /></>) },
  rollup: { viewBox: "0 0 64 64", body: (<><rect x="20" y="4" width="24" height="48" rx="1" fill="var(--plate)" /><rect x="24" y="10" width="16" height="10" fill="var(--red)" stroke="none" /><path d="M26 28h12M26 34h8" strokeLinecap="round" /><path d="M14 52h36v6H14z" fill="var(--ink)" /></>) },
  vitrina: { viewBox: "0 0 64 64", body: (<><path d="M6 20 12 8h40l6 12" /><path d="M6 20h52v6a6 6 0 0 1-12 0 6 6 0 0 1-11 0 6 6 0 0 1-11 0 6 6 0 0 1-12 0Z" fill="var(--red)" /><path d="M10 32v24h44V32" /><rect x="16" y="38" width="20" height="18" fill="var(--plate)" /><path d="M40 38h8v8h-8z" /></>) },
  cana: { viewBox: "0 0 64 64", body: (<><path d="M12 14h32v34a6 6 0 0 1-6 6H18a6 6 0 0 1-6-6Z" fill="var(--plate)" /><path d="M44 22h6a6 6 0 0 1 0 12h-6" /><path d="M12 26h32v12H12z" fill="var(--red)" stroke="none" /></>) },
  prag: { viewBox: "0 0 64 64", body: (<><rect x="4" y="22" width="56" height="10" rx="5" fill="var(--ink)" /><rect x="10" y="38" width="44" height="10" rx="5" fill="var(--ink)" /><path d="M24 27h16M28 43h8" stroke="var(--red)" strokeLinecap="round" /></>) },
  moto: { viewBox: "0 0 64 64", body: (<><circle cx="14" cy="42" r="9" /><circle cx="50" cy="42" r="9" /><path d="M14 42 24 26h12l6 8h8l-6-12h-6" strokeLinecap="round" /><path d="M24 26l8 16h10" /><path d="M22 20h8" strokeLinecap="round" stroke="var(--red)" /></>) },
  car: { viewBox: "0 0 24 24", body: (<><path d="M3 15v-3l2-5h11l3 4 2 1v3h-2" /><circle cx="7" cy="16" r="2" /><circle cx="17" cy="16" r="2" /><path d="M9 16h6" /></>) },
  plus: { viewBox: "0 0 24 24", body: <path d="M12 5v14M5 12h14" strokeLinecap="round" /> },
  cart: { viewBox: "0 0 24 24", body: (<><path d="M5 8h14l-1.3 11.2a2 2 0 0 1-2 1.8H8.3a2 2 0 0 1-2-1.8L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>) },
  search: { viewBox: "0 0 24 24", body: (<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" strokeLinecap="round" /></>) },
  menu: { viewBox: "0 0 24 24", body: <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" /> },
  close: { viewBox: "0 0 24 24", body: <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" /> },
  upload: { viewBox: "0 0 24 24", body: (<><path d="M12 16V4M7 9l5-5 5 5" strokeLinecap="round" /><path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" strokeLinecap="round" /></>) },
  sun: { viewBox: "0 0 24 24", body: (<><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5" strokeLinecap="round" /></>) },
  moon: { viewBox: "0 0 24 24", body: <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" /> },
  warn: { viewBox: "0 0 24 24", body: (<><path d="M12 3 2 20h20Z" /><path d="M12 10v4M12 17v.5" strokeLinecap="round" /></>) },
  clock: { viewBox: "0 0 24 24", body: (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>) },
  truck: { viewBox: "0 0 24 24", body: (<><path d="M3 7h11v10H3zM14 10h4l3 3v4h-7z" /><circle cx="7" cy="18" r="1.6" /><circle cx="17" cy="18" r="1.6" /></>) },
};

interface IconProps { name: IconName; size?: number; className?: string; strokeWidth?: number }

export function Icon({ name, size = 20, className, strokeWidth }: IconProps) {
  const p = PATHS[name];
  const big = p.viewBox === "0 0 64 64";
  return (
    <svg
      viewBox={p.viewBox}
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth ?? (big ? 3 : 2.2)}
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {p.body}
    </svg>
  );
}
