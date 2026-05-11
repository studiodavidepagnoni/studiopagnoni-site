"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { fontDisplay, fontSans } from "@/lib/fonts";

type Img = { src: string; alt: string };

type Props = {
  images: Img[];
  className?: string;
};

const thumbRing = "border-[var(--primary-mid)] ring-2 ring-[var(--primary-mid)]/30";

export function ProjectImageLightbox({ images, className = "" }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);
  const [renderedOpen, setRenderedOpen] = useState<number | null>(null);
  const lightboxTouchX = useRef<number | null>(null);
  const filmstripRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const scrollYRef = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  const close = useCallback(() => setOpen(null), []);

  const go = useCallback(
    (delta: number) => {
      setOpen((i) => {
        if (i === null) return null;
        const n = images.length;
        return (i + delta + n) % n;
      });
    },
    [images.length]
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
    if (open !== null) setRenderedOpen(open);
  }, [open]);

  useEffect(() => {
    if (open === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        const root = dialogRef.current;
        if (!root) return;
        const focusable = Array.from(
          root.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
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

    const bodyStyle = document.body.style;
    const prevBodyOverflow = bodyStyle.overflow;
    const prevBodyPosition = bodyStyle.position;
    const prevBodyTop = bodyStyle.top;
    const prevBodyWidth = bodyStyle.width;

    bodyStyle.overflow = "hidden";
    bodyStyle.position = "fixed";
    bodyStyle.top = `-${scrollYRef.current}px`;
    bodyStyle.width = "100%";

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

      bodyStyle.overflow = prevBodyOverflow;
      bodyStyle.position = prevBodyPosition;
      bodyStyle.top = prevBodyTop;
      bodyStyle.width = prevBodyWidth;

      window.scrollTo({ top: scrollYRef.current, behavior: "auto" });
      lastFocusedRef.current?.focus();
    };
  }, [open, close, go, images.length, portalNode]);

  useEffect(() => {
    if (renderedOpen === null || !filmstripRef.current) return;
    const el = filmstripRef.current;
    const thumb = el.children[renderedOpen] as HTMLElement | undefined;
    thumb?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [renderedOpen]);

  const onLightboxTouchStart = (e: React.TouchEvent) => {
    lightboxTouchX.current = e.touches[0]?.clientX ?? null;
  };

  const onLightboxTouchEnd = (e: React.TouchEvent) => {
    if (lightboxTouchX.current === null || images.length < 2) return;
    const dx = e.changedTouches[0].clientX - lightboxTouchX.current;
    lightboxTouchX.current = null;
    if (Math.abs(dx) < 48) return;
    go(dx < 0 ? 1 : -1);
  };

  if (images.length === 0) return null;

  const lightbox =
    renderedOpen !== null ? (
      <AnimatePresence
        initial={false}
        onExitComplete={() => {
          setRenderedOpen(null);
        }}
      >
        {open !== null ? (
          <motion.div
            ref={dialogRef}
            id="project-lightbox-dialog"
            className="fixed inset-0 z-[10050] flex h-dvh w-screen cursor-zoom-out flex-col overflow-hidden bg-[color-mix(in_srgb,var(--surface-chrome)_94%,transparent)] backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Galleria a schermo intero"
            tabIndex={-1}
            onClick={close}
            onTouchStart={onLightboxTouchStart}
            onTouchEnd={onLightboxTouchEnd}
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.18, ease: "easeOut" }}
          >
            <motion.div
              className="relative z-30 flex shrink-0 items-center justify-between gap-3 border-b border-[var(--green-border-muted)] bg-[var(--card)]/95 px-3 py-3 sm:px-5 sm:py-3.5"
              onClick={(e) => e.stopPropagation()}
              initial={prefersReducedMotion ? false : { opacity: 0, y: -10 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.18, ease: "easeOut" }}
            >
              <p className={`${fontDisplay.className} min-w-0 flex-1 truncate text-sm tracking-wide text-[var(--foreground)]/95 sm:text-base`}>
                {images[open].alt}
              </p>
              <button
                type="button"
                className={`${fontSans.className} flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[var(--green-border)] bg-[var(--muted)] text-lg leading-none text-[var(--foreground)] transition hover:border-[var(--primary-mid)]/50 hover:bg-[var(--card)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-mid)]/45`}
                onClick={close}
                aria-label="Chiudi galleria"
              >
                &times;
              </button>
            </motion.div>

            <div className="flex min-h-0 flex-1 items-center justify-center overflow-y-auto overscroll-contain px-3 py-3 sm:px-6 sm:py-4">
              <motion.div
                className="flex w-full max-w-[min(96vw,1200px)] flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.985, y: 10 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.985, y: 8 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.22, ease: "easeOut" }}
              >
                <div className="relative w-full rounded-2xl border border-[var(--green-border-muted)] bg-[var(--card)]/40 p-2 sm:p-3">
                  {images.length > 1 ? (
                    <>
                      <button
                        type="button"
                        className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg border border-[var(--green-border)] bg-[var(--muted)]/95 text-xl text-[var(--primary-mid)] transition hover:border-[var(--primary-mid)]/40 motion-reduce:transition-none sm:left-3 sm:h-11 sm:w-11 sm:text-2xl"
                        onClick={(e) => {
                          e.stopPropagation();
                          go(-1);
                        }}
                        aria-label="Immagine precedente"
                      >
                        &lsaquo;
                      </button>
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg border border-[var(--green-border)] bg-[var(--muted)]/95 text-xl text-[var(--primary-mid)] transition hover:border-[var(--primary-mid)]/40 motion-reduce:transition-none sm:right-3 sm:h-11 sm:w-11 sm:text-2xl"
                        onClick={(e) => {
                          e.stopPropagation();
                          go(1);
                        }}
                        aria-label="Immagine successiva"
                      >
                        &rsaquo;
                      </button>
                    </>
                  ) : null}

                  <div
                    className="relative mx-auto w-full max-w-[1100px] overflow-hidden rounded-xl border border-[var(--green-border-muted)] bg-black/20"
                    style={{
                      height: "min(680px, calc(100dvh - 13rem))",
                      maxHeight: "min(680px, calc(100dvh - 13rem))",
                    }}
                  >
                    <Image
                      src={images[open].src}
                      alt={images[open].alt}
                      fill
                      className="cursor-zoom-out object-contain"
                      sizes="(min-width:768px) min(1100px, 92vw), 96vw"
                      priority
                    />
                  </div>
                </div>

                <p className="sr-only">
                  Scorri col dito, usa le frecce o Maiusc piu rotellina per cambiare immagine. Esci con Esc o clic sullo sfondo.
                </p>
              </motion.div>
            </div>

            {images.length > 1 ? (
              <motion.div
                className="shrink-0 border-t border-[var(--green-border-muted)] bg-[var(--card)]/95 px-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:px-4"
                onClick={(e) => e.stopPropagation()}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.18, ease: "easeOut" }}
              >
                <div
                  ref={filmstripRef}
                  className="flex cursor-grab gap-2 overflow-x-auto overscroll-x-contain pb-1 active:cursor-grabbing [scrollbar-width:thin] [scrollbar-color:var(--accent-glow-35)_transparent]"
                  style={{ WebkitOverflowScrolling: "touch" }}
                >
                  {images.map((img, i) => (
                    <button
                      key={`strip-${img.src}-${i}`}
                      type="button"
                      onClick={() => setOpen(i)}
                      className={`relative h-[4.25rem] w-[6.5rem] shrink-0 cursor-pointer overflow-hidden rounded-md border-2 transition sm:h-[4.75rem] sm:w-28 ${
                        i === open ? thumbRing : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                      aria-label={img.alt || "Seleziona immagine"}
                      aria-current={i === open ? "true" : undefined}
                    >
                      <Image src={img.src} alt="" fill className="object-cover" sizes="112px" />
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
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
