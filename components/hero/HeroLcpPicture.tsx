import { HERO_POSTER_INDOOR_LCP, HERO_POSTER_INDOOR_LCP_AVIF } from "@/lib/media/heroVideos";

type Props = {
  alt: string;
};

/** Poster hero LCP: AVIF/WebP nativi (niente optimizer Next) per peso minimo su mobile. */
export function HeroLcpPicture({ alt }: Props) {
  return (
    <picture className="absolute inset-0 block">
      <source srcSet={HERO_POSTER_INDOOR_LCP_AVIF} type="image/avif" />
      <source srcSet={HERO_POSTER_INDOOR_LCP} type="image/webp" />
      <img
        src={HERO_POSTER_INDOOR_LCP}
        alt={alt}
        width={768}
        height={512}
        className="hero-media__image hero-media__image--lcp h-full w-full object-cover object-center"
        decoding="sync"
        fetchPriority="high"
        sizes="(max-width: 768px) 100vw, 768px"
      />
    </picture>
  );
}
