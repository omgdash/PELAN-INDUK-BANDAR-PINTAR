import { ComponentConfig, SmartCityComponent } from '../types/initiative';

export const COMPONENT_CONFIGS: Record<SmartCityComponent, ComponentConfig> = {
  'Smart Government': {
    name: 'Smart Government',
    slug: 'smart-government',
    color: '#46B7B0', // Turquoise
    bgPastel: 'bg-[#9EDBD7]/25',
    borderPastel: 'border-[#46B7B0]/30',
    textPastel: 'text-[#1D6A66]',
    iconName: 'Landmark',
    count: 8,
    deskripsi: 'Tadbir urus digital bersepadu, pemantauan masa nyata NeSCOM & perkhidmatan kerajaan pintar.'
  },
  'Smart Economy': {
    name: 'Smart Economy',
    slug: 'smart-economy',
    color: '#D4A31A', // Gold / Soft Yellow tone
    bgPastel: 'bg-[#F3DB7B]/30',
    borderPastel: 'border-[#F3DB7B]',
    textPastel: 'text-[#7D5B00]',
    iconName: 'TrendingUp',
    count: 11,
    deskripsi: 'Ekosistem ekonomi digital, transaksi tanpa tunai N9Pay, pelaburan berteknologi tinggi & GIG.'
  },
  'Smart Environment': {
    name: 'Smart Environment',
    slug: 'smart-environment',
    color: '#2E8B57', // SeaGreen / Nature
    bgPastel: 'bg-[#A8E6CF]/30',
    borderPastel: 'border-[#55C595]/40',
    textPastel: 'text-[#1C6843]',
    iconName: 'Leaf',
    count: 20,
    deskripsi: 'Pengurusan sisa pintar, tenaga boleh baharu, pemantauan kualiti udara, KSAS & sumber air.'
  },
  'Smart Mobility': {
    name: 'Smart Mobility',
    slug: 'smart-mobility',
    color: '#3B82F6', // Pastel Blue
    bgPastel: 'bg-[#A8CDE3]/35',
    borderPastel: 'border-[#6CA8D1]/40',
    textPastel: 'text-[#1C4C70]',
    iconName: 'Bus',
    count: 15,
    deskripsi: 'Sistem pengangkutan bersepadu, pengurusan parkir pintar, lampu isyarat pintar & mobiliti EV.'
  },
  'Smart People': {
    name: 'Smart People',
    slug: 'smart-people',
    color: '#BE185D', // Dusty Pink / Rose
    bgPastel: 'bg-[#E8B6C8]/30',
    borderPastel: 'border-[#D98AA7]/40',
    textPastel: 'text-[#831843]',
    iconName: 'Users',
    count: 6,
    deskripsi: 'Literasi digital, latihan kemahiran tinggi AI & sains data, biasiswa digital & pemerkasaan rakyat.'
  },
  'Smart Digital Infrastruktur': {
    name: 'Smart Digital Infrastruktur',
    slug: 'smart-digital-infrastruktur',
    color: '#7C3AED', // Lavender / Purple
    bgPastel: 'bg-[#C7B9DB]/35',
    borderPastel: 'border-[#A38FC4]/40',
    textPastel: 'text-[#522588]',
    iconName: 'Network',
    count: 8,
    deskripsi: 'Peluasan gentian optik 5G, Smart Pole bersepadu, WiFi awam percuma & keselamatan siber.'
  },
  'Smart Living': {
    name: 'Smart Living',
    slug: 'smart-living',
    color: '#EA580C', // Soft Peach / Orange
    bgPastel: 'bg-[#F4C6A6]/35',
    borderPastel: 'border-[#E59E6E]/40',
    textPastel: 'text-[#8F3507]',
    iconName: 'Home',
    count: 17,
    deskripsi: 'Keselamatan awam AI CCTV, butang panik bersepadu, kesihatan digital & perumahan mampu milik pintar.'
  }
};

export const IMPLEMENTATION_PHASES = [
  {
    name: 'Fasa 1',
    period: '2026 – 2030',
    description: 'Pondasi Digital & Pelaksanaan Inisiatif Segera (Fast Track)',
    tag: 'Fasa 1 (2026 - 2030)'
  },
  {
    name: 'Fasa 2',
    period: '2031 – 2035',
    description: 'Peluasan Ekosistem & Integrasi Merentas Sektor',
    tag: 'Fasa 2 (2031 - 2035)'
  },
  {
    name: 'Fasa 3',
    period: '2036 – 2040',
    description: 'Pematangan Pintar Bersepadu & Inovasi Lestari 2040',
    tag: 'Fasa 3 (2036 - 2040)'
  }
];

export const SMART_CITY_RATINGS = [
  {
    level: 'Tahap 1',
    name: 'Early Adopter',
    badgeClass: 'bg-amber-50 text-amber-900 border border-amber-200/80',
    desc: 'Penggunaan awal teknologi & infrastruktur digital asas'
  },
  {
    level: 'Tahap 2',
    name: 'Developing Smart City',
    badgeClass: 'bg-sky-50 text-sky-900 border border-sky-200/80',
    desc: 'Pembangunan sistem bersepadu & automasi perkhidmatan'
  },
  {
    level: 'Tahap 3',
    name: 'Leading Smart City',
    badgeClass: 'bg-emerald-50 text-emerald-900 border border-emerald-200/80',
    desc: 'Peneraju amalan bandar pintar dengan impak menyeluruh'
  },
  {
    level: 'Tahap 4',
    name: 'Visionary Smart City',
    badgeClass: 'bg-purple-50 text-purple-900 border border-purple-200/80',
    desc: 'Bandar berwawasan berasaskan analitik canggih & AI'
  }
];

// Helper to extract unique agencies
export function extractAgencies(initiatives: { agensiUtama: string | null; agensiSokongan: string | null }[]) {
  const primarySet = new Set<string>();
  const supportSet = new Set<string>();

  initiatives.forEach(item => {
    if (item.agensiUtama) {
      item.agensiUtama.split(',').forEach(a => {
        const trimmed = a.trim();
        if (trimmed && trimmed !== '-') primarySet.add(trimmed);
      });
    }
    if (item.agensiSokongan) {
      item.agensiSokongan.split(',').forEach(a => {
        const trimmed = a.trim();
        if (trimmed && trimmed !== '-') supportSet.add(trimmed);
      });
    }
  });

  return {
    primary: Array.from(primarySet).sort(),
    support: Array.from(supportSet).sort()
  };
}

// Calculate total USP Budget safely
export function calculateUSPBudget(initiatives: { bajetUSPFundRM: string | null }[]): {
  totalMillions: number;
  formatted: string;
  countWithBudget: number;
} {
  let totalM = 0;
  let count = 0;

  initiatives.forEach(item => {
    if (!item.bajetUSPFundRM) return;
    const text = item.bajetUSPFundRM.toLowerCase();
    count++;

    // Check for specific numbers like "20 juta", "30 juta", "CCTV 30 juta\nPanic Button 5 juta"
    const matches = text.matchAll(/(\d+(?:\.\d+)?)\s*juta/g);
    for (const match of matches) {
      const val = parseFloat(match[1]);
      if (!isNaN(val)) {
        totalM += val;
      }
    }
  });

  return {
    totalMillions: totalM,
    formatted: `RM ${totalM.toLocaleString('ms-MY')} Juta`,
    countWithBudget: count
  };
}
