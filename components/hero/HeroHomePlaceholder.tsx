import Link from "next/link";
import { HeroIntroStillPicture } from "@/components/hero/HeroIntroStillPicture";
import { HeroMediaOverlay } from "@/components/hero/HeroMediaOverlay";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { heroSlides } from "@/lib/media/images";
import {
  HERO_POSTER_DEFAULT_LCP,
  HERO_POSTER_DEFAULT_LCP_AVIF,
} from "@/lib/media/heroVideos";
import { ui } from "@/lib/ui";

const slide = heroSlides[0];

/** Skeleton LCP allineato al layout hero (riduce CLS al hydrate). */
export function HeroHomePlaceholder() {
  const line2Parts = slide.line2.split(" · ").map((p) => p.trim()).filter(Boolean);
  const primaryHref = slide.primaryCtaHref ?? "/contatti";
  const primaryLabel = slide.primaryCtaLabel ?? "Richiedi un sopralluogo";
  const primaryLabelMobile = slide.primaryCtaLabelMobile ?? primaryLabel;

  return (
    <section
      className="relative isolate h-[100dvh] min-h-[100svh] max-w-full overflow-hidden border-b border-[var(--green-border-muted)]"
      aria-label="Introduzione"
    >
      <div className="absolute inset-0 z-0 bg-[linear-gradient(180deg,var(--hero-fallback-from)_0%,var(--hero-fallback-via)_38%,var(--hero-fallback-to)_100%)]" />

      {/* Mobile: poster LCP del 3° video (SLAM RS10) */}
      <div className="hero-media__stage absolute inset-0 z-[1] min-[1025px]:hidden">
        <picture className="hero-media__image absolute inset-0 h-full w-full">
          <source srcSet={HERO_POSTER_DEFAULT_LCP_AVIF} type="image/avif" />
          <source srcSet={HERO_POSTER_DEFAULT_LCP} type="image/webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_POSTER_DEFAULT_LCP}
            alt=""
            width={640}
            height={360}
            className="h-full w-full object-cover"
            style={{ objectPosition: "center 35%" }}
            decoding="sync"
            fetchPriority="high"
            sizes="100vw"
          />
        </picture>
        <HeroMediaOverlay intro={false} />
        <div className="hero-mobile__vignette" aria-hidden />
      </div>

      {/* Desktop: poster intro originale */}
      <div className="hero-media__stage hero-media__stage--intro absolute inset-0 z-[1] max-[1024px]:hidden">
        <HeroIntroStillPicture />
        <HeroMediaOverlay intro />
      </div>

      {/* Mobile: copy compatto (bottom-aligned) */}
      <div className="relative z-20 mx-auto flex h-full w-full min-w-0 flex-col justify-end px-6 pb-[max(6rem,calc(env(safe-area-inset-bottom)+4.5rem))] pt-[max(6.25rem,calc(env(safe-area-inset-top)+4.75rem))] min-[1025px]:hidden">
        <div className="hero-copy w-full min-w-0 text-left">
          <h1 className={`${fontDisplay.className} hero-title hero-mobile__title font-medium`}>
            Rilievi 3D
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

      {/* Desktop: copy originale (center-aligned). Titolo in <p>: un solo H1 in pagina (mobile). */}
      <div className="relative z-20 mx-auto hidden h-full w-full min-w-0 max-w-[1200px] flex-col justify-center px-4 sm:px-6 sm:pb-20 sm:pt-28 md:pb-24 md:pt-32 min-[1025px]:flex">
        <div className="hero-copy w-full min-w-0 max-w-[min(100%,43rem)] min-[1025px]:max-w-full text-left">
          <p className={`${fontDisplay.className} hero-title section-title whitespace-pre-line text-[clamp(1.65rem,7.8vw,4.4rem)] font-medium leading-[1.06] max-md:text-balance`}>
            {slide.line1}
          </p>
          <p
            className={`${fontDisplay.className} hero-line2 mt-3 flex max-w-full flex-wrap items-baseline gap-x-2 gap-y-1 text-[clamp(1.05rem,4.6vw,2.05rem)] font-medium leading-[1.25] tracking-[0.02em] min-[1025px]:flex-nowrap min-[1025px]:gap-x-0 min-[1025px]:whitespace-nowrap min-[1025px]:text-[clamp(1.2rem,1.85vw,1.75rem)]`}
          >
            {line2Parts.map((part, i) => (
              <span key={part} className="inline-flex items-baseline min-[1025px]:shrink-0">
                <span className="min-[1025px]:whitespace-nowrap">{part}</span>
                {i < line2Parts.length - 1 ? (
                  <span className="hero-line2__sep mx-2" aria-hidden>
                    ·
                  </span>
                ) : null}
              </span>
            ))}
          </p>
          <div className="hero-rule mt-6 h-px max-w-[5.5rem]" aria-hidden />
          <p className={`${fontSans.className} hero-body reading-measure-tight mt-6 text-[0.98rem] leading-[1.8] sm:text-[1.04rem] md:text-[1.1rem]`}>
            {slide.body}
          </p>
          <div className="mt-8 flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-4 md:mt-9">
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
    </section>
  );
}
