import Image from "next/image";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { heroSlides } from "@/lib/images";
import { HERO_POSTER_INDOOR_LCP } from "@/lib/heroVideos";
import { ui } from "@/lib/ui";

const slide = heroSlides[0];

/** Skeleton LCP allineato al layout hero (riduce CLS al hydrate). */
export function HeroHomePlaceholder() {
  const line2Parts = slide.line2.split(" · ").map((p) => p.trim()).filter(Boolean);
  const primaryHref = slide.primaryCtaHref ?? "/contatti";
  const primaryLabel = slide.primaryCtaLabel ?? "Richiedi un sopralluogo";

  return (
    <section
      className="relative isolate h-[100dvh] min-h-[100svh] max-w-full overflow-hidden border-b border-[var(--green-border-muted)]"
      aria-hidden
    >
      <div className="absolute inset-0 z-0 bg-[linear-gradient(180deg,var(--hero-fallback-from)_0%,var(--hero-fallback-via)_38%,var(--hero-fallback-to)_100%)]" />
      <div className="hero-media__stage hero-media__stage--intro absolute inset-0 z-[1]">
        <Image
          src={HERO_POSTER_INDOOR_LCP}
          alt=""
          fill
          className="hero-media__image object-cover object-center"
          sizes="(max-width: 960px) 100vw, 960px"
          priority
          fetchPriority="high"
        />
        <div className="hero-media__overlay hero-media__overlay--shade absolute inset-0" aria-hidden />
        <div className="hero-media__overlay hero-media__overlay--vignette absolute inset-0" aria-hidden />
      </div>

      <div className="relative z-20 mx-auto flex h-full w-full min-w-0 max-w-[1200px] flex-col justify-center px-4 pb-[max(4rem,env(safe-area-inset-bottom))] pt-[max(6.25rem,calc(env(safe-area-inset-top)+4.75rem))] sm:px-6 sm:pb-20 sm:pt-28 md:pb-24 md:pt-32">
        <div className="hero-copy w-full min-w-0 max-w-[min(100%,43rem)] text-left">
          <p className={`${fontSans.className} hero-eyebrow mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.28em] sm:text-[0.74rem]`}>
            Dal 1988 · Cazzago San Martino, Brescia
          </p>
          <h1 className={`${fontDisplay.className} hero-title section-title text-[clamp(1.65rem,7.8vw,4.4rem)] font-medium leading-[1.06] max-md:text-balance`}>
            {slide.line1}
          </h1>
          <p
            className={`${fontDisplay.className} hero-line2 mt-3 flex max-w-full flex-wrap items-baseline gap-x-2 gap-y-1 text-[clamp(1.05rem,4.6vw,2.05rem)] font-medium leading-[1.2] tracking-[0.02em]`}
          >
            {line2Parts.map((part, i) => (
              <span key={part} className="inline-flex items-baseline">
                <span>{part}</span>
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
            <span className={`${ui.btnHeroPrimary} pointer-events-none opacity-90`}>{primaryLabel}</span>
            <span className={`${ui.btnHeroGhost} pointer-events-none opacity-90`}>{slide.ctaLabel}</span>
          </div>
          <span className="sr-only">
            {primaryHref} {slide.ctaHref}
          </span>
        </div>
      </div>
    </section>
  );
}
