import { StockCoverImage } from "@/components/media/StockCoverImage";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { stockImageSrcSet } from "@/lib/media/mediaPath";
import type { PageHeroData } from "@/lib/config/pageHeroConfig";

export function PageHero({ eyebrow, title, image, alt, lede, priorityImage = true }: PageHeroData) {
  return (
    <section
      data-page-hero
      data-hero-intro
      className="page-hero relative isolate min-h-[min(72vw,380px)] w-full max-w-full overflow-x-hidden overflow-y-hidden border-b border-[var(--green-border-muted)] sm:min-h-[min(46vh,400px)]"
      aria-label={title}
    >
      <div className="absolute inset-0 z-0" aria-hidden>
        {stockImageSrcSet(image) ? (
          <StockCoverImage
            src={image}
            alt={alt}
            className="brightness-[0.94] saturate-[0.98]"
            sizes="100vw"
            loading={priorityImage ? "eager" : "lazy"}
            fetchPriority={priorityImage ? "high" : undefined}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element -- path non stock (es. progetti)
          <img
            src={image}
            alt={alt}
            className="absolute inset-0 h-full w-full object-cover brightness-[0.94] saturate-[0.98]"
            sizes="100vw"
            loading={priorityImage ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={priorityImage ? "high" : undefined}
          />
        )}
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(4,10,9,0.72)_0%,rgba(4,10,9,0.48)_42%,rgba(4,10,9,0.22)_100%),linear-gradient(0deg,rgba(4,10,9,0.58)_0%,transparent_55%)]"
        aria-hidden
      />
      <div className="relative z-10 mx-auto flex min-h-[inherit] w-full min-w-0 max-w-[1200px] flex-col justify-end px-4 pb-10 pt-[calc(env(safe-area-inset-top,0px)+5.75rem)] sm:px-6 sm:pb-12 md:pb-14">
        <div className="w-full min-w-0 max-w-[min(100%,44rem)]">
          <p className={`${fontSans.className} page-hero__kicker reveal-faint mb-3 sm:mb-4`}>{eyebrow}</p>
          <h1 className={`${fontDisplay.className} page-hero__title reveal-title`}>{title}</h1>
          {lede ? (
            <p className={`${fontSans.className} page-hero__lede reveal-block mt-4 max-w-[42ch] text-pretty sm:mt-5`}>{lede}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
