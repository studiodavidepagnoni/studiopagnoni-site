import Link from "next/link";
import { fontNav } from "@/lib/fonts";
import { layoutContentMaxClass, layoutGutterXClass, navItems, site } from "@/lib/config/site";
import { withBasePath } from "@/lib/utils/basePath";

const navLinkClass = `${fontNav.className} site-nav-link site-nav-link--header inline-flex items-center px-3 py-1 text-[16px] font-bold uppercase leading-[28px] tracking-normal text-[var(--header-nav-text)]`;

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
        <div className={`flex min-h-[72px] items-center justify-between gap-3 py-2 sm:min-h-[84px] md:min-h-[96px] ${layoutContentMaxClass}`}>
          <Link
            href="/"
            className="group flex min-w-0 max-w-[min(100%,25.3rem)] shrink items-center sm:max-w-[29.9rem] md:max-w-[34.5rem]"
            aria-label={`${site.name} — home`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${withBasePath("/logo-lockup.svg")}?v=22`}
              alt=""
              width={1485}
              height={300}
              decoding="async"
              className="site-brand-lockup-img h-[3.91rem] w-auto max-w-full object-contain object-left sm:h-[4.6rem] md:h-[5.06rem]"
              aria-hidden
            />
          </Link>

          <nav
            className="site-header-nav hidden h-[3.91rem] shrink-0 items-center sm:h-[4.6rem] md:flex md:h-[5.06rem]"
            aria-label="Menu principale"
          >
            <ul className="site-header-nav__list flex h-full flex-wrap items-center justify-end gap-y-2">
              {navItems.map((item, index) => (
                <li key={item.href} className="flex h-full items-center">
                  <Link href={item.href} className={`${navLinkClass}${index === navItems.length - 1 ? " site-nav-link--last" : ""}`}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className="flex min-h-[48px] min-w-[48px] shrink-0 touch-manipulation flex-col items-center justify-center gap-1.5 rounded-md border border-white/22 bg-white/[0.06] md:hidden"
            aria-hidden
          >
            <span className="block h-0.5 w-6 bg-[var(--header-text)]" />
            <span className="block h-0.5 w-6 bg-[var(--header-text)]" />
            <span className="block h-0.5 w-6 bg-[var(--header-text)]" />
          </div>
        </div>
      </div>
    </header>
  );
}
