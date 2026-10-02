import React, { useState, useMemo } from 'react';
import { Building, Layers, Zap, Calendar, ArrowRight, Search, Check } from 'lucide-react';
import { Initiative } from '../types/initiative';
import { extractAgencies, COMPONENT_CONFIGS } from '../utils/constants';

interface AgencyExplorerProps {
  initiatives: Initiative[];
  onSelectInitiative: (initiative: Initiative) => void;
}

export const AgencyExplorer: React.FC<AgencyExplorerProps> = ({
  initiatives,
  onSelectInitiative
}) => {
  const [agencyType, setAgencyType] = useState<'utama' | 'sokongan'>('utama');
  const [searchAgencyTerm, setSearchAgencyTerm] = useState('');
  const [selectedAgency, setSelectedAgency] = useState<string>('');

  const { primary, support } = useMemo(() => extractAgencies(initiatives), [initiatives]);

  const activeAgencyList = agencyType === 'utama' ? primary : support;

  // Default selection if not set
  React.useEffect(() => {
    if (!selectedAgency && activeAgencyList.length > 0) {
      setSelectedAgency(activeAgencyList[0]);
    }
  }, [agencyType, activeAgencyList, selectedAgency]);

  const filteredAgencyList = useMemo(() => {
    if (!searchAgencyTerm.trim()) return activeAgencyList;
    return activeAgencyList.filter((a) =>
      a.toLowerCase().includes(searchAgencyTerm.toLowerCase())
    );
  }, [activeAgencyList, searchAgencyTerm]);

  // Associated initiatives
  const associatedInitiatives = useMemo(() => {
    if (!selectedAgency) return [];
    return initiatives.filter((init) => {
      const field = agencyType === 'utama' ? init.agensiUtama : init.agensiSokongan;
      if (!field) return false;
      return field.toLowerCase().includes(selectedAgency.toLowerCase());
    });
  }, [initiatives, selectedAgency, agencyType]);

  const fastTrackCount = associatedInitiatives.filter((i) => i.fastTrack).length;
  const involvedComponents = Array.from(new Set(associatedInitiatives.map((i) => i.komponen)));
  const involvedPhases = Array.from(
    new Set(
      associatedInitiatives
        .map((i) => i.fasaPelaksanaan)
        .filter(Boolean) as string[]
    )
  );

  return (
    <section id="agensi" className="py-20 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#46B7B0]">
            EKOSISTEM KOLABORASI
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#171717] tracking-tight mt-1 mb-3">
            AGENSI PELAKSANA
          </h2>
          <p className="text-sm text-stone-600 font-normal leading-relaxed">
            Terokai penglibatan kementerian, jabatan kerajaan negeri, PBT dan rakan strategik industri dalam memacu kejayaan inisiatif bandar pintar.
          </p>
        </div>

        {/* Agency Type Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-stone-100 rounded-2xl border border-stone-200">
            <button
              onClick={() => {
                setAgencyType('utama');
                setSelectedAgency('');
              }}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                agencyType === 'utama'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              AGENSI UTAMA ({primary.length})
            </button>
            <button
              onClick={() => {
                setAgencyType('sokongan');
                setSelectedAgency('');
              }}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                agencyType === 'sokongan'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              AGENSI SOKONGAN ({support.length})
            </button>
          </div>
        </div>

        {/* Two-Column Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Agency Selector List (4 cols) */}
          <div className="lg:col-span-4 bg-[#FFF9F3] p-5 rounded-2xl border border-stone-200 flex flex-col h-[520px]">
            <div className="relative mb-3">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchAgencyTerm}
                onChange={(e) => setSearchAgencyTerm(e.target.value)}
                placeholder="Cari nama agensi..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-[#46B7B0]"
              />
            </div>

            <div className="flex-1 overflow-y-auto space-y-1 pr-1">
              {filteredAgencyList.map((agency) => {
                const isSelected = selectedAgency === agency;
                const count = initiatives.filter((i) => {
                  const f = agencyType === 'utama' ? i.agensiUtama : i.agensiSokongan;
                  return f && f.toLowerCase().includes(agency.toLowerCase());
                }).length;

                return (
                  <button
                    key={agency}
                    onClick={() => setSelectedAgency(agency)}
                    className={`w-full text-left p-3 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-white font-bold text-stone-900 border border-[#46B7B0] shadow-xs'
                        : 'text-stone-700 hover:bg-white/60'
                    }`}
                  >
                    <span className="truncate pr-2">{agency}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 font-mono ${
                        isSelected ? 'bg-[#9EDBD7]/30 text-[#13615C]' : 'bg-stone-200 text-stone-600'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Agency Details & Associated Initiatives (8 cols) */}
          <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
            {selectedAgency ? (
              <div>
                {/* Agency Title & Stats */}
                <div className="mb-6 pb-6 border-b border-stone-100">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                        {agencyType === 'utama' ? 'Agensi Utama' : 'Agensi Sokongan'}
                      </span>
                      <h3 className="text-xl font-bold text-stone-900 leading-snug">
                        {selectedAgency}
                      </h3>
                    </div>
                  </div>

                  {/* Summary Metric Chips */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                      <span className="text-[11px] text-stone-500 block">Jumlah Inisiatif</span>
                      <span className="text-xl font-black text-stone-900">
                        {associatedInitiatives.length}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200">
                      <span className="text-[11px] text-amber-800 block">Inisiatif Fast Track</span>
                      <span className="text-xl font-black text-amber-950 flex items-center gap-1">
                        <Zap className="w-4 h-4 text-amber-500 fill-amber-400" />
                        {fastTrackCount}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-teal-50/70 border border-teal-200 sm:col-span-1 col-span-2">
                      <span className="text-[11px] text-teal-800 block">Komponen Terlibat</span>
                      <span className="text-xl font-black text-teal-950">
                        {involvedComponents.length} Komponen
                      </span>
                    </div>
                  </div>
                </div>

                {/* List of Associated Initiatives */}
                <div>
                  <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-3">
                    Senarai {associatedInitiatives.length} Inisiatif Berkaitan
                  </h4>

                  <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                    {associatedInitiatives.map((item) => {
                      const compConfig = COMPONENT_CONFIGS[item.komponen];

                      return (
                        <div
                          key={item.id}
                          onClick={() => onSelectInitiative(item)}
                          className="group cursor-pointer p-4 rounded-xl border border-stone-200/90 hover:border-[#46B7B0] hover:shadow-xs transition-all flex items-center justify-between gap-4"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-stone-900 text-white">
                                {item.kodInisiatif}
                              </span>
                              <span className={`text-[10px] font-bold ${compConfig?.textPastel}`}>
                                {item.komponen}
                              </span>
                              {item.fastTrack && (
                                <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-sm bg-amber-500 text-white">
                                  FT
                                </span>
                              )}
                            </div>
                            <h5 className="text-xs font-bold text-stone-900 truncate group-hover:text-[#46B7B0]">
                              {item.inisiatif}
                            </h5>
                          </div>

                          <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#46B7B0] group-hover:translate-x-1 transition-all shrink-0" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 text-stone-400 text-xs">
                Sila pilih agensi di sebelah kiri untuk melihat maklumat terperinci.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
