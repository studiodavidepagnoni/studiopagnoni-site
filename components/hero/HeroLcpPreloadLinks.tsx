import { HERO_POSTER_INDOOR_LCP, HERO_POSTER_INDOOR_LCP_AVIF } from "@/lib/media/heroVideos";

/** Preload LCP poster (AVIF + WebP fallback) — solo home. */
export function HeroLcpPreloadLinks() {
  return (
    <>
      <link rel="preload" as="image" href={HERO_POSTER_INDOOR_LCP_AVIF} type="image/avif" fetchPriority="high" />
      <link rel="preload" as="image" href={HERO_POSTER_INDOOR_LCP} type="image/webp" fetchPriority="high" />
    </>
  );
}
