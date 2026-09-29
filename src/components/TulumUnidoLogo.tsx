import React from 'react';

interface TulumUnidoLogoProps {
  className?: string;
  variant?: 'full' | 'emblem' | 'compact' | 'banner-header';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const TulumUnidoLogo: React.FC<TulumUnidoLogoProps> = ({
  className = '',
  variant = 'full',
  size = 'lg',
}) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-28 h-28 sm:w-32 sm:h-32',
    xl: 'w-36 h-36 sm:w-44 sm:h-44',
  };

  // Vector replication of "WhatsApp Image 2026-09-24 at 10.27.45 AM.jpeg"
  const emblemSvg = (
    <svg
      viewBox="0 0 300 300"
      className={`${sizeMap[size]} ${className} drop-shadow-sm select-none`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Logo Tulum Unido"
    >
      <defs>
        {/* Colors matching the image exactly */}
        {/* Deep Navy: #032b4b | Teal/Cyan: #008f9f */}
        <clipPath id="circleClip">
          <circle cx="150" cy="135" r="115" />
        </clipPath>
      </defs>

      {/* Circle Boundary Ring with crescent dynamic cut */}
      {/* Outer circular navy stroke */}
      <circle
        cx="150"
        cy="135"
        r="115"
        stroke="#032b4b"
        strokeWidth="11"
        strokeDasharray="600"
        strokeDashoffset="0"
        className="opacity-95"
      />

      <g clipPath="url(#circleClip)">
        {/* Sky Background */}
        <rect x="0" y="0" width="300" height="300" fill="#ffffff" />

        {/* Mayan Ruin Cliff Silhouette (El Castillo of Tulum) in Deep Navy */}
        <path
          d="M 50 170 
             L 65 145 
             L 80 142 
             L 85 130 
             L 100 130 
             L 105 110 
             L 110 102 
             L 145 102 
             L 150 110 
             L 155 130 
             L 175 132 
             L 185 155 
             L 220 162 
             L 225 178 
             L 50 178 Z"
          fill="#032b4b"
        />

        {/* Top Temple Tower */}
        <path
          d="M 108 85 
             L 148 85 
             L 148 103 
             L 108 103 Z"
          fill="#032b4b"
        />
        {/* Temple Entrance Window Opening */}
        <rect x="133" y="90" width="8" height="10" rx="0.5" fill="#ffffff" />

        {/* Palm Tree in Teal (#008f9f) */}
        {/* Curved Trunk */}
        <path
          d="M 194 170 C 196 145, 192 118, 196 98 C 199 98, 201 118, 200 170 Z"
          fill="#008f9f"
        />
        {/* Palm Fronds */}
        {/* Top frond */}
        <path d="M 196 95 C 198 75, 203 66, 212 64 C 206 74, 202 85, 198 96 Z" fill="#008f9f" />
        {/* Top-left frond */}
        <path d="M 196 95 C 183 78, 168 78, 162 82 C 175 87, 186 92, 196 96 Z" fill="#008f9f" />
        {/* Mid-left frond */}
        <path d="M 196 96 C 178 95, 160 101, 157 110 C 172 108, 185 105, 196 98 Z" fill="#008f9f" />
        {/* Top-right frond */}
        <path d="M 197 95 C 212 80, 228 80, 235 85 C 222 91, 212 94, 198 97 Z" fill="#008f9f" />
        {/* Mid-right frond */}
        <path d="M 197 97 C 216 98, 232 106, 235 115 C 220 113, 207 107, 197 100 Z" fill="#008f9f" />
        {/* Lower-right frond */}
        <path d="M 197 99 C 213 111, 223 123, 226 133 C 214 126, 206 117, 197 102 Z" fill="#008f9f" />

        {/* Ocean Waves */}
        {/* Top ocean wave in Deep Navy & Teal band */}
        <path
          d="M 35 178 
             C 75 160, 115 190, 155 174 
             C 195 158, 230 178, 265 170 
             L 265 188 
             C 230 196, 195 176, 155 192 
             C 115 208, 75 180, 35 196 Z"
          fill="#008f9f"
        />

        {/* Middle crisp white crest wave */}
        <path
          d="M 35 186 
             C 75 170, 115 200, 155 184 
             C 195 168, 230 188, 265 180 
             L 265 186 
             C 230 194, 195 174, 155 190 
             C 115 206, 75 178, 35 192 Z"
          fill="#ffffff"
        />

        {/* Lower wave in Teal */}
        <path
          d="M 35 194 
             C 75 178, 115 208, 155 192 
             C 195 176, 230 196, 265 188 
             L 265 210 
             C 230 218, 195 198, 155 214 
             C 115 230, 75 202, 35 218 Z"
          fill="#007e8c"
        />
      </g>

      {/* 3 United Figures holding hands and raising arms */}
      
      {/* Left Person (Teal #008f9f) */}
      <circle cx="108" cy="204" r="12" fill="#ffffff" stroke="#008f9f" strokeWidth="6" />
      {/* Left person body & arms */}
      <path
        d="M 72 208 
           C 78 240, 95 260, 110 260 
           C 122 260, 130 246, 133 222 
           C 124 222, 112 228, 104 228 
           C 90 228, 79 218, 72 208 Z"
        fill="#008f9f"
      />
      {/* Left arm stretching along the circle edge */}
      <path
        d="M 72 208 C 64 188, 55 162, 64 135"
        stroke="#008f9f"
        strokeWidth="9"
        strokeLinecap="round"
      />

      {/* Right Person (Teal #008f9f) */}
      <circle cx="192" cy="204" r="12" fill="#ffffff" stroke="#008f9f" strokeWidth="6" />
      {/* Right person body & arms */}
      <path
        d="M 228 208 
           C 222 240, 205 260, 190 260 
           C 178 260, 170 246, 167 222 
           C 176 222, 188 228, 196 228 
           C 210 228, 221 218, 228 208 Z"
        fill="#008f9f"
      />
      {/* Right arm stretching along the circle edge */}
      <path
        d="M 228 208 C 236 188, 245 162, 236 135"
        stroke="#008f9f"
        strokeWidth="9"
        strokeLinecap="round"
      />

      {/* Center Person (Deep Navy Blue #032b4b) with arms raised in 'V' shape */}
      <circle cx="150" cy="195" r="13" fill="#032b4b" />
      {/* Center torso */}
      <path
        d="M 132 216 
           C 132 216, 138 214, 150 214 
           C 162 214, 168 216, 168 216 
           L 168 270 
           L 132 270 Z"
        fill="#032b4b"
      />
      {/* Center raised arms */}
      <path
        d="M 125 190 
           C 132 205, 141 216, 150 216 
           C 159 216, 168 205, 175 190"
        stroke="#032b4b"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );

  if (variant === 'emblem') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{emblemSvg}</div>;
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {emblemSvg}
        <div className="flex flex-col text-left">
          <span className="font-black text-[#032b4b] leading-none text-lg tracking-tight font-['Cabinet_Grotesk',sans-serif]">
            TULUM <span className="text-[#008f9f]">UNIDO</span>
          </span>
          <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mt-0.5">
            Juntos por un mejor Tulum
          </span>
        </div>
      </div>
    );
  }

  // Full Variant: exactly matching "WhatsApp Image 2026-09-24 at 10.27.45 AM.jpeg"
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {/* Circular Emblem */}
      <div className="flex items-center justify-center">
        {emblemSvg}
      </div>

      {/* Typography: TULUM (Deep Navy) & UNIDO (Teal) */}
      <div className="mt-2 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-none text-[#032b4b] font-['Cabinet_Grotesk',sans-serif]">
          TULUM
        </h1>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-none text-[#008f9f] font-['Cabinet_Grotesk',sans-serif] mt-0.5">
          UNIDO
        </h2>
      </div>

      {/* Slogan with side divider lines: — JUNTOS POR UN MEJOR TULUM — */}
      <div className="flex items-center gap-2.5 mt-2 w-full max-w-xs justify-center px-4">
        <div className="h-[2px] w-6 sm:w-8 bg-[#008f9f] rounded-full" />
        <span className="text-[10.5px] sm:text-[11.5px] font-black tracking-wider text-[#032b4b] uppercase whitespace-nowrap">
          JUNTOS POR UN MEJOR TULUM
        </span>
        <div className="h-[2px] w-6 sm:w-8 bg-[#008f9f] rounded-full" />
      </div>
    </div>
  );
};
