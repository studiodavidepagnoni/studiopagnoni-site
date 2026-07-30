"use client";

import { useEffect, useId, useRef, useCallback } from "react";

type Props = {
  siteKey: string;
  onTokenChange: (token: string) => void;
  className?: string;
};

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      render: (
        container: string | HTMLElement,
        parameters: {
          sitekey: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark";
        },
      ) => number;
      reset: (widgetId?: number) => void;
      getResponse: (widgetId?: number) => string;
    };
  }
}

const SCRIPT_ID = "google-recaptcha-v2";
const SCRIPT_SRC = "https://www.google.com/recaptcha/api.js?render=explicit";

function loadRecaptchaScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.grecaptcha?.render) return Promise.resolve();

  const existing = document.getElementById(SCRIPT_ID);
  if (existing) {
    return new Promise((resolve) => {
      const check = () => {
        if (window.grecaptcha?.render) resolve();
        else window.setTimeout(check, 50);
      };
      check();
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("reCAPTCHA script load failed"));
    document.head.appendChild(script);
  });
}

/** Widget reCAPTCHA v2 (checkbox) — Formspree verifica il token se CAPTCHA è abilitato in dashboard. */
export function RecaptchaField({ siteKey, onTokenChange, className = "" }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<number | null>(null);
  const onTokenChangeRef = useRef(onTokenChange);
  const reactId = useId().replace(/:/g, "");

  useEffect(() => {
    onTokenChangeRef.current = onTokenChange;
  }, [onTokenChange]);

  const reset = useCallback(() => {
    if (widgetIdRef.current !== null && window.grecaptcha) {
      window.grecaptcha.reset(widgetIdRef.current);
    }
    onTokenChangeRef.current("");
  }, []);

  useEffect(() => {
    let cancelled = false;

    loadRecaptchaScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.grecaptcha) return;
        window.grecaptcha.ready(() => {
          if (cancelled || !containerRef.current || widgetIdRef.current !== null) return;
          widgetIdRef.current = window.grecaptcha!.render(containerRef.current, {
            sitekey: siteKey,
            callback: (token) => onTokenChangeRef.current(token),
            "expired-callback": () => onTokenChangeRef.current(""),
            "error-callback": () => onTokenChangeRef.current(""),
            theme: "light",
          });
        });
      })
      .catch(() => {
        onTokenChangeRef.current("");
      });

    return () => {
      cancelled = true;
      reset();
      widgetIdRef.current = null;
      const container = containerRef.current;
      if (container) container.innerHTML = "";
    };
  }, [siteKey, reset]);

  return (
    <div className={className}>
      <div ref={containerRef} id={`recaptcha-${reactId}`} />
    </div>
  );
}

export function resetRecaptchaWidgets() {
  try {
    window.grecaptcha?.reset();
  } catch {
    /* ignore */
  }
}
