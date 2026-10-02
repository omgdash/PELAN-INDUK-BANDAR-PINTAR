import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, ArrowRight, Layers, Zap, MapPin, Building, RotateCcw } from 'lucide-react';
import { Initiative, SmartCityComponent } from '../types/initiative';
import { COMPONENT_CONFIGS, calculateUSPBudget, extractAgencies } from '../utils/constants';

interface AiInsightsSectionProps {
  initiatives: Initiative[];
  onSelectComponent: (comp: SmartCityComponent) => void;
  onSelectFastTrack: () => void;
  onOpenMap: () => void;
  onSelectInitiative: (init: Initiative) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  chips?: Array<{ label: string; action: () => void }>;
  kpis?: Array<{ label: string; value: string | number }>;
  items?: Initiative[];
}

export const AiInsightsSection: React.FC<AiInsightsSectionProps> = ({
  initiatives,
  onSelectComponent,
  onSelectFastTrack,
  onOpenMap,
  onSelectInitiative
}) => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Salam sejahtera! Saya sedia membantu anda meneroka maklumat rasmi Pelan Induk Bandar Pintar Negeri Sembilan 2040. Anda boleh memilih cadangan di bawah atau menaip sebarang pertanyaan.',
      kpis: [
        { label: 'Jumlah Inisiatif', value: '85' },
        { label: 'Komponen', value: '7' },
        { label: 'Fast Track', value: '10' }
      ]
    }
  ]);

  const suggestionChips = [
    'Ringkaskan Pelan Induk',
    'Apakah inisiatif Fast Track?',
    'Bandingkan komponen',
    'Agensi paling banyak terlibat',
    'Analisis fasa pelaksanaan',
    'Inisiatif yang mempunyai lokasi',
    'Analisis bajet USP',
    'Cari Smart Mobility'
  ];

  const processQuery = (rawQuery: string): ChatMessage => {
    const q = rawQuery.toLowerCase().trim();

    // 1. Ringkaskan Pelan Induk
    if (q.includes('ringkas') || q.includes('apa itu') || q.includes('gambaran')) {
      const budget = calculateUSPBudget(initiatives);
      return {
        id: Date.now().toString(),
        sender: 'assistant',
        text: 'Pelan Induk Bandar Pintar Negeri Sembilan 2040 bertemakan “Memacu Inovasi, Menjamin Kelestarian”. Pelan ini merangkumi 85 inisiatif rasmi merentas 7 komponen utama untuk tempoh 15 tahun (2026–2040), dengan 10 projek Fast Track berkeutamaan tinggi.',
        kpis: [
          { label: 'Jumlah Inisiatif', value: 85 },
          { label: 'Komponen', value: 7 },
          { label: 'Fast Track', value: 10 },
          { label: 'Anggaran Bajet USP', value: budget.formatted }
        ],
        chips: [
          { label: 'Lihat Semua 85 Inisiatif', action: () => {
            const el = document.querySelector('#inisiatif');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        ]
      };
    }

    // 2. Fast Track
    if (q.includes('fast track') || q.includes('segera') || q.includes('keutamaan')) {
      const ftItems = initiatives.filter((i) => i.fastTrack);
      return {
        id: Date.now().toString(),
        sender: 'assistant',
        text: `Terdapat tepat 10 inisiatif Fast Track dalam Pelan Induk 2040. Inisiatif ini diberi keutamaan untuk impak pantas kepada rakyat seperti AI Chatbot Perpatih@NS, Smart Electric Meter TNB, Smart Parking, Hab EV R&R Seremban, Smart Water Management, dan peluasan 5G/Fiber.`,
        items: ftItems.slice(0, 4),
        chips: [
          { label: 'Buka Ruang Pameran Fast Track', action: onSelectFastTrack }
        ]
      };
    }

    // 3. Bandingkan komponen
    if (q.includes('banding') || q.includes('komponen mana') || q.includes('paling banyak')) {
      const counts = Object.entries(COMPONENT_CONFIGS)
        .map(([name, conf]) => ({ name, count: conf.count }))
        .sort((a, b) => b.count - a.count);

      const top = counts[0];
      return {
        id: Date.now().toString(),
        sender: 'assistant',
        text: `Komponen dengan inisiatif terbanyak ialah ${top.name} dengan ${top.count} inisiatif, diikuti Smart Living (17) dan Smart Mobility (15).`,
        kpis: counts.slice(0, 4).map((c) => ({ label: c.name.replace('Smart ', ''), value: `${c.count} inisiatif` })),
        chips: [
          { label: `Tapis ${top.name} (${top.count})`, action: () => onSelectComponent(top.name as SmartCityComponent) }
        ]
      };
    }

    // 4. Agensi
    if (q.includes('agensi') || q.includes('jabatan') || q.includes('sukns') || q.includes('pbt')) {
      const { primary } = extractAgencies(initiatives);
      return {
        id: Date.now().toString(),
        sender: 'assistant',
        text: `Pelan Induk melibatkan kolaborasi ${primary.length} agensi utama kerajaan dan swasta. Antara agensi paling kerap terlibat ialah SUKNS (Bahagian Khidmat Pengurusan & IT), MBS, PBT seluruh negeri, MCMC, SWCorp, SAINS, TNB, JKR dan Polis Diraja Malaysia (PDRM).`,
        chips: [
          { label: 'Buka Penjelajah Agensi', action: () => {
            const el = document.querySelector('#agensi');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        ]
      };
    }

    // 5. Lokasi / Peta / Koordinat
    if (q.includes('lokasi') || q.includes('peta') || q.includes('map') || q.includes('koordinat')) {
      const mapped = initiatives.filter((i) => i.koordinat && i.koordinat.length > 0);
      const totalPts = initiatives.reduce((acc, curr) => acc + (curr.koordinat?.length || 0), 0);
      return {
        id: Date.now().toString(),
        sender: 'assistant',
        text: `Terdapat 8 inisiatif yang mempunyai data geospatial khusus dengan sejumlah ${totalPts} titik koordinat sebenar merangkumi lokasi Smart Pole, Smart Parking, Panic Button, dan Trafik Pintar di pelbagai daerah seperti Seremban, Nilai, Port Dickson, Kuala Pilah, Jempol, Rembau dan Jelebu.`,
        kpis: [
          { label: 'Inisiatif Berlokasi', value: `${mapped.length} inisiatif` },
          { label: 'Jumlah Titik Koordinat', value: `${totalPts} titik` }
        ],
        chips: [
          { label: 'Buka Smart Map', action: onOpenMap }
        ]
      };
    }

    // 6. Fasa Pelaksanaan
    if (q.includes('fasa') || q.includes('timeline') || q.includes('2026') || q.includes('2030') || q.includes('2040')) {
      const f1 = initiatives.filter((i) => i.fasaPelaksanaan?.includes('Fasa 1')).length;
      const f2 = initiatives.filter((i) => i.fasaPelaksanaan?.includes('Fasa 2')).length;
      const f3 = initiatives.filter((i) => i.fasaPelaksanaan?.includes('Fasa 3')).length;

      return {
        id: Date.now().toString(),
        sender: 'assistant',
        text: `Pelan Induk dibahagikan kepada 3 fasa strategik: Fasa 1 (2026–2030) merangkumi ${f1} inisiatif, Fasa 2 (2031–2035) merangkumi ${f2} inisiatif, dan Fasa 3 (2036–2040) merangkumi ${f3} inisiatif. Inisiatif berskala besar dirancang merentas pelbagai fasa.`,
        kpis: [
          { label: 'Fasa 1 (2026-2030)', value: `${f1} projek` },
          { label: 'Fasa 2 (2031-2035)', value: `${f2} projek` },
          { label: 'Fasa 3 (2036-2040)', value: `${f3} projek` }
        ]
      };
    }

    // 7. Bajet USP
    if (q.includes('bajet') || q.includes('usp') || q.includes('kos') || q.includes('dana')) {
      const budget = calculateUSPBudget(initiatives);
      return {
        id: Date.now().toString(),
        sender: 'assistant',
        text: `Berdasarkan rekod bajet yang tersedia dalam Pelan Induk, anggaran bajet USP Fund yang direkodkan berjumlah ${budget.formatted} merangkumi ${budget.countWithBudget} inisiatif utama termasuk gentian optik FTTH (RM 70J), peluasan 5G (RM 35J), WiFi awam percuma (RM 30J), dan Smart Pole (RM 30J).`,
        kpis: [
          { label: 'Anggaran Bajet USP', value: budget.formatted },
          { label: 'Inisiatif Berdata Bajet', value: budget.countWithBudget }
        ]
      };
    }

    // 8. Specific component searches
    const compMatches = (Object.keys(COMPONENT_CONFIGS) as SmartCityComponent[]).filter((c) =>
      q.includes(c.toLowerCase()) || q.includes(c.replace('Smart ', '').toLowerCase())
    );

    if (compMatches.length > 0) {
      const comp = compMatches[0];
      const compItems = initiatives.filter((i) => i.komponen === comp);
      const conf = COMPONENT_CONFIGS[comp];

      return {
        id: Date.now().toString(),
        sender: 'assistant',
        text: `${comp} merangkumi sejumlah ${compItems.length} inisiatif rasmi. Fokus utama: ${conf.deskripsi}`,
        items: compItems.slice(0, 3),
        chips: [
          {
            label: `Lihat ${compItems.length} Inisiatif ${comp}`,
            action: () => onSelectComponent(comp)
          }
        ]
      };
    }

    // 9. Keyword search in initiative dataset (e.g. CCTV, solar, AI, dron, air, sisa)
    const matchedItems = initiatives.filter(
      (i) =>
        i.inisiatif.toLowerCase().includes(q) ||
        (i.outcome && i.outcome.toLowerCase().includes(q)) ||
        i.kodInisiatif.toLowerCase().includes(q)
    );

    if (matchedItems.length > 0) {
      return {
        id: Date.now().toString(),
        sender: 'assistant',
        text: `Ditemui ${matchedItems.length} inisiatif berkaitan carian "${rawQuery}" dalam Pelan Induk.`,
        items: matchedItems.slice(0, 3),
        chips: [
          {
            label: `Tapis ${matchedItems.length} Inisiatif Ditemui`,
            action: () => {
              const el = document.querySelector('#inisiatif');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
          }
        ]
      };
    }

    // 10. Fallback for unanswerable / missing data
    return {
      id: Date.now().toString(),
      sender: 'assistant',
      text: 'Maklumat tersebut tidak tersedia dalam data Pelan Induk. Jawapan saya adalah berdasarkan maklumat fakta yang terkandung dalam set data rasmi sahaja.',
      chips: [
        { label: 'Ringkaskan Pelan Induk', action: () => handleSend('Ringkaskan Pelan Induk') },
        { label: 'Senaraikan Fast Track', action: () => handleSend('Apakah inisiatif Fast Track?') }
      ]
    };
  };

  const handleSend = (queryText?: string) => {
    const textToSend = queryText || inputText;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend
    };

    const replyMsg = processQuery(textToSend);

    setMessages((prev) => [...prev, userMsg, replyMsg]);
    setInputText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section id="ai-insights" className="py-20 bg-gradient-to-b from-[#FFF9F3] via-white to-[#FFF9F3] border-t border-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9EDBD7]/30 border border-[#46B7B0]/40 text-[#13615C] text-xs font-extrabold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#46B7B0]" />
            EKSPLORASI PINTAR
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#171717] tracking-tight">
            NOGORI PINTAR AI INSIGHTS
          </h2>
          <p className="text-sm text-stone-600 mt-1 font-normal">
            “Terokai Pelan Induk dengan lebih pintar.” Analisis pantas berasaskan set data rasmi 85 inisiatif tanpa pergantungan API luar.
          </p>
        </div>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {suggestionChips.map((chip) => (
            <button
              key={chip}
              onClick={() => handleSend(chip)}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-white hover:bg-stone-100 text-stone-700 border border-stone-200/90 shadow-2xs transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Chat Card Box */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden flex flex-col h-[580px]">
          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-8 h-8 rounded-xl bg-[#46B7B0] text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-2xl rounded-2xl p-4.5 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-stone-900 text-white ml-10'
                      : 'bg-[#FFF9F3] text-stone-800 border border-stone-200/80 mr-10 shadow-2xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Optional Mini KPI Cards */}
                  {msg.kpis && msg.kpis.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3 pt-3 border-t border-stone-200/60">
                      {msg.kpis.map((kpi, idx) => (
                        <div key={idx} className="bg-white p-2.5 rounded-xl border border-stone-200">
                          <span className="text-[10px] text-stone-500 font-bold uppercase block truncate">
                            {kpi.label}
                          </span>
                          <span className="text-base font-extrabold text-stone-900">
                            {kpi.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Optional Linked Items */}
                  {msg.items && msg.items.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-stone-200/60 space-y-2">
                      {msg.items.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => onSelectInitiative(item)}
                          className="cursor-pointer p-2.5 rounded-xl bg-white border border-stone-200/80 hover:border-[#46B7B0] transition-colors flex items-center justify-between gap-2"
                        >
                          <div className="min-w-0">
                            <span className="font-mono text-[10px] font-bold text-stone-700 mr-1.5">
                              {item.kodInisiatif}
                            </span>
                            <span className="font-semibold text-stone-900 text-xs truncate">
                              {item.inisiatif}
                            </span>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-[#46B7B0] shrink-0" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Optional Action Chips */}
                  {msg.chips && msg.chips.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-stone-200/60">
                      {msg.chips.map((chip, idx) => (
                        <button
                          key={idx}
                          onClick={chip.action}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#46B7B0] hover:bg-[#399F98] text-white text-xs font-bold shadow-2xs transition-colors"
                        >
                          <span>{chip.label}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-stone-200 text-stone-700 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-4 border-t border-stone-200 bg-[#FFF9F3] flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tanya tentang Pelan Induk Bandar Pintar... (cth: Fast Track, Smart Mobility, bajet USP)"
              className="flex-1 py-3 px-4 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#46B7B0]"
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputText.trim()}
              className="p-3 rounded-xl bg-[#46B7B0] hover:bg-[#389E97] text-white disabled:opacity-40 transition-colors shadow-2xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
