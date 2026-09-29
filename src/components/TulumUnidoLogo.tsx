import React, { useState } from 'react';

interface TulumUnidoLogoProps {
  className?: string;
  variant?: 'full' | 'emblem' | 'compact' | 'banner-header';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// Hardcoded path directly to public folder asset
const HARDCODED_LOGO_PATH = '/logo.jpeg';

export const TulumUnidoLogo: React.FC<TulumUnidoLogoProps> = ({
  className = '',
  variant = 'full',
  size = 'lg',
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeDimensions = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-48 sm:w-56 max-w-full',
    xl: 'w-60 sm:w-72 max-w-full',
  };

  // Emblem thumbnail for top bar (reads directly from /public folder)
  if (variant === 'emblem') {
    if (!imageError) {
      return (
        <div className={`relative overflow-hidden rounded-full inline-flex items-center justify-center flex-shrink-0 bg-white ${className}`}>
          <img
            src={HARDCODED_LOGO_PATH}
            alt="Tulum Unido"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-7 h-7 object-cover rounded-full"
            loading="eager"
          />
        </div>
      );
    }

    return (
      <div className={`w-7 h-7 rounded-full bg-gradient-to-tr from-[#082d49] to-[#008f9f] flex items-center justify-center text-white font-black text-[11px] shadow-xs border border-white/20 flex-shrink-0 ${className}`}>
        TU
      </div>
    );
  }

  // Compact header version
  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {!imageError ? (
          <div className="w-12 h-12 rounded-xl overflow-hidden shadow-xs flex-shrink-0 bg-white border border-slate-100 p-0.5">
            <img
              src={HARDCODED_LOGO_PATH}
              alt="Tulum Unido"
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-contain"
              loading="eager"
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#082d49] via-[#0b3c62] to-[#008f9f] flex items-center justify-center text-white font-black text-base shadow-sm border border-teal-500/30 flex-shrink-0">
            TU
          </div>
        )}
        <div className="flex flex-col text-left">
          <span className="font-black text-[#082d49] leading-none text-lg tracking-tight font-['Cabinet_Grotesk',sans-serif]">
            TULUM <span className="text-[#008f9f]">UNIDO</span>
          </span>
          <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mt-0.5">
            Juntos por un mejor Tulum
          </span>
        </div>
      </div>
    );
  }

  // Full / Banner-header: Hardcoded from public folder asset (/logo.jpeg)
  return (
    <div className={`relative flex flex-col items-center justify-center text-center ${className}`}>
      {!imageError ? (
        <div className={`${sizeDimensions[size]} mx-auto relative flex items-center justify-center`}>
          <img
            src={HARDCODED_LOGO_PATH}
            alt="Tulum Unido - Juntos por un mejor Tulum"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-auto object-contain select-none drop-shadow-xs rounded-xl"
            loading="eager"
          />
        </div>
      ) : (
        /* Typographic branding display when no image file is present in public/ */
        <div className="py-2 px-4 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#082d49] via-[#093556] to-[#008f9f] flex items-center justify-center text-white shadow-md border-2 border-white mb-2.5">
            <span className="font-black text-2xl tracking-wider font-['Cabinet_Grotesk',sans-serif]">
              TU
            </span>
          </div>

          <div className="space-y-0.5">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-none font-['Cabinet_Grotesk',sans-serif]">
              <span className="text-[#082d49]">TULUM</span>{' '}
              <span className="text-[#008f9f]">UNIDO</span>
            </h1>

            <div className="flex items-center justify-center gap-2 pt-1 text-[#082d49]/80 font-bold text-xs sm:text-sm tracking-wider uppercase">
              <span className="w-5 h-0.5 bg-[#008f9f] rounded-full" />
              <span>Juntos por un mejor Tulum</span>
              <span className="w-5 h-0.5 bg-[#008f9f] rounded-full" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
