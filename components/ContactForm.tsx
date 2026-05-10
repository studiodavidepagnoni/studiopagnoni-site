"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { ui } from "@/lib/ui";

type FieldErrors = Partial<Record<"name" | "email" | "message" | "privacy", string>>;

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [gotcha, setGotcha] = useState(""); // honeypot: i bot lo riempiono, gli umani no
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const errors: FieldErrors = useMemo(() => {
    const e: FieldErrors = {};
    if (touched.name && name.trim().length < 2) e.name = "Inserisci nome e cognome.";
    if (touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Email non valida.";
    if (touched.message && message.trim().length < 10) e.message = "Messaggio troppo breve (min. 10 caratteri).";
    if (touched.privacy && !privacy) e.privacy = "Accetta la privacy per inviare.";
    return e;
  }, [name, email, message, privacy, touched]);

  const valid =
    name.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    message.trim().length >= 10 &&
    privacy;

  const onBlur = (field: string) => () => setTouched((t) => ({ ...t, [field]: true }));

  const onSubmit = useCallback(
    async (ev: React.FormEvent) => {
      ev.preventDefault();
      setTouched({ name: true, email: true, message: true, privacy: true });
      if (!valid) return;

      // Honeypot pieno → silenziosamente "successo" senza inviare nulla.
      if (gotcha.trim().length > 0) {
        setStatus("success");
        return;
      }

      setStatus("submitting");
      const subjectLine = subject?.trim() || "Richiesta da sito web";
      try {
        const id = site.formspreeId?.trim();
        if (!id) {
          const sj = encodeURIComponent(subjectLine);
          const body = encodeURIComponent(
            `Nome: ${name}\nEmail: ${email}\nZona: ${city || "-"}\n\n${message}`
          );
          window.location.href = `mailto:${site.email}?subject=${sj}&body=${body}`;
          setStatus("success");
          setName("");
          setEmail("");
          setSubject("");
          setCity("");
          setMessage("");
          setPrivacy(false);
          setTouched({});
          return;
        }
        // _subject pilota la subject line nelle notifiche Formspree, _replyto imposta il Reply-To.
        const res = await fetch(`https://formspree.io/f/${id}`, {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            _replyto: email,
            email,
            _subject: `[Sito] ${subjectLine}`,
            subject: subjectLine,
            city: city || "",
            message,
          }),
        });
        if (res.ok) {
          setStatus("success");
          setName("");
          setEmail("");
          setSubject("");
          setCity("");
          setMessage("");
          setPrivacy(false);
          setTouched({});
        } else setStatus("error");
      } catch {
        setStatus("error");
      }
    },
    [valid, gotcha, name, email, subject, city, message]
  );

  if (status === "success") {
    return (
      <p
        className="w-full rounded-lg border border-[var(--primary-mid)]/30 bg-[var(--muted)] px-4 py-6 text-[var(--primary-mid)]"
        role="status"
      >
        Messaggio inviato. Ti risponderemo al più presto.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid w-full gap-3 sm:gap-4 md:grid-cols-2" noValidate>
      {/* Honeypot: nascosto agli utenti via CSS, visibile ai bot. Va fuori dal flusso visivo e dal tab order. */}
      <div aria-hidden className="hidden" style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="_gotcha">Non compilare se sei umano</label>
        <input
          id="_gotcha"
          name="_gotcha"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={gotcha}
          onChange={(e) => setGotcha(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-[var(--foreground)]">
          Nome e cognome <span className="text-red-700">*</span>
        </label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={onBlur("name")}
          className={ui.inputField}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "err-name" : undefined}
        />
        {errors.name ? (
          <p id="err-name" className="mt-1 text-sm text-red-700">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-[var(--foreground)]">
          Email <span className="text-red-700">*</span>
        </label>
        <input
          id="email"
          name="_replyto"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={onBlur("email")}
          className={ui.inputField}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "err-email" : undefined}
        />
        {errors.email ? (
          <p id="err-email" className="mt-1 text-sm text-red-700">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="subject" className="mb-1 block text-sm font-medium text-[var(--foreground)]">
          Oggetto
        </label>
        <input
          id="subject"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={ui.inputField}
        />
      </div>

      <div>
        <label htmlFor="city" className="mb-1 block text-sm font-medium text-[var(--foreground)]">
          Città / zona di interesse
        </label>
        <input
          id="city"
          name="city"
          placeholder="Es. Bornato, Brescia, Franciacorta"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className={ui.inputField}
        />
      </div>

      <div className="md:col-span-2">
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-[var(--foreground)]">
          Messaggio <span className="text-red-700">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onBlur={onBlur("message")}
          className={ui.inputField}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "err-msg" : undefined}
        />
        {errors.message ? (
          <p id="err-msg" className="mt-1 text-sm text-red-700">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="flex items-start gap-3 md:col-span-2">
        <input
          id="privacy"
          name="privacy"
          type="checkbox"
          checked={privacy}
          onChange={(e) => setPrivacy(e.target.checked)}
          onBlur={onBlur("privacy")}
          className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--primary-mid)] sm:mt-1"
          aria-invalid={!!errors.privacy}
        />
        <label htmlFor="privacy" className="text-[0.82rem] text-[var(--copy-body)] sm:text-sm">
          Ho letto e accetto la{" "}
          <Link href="/privacy-policy" className="font-semibold text-[var(--primary-mid)] underline underline-offset-2 hover:text-[var(--primary)]">
            privacy policy
          </Link>
          . <span className="text-red-700">*</span>
        </label>
      </div>
      {errors.privacy ? <p className="text-sm text-red-700 md:col-span-2">{errors.privacy}</p> : null}

      {status === "error" ? (
        <p className="text-sm text-red-700 md:col-span-2" role="alert">
          Invio non riuscito. Riprova o scrivi a {site.email}.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className={`${ui.btnPrimary} w-full sm:w-fit md:col-span-2`}
      >
        {status === "submitting" ? "Invio in corso…" : "Invia messaggio"}
      </button>
    </form>
  );
}
