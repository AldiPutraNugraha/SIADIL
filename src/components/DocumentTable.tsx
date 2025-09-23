"use client";

import { useEffect, useMemo, useRef, useState } from 'react';

export type DocumentRow = {
  id: string | number;
  numberTitle: string; // e.g., "IT-001 - SSL certificate"
  description?: string;
  documentDate?: string; // ISO or display date
  contributors?: string[]; // list of names or emails
  archive?: string; // folder/category
  updatedCreatedBy?: string; // e.g., "Adi P. / Nia K."
};

type SortKey = keyof Pick<DocumentRow, 'id' | 'numberTitle' | 'description' | 'documentDate' | 'archive' | 'updatedCreatedBy'>;

type Props = {
  title?: string;
  rows: DocumentRow[];
  pageSizeOptions?: number[];
  defaultPageSize?: number;
  onAddNew?: () => void;
  onEdit?: (row: DocumentRow) => void;
  onDelete?: (row: DocumentRow) => void | Promise<void>;
};

export default function DocumentTable({
  title = 'Document',
  rows,
  pageSizeOptions = [10, 25, 50],
  defaultPageSize = 10,
  onAddNew,
  onEdit,
  onDelete,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [sortKey, setSortKey] = useState<SortKey>('id');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
  // internal data for local delete fallback
  const [data, setData] = useState<DocumentRow[]>(rows);
  const [openMenuId, setOpenMenuId] = useState<string | number | null>(null);

  // keep internal data in sync when rows prop changes
  useEffect(() => {
    setData(rows);
    // reset pagination to first page on external rows change
    setPage(1);
  }, [rows]);

  // close menu on outside click / escape
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const el = containerRef.current;
      if (!el) return;
      const target = e.target as Node | null;
      // Close only if clicking outside the table/card container
      if (target && !el.contains(target)) {
        setOpenMenuId(null);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpenMenuId(null);
    }
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return data;
    return data.filter((r) =>
      [
        String(r.id),
        r.numberTitle,
        r.description ?? '',
        r.documentDate ?? '',
        (r.contributors ?? []).join(' '),
        r.archive ?? '',
        r.updatedCreatedBy ?? '',
      ]
        .join(' ')
        .toLowerCase()
        .includes(term)
    );
  }, [data, search]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      let result = 0;

      if (sortKey === 'id') {
        const toNum = (v: unknown) => {
          if (typeof v === 'number') return v;
          const s = String(v);
          // Prefer pure number if possible; fallback to extracting digits
          const n = Number(s);
          if (!Number.isNaN(n)) return n;
          const digits = s.match(/\d+/);
          return digits ? Number(digits[0]) : 0;
        };
        const an = toNum(a.id);
        const bn = toNum(b.id);
        result = an - bn;
      } else if (sortKey === 'documentDate') {
        const toTime = (v?: string) => (v ? Date.parse(v) : 0);
        const at = toTime(a.documentDate);
        const bt = toTime(b.documentDate);
        result = at - bt;
      } else {
        const av = (a[sortKey] as unknown as string | number | undefined);
        const bv = (b[sortKey] as unknown as string | number | undefined);
        const as = (av ?? '').toString().toLowerCase();
        const bs = (bv ?? '').toString().toLowerCase();
        if (as < bs) result = -1;
        else if (as > bs) result = 1;
        else result = 0;
      }

      return sortDir === 'asc' ? result : -result;
    });
    return copy;
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIdx = (currentPage - 1) * pageSize;
  const viewRows = sorted.slice(startIdx, startIdx + pageSize);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const SortIcon = ({ col }: { col: SortKey }) => (
    <span className="inline-block ml-1 text-gray-400">
      {sortKey !== col ? '↕' : sortDir === 'asc' ? '▲' : '▼'}
    </span>
  );

  const handleEdit = (row: DocumentRow) => {
    if (onEdit) return onEdit(row);
    alert(`Edit Document ID ${row.id}`);
  };

  const handleDelete = async (row: DocumentRow) => {
    try {
      if (onDelete) {
        await onDelete(row);
      } else {
        // local delete fallback
        setData((prev) => prev.filter((r) => String(r.id) !== String(row.id)));
      }
    } finally {
      setOpenMenuId(null);
    }
  };

  return (
    <div ref={containerRef} className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
      {/* Top bar: title, search, add */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search Document"
              className="block w-full sm:w-72 pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => (onAddNew ? onAddNew() : alert('Add New Document pressed'))}
            className="inline-flex items-center px-4 py-2 text-white font-medium rounded-lg transition-colors duration-200"
            style={{ backgroundColor: '#01793b' }}
          >
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Document
          </button>
          {/* View mode toggle */}
          <div className="inline-flex rounded-full border border-gray-300 overflow-hidden">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 flex items-center gap-1 text-sm ${viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700'}`}
              aria-pressed={viewMode === 'list'}
              title="List view"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline-block">
                <path d="M4 6h16M4 12h16M4 18h10" strokeLinecap="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('card')}
              className={`px-3 py-2 flex items-center gap-1 text-sm border-l ${viewMode === 'card' ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700'}`}
              aria-pressed={viewMode === 'card'}
              title="Card view"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline-block">
                <rect x="4" y="4" width="7" height="7" rx="1"/>
                <rect x="13" y="4" width="7" height="7" rx="1"/>
                <rect x="4" y="13" width="7" height="7" rx="1"/>
                <rect x="13" y="13" width="7" height="7" rx="1"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* filter chips row */}
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <button className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-gray-700 bg-white"><span>⚲</span> Filter document..</button>
        <button className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-gray-700 bg-white">＋ Archive</button>
        <button className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-gray-700 bg-white">＋ Document Date</button>
        <button className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-gray-700 bg-white">＋ Expire Date</button>
        <button className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-gray-700 bg-white">＋ Expire In</button>
        <button className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-gray-700 bg-white">⬇ Export</button>
        <button className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-gray-700 bg-white">☰ View</button>
      </div>

      {/* content area: table (list) or grid (card) */}
      {viewMode === 'list' ? (
        <div className="overflow-auto border rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left whitespace-nowrap cursor-pointer" onClick={() => toggleSort('id')}>ID <SortIcon col="id" /></th>
                <th className="px-4 py-2 text-left whitespace-nowrap cursor-pointer" onClick={() => toggleSort('numberTitle')}>Number & Title <SortIcon col="numberTitle" /></th>
                <th className="px-4 py-2 text-left whitespace-nowrap cursor-pointer" onClick={() => toggleSort('description')}>Description <SortIcon col="description" /></th>
                <th className="px-4 py-2 text-left whitespace-nowrap cursor-pointer" onClick={() => toggleSort('documentDate')}>Document Date <SortIcon col="documentDate" /></th>
                <th className="px-4 py-2 text-left">Contributors</th>
                <th className="px-4 py-2 text-left whitespace-nowrap cursor-pointer" onClick={() => toggleSort('archive')}>Archive <SortIcon col="archive" /></th>
                <th className="px-4 py-2 text-left whitespace-nowrap cursor-pointer" onClick={() => toggleSort('updatedCreatedBy')}>Update & Create by <SortIcon col="updatedCreatedBy" /></th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {viewRows.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-center text-gray-500" colSpan={8}>No documents found.</td>
                </tr>
              ) : (
                viewRows.map((r) => (
                  <tr key={String(r.id)} className="hover:bg-gray-50">
                    <td className="px-4 py-2 align-top text-gray-700">{r.id}</td>
                    <td className="px-4 py-2 align-top text-gray-900">
                      {(() => {
                        const parts = (r.numberTitle ?? '').split('•');
                        const code = (parts[0] ?? '').trim();
                        const label = (parts[1] ?? '').trim();
                        return (
                          <div className="leading-tight">
                            <div className="font-semibold text-gray-900 uppercase">{code}</div>
                            {label && <div className="mt-0.5 text-gray-900 uppercase">{label}</div>}
                          </div>
                        );
                      })()}
                    </td>
                    <td className="px-4 py-2 align-top text-gray-700 max-w-xl">{r.description}</td>
                    <td className="px-4 py-2 align-top text-gray-700 whitespace-nowrap">{r.documentDate}</td>
                    <td className="px-4 py-2 align-top text-gray-700">{(r.contributors ?? []).join(', ')}</td>
                    <td className="px-4 py-2 align-top text-gray-700">{r.archive}</td>
                    <td className="px-4 py-2 align-top text-gray-700">{r.updatedCreatedBy}</td>
                    <td className="px-4 py-2 align-top text-right relative" onClick={(e) => e.stopPropagation()}>
                      <button
                        aria-label="More actions"
                        className="inline-flex items-center justify-center w-8 h-8 rounded-md border hover:bg-gray-100"
                        onClick={() => setOpenMenuId((id) => (id === r.id ? null : r.id))}
                      >
                        ⋯
                      </button>
                      {openMenuId === r.id && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-20">
                          <button className="w-full text-left px-3 py-2 hover:bg-gray-50" onClick={() => handleEdit(r)}>Edit</button>
                          <button className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50" onClick={() => handleDelete(r)}>Delete</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="border rounded-lg p-4">
          {viewRows.length === 0 ? (
            <div className="px-4 py-6 text-center text-gray-500">No documents found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {viewRows.map((r) => {
                const parts = (r.numberTitle ?? '').split('•');
                const code = (parts[0] ?? '').trim();
                const label = (parts[1] ?? '').trim();
                return (
                  <div key={String(r.id)} className="bg-white border rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow relative" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs px-2 py-0.5 rounded-full border text-gray-700">ID {r.id}</span>
                      <div className="flex items-center gap-2">
                        {r.archive && <span className="text-xs text-gray-600 hidden sm:inline">{r.archive}</span>}
                        <button
                          aria-label="More actions"
                          className="inline-flex items-center justify-center w-8 h-8 rounded-md border hover:bg-gray-100"
                          onClick={() => setOpenMenuId((id) => (id === r.id ? null : r.id))}
                        >
                          ⋯
                        </button>
                      </div>
                    </div>
                    {openMenuId === r.id && (
                      <div className="absolute right-2 top-10 w-40 bg-white border rounded-md shadow-lg z-20">
                        <button className="w-full text-left px-3 py-2 hover:bg-gray-50" onClick={() => handleEdit(r)}>Edit</button>
                        <button className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50" onClick={() => handleDelete(r)}>Delete</button>
                      </div>
                    )}
                    <div className="leading-tight mb-2">
                      <div className="font-semibold text-gray-900 uppercase">{code}</div>
                      {label && <div className="mt-0.5 text-gray-900 uppercase">{label}</div>}
                    </div>
                    {r.description && (
                      <p className="text-sm text-gray-700 mb-3 line-clamp-3">{r.description}</p>
                    )}
                    <div className="mt-3 space-y-1 text-sm text-gray-700">
                      {r.documentDate && (
                        <div className="flex items-center gap-2" title="Document Date">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                          <span className="text-gray-600 font-medium">Document Date:</span>
                          <span className="text-gray-800">{r.documentDate}</span>
                        </div>
                      )}
                      {(r.contributors && r.contributors.length > 0) && (
                        <div className="flex items-center gap-2" title="Contributors">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                          <span className="text-gray-600 font-medium">Contributors:</span>
                          <span className="text-gray-800">{(r.contributors ?? []).join(', ')}</span>
                        </div>
                      )}
                      {r.updatedCreatedBy && (
                        <div className="flex items-center gap-2" title="Updated & Created by">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
                          <span className="text-gray-600 font-medium">Updated / Created by:</span>
                          <span className="text-gray-800">{r.updatedCreatedBy}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* footer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-3 text-sm text-gray-600">
        <div>Showing {viewRows.length} of {filtered.length} row(s).</div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span>Rows per page</span>
            <select
              className="border rounded-md px-2 py-1 bg-white"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div>Page {currentPage} of {totalPages}</div>
          <div className="flex items-center gap-1">
            <button className="px-2 py-1 border rounded disabled:opacity-40" onClick={() => setPage(1)} disabled={currentPage === 1}>{'«'}</button>
            <button className="px-2 py-1 border rounded disabled:opacity-40" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>{'‹'}</button>
            <button className="px-2 py-1 border rounded disabled:opacity-40" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>{'›'}</button>
            <button className="px-2 py-1 border rounded disabled:opacity-40" onClick={() => setPage(totalPages)} disabled={currentPage === totalPages}>{'»'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
