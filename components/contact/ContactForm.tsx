"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { RecaptchaField, resetRecaptchaWidgets } from "@/components/contact/RecaptchaField";
import {
  desiredOutputOptions,
  inquiryTypeOptions,
  labelForDesiredOutput,
  labelForInquiryType,
  labelForSurfaceArea,
  surfaceAreaOptions,
  type InquiryType,
} from "@/lib/config/contactFormOptions";
import { site } from "@/lib/config/site";
import {
  CONTACT_FIELD_LIMITS as LIM,
  CONTACT_MIN_ELAPSED_MS,
  PRIVACY_CONSENT_VERSION,
} from "@/lib/security/csp";
import { ui } from "@/lib/ui";

type FieldErrors = Partial<Record<"name" | "email" | "message" | "privacy" | "captcha", string>>;

export type ContactFormProps = {
  defaultSubject?: string;
  defaultInquiryType?: InquiryType | "";
};

function clamp(value: string, max: number) {
  return value.length <= max ? value : value.slice(0, max);
}

export function ContactForm({ defaultSubject = "", defaultInquiryType = "" }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(defaultSubject);
  const [inquiryType, setInquiryType] = useState(defaultInquiryType);
  const [surfaceArea, setSurfaceArea] = useState("");
  const [desiredOutput, setDesiredOutput] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [gotcha, setGotcha] = useState("");
  const [companyHp, setCompanyHp] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const mountedAtRef = useRef(0);

  const recaptchaSiteKey = site.recaptchaSiteKey;
  const captchaRequired = Boolean(recaptchaSiteKey);

  useEffect(() => {
    mountedAtRef.current = Date.now();
  }, []);

  useEffect(() => {
    setSubject(defaultSubject);
    setInquiryType(defaultInquiryType);
  }, [defaultSubject, defaultInquiryType]);

  const errors: FieldErrors = useMemo(() => {
    const e: FieldErrors = {};
    if (touched.name && name.trim().length < 2) e.name = "Inserisci nome e cognome.";
    if (touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Email non valida.";
    if (touched.message && message.trim().length < 10) e.message = "Messaggio troppo breve (min. 10 caratteri).";
    if (touched.privacy && !privacy) e.privacy = "Accetta la privacy per inviare.";
    if (touched.captcha && captchaRequired && !captchaToken) e.captcha = "Completa il controllo anti-spam.";
    return e;
  }, [name, email, message, privacy, captchaToken, captchaRequired, touched]);

  const valid =
    name.trim().length >= 2 &&
    name.trim().length <= LIM.name &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    email.length <= LIM.email &&
    message.trim().length >= 10 &&
    message.length <= LIM.message &&
    privacy &&
    (!captchaRequired || captchaToken.length > 0);

  const onBlur = (field: string) => () => setTouched((t) => ({ ...t, [field]: true }));

  const buildExtraFieldsText = useCallback(() => {
    const lines: string[] = [];
    if (inquiryType) lines.push(`Tipo richiesta: ${labelForInquiryType(inquiryType)}`);
    if (surfaceArea) lines.push(`Superficie indicativa: ${labelForSurfaceArea(surfaceArea)}`);
    if (desiredOutput) lines.push(`Output desiderato: ${labelForDesiredOutput(desiredOutput)}`);
    return lines.length ? `${lines.join("\n")}\n\n` : "";
  }, [inquiryType, surfaceArea, desiredOutput]);

  const clearFields = useCallback(() => {
    setName("");
    setEmail("");
    setSubject(defaultSubject);
    setInquiryType(defaultInquiryType);
    setSurfaceArea("");
    setDesiredOutput("");
    setCity("");
    setMessage("");
    setPrivacy(false);
    setGotcha("");
    setCompanyHp("");
    setCaptchaToken("");
    setTouched({});
    resetRecaptchaWidgets();
  }, [defaultSubject, defaultInquiryType]);

  const resetForm = useCallback(() => {
    setStatus("idle");
    clearFields();
    mountedAtRef.current = Date.now();
  }, [clearFields]);

  const onSubmit = useCallback(
    async (ev: React.FormEvent) => {
      ev.preventDefault();
      setTouched({ name: true, email: true, message: true, privacy: true, captcha: true });
      if (!valid || !privacy) return;

      // Honeypot: bots that fill hidden fields get a fake success (no network).
      if (gotcha.trim().length > 0 || companyHp.trim().length > 0) {
        setStatus("success");
        clearFields();
        return;
      }

      // Timing trap: instant submissions are rejected silently as success.
      if (Date.now() - mountedAtRef.current < CONTACT_MIN_ELAPSED_MS) {
        setStatus("success");
        clearFields();
        return;
      }

      if (captchaRequired && !captchaToken) return;

      setStatus("submitting");
      const subjectLine = clamp(
        subject?.trim() ||
          (inquiryType === "slam" ? "Preventivo rilievo laser SLAM" : "Richiesta da sito web"),
        LIM.subject,
      );
      const extra = buildExtraFieldsText();
      const safeName = clamp(name.trim(), LIM.name);
      const safeEmail = clamp(email.trim(), LIM.email);
      const safeCity = clamp(city.trim(), LIM.city);
      const safeMessage = clamp(`${extra}${message.trim()}`, LIM.message);

      try {
        const id = site.formspreeId?.trim();
        if (!id) {
          const sj = encodeURIComponent(subjectLine);
          const body = encodeURIComponent(
            `Nome: ${safeName}\nEmail: ${safeEmail}\nZona: ${safeCity || "-"}\n\n${safeMessage}`,
          );
          window.location.href = `mailto:${site.email}?subject=${sj}&body=${body}`;
          setStatus("success");
          clearFields();
          return;
        }

        const payload: Record<string, string> = {
          name: safeName,
          _replyto: safeEmail,
          email: safeEmail,
          _gotcha: "",
          _subject: `[Sito] ${subjectLine}`,
          subject: subjectLine,
          inquiryType: inquiryType ? labelForInquiryType(inquiryType) : "",
          surfaceArea: surfaceArea ? labelForSurfaceArea(surfaceArea) : "",
          desiredOutput: desiredOutput ? labelForDesiredOutput(desiredOutput) : "",
          city: safeCity,
          message: safeMessage,
          // Solo se checkbox davvero spuntata in sessione UI (non inviare mai se false).
          privacyConsent: "Sì, accettata",
          privacyConsentAt: new Date().toISOString(),
          privacyConsentVersion: PRIVACY_CONSENT_VERSION,
          privacyConsentSource: "contact-form-ui",
        };

        if (captchaToken) {
          payload["g-recaptcha-response"] = captchaToken;
        }

        const res = await fetch(`https://formspree.io/f/${id}`, {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          setStatus("success");
          clearFields();
        } else {
          setStatus("error");
          resetRecaptchaWidgets();
          setCaptchaToken("");
        }
      } catch {
        setStatus("error");
        resetRecaptchaWidgets();
        setCaptchaToken("");
      }
    },
    [
      valid,
      privacy,
      gotcha,
      companyHp,
      captchaRequired,
      captchaToken,
      name,
      email,
      subject,
      inquiryType,
      city,
      message,
      buildExtraFieldsText,
      surfaceArea,
      desiredOutput,
      clearFields,
    ],
  );

  const statusMessage =
    status === "submitting"
      ? "Invio del messaggio in corso…"
      : status === "success"
        ? "Messaggio inviato. Ti risponderemo al più presto."
        : status === "error"
          ? `Invio non riuscito. Riprova o scrivi a ${site.email}.`
          : "";

  return (
    <div className="w-full">
      <div className="sr-only" aria-live="polite" aria-atomic="true" role="status">
        {statusMessage}
      </div>

      {status === "success" ? (
        <div
          className="contact-form-feedback contact-form-feedback--success mb-5 sm:mb-6"
          role="status"
          aria-labelledby="contact-form-success-title"
        >
          <p id="contact-form-success-title" className="contact-form-feedback__title">
            Messaggio inviato
          </p>
          <p className="contact-form-feedback__body">
            Grazie per averci scritto. Ti risponderemo al più presto all&apos;indirizzo indicato.
          </p>
          <button type="button" className={`${ui.btnOutline} mt-4 min-h-[44px]`} onClick={resetForm}>
            Invia un altro messaggio
          </button>
        </div>
      ) : null}

      {status === "error" ? (
        <div className="contact-form-feedback contact-form-feedback--error mb-5 sm:mb-6" role="alert">
          <p className="contact-form-feedback__title">Invio non riuscito</p>
          <p className="contact-form-feedback__body">
            Controlla la connessione e riprova. In alternativa scrivi a{" "}
            <a href={`mailto:${site.email}`} className="font-semibold underline underline-offset-2">
              {site.email}
            </a>
            .
          </p>
        </div>
      ) : null}

      {status !== "success" ? (
        <form
          onSubmit={onSubmit}
          className="grid w-full gap-3 sm:gap-4 md:grid-cols-2"
          noValidate
          aria-busy={status === "submitting"}
        >
          <div
            aria-hidden
            className="hidden"
            style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}
          >
            <label htmlFor="_gotcha">Non compilare se sei umano</label>
            <input
              id="_gotcha"
              name="_gotcha"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={gotcha}
              onChange={(e) => setGotcha(clamp(e.target.value, LIM.companyHoneypot))}
            />
            <label htmlFor="company">Azienda</label>
            <input
              id="company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={companyHp}
              onChange={(e) => setCompanyHp(clamp(e.target.value, LIM.companyHoneypot))}
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="inquiryType" className="mb-1 block text-sm font-medium text-[var(--foreground)]">
              Tipo di richiesta
            </label>
            <select
              id="inquiryType"
              name="inquiryType"
              value={inquiryType}
              onChange={(e) => setInquiryType(e.target.value as InquiryType | "")}
              className={ui.inputField}
            >
              <option value="">Seleziona</option>
              {inquiryTypeOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-[var(--foreground)]">
              Nome e cognome <span className="text-red-700">*</span>
            </label>
            <input
              id="name"
              name="name"
              autoComplete="name"
              maxLength={LIM.name}
              value={name}
              onChange={(e) => setName(clamp(e.target.value, LIM.name))}
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
              maxLength={LIM.email}
              value={email}
              onChange={(e) => setEmail(clamp(e.target.value, LIM.email))}
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
            <label htmlFor="surfaceArea" className="mb-1 block text-sm font-medium text-[var(--foreground)]">
              Superficie indicativa
            </label>
            <select
              id="surfaceArea"
              name="surfaceArea"
              value={surfaceArea}
              onChange={(e) => setSurfaceArea(e.target.value)}
              className={ui.inputField}
            >
              {surfaceAreaOptions.map((o) => (
                <option key={o.value || "empty"} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="desiredOutput" className="mb-1 block text-sm font-medium text-[var(--foreground)]">
              Output desiderato
            </label>
            <select
              id="desiredOutput"
              name="desiredOutput"
              value={desiredOutput}
              onChange={(e) => setDesiredOutput(e.target.value)}
              className={ui.inputField}
            >
              {desiredOutputOptions.map((o) => (
                <option key={o.value || "empty"} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="subject" className="mb-1 block text-sm font-medium text-[var(--foreground)]">
              Oggetto
            </label>
            <input
              id="subject"
              name="subject"
              maxLength={LIM.subject}
              value={subject}
              onChange={(e) => setSubject(clamp(e.target.value, LIM.subject))}
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
              maxLength={LIM.city}
              placeholder="Es. Franciacorta, Brescia, Nord Italia"
              value={city}
              onChange={(e) => setCity(clamp(e.target.value, LIM.city))}
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
              maxLength={LIM.message}
              value={message}
              onChange={(e) => setMessage(clamp(e.target.value, LIM.message))}
              onBlur={onBlur("message")}
              placeholder="Descrivi immobile, finalità del rilievo e tempistiche desiderate."
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

          <div className="flex min-h-[48px] items-start gap-3 md:col-span-2">
            <input
              id="privacy"
              name="privacy"
              type="checkbox"
              checked={privacy}
              onChange={(e) => setPrivacy(e.target.checked)}
              onBlur={onBlur("privacy")}
              className="mt-1.5 h-5 w-5 min-h-[20px] min-w-[20px] shrink-0 accent-[var(--primary-mid)]"
              aria-invalid={!!errors.privacy}
              aria-describedby={errors.privacy ? "err-privacy" : undefined}
            />
            <label
              htmlFor="privacy"
              className="min-h-[48px] flex-1 cursor-pointer py-2 text-base leading-relaxed text-[var(--copy-body)] sm:text-sm"
            >
              <span className="inline">
                Ho letto e accetto la{" "}
                <Link
                  href="/privacy-policy"
                  className="font-semibold text-[var(--accent-brand)] underline underline-offset-2 hover:text-[var(--foreground)]"
                >
                  privacy policy
                </Link>
                . <span className="text-red-700">*</span>
              </span>
            </label>
          </div>

          {errors.privacy ? (
            <p id="err-privacy" className="text-sm text-red-700 md:col-span-2" role="alert">
              {errors.privacy}
            </p>
          ) : null}

          {recaptchaSiteKey ? (
            <div className="md:col-span-2">
              <RecaptchaField siteKey={recaptchaSiteKey} onTokenChange={setCaptchaToken} />
              {errors.captcha ? (
                <p id="err-captcha" className="mt-2 text-sm text-red-700" role="alert">
                  {errors.captcha}
                </p>
              ) : null}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={status === "submitting"}
            className={`${ui.btnPrimary} w-full sm:w-fit md:col-span-2`}
          >
            {status === "submitting" ? "Invio in corso…" : "Invia messaggio"}
          </button>
        </form>
      ) : null}
    </div>
  );
}
