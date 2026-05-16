import Image from "next/image";
import { fontDisplay, fontSans } from "@/lib/fonts";
import type { PageHeroData } from "@/lib/pageHeroConfig";

export function PageHero({ eyebrow, title, image, alt, lede }: PageHeroData) {
  return (
    <section
      data-page-hero
      data-hero-intro
      className="page-hero relative isolate min-h-[min(72vw,380px)] w-full max-w-full overflow-x-hidden overflow-y-hidden border-b border-[var(--green-border-muted)] sm:min-h-[min(46vh,400px)]"
      aria-label={title}
    >
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover brightness-[0.92] saturate-[0.96]"
        sizes="100vw"
        priority
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,10,9,0.62)_0%,rgba(4,10,9,0.4)_45%,rgba(4,10,9,0.22)_100%),linear-gradient(0deg,rgba(4,10,9,0.55)_0%,transparent_55%)]"
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
