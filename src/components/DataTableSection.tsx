import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, ArrowUpDown, Download, Zap, Eye } from 'lucide-react';
import { Initiative } from '../types/initiative';
import { COMPONENT_CONFIGS } from '../utils/constants';

interface DataTableSectionProps {
  initiatives: Initiative[];
  onSelectInitiative: (initiative: Initiative) => void;
}

export const DataTableSection: React.FC<DataTableSectionProps> = ({
  initiatives,
  onSelectInitiative
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState<number | 'all'>(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof Initiative>('no');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Filtered initiatives
  const filteredData = useMemo(() => {
    return initiatives.filter((item) => {
      if (!searchTerm.trim()) return true;
      const q = searchTerm.toLowerCase();
      return (
        item.kodInisiatif.toLowerCase().includes(q) ||
        item.inisiatif.toLowerCase().includes(q) ||
        item.komponen.toLowerCase().includes(q) ||
        (item.agensiUtama && item.agensiUtama.toLowerCase().includes(q))
      );
    });
  }, [initiatives, searchTerm]);

  // Sorted initiatives
  const sortedData = useMemo(() => {
    const sorted = [...filteredData].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (aVal === null || aVal === undefined) aVal = '';
      if (bVal === null || bVal === undefined) bVal = '';

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }

      if (typeof aVal === 'boolean' && typeof bVal === 'boolean') {
        return sortDirection === 'asc' ? (aVal === bVal ? 0 : aVal ? 1 : -1) : aVal === bVal ? 0 : aVal ? -1 : 1;
      }

      return 0;
    });

    return sorted;
  }, [filteredData, sortField, sortDirection]);

  // Paginated
  const paginatedData = useMemo(() => {
    if (pageSize === 'all') return sortedData;
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = pageSize === 'all' ? 1 : Math.ceil(sortedData.length / pageSize);

  const handleSort = (field: keyof Initiative) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const exportCSV = () => {
    const headers = [
      'No',
      'Komponen',
      'Kod Inisiatif',
      'Fast Track',
      'Inisiatif',
      'Agensi Utama',
      'Fasa Pelaksanaan',
      'Tahap Penarafan',
      'Status Pelaksanaan',
      'Bajet USP'
    ];

    const rows = sortedData.map((i) => [
      i.no,
      `"${i.komponen}"`,
      `"${i.kodInisiatif}"`,
      i.fastTrack ? 'YA' : 'TIDAK',
      `"${i.inisiatif.replace(/"/g, '""')}"`,
      `"${(i.agensiUtama || '').replace(/"/g, '""')}"`,
      `"${(i.fasaPelaksanaan || '').replace(/"/g, '""')}"`,
      `"${(i.tahapPenarafanBandarPintarMalaysia || '').replace(/"/g, '""')}"`,
      `"${(i.statusPelaksanaan || 'Tiada Data Status').replace(/"/g, '""')}"`,
      `"${(i.bajetUSPFundRM || '-').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'pelan_induk_bandar_pintar_negeri_sembilan_2040.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="data-inisiatif" className="py-20 bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#46B7B0]">
              PANGKALAN REKOD
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#171717] tracking-tight mt-1">
              DATA INISIATIF
            </h2>
            <p className="text-sm text-stone-600 font-normal mt-1">
              Jadual data interaktif dengan sokongan carian pantas, penyusunan mengikut lajur dan muat turun CSV.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-stone-100 text-stone-800 text-xs font-bold border border-stone-200/80 shadow-2xs transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-stone-600" />
              <span>Eksport CSV</span>
            </button>
          </div>
        </div>

        {/* Filter & Page Size Bar */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Tapis jadual inisiatif..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#46B7B0]"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-600 self-end sm:self-center">
            <span className="font-medium">Papar baris:</span>
            {[10, 25, 50, 'all'].map((size) => (
              <button
                key={String(size)}
                onClick={() => {
                  setPageSize(size as any);
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                  pageSize === size
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {size === 'all' ? 'Semua' : size}
              </button>
            ))}
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto max-h-[600px] scrollbar-thin">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#FFF9F3] text-stone-800 uppercase tracking-wider font-extrabold sticky top-0 z-10 border-b border-stone-200 shadow-2xs">
                <tr>
                  <th
                    onClick={() => handleSort('no')}
                    className="py-3 px-3 cursor-pointer hover:bg-stone-100 w-12 text-center"
                  >
                    <div className="flex items-center justify-center gap-1">
                      <span>No.</span>
                      <ArrowUpDown className="w-3 h-3 text-stone-400" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('komponen')}
                    className="py-3 px-3 cursor-pointer hover:bg-stone-100"
                  >
                    <div className="flex items-center gap-1">
                      <span>Komponen</span>
                      <ArrowUpDown className="w-3 h-3 text-stone-400" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('kodInisiatif')}
                    className="py-3 px-3 cursor-pointer hover:bg-stone-100 w-20"
                  >
                    <div className="flex items-center gap-1">
                      <span>Kod</span>
                      <ArrowUpDown className="w-3 h-3 text-stone-400" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('fastTrack')}
                    className="py-3 px-2 cursor-pointer hover:bg-stone-100 w-12 text-center"
                  >
                    <div className="flex items-center justify-center gap-1">
                      <span>FT</span>
                      <ArrowUpDown className="w-3 h-3 text-stone-400" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('inisiatif')}
                    className="py-3 px-4 cursor-pointer hover:bg-stone-100 min-w-[260px]"
                  >
                    <div className="flex items-center gap-1">
                      <span>Inisiatif</span>
                      <ArrowUpDown className="w-3 h-3 text-stone-400" />
                    </div>
                  </th>
                  <th className="py-3 px-3 min-w-[180px]">Agensi Utama</th>
                  <th className="py-3 px-3 min-w-[130px]">Fasa</th>
                  <th className="py-3 px-3 min-w-[140px]">Tahap Penarafan</th>
                  <th className="py-3 px-3 min-w-[130px]">Status</th>
                  <th className="py-3 px-3 min-w-[100px]">Bajet USP</th>
                  <th className="py-3 px-3 w-16 text-center">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {paginatedData.map((item) => {
                  const compConfig = COMPONENT_CONFIGS[item.komponen];

                  return (
                    <tr
                      key={item.id}
                      onClick={() => onSelectInitiative(item)}
                      className="hover:bg-amber-50/40 transition-colors cursor-pointer group"
                    >
                      <td className="py-3 px-3 text-center font-mono font-semibold text-stone-500">
                        {item.no}
                      </td>
                      <td className="py-3 px-3 font-semibold">
                        <span className={`text-[11px] ${compConfig?.textPastel}`}>
                          {item.komponen}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-stone-900">
                        {item.kodInisiatif}
                      </td>
                      <td className="py-3 px-2 text-center">
                        {item.fastTrack ? (
                          <span className="inline-flex items-center justify-center p-1 rounded-sm bg-amber-100 text-amber-900" title="Fast Track">
                            <Zap className="w-3 h-3 fill-amber-500 text-amber-600" />
                          </span>
                        ) : (
                          <span className="text-stone-300">-</span>
                        )}
                      </td>
                      <td className="py-3 px-4 font-bold text-stone-900 group-hover:text-[#46B7B0] transition-colors leading-relaxed">
                        {item.inisiatif}
                      </td>
                      <td className="py-3 px-3 text-stone-600 text-[11px] leading-relaxed">
                        {item.agensiUtama || '-'}
                      </td>
                      <td className="py-3 px-3 text-stone-600 text-[11px]">
                        {item.fasaPelaksanaan || '-'}
                      </td>
                      <td className="py-3 px-3 text-[11px] font-medium text-stone-700">
                        {item.tahapPenarafanBandarPintarMalaysia || 'Tiada Data'}
                      </td>
                      <td className="py-3 px-3 text-[11px]">
                        <span className="font-medium text-stone-800">
                          {item.statusPelaksanaan || 'Tiada Data Status'}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-[11px] font-mono font-bold text-stone-900">
                        {item.bajetUSPFundRM ? `RM ${item.bajetUSPFundRM}` : '-'}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectInitiative(item);
                          }}
                          title="Lihat Butiran Penuh"
                          className="p-1 rounded-md text-stone-400 hover:text-[#46B7B0] hover:bg-stone-100 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Pagination Footer */}
          {pageSize !== 'all' && totalPages > 1 && (
            <div className="p-4 border-t border-stone-200 bg-[#FFF9F3] flex items-center justify-between">
              <span className="text-xs text-stone-600">
                Menunjukkan {(currentPage - 1) * pageSize + 1} hingga{' '}
                {Math.min(currentPage * pageSize, sortedData.length)} daripada {sortedData.length} rekod
              </span>

              <div className="flex items-center gap-1">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className="px-3 py-1 text-xs font-bold rounded-lg border border-stone-200 bg-white hover:bg-stone-100 disabled:opacity-40 disabled:hover:bg-white"
                >
                  Sebelum
                </button>
                <span className="px-3 py-1 text-xs font-bold text-stone-800">
                  {currentPage} / {totalPages}
                </span>
                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  className="px-3 py-1 text-xs font-bold rounded-lg border border-stone-200 bg-white hover:bg-stone-100 disabled:opacity-40 disabled:hover:bg-white"
                >
                  Seterusnya
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
