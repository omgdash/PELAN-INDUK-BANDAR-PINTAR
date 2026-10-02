import React from 'react';
import { Award, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { Initiative } from '../types/initiative';
import { SMART_CITY_RATINGS } from '../utils/constants';

interface SmartCityRatingProps {
  initiatives: Initiative[];
  onSelectRating: (ratingLevel: string) => void;
}

export const SmartCityRating: React.FC<SmartCityRatingProps> = ({
  initiatives,
  onSelectRating
}) => {
  // Count initiatives for each level dynamically
  const getRatingCount = (levelName: string) => {
    return initiatives.filter(
      (i) =>
        i.tahapPenarafanBandarPintarMalaysia &&
        i.tahapPenarafanBandarPintarMalaysia.toLowerCase().includes(levelName.toLowerCase())
    ).length;
  };

  const handleLevelClick = (level: string) => {
    onSelectRating(level);
    const target = document.querySelector('#inisiatif');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-stone-50/60 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#46B7B0]">
            KERANGKA BANDAR PINTAR MALAYSIA
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#171717] tracking-tight mt-1 mb-3">
            HALA TUJU PENARAFAN BANDAR PINTAR
          </h2>
          <p className="text-sm text-stone-600 font-normal leading-relaxed">
            Tahap penarafan bandar pintar Negeri Sembilan dirangka secara bertingkat mengikut piawaian Penarafan Bandar Pintar Malaysia (PLANMalaysia) dan MS ISO 37122.
          </p>
        </div>

        {/* Ascending Tier Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SMART_CITY_RATINGS.map((tier, idx) => {
            const count = getRatingCount(tier.level);
            const stepNum = idx + 1;

            return (
              <div
                key={tier.level}
                onClick={() => handleLevelClick(tier.level)}
                className="group cursor-pointer rounded-2xl p-6 bg-white border border-stone-200/90 hover:border-[#46B7B0] hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Step Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-600">
                      Tahap 0{stepNum}
                    </span>
                    <span className="text-2xl font-black text-[#171717]">
                      {count} <span className="text-xs font-normal text-stone-500">Inisiatif</span>
                    </span>
                  </div>

                  {/* Level Title */}
                  <h3 className="text-base font-bold text-stone-900 group-hover:text-[#46B7B0] transition-colors mb-1">
                    {tier.name}
                  </h3>

                  <p className="text-xs text-stone-500 mb-6 leading-relaxed">
                    {tier.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-stone-700 group-hover:text-[#46B7B0]">
                  <span>Lihat {count} Inisiatif</span>
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
