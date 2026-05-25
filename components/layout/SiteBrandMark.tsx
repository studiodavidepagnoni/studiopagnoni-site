import { withBasePath } from "@/lib/utils/basePath";

type SiteBrandMarkProps = {
  className?: string;
  /** Box quadrato dell’icona. */
  markSize?: string;
};

/** Solo il disegno del marchio (SVG), senza titolo né tagline. */
export function SiteBrandMark({
  className = "",
  markSize = "w-[5.35rem] sm:w-[6rem] md:w-[6.75rem]",
}: SiteBrandMarkProps) {
  return (
    <span
      className={`box-border flex aspect-square shrink-0 items-center justify-center ${markSize} ${className}`}
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- marchio vettoriale */}
      <img
        src={`${withBasePath("/logo-mark.svg")}?v=15`}
        alt=""
        width={616}
        height={616}
        loading="lazy"
        fetchPriority="low"
        decoding="async"
        className="site-brand-mark site-brand-mark--on-light h-full w-full object-contain"
      />
    </span>
  );
}
