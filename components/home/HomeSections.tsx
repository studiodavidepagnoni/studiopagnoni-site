import Link from "next/link";
import { StockCoverImage } from "@/components/media/StockCoverImage";
import { fontDisplay, fontSans } from "@/lib/fonts";
import {
  certifications,
  certificationsIntro,
  contattiIntro,
  homeChiSiamo,
  homeProgettiIntro,
  homeServiziIntro,
  homeStrumentazione,
  zoneContent,
  zoneDescription,
  zoneFooter,
} from "@/lib/content";
import { homeChiSiamoImages } from "@/lib/media/images";
import { ProjectCoverImage } from "@/components/media/ProjectCoverImage";
import { featuredProjects } from "@/lib/content/projects";
import { site } from "@/lib/config/site";
import { ui } from "@/lib/ui";
import { IconEmail, IconMapPin, IconPhone } from "@/components/icons";
import { SiteBrandMark } from "@/components/layout/SiteBrandMark";
import { HomeServiceCards } from "@/components/home/HomeServiceCards";
import { StatsSection } from "@/components/home/HomeClientBlocks";

const titleCls = `${fontDisplay.className} section-title home-section-title reveal-title`;

const processSteps = [
  {
    kicker: "Acquisizione",
    title: "SLAM in movimento",
    body: "Acquisizione continua in spazi complessi: corridoi, impianti, volumi densi.",
  },
  {
    kicker: "Controllo metrico",
    title: "GNSS e rete",
    body: "Georeferenziazione RTK e controlli planoaltimetrici con tolleranze definite.",
  },
  {
    kicker: "Consegna",
    title: "Elaborati",
    body: "Nuvola di punti, sezioni, CAD/BIM e tavole pronte per cantiere e committente.",
  },
] as const;

export function HomeSections() {
  return (
    <>
      {/* ── Chi siamo — SOTA editorial: 5/7 split, immagine unica forte, testo compatto ── */}
      <section className="lazy-section section-shell overflow-x-hidden bg-[var(--muted)] px-4 sm:px-5 md:px-10">
        <div className="mx-auto max-w-[1140px]">
          <div className="home-section-intro reveal-block">
            <p className="section-kicker">In sintesi</p>
            <h2 className={titleCls}>{homeChiSiamo.title}</h2>
            <div className="home-section-rule" aria-hidden />
          </div>

          <div className="reveal-block mt-8 grid items-stretch gap-8 sm:mt-10 sm:gap-10 lg:mt-10 lg:grid-cols-12 lg:gap-14">
            {/* ── Testo (sinistra) ── */}
            <div className="order-2 flex flex-col justify-center lg:order-1 lg:col-span-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
                <SiteBrandMark className="mx-auto shrink-0 sm:mx-0" />
                <p className="min-w-0 text-balance text-[0.97rem] leading-relaxed text-[var(--copy-body)] sm:text-[1.02rem]">
                  <span className="sr-only">Studio Tecnico Pagnoni. </span>
                  {homeChiSiamo.short}
                </p>
              </div>
              <ul className="mt-7 space-y-3 sm:mt-8" aria-label="Ambiti principali">
                {homeChiSiamo.highlights.map((h) => (
                  <li key={h.label} className="flex items-start gap-3">
                    <span
                      className="mt-[3px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-sm bg-[var(--primary)]/15 text-[var(--primary-mid)]"
                      aria-hidden
                    >
                      <svg className="h-2.5 w-2.5" viewBox="0 0 10 10" fill="currentColor">
                        <path d="M4 8.5L0.5 5 1.56 3.94l2.44 2.43 4.44-4.43L9.5 3 4 8.5z" />
                      </svg>
                    </span>
                    <span className={`${fontSans.className} text-[0.88rem] text-[var(--copy-body)] sm:text-[0.93rem]`}>
                      {h.label}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
                <Link href="/chi-siamo" className={`${ui.btnOutline} inline-flex w-full min-h-[48px] justify-center sm:w-auto`}>
                  Chi siamo
                </Link>
                <Link href="/contatti" className={`${ui.btnPrimary} inline-flex w-full min-h-[48px] justify-center sm:w-auto`}>
                  Contatti
                </Link>
              </div>
            </div>

            {/* ── Media (destra): immagine proporzionata al testo ── */}
            <div className="order-1 lg:order-2 lg:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--green-border-muted)] bg-[var(--card)] sm:aspect-[16/10] lg:aspect-[16/10]">
                <StockCoverImage
                  src={homeChiSiamoImages.team.src}
                  alt={homeChiSiamoImages.team.alt}
                  className="object-center"
                  sizes="(min-width:1024px) min(580px, 50vw), (min-width:640px) min(90vw, 720px), 100vw"
                  loading="lazy"
                />
                {/* opacity-50 sull'unify-overlay perché sul ritratto il gradient piano (12→35% nero) lo rendeva troppo cupo. */}
                <div className="image-unify-overlay image-unify-overlay--subtle" aria-hidden />
                {/* Caption badge */}
                <div className="absolute bottom-4 left-4">
                  <div className="rounded-md bg-[color-mix(in_srgb,var(--surface-chrome-deep)_72%,transparent)] px-3 py-1.5 backdrop-blur-sm">
                    <p
                      className={`${fontSans.className} text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-white`}
                    >
                      Franciacorta · Provincia di Brescia
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Servizi ── */}
      <section className="home-section-servizi lazy-section section-shell overflow-x-hidden min-w-0 bg-[var(--background)] px-4 sm:px-5 md:px-10">
        <div className="mx-auto max-w-[1140px]">
          <div className="home-section-intro reveal-block">
            <p className="section-kicker">In sintesi</p>
            <h2 className={titleCls}>Servizi</h2>
            <div className="home-section-rule" aria-hidden />
            <p className="home-section-intro__lede max-w-[52ch]">{homeServiziIntro}</p>
          </div>

          <div
            id="strumentazione"
            aria-labelledby="strumentazione-heading"
            className="surface-inverted reveal-block-solid mb-8 rounded-xl border border-[var(--green-border-muted)] p-5 sm:mb-10 sm:p-6"
          >
            {/* Stessa misura per kicker + titolo + lede (evita “colonna stretta” sotto titolo largo). */}
            <div className="max-w-[min(62ch,100%)]">
              <p className={`${fontSans.className} section-kicker`}>SLAM e geomatica</p>
              <h3
                id="strumentazione-heading"
                className={`${fontDisplay.className} mt-2 text-xl font-semibold tracking-tight text-[var(--foreground)] sm:text-2xl`}
              >
                {homeStrumentazione.title}
              </h3>
              <div
                className={`${fontSans.className} mt-4 text-[0.95rem] leading-[1.65] text-[var(--copy-body)] text-pretty sm:mt-5 sm:text-[1.02rem]`}
              >
                {homeStrumentazione.lede}
              </div>
            </div>
            <ul className="mt-6 grid list-none gap-4 sm:grid-cols-3 sm:gap-5">
              {homeStrumentazione.items.map((item) => (
                <li key={item.label} className="rounded-lg border border-[var(--green-border-muted)] bg-[var(--card)] p-4 sm:p-5">
                  <p className={`${fontSans.className} section-kicker`}>{item.label}</p>
                  <p className={`${fontSans.className} mt-2 text-sm leading-relaxed text-[var(--copy-body)]`}>{item.text}</p>
                </li>
              ))}
            </ul>
            <nav
              aria-label="Approfondimenti su strumentazione e servizi"
              className={`${fontSans.className} mt-6 border-t border-[var(--green-border-muted)] pt-5 sm:mt-7 sm:pt-6`}
            >
              <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--green-ink-muted)]">Schede servizio</p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
                <Link
                  href="/topografia"
                  className="text-[var(--primary-mid)] underline decoration-[var(--primary)]/35 underline-offset-4 hover:decoration-[var(--primary-mid)]"
                >
                  Topografia e rilievi
                </Link>
                <Link
                  href="/rilievi-laser-scanner-slam-brescia"
                  className="text-[var(--primary-mid)] underline decoration-[var(--primary)]/35 underline-offset-4 hover:decoration-[var(--primary-mid)]"
                >
                  Laser scanner SLAM
                </Link>
              </div>
            </nav>
          </div>

          <HomeServiceCards />
          <p className="mt-8 sm:mt-10">
            <Link href="/servizi" className={`${ui.btnOutline} inline-flex w-full sm:w-auto`}>
              Elenco completo dei servizi
            </Link>
          </p>
        </div>
      </section>

      {/* ── Progetti (feed) ── */}
      <section className="home-section-progetti lazy-section section-shell overflow-x-hidden min-w-0 bg-[var(--muted)] px-4 sm:px-5 md:px-10">
        <div className="mx-auto max-w-[1140px]">
          <div className="home-section-intro reveal-block">
            <p className="section-kicker">In sintesi</p>
            <h2 className={titleCls}>Progetti</h2>
            <div className="home-section-rule" aria-hidden />
            <p className="home-section-intro__lede max-w-[52ch]">{homeProgettiIntro}</p>
          </div>
          <div className="home-projects-mosaic">
            {featuredProjects.slice(0, 3).map((p, index) => (
              <Link
                key={p.href}
                href={p.href}
                className={`group block w-full min-w-0 overflow-hidden rounded-lg border border-[var(--green-border-muted)] bg-[var(--card)] ${index === 0 ? "home-projects-mosaic__lead" : "home-projects-mosaic__item"}`}
              >
                <div className="home-projects-mosaic__media">
                  <ProjectCoverImage
                    cover={p.cover}
                    alt={p.alt}
                    className="h-full w-full transition duration-500 group-hover:scale-[1.015]"
                    sizes={
                      index === 0
                        ? "(min-width:1024px) min(760px, 66vw), (min-width:640px) min(90vw, 720px), min(100vw, 560px)"
                        : "(min-width:1024px) min(360px, 30vw), (min-width:640px) min(50vw, 520px), min(100vw, 560px)"
                    }
                  />
                  <div className="image-unify-overlay image-unify-overlay--editorial" aria-hidden />
                </div>
                <div className="home-projects-mosaic__body">
                  <span className={`${fontSans.className} text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[var(--primary-mid)]`}>
                    {p.label}
                  </span>
                  <span
                    className={`${fontDisplay.className} home-projects-mosaic__caption mt-1 block font-semibold text-[var(--foreground)]`}
                  >
                    {p.caption}
                  </span>
                  <span className={`${fontSans.className} mt-1 block text-[0.7rem] font-medium text-[var(--copy-body)]`}>Apri →</span>
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-8 sm:mt-10">
            <Link href="/progetti" className={`${ui.btnOutline} inline-flex w-full sm:w-auto`}>
              Archivio progetti
            </Link>
          </p>
        </div>
      </section>

      {/* ── Processo ── */}
      <section id="processo" className="surface-inverted lazy-section section-shell scroll-anchor overflow-x-hidden min-w-0 px-4 sm:px-5 md:px-10">
        <div className="mx-auto max-w-[1140px]">
          <div className="home-section-intro reveal-block">
            <p className="section-kicker">Metodo</p>
            <h2 className={titleCls}>Dal campo agli elaborati</h2>
            <div className="home-section-rule" aria-hidden />
            <p className="home-section-intro__lede max-w-[48ch]">
              Tre passaggi ricorrenti nei rilievi digitali: acquisizione rapida, controllo metrico, consegna in formati operativi.
            </p>
          </div>
          <ul className="home-process-rail mt-8">
            {processSteps.map((s) => (
              <li key={s.kicker} className="home-process-rail__item reveal-block">
                <span className="home-process-rail__marker" aria-hidden />
                <p className={`${fontSans.className} section-kicker`}>{s.kicker}</p>
                <h3 className={`${fontDisplay.className} mt-2 text-lg font-semibold text-[var(--foreground)]`}>{s.title}</h3>
                <p className={`${fontSans.className} mt-2 text-sm leading-relaxed text-[var(--copy-body)]`}>{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Abilitazioni professionali ── */}
      <section id="certificazioni" className="lazy-section section-shell scroll-anchor overflow-x-hidden min-w-0 bg-[var(--muted)] px-4 sm:px-5 md:px-10">
        <div className="mx-auto max-w-[1140px]">
          <div className="home-section-intro reveal-block">
            <p className="section-kicker">Titoli</p>
            <h2 className={titleCls}>Abilitazioni professionali</h2>
            <div className="home-section-rule" aria-hidden />
            <p className="home-section-intro__lede max-w-[52ch]">{certificationsIntro}</p>
          </div>
          <ul className="home-certs-list">
            {certifications.map((c) => (
              <li key={c.title} className="home-certs-list__item reveal-block">
                <h3 className="home-certs-list__title">{c.title}</h3>
                <p className="text-[0.88rem] leading-relaxed text-[var(--copy-body)] sm:text-[0.92rem]">{c.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Dove operiamo ── */}
      <section id="zone-servite" className="lazy-section section-shell scroll-anchor overflow-x-hidden min-w-0 bg-[var(--background)] px-4 sm:px-5 md:px-10">
        <div className="mx-auto max-w-[1140px]">
          <div className="home-section-intro reveal-block">
            <p className="section-kicker">Territorio</p>
            <h2 className={titleCls}>{zoneContent.title}</h2>
            <div className="home-section-rule" aria-hidden />
            <div className="home-section-intro__lede max-w-[52ch]">{zoneDescription}</div>
          </div>
          <div className="home-territory-band reveal-block">
            <div className="home-territory-band__icon" aria-hidden>
              <IconMapPin className="h-7 w-7 sm:h-8 sm:w-8" />
            </div>
            <div className="min-w-0">
              <h3 className={`${fontDisplay.className} text-lg font-medium text-[var(--foreground)] sm:text-xl`}>{zoneContent.heading}</h3>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-[var(--copy-body)] sm:text-[0.95rem]">{zoneFooter}</p>
            </div>
          </div>
        </div>
      </section>

      <StatsSection />

      {/* ── Contatti ── */}
      <section className="lazy-section section-shell overflow-x-hidden min-w-0 bg-[var(--muted)] px-4 sm:px-5 md:px-10">
        <div className="mx-auto max-w-[1140px]">
          <div className="home-section-intro reveal-block">
            <p className="section-kicker">In sintesi</p>
            <h2 className={titleCls}>Contatti</h2>
            <div className="home-section-rule" aria-hidden />
            <p className="home-section-intro__lede max-w-[52ch]">{contattiIntro}</p>
          </div>
          <div className="home-contact-rail">
            <article className="home-contact-rail__item reveal-block">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-md border border-[var(--green-border-muted)] bg-[var(--muted)] text-[var(--primary-mid)]">
                <IconEmail />
              </div>
              <h3 className={`${fontDisplay.className} mb-1.5 text-base font-medium text-[var(--foreground)]`}>Email</h3>
              <a
                href={`mailto:${site.email}`}
                className="inline-block max-w-full break-words text-[0.88rem] text-[var(--copy-body)] underline-offset-2 transition hover:text-[var(--primary-mid)] hover:underline sm:text-[0.92rem]"
              >
                {site.email}
              </a>
            </article>
            <article className="home-contact-rail__item reveal-block">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-md border border-[var(--green-border-muted)] bg-[var(--muted)] text-[var(--primary-mid)]">
                <IconPhone />
              </div>
              <h3 className={`${fontDisplay.className} mb-2 text-base font-medium text-[var(--foreground)]`}>Telefono</h3>
              <ul className="mx-auto max-w-[22rem] space-y-2.5 text-[0.88rem] text-[var(--copy-body)] sm:text-[0.92rem]">
                {site.phones.map((phone) => (
                  <li key={phone.tel}>
                    <span className="block text-[0.72rem] text-[var(--green-ink-muted)]">{phone.label}</span>
                    <a
                      href={`tel:${phone.tel}`}
                      className="inline-block min-h-[40px] py-0.5 underline-offset-2 transition hover:text-[var(--primary-mid)] hover:underline"
                    >
                      {phone.display}
                    </a>
                  </li>
                ))}
              </ul>
            </article>
            <article className="home-contact-rail__item reveal-block">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-md border border-[var(--green-border-muted)] bg-[var(--muted)] text-[var(--primary-mid)]">
                <IconMapPin />
              </div>
              <h3 className={`${fontDisplay.className} mb-1.5 text-base font-medium text-[var(--foreground)]`}>Sede</h3>
              <p className="mx-auto max-w-[28ch] text-pretty text-[0.88rem] leading-relaxed text-[var(--copy-body)] sm:text-[0.92rem]">
                {site.addressLine}
              </p>
            </article>
          </div>
          <p className="mt-8 sm:mt-10">
            <Link href="/contatti#form-contatti" className={`${ui.btnOutline} inline-flex w-full sm:w-auto`}>
              Modulo di contatto
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
