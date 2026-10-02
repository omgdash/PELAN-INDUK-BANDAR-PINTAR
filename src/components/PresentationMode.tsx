import React, { useState } from 'react';
import { NogoriLogo } from './NogoriLogo';
import {
  X,
  Zap,
  Layers,
  Award,
  DollarSign,
  Building,
  MapPin,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { Initiative } from '../types/initiative';
import { COMPONENT_CONFIGS, calculateUSPBudget } from '../utils/constants';

interface PresentationModeProps {
  initiatives: Initiative[];
  onExit: () => void;
  onSelectInitiative: (init: Initiative) => void;
}

export const PresentationMode: React.FC<PresentationModeProps> = ({
  initiatives,
  onExit,
  onSelectInitiative
}) => {
  const [activeTab, setActiveTab] = useState<'kpi' | 'komponen' | 'fasttrack'>('kpi');
  const [compSlide, setCompSlide] = useState(0);

  const totalInitiatives = initiatives.length;
  const totalFastTrack = initiatives.filter((i) => i.fastTrack).length;
  const uspBudget = calculateUSPBudget(initiatives);
  const componentsList = Object.values(COMPONENT_CONFIGS);

  const ftList = initiatives.filter((i) => i.fastTrack);

  return (
    <div className="fixed inset-0 z-50 bg-[#FFF9F3] text-stone-900 overflow-y-auto flex flex-col justify-between p-6 sm:p-12">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-stone-300/80 pb-6 mb-8">
        <div className="flex items-center gap-4">
          <NogoriLogo size="md" showSubtitle={true} />
          <div className="h-8 w-px bg-stone-300 hidden sm:block" />
          <div className="hidden sm:block">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#46B7B0]">
              PEMBENTANGAN PENGURUSAN
            </span>
            <h1 className="text-lg font-black text-stone-900 leading-none">
              Pelan Induk Bandar Pintar Negeri Sembilan 2040
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex p-1 bg-stone-200/60 rounded-xl">
            <button
              onClick={() => setActiveTab('kpi')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                activeTab === 'kpi' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
              }`}
            >
              Ringkasan KPI
            </button>
            <button
              onClick={() => setActiveTab('komponen')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                activeTab === 'komponen' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
              }`}
            >
              7 Komponen
            </button>
            <button
              onClick={() => setActiveTab('fasttrack')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                activeTab === 'fasttrack' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
              }`}
            >
              10 Fast Track
            </button>
          </div>

          <button
            onClick={onExit}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold tracking-wide transition-colors"
          >
            <X className="w-4 h-4" />
            <span>KELUAR MOD PEMBENTANGAN</span>
          </button>
        </div>
      </div>

      {/* Main Slide Content */}
      <div className="flex-1 flex flex-col justify-center max-w-6xl mx-auto w-full py-4">
        {activeTab === 'kpi' && (
          <div className="space-y-10 animate-in fade-in duration-300">
            <div className="text-center">
              <span className="text-sm font-extrabold uppercase tracking-widest text-[#46B7B0]">
                RINGKASAN STRATEGIK KESELURUHAN
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-stone-900 mt-2 mb-4 tracking-tight">
                “Memacu Inovasi, Menjamin Kelestarian”
              </h2>
              <p className="text-base text-stone-600 max-w-2xl mx-auto font-normal">
                Peta jalan pembangunan bandar pintar menyeluruh bagi Negeri Sembilan untuk melonjakkan kualiti hidup, kemakmuran ekonomi dan kelestarian persekitaran.
              </p>
            </div>

            {/* Giant KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-lg text-center">
                <span className="text-xs uppercase font-extrabold tracking-wider text-stone-400 block mb-2">
                  JUMLAH INISIATIF
                </span>
                <span className="text-5xl sm:text-6xl font-black text-stone-900 block tracking-tight">
                  85
                </span>
                <span className="text-xs font-semibold text-[#13615C] mt-2 block">
                  100% Data Disahkan
                </span>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-lg text-center">
                <span className="text-xs uppercase font-extrabold tracking-wider text-stone-400 block mb-2">
                  KOMPONEN UTAMA
                </span>
                <span className="text-5xl sm:text-6xl font-black text-stone-900 block tracking-tight">
                  7
                </span>
                <span className="text-xs font-semibold text-amber-700 mt-2 block">
                  Tonggak Pintar
                </span>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-amber-200 shadow-lg text-center bg-amber-50/40">
                <span className="text-xs uppercase font-extrabold tracking-wider text-amber-800 block mb-2">
                  FAST TRACK
                </span>
                <span className="text-5xl sm:text-6xl font-black text-amber-600 block tracking-tight">
                  10
                </span>
                <span className="text-xs font-semibold text-amber-900 mt-2 block">
                  Keutamaan Segera
                </span>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-lg text-center">
                <span className="text-xs uppercase font-extrabold tracking-wider text-stone-400 block mb-2">
                  ANGGARAN BAJET USP
                </span>
                <span className="text-4xl sm:text-5xl font-black text-emerald-700 block tracking-tight">
                  RM 215M+
                </span>
                <span className="text-xs font-semibold text-stone-500 mt-2 block">
                  Infrastruktur Digital
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'komponen' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="text-center mb-6">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#46B7B0]">
                7 TONGGAK BANDAR PINTAR
              </span>
              <h2 className="text-3xl font-black text-stone-900 mt-1">
                Pecahan Mengikut Komponen
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {componentsList.map((c) => (
                <div
                  key={c.name}
                  className="bg-white p-6 rounded-2xl border border-stone-200 shadow-md hover:shadow-xl transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-extrabold px-2.5 py-1 rounded-md ${c.bgPastel} ${c.textPastel}`}>
                      {c.name}
                    </span>
                    <span className="text-2xl font-black text-stone-900">{c.count}</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed font-normal">
                    {c.deskripsi}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'fasttrack' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="text-center mb-4">
              <span className="text-xs uppercase font-extrabold tracking-widest text-amber-600">
                10 INISIATIF BERKEUTAMAAN TINGGI
              </span>
              <h2 className="text-3xl font-black text-stone-900 mt-1">
                Senarai Projek Fast Track
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2">
              {ftList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectInitiative(item)}
                  className="cursor-pointer bg-white p-5 rounded-2xl border-2 border-amber-200 hover:border-amber-400 shadow-md hover:shadow-lg transition-all flex items-start justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-sm bg-stone-900 text-white">
                        {item.kodInisiatif}
                      </span>
                      <span className="text-xs font-bold text-amber-700">
                        {item.komponen}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-stone-900 mb-1 leading-snug">
                      {item.inisiatif}
                    </h4>
                    <p className="text-xs text-stone-500">
                      {item.agensiUtama}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-amber-500 shrink-0 mt-2" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Branding */}
      <div className="border-t border-stone-300/80 pt-4 flex items-center justify-between text-xs text-stone-500">
        <span>Sumber: Pelan Induk Bandar Pintar Negeri Sembilan 2040</span>
        <span>PLANMalaysia Negeri Sembilan</span>
      </div>
    </div>
  );
};
