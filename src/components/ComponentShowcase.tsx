import React from 'react';
import {
  Landmark,
  TrendingUp,
  Leaf,
  Bus,
  Users,
  Network,
  Home,
  ArrowRight
} from 'lucide-react';
import { COMPONENT_CONFIGS } from '../utils/constants';
import { SmartCityComponent } from '../types/initiative';

interface ComponentShowcaseProps {
  onSelectComponent: (component: SmartCityComponent) => void;
  selectedComponent: string | null;
}

export const ComponentShowcase: React.FC<ComponentShowcaseProps> = ({
  onSelectComponent,
  selectedComponent
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Landmark':
        return Landmark;
      case 'TrendingUp':
        return TrendingUp;
      case 'Leaf':
        return Leaf;
      case 'Bus':
        return Bus;
      case 'Users':
        return Users;
      case 'Network':
        return Network;
      case 'Home':
        return Home;
      default:
        return Landmark;
    }
  };

  const componentsList = Object.values(COMPONENT_CONFIGS);

  const handleCardClick = (compName: SmartCityComponent) => {
    onSelectComponent(compName);
    const target = document.querySelector('#inisiatif');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="komponen" className="py-20 relative overflow-hidden">
      {/* Background soft pastel blur */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#9EDBD7]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#F4C6A6]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#46B7B0]">
            TERAS STRATEGIK
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#171717] tracking-tight mt-1 mb-3">
            7 KOMPONEN BANDAR PINTAR
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
            Tujuh tonggak utama yang mendasari transformasi Negeri Sembilan sebagai wilayah pintar, berdaya tahan dan mampan menjelang tahun 2040.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {componentsList.map((comp) => {
            const Icon = getIcon(comp.iconName);
            const isSelected = selectedComponent === comp.name;

            return (
              <div
                key={comp.name}
                onClick={() => handleCardClick(comp.name)}
                className={`group cursor-pointer rounded-2xl p-6 transition-all duration-300 relative flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-white ring-2 ring-[#46B7B0] shadow-md -translate-y-1'
                    : 'bg-white/90 hover:bg-white hover:shadow-lg hover:-translate-y-1 border-stone-200/80'
                }`}
              >
                {/* Header Icon + Count */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${comp.bgPastel}`}
                    >
                      <Icon className="w-6 h-6" style={{ color: comp.color }} />
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-[#171717] tracking-tight block">
                        {comp.count}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600 block">
                        Inisiatif
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#171717] mb-2 group-hover:text-[#46B7B0] transition-colors leading-snug">
                    {comp.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-stone-600 leading-relaxed font-normal mb-6">
                    {comp.deskripsi}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-stone-700 group-hover:text-[#46B7B0]">
                  <span>Terokai {comp.count} Inisiatif</span>
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
