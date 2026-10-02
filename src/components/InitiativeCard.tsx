import React from 'react';
import { Zap, MapPin, ArrowRight, Building } from 'lucide-react';
import { Initiative } from '../types/initiative';
import { COMPONENT_CONFIGS } from '../utils/constants';

interface InitiativeCardProps {
  initiative: Initiative;
  onSelect: (initiative: Initiative) => void;
  onViewOnMap?: (initiative: Initiative) => void;
}

export const InitiativeCard: React.FC<InitiativeCardProps> = ({
  initiative,
  onSelect,
  onViewOnMap
}) => {
  const compConfig = COMPONENT_CONFIGS[initiative.komponen];
  const hasCoordinates = initiative.koordinat && initiative.koordinat.length > 0;

  return (
    <div className="bg-white rounded-2xl p-5 border border-stone-200/80 hover:border-stone-300 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Top Header: Code, Component, Fast Track */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-800 border border-stone-200">
              {initiative.kodInisiatif}
            </span>
            <span className={`text-[11px] font-bold ${compConfig?.textPastel}`}>
              {initiative.komponen}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {hasCoordinates && (
              <span
                title={`${initiative.koordinat.length} titik koordinat`}
                className="inline-flex items-center gap-0.5 text-[10px] font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-md border border-cyan-200"
              >
                <MapPin className="w-3 h-3" />
                {initiative.koordinat.length}
              </span>
            )}
            {initiative.fastTrack && (
              <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-amber-900 bg-amber-100/90 px-2 py-0.5 rounded-md border border-amber-300">
                <Zap className="w-3 h-3 fill-amber-500 text-amber-600" />
                FAST TRACK
              </span>
            )}
          </div>
        </div>

        {/* Initiative Title */}
        <h3 className="text-sm font-bold text-stone-900 group-hover:text-[#46B7B0] transition-colors leading-snug line-clamp-3 mb-3">
          {initiative.inisiatif}
        </h3>

        {/* Agensi Utama (Clean metadata with subtle icon) */}
        <div className="flex items-start gap-1.5 text-xs text-stone-600 mb-3 bg-stone-50/70 p-2.5 rounded-xl border border-stone-100">
          <Building className="w-3.5 h-3.5 text-stone-400 mt-0.5 shrink-0" />
          <span className="line-clamp-2 leading-tight">
            {initiative.agensiUtama || 'Tiada maklumat agensi utama'}
          </span>
        </div>

        {/* Quiet Meta Line: Fasa · Penarafan */}
        <div className="flex items-center gap-2 text-[11px] text-stone-500 mb-4 flex-wrap">
          <span>{initiative.fasaPelaksanaan || 'Fasa belum diset'}</span>
          {initiative.tahapPenarafanBandarPintarMalaysia && (
            <>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="font-medium text-stone-700">
                {initiative.tahapPenarafanBandarPintarMalaysia.split(':')[0].trim()}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Card Actions */}
      <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
        <button
          onClick={() => onSelect(initiative)}
          className="w-full flex items-center justify-between text-xs font-bold text-stone-800 group-hover:text-[#46B7B0] py-1 transition-colors"
        >
          <span>LIHAT BUTIRAN</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};
