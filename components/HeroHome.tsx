"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { HERO_POSTER_DEFAULT, HERO_VIDEO_DEFAULT, heroSlides } from "@/lib/images";
import { ui } from "@/lib/ui";

const HERO_FIRST_SLIDE_MS = 16_000;
const HERO_OTHER_SLIDES_MS = 5_000;

export function HeroHome() {
  const [idx, setIdx] = useState(0);
  const [failedVideos, setFailedVideos] = useState<ReadonlySet<string>>(() => new Set());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const delayMs = idx === 0 ? HERO_FIRST_SLIDE_MS : HERO_OTHER_SLIDES_MS;
    const timeoutId = window.setTimeout(() => {
      setIdx((prev) => (prev + 1) % heroSlides.length);
    }, delayMs);
    return () => window.clearTimeout(timeoutId);
  }, [idx]);

  const slide = heroSlides[idx];
  const videoSrc = slide.video ?? HERO_VIDEO_DEFAULT;
  const posterSrc = slide.poster ?? HERO_POSTER_DEFAULT;
  const showVideo = !isMobile && !failedVideos.has(videoSrc);
  const line2Parts = slide.line2.split(" · ").map((part) => part.trim()).filter(Boolean);

  const handleVideoError = () => {
    setFailedVideos((prev) => {
      if (prev.has(videoSrc)) return prev;
      const next = new Set(prev);
      next.add(videoSrc);
      return next;
    });
  };

  return (
    <section
      className="relative isolate h-[100svh] overflow-hidden border-b border-[var(--green-border-muted)] sm:h-[96vh] md:h-[760px]"
      aria-label="Introduzione"
    >
      <div
        className="absolute inset-0 z-[-20] bg-[linear-gradient(180deg,#081512_0%,#081916_38%,#09211d_100%)]"
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-0 z-[-10]">
        {showVideo ? (
          <video
            key={videoSrc}
            className="absolute inset-0 h-full w-full object-cover opacity-[0.68] brightness-[1.04] saturate-[1.02]"
            src={videoSrc}
            poster={posterSrc}
            muted
            playsInline
            autoPlay
            loop
            preload="metadata"
            onError={handleVideoError}
            aria-hidden
          />
        ) : (
          <Image
            src={slide.src}
            alt=""
            fill
            className="object-cover brightness-[0.94] saturate-[0.94]"
            sizes="100vw"
            priority
            fetchPriority="high"
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,10,9,0.56)_0%,rgba(4,10,9,0.38)_42%,rgba(4,10,9,0.18)_100%)]" aria-hidden />
      </div>

      <div className="relative z-20 mx-auto flex h-full max-w-[1200px] flex-col justify-center px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28 md:pb-24 md:pt-32">
        <div className="max-w-[min(100%,43rem)] text-left">
          <p
            className={`${fontSans.className} mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[var(--header-text-muted)] sm:text-[0.74rem]`}
          >
            Dal 1988 · Cazzago San Martino, Brescia
          </p>

          <div className="min-h-[2.35em] sm:min-h-[2.2em]">
            <h1
              className={`${fontDisplay.className} section-title text-[clamp(2.25rem,5.1vw,4.4rem)] font-medium leading-[1.02] text-[#f6f4ef]`}
            >
              <span key={idx} className="block">
                {slide.line1}
              </span>
            </h1>
          </div>

          <div className="mt-4 min-h-[2.2em] sm:min-h-[2.05em] md:min-h-0">
            <p
              className={`${fontDisplay.className} text-[clamp(1.32rem,3.1vw,2.1rem)] font-medium leading-[1.08] text-white/66 md:whitespace-nowrap`}
            >
              {line2Parts.map((part, i) => (
                <span key={`${part}-${i}`}>
                  <span className="whitespace-nowrap">{part}</span>
                  {i < line2Parts.length - 1 ? <span className="mx-2 text-white/28">·</span> : null}
                </span>
              ))}
            </p>
          </div>

          <div className="mt-6 h-px max-w-[5.5rem] bg-[color-mix(in_srgb,var(--header-text-muted)_45%,transparent)]" aria-hidden />

          <div className="mt-6 min-h-[5.4em] sm:min-h-[4.9em] md:min-h-[5.2rem]">
            <p className="reading-measure-tight text-[0.98rem] leading-[1.8] text-white/84 sm:text-[1.04rem] md:text-[1.1rem]">
              {slide.body}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link href="/contatti" className={ui.btnHeroPrimary}>
              Richiedi un sopralluogo
            </Link>
            <Link href={slide.ctaHref} className={ui.btnHeroGhost}>
              {slide.ctaLabel}
            </Link>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-2" aria-label="Seleziona slide hero">
            {heroSlides.map((heroSlide, i) => {
              const isActive = i === idx;
              return (
                <button
                  key={heroSlide.ctaHref}
                  type="button"
                  onClick={() => setIdx(i)}
                  aria-pressed={isActive}
                  aria-label={`Vai alla slide ${i + 1}: ${heroSlide.line1}`}
                  className={`flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded-full transition-colors motion-reduce:transition-none ${
                    isActive ? "text-[var(--foreground)]" : "text-white/28 hover:text-white/48"
                  }`}
                >
                  <span
                    className={`block h-[3px] rounded-full transition-all duration-300 motion-reduce:transition-none ${
                      isActive ? "w-8 bg-current" : "w-2 bg-current"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
