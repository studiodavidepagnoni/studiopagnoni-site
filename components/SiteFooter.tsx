import Link from "next/link";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { layoutContentMaxClass, layoutGutterXClass, site } from "@/lib/site";
import { ui } from "@/lib/ui";

const feedLink = `${fontSans.className} block text-sm text-[var(--footer-muted)] transition hover:text-[var(--footer-highlight)]`;

export function SiteFooter() {
  return (
    <footer className="relative mt-16 overflow-hidden border-t border-[var(--footer-edge)] bg-[var(--footer-bg)] text-[var(--footer-text)]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(45,212,191,0.08),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--primary-mid)]/40 to-transparent"
        aria-hidden
      />

      <div className={`relative z-10 ${layoutGutterXClass} py-12 sm:py-16`}>
        <div className={layoutContentMaxClass}>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
            <div>
              <div className="flex items-start gap-3 sm:gap-4">
                {/* brightness-[1.75] coerente con l'header su sfondo scuro. */}
                {/* eslint-disable-next-line @next/next/no-img-element -- SVG marchio */}
                <img
                  src="/logo-mark.svg?v=15"
                  alt=""
                  width={616}
                  height={616}
                  className="h-12 w-12 shrink-0 opacity-90 brightness-[1.75] sm:h-14 sm:w-14"
                  aria-hidden
                />
                <div className="min-w-0">
                  <p className={`${fontDisplay.className} text-3xl font-medium tracking-tight text-[var(--footer-link-hover)] sm:text-4xl`}>
                    {site.name}
                  </p>
                  <p className={`${fontSans.className} mt-2 max-w-md text-sm leading-relaxed text-[var(--footer-muted)] sm:mt-3`}>{site.tagline}</p>
                </div>
              </div>
              <Link href="/contatti" className={`${fontSans.className} ${ui.btnPrimary} mt-8 inline-flex min-h-[44px] items-center justify-center`}>
                Contattaci
              </Link>
            </div>

            <div className="grid gap-10 sm:grid-cols-2">
              <div>
                <h3 className={`${fontSans.className} mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[var(--footer-faint)]`}>
                  Feed
                </h3>
                <ul className="space-y-2.5">
                  <li>
                    <Link className={feedLink} href="/progetti">
                      Progetti
                    </Link>
                  </li>
                  <li>
                    <Link className={feedLink} href="/servizi">
                      Servizi
                    </Link>
                  </li>
                  <li>
                    <Link className={feedLink} href="/chi-siamo">
                      Chi siamo
                    </Link>
                  </li>
                  <li>
                    <Link className={feedLink} href="/laser-scanner-slam">
                      Laser SLAM
                    </Link>
                  </li>
                  <li>
                    <Link className={feedLink} href="/#strumentazione">
                      Strumentazione
                    </Link>
                  </li>
                  <li>
                    <Link className={feedLink} href="/privacy-policy">
                      Privacy
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className={`${fontSans.className} mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[var(--footer-faint)]`}>
                  Contatti
                </h3>
                <p className="text-sm leading-relaxed text-[var(--footer-muted)]">{site.addressLine}</p>
                <ul className="mt-4 space-y-3 text-sm">
                  {site.phones.map((p) => (
                    <li key={p.tel}>
                      <span className="text-[var(--footer-faint)]">{p.label}</span>
                      <br />
                      <a
                        className="font-medium text-[var(--footer-link-hover)] transition hover:text-[var(--footer-highlight)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-mid)]/40"
                        href={`tel:${p.tel}`}
                      >
                        {p.display}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-4">
                  <a
                    className="break-all text-sm font-medium text-[var(--footer-highlight)] transition hover:text-[var(--footer-link-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-mid)]/40"
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

      <div className="relative z-10 border-t border-[var(--footer-edge)] bg-[var(--footer-bg-sub)]">
        <div className={layoutGutterXClass}>
          <div
            className={`${layoutContentMaxClass} flex flex-col items-center justify-between gap-3 py-6 text-center text-[0.7rem] uppercase tracking-[0.14em] text-[var(--footer-faint)] sm:flex-row sm:text-left`}
          >
            <p>
              &copy; {new Date().getFullYear()} {site.legalName}
              {site.piva ? ` · P.IVA ${site.piva}` : null}
            </p>
            <p className={`${fontSans.className} text-[var(--footer-muted)]`}>Topografia · Architettura · SLAM</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
