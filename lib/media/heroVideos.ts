import { withBasePath } from "@/lib/utils/basePath";
import heroVideoManifest from "@/lib/media/heroVideoManifest.json";

export type HeroVideoSources = {
  mp4: string;
  webm: string;
};

export type HeroVideoFormat = "mp4" | "webm";

type HeroVideoManifestEntry = {
  order: HeroVideoFormat[];
  mp4Bytes: number;
  webmBytes: number;
};

export function heroVideoKey(sources: { mp4: string }) {
  return sources.mp4;
}

/** Ordine sorgenti generato da `npm run optimize:assets` (solo formati più leggeri del MP4). */
export function heroVideoSourceOrder(mp4Url: string): HeroVideoFormat[] {
  const clean = mp4Url.split("?")[0] ?? mp4Url;
  const file = clean.split("/").pop() ?? "";
  const base = file.replace(/\.mp4$/i, "");
  const entry = (heroVideoManifest as Record<string, HeroVideoManifestEntry>)[base];
  return entry?.order?.length ? entry.order : ["mp4"];
}

function heroVideoVersion(base: string) {
  const entry = (heroVideoManifest as Record<string, HeroVideoManifestEntry>)[base];
  return entry?.mp4Bytes ? String(entry.mp4Bytes) : "0";
}

function heroVideo(base: string): HeroVideoSources {
  const v = heroVideoVersion(base);
  const mp4 = withBasePath(`/assets/${base}.mp4?v=${v}`);
  const webm = withBasePath(`/assets/${base}.webm?v=${v}`);
  return { mp4, webm };
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
