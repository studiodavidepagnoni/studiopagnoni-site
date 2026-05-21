import Image from "next/image";
import { HERO_POSTER_INDOOR_LCP } from "@/lib/heroVideos";

/** Skeleton LCP mentre il bundle client dell’hero si carica (dynamic import). */
export function HeroHomePlaceholder() {
  return (
    <section
      className="relative isolate h-[100dvh] min-h-[100svh] max-w-full overflow-hidden border-b border-[var(--green-border-muted)]"
      aria-hidden
    >
      <div className="absolute inset-0 z-0 bg-[linear-gradient(180deg,var(--hero-fallback-from)_0%,var(--hero-fallback-via)_38%,var(--hero-fallback-to)_100%)]" />
      <div className="hero-media__stage hero-media__stage--intro absolute inset-0">
        <Image
          src={HERO_POSTER_INDOOR_LCP}
          alt=""
          fill
          className="hero-media__image object-cover object-center"
          sizes="(max-width: 960px) 100vw, 960px"
          priority
          fetchPriority="high"
        />
        <div className="hero-media__overlay hero-media__overlay--shade absolute inset-0" aria-hidden />
        <div className="hero-media__overlay hero-media__overlay--vignette absolute inset-0" aria-hidden />
      </div>
    </section>
  );
}
