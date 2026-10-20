import type { SegOption } from "../../types";

interface Props {
  label: string;
  options: SegOption[];
  value: string;
  onChange: (value: string) => void;
  /** "red" for form choices, "dark" for view toggles. */
  tone?: "red" | "dark";
  size?: "md" | "sm";
}

/** A row of pressable choices (radio group look-alike). */
export function Segmented({ label, options, value, onChange, tone = "red", size = "md" }: Props) {
  const on = tone === "red" ? "bg-brand text-brand-ink shadow-sticker-sm" : "bg-ink text-paper";
  return (
    <div className="flex flex-wrap gap-1.5" role="group" aria-label={label}>
      {options.map(([v, text, note]) => {
        const pressed = v === value;
        return (
          <button
            key={v}
            type="button"
            aria-pressed={pressed}
            onClick={() => onChange(v)}
            className={`flex cursor-pointer flex-col rounded-[10px] border-[1.5px] border-line text-left font-semibold leading-tight ${
              size === "sm" ? "px-2.5 py-1 text-[13px]" : "px-3 py-2 text-sm"
            } ${pressed ? on : "bg-plate text-ink"}`}
          >
            {text}
            {note && <small className={`font-mono text-xs font-medium ${pressed ? "opacity-90" : "text-ink-2"}`}>{note}</small>}
          </button>
        );
      })}
    </div>
  );
}
