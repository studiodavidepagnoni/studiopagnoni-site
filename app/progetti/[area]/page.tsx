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
          <div className="lazy-section grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {c.cases.map((p) => (
              <Link
                key={p.slug}
                href={p.href}
                className="group project-preview-card block overflow-hidden rounded-lg border border-[var(--green-border-muted)] bg-[var(--card)]"
              >
                <div className="relative aspect-[4/3]">
                  <ProjectCoverImage
                    cover={p.cover}
                    alt={p.alt}
                    className="project-preview-card__image"
                    sizes="(min-width:1024px) min(360px, 30vw), (min-width:640px) min(50vw, 520px), min(100vw, 560px)"
                  />
                  <div className="image-unify-overlay image-unify-overlay--editorial" aria-hidden />
                </div>
                <div className="border-t border-[var(--green-border-muted)] p-4 sm:p-5">
                  <span className={`${fontDisplay.className} text-lg font-semibold leading-snug text-[var(--foreground)] sm:text-xl`}>{p.caption}</span>
                  <span className={`${fontSans.className} mt-2 block text-sm font-medium text-[var(--copy-body)]`}>Scheda →</span>
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
