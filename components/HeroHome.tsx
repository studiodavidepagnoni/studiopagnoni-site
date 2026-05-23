"use client";

import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { heroMotionVariants } from "@/lib/heroMotion";
import { heroSlides } from "@/lib/images";
import {
  HERO_MOBILE_MEDIA_QUERY,
  HERO_VIDEO_MEDIA_QUERY,
  useMediaQuery,
  usePageVisible,
  usePrefersReducedMotion,
  usePrefersSaveData,
} from "@/lib/useClientMedia";
import {
  HERO_VIDEO_DEFAULT_SOURCES,
  heroVideoSourceOrder,
  type HeroVideoFormat,
  type HeroVideoSources,
} from "@/lib/heroVideos";
import { ui } from "@/lib/ui";

const DEFAULT_VIDEO = HERO_VIDEO_DEFAULT_SOURCES;

function videoKey(sources: HeroVideoSources) {
  return sources.mp4;
}

/** Prima slide: più tempo per lettura + video RS10. */
const HERO_FIRST_SLIDE_MS = 24_000;
const HERO_FIRST_SLIDE_NO_VIDEO_MS = 18_000;
/** Slide con video: proseguono da dove erano (non remount). */
const HERO_VIDEO_SLIDE_MS = 20_000;
const HERO_IMAGE_SLIDE_MS = 14_000;

function slideDurationMs(
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

function nextSlideIndex(current: number) {
  return (current + 1) % heroSlides.length;
}

function HeroVideoSourcesMarkup({
  sources,
  order,
}: {
  sources: HeroVideoSources;
  order: HeroVideoFormat[];
}) {
  return (
    <>
      {order.map((format) =>
        format === "webm" ? (
          <source key="webm" src={sources.webm} type="video/webm" />
        ) : (
          <source key="mp4" src={sources.mp4} type="video/mp4" />
        ),
      )}
    </>
  );
}

export function HeroHome() {
  const [idx, setIdx] = useState(0);
  const [failedVideos, setFailedVideos] = useState<ReadonlySet<string>>(() => new Set());
  const isMobile = useMediaQuery(HERO_MOBILE_MEDIA_QUERY, false);
  const heroUsesVideo = useMediaQuery(HERO_VIDEO_MEDIA_QUERY, false);
  const saveData = usePrefersSaveData();
  const pageVisible = usePageVisible();
  const [prefetchNextVideo, setPrefetchNextVideo] = useState(false);
  const [videoReady, setVideoReady] = useState<ReadonlySet<string>>(() => new Set());
  const [introKenburnDone, setIntroKenburnDone] = useState(false);
  const [autoPaused, setAutoPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const autoAdvance = !reducedMotion && !autoPaused;
  const motionVariants = heroMotionVariants(!!reducedMotion);
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());

  const markVideoReady = useCallback((key: string) => {
    setVideoReady((prev) => {
      if (prev.has(key)) return prev;
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  }, []);

  const registerVideo = useCallback(
    (key: string) => (el: HTMLVideoElement | null) => {
      if (el) {
        videoRefs.current.set(key, el);
        if (el.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) markVideoReady(key);
      } else {
        videoRefs.current.delete(key);
      }
    },
    [markVideoReady],
  );

  const showVideoBackground = heroUsesVideo && !saveData && !reducedMotion;
  const tabHidden = !pageVisible;

  /** Scarica la slide successiva solo negli ultimi secondi (risparmio ~20 MB al first paint). */
  useEffect(() => {
    setPrefetchNextVideo(false);
    if (!showVideoBackground) return;
    const totalMs = slideDurationMs(idx, showVideoBackground, failedVideos);
    const leadMs = Math.min(6000, Math.max(3500, Math.floor(totalMs * 0.22)));
    const delayMs = Math.max(0, totalMs - leadMs);
    const id = window.setTimeout(() => setPrefetchNextVideo(true), delayMs);
    return () => window.clearTimeout(id);
  }, [idx, showVideoBackground, failedVideos]);

  /** Ken Burns intro: durata prima slide (solo desktop, no PRM). */
  useEffect(() => {
    if (reducedMotion || isMobile || introKenburnDone) return;
    const id = window.setTimeout(() => setIntroKenburnDone(true), HERO_FIRST_SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [reducedMotion, isMobile, introKenburnDone]);

  useEffect(() => {
    if (!autoAdvance) return;
    const delayMs = slideDurationMs(idx, showVideoBackground, failedVideos);
    const timeoutId = window.setTimeout(() => {
      setIdx((prev) => (prev + 1) % heroSlides.length);
    }, delayMs);
    return () => window.clearTimeout(timeoutId);
  }, [idx, showVideoBackground, failedVideos, autoAdvance]);

  /** Play solo la slide attiva; pausa con tab in background. */
  useEffect(() => {
    if (!showVideoBackground || tabHidden) {
      videoRefs.current.forEach((video) => video.pause());
      return;
    }

    heroSlides.forEach((slide, slideIndex) => {
      const sources = slide.video ?? DEFAULT_VIDEO;
      const key = videoKey(sources);
      if (failedVideos.has(key)) return;
      const video = videoRefs.current.get(key);
      if (!video) return;

      if (slideIndex === idx) {
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [idx, showVideoBackground, failedVideos, tabHidden]);

  const slide = heroSlides[idx];
  const line2Parts = slide.line2.split(" · ").map((part) => part.trim()).filter(Boolean);
  const primaryHref = slide.primaryCtaHref ?? "/contatti";
  const primaryLabel = slide.primaryCtaLabel ?? "Richiedi un sopralluogo";
  const nextIdx = nextSlideIndex(idx);

  const goToSlide = (index: number) => {
    setAutoPaused(true);
    setIdx(((index % heroSlides.length) + heroSlides.length) % heroSlides.length);
  };

  const handleVideoError = (src: string) => {
    setFailedVideos((prev) => {
      if (prev.has(src)) return prev;
      const next = new Set(prev);
      next.add(src);
      return next;
    });
  };

  const ChevronIcon = ({ direction }: { direction: "left" | "right" }) => (
    <svg className="h-8 w-8 sm:h-9 sm:w-9" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={direction === "left" ? "M14 6L8 12l6 6" : "M10 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <section
      className="relative isolate h-[100dvh] min-h-[100svh] max-w-full overflow-x-hidden overflow-y-hidden border-b border-[var(--green-border-muted)]"
      aria-label="Introduzione"
    >
      <div
        className="absolute inset-0 z-[-20] bg-[linear-gradient(180deg,var(--hero-fallback-from)_0%,var(--hero-fallback-via)_38%,var(--hero-fallback-to)_100%)]"
        aria-hidden
      />

      <div
        className={[
          "hero-media__stage pointer-events-none absolute inset-0 z-[-10] overflow-hidden",
          idx === 0 && "hero-media__stage--intro",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {heroSlides.map((slideItem, slideIndex) => {
          const sources = slideItem.video ?? DEFAULT_VIDEO;
          const key = videoKey(sources);
          const posterSrc = slideItem.poster ?? DEFAULT_VIDEO.mp4.replace(/\.mp4$/i, "-poster.webp");
          const videoFailed = failedVideos.has(key);
          const isActive = slideIndex === idx;
          const isNext = slideIndex === nextIdx;
          const mountLayer = isActive || (isNext && (!showVideoBackground || prefetchNextVideo));
          if (!mountLayer) return null;
          const showVideo = showVideoBackground && !videoFailed;
          const sourceOrder = heroVideoSourceOrder(sources.mp4);
          const loadSources = isActive || (isNext && prefetchNextVideo);
          const isIntroSlide = slideIndex === 0;
          const layerClass = [
            "hero-media__layer",
            isActive && "hero-media__layer--active",
            isIntroSlide && "hero-media__layer--intro",
            isIntroSlide && introKenburnDone && "hero-media__layer--intro-done",
            isIntroSlide && isActive && !introKenburnDone && !reducedMotion && "hero-media__layer--intro-enter",
          ]
            .filter(Boolean)
            .join(" ");

          const media = showVideo ? (
                <video
                  ref={registerVideo(key)}
                  className={[
                    "hero-media__video absolute inset-0 h-full w-full",
                    videoReady.has(key) && "hero-media__video--ready",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  style={
                    slideItem.videoObjectPosition
                      ? { objectPosition: slideItem.videoObjectPosition }
                      : undefined
                  }
                  poster={posterSrc}
                  muted
                  playsInline
                  loop
                  preload={isActive ? "metadata" : "none"}
                  onCanPlay={() => markVideoReady(key)}
                  onLoadedData={() => markVideoReady(key)}
                  onError={() => handleVideoError(key)}
                  aria-hidden
                >
                  {loadSources ? (
                    <HeroVideoSourcesMarkup sources={sources} order={sourceOrder} />
                  ) : null}
                </video>
              ) : (
                <Image
                  src={slideItem.src}
                  alt=""
                  fill
                  className="hero-media__image object-cover"
                  sizes="100vw"
                  priority={slideIndex === 0}
                  fetchPriority={slideIndex === 0 ? "high" : undefined}
                  loading={slideIndex === 0 ? undefined : "lazy"}
                />
          );

          return (
            <div key={slideIndex} className={layerClass} aria-hidden={!isActive}>
              {isIntroSlide && !reducedMotion ? (
                <div className="hero-media__kenburns">{media}</div>
              ) : (
                media
              )}
            </div>
          );
        })}
        <div className="hero-media__overlay hero-media__overlay--shade" aria-hidden />
        <div className="hero-media__overlay hero-media__overlay--vignette" aria-hidden />
      </div>

      <div className="relative z-20 mx-auto flex h-full w-full min-w-0 max-w-[1200px] flex-col justify-center px-4 pb-[max(4rem,env(safe-area-inset-bottom))] pt-[max(6.25rem,calc(env(safe-area-inset-top)+4.75rem))] sm:px-6 sm:pb-20 sm:pt-28 md:pb-24 md:pt-32">
        <LazyMotion features={domAnimation} strict>
        <div
          className="hero-copy w-full min-w-0 max-w-[min(100%,43rem)] text-left"
          data-hero-motion
          aria-live="polite"
          aria-atomic="true"
        >
          <p
            className={`${fontSans.className} hero-eyebrow mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.28em] sm:text-[0.74rem]`}
          >
            Dal 1988 · Cazzago San Martino, Brescia
          </p>

          <AnimatePresence mode="wait">
            <m.div
              key={idx}
              variants={motionVariants.container}
              initial={false}
              animate="show"
              exit="exit"
            >
              <div className="min-h-[2.35em] overflow-hidden sm:min-h-[2.2em]">
                <m.h1
                  variants={motionVariants.item}
                  className={`${fontDisplay.className} hero-title section-title text-[clamp(1.65rem,7.8vw,4.4rem)] font-medium leading-[1.06] max-md:text-balance`}
                >
                  {slide.line1}
                </m.h1>
              </div>

              <m.div
                variants={motionVariants.item}
                className="mt-3 min-h-0 overflow-hidden sm:mt-3.5 sm:min-h-[2.05em] md:min-h-0"
              >
                <p
                  className={`${fontDisplay.className} hero-line2 flex max-w-full flex-wrap items-baseline gap-x-2 gap-y-1 text-[clamp(1.05rem,4.6vw,2.05rem)] font-medium leading-[1.2] tracking-[0.02em] md:flex-nowrap md:gap-x-0 md:whitespace-nowrap`}
                >
                  {line2Parts.map((part, i) => (
                    <span key={`${part}-${i}`} className="inline-flex items-baseline">
                      <span className="max-md:whitespace-normal md:whitespace-nowrap">{part}</span>
                      {i < line2Parts.length - 1 ? (
                        <span className="hero-line2__sep mx-2" aria-hidden>
                          ·
                        </span>
                      ) : null}
                    </span>
                  ))}
                </p>
              </m.div>

              <m.div
                variants={motionVariants.line}
                className="hero-rule mt-6 h-px max-w-[5.5rem] origin-left"
                aria-hidden
              />

              <m.div
                variants={motionVariants.item}
                className="mt-6 min-h-[5.4em] overflow-hidden sm:min-h-[4.9em] md:min-h-[5.2rem]"
              >
                <p
                  className={`${fontSans.className} hero-body reading-measure-tight text-[0.98rem] leading-[1.8] sm:text-[1.04rem] md:text-[1.1rem]`}
                >
                  {slide.body}
                </p>
              </m.div>

              <m.div
                variants={motionVariants.item}
                className="mt-8 flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-4 md:mt-9 md:gap-4"
              >
                <Link href={primaryHref} className={ui.btnHeroPrimary}>
                  {primaryLabel}
                </Link>
                <Link href={slide.ctaHref} className={ui.btnHeroGhost}>
                  {slide.ctaLabel}
                </Link>
              </m.div>
            </m.div>
          </AnimatePresence>
        </div>
        </LazyMotion>
      </div>

      <div
        className={`${fontSans.className} absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 sm:bottom-8`}
        role="group"
        aria-label="Selezione slide"
      >
        {heroSlides.map((_, slideIndex) => (
          <button
            key={slideIndex}
            type="button"
            onClick={() => goToSlide(slideIndex)}
            className="hero-carousel-btn flex h-11 w-11 items-center justify-center rounded-full"
            aria-label={`Vai alla slide ${slideIndex + 1} di ${heroSlides.length}`}
            aria-current={slideIndex === idx ? "true" : undefined}
          >
            <span
              className={`block rounded-full transition-[width,background-color] duration-300 ${
                slideIndex === idx ? "h-2.5 w-7 bg-[var(--primary-mid)]" : "h-2.5 w-2.5 bg-white/45"
              }`}
            />
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => goToSlide(idx - 1)}
        className={`${fontSans.className} hero-carousel-btn absolute left-2 top-1/2 z-30 hidden min-h-[48px] min-w-[48px] -translate-y-1/2 cursor-pointer touch-manipulation items-center justify-center rounded-md text-white/85 transition-[color,transform] duration-300 [@media(hover:hover)]:hover:scale-110 [@media(hover:hover)]:hover:text-white motion-reduce:transition-none motion-reduce:hover:scale-100 sm:left-4 sm:flex md:left-6`}
        aria-label="Slide precedente"
      >
        <ChevronIcon direction="left" />
      </button>
      <button
        type="button"
        onClick={() => goToSlide(idx + 1)}
        className={`${fontSans.className} hero-carousel-btn absolute right-2 top-1/2 z-30 hidden min-h-[48px] min-w-[48px] -translate-y-1/2 cursor-pointer touch-manipulation items-center justify-center rounded-md text-white/85 transition-[color,transform] duration-300 [@media(hover:hover)]:hover:scale-110 [@media(hover:hover)]:hover:text-white motion-reduce:transition-none motion-reduce:hover:scale-100 sm:right-4 sm:flex md:right-6`}
        aria-label="Slide successiva"
      >
        <ChevronIcon direction="right" />
      </button>
    </section>
  );
}
