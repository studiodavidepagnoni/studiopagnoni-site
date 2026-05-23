import { heroSlides } from "@/lib/images";
import { HERO_VIDEO_DEFAULT_SOURCES } from "@/lib/heroVideos";

const DEFAULT_VIDEO = HERO_VIDEO_DEFAULT_SOURCES;

/** Prima slide: più tempo per lettura + video intro. */
export const HERO_FIRST_SLIDE_MS = 24_000;
export const HERO_FIRST_SLIDE_NO_VIDEO_MS = 18_000;
/** Slide con video: proseguono da dove erano (non remount). */
export const HERO_VIDEO_SLIDE_MS = 20_000;
export const HERO_IMAGE_SLIDE_MS = 14_000;

export function nextSlideIndex(current: number) {
  return (current + 1) % heroSlides.length;
}

export function slideDurationMs(
  slideIndex: number,
  heroUsesVideo: boolean,
  failedVideos: ReadonlySet<string>,
): number {
  const slide = heroSlides[slideIndex];
  const sources = slide.video ?? DEFAULT_VIDEO;
  const hasVideo = heroUsesVideo && !failedVideos.has(sources.mp4);
  if (slideIndex === 0) return hasVideo ? HERO_FIRST_SLIDE_MS : HERO_FIRST_SLIDE_NO_VIDEO_MS;
  return hasVideo ? HERO_VIDEO_SLIDE_MS : HERO_IMAGE_SLIDE_MS;
}
