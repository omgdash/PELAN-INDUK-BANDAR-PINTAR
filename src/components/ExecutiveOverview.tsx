import React, { useState, useEffect } from 'react';
import { Layers, Zap, Building2, MapPin, DollarSign, Award, CheckCircle2 } from 'lucide-react';
import { Initiative } from '../types/initiative';
import { calculateUSPBudget, extractAgencies } from '../utils/constants';

interface ExecutiveOverviewProps {
  initiatives: Initiative[];
}

export const ExecutiveOverview: React.FC<ExecutiveOverviewProps> = ({ initiatives }) => {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    setHasAnimated(true);
  }, []);

  const totalInitiatives = initiatives.length;
  const totalComponents = new Set(initiatives.map((i) => i.komponen)).size;
  const totalFastTrack = initiatives.filter((i) => i.fastTrack).length;

  const { primary: primaryAgencies } = extractAgencies(initiatives);
  const totalPrimaryAgencies = primaryAgencies.length;

  const initiativesWithCoords = initiatives.filter((i) => i.koordinat && i.koordinat.length > 0);
  const totalMappedInitiatives = initiativesWithCoords.length;

  const totalCoordinatePoints = initiatives.reduce((acc, curr) => acc + (curr.koordinat?.length || 0), 0);

  const uspBudget = calculateUSPBudget(initiatives);

  const kpis = [
    {
      title: 'Jumlah Inisiatif',
      value: totalInitiatives,
      unit: 'Inisiatif',
      subtext: 'Berdasarkan Pelan Induk 2040',
      icon: Layers,
      color: 'text-[#46B7B0]',
      bg: 'bg-[#9EDBD7]/20',
      border: 'border-[#46B7B0]/30'
    },
    {
      title: 'Komponen Bandar Pintar',
      value: totalComponents,
      unit: 'Komponen Utama',
      subtext: 'Menyeluruh merentas sektor',
      icon: Award,
      color: 'text-[#D4A31A]',
      bg: 'bg-[#F3DB7B]/25',
      border: 'border-[#F3DB7B]/60'
    },
    {
      title: 'Inisiatif Fast Track',
      value: totalFastTrack,
      unit: 'Projek Berkeutamaan Tinggi',
      subtext: 'Pelaksanaan fasa awal pantas',
      icon: Zap,
      color: 'text-amber-600',
      bg: 'bg-amber-100/50',
      border: 'border-amber-300'
    },
    {
      title: 'Agensi Utama Terlibat',
      value: totalPrimaryAgencies,
      unit: 'Kementerian & Jabatan',
      subtext: 'SUKNS, PBT, JDN, agensi teknikal',
      icon: Building2,
      color: 'text-indigo-600',
      bg: 'bg-[#C7B9DB]/30',
      border: 'border-[#C7B9DB]'
    },
    {
      title: 'Inisiatif Dipetakan',
      value: totalMappedInitiatives,
      unit: 'Inisiatif Berlokasi',
      subtext: 'Mengandungi data GIS geospatial',
      icon: MapPin,
      color: 'text-emerald-700',
      bg: 'bg-emerald-100/50',
      border: 'border-emerald-300'
    },
    {
      title: 'Jumlah Titik Koordinat',
      value: totalCoordinatePoints,
      unit: 'Titik Lokasi Sebenar',
      subtext: 'Merangkumi CCTV, WiFi, parkir, dsb.',
      icon: CheckCircle2,
      color: 'text-cyan-700',
      bg: 'bg-cyan-100/50',
      border: 'border-cyan-300'
    },
    {
      title: 'Anggaran Bajet USP Fund',
      value: uspBudget.formatted,
      unit: `Daripada ${uspBudget.countWithBudget} inisiatif berdata`,
      subtext: 'Rekod bajet tersedia dalam Pelan Induk',
      icon: DollarSign,
      color: 'text-rose-600',
      bg: 'bg-[#E8B6C8]/30',
      border: 'border-[#E8B6C8]',
      isCurrency: true
    }
  ];

  return (
    <section id="gambaran-keseluruhan" className="py-16 bg-white/70 border-y border-stone-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#46B7B0]">
            EKSEKUTIF RINGKASAN
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight mt-1 mb-3">
            GAMBARAN KESELURUHAN
          </h2>
          <p className="text-sm text-stone-600 font-normal">
            Ringkasan metrik utama perancangan Pelan Induk Bandar Pintar Negeri Sembilan sehingga tahun 2040, merangkumi 85 inisiatif menyeluruh untuk kesejahteraan rakyat dan pembangunan lestari.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {kpis.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <div
                key={idx}
                className={`relative p-5 rounded-2xl bg-white border ${kpi.border} shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-stone-500 tracking-wide uppercase">
                    {kpi.title}
                  </span>
                  <div className={`p-2 rounded-xl ${kpi.bg}`}>
                    <Icon className={`w-4 h-4 ${kpi.color}`} />
                  </div>
                </div>

                <div className="mb-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
                    {kpi.value}
                  </span>
                </div>

                <div className="text-xs font-semibold text-stone-700 mb-1.5">
                  {kpi.unit}
                </div>

                <p className="text-[11px] text-stone-500 font-normal leading-tight">
                  {kpi.subtext}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
