export const inquiryTypeOptions = [
  { value: "slam", label: "Rilievo laser scanner SLAM" },
  { value: "topografia", label: "Topografia e rilievi" },
  { value: "altro", label: "Altro (verde, pratiche, architettura…)" },
] as const;

export type InquiryType = (typeof inquiryTypeOptions)[number]["value"];

export const surfaceAreaOptions = [
  { value: "", label: "Seleziona (opzionale)" },
  { value: "under-500", label: "Meno di 500 m²" },
  { value: "500-2000", label: "500 – 2.000 m²" },
  { value: "2000-10000", label: "2.000 – 10.000 m²" },
  { value: "over-10000", label: "Oltre 10.000 m²" },
  { value: "unknown", label: "Non so / da valutare" },
] as const;

export const desiredOutputOptions = [
  { value: "", label: "Seleziona (opzionale)" },
  { value: "pointcloud", label: "Nuvola di punti (E57 / LAS)" },
  { value: "cad", label: "Piante e sezioni CAD (DWG)" },
  { value: "bim", label: "Modello BIM (IFC)" },
  { value: "asbuilt", label: "As-built / verifica interferenze" },
  { value: "tbd", label: "Da definire insieme" },
] as const;

export function labelForInquiryType(value: string): string {
  return inquiryTypeOptions.find((o) => o.value === value)?.label ?? value;
}

export function labelForSurfaceArea(value: string): string {
  return surfaceAreaOptions.find((o) => o.value === value)?.label ?? (value || "—");
}

export function labelForDesiredOutput(value: string): string {
  return desiredOutputOptions.find((o) => o.value === value)?.label ?? (value || "—");
}
