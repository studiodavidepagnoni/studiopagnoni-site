import { HERO_INTRO_STILL_W960, heroIntroStillSrcSet } from "@/lib/media/images";

type Props = {
  alt: string;
};

/** Hero home LCP: foto stock (non frame da video), con srcset responsive. */
export function HeroLcpPicture({ alt }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- srcset manuale per export statico
    <img
      src={HERO_INTRO_STILL_W960}
      srcSet={heroIntroStillSrcSet()}
      alt={alt}
      width={960}
      height={720}
      className="hero-media__image hero-media__image--lcp h-full w-full object-cover object-[center_42%]"
      decoding="sync"
      fetchPriority="high"
      sizes="100vw"
    />
  );
}
