import Image from "next/image";
import type { HeroSlide } from "@/lib/media/images";
import {
  HERO_POSTER_INDOOR_LCP,
  HERO_VIDEO_DEFAULT_SOURCES,
  heroVideoKey,
  heroVideoSourceOrder,
} from "@/lib/media/heroVideos";
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
  const posterSrc = isIntroSlide
    ? HERO_POSTER_INDOOR_LCP
    : (slide.poster ?? DEFAULT_VIDEO.mp4.replace(/\.mp4$/i, "-poster.webp"));
  const sourceOrder = heroVideoSourceOrder(sources.mp4);

  const layerClass = [
    "hero-media__layer",
    isActive && "hero-media__layer--active",
    isIntroSlide && "hero-media__layer--intro",
    isIntroSlide && isActive && !introKenburnDone && !reducedMotion && "hero-media__layer--intro-enter",
  ]
    .filter(Boolean)
    .join(" ");

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
  ) : (
    <Image
      src={slide.src}
      alt={slide.alt}
      fill
      className="hero-media__image object-cover"
      sizes="100vw"
      priority={slideIndex === 0}
      fetchPriority={slideIndex === 0 ? "high" : undefined}
      loading={slideIndex === 0 ? undefined : "lazy"}
    />
  );

  return (
    <div className={layerClass} aria-hidden={!isActive}>
      {isIntroSlide && !reducedMotion ? <div className="hero-media__kenburns">{media}</div> : media}
    </div>
  );
}
