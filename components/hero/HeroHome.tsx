"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { HeroMediaOverlay } from "@/components/hero/HeroMediaOverlay";
import { HeroSlideLayer } from "@/components/hero/HeroSlideLayer";
import { HeroVideoSources } from "@/components/hero/HeroVideoSources";
import { fontDisplay, fontSans } from "@/lib/fonts";
import {
  HERO_FIRST_SLIDE_MS,
  nextSlideIndex,
  slideDurationMs,
} from "@/lib/media/heroCarousel";
import { heroSlides } from "@/lib/media/images";
import {
  HERO_POSTER_DEFAULT,
  HERO_VIDEO_DEFAULT_SOURCES,
  HERO_VIDEO_MOBILE_SOURCES,
  heroVideoKey,
  heroVideoSourceOrder,
} from "@/lib/media/heroVideos";
import {
  HERO_MOBILE_MEDIA_QUERY,
  HERO_VIDEO_MEDIA_QUERY,
  useMediaQuery,
  usePageVisible,
  usePrefersReducedMotion,
  usePrefersSaveData,
} from "@/lib/utils/useClientMedia";
import { ui } from "@/lib/ui";

const DEFAULT_VIDEO = HERO_VIDEO_DEFAULT_SOURCES;
const MOBILE_VIDEO = HERO_VIDEO_MOBILE_SOURCES;
const MOBILE_POSTER = HERO_POSTER_DEFAULT;
const MOBILE_SLIDE = heroSlides[2];
/** Clip mobile già tagliata da t=2s in encode; nessun seek iniziale. */
const MOBILE_VIDEO_START_S = 0;

export function HeroHome() {
  const [idx, setIdx] = useState(0);
  const [failedVideos, setFailedVideos] = useState<ReadonlySet<string>>(() => new Set());
  const isMobile = useMediaQuery(HERO_MOBILE_MEDIA_QUERY, false);
  const heroUsesVideo = useMediaQuery(HERO_VIDEO_MEDIA_QUERY, false);
  const saveData = usePrefersSaveData();
  const pageVisible = usePageVisible();
  const [prefetchNextVideo, setPrefetchNextVideo] = useState(false);
  const [introKenburnDone, setIntroKenburnDone] = useState(false);
  const [autoPaused, setAutoPaused] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [videoUnlocked, setVideoUnlocked] = useState(false);
  const [heroInView, setHeroInView] = useState(true);
  const reducedMotion = usePrefersReducedMotion();
  const autoAdvance = !reducedMotion && !autoPaused && heroInView && pageVisible;
  const heroRootRef = useRef<HTMLElement | null>(null);
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null);
  const [mobileVideoReady, setMobileVideoReady] = useState(false);

  const registerVideo = useCallback(
    (key: string) => (el: HTMLVideoElement | null) => {
      if (el) {
        videoRefs.current.set(key, el);
      } else {
        videoRefs.current.delete(key);
      }
    },
    [],
  );

  const canUseDesktopVideo = heroUsesVideo && !saveData && !reducedMotion;
  const canUseMobileVideo = isMobile && !saveData && !reducedMotion;
  const showVideoBackground = canUseDesktopVideo && videoUnlocked;
  const mediaPaused = !pageVisible || !heroInView;
  const isIntroActive = idx === 0;

  useEffect(() => {
    if (!(canUseDesktopVideo || canUseMobileVideo) || videoUnlocked) return;

    const unlock = () => setVideoUnlocked(true);
    const root = heroRootRef.current;

    const autoId = window.requestAnimationFrame(unlock);

    root?.addEventListener("pointerdown", unlock, { once: true, passive: true });
    root?.addEventListener("keydown", unlock, { once: true });
    const onScroll = () => {
      if (window.scrollY > 48) unlock();
    };
    window.addEventListener("scroll", onScroll, { once: true, passive: true });

    return () => {
      window.cancelAnimationFrame(autoId);
      root?.removeEventListener("pointerdown", unlock);
      root?.removeEventListener("keydown", unlock);
      window.removeEventListener("scroll", onScroll);
    };
  }, [canUseDesktopVideo, canUseMobileVideo, videoUnlocked]);

  useEffect(() => {
    const root = heroRootRef.current;
    if (!root || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHeroInView(entry.isIntersecting),
      { threshold: 0.12 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setPrefetchNextVideo(false);
    if (!showVideoBackground || !heroInView) return;
    const totalMs = slideDurationMs(idx, showVideoBackground, failedVideos);
    const leadMs = 1800;
    const delayMs = Math.max(0, totalMs - leadMs);
    const id = window.setTimeout(() => setPrefetchNextVideo(true), delayMs);
    return () => window.clearTimeout(id);
  }, [idx, showVideoBackground, failedVideos, heroInView]);

  useEffect(() => {
    if (reducedMotion || isMobile || introKenburnDone) return;
    const id = window.setTimeout(() => setIntroKenburnDone(true), HERO_FIRST_SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [reducedMotion, isMobile, introKenburnDone]);

  useEffect(() => {
    if (isMobile) return;
    if (!autoAdvance) return;
    const delayMs = slideDurationMs(idx, showVideoBackground, failedVideos);
    const timeoutId = window.setTimeout(() => {
      setIdx((prev) => (prev + 1) % heroSlides.length);
    }, delayMs);
    return () => window.clearTimeout(timeoutId);
  }, [idx, showVideoBackground, failedVideos, autoAdvance, isMobile]);

  useEffect(() => {
    if (isMobile) return;
    if (!showVideoBackground || mediaPaused) {
      videoRefs.current.forEach((video) => video.pause());
      return;
    }

    heroSlides.forEach((slide, slideIndex) => {
      const sources = slide.video ?? DEFAULT_VIDEO;
      const key = heroVideoKey(sources);
      if (failedVideos.has(key)) return;
      const video = videoRefs.current.get(key);
      if (!video) return;

      if (slideIndex === idx) {
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [idx, showVideoBackground, failedVideos, mediaPaused, isMobile]);

  useEffect(() => {
    if (!isMobile || !canUseMobileVideo || !videoUnlocked) return;
    const video = mobileVideoRef.current;
    if (!video) return;

    const seekToStart = () => {
      if (video.currentTime < MOBILE_VIDEO_START_S) {
        try {
          video.currentTime = MOBILE_VIDEO_START_S;
        } catch {
          /* ignore seek errors before ready */
        }
      }
    };

    const onLoaded = () => {
      seekToStart();
      setMobileVideoReady(true);
    };

    const onEnded = () => {
      try {
        video.currentTime = MOBILE_VIDEO_START_S;
      } catch {
        /* ignore */
      }
      void video.play().catch(() => {});
    };

    video.addEventListener("loadedmetadata", onLoaded);
    video.addEventListener("ended", onEnded);
    if (video.readyState >= 1) onLoaded();

    if (mediaPaused || !heroInView) {
      video.pause();
    } else {
      seekToStart();
      void video.play().catch(() => {});
    }

    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("ended", onEnded);
    };
  }, [isMobile, canUseMobileVideo, videoUnlocked, mediaPaused, heroInView]);

  const slide = isMobile ? MOBILE_SLIDE : heroSlides[idx];
  const line2Parts = slide.line2.split(" · ").map((part) => part.trim()).filter(Boolean);
  const primaryHref = slide.primaryCtaHref ?? "/contatti";
  const primaryLabel = slide.primaryCtaLabel ?? "Richiedi un sopralluogo";
  const primaryLabelMobile = slide.primaryCtaLabelMobile ?? primaryLabel;
  const nextIdx = nextSlideIndex(idx);

  const goToSlide = (index: number) => {
    setUserInteracted(true);
    setVideoUnlocked(true);
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

  const mobileVideoKey = heroVideoKey(MOBILE_VIDEO);
  const mobileVideoFailed = failedVideos.has(mobileVideoKey);
  const showMobileVideo = canUseMobileVideo && videoUnlocked && !mobileVideoFailed;
  const mobileSourceOrder = heroVideoSourceOrder(MOBILE_VIDEO.mp4);

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

  if (isMobile) {
    return (
      <section
        ref={heroRootRef}
        className="hero-mobile relative isolate h-[100dvh] min-h-[100svh] max-w-full overflow-hidden border-b border-[var(--green-border-muted)]"
        aria-label="Introduzione"
      >
        <div
          className="absolute inset-0 z-[-20] bg-[linear-gradient(180deg,var(--hero-fallback-from)_0%,var(--hero-fallback-via)_38%,var(--hero-fallback-to)_100%)]"
          aria-hidden
        />

        <div className="hero-media__stage pointer-events-none absolute inset-0 z-[-10] overflow-hidden">
          {showMobileVideo ? (
            <video
              ref={mobileVideoRef}
              className={`hero-media__video hero-mobile__video absolute inset-0 h-full w-full ${mobileVideoReady ? "hero-media__video--ready" : ""}`}
              poster={MOBILE_POSTER}
              muted
              playsInline
              preload="metadata"
              onError={() => handleVideoError(mobileVideoKey)}
              aria-hidden
            >
              <HeroVideoSources sources={MOBILE_VIDEO} order={mobileSourceOrder} />
            </video>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={MOBILE_POSTER}
              alt=""
              className="hero-media__image absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: "center 35%" }}
              decoding="async"
              loading="eager"
            />
          )}
          <HeroMediaOverlay intro={false} />
          <div className="hero-mobile__vignette" aria-hidden />
        </div>

        <div className="relative z-20 mx-auto flex h-full w-full min-w-0 flex-col justify-end px-6 pb-[max(6rem,calc(env(safe-area-inset-bottom)+4.5rem))] pt-[max(6.25rem,calc(env(safe-area-inset-top)+4.75rem))]">
          <div className="hero-copy w-full min-w-0 text-left" data-hero-motion>
            <div className="hero-copy__slide">
              <h1
                className={`${fontDisplay.className} hero-title hero-mobile__title font-medium`}
              >
                Architettura
                <br />
                e rilievi
                <br />
                <span className="hero-mobile__title-accent">in Franciacorta</span>
              </h1>

              <div className="hero-mobile__rule mt-5" aria-hidden />

              <p className={`${fontSans.className} hero-mobile__subtitle mt-5`}>
                Topografia · laser scanner SLAM · progettazione
              </p>

              <div className="mt-8 flex w-full flex-col gap-3">
                <Link href="/contatti?oggetto=slam#form-contatti" className={ui.btnHeroPrimary}>
                  Richiedi preventivo
                </Link>
                <Link href="/laser-scanner-slam" className={`${ui.btnHeroGhost} hero-mobile__ghost-cta`}>
                  Scopri il servizio SLAM
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-mobile__scroll-hint" aria-hidden>
          <div className="hero-mobile__scroll-line" />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={heroRootRef}
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
          isIntroActive && "hero-media__stage--intro",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {heroSlides.map((slideItem, slideIndex) => {
          const sources = slideItem.video ?? DEFAULT_VIDEO;
          const key = heroVideoKey(sources);
          const isActive = slideIndex === idx;
          const isNext = slideIndex === nextIdx;
          const mountLayer = isActive || (isNext && (!showVideoBackground || prefetchNextVideo));
          if (!mountLayer) return null;

          return (
            <HeroSlideLayer
              key={slideIndex}
              slide={slideItem}
              slideIndex={slideIndex}
              isActive={isActive}
              showVideo={showVideoBackground && !failedVideos.has(key)}
              loadSources={isActive || (isNext && prefetchNextVideo)}
              introKenburnDone={introKenburnDone}
              reducedMotion={reducedMotion}
              registerVideo={registerVideo}
              onVideoError={handleVideoError}
            />
          );
        })}
        <HeroMediaOverlay intro={isIntroActive} />
      </div>

      <div className="relative z-20 mx-auto flex h-full w-full min-w-0 max-w-[1200px] flex-col justify-center px-4 pb-[max(4rem,env(safe-area-inset-bottom))] pt-[max(6.25rem,calc(env(safe-area-inset-top)+4.75rem))] sm:px-6 sm:pb-20 sm:pt-28 md:pb-24 md:pt-32">
        <div
          className="hero-copy w-full min-w-0 max-w-[min(100%,43rem)] text-left"
          data-hero-motion
          aria-live={userInteracted ? "polite" : "off"}
          aria-atomic="true"
        >
          <div key={idx} className="hero-copy__slide">
            <div className="min-h-[2.35em] overflow-hidden sm:min-h-[2.2em]">
              <h1
                className={`${fontDisplay.className} hero-title section-title text-[clamp(1.65rem,7.8vw,4.4rem)] font-medium leading-[1.06] max-md:text-balance`}
              >
                {slide.line1}
              </h1>
            </div>

            <div className="mt-3 min-h-0 overflow-hidden sm:mt-3.5 sm:min-h-[2.05em] md:min-h-0">
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
            </div>

            <div className="hero-rule hero-rule--copy mt-6 h-px max-w-[5.5rem] origin-left" aria-hidden />

            <div className="mt-6 min-h-[5.4em] overflow-hidden sm:min-h-[4.9em] md:min-h-[5.2rem]">
              <p
                className={`${fontSans.className} hero-body reading-measure-tight text-[0.98rem] leading-[1.8] sm:text-[1.04rem] md:text-[1.1rem]`}
              >
                {slide.body}
              </p>
            </div>

            <div className="mt-8 flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-4 md:mt-9 md:gap-4">
              <Link href={primaryHref} className={ui.btnHeroPrimary}>
                <span className="sm:hidden">{primaryLabelMobile}</span>
                <span className="hidden sm:inline">{primaryLabel}</span>
              </Link>
              <Link href={slide.ctaHref} className={ui.btnHeroGhost}>
                {slide.ctaLabel}
              </Link>
            </div>
          </div>
        </div>
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
