import Link from "next/link";
import { withBasePath } from "@/lib/utils/basePath";
import { site } from "@/lib/config/site";

type SiteBrandLockupProps = {
  className?: string;
  /** Altezza del lockup (larghezza in proporzione). */
  heightClass?: string;
  /** `chrome` = header/footer scuro; `light` = sezioni chiare (filtro scuro). */
  tone?: "chrome" | "light";
};

/**
 * Lockup completo da logo.jpeg (icona + STUDIO PAGNONI + tagline), sfondo trasparente.
 */
export function SiteBrandLockup({
  className = "",
  heightClass = "h-12 sm:h-14",
  tone = "light",
}: SiteBrandLockupProps) {
  const imgClass =
    tone === "chrome"
      ? "site-brand-lockup-img"
      : "site-brand-lockup-img site-brand-lockup-img--on-light";

  return (
    <Link
      href="/"
      className={`group site-brand-lockup inline-flex max-w-full items-center ${className}`}
      aria-label={`${site.name} — home`}
      title={`${site.name} — home`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- lockup SVG */}
      <img
        src={`${withBasePath("/logo-lockup.svg")}?v=22`}
        alt=""
        width={1485}
        height={300}
        fetchPriority="low"
        decoding="async"
        className={`${imgClass} ${heightClass} w-auto max-w-full object-contain object-left`}
        aria-hidden
      />
    </Link>
  );
}
