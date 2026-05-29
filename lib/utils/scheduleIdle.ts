type IdleWindow = Window & {
  requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
  cancelIdleCallback?: (handle: number) => void;
};

/** Esegue `cb` in idle (o dopo `timeoutMs` al massimo). */
export function scheduleIdle(cb: () => void, timeoutMs = 2000): () => void {
  if (typeof window === "undefined") return () => {};

  const idleWindow = window as IdleWindow;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let idleId: number | undefined;

  const run = () => {
    timeoutId = undefined;
    idleId = undefined;
    cb();
  };

  if (idleWindow.requestIdleCallback) {
    idleId = idleWindow.requestIdleCallback(run, { timeout: timeoutMs });
  } else {
    timeoutId = globalThis.setTimeout(run, Math.min(timeoutMs, 1200));
  }

  return () => {
    if (idleId !== undefined) idleWindow.cancelIdleCallback?.(idleId);
    if (timeoutId !== undefined) globalThis.clearTimeout(timeoutId);
  };
}
