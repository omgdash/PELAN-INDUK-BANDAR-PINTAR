import React, { useState, useMemo } from 'react';
import { Search, RotateCcw, Filter, SlidersHorizontal, Zap } from 'lucide-react';
import { Initiative, SmartCityComponent } from '../types/initiative';
import { InitiativeCard } from './InitiativeCard';
import { COMPONENT_CONFIGS, extractAgencies } from '../utils/constants';

interface InitiativeExplorerProps {
  initiatives: Initiative[];
  selectedComponent: string | null;
  onSelectComponent: (comp: SmartCityComponent | null) => void;
  selectedInitiative: Initiative | null;
  onSelectInitiative: (init: Initiative) => void;
  onViewOnMap: (init: Initiative) => void;
  fastTrackOnly: boolean;
  setFastTrackOnly: (val: boolean) => void;
  filterAgency: string | null;
  setFilterAgency: (agency: string | null) => void;
  filterPhase: string | null;
  setFilterPhase: (phase: string | null) => void;
  filterRating: string | null;
  setFilterRating: (rating: string | null) => void;
}

export const InitiativeExplorer: React.FC<InitiativeExplorerProps> = ({
  initiatives,
  selectedComponent,
  onSelectComponent,
  selectedInitiative,
  onSelectInitiative,
  onViewOnMap,
  fastTrackOnly,
  setFastTrackOnly,
  filterAgency,
  setFilterAgency,
  filterPhase,
  setFilterPhase,
  filterRating,
  setFilterRating
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const { primary: primaryAgencies } = useMemo(() => extractAgencies(initiatives), [initiatives]);

  const componentsList = Object.keys(COMPONENT_CONFIGS) as SmartCityComponent[];

  const resetAllFilters = () => {
    setSearchQuery('');
    onSelectComponent(null);
    setFastTrackOnly(false);
    setFilterAgency(null);
    setFilterPhase(null);
    setFilterRating(null);
    setFilterStatus('all');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedComponent !== null ||
    fastTrackOnly ||
    filterAgency !== null ||
    filterPhase !== null ||
    filterRating !== null ||
    filterStatus !== 'all';

  const filteredInitiatives = useMemo(() => {
    return initiatives.filter((item) => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchCode = item.kodInisiatif.toLowerCase().includes(query);
        const matchTitle = item.inisiatif.toLowerCase().includes(query);
        const matchAgency = item.agensiUtama?.toLowerCase().includes(query) ?? false;
        const matchOutcome = item.outcome?.toLowerCase().includes(query) ?? false;
        if (!matchCode && !matchTitle && !matchAgency && !matchOutcome) return false;
      }

      // Component
      if (selectedComponent && item.komponen !== selectedComponent) return false;

      // Fast Track
      if (fastTrackOnly && !item.fastTrack) return false;

      // Agency
      if (filterAgency && !item.agensiUtama?.toLowerCase().includes(filterAgency.toLowerCase())) {
        return false;
      }

      // Phase
      if (filterPhase && (!item.fasaPelaksanaan || !item.fasaPelaksanaan.includes(filterPhase))) {
        return false;
      }

      // Rating
      if (filterRating && (!item.tahapPenarafanBandarPintarMalaysia || !item.tahapPenarafanBandarPintarMalaysia.includes(filterRating))) {
        return false;
      }

      // Status
      if (filterStatus !== 'all') {
        if (filterStatus === 'none') {
          if (item.statusPelaksanaan !== null) return false;
        } else if (item.statusPelaksanaan !== filterStatus) {
          return false;
        }
      }

      return true;
    });
  }, [
    initiatives,
    searchQuery,
    selectedComponent,
    fastTrackOnly,
    filterAgency,
    filterPhase,
    filterRating,
    filterStatus
  ]);

  return (
    <section id="inisiatif" className="py-20 bg-stone-50/70 border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#46B7B0]">
              KATALOG PENUH
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#171717] tracking-tight mt-1">
              TEROKAI 85 INISIATIF
            </h2>
            <p className="text-sm text-stone-600 font-normal mt-1">
              Gunakan tapisan pintar untuk meneliti kod inisiatif, komponen, agensi pelaksana dan tahap kemajuan.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-stone-700 bg-white px-3.5 py-1.5 rounded-xl border border-stone-200/80 shadow-2xs">
              Menunjukkan <span className="text-[#1D6A66] font-extrabold">{filteredInitiatives.length}</span> daripada 85 inisiatif
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-200/80 hover:bg-stone-300 text-stone-800 text-xs font-bold transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>TETAPKAN SEMULA</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs mb-8 space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kod (contoh: S1-I1), nama inisiatif, atau agensi..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#46B7B0]"
            />
          </div>

          {/* Interactive Filter Pills/Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {/* Komponen Filter */}
            <div>
              <label className="text-[11px] font-bold text-stone-500 uppercase block mb-1">
                Komponen
              </label>
              <select
                value={selectedComponent || 'all'}
                onChange={(e) => onSelectComponent(e.target.value === 'all' ? null : (e.target.value as SmartCityComponent))}
                className="w-full py-2 px-3 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-[#46B7B0]"
              >
                <option value="all">Semua Komponen (7)</option>
                {componentsList.map((comp) => (
                  <option key={comp} value={comp}>
                    {comp}
                  </option>
                ))}
              </select>
            </div>

            {/* Fast Track Filter */}
            <div>
              <label className="text-[11px] font-bold text-stone-500 uppercase block mb-1">
                Fast Track
              </label>
              <button
                type="button"
                onClick={() => setFastTrackOnly(!fastTrackOnly)}
                className={`w-full py-2 px-3 text-xs font-bold rounded-xl border flex items-center justify-between transition-colors ${
                  fastTrackOnly
                    ? 'bg-amber-500 text-white border-amber-600 shadow-2xs'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Zap className={`w-3.5 h-3.5 ${fastTrackOnly ? 'fill-white' : 'text-amber-500'}`} />
                  Fast Track Sahaja
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-black/15 font-mono">
                  10
                </span>
              </button>
            </div>

            {/* Agensi Utama Filter */}
            <div>
              <label className="text-[11px] font-bold text-stone-500 uppercase block mb-1">
                Agensi Utama
              </label>
              <select
                value={filterAgency || 'all'}
                onChange={(e) => setFilterAgency(e.target.value === 'all' ? null : e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-[#46B7B0]"
              >
                <option value="all">Semua Agensi</option>
                {primaryAgencies.map((agency) => (
                  <option key={agency} value={agency}>
                    {agency.length > 32 ? agency.slice(0, 30) + '...' : agency}
                  </option>
                ))}
              </select>
            </div>

            {/* Fasa Pelaksanaan */}
            <div>
              <label className="text-[11px] font-bold text-stone-500 uppercase block mb-1">
                Fasa Pelaksanaan
              </label>
              <select
                value={filterPhase || 'all'}
                onChange={(e) => setFilterPhase(e.target.value === 'all' ? null : e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-[#46B7B0]"
              >
                <option value="all">Semua Fasa</option>
                <option value="Fasa 1">Fasa 1 (2026 – 2030)</option>
                <option value="Fasa 2">Fasa 2 (2031 – 2035)</option>
                <option value="Fasa 3">Fasa 3 (2036 – 2040)</option>
              </select>
            </div>

            {/* Tahap Penarafan */}
            <div>
              <label className="text-[11px] font-bold text-stone-500 uppercase block mb-1">
                Tahap Penarafan
              </label>
              <select
                value={filterRating || 'all'}
                onChange={(e) => setFilterRating(e.target.value === 'all' ? null : e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-[#46B7B0]"
              >
                <option value="all">Semua Tahap</option>
                <option value="Tahap 1">Tahap 1 : Early Adopter</option>
                <option value="Tahap 2">Tahap 2 : Developing Smart City</option>
                <option value="Tahap 3">Tahap 3 : Leading Smart City</option>
                <option value="Tahap 4">Tahap 4 : Visionary Smart City</option>
              </select>
            </div>
          </div>
        </div>

        {/* Initiatives Grid */}
        {filteredInitiatives.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredInitiatives.map((item) => (
              <InitiativeCard
                key={item.id}
                initiative={item}
                onSelect={onSelectInitiative}
                onViewOnMap={onViewOnMap}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 px-4 bg-white rounded-2xl border border-stone-200 max-w-lg mx-auto shadow-xs">
            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-3 text-stone-400">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-stone-900 mb-1">
              Tiada inisiatif ditemui
            </h3>
            <p className="text-xs text-stone-500 mb-5">
              Tiada inisiatif ditemui berdasarkan kriteria tapisan semasa. Cuba ubah carian atau tetapkan semula tapisan.
            </p>
            <button
              onClick={resetAllFilters}
              className="px-4 py-2 rounded-xl bg-[#46B7B0] hover:bg-[#389E97] text-white text-xs font-bold transition-colors shadow-2xs"
            >
              TETAPKAN SEMULA TAPISAN
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
