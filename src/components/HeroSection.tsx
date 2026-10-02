import React from 'react';
import { NogoriLogo } from './NogoriLogo';
import { ArrowDown, MapPin, Zap, Compass, Sparkles } from 'lucide-react';
import watercolorBg from '../assets/watercolor-bg.jpg';

interface HeroSectionProps {
  totalInitiatives: number;
  totalComponents: number;
  totalFastTrack: number;
  onExploreClick: () => void;
  onMapClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  totalInitiatives,
  totalComponents,
  totalFastTrack,
  onExploreClick,
  onMapClick
}) => {
  return (
    <section id="utama" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-12 lg:py-20">
      {/* Subtle Watercolor Background Image + Pastel Overlays */}
      <div className="absolute inset-0 z-0 opacity-25 mix-blend-multiply pointer-events-none select-none">
        <img
          src={watercolorBg}
          alt=""
          className="w-full h-full object-cover object-center filter saturate-125"
        />
      </div>

      {/* Abstract Soft Pastel Watercolor Blobs (CSS based, lightweight) */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#9EDBD7]/30 blur-3xl pointer-events-none transform -rotate-12" />
      <div className="absolute top-1/4 -right-24 w-[30rem] h-[30rem] rounded-full bg-[#F4C6A6]/35 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-[#C7B9DB]/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 right-10 w-72 h-72 rounded-full bg-[#F3DB7B]/30 blur-3xl pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Official Logo Banner */}
        <div className="inline-flex justify-center mb-6">
          <NogoriLogo size="xl" />
        </div>

        {/* Traditional / Smart City Kicker */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="h-px w-8 bg-[#46B7B0]" />
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#46B7B0]">
            DOKUMEN STRATEGIK NEGERI SEMBILAN
          </span>
          <span className="h-px w-8 bg-[#46B7B0]" />
        </div>

        {/* Main Title Inspired by Cover */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#171717] tracking-tight leading-[1.15] mb-4">
          <span className="block font-black uppercase">PELAN INDUK</span>
          <span className="block font-black text-stone-900 uppercase">BANDAR PINTAR</span>
          <span className="inline-block text-[#171717] uppercase">NEGERI SEMBILAN</span>{' '}
          <span className="inline-block font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D4A31A] via-[#46B7B0] to-[#2B736E] italic font-serif">
            2040
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-lg sm:text-2xl font-serif italic text-stone-700 max-w-2xl mx-auto mb-10 leading-relaxed">
          “Memacu Inovasi, Menjamin Kelestarian”
        </p>

        {/* Live Key Statistics */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto mb-10">
          <div className="bg-white/90 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-[#9EDBD7]/50 shadow-xs hover:shadow-md transition-shadow">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight">
              {totalInitiatives}
            </div>
            <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#1D6A66] mt-1">
              INISIATIF
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-[#F4C6A6]/50 shadow-xs hover:shadow-md transition-shadow">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight">
              {totalComponents}
            </div>
            <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#A04512] mt-1">
              KOMPONEN
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-[#F3DB7B]/60 shadow-xs hover:shadow-md transition-shadow">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight flex items-center justify-center gap-1">
              <Zap className="w-5 h-5 text-amber-500 fill-amber-400 inline" />
              {totalFastTrack}
            </div>
            <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#856306] mt-1">
              FAST TRACK
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#171717] hover:bg-stone-800 text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            TEROKAI INISIATIF
          </button>

          <button
            onClick={onMapClick}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white hover:bg-stone-50 text-stone-900 font-bold text-sm tracking-wide border-2 border-stone-300 hover:border-[#46B7B0] shadow-xs hover:shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <MapPin className="w-4 h-4 text-[#46B7B0]" />
            BUKA SMART MAP
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="mt-14 inline-flex flex-col items-center animate-bounce text-stone-400">
          <span className="text-[10px] uppercase font-bold tracking-widest mb-1 text-stone-500">Skrol Ke Bawah</span>
          <ArrowDown className="w-4 h-4 text-stone-400" />
        </div>
      </div>
    </section>
  );
};
