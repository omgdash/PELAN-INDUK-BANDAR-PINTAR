import React, { useState, useEffect } from 'react';
import rawData from './data/nogori_pintar_2040_master_data.json';
import { MasterData, Initiative, SmartCityComponent } from './types/initiative';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { ExecutiveOverview } from './components/ExecutiveOverview';
import { ComponentShowcase } from './components/ComponentShowcase';
import { InitiativeExplorer } from './components/InitiativeExplorer';
import { InitiativeDrawer } from './components/InitiativeDrawer';
import { FastTrackShowcase } from './components/FastTrackShowcase';
import { ImplementationTimeline } from './components/ImplementationTimeline';
import { SmartCityRating } from './components/SmartCityRating';
import { AnalyticsSection } from './components/AnalyticsSection';
import { SmartMapSection } from './components/SmartMapSection';
import { AgencyExplorer } from './components/AgencyExplorer';
import { DataTableSection } from './components/DataTableSection';
import { AiInsightsSection } from './components/AiInsightsSection';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { PresentationMode } from './components/PresentationMode';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import { AlertCircle, RotateCcw } from 'lucide-react';

export default function App() {
  const [data, setData] = useState<MasterData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Modal / Drawer states
  const [selectedInitiative, setSelectedInitiative] = useState<Initiative | null>(null);
  const [selectedInitiativeForMap, setSelectedInitiativeForMap] = useState<Initiative | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPresentationMode, setIsPresentationMode] = useState(false);

  // Filter states
  const [selectedComponent, setSelectedComponent] = useState<SmartCityComponent | null>(null);
  const [fastTrackOnly, setFastTrackOnly] = useState(false);
  const [filterAgency, setFilterAgency] = useState<string | null>(null);
  const [filterPhase, setFilterPhase] = useState<string | null>(null);
  const [filterRating, setFilterRating] = useState<string | null>(null);

  // Active section for navigation
  const [activeSection, setActiveSection] = useState('utama');

  // Load and validate dataset on startup
  useEffect(() => {
    try {
      if (!rawData || !rawData.inisiatif || !Array.isArray(rawData.inisiatif)) {
        throw new Error('Data format invalid');
      }

      const master = rawData as MasterData;
      setData(master);

      // Data validation check
      const initiativeCount = master.inisiatif.length;
      const componentCount = new Set(master.inisiatif.map((i) => i.komponen)).size;
      const ftCount = master.inisiatif.filter((i) => i.fastTrack).length;

      if (initiativeCount !== 85) {
        console.warn(`Data Validation Warning: Expected 85 initiatives, found ${initiativeCount}`);
      }
      if (componentCount !== 7) {
        console.warn(`Data Validation Warning: Expected 7 components, found ${componentCount}`);
      }
      if (ftCount !== 10) {
        console.warn(`Data Validation Warning: Expected 10 Fast Track, found ${ftCount}`);
      }

      // Smooth brief loading transition
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 350);
      return () => clearTimeout(timer);
    } catch (err) {
      console.error('Data loading error:', err);
      setHasError(true);
      setIsLoading(false);
    }
  }, []);

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'utama',
        'komponen',
        'inisiatif',
        'fast-track',
        'smart-map',
        'hala-tuju',
        'agensi',
        'analitik',
        'data-inisiatif',
        'ai-insights'
      ];

      const scrollPos = window.scrollY + 200;
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(s);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation handlers
  const handleScrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewOnMap = (initiative: Initiative) => {
    setSelectedInitiative(null);
    setSelectedInitiativeForMap(initiative);
    handleScrollTo('smart-map');
  };

  const handleSelectComponentFromAnywhere = (comp: SmartCityComponent | null) => {
    setSelectedComponent(comp);
    handleScrollTo('inisiatif');
  };

  const handleSelectFastTrackFromAnywhere = (ft: boolean = true) => {
    setFastTrackOnly(ft);
    handleScrollTo('inisiatif');
  };

  const handleSelectAgencyFromAnywhere = (agency: string | null) => {
    setFilterAgency(agency);
    handleScrollTo('inisiatif');
  };

  const handleSelectPhaseFromAnywhere = (phase: string | null) => {
    setFilterPhase(phase);
    handleScrollTo('inisiatif');
  };

  const handleSelectRatingFromAnywhere = (rating: string | null) => {
    setFilterRating(rating);
    handleScrollTo('inisiatif');
  };

  if (hasError || !data) {
    return (
      <div className="min-h-screen bg-[#FFF9F3] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-xl font-bold text-stone-900 mb-2">
          Data Pelan Induk tidak dapat dimuatkan.
        </h1>
        <p className="text-sm text-stone-600 mb-6 max-w-md">
          Sila muat semula halaman ini atau semak sambungan rangkaian anda.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 text-white font-bold text-xs hover:bg-stone-800 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>CUBA SEMULA</span>
        </button>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-[#FFF9F3] text-[#171717] flex flex-col relative selection:bg-[#9EDBD7] selection:text-[#171717]">
      {/* Navigation */}
      <Navigation
        onOpenSearch={() => setIsSearchOpen(true)}
        isPresentationMode={isPresentationMode}
        onTogglePresentation={() => setIsPresentationMode(!isPresentationMode)}
        activeSection={activeSection}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          totalInitiatives={data.metadata.jumlahInisiatif}
          totalComponents={data.metadata.jumlahKomponen}
          totalFastTrack={data.metadata.jumlahFastTrack}
          onExploreClick={() => handleScrollTo('inisiatif')}
          onMapClick={() => handleScrollTo('smart-map')}
        />

        {/* 2. Executive Overview (KPI Cards) */}
        <ExecutiveOverview initiatives={data.inisiatif} />

        {/* 3. 7 Smart City Components */}
        <ComponentShowcase
          onSelectComponent={(comp) => handleSelectComponentFromAnywhere(comp)}
          selectedComponent={selectedComponent}
        />

        {/* 4. Initiative Explorer (Filters & Cards) */}
        <InitiativeExplorer
          initiatives={data.inisiatif}
          selectedComponent={selectedComponent}
          onSelectComponent={setSelectedComponent}
          selectedInitiative={selectedInitiative}
          onSelectInitiative={setSelectedInitiative}
          onViewOnMap={handleViewOnMap}
          fastTrackOnly={fastTrackOnly}
          setFastTrackOnly={setFastTrackOnly}
          filterAgency={filterAgency}
          setFilterAgency={setFilterAgency}
          filterPhase={filterPhase}
          setFilterPhase={setFilterPhase}
          filterRating={filterRating}
          setFilterRating={setFilterRating}
        />

        {/* 5. Fast Track Showcase */}
        <FastTrackShowcase
          initiatives={data.inisiatif}
          onSelectInitiative={setSelectedInitiative}
          onViewOnMap={handleViewOnMap}
        />

        {/* 6. Implementation Timeline (Hala Tuju 2040) */}
        <ImplementationTimeline
          initiatives={data.inisiatif}
          onSelectPhase={handleSelectPhaseFromAnywhere}
        />

        {/* 7. Smart City Rating Levels */}
        <SmartCityRating
          initiatives={data.inisiatif}
          onSelectRating={handleSelectRatingFromAnywhere}
        />

        {/* 8. Smart City Analytics (Interactive Charts) */}
        <AnalyticsSection
          initiatives={data.inisiatif}
          onSelectComponent={handleSelectComponentFromAnywhere}
          onSelectFastTrack={handleSelectFastTrackFromAnywhere}
          onSelectAgency={handleSelectAgencyFromAnywhere}
          onSelectPhase={handleSelectPhaseFromAnywhere}
          onSelectRating={handleSelectRatingFromAnywhere}
        />

        {/* 9. Smart Map (Leaflet & OpenStreetMap) */}
        <SmartMapSection
          initiatives={data.inisiatif}
          onSelectInitiative={setSelectedInitiative}
          selectedInitiativeForMap={selectedInitiativeForMap}
        />

        {/* 10. Agency Explorer */}
        <AgencyExplorer
          initiatives={data.inisiatif}
          onSelectInitiative={setSelectedInitiative}
        />

        {/* 11. Interactive Data Table */}
        <DataTableSection
          initiatives={data.inisiatif}
          onSelectInitiative={setSelectedInitiative}
        />

        {/* 12. Nogori Pintar AI Insights */}
        <AiInsightsSection
          initiatives={data.inisiatif}
          onSelectComponent={handleSelectComponentFromAnywhere}
          onSelectFastTrack={() => handleScrollTo('fast-track')}
          onOpenMap={() => handleScrollTo('smart-map')}
          onSelectInitiative={setSelectedInitiative}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Initiative Side Drawer / Modal */}
      <InitiativeDrawer
        initiative={selectedInitiative}
        onClose={() => setSelectedInitiative(null)}
        onViewOnMap={handleViewOnMap}
      />

      {/* Global Search Modal (Ctrl+K) */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        initiatives={data.inisiatif}
        onSelectInitiative={(init) => {
          setSelectedInitiative(init);
        }}
      />

      {/* Presentation Mode Overlay */}
      {isPresentationMode && (
        <PresentationMode
          initiatives={data.inisiatif}
          onExit={() => setIsPresentationMode(false)}
          onSelectInitiative={(init) => setSelectedInitiative(init)}
        />
      )}
    </div>
  );
}
