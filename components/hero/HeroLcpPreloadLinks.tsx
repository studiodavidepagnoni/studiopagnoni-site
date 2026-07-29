import { HERO_POSTER_DEFAULT, HERO_POSTER_INDOOR_LCP_AVIF } from "@/lib/media/heroVideos";

/**
 * Critical path home: immagine LCP.
 * Mobile: poster del 3° video (SLAM RS10). Desktop: poster indoor AVIF.
 * Font Sora: preload gestito da Next.js localFont (preload: true).
 */
export function HeroLcpPreloadLinks() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href={HERO_POSTER_DEFAULT}
        type="image/webp"
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
