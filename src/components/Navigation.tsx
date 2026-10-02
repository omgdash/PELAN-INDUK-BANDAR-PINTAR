import React, { useState, useEffect } from 'react';
import { NogoriLogo } from './NogoriLogo';
import { Search, Presentation, Menu, X, Sparkles, MapPin, Layers } from 'lucide-react';

interface NavigationProps {
  onOpenSearch: () => void;
  isPresentationMode: boolean;
  onTogglePresentation: () => void;
  activeSection: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  onOpenSearch,
  isPresentationMode,
  onTogglePresentation,
  activeSection
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Utama', href: '#utama' },
    { label: 'Komponen', href: '#komponen' },
    { label: 'Inisiatif', href: '#inisiatif' },
    { label: 'Fast Track', href: '#fast-track' },
    { label: 'Smart Map', href: '#smart-map' },
    { label: 'Hala Tuju', href: '#hala-tuju' },
    { label: 'Agensi', href: '#agensi' },
    { label: 'Analitik', href: '#analitik' },
    { label: 'Data', href: '#data-inisiatif' },
    { label: 'AI Insights', href: '#ai-insights' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isPresentationMode) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-stone-900/95 backdrop-blur-md text-white py-2.5 px-6 shadow-lg flex items-center justify-between border-b border-stone-800">
        <div className="flex items-center gap-3">
          <NogoriLogo size="sm" />
          <div>
            <span className="font-bold text-sm tracking-wide text-amber-300">MOD PEMBENTANGAN EKSEKUTIF</span>
            <p className="text-[11px] text-stone-300">Pelan Induk Bandar Pintar Negeri Sembilan 2040</p>
          </div>
        </div>
        <button
          onClick={onTogglePresentation}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-600/90 hover:bg-red-700 text-xs font-semibold tracking-wide text-white transition-colors"
        >
          <span>Keluar Mod Pembentangan</span>
          <kbd className="px-1.5 py-0.5 text-[10px] bg-red-900/60 rounded">Esc</kbd>
        </button>
      </header>
    );
  }

  return (
    <nav
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FFF9F3]/95 backdrop-blur-md shadow-xs border-b border-stone-200/80 py-2'
          : 'bg-[#FFF9F3] py-3 border-b border-stone-200/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <a
            href="#utama"
            onClick={(e) => handleNavClick(e, '#utama')}
            className="flex items-center gap-3 group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#46B7B0] rounded-xl p-1"
          >
            <NogoriLogo size="sm" showSubtitle={true} />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    isActive
                      ? 'text-[#171717] bg-stone-200/60 shadow-2xs'
                      : 'text-stone-600 hover:text-[#171717] hover:bg-stone-100/60'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSearch}
              aria-label="Carian Global"
              title="Carian Global (Ctrl+K)"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200/80 text-stone-700 text-xs font-medium border border-stone-200 transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-stone-500" />
              <span className="hidden sm:inline">Cari Inisiatif</span>
              <kbd className="hidden md:inline text-[10px] text-stone-400 bg-white px-1 py-0.5 rounded border border-stone-300">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={onTogglePresentation}
              aria-label="Mod Pembentangan"
              title="Masuk Mod Pembentangan"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#46B7B0]/15 hover:bg-[#46B7B0]/25 text-[#13615C] text-xs font-semibold border border-[#46B7B0]/30 transition-colors"
            >
              <Presentation className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Pembentangan</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Buka Menu"
              className="xl:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100 focus:outline-hidden"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FFF9F3] border-b border-stone-200 px-4 pt-3 pb-6 shadow-xl transition-all">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 text-xs font-medium text-stone-800 rounded-lg bg-stone-50 border border-stone-200/70 hover:bg-[#9EDBD7]/20 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
