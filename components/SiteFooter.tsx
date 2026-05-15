import Link from "next/link";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { layoutContentMaxClass, layoutGutterXClass, site } from "@/lib/site";
import { ui } from "@/lib/ui";

const linkClass = `${fontSans.className} block text-sm text-[var(--footer-muted)] transition-colors hover:text-[var(--footer-link-hover)]`;

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-[var(--footer-edge)] bg-[var(--footer-bg)] text-[var(--footer-text)]">
      <div className={`${layoutGutterXClass} py-12 sm:py-16`}>
        <div className={layoutContentMaxClass}>
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <div className="group flex items-start gap-3 sm:gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element -- SVG marchio */}
                <img
                  src="/logo-mark.svg?v=15"
                  alt=""
                  width={616}
                  height={616}
                  className="h-12 w-12 shrink-0 object-contain opacity-100 brightness-[2.55] saturate-[1.22] contrast-[1.08] drop-shadow-[0_0_14px_color-mix(in_srgb,var(--header-accent)_38%,transparent)] transition-[filter] duration-200 group-hover:brightness-[2.85] group-hover:saturate-[1.28] group-hover:drop-shadow-[0_0_18px_color-mix(in_srgb,var(--header-accent)_48%,transparent)] sm:h-14 sm:w-14"
                  aria-hidden
                />
                <div className="min-w-0">
                  <p
                    className={`${fontDisplay.className} text-3xl font-medium tracking-tight text-[var(--footer-link-hover)] transition-[filter] duration-200 group-hover:brightness-110 group-hover:saturate-110 group-hover:drop-shadow-[0_0_14px_color-mix(in_srgb,var(--header-accent)_38%,transparent)] group-hover:contrast-105 sm:text-4xl`}
                  >
                    {site.name}
                  </p>
                  <p className={`${fontSans.className} mt-3 max-w-xl text-sm leading-relaxed text-[var(--footer-muted)] sm:text-[0.97rem]`}>
                    {site.tagline}
                  </p>
                </div>
              </div>

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
                <h3 className={`${fontSans.className} mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--footer-faint)]`}>
                  Navigazione
                </h3>
                <ul className="space-y-2.5">
                  <li>
                    <Link className={linkClass} href="/chi-siamo">
                      Chi siamo
                    </Link>
                  </li>
                  <li>
                    <Link className={linkClass} href="/servizi">
                      Servizi
                    </Link>
                  </li>
                  <li>
                    <Link className={linkClass} href="/topografia">
                      Topografia
                    </Link>
                  </li>
                  <li>
                    <Link className={linkClass} href="/laser-scanner-slam">
                      Laser SLAM
                    </Link>
                  </li>
                  <li>
                    <Link className={linkClass} href="/progetti">
                      Progetti
                    </Link>
                  </li>
                  <li>
                    <Link className={linkClass} href="/privacy-policy">
                      Privacy
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className={`${fontSans.className} mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--footer-faint)]`}>
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
            className={`${layoutContentMaxClass} flex flex-col items-center justify-between gap-3 py-6 text-center text-[0.7rem] uppercase tracking-[0.12em] text-[var(--footer-faint)] sm:flex-row sm:text-left`}
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
