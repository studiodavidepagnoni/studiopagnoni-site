"use client";

import { ContactForm } from "@/components/contact/ContactForm";
import { fontDisplay } from "@/lib/fonts";
import { ui } from "@/lib/ui";
import { useSearchParams } from "next/navigation";
import { Suspense, type ReactNode } from "react";

function useIsSlamLead() {
  const searchParams = useSearchParams();
  return searchParams.get("oggetto") === "slam";
}

function ContattiIntroInner() {
  const isSlamLead = useIsSlamLead();

  return (
    <div className="mb-10 max-w-[780px] sm:mb-12">
      <p className={ui.body}>
        {isSlamLead ? (
          <>
            Stai richiedendo informazioni su un <strong>rilievo laser scanner SLAM</strong>. Compila il modulo con superficie indicativa e
            formato di consegna desiderato: ti risponderemo con tempi e preventivo su misura.
          </>
        ) : (
          <>
            Siamo disponibili per preventivi su <strong>pratiche architettoniche</strong>, <strong>rilievi topografici</strong>,{" "}
            <strong>laser scanner SLAM</strong>, <strong>progettazione del verde</strong>, <strong>pratiche edilizie</strong> e{" "}
            <strong>coordinamento sicurezza</strong>. Indica la località dell&apos;intervento e la finalità: ti risponderemo dal canale che preferisci.
          </>
        )}
      </p>
    </div>
  );
}

function ContattiFormInner() {
  const isSlamLead = useIsSlamLead();

  return (
    <section id="form-contatti" className={`mt-12 ${ui.scrollAnchor} sm:mt-16`}>
      <div className={ui.innerCardStatic}>
        <h2 className={`${fontDisplay.className} ${ui.caseStudyTitle} mb-6 sm:mb-8`}>Scrivici</h2>
        <ContactForm
          defaultSubject={isSlamLead ? "Preventivo rilievo laser SLAM" : ""}
          defaultInquiryType={isSlamLead ? "slam" : ""}
        />
      </div>
    </section>
  );
}

function ContattiQuerySuspense({ children, fallback }: { children: ReactNode; fallback: ReactNode }) {
  return <Suspense fallback={fallback}>{children}</Suspense>;
}

const introFallback = (
  <div className="mb-10 max-w-[780px] sm:mb-12">
    <p className={ui.body}>
      Siamo disponibili per preventivi su pratiche architettoniche, rilievi topografici, laser scanner SLAM e progettazione.
    </p>
  </div>
);

const formFallback = (
  <section id="form-contatti" className={`mt-12 ${ui.scrollAnchor} sm:mt-16`}>
    <div className={ui.innerCardStatic}>
      <h2 className={`${fontDisplay.className} ${ui.caseStudyTitle} mb-6 sm:mb-8`}>Scrivici</h2>
      <ContactForm />
    </div>
  </section>
);

/** Intro legata a ?oggetto=slam — compatibile con export statico. */
export function ContattiIntro() {
  return (
    <ContattiQuerySuspense fallback={introFallback}>
      <ContattiIntroInner />
    </ContattiQuerySuspense>
  );
}

/** Modulo contatti con preset SLAM se ?oggetto=slam. */
export function ContattiFormSection() {
  return (
    <ContattiQuerySuspense fallback={formFallback}>
      <ContattiFormInner />
    </ContattiQuerySuspense>
  );
}
