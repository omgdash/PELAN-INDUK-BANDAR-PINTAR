import React, { useState, useEffect } from 'react';
import { Search, X, Zap, ArrowRight, Building } from 'lucide-react';
import { Initiative } from '../types/initiative';
import { COMPONENT_CONFIGS } from '../utils/constants';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initiatives: Initiative[];
  onSelectInitiative: (init: Initiative) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  initiatives,
  onSelectInitiative
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Keyboard shortcut listener (Cmd+K / Ctrl+K / Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const searchResults = searchTerm.trim()
    ? initiatives.filter((item) => {
        const q = searchTerm.toLowerCase();
        return (
          item.kodInisiatif.toLowerCase().includes(q) ||
          item.inisiatif.toLowerCase().includes(q) ||
          (item.outcome && item.outcome.toLowerCase().includes(q)) ||
          (item.agensiUtama && item.agensiUtama.toLowerCase().includes(q)) ||
          item.komponen.toLowerCase().includes(q)
        );
      }).slice(0, 12)
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex items-start justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-stone-200 flex items-center gap-3 bg-[#FFF9F3]">
          <Search className="w-5 h-5 text-stone-400" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari kod inisiatif, nama inisiatif, agensi, atau kata kunci..."
            className="flex-1 text-sm bg-transparent border-none text-stone-900 focus:outline-hidden placeholder:text-stone-400"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[420px] overflow-y-auto p-3 divide-y divide-stone-100">
          {searchTerm.trim() === '' ? (
            <div className="text-center py-12 text-xs text-stone-400">
              Mula menaip untuk mencari mana-mana daripada 85 inisiatif...
            </div>
          ) : searchResults.length > 0 ? (
            searchResults.map((item) => {
              const compConfig = COMPONENT_CONFIGS[item.komponen];

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectInitiative(item);
                    onClose();
                  }}
                  className="p-3 rounded-xl hover:bg-amber-50/50 transition-colors cursor-pointer group flex items-start justify-between gap-3"
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
                        <span className="inline-flex items-center gap-0.5 text-[9px] font-extrabold px-1.5 py-0.5 rounded-sm bg-amber-500 text-white">
                          <Zap className="w-2.5 h-2.5 fill-white" />
                          FT
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-bold text-stone-900 group-hover:text-[#46B7B0] leading-snug line-clamp-2">
                      {item.inisiatif}
                    </h4>
                    {item.agensiUtama && (
                      <p className="text-[11px] text-stone-500 truncate mt-1">
                        {item.agensiUtama}
                      </p>
                    )}
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-[#46B7B0] group-hover:translate-x-1 transition-all mt-2 shrink-0" />
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 text-xs text-stone-400">
              Tiada hasil carian ditemui untuk "{searchTerm}".
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-stone-50 border-t border-stone-200 text-right text-[11px] text-stone-400 flex items-center justify-between">
          <span>Gunakan kekunci ESC untuk keluar</span>
          <span className="font-mono font-medium">{searchResults.length} hasil dipaparkan</span>
        </div>
      </div>
    </div>
  );
};
