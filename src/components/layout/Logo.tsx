import logo from "../../assets/logo.png";

/** The original logo, always on a white plate so the black outline reads in dark mode too. */
export function Logo({ height = 46 }: { height?: number }) {
  return (
    <span className="inline-block flex-none rounded-[10px] bg-white px-1.5 py-0.5 leading-none">
      <img src={logo} alt="Stickerie.ro" width={Math.round(height * 2.63)} height={height} style={{ height, width: "auto" }} />
    </span>
  );
}
