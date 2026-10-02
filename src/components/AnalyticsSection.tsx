import React, { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { RotateCcw, BarChart3, PieChart as PieIcon, TrendingUp, Info } from 'lucide-react';
import { Initiative, SmartCityComponent } from '../types/initiative';
import { COMPONENT_CONFIGS, extractAgencies } from '../utils/constants';

interface AnalyticsSectionProps {
  initiatives: Initiative[];
  onSelectComponent: (comp: SmartCityComponent | null) => void;
  onSelectFastTrack: (ftOnly: boolean) => void;
  onSelectAgency: (agency: string | null) => void;
  onSelectPhase: (phase: string | null) => void;
  onSelectRating: (rating: string | null) => void;
}

export const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({
  initiatives,
  onSelectComponent,
  onSelectFastTrack,
  onSelectAgency,
  onSelectPhase,
  onSelectRating
}) => {
  const [showAllAgencies, setShowAllAgencies] = useState(false);

  // 1. Data for Component Bar Chart
  const componentChartData = useMemo(() => {
    return Object.keys(COMPONENT_CONFIGS).map((compName) => {
      const count = initiatives.filter((i) => i.komponen === compName).length;
      return {
        name: compName,
        shortName: compName.replace('Smart ', ''),
        count,
        color: COMPONENT_CONFIGS[compName as SmartCityComponent].color
      };
    }).sort((a, b) => b.count - a.count);
  }, [initiatives]);

  // 2. Data for Smart City Rating Donut
  const ratingChartData = useMemo(() => {
    const counts: Record<string, number> = {
      'Tahap 1 : Early Adopter': 0,
      'Tahap 2 : Developing': 0,
      'Tahap 3 : Leading': 0,
      'Tahap 4 : Visionary': 0,
      'Tiada Data Penarafan': 0
    };

    initiatives.forEach((item) => {
      const r = item.tahapPenarafanBandarPintarMalaysia;
      if (!r) {
        counts['Tiada Data Penarafan']++;
      } else if (r.includes('Tahap 1')) {
        counts['Tahap 1 : Early Adopter']++;
      } else if (r.includes('Tahap 2')) {
        counts['Tahap 2 : Developing']++;
      } else if (r.includes('Tahap 3')) {
        counts['Tahap 3 : Leading']++;
      } else if (r.includes('Tahap 4')) {
        counts['Tahap 4 : Visionary']++;
      } else {
        counts['Tiada Data Penarafan']++;
      }
    });

    const colors = ['#F59E0B', '#0EA5E9', '#10B981', '#8B5CF6', '#9CA3AF'];

    return Object.entries(counts)
      .filter(([_, val]) => val > 0)
      .map(([key, val], idx) => ({
        name: key,
        value: val,
        color: colors[idx % colors.length]
      }));
  }, [initiatives]);

  // 3. Data for Implementation Phases
  const phaseChartData = useMemo(() => {
    let f1 = 0;
    let f2 = 0;
    let f3 = 0;

    initiatives.forEach((item) => {
      const p = item.fasaPelaksanaan || '';
      if (p.includes('Fasa 1')) f1++;
      if (p.includes('Fasa 2')) f2++;
      if (p.includes('Fasa 3')) f3++;
    });

    return [
      { name: 'Fasa 1 (2026-2030)', fasa: 'Fasa 1', inisiatif: f1, color: '#46B7B0' },
      { name: 'Fasa 2 (2031-2035)', fasa: 'Fasa 2', inisiatif: f2, color: '#0284C7' },
      { name: 'Fasa 3 (2036-2040)', fasa: 'Fasa 3', inisiatif: f3, color: '#7C3AED' }
    ];
  }, [initiatives]);

  // 4. Data for Fast Track Donut
  const fastTrackData = useMemo(() => {
    const ftCount = initiatives.filter((i) => i.fastTrack).length;
    const otherCount = initiatives.length - ftCount;
    return [
      { name: 'Fast Track', value: ftCount, color: '#F59E0B' },
      { name: 'Inisiatif Lain', value: otherCount, color: '#E2E8F0' }
    ];
  }, [initiatives]);

  // 5. Data for Implementation Status
  const statusChartData = useMemo(() => {
    const counts: Record<string, number> = {};

    initiatives.forEach((item) => {
      const s = item.statusPelaksanaan || 'Tiada Data Status';
      counts[s] = (counts[s] || 0) + 1;
    });

    const statusColors: Record<string, string> = {
      'Telah Dilaksanakan': '#10B981',
      'Sedang Dilaksanakan': '#3B82F6',
      'Dalam Perancangan': '#F59E0B',
      'Belum Mula': '#EC4899',
      'Tiada Data Status': '#94A3B8'
    };

    return Object.entries(counts).map(([name, count]) => ({
      name,
      count,
      color: statusColors[name] || '#64748B'
    })).sort((a, b) => b.count - a.count);
  }, [initiatives]);

  // 6. Data for Agencies
  const agencyChartData = useMemo(() => {
    const agencyCounts: Record<string, number> = {};

    initiatives.forEach((item) => {
      if (!item.agensiUtama) return;
      // split commas
      item.agensiUtama.split(',').forEach((ag) => {
        const trimmed = ag.trim();
        if (trimmed && trimmed !== '-') {
          agencyCounts[trimmed] = (agencyCounts[trimmed] || 0) + 1;
        }
      });
    });

    const sorted = Object.entries(agencyCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    return showAllAgencies ? sorted : sorted.slice(0, 10);
  }, [initiatives, showAllAgencies]);

  // 7. Data for USP Budget by Component
  const uspBudgetData = useMemo(() => {
    const compBudget: Record<string, number> = {};

    initiatives.forEach((item) => {
      if (!item.bajetUSPFundRM) return;
      const matches = item.bajetUSPFundRM.toLowerCase().matchAll(/(\d+(?:\.\d+)?)\s*juta/g);
      let sumItem = 0;
      for (const m of matches) {
        sumItem += parseFloat(m[1]);
      }
      compBudget[item.komponen] = (compBudget[item.komponen] || 0) + sumItem;
    });

    return Object.entries(compBudget).map(([name, juta]) => ({
      name: name.replace('Smart ', ''),
      fullName: name,
      juta,
      color: COMPONENT_CONFIGS[name as SmartCityComponent]?.color || '#46B7B0'
    })).sort((a, b) => b.juta - a.juta);
  }, [initiatives]);

  const scrollToExplorer = () => {
    const target = document.querySelector('#inisiatif');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="analitik" className="py-20 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#46B7B0]">
              DATA & STATISTIK
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#171717] tracking-tight mt-1">
              ANALITIK BANDAR PINTAR
            </h2>
            <p className="text-sm text-stone-600 font-normal mt-1 max-w-2xl">
              Visualisasi komprehensif 85 inisiatif mengikut pecahan komponen, tahap penarafan, fasa pelaksanaan, agensi pelaksana dan peruntukan bajet USP.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onSelectComponent(null);
                onSelectFastTrack(false);
                onSelectAgency(null);
                onSelectPhase(null);
                onSelectRating(null);
                scrollToExplorer();
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET SEMUA TAPISAN</span>
            </button>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Chart 1: Initiatives by Component */}
          <div className="bg-[#FFF9F3]/60 p-6 rounded-2xl border border-stone-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  INISIATIF MENGIKUT KOMPONEN
                </h3>
                <span className="text-xs text-stone-500">Klik bar untuk menapis inisiatif</span>
              </div>
              <BarChart3 className="w-5 h-5 text-[#46B7B0]" />
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={componentChartData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                >
                  <XAxis type="number" tick={{ fontSize: 11 }} />
                  <YAxis
                    type="category"
                    dataKey="shortName"
                    tick={{ fontSize: 11, fill: '#444' }}
                    width={90}
                  />
                  <Tooltip
                    formatter={(val: any) => [`${val} Inisiatif`, 'Jumlah']}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #ddd', fontSize: '12px' }}
                  />
                  <Bar
                    dataKey="count"
                    radius={[0, 8, 8, 0]}
                    cursor="pointer"
                    onClick={(entry) => {
                      onSelectComponent(entry.name as SmartCityComponent);
                      scrollToExplorer();
                    }}
                  >
                    {componentChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Smart City Rating Donut */}
          <div className="bg-[#FFF9F3]/60 p-6 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  TAHAP PENARAFAN BANDAR PINTAR
                </h3>
                <span className="text-xs text-stone-500">Piawaian Penarafan Malaysia & ISO 37122</span>
              </div>
              <PieIcon className="w-5 h-5 text-amber-500" />
            </div>

            <div className="h-72 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ratingChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={3}
                    dataKey="value"
                    cursor="pointer"
                    onClick={(entry: any) => {
                      if (entry?.name) {
                        const level = entry.name.split(':')[0].trim();
                        onSelectRating(level);
                        scrollToExplorer();
                      }
                    }}
                  >
                    {ratingChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any) => [`${val} Inisiatif`, 'Jumlah']}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #ddd', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                </PieChart>
              </ResponsiveContainer>
              {/* Centre text */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-12 text-center pointer-events-none">
                <span className="text-2xl font-black text-stone-900 block leading-tight">85</span>
                <span className="text-[10px] font-bold uppercase text-stone-500">Inisiatif</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Chart 3: Implementation Phases */}
          <div className="bg-[#FFF9F3]/60 p-6 rounded-2xl border border-stone-200/80 shadow-xs">
            <h3 className="text-sm font-bold text-stone-900 mb-1">
              FASA PELAKSANAAN
            </h3>
            <span className="text-xs text-stone-500 block mb-4">Pengagihan mengikut 3 fasa</span>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={phaseChartData}>
                  <XAxis dataKey="fasa" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    formatter={(val: any) => [`${val} Inisiatif`, 'Jumlah']}
                    contentStyle={{ borderRadius: '12px', fontSize: '12px' }}
                  />
                  <Bar
                    dataKey="inisiatif"
                    radius={[8, 8, 0, 0]}
                    cursor="pointer"
                    onClick={(entry: any) => {
                      if (entry?.fasa) {
                        onSelectPhase(entry.fasa);
                        scrollToExplorer();
                      }
                    }}
                  >
                    {phaseChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 4: Fast Track Donut */}
          <div className="bg-[#FFF9F3]/60 p-6 rounded-2xl border border-stone-200/80 shadow-xs">
            <h3 className="text-sm font-bold text-stone-900 mb-1">
              INISIATIF FAST TRACK
            </h3>
            <span className="text-xs text-stone-500 block mb-4">Keutamaan Tinggi vs Inisiatif Lain</span>

            <div className="h-60 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={fastTrackData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                    cursor="pointer"
                    onClick={(entry) => {
                      if (entry.name === 'Fast Track') {
                        onSelectFastTrack(true);
                        scrollToExplorer();
                      }
                    }}
                  >
                    {fastTrackData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any) => [`${val} Inisiatif`, 'Jumlah']}
                    contentStyle={{ borderRadius: '12px', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-8 text-center pointer-events-none">
                <span className="text-xl font-black text-amber-600">10 / 85</span>
              </div>
            </div>
          </div>

          {/* Chart 5: Implementation Status */}
          <div className="bg-[#FFF9F3]/60 p-6 rounded-2xl border border-stone-200/80 shadow-xs">
            <h3 className="text-sm font-bold text-stone-900 mb-1">
              STATUS PELAKSANAAN
            </h3>
            <span className="text-xs text-stone-500 block mb-4">Nilai rasmi status sumber</span>

            <div className="space-y-3 pt-2">
              {statusChartData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="font-semibold text-stone-800">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-stone-900">{item.count}</span>
                    <span className="text-[10px] text-stone-400">
                      ({Math.round((item.count / 85) * 100)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts Grid Row 3: Agencies & USP Budget */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart 6: Agencies */}
          <div className="bg-[#FFF9F3]/60 p-6 rounded-2xl border border-stone-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  AGENSI UTAMA (PELAKSANA)
                </h3>
                <span className="text-xs text-stone-500">
                  {showAllAgencies ? 'Menunjukkan semua agensi pelaksana' : 'Top 10 agensi utama paling banyak inisiatif'}
                </span>
              </div>
              <button
                onClick={() => setShowAllAgencies(!showAllAgencies)}
                className="text-xs font-bold text-[#13615C] hover:underline"
              >
                {showAllAgencies ? 'TUNJUK TOP 10' : 'LIHAT SEMUA AGENSI'}
              </button>
            </div>

            <div className="h-80 w-full overflow-y-auto">
              <ResponsiveContainer width="100%" height={showAllAgencies ? 600 : '100%'}>
                <BarChart
                  data={agencyChartData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                >
                  <XAxis type="number" tick={{ fontSize: 10 }} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fontSize: 10 }}
                    width={180}
                  />
                  <Tooltip
                    formatter={(val: any) => [`${val} Inisiatif`, 'Penglibatan']}
                    contentStyle={{ borderRadius: '12px', fontSize: '11px' }}
                  />
                  <Bar
                    dataKey="count"
                    fill="#3B82F6"
                    radius={[0, 6, 6, 0]}
                    cursor="pointer"
                    onClick={(entry: any) => {
                      if (entry?.name) {
                        onSelectAgency(entry.name);
                        scrollToExplorer();
                      }
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 7: USP Fund Budget by Component */}
          <div className="bg-[#FFF9F3]/60 p-6 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-base font-bold text-stone-900">
                    BAJET USP FUND MENGIKUT KOMPONEN
                  </h3>
                  <span className="text-xs text-stone-500">Anggaran dana Universal Service Provision</span>
                </div>
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={uspBudgetData}>
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis
                      tick={{ fontSize: 10 }}
                      tickFormatter={(val) => `RM ${val}M`}
                    />
                    <Tooltip
                      formatter={(val: any) => [`RM ${val} Juta`, 'Anggaran Bajet']}
                      contentStyle={{ borderRadius: '12px', fontSize: '12px' }}
                    />
                    <Bar
                      dataKey="juta"
                      radius={[8, 8, 0, 0]}
                      cursor="pointer"
                      onClick={(entry: any) => {
                        if (entry?.fullName) {
                          onSelectComponent(entry.fullName as SmartCityComponent);
                          scrollToExplorer();
                        }
                      }}
                    >
                      {uspBudgetData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/70 text-xs text-emerald-900 mt-4">
              <Info className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Berdasarkan rekod bajet yang tersedia dalam Pelan Induk.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
