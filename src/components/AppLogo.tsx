import React from 'react';

interface AppLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  subtitle?: string;
  className?: string;
}

export const AppIconGraphic: React.FC<{ sizePx?: number; className?: string }> = ({
  sizePx = 48,
  className = '',
}) => {
  return (
    <div
      className={`relative flex items-center justify-center select-none shadow-lg shadow-rose-500/25 ${className}`}
      style={{
        width: sizePx,
        height: sizePx,
        borderRadius: `${Math.round(sizePx * 0.28)}px`,
        background: 'linear-gradient(135deg, #FF416C 0%, #FF4B2B 50%, #FF8A00 100%)',
      }}
    >
      {/* Glossy overlay effect */}
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-40"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
        }}
      />

      {/* Modern interconnected hearts and talk bubbles graphic */}
      <svg
        width={Math.round(sizePx * 0.65)}
        height={Math.round(sizePx * 0.65)}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm relative z-10"
      >
        <defs>
          <linearGradient id="heartGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#FFE0E6" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="heartGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF176" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FFD54F" stopOpacity="0.9" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#900C3F" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Left romantic speech heart */}
        <path
          d="M32 24 C18 24 10 36 10 50 C10 68 35 84 46 90 C48 91 52 91 54 90 C57 88 64 83 70 77 C66 76 61 74 58 71 C45 60 38 48 38 36 C38 31 39 27 41 24 C38 24 35 24 32 24 Z"
          fill="url(#heartGradient1)"
          filter="url(#glow)"
        />

        {/* Right interlocking talk & meetup heart */}
        <path
          d="M66 18 C55 18 48 24 45 32 C42 24 35 18 24 18 C22 18 20 18 18 19 C18 21 18 23 18 25 C18 40 28 54 42 66 C46 69 49 71 50 71 C51 71 54 69 58 66 C72 54 82 40 82 25 C82 21 78 18 66 18 Z"
          fill="#FFFFFF"
          fillOpacity="0.95"
          filter="url(#glow)"
        />

        {/* Dynamic connection ping / sparkling dots */}
        <circle cx="50" cy="42" r="5" fill="#FF2A6D" />
        <circle cx="70" cy="32" r="3.5" fill="#FF8A00" />
        <circle cx="30" cy="34" r="3" fill="#FF4B2B" opacity="0.8" />

        {/* Small sparkle in top right */}
        <path
          d="M78 14 L80 18 L84 20 L80 22 L78 26 L76 22 L72 20 L76 18 Z"
          fill="#FFE082"
        />
      </svg>
    </div>
  );
};

export const AppLogo: React.FC<AppLogoProps> = ({
  size = 'md',
  showText = true,
  subtitle = '同城·全国·真实交友',
  className = '',
}) => {
  const pixelSizes = {
    sm: 32,
    md: 40,
    lg: 52,
    xl: 68,
  };

  const textClasses = {
    sm: 'text-base font-bold',
    md: 'text-lg font-black',
    lg: 'text-xl font-black',
    xl: 'text-2xl font-black',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <AppIconGraphic sizePx={pixelSizes[size]} />

      {showText && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5">
            <span
              className={`${textClasses[size]} tracking-tight bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 bg-clip-text text-transparent font-sans`}
            >
              约在一起
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200/80">
              MEET
            </span>
          </div>
          {subtitle && (
            <span className="text-[11px] text-zinc-500 font-medium tracking-wide">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
