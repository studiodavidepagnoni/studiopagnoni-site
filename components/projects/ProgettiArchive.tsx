"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { fontDisplay, fontSans } from "@/lib/fonts";
import {
  listArchivedProjects,
  projectAreaNav,
  type ProjectAreaFilter,
} from "@/lib/content/projects";
import { ProjectCoverImage } from "@/components/media/ProjectCoverImage";

export function ProgettiArchive() {
  const [filter, setFilter] = useState<ProjectAreaFilter>("all");
  const projects = useMemo(() => listArchivedProjects(), []);
  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.area === filter)),
    [filter, projects],
  );

  return (
    <>
      <nav
        aria-label="Filtra progetti per ambito"
        className="reveal-block mb-8 flex flex-wrap gap-2 sm:mb-10"
      >
        {projectAreaNav.map((item) => {
          const active = filter === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(item.id)}
              className={`${fontSans.className} min-h-[44px] touch-manipulation rounded-full border px-4 py-2 text-sm font-semibold transition ${
                active
                  ? "border-[var(--primary-mid)] bg-[var(--primary-mid)] text-[var(--on-primary)]"
                  : "border-[var(--green-border-muted)] bg-[var(--card)] text-[var(--copy-body)] hover:border-[var(--primary-mid)] hover:text-[var(--foreground)]"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {visible.map((p) => (
          <Link
            key={p.href}
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
              <span className={`${fontSans.className} progetti-area-label text-[0.62rem] font-semibold uppercase tracking-[0.2em]`}>
                {p.areaLabel}
              </span>
              <span className={`${fontDisplay.className} mt-1.5 block text-lg font-semibold leading-snug text-[var(--foreground)] sm:text-xl`}>
                {p.caption}
              </span>
              <span className={`${fontSans.className} mt-2 block text-sm font-medium text-[var(--copy-body)]`}>Scheda →</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
