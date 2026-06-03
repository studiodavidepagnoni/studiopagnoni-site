import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/hero/PageHero";
import { ProjectImageLightbox } from "@/components/projects/ProjectImageLightbox";
import {
  getCaseStudyKey,
  isProjectArea,
  projectCaseStudies,
  projectCategories,
  projectAreas,
} from "@/lib/content/projects";
import { layoutContentMaxClass, layoutGutterXClass, site } from "@/lib/config/site";
import { ui } from "@/lib/ui";

type Props = { params: Promise<{ area: string; slug: string }> };
const siteUrl = site.url.replace(/\/$/, "");

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
  if (!key || !projectCaseStudies[key]) return {};
  const cs = projectCaseStudies[key];
  return {
    title: cs.metaTitle,
    description: cs.metaDescription,
    alternates: { canonical: `${siteUrl}/progetti/${area}/${slug}` },
  };
}

export default async function ProjectCasePage({ params }: Props) {
  const { area, slug } = await params;
  if (!isProjectArea(area)) notFound();

  const key = getCaseStudyKey(area, slug);
  if (!key || !projectCaseStudies[key]) notFound();

  const cs = projectCaseStudies[key];
  const cat = projectCategories[area];

  const heroImage = cs.gallery[0];

  return (
    <>
      <PageHero
        eyebrow="Progetto"
        title={cs.heading}
        image={heroImage.src}
        alt={heroImage.alt}
      />
    <main id="main-content" className={`section-shell ${ui.pageBg}`}>
      <div className={layoutGutterXClass}>
        <div className={layoutContentMaxClass}>
          <nav className="reveal-faint mb-8 text-[0.82rem] text-[var(--green-ink-muted)] sm:text-sm" aria-label="Percorso di navigazione">
            <Link href="/progetti" className="font-medium text-[var(--primary-mid)] hover:underline">
              Progetti
            </Link>
            <span className="mx-2 text-[var(--green-border)]" aria-hidden>
              /
            </span>
            <Link href={`/progetti/${area}`} className="font-medium text-[var(--primary-mid)] hover:underline">
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

            {cs.gallery.length > 0 ? <ProjectImageLightbox images={cs.gallery} className="mt-10" /> : null}
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
