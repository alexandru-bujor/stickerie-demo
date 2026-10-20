import type { ButtonHTMLAttributes } from "react";

type Variant = "default" | "red";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-line font-bold " +
  "shadow-sticker-sm transition-[transform,box-shadow] duration-100 cursor-pointer " +
  "hover:-translate-x-px hover:-translate-y-px hover:shadow-[4px_4px_0_var(--shadow)] " +
  "active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_var(--shadow)] " +
  "disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  default: "bg-plate text-ink",
  red: "bg-brand text-brand-ink",
};
const sizes: Record<Size, string> = {
  md: "px-[22px] py-3",
  sm: "px-3.5 py-2 text-sm",
};

export function buttonClass(variant: Variant = "default", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> { variant?: Variant; size?: Size }

export function Button({ variant = "default", size = "md", className = "", type = "button", ...rest }: Props) {
  return <button type={type} className={buttonClass(variant, size, className)} {...rest} />;
}
