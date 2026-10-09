import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageClosingCta } from "@/components/content/PageClosingCta";
import { PageHero } from "@/components/hero/PageHero";
import {
  getCaseStudyKey,
  isProjectArea,
  projectAreas,
  projectCategories,
} from "@/lib/content/projects";
import { projectCaseStudiesEn, projectCategoriesEn } from "@/lib/i18n/content/projects.en";
import { buildPageMetadata } from "@/lib/config/seo";
import { localeAlternates } from "@/lib/i18n/metadata";
import { withLocalePrefix } from "@/lib/i18n/paths";
import { layoutContentMaxClass, layoutGutterXClass } from "@/lib/config/site";
import { ui } from "@/lib/ui";

type Props = { params: Promise<{ area: string; slug: string }> };

export async function generateStaticParams() {
  const out: { area: string; slug: string }[] = [];
  for (const area of projectAreas) {
    for (const c of projectCategories[area].cases) {
      out.push({ area, slug: c.slug });
    }
  }
  return out;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area, slug } = await params;
  if (!isProjectArea(area)) return {};
  const key = getCaseStudyKey(area, slug);
  if (!key || !projectCaseStudiesEn[key]) return {};
  const cs = projectCaseStudiesEn[key];
  return {
    ...buildPageMetadata({
      title: cs.metaTitle,
      description: cs.metaDescription,
      path: `/en/progetti/${area}/${slug}`,
    }),
    alternates: localeAlternates(`/progetti/${area}/${slug}`),
  };
}

export default async function EnProjectCasePage({ params }: Props) {
  const { area, slug } = await params;
  if (!isProjectArea(area)) notFound();

  const key = getCaseStudyKey(area, slug);
  if (!key || !projectCaseStudiesEn[key]) notFound();

  const cs = projectCaseStudiesEn[key];
  const cat = projectCategoriesEn[area];
  const heroImage = cs.gallery[0];

  return (
    <>
      <PageHero eyebrow="Project" title={cs.heading} image={heroImage.src} alt={heroImage.alt} />
      <main id="main-content" className={`section-shell ${ui.pageBg}`}>
        <div className={layoutGutterXClass}>
          <div className={`${layoutContentMaxClass} space-y-10 sm:space-y-12`}>
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
              <Link href={withLocalePrefix(`/progetti/${area}`, "en")} className={ui.textCta}>
                {cat.heading}
              </Link>
              <span className="mx-2 text-[var(--green-border)]" aria-hidden>
                /
              </span>
              <span className="text-[var(--foreground)]/80">{cs.metaTitle}</span>
            </nav>

            <div className="lazy-section">
              <article className={ui.innerCard}>
                <div className="reading-measure mx-auto">
                  <div className={ui.body}>{cs.body}</div>
                </div>
              </article>
            </div>

            <PageClosingCta
              id="project-cta"
              title="Need a similar survey?"
              description="Tell us location, approximate area and required deliverables: we reply with timing and a tailored quote for a SLAM laser survey."
              primaryHref={`${withLocalePrefix("/contatti", "en")}?oggetto=slam#form-contatti`}
              primaryLabel="Request a SLAM quote"
              secondaryHref={`${withLocalePrefix("/contatti", "en")}#form-contatti`}
              secondaryLabel="General contact"
            />
          </div>
        </div>
      </main>
    </>
  );
}
