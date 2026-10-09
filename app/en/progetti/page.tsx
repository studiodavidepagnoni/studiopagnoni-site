import Link from "next/link";
import { StaticPageHero } from "@/components/hero/StaticPageHero";
import { ProjectCoverImage } from "@/components/media/ProjectCoverImage";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { featuredProjects } from "@/lib/content/projects";
import { buildPageMetadata } from "@/lib/config/seo";
import { localeAlternates } from "@/lib/i18n/metadata";
import { layoutContentMaxClass, layoutGutterXClass } from "@/lib/config/site";
import { ui } from "@/lib/ui";

export const metadata = {
  ...buildPageMetadata({
    title: "Projects and case studies",
    description: "Recent digital surveys and case studies in Franciacorta and the province of Brescia.",
    path: "/en/progetti",
  }),
  alternates: localeAlternates("/progetti"),
};

export default function EnProgettiPage() {
  return (
    <>
      <StaticPageHero path="/en/progetti" />
      <main id="main-content" className={`section-shell ${ui.pageBg}`}>
        <div className={layoutGutterXClass}>
          <div className={`${layoutContentMaxClass} space-y-10`}>
            <p className={`${ui.body} max-w-[62ch]`}>
              Selected surveys and documentation work. Detailed case-study pages are currently published in Italian —
              contact us if you need an English summary of a brief.
            </p>
            <ul className="grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="project-preview-card group flex h-full flex-col overflow-hidden rounded-lg border border-[var(--green-border-muted)] bg-[var(--card)]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[var(--muted)]">
                      <ProjectCoverImage
                        cover={p.cover}
                        alt={p.alt}
                        sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <span className={`${fontSans.className} section-kicker`}>{p.label}</span>
                      <h2 className={`${fontDisplay.className} ${ui.cardHeading} mt-2`}>{p.caption}</h2>
                      <span className={`${fontSans.className} ${ui.textCta} mt-auto pt-4`}>View project →</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
