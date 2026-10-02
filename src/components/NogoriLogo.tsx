import React from 'react';
import logoImg from '../assets/logo-nogori-pintar.jpg';

interface NogoriLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const NogoriLogo: React.FC<NogoriLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = false
}) => {
  const sizeClasses = {
    sm: 'h-10 w-auto',
    md: 'h-14 w-auto',
    lg: 'h-20 w-auto',
    xl: 'h-28 w-auto'
  };

  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      <div className="relative inline-flex items-center justify-center p-1 rounded-xl bg-white/80 shadow-xs border border-stone-200/60 transition-transform duration-300 hover:scale-[1.02]">
        <img
          src={logoImg}
          alt="Logo Nogori Pintar 2040"
          className={`${sizeClasses[size]} object-contain mix-blend-multiply`}
          loading="eager"
        />
      </div>
      {showSubtitle && (
        <div className="flex flex-col text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-900 leading-tight">
            Pelan Induk Bandar Pintar
          </span>
          <span className="text-[11px] font-medium text-stone-600 tracking-normal">
            Negeri Sembilan 2040
          </span>
        </div>
      )}
    </div>
  );
};
