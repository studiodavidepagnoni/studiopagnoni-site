/** iOS Safari (esclude Chrome/Firefox/Edge su iOS). */
export function isIosSafari(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const iOS =
    /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  if (!iOS) return false;
  return /WebKit/i.test(ua) && !/CriOS|FxiOS|OPiOS|EdgiOS/i.test(ua);
}
