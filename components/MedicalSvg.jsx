export function VacutainerSvg({ capColor = "#8B5CF6", className = "w-5 h-8" }) {
  return (
    <svg className={className} viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Rubber Cap */}
      <rect x="5" y="1" width="14" height="7" rx="2" fill={capColor} stroke="#26352F" strokeWidth="1" />
      <rect x="7" y="8" width="10" height="2" fill={capColor} />
      {/* Glass Tube */}
      <path d="M6 10H18V32C18 35.3137 15.3137 38 12 38C8.68629 38 6 35.3137 6 32V10Z" fill="#F4F8F5" stroke="#26352F" strokeWidth="1.2" />
      {/* Blood Level */}
      <path d="M6.5 22H17.5V32C17.5 35.0376 15.0376 37.5 12 37.5C8.96243 37.5 6.5 35.0376 6.5 32V22Z" fill="#E11D48" />
      {/* Measurement Graduation Lines */}
      <line x1="7" y1="14" x2="11" y2="14" stroke="#68736A" strokeWidth="0.8" />
      <line x1="7" y1="17" x2="13" y2="17" stroke="#68736A" strokeWidth="0.8" />
      <line x1="7" y1="20" x2="11" y2="20" stroke="#68736A" strokeWidth="0.8" />
      {/* Glass Reflection */}
      <path d="M15.5 12V30" stroke="white" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export function BloodDropCross({ className = "w-6 h-6 text-rose-600" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      <path d="M11 9h2v2h2v2h-2v2h-2v-2H9v-2h2V9z" fill="white" />
    </svg>
  );
}

export function EcgPulse({ className = "w-6 h-6 text-care" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

export function MicroscopeSvg({ className = "w-6 h-6 text-care" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 18h8" />
      <path d="M3 22h18" />
      <path d="M14 22a7 7 0 1 0 0-14h-1" />
      <path d="M9 14h2" />
      <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
      <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
    </svg>
  );
}

export function BarcodeSvg({ className = "w-24 h-6 opacity-40" }) {
  return (
    <svg className={className} viewBox="0 0 100 24" fill="currentColor">
      <rect x="2" y="2" width="3" height="20" />
      <rect x="7" y="2" width="1.5" height="20" />
      <rect x="11" y="2" width="4" height="20" />
      <rect x="17" y="2" width="2" height="20" />
      <rect x="21" y="2" width="1" height="20" />
      <rect x="24" y="2" width="5" height="20" />
      <rect x="31" y="2" width="2" height="20" />
      <rect x="35" y="2" width="4" height="20" />
      <rect x="41" y="2" width="1" height="20" />
      <rect x="44" y="2" width="3.5" height="20" />
      <rect x="50" y="2" width="2" height="20" />
      <rect x="54" y="2" width="4" height="20" />
      <rect x="60" y="2" width="1.5" height="20" />
      <rect x="63" y="2" width="3" height="20" />
      <rect x="68" y="2" width="5" height="20" />
      <rect x="75" y="2" width="2" height="20" />
      <rect x="79" y="2" width="1" height="20" />
      <rect x="82" y="2" width="3.5" height="20" />
      <rect x="88" y="2" width="2" height="20" />
      <rect x="92" y="2" width="4" height="20" />
      <rect x="98" y="2" width="1.5" height="20" />
    </svg>
  );
}

export function LabVerifiedStamp({ className = "w-20 h-7" }) {
  return (
    <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border border-emerald-600 bg-emerald-50/90 text-emerald-800 text-[10px] font-bold tracking-wider uppercase ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
      <span>LAB VERIFIED</span>
    </div>
  );
}

export function OrganIcon({ type, className = "w-4 h-4" }) {
  switch (type) {
    case "heart":
    case "cardiac":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      );
    case "liver":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.8 4.2C15.9 2.5 11.6 3 8.3 5.4 5 7.8 3.5 11.7 4 15.8c.4 3.7 3.5 6.7 7.2 6.7 4.9 0 9.8-3.9 10.6-8.8.8-4.7-1.1-8.1-3-9.5z"/>
        </svg>
      );
    case "kidney":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.5 2 5 4.5 5 8.5c0 4 2 7 4 10s4.5 3.5 6 3.5 4-2.5 4-6.5c0-3.5-1.5-6-3.5-8.5C14.2 3.8 13.1 2 12 2z"/>
        </svg>
      );
    case "thyroid":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 4c-1.5 2-2 5-1 8s3.5 5 5 5c1 0 1.5-.5 2-1.5.5 1 1 1.5 2 1.5 1.5 0 4-2 5-5s.5-6-1-8c-.8 2-2.5 3-4 3h-4c-1.5 0-3.2-1-4-3z"/>
        </svg>
      );
    case "blood":
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      );
  }
}
