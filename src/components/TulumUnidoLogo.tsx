import React, { useRef } from 'react';
import { Upload, RotateCcw } from 'lucide-react';

interface TulumUnidoLogoProps {
  className?: string;
  variant?: 'full' | 'emblem' | 'compact' | 'banner-header';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  customLogoUrl?: string;
  onUploadLogo?: (dataUrl: string) => void;
  onResetLogo?: () => void;
}

export const TulumUnidoLogo: React.FC<TulumUnidoLogoProps> = ({
  className = '',
  variant = 'full',
  size = 'lg',
  customLogoUrl,
  onUploadLogo,
  onResetLogo,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Strictly use image file - NO SVG
  const activeImage = customLogoUrl || '/logotu.jpeg';

  const sizeDimensions = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-48 sm:w-56 max-w-full',
    xl: 'w-60 sm:w-72 max-w-full',
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUploadLogo) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        if (event.target?.result) {
          const dataUrl = event.target.result as string;
          onUploadLogo(dataUrl);

          // Save to server disk in public/logotu.jpeg
          try {
            await fetch('/api/save-logo', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ imageBase64: dataUrl }),
            });
          } catch {
            // safe fallback
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Emblem thumbnail for top bar (Pure image)
  if (variant === 'emblem') {
    return (
      <div className={`relative overflow-hidden rounded-full inline-flex items-center justify-center flex-shrink-0 bg-white ${className}`}>
        <img
          src={activeImage}
          alt="Tulum Unido"
          referrerPolicy="no-referrer"
          className="w-8 h-8 object-cover object-top scale-[1.25] transform"
          loading="eager"
        />
      </div>
    );
  }

  // Compact header version (Pure image)
  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="w-12 h-12 rounded-xl overflow-hidden shadow-xs flex-shrink-0 bg-white border border-slate-100 p-0.5">
          <img
            src={activeImage}
            alt="Tulum Unido"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain"
            loading="eager"
          />
        </div>
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

  // Full / Banner-header: Displays the exact user image
  return (
    <div className={`relative flex flex-col items-center justify-center text-center group ${className}`}>
      {/* Hidden file input for uploading the exact logo */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Cargar archivo de logo"
      />

      <div className={`${sizeDimensions[size]} mx-auto relative flex items-center justify-center`}>
        <img
          src={activeImage}
          alt="Tulum Unido - Juntos por un mejor Tulum"
          referrerPolicy="no-referrer"
          className="w-full h-auto object-contain select-none drop-shadow-xs rounded-xl"
          loading="eager"
        />

        {/* Hover / tap button to upload the exact logotu.jpeg file */}
        {onUploadLogo && (
          <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 backdrop-blur-[2px] p-2 text-white">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-1.5 bg-white text-slate-900 font-bold text-xs rounded-lg shadow-md hover:bg-slate-100 flex items-center gap-1.5 active:scale-95 transition-transform"
            >
              <Upload className="w-3.5 h-3.5 text-teal-600" />
              <span>Seleccionar logotu.jpeg</span>
            </button>
            {customLogoUrl && onResetLogo && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onResetLogo();
                }}
                className="px-2.5 py-1 bg-black/50 text-white hover:bg-black/70 font-semibold text-[10px] rounded-md flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Restablecer</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Prominent one-click button below the logo to select logotu.jpeg from device */}
      {onUploadLogo && !customLogoUrl && (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="mt-2.5 px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100/80 text-teal-800 text-[11px] font-bold border border-teal-200/80 shadow-xs transition-all flex items-center gap-1.5 active:scale-95"
        >
          <Upload className="w-3.5 h-3.5 text-teal-600" />
          <span>Haz clic aquí para seleccionar tu archivo logotu.jpeg</span>
        </button>
      )}
    </div>
  );
};
