import Image from "next/image";
import { HeroLcpPicture } from "@/components/hero/HeroLcpPicture";
import type { HeroSlide } from "@/lib/media/images";
import {
  HERO_VIDEO_DEFAULT_SOURCES,
  heroVideoKey,
  heroVideoSourceOrder,
} from "@/lib/media/heroVideos";
import { HERO_INTRO_STILL_W960 } from "@/lib/media/images";
import { HeroVideoSources } from "@/components/hero/HeroVideoSources";

const DEFAULT_VIDEO = HERO_VIDEO_DEFAULT_SOURCES;

type Props = {
  slide: HeroSlide;
  slideIndex: number;
  isActive: boolean;
  showVideo: boolean;
  loadSources: boolean;
  introKenburnDone: boolean;
  reducedMotion: boolean;
  registerVideo: (key: string) => (el: HTMLVideoElement | null) => void;
  onVideoError: (key: string) => void;
};

function posterForSlide(slide: HeroSlide, slideIndex: number): string {
  if (slideIndex === 0) return HERO_INTRO_STILL_W960;
  if (slide.poster) return slide.poster;
  const sources = slide.video ?? DEFAULT_VIDEO;
  return sources.mp4.replace(/\.mp4(\?.*)?$/i, "-poster.webp");
}

export function HeroSlideLayer({
  slide,
  slideIndex,
  isActive,
  showVideo,
  loadSources,
  introKenburnDone,
  reducedMotion,
  registerVideo,
  onVideoError,
}: Props) {
  const sources = slide.video ?? DEFAULT_VIDEO;
  const key = heroVideoKey(sources);
  const isIntroSlide = slideIndex === 0;
  const posterSrc = posterForSlide(slide, slideIndex);
  const sourceOrder = heroVideoSourceOrder(sources.mp4);

  const layerClass = [
    "hero-media__layer",
    isActive && "hero-media__layer--active",
    isIntroSlide && "hero-media__layer--intro",
    isIntroSlide && isActive && !introKenburnDone && !reducedMotion && "hero-media__layer--intro-enter",
  ]
    .filter(Boolean)
    .join(" ");

  const staticMedia =
    isIntroSlide ? (
      <HeroLcpPicture alt={slide.alt} />
    ) : (
      // eslint-disable-next-line @next/next/no-img-element -- poster pre-generato, niente optimizer
      <img
        src={posterSrc}
        alt={slide.alt}
        className="hero-media__image hero-media__image--lcp h-full w-full object-cover"
        style={slide.videoObjectPosition ? { objectPosition: slide.videoObjectPosition } : undefined}
        decoding="async"
        loading={isActive ? "eager" : "lazy"}
        sizes="100vw"
      />
    );

  const media = showVideo ? (
    <video
      ref={registerVideo(key)}
      className="hero-media__video hero-media__video--ready absolute inset-0 h-full w-full"
      style={slide.videoObjectPosition ? { objectPosition: slide.videoObjectPosition } : undefined}
      poster={posterSrc}
      muted
      playsInline
      loop
      preload={isActive ? "metadata" : "none"}
      onError={() => onVideoError(key)}
      aria-hidden
    >
      {loadSources ? <HeroVideoSources sources={sources} order={sourceOrder} /> : null}
    </video>
  ) : isIntroSlide ? (
    staticMedia
  ) : (
    <Image
      src={posterSrc}
      alt={slide.alt}
      fill
      className="hero-media__image object-cover"
      style={slide.videoObjectPosition ? { objectPosition: slide.videoObjectPosition } : undefined}
      sizes="100vw"
      priority={slideIndex === 0}
      loading={isActive ? undefined : "lazy"}
    />
  );

  return (
    <div className={layerClass} aria-hidden={!isActive}>
      {isIntroSlide && !reducedMotion ? <div className="hero-media__kenburns">{media}</div> : media}
    </div>
  );
}
