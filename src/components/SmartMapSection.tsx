import React, { useState, useMemo, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Search, Filter, Zap, ChevronDown, ChevronUp, Layers, Compass } from 'lucide-react';
import { Initiative, SmartCityComponent, Coordinate } from '../types/initiative';
import { COMPONENT_CONFIGS } from '../utils/constants';

interface SmartMapSectionProps {
  initiatives: Initiative[];
  onSelectInitiative: (initiative: Initiative) => void;
  selectedInitiativeForMap: Initiative | null;
}

// Controller component to smoothly flyTo a coordinate
const MapFlyTo: React.FC<{ targetCoord: [number, number] | null }> = ({ targetCoord }) => {
  const map = useMap();
  useEffect(() => {
    if (targetCoord) {
      map.flyTo(targetCoord, 14, { duration: 1.5 });
    }
  }, [targetCoord, map]);
  return null;
};

// Reset map view controller
const ResetViewButton: React.FC = () => {
  const map = useMap();
  return (
    <button
      onClick={() => map.flyTo([2.7258, 101.9424], 10, { duration: 1.2 })}
      title="Set semula pandangan Negeri Sembilan"
      className="absolute top-4 right-4 z-[1000] bg-white/95 hover:bg-white text-stone-800 p-2.5 rounded-xl shadow-md border border-stone-200 text-xs font-bold flex items-center gap-1.5 transition-all"
    >
      <Compass className="w-4 h-4 text-[#46B7B0]" />
      <span className="hidden sm:inline">Pusat Negeri</span>
    </button>
  );
};

export const SmartMapSection: React.FC<SmartMapSectionProps> = ({
  initiatives,
  onSelectInitiative,
  selectedInitiativeForMap
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [compFilter, setCompFilter] = useState<string>('all');
  const [ftFilter, setFtFilter] = useState(false);
  const [legendOpen, setLegendOpen] = useState(true);
  const [activeFlyCoord, setActiveFlyCoord] = useState<[number, number] | null>(null);

  // Focus coordinate when selected from external initiative drawer
  useEffect(() => {
    if (selectedInitiativeForMap && selectedInitiativeForMap.koordinat && selectedInitiativeForMap.koordinat.length > 0) {
      const first = selectedInitiativeForMap.koordinat[0];
      if (isValidCoord(first.lat, first.lng)) {
        setActiveFlyCoord([first.lat, first.lng]);
      }
    }
  }, [selectedInitiativeForMap]);

  function isValidCoord(lat: number, lng: number): boolean {
    return (
      typeof lat === 'number' &&
      typeof lng === 'number' &&
      !isNaN(lat) &&
      !isNaN(lng) &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180
    );
  }

  // Flatten all valid coordinate points with initiative data
  const mappedPoints = useMemo(() => {
    const list: Array<{
      pointId: string;
      initiative: Initiative;
      lat: number;
      lng: number;
      pointIndex: number;
    }> = [];

    initiatives.forEach((init) => {
      if (!init.koordinat || init.koordinat.length === 0) return;

      init.koordinat.forEach((c, idx) => {
        if (isValidCoord(c.lat, c.lng)) {
          list.push({
            pointId: `${init.id}__pt_${idx}`,
            initiative: init,
            lat: c.lat,
            lng: c.lng,
            pointIndex: idx + 1
          });
        }
      });
    });

    return list;
  }, [initiatives]);

  // Distinct initiatives that have at least one valid coordinate
  const mappedInitiatives = useMemo(() => {
    return initiatives.filter(
      (init) => init.koordinat && init.koordinat.some((c) => isValidCoord(c.lat, c.lng))
    );
  }, [initiatives]);

  // Filtered sidebar initiatives
  const filteredSidebarList = useMemo(() => {
    return mappedInitiatives.filter((init) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchCode = init.kodInisiatif.toLowerCase().includes(q);
        const matchTitle = init.inisiatif.toLowerCase().includes(q);
        const matchAgency = init.agensiUtama?.toLowerCase().includes(q) ?? false;
        if (!matchCode && !matchTitle && !matchAgency) return false;
      }
      if (compFilter !== 'all' && init.komponen !== compFilter) return false;
      if (ftFilter && !init.fastTrack) return false;
      return true;
    });
  }, [mappedInitiatives, searchQuery, compFilter, ftFilter]);

  // Create custom marker icons matching component colors
  const createCustomMarker = (comp: SmartCityComponent, isFastTrack: boolean) => {
    const color = COMPONENT_CONFIGS[comp]?.color || '#46B7B0';
    const ringColor = isFastTrack ? '#F59E0B' : '#FFFFFF';

    return L.divIcon({
      className: 'custom-map-marker',
      html: `
        <div style="
          background-color: ${color};
          width: 28px;
          height: 28px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 2.5px solid ${ringColor};
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        ">
          <div style="
            width: 8px;
            height: 8px;
            background-color: white;
            border-radius: 50%;
            transform: rotate(45deg);
          "></div>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 28],
      popupAnchor: [0, -28]
    });
  };

  const handleFlyTo = (coord: Coordinate) => {
    if (isValidCoord(coord.lat, coord.lng)) {
      setActiveFlyCoord([coord.lat, coord.lng]);
    }
  };

  return (
    <section id="smart-map" className="py-20 bg-stone-50 border-t border-stone-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#46B7B0]">
            INTEGRASI GEOSPATIAL
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#171717] tracking-tight mt-1 mb-2">
            SMART MAP
          </h2>
          <p className="text-sm text-stone-600 font-normal">
            Pelan Induk Bandar Pintar Negeri Sembilan 2040. Memaparkan semua 76 titik lokasi bagi 8 inisiatif pintar berlokasi di seluruh daerah Negeri Sembilan.
          </p>
        </div>

        {/* Map Container Layout */}
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xl overflow-hidden flex flex-col lg:flex-row h-[700px] relative">
          {/* Map Viewer (~70% desktop) */}
          <div className="w-full lg:w-[68%] h-[400px] lg:h-full relative z-10">
            <MapContainer
              center={[2.7258, 101.9424]}
              zoom={10}
              scrollWheelZoom={false}
              className="w-full h-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <MapFlyTo targetCoord={activeFlyCoord} />
              <ResetViewButton />

              {/* Plot ALL coordinate points */}
              {mappedPoints.map((item) => {
                const icon = createCustomMarker(item.initiative.komponen, item.initiative.fastTrack);

                return (
                  <Marker
                    key={item.pointId}
                    position={[item.lat, item.lng]}
                    icon={icon}
                  >
                    <Popup className="custom-leaflet-popup">
                      <div className="p-1 max-w-xs text-left">
                        <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                          <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-stone-900 text-white">
                            {item.initiative.kodInisiatif}
                          </span>
                          <span className="text-[10px] font-bold text-stone-600">
                            {item.initiative.komponen}
                          </span>
                          {item.initiative.fastTrack && (
                            <span className="text-[9px] font-extrabold px-1.5 py-0.5 bg-amber-500 text-white rounded-xs">
                              FT
                            </span>
                          )}
                        </div>

                        <h4 className="text-xs font-bold text-stone-900 leading-snug mb-1.5">
                          {item.initiative.inisiatif}
                        </h4>

                        <p className="text-[11px] text-stone-600 mb-2 leading-tight">
                          <strong className="text-stone-800">Agensi:</strong> {item.initiative.agensiUtama || '-'}
                        </p>

                        <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
                          <span className="text-[10px] font-mono text-stone-400">
                            Titik #{item.pointIndex}
                          </span>
                          <button
                            onClick={() => onSelectInitiative(item.initiative)}
                            className="text-xs font-bold text-[#13615C] hover:underline"
                          >
                            LIHAT BUTIRAN →
                          </button>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>

            {/* Floating Collapsible Legend */}
            <div className="absolute bottom-4 left-4 z-[1000] bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-stone-200 text-xs max-w-xs">
              <div
                className="flex items-center justify-between cursor-pointer select-none font-bold text-stone-800 gap-4"
                onClick={() => setLegendOpen(!legendOpen)}
              >
                <div className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#46B7B0]" />
                  <span>Petunjuk Komponen</span>
                </div>
                {legendOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </div>

              {legendOpen && (
                <div className="grid grid-cols-1 gap-1.5 mt-2.5 pt-2 border-t border-stone-100 text-[11px]">
                  {Object.values(COMPONENT_CONFIGS).map((c) => (
                    <div key={c.name} className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: c.color }}
                      />
                      <span className="text-stone-700 truncate">{c.name}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 pt-1 border-t border-stone-100 text-amber-800 font-semibold">
                    <span className="w-3 h-3 rounded-full border-2 border-amber-500 bg-amber-400 shrink-0" />
                    <span>Bingkai Kuning: Fast Track</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar (~30% desktop) */}
          <div className="w-full lg:w-[32%] h-full bg-[#FFF9F3] border-t lg:border-t-0 lg:border-l border-stone-200 flex flex-col z-20">
            {/* Sidebar Header & Filters */}
            <div className="p-4 border-b border-stone-200 bg-white">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#46B7B0]" />
                  <span className="font-extrabold text-xs uppercase tracking-wider text-stone-800">
                    INISIATIF DIPETAKAN
                  </span>
                </div>
                <span className="text-[11px] font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                  {filteredSidebarList.length} Inisiatif ({mappedPoints.length} Titik)
                </span>
              </div>

              {/* Sidebar Search */}
              <div className="relative mb-2.5">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari inisiatif dipetakan..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#46B7B0]"
                />
              </div>

              {/* Fast Track Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFtFilter(!ftFilter)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 border transition-colors ${
                    ftFilter
                      ? 'bg-amber-500 text-white border-amber-600'
                      : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <Zap className={`w-3 h-3 ${ftFilter ? 'fill-white' : 'text-amber-500'}`} />
                  Fast Track
                </button>
              </div>
            </div>

            {/* Mapped Initiatives Scroll List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-stone-100">
              {filteredSidebarList.map((init) => {
                const compConfig = COMPONENT_CONFIGS[init.komponen];
                const firstCoord = init.koordinat[0];

                return (
                  <div
                    key={init.id}
                    className="pt-3 first:pt-0 group hover:bg-white p-2.5 rounded-xl transition-colors border border-transparent hover:border-stone-200"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-stone-900 text-white">
                          {init.kodInisiatif}
                        </span>
                        <span className={`text-[10px] font-bold ${compConfig?.textPastel}`}>
                          {init.komponen}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-cyan-700 bg-cyan-50 px-1.5 py-0.5 rounded-sm">
                        {init.koordinat.length} Lokasi
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-stone-900 leading-snug mb-1">
                      {init.inisiatif}
                    </h4>

                    <p className="text-[11px] text-stone-500 line-clamp-1 mb-2">
                      {init.agensiUtama}
                    </p>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={() => handleFlyTo(firstCoord)}
                        className="text-[11px] font-bold text-[#13615C] hover:underline flex items-center gap-1"
                      >
                        <MapPin className="w-3 h-3" />
                        Terbang Ke Lokasi
                      </button>

                      <button
                        onClick={() => onSelectInitiative(init)}
                        className="text-[11px] font-bold text-stone-700 hover:text-stone-950"
                      >
                        Butiran →
                      </button>
                    </div>
                  </div>
                );
              })}

              {filteredSidebarList.length === 0 && (
                <div className="text-center py-8 text-xs text-stone-400">
                  Tiada inisiatif berlokasi mengikut kriteria ini.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
