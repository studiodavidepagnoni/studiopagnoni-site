import Link from "next/link";
import { fontSans } from "@/lib/fonts";
import { listArchivedProjects } from "@/lib/content/projects";
import { ProjectCoverImage } from "@/components/media/ProjectCoverImage";

export function ProgettiArchive() {
  const projects = listArchivedProjects();

  return (
    <div className="reveal-block grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-5">
      {projects.map((p) => (
        <Link
          key={p.href}
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
  );
}
