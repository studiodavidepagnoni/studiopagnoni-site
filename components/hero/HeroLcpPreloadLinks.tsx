import { HERO_INTRO_STILL_W960 } from "@/lib/media/images";
import { HERO_POSTER_INDOOR_LCP, HERO_POSTER_INDOOR_LCP_AVIF } from "@/lib/media/heroVideos";

/** Preload LCP hero: immagine mobile vs poster desktop (allineato a HeroIntroStillPicture). */
export function HeroLcpPreloadLinks() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href={HERO_INTRO_STILL_W960}
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
      <link
        rel="preload"
        as="image"
        href={HERO_POSTER_INDOOR_LCP}
        type="image/webp"
        media="(min-width: 1025px)"
        fetchPriority="high"
      />
    </>
  );
}
