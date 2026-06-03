import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/hero/PageHero";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { isProjectArea, projectCategories, projectAreas } from "@/lib/content/projects";
import { ProjectCoverImage } from "@/components/media/ProjectCoverImage";
import { layoutContentMaxClass, layoutGutterXClass, site } from "@/lib/config/site";
import { ui } from "@/lib/ui";

type Props = { params: Promise<{ area: string }> };
const siteUrl = site.url.replace(/\/$/, "");

export function generateStaticParams() {
  return projectAreas.map((area) => ({ area }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area } = await params;
  if (!isProjectArea(area)) return {};
  const c = projectCategories[area];
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: `${siteUrl}/progetti/${area}` },
  };
}

export default async function ProjectAreaPage({ params }: Props) {
  const { area } = await params;
  if (!isProjectArea(area)) notFound();

  const c = projectCategories[area];

  const heroCase = c.cases[0];

  return (
    <>
      <PageHero
        eyebrow="Ambito"
        title={c.heading}
        image={heroCase.cover}
        alt={heroCase.alt}
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
            <span className="text-[var(--foreground)]/80">{c.heading}</span>
          </nav>

          <div className="reveal-block mb-12">
            <div className={`${ui.innerCard} !py-6 sm:!py-8`}>
              <div className={`copy-rhythm text-pretty ${ui.body}`}>{c.intro}</div>
            </div>
          </div>

          <h2 className={`${fontDisplay.className} reveal-title ${ui.gallerySectionTitle} mb-8`}>Progetti in evidenza</h2>
          <div className="lazy-section grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-5">
            {c.cases.map((p) => (
              <Link
                key={p.slug}
                href={p.href}
                className="group project-preview-card block overflow-hidden rounded-lg border border-[var(--green-border-muted)] bg-[var(--card)]"
              >
                <div className="project-preview-card__media">
                  <ProjectCoverImage
                    cover={p.cover}
                    alt={p.alt}
                    className="project-preview-card__image"
                    sizes="(min-width:1024px) min(300px, 28vw), (min-width:640px) min(45vw, 480px), min(100vw, 520px)"
                  />
                  <div className="image-unify-overlay image-unify-overlay--editorial" aria-hidden />
                </div>
                <div className="project-preview-card__body">
                  <span className="project-preview-card__title">{p.caption}</span>
                  <span className={`${fontSans.className} project-preview-card__cta`}>Scheda →</span>
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
