"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { ui } from "@/lib/ui";
import { heroSlides } from "@/lib/images";

export function HeroHome() {
  const [idx, setIdx] = useState(0);
  const [videoOk, setVideoOk] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[idx];
  const showVideo = videoOk && !isMobile;
  const line2Parts = slide.line2.split(" · ").map((p) => p.trim()).filter(Boolean);

  return (
    <section
      className="relative isolate min-h-[96svh] overflow-hidden sm:min-h-[92vh] md:min-h-[620px]"
      aria-label="Introduzione"
    >
      {/* Sfondo gradiente */}
      <div
        className="absolute inset-0 z-[-20] bg-gradient-to-br from-[#042a27] via-[#0a4a44] to-[#134e40]"
        aria-hidden
      />

      {/* Media background */}
      <div className="pointer-events-none absolute inset-0 z-[-10]">
        {showVideo ? (
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-[0.38] brightness-[1.05] saturate-[1.02]"
            src="/assets/rs10-hero.mp4"
            poster="/assets/rs10-hero-poster.jpg"
            muted
            playsInline
            autoPlay
            loop
            preload="metadata"
            onError={() => setVideoOk(false)}
            aria-hidden
          />
        ) : (
          <Image
            src={heroSlides[0].src}
            alt=""
            fill
            className="object-cover brightness-[1.08] saturate-[1.04]"
            sizes="100vw"
            priority
          />
        )}
        <div
          className="absolute inset-0 z-10 bg-gradient-to-r from-black/72 via-black/35 to-black/15"
          aria-hidden
        />
        <div
          className="absolute inset-0 z-10 bg-[linear-gradient(165deg,rgba(234,88,12,0.14)_0%,transparent_42%,rgba(45,212,191,0.12)_100%)]"
          aria-hidden
        />
      </div>

      {/* Contenuto */}
      <div className="relative z-20 mx-auto flex min-h-[96svh] max-w-[1200px] flex-col justify-center gap-6 px-4 pb-14 pt-24 sm:min-h-[92vh] sm:gap-8 sm:px-6 sm:pb-16 sm:pt-28 md:min-h-[620px] md:pb-20 md:pt-32">
        <div className="max-w-[min(100%,40rem)] text-left">
          <p
            className={`${fontSans.className} mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#fbbf99] drop-shadow-[0_2px_18px_rgba(0,0,0,0.65)] sm:mb-4 sm:text-[0.72rem]`}
          >
            Bornato · Franciacorta, Brescia
          </p>

          <h1
            className={`${fontDisplay.className} section-title text-[clamp(2.1rem,5.2vw,3.85rem)] font-medium leading-[1.08] text-[#faf8f5] drop-shadow-[0_2px_24px_rgba(0,0,0,0.7)]`}
          >
            <span key={idx} className="block">
              {slide.line1}
            </span>
          </h1>

          <p
            className={`${fontDisplay.className} mt-4 text-[clamp(1.55rem,3.8vw,2.6rem)] font-medium leading-[1.08] text-white/72 drop-shadow-[0_2px_24px_rgba(0,0,0,0.65)] md:whitespace-nowrap`}
          >
            {line2Parts.map((part, i) => (
              <span key={`${part}-${i}`}>
                <span className="whitespace-nowrap">{part}</span>
                {i < line2Parts.length - 1 ? (
                  <span className="mx-2 text-white/40">·</span>
                ) : null}
              </span>
            ))}
          </p>

          <div className="home-section-rule home-section-rule--on-dark mt-5 max-w-[5rem] sm:mt-6" aria-hidden />

          <p className="copy-rhythm reading-measure-tight mt-5 text-pretty text-[0.94rem] text-white/90 drop-shadow-[0_2px_18px_rgba(0,0,0,0.7)] sm:mt-6 sm:text-[1.02rem] md:text-lg">
            {slide.body}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
            <Link href="/contatti" className={ui.btnHeroPrimary}>
              Richiedi un sopralluogo
            </Link>
            <Link href={slide.ctaHref} className={ui.btnHeroGhost}>
              {slide.ctaLabel}
            </Link>
          </div>

          {/* Indicatori slide */}
          <div className="mt-8 flex gap-2" aria-hidden>
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === idx
                    ? "w-8 bg-[#fbbf99]"
                    : "w-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
