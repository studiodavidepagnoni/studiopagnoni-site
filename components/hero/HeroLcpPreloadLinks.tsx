import { HERO_POSTER_DEFAULT_LCP_AVIF, HERO_POSTER_INDOOR_LCP_AVIF } from "@/lib/media/heroVideos";

/**
 * Critical path home: immagine LCP (solo queste route).
 * Mobile: poster LCP RS10. Desktop: poster indoor.
 * Font Sora: preload esplicito in `app/layout.tsx`.
 * Richiede CSS esterno (`inlineCss: false`) così questo link non resta dopo 100KB+ di <style>.
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
