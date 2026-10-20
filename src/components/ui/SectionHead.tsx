import type { ReactNode } from "react";

interface Props { eyebrow: string; title: string; aside?: ReactNode }

export function SectionHead({ eyebrow, title, aside }: Props) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h2 className="mt-2 text-[clamp(28px,4vw,42px)] font-extrabold">{title}</h2>
      </div>
      {aside}
    </div>
  );
}
