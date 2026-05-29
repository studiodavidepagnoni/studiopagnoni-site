"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { fontDisplay, fontSans } from "@/lib/fonts";

type Img = { src: string; alt: string };

type Props = {
  images: Img[];
  open: number | null;
  activeIndex: number;
  dialogRef: React.RefObject<HTMLDivElement | null>;
  filmstripRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
  onGo: (delta: number) => void;
  onSelect: (index: number) => void;
  onExitComplete: () => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
};

const thumbRing = "border-[var(--primary-mid)] ring-2 ring-[var(--primary-mid)]/30";

export function ProjectLightboxDialog({
  images,
  open,
  activeIndex,
  dialogRef,
  filmstripRef,
  onClose,
  onGo,
  onSelect,
  onExitComplete,
  onTouchStart,
  onTouchEnd,
}: Props) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence initial={false} onExitComplete={onExitComplete}>
      {open !== null ? (
        <motion.div
          ref={dialogRef}
          id="project-lightbox-dialog"
          className="fixed inset-0 z-[10050] flex h-dvh w-screen cursor-zoom-out flex-col overflow-hidden bg-[color-mix(in_srgb,var(--surface-chrome)_94%,transparent)] backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label="Galleria a schermo intero"
          tabIndex={-1}
          onClick={onClose}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.18, ease: "easeOut" }}
        >
          <motion.div
            className="relative z-30 flex shrink-0 items-center justify-between gap-3 border-b border-[var(--green-border-muted)] bg-[var(--card)]/95 px-3 py-3 sm:px-5 sm:py-3.5"
            onClick={(e) => e.stopPropagation()}
            initial={prefersReducedMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.18, ease: "easeOut" }}
          >
            <p className={`${fontDisplay.className} min-w-0 flex-1 truncate text-sm tracking-wide text-[var(--foreground)]/95 sm:text-base`}>
              {images[activeIndex].alt}
            </p>
            <button
              type="button"
              className={`${fontSans.className} flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[var(--green-border)] bg-[var(--muted)] text-lg leading-none text-[var(--foreground)] transition hover:border-[var(--primary-mid)]/50 hover:bg-[var(--card)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-mid)]/45`}
              onClick={onClose}
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
              animate={{ opacity: 1, scale: 1, y: 0 }}
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
                        onGo(-1);
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
                        onGo(1);
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
                    src={images[activeIndex].src}
                    alt={images[activeIndex].alt}
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
              animate={{ opacity: 1, y: 0 }}
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
                    onClick={() => onSelect(i)}
                    className={`relative h-[4.25rem] w-[6.5rem] shrink-0 cursor-pointer overflow-hidden rounded-md border-2 transition sm:h-[4.75rem] sm:w-28 ${
                      i === activeIndex ? thumbRing : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                    aria-label={img.alt || "Seleziona immagine"}
                    aria-current={i === activeIndex ? "true" : undefined}
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
  );
}
