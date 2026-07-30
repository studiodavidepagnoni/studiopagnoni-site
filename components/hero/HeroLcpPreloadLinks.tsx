import { HERO_POSTER_DEFAULT_LCP_AVIF, HERO_POSTER_INDOOR_LCP_AVIF } from "@/lib/media/heroVideos";

/**
 * Critical path home: immagine LCP.
 * Mobile: poster LCP RS10. Desktop: poster indoor.
 * Font Sora: preload gestito da next/font localFont (preload: true).
 */
export function HeroLcpPreloadLinks() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href={HERO_POSTER_DEFAULT_LCP_AVIF}
        type="image/avif"
        media="(max-width: 1024px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href={HERO_POSTER_INDOOR_LCP_AVIF}
        type="image/avif"
        media="(min-width: 1025px)"
        fetchPriority="high"
      />
    </>
  );
}
