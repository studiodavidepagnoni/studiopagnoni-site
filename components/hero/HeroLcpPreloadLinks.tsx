import { FONT_DISPLAY_PRELOAD_HREF } from "@/lib/fonts";
import { HERO_INTRO_STILL_LCP_AVIF } from "@/lib/media/images";
import { HERO_POSTER_INDOOR_LCP_AVIF } from "@/lib/media/heroVideos";
import { withBasePath } from "@/lib/utils/basePath";

/**
 * Critical path home: prima l’immagine LCP (un solo formato AVIF), poi il font titoli.
 * Evita doppio preload AVIF+WebP che spreca banda su mobile.
 */
export function HeroLcpPreloadLinks() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href={HERO_INTRO_STILL_LCP_AVIF}
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
      <link
        rel="preload"
        href={withBasePath(FONT_DISPLAY_PRELOAD_HREF)}
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
    </>
  );
}
