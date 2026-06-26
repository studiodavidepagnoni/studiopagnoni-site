import { HERO_INTRO_STILL_ALT, HERO_INTRO_STILL_W960, heroIntroStillSrcSet } from "@/lib/media/images";

/** Hero home LCP: SLAM handheld Franciacorta (mobile), distinta dalla foto Chi siamo. */
export function HeroLcpPicture() {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- srcset manuale per export statico
    <img
      src={HERO_INTRO_STILL_W960}
      srcSet={heroIntroStillSrcSet()}
      alt={HERO_INTRO_STILL_ALT}
      width={960}
      height={720}
      className="hero-media__image hero-media__image--lcp h-full w-full object-cover object-center"
      decoding="sync"
      fetchPriority="high"
      sizes="100vw"
    />
  );
}
