import React from 'react';

interface MandalaDividerProps {
  className?: string;
}

export const MandalaDivider: React.FC<MandalaDividerProps> = ({ className = 'my-8' }) => {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-[#D4AF37]/80" />
      <svg
        width="56"
        height="24"
        viewBox="0 0 56 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 text-[#D4AF37]"
      >
        <path
          d="M28 2C30.8 7 34.5 9.8 39 12C34.5 14.2 30.8 17 28 22C25.2 17 21.5 14.2 17 12C21.5 9.8 25.2 7 28 2Z"
          stroke="currentColor"
          strokeWidth="1.25"
          fill="rgba(212, 175, 55, 0.14)"
        />
        <circle cx="28" cy="12" r="2.75" fill="currentColor" />
        <path
          d="M12 12C9.5 10.2 6.5 10.2 4 12C6.5 13.8 9.5 13.8 12 12Z"
          stroke="currentColor"
          strokeWidth="1.1"
        />
        <path
          d="M44 12C46.5 10.2 49.5 10.2 52 12C49.5 13.8 46.5 13.8 44 12Z"
          stroke="currentColor"
          strokeWidth="1.1"
        />
        <circle cx="15" cy="12" r="1.2" fill="currentColor" opacity="0.8" />
        <circle cx="41" cy="12" r="1.2" fill="currentColor" opacity="0.8" />
      </svg>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#D4AF37]/50 to-[#D4AF37]/80" />
    </div>
  );
};
