import React, { useState } from 'react';
import { Zap, ChevronLeft, ChevronRight, ArrowRight, Building, MapPin } from 'lucide-react';
import { Initiative, SmartCityComponent } from '../types/initiative';
import { COMPONENT_CONFIGS } from '../utils/constants';

interface FastTrackShowcaseProps {
  initiatives: Initiative[];
  onSelectInitiative: (initiative: Initiative) => void;
  onViewOnMap: (initiative: Initiative) => void;
}

export const FastTrackShowcase: React.FC<FastTrackShowcaseProps> = ({
  initiatives,
  onSelectInitiative,
  onViewOnMap
}) => {
  const [selectedCompFilter, setSelectedCompFilter] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Extract all fast track initiatives dynamically from JSON
  const fastTrackList = initiatives.filter((item) => item.fastTrack === true);

  // Filtered by component
  const filteredFT = fastTrackList.filter((item) => {
    if (selectedCompFilter === 'all') return true;
    return item.komponen === selectedCompFilter;
  });

  // Distinct components that contain FT initiatives
  const ftComponents = Array.from(new Set(fastTrackList.map((i) => i.komponen)));

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1 >= filteredFT.length ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? filteredFT.length - 1 : prev - 1));
  };

  return (
    <section id="fast-track" className="py-20 bg-gradient-to-b from-amber-50/50 via-[#FFF9F3] to-[#FFF9F3] relative overflow-hidden border-t border-amber-200/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Indicator */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-extrabold uppercase tracking-wider mb-3">
              <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
              KEUTAMAAN TINGGI
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#171717] tracking-tight">
              INISIATIF FAST TRACK
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-2xl font-normal">
              10 inisiatif strategik berimpak tinggi yang diberi keutamaan pelaksanaan pantas bagi mempercepatkan transformasi digital rakyat dan negeri.
            </p>
          </div>

          {/* Large Stat Box */}
          <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-amber-200 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center text-white shadow-xs">
              <Zap className="w-6 h-6 fill-white" />
            </div>
            <div>
              <span className="text-3xl font-black text-amber-950 block leading-none">
                10
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                Inisiatif Fast Track
              </span>
            </div>
          </div>
        </div>

        {/* Component Tabs for FT */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          <button
            onClick={() => {
              setSelectedCompFilter('all');
              setCurrentIndex(0);
            }}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition-colors ${
              selectedCompFilter === 'all'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            Semua Fast Track ({fastTrackList.length})
          </button>
          {ftComponents.map((comp) => {
            const count = fastTrackList.filter((i) => i.komponen === comp).length;
            return (
              <button
                key={comp}
                onClick={() => {
                  setSelectedCompFilter(comp);
                  setCurrentIndex(0);
                }}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition-colors ${
                  selectedCompFilter === comp
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {comp} ({count})
              </button>
            );
          })}
        </div>

        {/* Carousel / Card Showcase */}
        {filteredFT.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFT.map((item, index) => {
                const compConfig = COMPONENT_CONFIGS[item.komponen];
                const hasCoords = item.koordinat && item.koordinat.length > 0;

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-6 border-2 border-amber-200/80 hover:border-amber-400 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group relative"
                  >
                    {/* Top FT Tag */}
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-stone-900 text-white">
                          {item.kodInisiatif}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {hasCoords && (
                            <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded-md border border-cyan-200">
                              <MapPin className="w-3 h-3 text-cyan-600" />
                              {item.koordinat.length} Lokasi
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-amber-500 text-white shadow-2xs">
                            <Zap className="w-3 h-3 fill-white" />
                            FAST TRACK
                          </span>
                        </div>
                      </div>

                      {/* Component Label */}
                      <span className={`text-[11px] font-bold block mb-2 ${compConfig?.textPastel}`}>
                        {item.komponen}
                      </span>

                      {/* Title */}
                      <h3 className="text-base font-bold text-stone-900 group-hover:text-amber-700 transition-colors leading-snug mb-3">
                        {item.inisiatif}
                      </h3>

                      {/* Agensi Utama */}
                      <div className="flex items-start gap-1.5 text-xs text-stone-600 mb-4 bg-stone-50 p-3 rounded-xl border border-stone-100">
                        <Building className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                        <span className="line-clamp-2 leading-relaxed">
                          {item.agensiUtama || 'Tiada maklumat agensi'}
                        </span>
                      </div>

                      {/* Outcome snippet if available */}
                      {item.outcome && (
                        <p className="text-xs text-stone-500 line-clamp-2 italic mb-4 leading-relaxed">
                          “{item.outcome}”
                        </p>
                      )}
                    </div>

                    {/* Bottom CTA */}
                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-[11px] text-stone-400 font-medium">
                        {item.fasaPelaksanaan || 'Fasa 1 (2026 - 2030)'}
                      </span>
                      <button
                        onClick={() => onSelectInitiative(item)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-950 py-1"
                      >
                        <span>Lihat Butiran</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-stone-200">
            <p className="text-xs text-stone-500">Tiada inisiatif Fast Track untuk komponen ini.</p>
          </div>
        )}
      </div>
    </section>
  );
};
