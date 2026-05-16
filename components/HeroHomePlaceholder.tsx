import Image from "next/image";
import { HERO_POSTER_INDOOR, heroSlides } from "@/lib/images";

/** Skeleton LCP mentre il bundle client dell’hero si carica (dynamic import). */
export function HeroHomePlaceholder() {
  const poster = heroSlides[0].poster ?? HERO_POSTER_INDOOR;

  return (
    <section
      className="relative isolate h-[100dvh] min-h-[100svh] max-w-full overflow-hidden border-b border-[var(--green-border-muted)]"
      aria-hidden
    >
      <div className="absolute inset-0 z-0 bg-[linear-gradient(180deg,var(--hero-fallback-from)_0%,var(--hero-fallback-via)_38%,var(--hero-fallback-to)_100%)]" />
      <Image src={poster} alt="" fill className="object-cover object-center" sizes="100vw" priority fetchPriority="high" />
      <div className="hero-media__overlay hero-media__overlay--shade absolute inset-0" aria-hidden />
    </section>
  );
}
