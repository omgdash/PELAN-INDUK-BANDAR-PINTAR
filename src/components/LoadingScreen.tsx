import React from 'react';
import { NogoriLogo } from './NogoriLogo';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 bg-[#FFF9F3] flex flex-col items-center justify-center p-4 select-none">
      <div className="flex flex-col items-center text-center animate-in fade-in duration-300">
        <NogoriLogo size="lg" />

        <div className="mt-6 mb-4">
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight uppercase">
            PELAN INDUK BANDAR PINTAR
          </h2>
          <p className="text-sm font-bold text-stone-700">
            NEGERI SEMBILAN 2040
          </p>
          <p className="text-xs font-serif italic text-stone-500 mt-1">
            “Memacu Inovasi, Menjamin Kelestarian”
          </p>
        </div>

        {/* Subtle loading pulse bar */}
        <div className="w-48 h-1.5 bg-stone-200 rounded-full overflow-hidden mt-2">
          <div className="h-full bg-gradient-to-r from-[#46B7B0] to-[#D4A31A] w-1/2 animate-[pulse_1.2s_ease-in-out_infinite] rounded-full" />
        </div>

        <span className="text-[11px] font-medium text-stone-500 mt-3">
          Memuatkan Pangkalan Data Pelan Induk...
        </span>
      </div>
    </div>
  );
};
