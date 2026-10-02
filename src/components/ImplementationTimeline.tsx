import React from 'react';
import { Calendar, ArrowRight, CheckCircle, Flag } from 'lucide-react';
import { Initiative } from '../types/initiative';
import { IMPLEMENTATION_PHASES } from '../utils/constants';

interface ImplementationTimelineProps {
  initiatives: Initiative[];
  onSelectPhase: (phase: string) => void;
}

export const ImplementationTimeline: React.FC<ImplementationTimelineProps> = ({
  initiatives,
  onSelectPhase
}) => {
  // Count dynamically per phase (initiatives can span multiple phases)
  const getPhaseCount = (phaseKey: string) => {
    return initiatives.filter((i) => i.fasaPelaksanaan && i.fasaPelaksanaan.includes(phaseKey)).length;
  };

  const phasesWithCounts = IMPLEMENTATION_PHASES.map((p) => ({
    ...p,
    count: getPhaseCount(p.name)
  }));

  const handlePhaseClick = (phaseName: string) => {
    onSelectPhase(phaseName);
    const target = document.querySelector('#inisiatif');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hala-tuju" className="py-20 bg-white relative border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#46B7B0]">
            PERANCANGAN STRATEGIK
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#171717] tracking-tight mt-1 mb-3">
            HALA TUJU PELAKSANAAN 2040
          </h2>
          <p className="text-sm text-stone-600 font-normal leading-relaxed">
            Perancangan berfasa 15 tahun dari 2026 hingga 2040. Sesetengah inisiatif berskala besar dirancang merentasi beberapa fasa pembangunan untuk kesinambungan impak.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {phasesWithCounts.map((phase, idx) => {
            const isFasa1 = idx === 0;
            const isFasa2 = idx === 1;
            const isFasa3 = idx === 2;

            const bgTheme = isFasa1
              ? 'border-[#46B7B0]/60 hover:border-[#46B7B0]'
              : isFasa2
              ? 'border-sky-300 hover:border-sky-500'
              : 'border-[#C7B9DB] hover:border-purple-500';

            const badgeColor = isFasa1
              ? 'bg-[#9EDBD7]/30 text-[#13615C]'
              : isFasa2
              ? 'bg-sky-100 text-sky-800'
              : 'bg-purple-100 text-purple-800';

            return (
              <div
                key={phase.name}
                onClick={() => handlePhaseClick(phase.name)}
                className={`group cursor-pointer rounded-2xl p-7 border-2 ${bgTheme} bg-[#FFF9F3]/60 hover:bg-white transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col justify-between`}
              >
                <div>
                  {/* Phase Number & Period */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-extrabold px-3 py-1 rounded-lg ${badgeColor}`}>
                      {phase.name}
                    </span>
                    <span className="text-sm font-black font-mono text-stone-900 tracking-tight">
                      {phase.period}
                    </span>
                  </div>

                  {/* Count indicator */}
                  <div className="mb-4">
                    <div className="text-4xl font-black text-[#171717] tracking-tight">
                      {phase.count}
                    </div>
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                      Inisiatif Terlibat
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-stone-600 leading-relaxed font-normal mb-6">
                    {phase.description}
                  </p>
                </div>

                {/* Footer link */}
                <div className="pt-4 border-t border-stone-200/60 flex items-center justify-between text-xs font-bold text-stone-800 group-hover:text-[#46B7B0]">
                  <span>Tapis Inisiatif {phase.name}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
