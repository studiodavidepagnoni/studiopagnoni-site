import Link from "next/link";
import { fontSans } from "@/lib/fonts";
import { listArchivedProjects } from "@/lib/content/projects";
import { listArchivedProjectsEn } from "@/lib/i18n/content/projects.en";
import type { Locale } from "@/lib/i18n/config";
import { withLocalePrefix } from "@/lib/i18n/paths";
import { ProjectCoverImage } from "@/components/media/ProjectCoverImage";

export function ProgettiArchive({ locale = "it" }: { locale?: Locale }) {
  const projects = locale === "en" ? listArchivedProjectsEn() : listArchivedProjects();
  const cta = locale === "en" ? "View project" : "Vedi il progetto";

  return (
    <div className="reveal-block grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-5">
      {projects.map((p) => (
        <Link
          key={p.href}
          href={withLocalePrefix(p.href, locale)}
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
            <span className={`${fontSans.className} project-preview-card__cta`}>{cta}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
