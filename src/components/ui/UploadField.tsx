import { useId } from "react";
import { Icon } from "./Icon";

interface Props {
  label: string;
  fileName?: string;
  hint?: string;
  accept?: string;
  emptyText?: string;
  emptySub?: string;
  onFile: (file: File) => void;
}

export function UploadField({ label, fileName, hint = "PNG, JPG, PDF, AI", accept = "image/*,.pdf,.ai,.eps,.svg", emptyText = "Încarcă fișierul", emptySub = "Sau îl trimiți pe WhatsApp după comandă", onFile }: Props) {
  const id = useId();
  return (
    <div className="flex flex-col gap-2">
      <span className="flex justify-between gap-2 text-sm font-bold">
        {label}
        <span className="text-[13px] font-medium text-ink-2">{hint}</span>
      </span>
      <label
        htmlFor={id}
        className="relative flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-ink-2 bg-paper p-3 hover:border-brand"
      >
        <Icon name="upload" size={26} />
        <span className="min-w-0 text-sm">
          <b className="block truncate">{fileName ?? emptyText}</b>
          <span className="text-[13px] text-ink-2">{fileName ? "Apasă ca să schimbi fișierul" : emptySub}</span>
        </span>
        <input
          id={id}
          type="file"
          accept={accept}
          className="absolute h-px w-px opacity-0"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFile(f);
            e.target.value = "";
          }}
        />
      </label>
    </div>
  );
}
