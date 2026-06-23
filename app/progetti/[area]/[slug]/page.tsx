import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageClosingCta } from "@/components/content/PageClosingCta";
import { PageHero } from "@/components/hero/PageHero";
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
        <div className={`${layoutContentMaxClass} space-y-10 sm:space-y-12`}>
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
          </div>

          <PageClosingCta
            id="project-cta"
            title="Vuoi un rilievo simile?"
            description="Indica zona, superficie indicativa e cosa ti serve in consegna: ti rispondiamo con tempi e preventivo su misura per un rilievo laser scanner SLAM."
            primaryHref="/contatti?oggetto=slam#form-contatti"
            primaryLabel="Richiedi preventivo SLAM"
            secondaryHref="/contatti#form-contatti"
            secondaryLabel="Contatti generali"
          />
        </div>
      </div>
    </main>
    </>
  );
}
