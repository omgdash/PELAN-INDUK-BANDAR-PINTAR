import React from 'react';
import {
  X,
  Zap,
  MapPin,
  Calendar,
  Building,
  Target,
  FileText,
  DollarSign,
  ShieldCheck,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { Initiative } from '../types/initiative';
import { COMPONENT_CONFIGS } from '../utils/constants';

interface InitiativeDrawerProps {
  initiative: Initiative | null;
  onClose: () => void;
  onViewOnMap: (initiative: Initiative) => void;
}

export const InitiativeDrawer: React.FC<InitiativeDrawerProps> = ({
  initiative,
  onClose,
  onViewOnMap
}) => {
  if (!initiative) return null;

  const compConfig = COMPONENT_CONFIGS[initiative.komponen];
  const hasCoordinates = initiative.koordinat && initiative.koordinat.length > 0;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container (Desktop: w-[480px] / sm:w-[560px], Mobile: full screen) */}
      <div className="relative w-full max-w-xl bg-white h-full shadow-2xl flex flex-col z-10 overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-6 border-b border-stone-200 bg-[#FFF9F3] flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-stone-900 text-white">
                {initiative.kodInisiatif}
              </span>
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-md border ${compConfig?.bgPastel} ${compConfig?.textPastel} ${compConfig?.borderPastel}`}
              >
                {initiative.komponen}
              </span>
              {initiative.fastTrack && (
                <span className="inline-flex items-center gap-1 text-xs font-extrabold px-2.5 py-1 rounded-md bg-amber-500 text-white shadow-2xs">
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  FAST TRACK
                </span>
              )}
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-[#171717] leading-snug">
              {initiative.inisiatif}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup"
            className="p-2 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm divide-y divide-stone-100">
          {/* Outcome Section */}
          {initiative.outcome && (
            <div className="pt-2 first:pt-0">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-stone-500 mb-2">
                <Target className="w-4 h-4 text-[#46B7B0]" />
                OUTCOME / HASIL JANGKAAN
              </div>
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 leading-relaxed whitespace-pre-line text-xs sm:text-sm">
                {initiative.outcome}
              </div>
            </div>
          )}

          {/* Agencies Section */}
          <div className="pt-5">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-stone-500 mb-3">
              <Building className="w-4 h-4 text-[#46B7B0]" />
              AGENSI PELAKSANA
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-[11px] font-bold text-stone-500 uppercase block mb-1">
                  Agensi Utama
                </span>
                <p className="font-semibold text-stone-900 bg-amber-50/60 p-3 rounded-xl border border-amber-200/70 text-xs sm:text-sm">
                  {initiative.agensiUtama || 'Tiada maklumat agensi utama'}
                </p>
              </div>

              {initiative.agensiSokongan && initiative.agensiSokongan !== '-' && (
                <div>
                  <span className="text-[11px] font-bold text-stone-500 uppercase block mb-1">
                    Agensi Sokongan
                  </span>
                  <p className="text-stone-700 bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs leading-relaxed">
                    {initiative.agensiSokongan}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Implementation & Status */}
          <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-stone-500 mb-1.5">
                <Calendar className="w-4 h-4 text-[#46B7B0]" />
                FASA PELAKSANAAN
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-stone-800">
                {initiative.fasaPelaksanaan || 'Belum ditentukan'}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-stone-500 mb-1.5">
                <FileText className="w-4 h-4 text-[#46B7B0]" />
                STATUS PELAKSANAAN
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-stone-800">
                {initiative.statusPelaksanaan || 'Tiada Data Status'}
              </div>
            </div>
          </div>

          {/* Smart City Rating & ISO Indicators */}
          <div className="pt-5 space-y-3">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-stone-500 mb-1">
              <ShieldCheck className="w-4 h-4 text-[#46B7B0]" />
              PENARAFAN BANDAR PINTAR
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <div>
                <span className="text-[11px] font-bold text-stone-500 uppercase block">
                  Tahap Penarafan Bandar Pintar Malaysia
                </span>
                <span className="text-xs font-bold text-stone-900">
                  {initiative.tahapPenarafanBandarPintarMalaysia || 'Tiada Data Penarafan'}
                </span>
              </div>

              {initiative.indikatorMSISO37122 !== null && initiative.indikatorMSISO37122 !== undefined && (
                <div className="pt-2 border-t border-stone-200/80">
                  <span className="text-[11px] font-bold text-stone-500 uppercase block">
                    Indikator MS ISO 37122
                  </span>
                  <span className="text-xs font-mono font-semibold text-stone-800">
                    {String(initiative.indikatorMSISO37122)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Budget USP */}
          {initiative.bajetUSPFundRM && (
            <div className="pt-5">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-stone-500 mb-1.5">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                PEMBIAYAAN / BAJET USP FUND
              </div>
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm font-bold text-emerald-900 whitespace-pre-line">
                RM {initiative.bajetUSPFundRM}
              </div>
            </div>
          )}

          {/* Catatan if available */}
          {initiative.catatan && (
            <div className="pt-5">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
                Catatan Sumber
              </span>
              <p className="text-xs text-stone-600 italic bg-stone-50 p-3 rounded-lg border border-stone-200">
                {initiative.catatan}
              </p>
            </div>
          )}

          {/* Coordinates Section */}
          <div className="pt-5 pb-4">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-stone-500 mb-2">
              <MapPin className="w-4 h-4 text-[#46B7B0]" />
              MAKLUMAT LOKASI GEOSPATIAL
            </div>

            {hasCoordinates ? (
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-cyan-50/70 border border-cyan-200 text-xs text-cyan-900">
                  <span className="font-bold block mb-1">
                    {initiative.koordinat.length} Titik Koordinat Tersedia
                  </span>
                  <p className="text-[11px] text-stone-600 line-clamp-3 font-mono">
                    {initiative.lokasiKoordinatAsal ||
                      initiative.koordinat.map((c) => `${c.lat.toFixed(4)}, ${c.lng.toFixed(4)}`).join(' | ')}
                  </p>
                </div>

                <button
                  onClick={() => onViewOnMap(initiative)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#46B7B0] hover:bg-[#3AA099] text-white font-bold text-xs tracking-wide shadow-xs transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  LIHAT DALAM SMART MAP
                </button>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-500">
                Tiada koordinat lokasi khusus untuk inisiatif ini (bersifat dasar/negeri).
              </div>
            )}
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-stone-200 bg-[#FFF9F3] flex items-center justify-between">
          <span className="text-xs text-stone-500 font-mono">
            ID: {initiative.id}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
