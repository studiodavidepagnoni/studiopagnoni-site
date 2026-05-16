import Link from "next/link";
import { SiteBrandLockup } from "@/components/SiteBrandLockup";
import { fontNav, fontSans } from "@/lib/fonts";
import { layoutContentMaxClass, layoutGutterXClass, site } from "@/lib/site";
import { ui } from "@/lib/ui";

const footerNavLinkClass = `${fontNav.className} site-footer-nav-link flex min-h-[48px] touch-manipulation items-center text-[14px] font-bold uppercase leading-[25px] tracking-normal text-[var(--header-nav-text)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--header-nav-hover)]/55 sm:min-h-0 sm:py-1`;

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--footer-edge)] bg-[var(--footer-bg)] text-[var(--footer-text)]">
      <div className={`${layoutGutterXClass} py-12 sm:py-16`}>
        <div className={layoutContentMaxClass}>
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <SiteBrandLockup
                tone="chrome"
                title={site.brandName}
                markSize="h-12 w-12 sm:h-14 sm:w-14"
                className="max-w-full"
              />

              <p className={`${fontSans.className} mt-6 max-w-[56ch] text-sm leading-relaxed text-[var(--footer-muted)] sm:text-[0.97rem]`}>
                Studio tecnico attivo tra Franciacorta, provincia di Brescia e Nord Italia per topografia, laser scanner SLAM,
                progettazione e pratiche edilizie.
              </p>

              <Link href="/contatti" className={`${ui.btnFooterCta} mt-8 inline-flex min-h-[44px] items-center justify-center`}>
                Contattaci
              </Link>
            </div>

            <div className="grid gap-10 sm:grid-cols-2">
              <div>
                <nav aria-label="Link del sito">
                <ul className="space-y-0.5">
                  <li>
                    <Link className={footerNavLinkClass} href="/chi-siamo">
                      Chi siamo
                    </Link>
                  </li>
                  <li>
                    <Link className={footerNavLinkClass} href="/servizi">
                      Servizi
                    </Link>
                  </li>
                  <li>
                    <Link className={footerNavLinkClass} href="/topografia">
                      Topografia
                    </Link>
                  </li>
                  <li>
                    <Link className={footerNavLinkClass} href="/laser-scanner-slam">
                      Laser SLAM
                    </Link>
                  </li>
                  <li>
                    <Link className={footerNavLinkClass} href="/progetti">
                      Progetti
                    </Link>
                  </li>
                  <li>
                    <Link className={footerNavLinkClass} href="/privacy-policy">
                      Privacy
                    </Link>
                  </li>
                </ul>
                </nav>
              </div>

              <div>
                <h3 className={`${fontNav.className} mb-4 text-[14px] font-bold uppercase leading-[25px] tracking-normal text-[var(--header-nav-text)]`}>
                  Contatti
                </h3>
                <p className={`${fontSans.className} text-sm leading-relaxed text-[var(--footer-muted)]`}>{site.addressLine}</p>
                <ul className="mt-4 space-y-3 text-sm">
                  {site.phones.map((phone) => (
                    <li key={phone.tel}>
                      <span className="text-[var(--footer-faint)]">{phone.label}</span>
                      <br />
                      <a
                        className="font-medium text-[var(--footer-link-hover)] transition-colors hover:text-[var(--foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-mid)]/40"
                        href={`tel:${phone.tel}`}
                      >
                        {phone.display}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-4">
                  <a
                    className="break-all text-sm font-medium text-[var(--footer-link)] transition-colors hover:text-[var(--foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-mid)]/40"
                    href={`mailto:${site.email}`}
                  >
                    {site.email}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--footer-edge)] bg-[var(--footer-bg-sub)]">
        <div className={layoutGutterXClass}>
          <div
            className={`${layoutContentMaxClass} flex flex-col items-center justify-between gap-3 py-6 text-center sm:flex-row sm:text-left`}
          >
            <p className="site-brand-tagline text-[0.7rem] uppercase tracking-[0.12em]">
              &copy; {new Date().getFullYear()} {site.legalName}
              {site.piva ? ` · P.IVA ${site.piva}` : null}
            </p>
            <p
              className={`${fontNav.className} site-brand-tagline inline-flex flex-wrap items-baseline justify-center gap-x-1.5 text-[0.55rem] font-bold uppercase leading-snug tracking-normal sm:justify-end sm:gap-x-2 sm:text-[0.6rem]`}
            >
              <span>Topografia</span>
              <span className="site-brand-tagline__sep" aria-hidden>
                ·
              </span>
              <span>Architettura</span>
              <span className="site-brand-tagline__sep" aria-hidden>
                ·
              </span>
              <span>SLAM</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
