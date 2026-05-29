import Link from "next/link";
import { fontNav } from "@/lib/fonts";
import { layoutContentMaxClass, layoutGutterXClass, navItems, site } from "@/lib/config/site";
import { withBasePath } from "@/lib/utils/basePath";

const navLinkClass = `${fontNav.className} site-nav-link site-nav-link--header block px-3 py-2 text-[14px] font-bold uppercase leading-[25px] tracking-normal text-[var(--header-nav-text)]`;
const mobileNavLinkClass = `${fontNav.className} site-nav-link site-nav-link--mobile flex min-h-[48px] items-center border-b border-[var(--header-border)] py-2 text-[14px] font-bold uppercase leading-[25px] tracking-normal text-[var(--header-nav-text)] touch-manipulation`;

/** Header statico (zero JS): visibile finché non idrata SiteHeader. */
export function SiteHeaderShell() {
  return (
    <header
      id="site-header-shell"
      className="fixed inset-x-0 top-0 z-[1000] flex flex-col border-0 bg-[linear-gradient(180deg,rgba(4,10,9,0.62)_0%,rgba(4,10,9,0.2)_40%,rgba(4,10,9,0)_88%)] pt-[env(safe-area-inset-top,0px)] shadow-none"
    >
      <div
        className={`${layoutGutterXClass} max-md:ps-[max(1rem,env(safe-area-inset-left,0px))] max-md:pe-[max(1rem,env(safe-area-inset-right,0px))]`}
      >
        <div className={`flex min-h-[68px] items-center justify-between gap-3 py-2 sm:min-h-[76px] md:min-h-[80px] ${layoutContentMaxClass}`}>
          <Link href="/" className="group flex min-w-0 shrink items-center gap-x-2.5 sm:gap-x-4" aria-label={`${site.name} — home`}>
            <div className="box-border flex h-14 w-14 shrink-0 items-center justify-center sm:h-16 sm:w-16">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${withBasePath("/logo-mark.svg")}?v=15`}
                alt=""
                width={616}
                height={616}
                decoding="async"
                className="site-brand-mark h-full w-full object-contain"
                aria-hidden
              />
            </div>
            <div className="flex min-w-0 flex-col items-start gap-y-1.5 sm:gap-y-2">
              <span
                className={`${fontNav.className} site-brand-title whitespace-nowrap text-[1.05rem] font-bold uppercase leading-none tracking-normal sm:text-[1.25rem] md:text-[1.45rem]`}
              >
                {site.brandName}
              </span>
              <span
                className={`${fontNav.className} site-brand-tagline flex items-baseline justify-between text-[0.55rem] font-bold uppercase leading-snug sm:text-[0.6rem] md:text-[0.65rem]`}
              >
                <span>Topografia</span>
                <span className="site-brand-tagline__sep shrink-0" aria-hidden>
                  ·
                </span>
                <span>Architettura</span>
                <span className="site-brand-tagline__sep shrink-0" aria-hidden>
                  ·
                </span>
                <span>SLAM</span>
              </span>
            </div>
          </Link>

          <nav className="site-header-nav hidden shrink-0 md:block" aria-label="Menu principale">
            <ul className="site-header-nav__list flex flex-wrap items-center justify-end gap-y-2">
              {navItems.map((item, index) => (
                <li key={item.href}>
                  <Link href={item.href} className={`${navLinkClass}${index === navItems.length - 1 ? " site-nav-link--last" : ""}`}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <details className="site-header-mobile-details relative md:hidden">
            <summary className="flex min-h-[48px] min-w-[48px] list-none cursor-pointer touch-manipulation flex-col items-center justify-center gap-1.5 rounded-md border border-white/22 bg-white/[0.06] [&::-webkit-details-marker]:hidden">
              <span className="block h-0.5 w-6 bg-[var(--header-text)]" />
              <span className="block h-0.5 w-6 bg-[var(--header-text)]" />
              <span className="block h-0.5 w-6 bg-[var(--header-text)]" />
              <span className="sr-only">Apri menu</span>
            </summary>
            <div className="absolute right-0 top-[calc(100%+0.5rem)] z-[1001] w-[min(100vw-2rem,22rem)] rounded-lg border border-[var(--header-border)] bg-[var(--header-menu-surface)] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.28)]">
              <ul className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={mobileNavLinkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
