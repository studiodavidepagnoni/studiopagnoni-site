import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/hero/PageHero";
import { ProjectCoverImage } from "@/components/media/ProjectCoverImage";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { isProjectArea, projectAreas } from "@/lib/content/projects";
import { projectCategoriesEn } from "@/lib/i18n/content/projects.en";
import { buildPageMetadata } from "@/lib/config/seo";
import { localeAlternates } from "@/lib/i18n/metadata";
import { withLocalePrefix } from "@/lib/i18n/paths";
import { layoutContentMaxClass, layoutGutterXClass } from "@/lib/config/site";
import { ui } from "@/lib/ui";

type Props = { params: Promise<{ area: string }> };

export function generateStaticParams() {
  return projectAreas.map((area) => ({ area }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area } = await params;
  if (!isProjectArea(area)) return {};
  const c = projectCategoriesEn[area];
  return {
    ...buildPageMetadata({
      title: c.metaTitle,
      description: c.metaDescription,
      path: `/en/progetti/${area}`,
    }),
    alternates: localeAlternates(`/progetti/${area}`),
  };
}

export default async function EnProjectAreaPage({ params }: Props) {
  const { area } = await params;
  if (!isProjectArea(area)) notFound();

  const c = projectCategoriesEn[area];
  const heroCase = c.cases[0];

  return (
    <>
      <PageHero eyebrow="Area" title={c.heading} image={heroCase.cover} alt={heroCase.alt} />
      <main id="main-content" className={`section-shell ${ui.pageBg}`}>
        <div className={layoutGutterXClass}>
          <div className={layoutContentMaxClass}>
            <nav
              className="reveal-faint mb-8 text-[0.82rem] text-[var(--green-ink-muted)] sm:text-sm"
              aria-label="Breadcrumb"
            >
              <Link href={withLocalePrefix("/progetti", "en")} className={ui.textCta}>
                Projects
              </Link>
              <span className="mx-2 text-[var(--green-border)]" aria-hidden>
                /
              </span>
              <span className="text-[var(--foreground)]/80">{c.heading}</span>
            </nav>

            <div className="reveal-block mb-12">
              <div className={`${ui.innerCard} !py-6 sm:!py-8`}>
                <div className={`copy-rhythm text-pretty ${ui.body}`}>{c.intro}</div>
              </div>
            </div>

            <h2 className={`${fontDisplay.className} reveal-title ${ui.gallerySectionTitle} mb-8`}>Featured projects</h2>
            <div className="lazy-section grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-5">
              {c.cases.map((p) => (
                <Link
                  key={p.slug}
                  href={withLocalePrefix(p.href, "en")}
                  className="group project-preview-card block overflow-hidden rounded-lg border border-[var(--green-border-muted)] bg-[var(--card)]"
                >
                  <div className="project-preview-card__media">
                    <ProjectCoverImage
                      cover={p.cover}
                      alt={p.alt}
                      className="project-preview-card__image"
                      sizes="(min-width:1024px) min(300px, 28vw), (min-width:640px) min(45vw, 480px), min(100vw, 520px)"
                    />
                  </div>
                  <div className="project-preview-card__body">
                    <span className="project-preview-card__title">{p.caption}</span>
                    <span className={`${fontSans.className} project-preview-card__cta`}>View project</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
