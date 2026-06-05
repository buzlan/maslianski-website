import React from "react";

interface CountryFlagProps {
  code: string;
  className?: string;
}

const CountryFlag: React.FC<CountryFlagProps> = ({ code, className = "w-6 h-4" }) => {
  // SVG флаги для стран
  const flags: Record<string, React.ReactElement> = {
    RU: (
      <svg viewBox="0 0 9 6" className={className} preserveAspectRatio="none">
        <rect width="9" height="2" fill="#fff" />
        <rect y="2" width="9" height="2" fill="#0039a6" />
        <rect y="4" width="9" height="2" fill="#d52b1e" />
      </svg>
    ),
    BY: (
      <svg viewBox="0 0 9 6" className={className} preserveAspectRatio="none">
        <rect width="9" height="3" fill="#d52b1e" />
        <rect y="3" width="9" height="3" fill="#006b3f" />
        <rect width="2" height="6" fill="#fff" />
        <rect width="1.5" height="6" fill="#d52b1e" />
      </svg>
    ),
    KZ: (
      <svg viewBox="0 0 9 6" className={className} preserveAspectRatio="none">
        <rect width="9" height="6" fill="#00afca" />
        <circle cx="4.5" cy="3" r="0.8" fill="#ffce00" />
        <path d="M4.5 1.8l0.2 0.6-0.5-0.3h0.6l-0.5 0.3z" fill="#ffce00" />
        <path d="M5.5 2.5l0.2 0.6-0.5-0.3h0.6l-0.5 0.3z" fill="#ffce00" />
        <path d="M6 3.8l0.2 0.6-0.5-0.3h0.6l-0.5 0.3z" fill="#ffce00" />
        <path d="M5.5 4.5l0.2 0.6-0.5-0.3h0.6l-0.5 0.3z" fill="#ffce00" />
        <path d="M4.5 4.8l0.2 0.6-0.5-0.3h0.6l-0.5 0.3z" fill="#ffce00" />
        <path d="M3.5 4.5l0.2 0.6-0.5-0.3h0.6l-0.5 0.3z" fill="#ffce00" />
        <path d="M3 3.8l0.2 0.6-0.5-0.3h0.6l-0.5 0.3z" fill="#ffce00" />
        <path d="M3.5 2.5l0.2 0.6-0.5-0.3h0.6l-0.5 0.3z" fill="#ffce00" />
      </svg>
    ),
    AM: (
      <svg viewBox="0 0 9 6" className={className} preserveAspectRatio="none">
        <rect width="9" height="2" fill="#d90012" />
        <rect y="2" width="9" height="2" fill="#0033a0" />
        <rect y="4" width="9" height="2" fill="#f2a800" />
      </svg>
    ),
    GE: (
      <svg viewBox="0 0 9 6" className={className} preserveAspectRatio="none">
        <rect width="9" height="6" fill="#fff" />
        <rect x="3" y="1" width="3" height="4" fill="#ff0000" />
        <rect x="1" y="2.5" width="7" height="1" fill="#ff0000" />
        <rect x="1" y="1" width="1" height="1" fill="#ff0000" />
        <rect x="7" y="1" width="1" height="1" fill="#ff0000" />
        <rect x="1" y="4" width="1" height="1" fill="#ff0000" />
        <rect x="7" y="4" width="1" height="1" fill="#ff0000" />
      </svg>
    ),
  };

  return (
    // Размер флага задаём переданным className у SVG, чтобы он корректно выравнивался по высоте.
    <span className="inline-flex items-center justify-center flex-shrink-0">
      {flags[code] || <span className="text-gray-400 text-xs">🏳️</span>}
    </span>
  );
};

export default CountryFlag;

