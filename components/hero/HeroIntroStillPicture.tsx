import {
  HERO_INTRO_STILL_ALT,
  HERO_INTRO_STILL_LCP,
  HERO_INTRO_STILL_LCP_AVIF,
} from "@/lib/media/images";
import { HERO_POSTER_INDOOR_LCP, HERO_POSTER_INDOOR_LCP_AVIF } from "@/lib/media/heroVideos";
import { imageAlt } from "@/lib/config/seo";

const DESKTOP_INTRO_ALT = imageAlt("Rilievo laser scanner SLAM in ambiente indoor", { service: "slam" });

const stillClass =
  "hero-media__image hero-media__image--lcp absolute inset-0 h-full w-full object-cover object-center";

/**
 * Hero slide 1 statico: mobile = still LCP leggero (AVIF/WebP); desktop = poster indoor LCP.
 */
export function HeroIntroStillPicture() {
  return (
    <>
      <picture className={`${stillClass} max-[1024px]:block hidden`}>
        <source srcSet={HERO_INTRO_STILL_LCP_AVIF} type="image/avif" />
        <source srcSet={HERO_INTRO_STILL_LCP} type="image/webp" />
        {/* eslint-disable-next-line @next/next/no-img-element -- LCP static export */}
        <img
          src={HERO_INTRO_STILL_LCP}
          alt={HERO_INTRO_STILL_ALT}
          width={480}
          height={640}
          className="h-full w-full object-cover object-[center_40%]"
          decoding="sync"
          fetchPriority="high"
          sizes="100vw"
        />
      </picture>
      <picture className={`${stillClass} hidden min-[1025px]:block`}>
        <source srcSet={HERO_POSTER_INDOOR_LCP_AVIF} type="image/avif" />
        <source srcSet={HERO_POSTER_INDOOR_LCP} type="image/webp" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_POSTER_INDOOR_LCP}
          alt={DESKTOP_INTRO_ALT}
          width={768}
          height={512}
          className="h-full w-full object-cover object-center"
          decoding="sync"
          fetchPriority="high"
          sizes="100vw"
        />
      </picture>
    </>
  );
}
