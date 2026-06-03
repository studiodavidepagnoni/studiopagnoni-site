"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { isIosSafari } from "@/lib/utils/isIosSafari";
import { usePrefersReducedMotion } from "@/lib/utils/useClientMedia";

const ProjectLightboxDialog = dynamic(
  () => import("@/components/projects/ProjectLightboxDialog").then((m) => ({ default: m.ProjectLightboxDialog })),
  { ssr: false },
);

type Img = { src: string; alt: string };

type Props = {
  images: Img[];
  className?: string;
};

export function ProjectImageLightbox({ images, className = "" }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);
  const [renderedOpen, setRenderedOpen] = useState<number | null>(null);
  const [phase, setPhase] = useState<"opening" | "open" | "closing">("opening");
  const reducedMotion = usePrefersReducedMotion();
  const lightboxTouchX = useRef<number | null>(null);
  const lightboxTouchY = useRef<number | null>(null);
  const lightboxDidSwipe = useRef(false);
  const iosSafariRef = useRef(false);
  const filmstripRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const scrollYRef = useRef(0);

  const close = useCallback(() => {
    setPhase("closing");
    setOpen(null);
  }, []);

  const go = useCallback(
    (delta: number) => {
      setOpen((i) => {
        if (i === null) return null;
        const n = images.length;
        return (i + delta + n) % n;
      });
    },
    [images.length],
  );

  useEffect(() => {
    if (typeof document === "undefined") return;
    const node = document.createElement("div");
    node.setAttribute("data-project-lightbox-root", "");
    document.body.appendChild(node);
    setPortalNode(node);
    return () => {
      setPortalNode(null);
      node.remove();
    };
  }, []);

  useEffect(() => {
    iosSafariRef.current = isIosSafari();
  }, []);

  useEffect(() => {
    if (open === null) return;
    setRenderedOpen(open);
    setPhase(reducedMotion ? "open" : "opening");
    if (reducedMotion) return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setPhase("open"));
    });
    const fallback = window.setTimeout(() => setPhase((p) => (p === "opening" ? "open" : p)), 80);
    return () => {
      cancelAnimationFrame(id);
      window.clearTimeout(fallback);
    };
  }, [open, reducedMotion]);

  const finishClose = useCallback(() => {
    setRenderedOpen(null);
    setPhase("opening");
  }, []);

  const onBackdropTransitionEnd = useCallback(
    (e: React.TransitionEvent<HTMLDivElement>) => {
      if (phase !== "closing" || e.target !== dialogRef.current || e.propertyName !== "opacity") return;
      finishClose();
    },
    [phase, finishClose],
  );

  useEffect(() => {
    if (open !== null || phase !== "closing") return;
    if (reducedMotion) {
      finishClose();
      return;
    }
    const t = window.setTimeout(finishClose, iosSafariRef.current ? 280 : 220);
    return () => window.clearTimeout(t);
  }, [open, phase, reducedMotion, finishClose]);

  useEffect(() => {
    if (renderedOpen === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        const root = dialogRef.current;
        if (!root) return;
        const focusable = Array.from(
          root.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        ).filter((el) => !el.hasAttribute("inert") && el.getClientRects().length > 0);

        if (focusable.length === 0) {
          e.preventDefault();
          root.focus();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement instanceof HTMLElement ? document.activeElement : null;

        if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && (active === first || active === root)) {
          e.preventDefault();
          last.focus();
        }
      }
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };

    const onWheel = (e: WheelEvent) => {
      if (images.length < 2) return;
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);
      if (e.shiftKey || absX > absY) {
        e.preventDefault();
        if ((e.shiftKey ? e.deltaY : e.deltaX) > 0) go(1);
        else go(-1);
      }
    };

    window.addEventListener("keydown", onKey);
    const dialog = dialogRef.current;
    dialog?.addEventListener("wheel", onWheel, { passive: false });

    lastFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    scrollYRef.current = window.scrollY;

    const root = document.documentElement;
    const bodyStyle = document.body.style;
    const prevScrollVar = bodyStyle.getPropertyValue("--lightbox-scroll-y");
    const prevBodyOverflow = bodyStyle.overflow;
    const prevBodyPosition = bodyStyle.position;
    const prevBodyTop = bodyStyle.top;
    const prevBodyWidth = bodyStyle.width;
    const prevBodyTouchAction = bodyStyle.touchAction;

    root.classList.add("lightbox-open");
    bodyStyle.setProperty("--lightbox-scroll-y", `-${scrollYRef.current}px`);
    bodyStyle.overflow = "hidden";
    bodyStyle.touchAction = "none";

    if (!iosSafariRef.current) {
      bodyStyle.position = "fixed";
      bodyStyle.top = `-${scrollYRef.current}px`;
      bodyStyle.width = "100%";
    }

    const inerted: HTMLElement[] = [];
    if (portalNode) {
      for (const child of Array.from(document.body.children)) {
        if (!(child instanceof HTMLElement) || child === portalNode) continue;
        child.inert = true;
        child.setAttribute("aria-hidden", "true");
        inerted.push(child);
      }
    }

    requestAnimationFrame(() => dialogRef.current?.focus());

    return () => {
      window.removeEventListener("keydown", onKey);
      dialog?.removeEventListener("wheel", onWheel);

      for (const el of inerted) {
        el.inert = false;
        el.removeAttribute("aria-hidden");
      }

      root.classList.remove("lightbox-open");
      if (prevScrollVar) bodyStyle.setProperty("--lightbox-scroll-y", prevScrollVar);
      else bodyStyle.removeProperty("--lightbox-scroll-y");
      bodyStyle.overflow = prevBodyOverflow;
      bodyStyle.position = prevBodyPosition;
      bodyStyle.top = prevBodyTop;
      bodyStyle.width = prevBodyWidth;
      bodyStyle.touchAction = prevBodyTouchAction;

      window.scrollTo({ top: scrollYRef.current, behavior: "auto" });
      lastFocusedRef.current?.focus();
    };
  }, [renderedOpen, close, go, images.length, portalNode]);

  useEffect(() => {
    if (renderedOpen === null || !filmstripRef.current) return;
    const el = filmstripRef.current;
    const activeIndex = open ?? renderedOpen;
    const thumb = el.children[activeIndex] as HTMLElement | undefined;
    thumb?.scrollIntoView({
      behavior: iosSafariRef.current || reducedMotion ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [renderedOpen, open, reducedMotion]);

  const onLightboxTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    lightboxTouchX.current = t?.clientX ?? null;
    lightboxTouchY.current = t?.clientY ?? null;
    lightboxDidSwipe.current = false;
  };

  const onLightboxTouchEnd = (e: React.TouchEvent) => {
    if (lightboxTouchX.current === null) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - lightboxTouchX.current;
    const dy = t.clientY - (lightboxTouchY.current ?? t.clientY);
    lightboxTouchX.current = null;
    lightboxTouchY.current = null;
    if (images.length < 2) return;
    if (Math.abs(dx) >= 48 && Math.abs(dx) > Math.abs(dy) * 1.15) {
      lightboxDidSwipe.current = true;
      go(dx < 0 ? 1 : -1);
    }
  };

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (lightboxDidSwipe.current) {
      lightboxDidSwipe.current = false;
      return;
    }
    close();
  };

  if (images.length === 0) return null;

  const activeIndex = open ?? renderedOpen;

  const lightbox =
    renderedOpen !== null && activeIndex !== null ? (
      <ProjectLightboxDialog
        images={images}
        activeIndex={activeIndex}
        phase={phase}
        dialogRef={dialogRef}
        filmstripRef={filmstripRef}
        onClose={close}
        onGo={go}
        onSelect={(i) => {
          setOpen(i);
          setRenderedOpen(i);
        }}
        onBackdropClick={onBackdropClick}
        onBackdropTransitionEnd={onBackdropTransitionEnd}
        onTouchStart={onLightboxTouchStart}
        onTouchEnd={onLightboxTouchEnd}
      />
    ) : null;

  return (
    <section className={className} aria-label="Galleria fotografica">
      <div className="fine-divider mb-6" />

      <div className="md:hidden">
        <div
          className="-mx-1 flex gap-3 overflow-x-auto overscroll-x-contain px-1 pb-3 pt-1 [scrollbar-width:thin] [scrollbar-color:var(--accent-glow-35)_transparent] snap-x snap-mandatory"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {images.map((img, i) => (
            <button
              key={`thumb-m-${img.src}-${i}`}
              type="button"
              onClick={() => setOpen(i)}
              className="group relative h-[200px] w-[min(78vw,320px)] shrink-0 snap-start cursor-zoom-in overflow-hidden rounded-xl border border-[var(--green-border-muted)] bg-[var(--card)] text-left shadow-lg shadow-black/25 transition hover:border-[var(--primary-mid)]/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-mid)]/45"
              aria-label={`Apri nella galleria: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt=""
                fill
                className="object-cover transition duration-500 ease-out group-hover:scale-[1.02]"
                sizes="min(320px, 78vw)"
              />
            </button>
          ))}
        </div>
      </div>

      <ul className="hidden list-none gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
        {images.map((img, i) => (
          <li key={`thumb-d-${img.src}-${i}`}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group relative aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-xl border border-[var(--green-border-muted)] bg-[var(--card)] text-left shadow-md shadow-black/20 transition hover:-translate-y-0.5 hover:border-[var(--primary-mid)]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-mid)]/45"
              aria-label={`Apri nella galleria: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt=""
                fill
                className="object-cover transition duration-500 ease-out group-hover:scale-[1.02]"
                sizes="(min-width:1024px) min(360px, 28vw), (min-width:768px) min(50vw, 480px), 100vw"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--primary)]/25 via-transparent to-transparent opacity-0 transition group-hover:opacity-100"
                aria-hidden
              />
            </button>
          </li>
        ))}
      </ul>

      {portalNode ? createPortal(lightbox, portalNode) : null}
    </section>
  );
}
