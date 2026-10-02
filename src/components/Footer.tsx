import React from 'react';
import { NogoriLogo } from './NogoriLogo';
import { ArrowUp } from 'lucide-react';
import watercolorBg from '../assets/watercolor-bg.jpg';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#FFF9F3] border-t border-stone-200/80 pt-16 pb-12 overflow-hidden">
      {/* Background Watercolor Wash */}
      <div className="absolute inset-0 opacity-15 mix-blend-multiply pointer-events-none">
        <img
          src={watercolorBg}
          alt=""
          className="w-full h-full object-cover object-bottom"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-stone-200/80">
          {/* Logo & Identity */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
            <NogoriLogo size="md" />
            <div>
              <h3 className="text-base font-extrabold uppercase tracking-tight text-stone-900 leading-snug">
                PELAN INDUK BANDAR PINTAR
              </h3>
              <p className="text-sm font-bold text-stone-700">
                NEGERI SEMBILAN 2040
              </p>
              <p className="text-xs font-serif italic text-stone-500 mt-1">
                “Memacu Inovasi, Menjamin Kelestarian”
              </p>
            </div>
          </div>

          {/* Department Branding & Scroll Top */}
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-right">
            <div>
              <span className="text-xs font-extrabold tracking-wider text-stone-800 uppercase block">
                PLANMalaysia Negeri Sembilan
              </span>
              <span className="text-[11px] text-stone-500 block mt-0.5">
                Jabatan Perancangan Bandar dan Desa Negeri Sembilan
              </span>
            </div>

            <button
              onClick={scrollToTop}
              title="Kembali ke atas"
              aria-label="Kembali ke atas"
              className="w-10 h-10 rounded-full bg-white hover:bg-stone-100 border border-stone-200 shadow-xs flex items-center justify-center text-stone-600 hover:text-stone-950 transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Legal & Data Source Citation */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-3 text-center sm:text-left">
          <p>
            Sumber Data: Pelan Induk Bandar Pintar Negeri Sembilan 2040 (Nogori Pintar 2040).
          </p>
          <p>
            Hak Cipta Terpelihara &copy; 2026 Kerajaan Negeri Sembilan.
          </p>
        </div>
      </div>
    </footer>
  );
};
