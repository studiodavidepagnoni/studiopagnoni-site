/** Campo da tavola topografica — curve di livello + stazione, non icona. */
export function TopoContourField({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 520 300" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden>
      <defs>
        <pattern id="topo-grid-home" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" stroke="currentColor" strokeWidth="0.45" opacity="0.28" />
        </pattern>
      </defs>
      <rect width="520" height="300" fill="url(#topo-grid-home)" opacity="0.55" />

      <g stroke="currentColor" strokeWidth="0.7" opacity="0.22">
        {Array.from({ length: 13 }, (_, i) => (
          <line key={`vt-${i}`} x1={i * 40} y1="0" x2={i * 40} y2="8" />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <line key={`ht-${i}`} x1="0" y1={i * 40} x2="8" y2={i * 40} />
        ))}
      </g>

      <g stroke="currentColor" strokeLinecap="round" fill="none">
        <path d="M-20 248C70 238 150 258 250 246C350 234 430 252 540 240" strokeWidth="0.85" opacity="0.38" />
        <path d="M-20 218C80 206 155 228 255 212C360 196 430 218 540 204" strokeWidth="0.9" opacity="0.42" />
        <path d="M-16 188C90 172 160 198 262 178C358 160 428 182 536 168" strokeWidth="1" opacity="0.48" />
        <path d="M8 162C108 146 178 168 278 150C368 134 430 154 520 142" strokeWidth="1.05" opacity="0.55" />
        <path d="M48 138C138 122 198 144 292 124C372 108 428 128 508 118" strokeWidth="1.1" opacity="0.62" />
        <path d="M92 116C168 102 228 122 310 104C378 90 428 108 492 98" strokeWidth="1.15" opacity="0.7" />
        <path d="M138 96C200 86 248 102 318 88C372 78 416 92 470 84" strokeWidth="1.2" opacity="0.78" />
        <path d="M188 80C238 72 278 86 332 76C372 68 408 80 448 74" strokeWidth="1.25" opacity="0.86" />
      </g>

      <g stroke="currentColor" fill="none" transform="translate(312 108)">
        <line x1="-22" y1="0" x2="22" y2="0" strokeWidth="1.1" opacity="0.85" />
        <line x1="0" y1="-22" x2="0" y2="22" strokeWidth="1.1" opacity="0.85" />
        <circle cx="0" cy="0" r="11" strokeWidth="1.05" opacity="0.7" />
        <path d="M0 -16 L7.4 12 H-7.4 Z" strokeWidth="1.15" strokeLinejoin="miter" opacity="0.92" />
        <circle cx="0" cy="0" r="1.7" fill="currentColor" stroke="none" />
      </g>

      <g fill="currentColor" opacity="0.72">
        <text x="496" y="22" textAnchor="end" fontSize="11" fontFamily="ui-sans-serif, system-ui, sans-serif" letterSpacing="0.28em">
          N
        </text>
        <rect x="492.5" y="26" width="1" height="10" />
      </g>
    </svg>
  );
}

export function PlateFrame() {
  return (
    <span className="survey-plate-frame" aria-hidden>
      <span className="survey-plate-frame__c survey-plate-frame__c--tl" />
      <span className="survey-plate-frame__c survey-plate-frame__c--tr" />
      <span className="survey-plate-frame__c survey-plate-frame__c--bl" />
      <span className="survey-plate-frame__c survey-plate-frame__c--br" />
    </span>
  );
}
