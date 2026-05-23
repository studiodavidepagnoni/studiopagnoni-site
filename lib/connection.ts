/** Network Information API (Chrome / Edge / alcuni Android). */
export type NetworkInformationLite = {
  saveData?: boolean;
  effectiveType?: string;
  addEventListener?: (type: "change", listener: () => void) => void;
  removeEventListener?: (type: "change", listener: () => void) => void;
};

export function networkInformation(): NetworkInformationLite | undefined {
  if (typeof navigator === "undefined") return undefined;
  return (navigator as Navigator & { connection?: NetworkInformationLite }).connection;
}

/** Risparmio dati esplicito o rete molto lenta → hero senza download video. */
export function prefersSaveData(): boolean {
  const conn = networkInformation();
  if (!conn) return false;
  if (conn.saveData) return true;
  const type = conn.effectiveType;
  return type === "slow-2g" || type === "2g" || type === "3g" || type === "slow-4g";
}
