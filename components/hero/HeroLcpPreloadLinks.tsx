import { HERO_INTRO_STILL_W960 } from "@/lib/media/images";

/** Preload LCP hero home — foto stock w960 (mobile e placeholder). */
export function HeroLcpPreloadLinks() {
  return <link rel="preload" as="image" href={HERO_INTRO_STILL_W960} type="image/webp" fetchPriority="high" />;
}
