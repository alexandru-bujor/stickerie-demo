interface Props {
  colors: [string, string][];
  value: string;
  onChange: (color: string) => void;
  /** Prefix for the accessible name, e.g. "Folie" → "Folie roșie". */
  labelPrefix: string;
  size?: number;
}

const CHROME = "linear-gradient(135deg,#6f7377,#f4f5f6 45%,#9ea2a6 55%,#e9ebec)";

export function Swatches({ colors, value, onChange, labelPrefix, size = 34 }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {colors.map(([c, name]) => (
        <button
          key={c}
          type="button"
          aria-pressed={value === c}
          aria-label={`${labelPrefix} ${name}`}
          onClick={() => onChange(c)}
          className="cursor-pointer rounded-full border-2 border-line p-0 aria-pressed:shadow-[0_0_0_3px_var(--plate),0_0_0_5px_var(--red)]"
          style={{ width: size, height: size, background: c === "crom" ? CHROME : c }}
        />
      ))}
    </div>
  );
}
