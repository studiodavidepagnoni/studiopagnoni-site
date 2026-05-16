import { withBasePath } from "@/lib/basePath";

export type HeroVideoSources = {
  mp4: string;
  webm: string;
};

function heroVideo(base: string): HeroVideoSources {
  const mp4 = withBasePath(`/assets/${base}.mp4`);
  return { mp4, webm: mp4.replace(/\.mp4$/i, ".webm") };
}

export const HERO_VIDEO_DEFAULT_SOURCES = heroVideo("rs10-hero");
export const HERO_VIDEO_POINTCLOUD_SOURCES = heroVideo("hero-video-2");
export const HERO_VIDEO_INDOOR_SOURCES = heroVideo("hero-video-3");

const poster = (base: string) => withBasePath(`/assets/${base}-poster.webp`);

export const HERO_POSTER_DEFAULT = poster("rs10-hero");
export const HERO_POSTER_POINTCLOUD = poster("hero-video-2");
export const HERO_POSTER_INDOOR = poster("hero-video-3");

/** Poster ~960px per LCP (placeholder + preload); il <video> usa il poster full. */
export const HERO_POSTER_INDOOR_LCP = withBasePath("/assets/hero-video-3-poster-lcp.webp");

/** Compat: path MP4 per preload e riferimenti legacy. */
export const HERO_VIDEO_DEFAULT = HERO_VIDEO_DEFAULT_SOURCES.mp4;
export const HERO_VIDEO_POINTCLOUD = HERO_VIDEO_POINTCLOUD_SOURCES.mp4;
export const HERO_VIDEO_INDOOR = HERO_VIDEO_INDOOR_SOURCES.mp4;
