"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import Tooltip from './Tooltip';
import ConfirmDialog from './ConfirmDialog';

export type DocumentRow = {
  id: string | number;
  numberTitle: string; // e.g., "IT-001 - SSL certificate"
  description?: string;
  documentDate?: string; // ISO or display date
  expireDate?: string; // optional ISO date for expiry
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
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const pendingDeleteRef = useRef<DocumentRow | null>(null);
  // filter popovers
  const [openFilterPanel, setOpenFilterPanel] = useState(false);
  const [openArchiveFilter, setOpenArchiveFilter] = useState(false);
  const [openDocDateFilter, setOpenDocDateFilter] = useState(false);
  const [openExpireDateFilter, setOpenExpireDateFilter] = useState(false);
  const [openExpireInFilter, setOpenExpireInFilter] = useState(false);
  const [openViewMenu, setOpenViewMenu] = useState(false);
  // filters state
  const [selectedArchives, setSelectedArchives] = useState<string[]>([]);
  const [docDateFrom, setDocDateFrom] = useState<string>('');
  const [docDateTo, setDocDateTo] = useState<string>('');
  const [expireDateFrom, setExpireDateFrom] = useState<string>('');
  const [expireDateTo, setExpireDateTo] = useState<string>('');
  const [expireInDays, setExpireInDays] = useState<number | ''>('');

  // keep internal data in sync when rows prop changes
  useEffect(() => {
    setData(rows);
    // reset pagination to first page on external rows change
    setPage(1);
  }, [rows]);

  // Muat preferensi view & page size dari localStorage (jika ada)
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const storedView = window.localStorage.getItem('docTable:viewMode');
        if (storedView === 'list' || storedView === 'card') setViewMode(storedView);
        const storedPageSize = window.localStorage.getItem('docTable:pageSize');
        if (storedPageSize) setPageSize(Number(storedPageSize));
        const storedSortKey = window.localStorage.getItem('docTable:sortKey') as SortKey | null;
        const storedSortDir = window.localStorage.getItem('docTable:sortDir') as ('asc' | 'desc') | null;
        if (storedSortKey) setSortKey(storedSortKey);
        if (storedSortDir === 'asc' || storedSortDir === 'desc') setSortDir(storedSortDir);
        const storedPage = window.localStorage.getItem('docTable:page');
        const storedSearch = window.localStorage.getItem('docTable:search');
        const storedArchives = window.localStorage.getItem('docTable:filter:archives');
        const storedDocFrom = window.localStorage.getItem('docTable:filter:docFrom');
        const storedDocTo = window.localStorage.getItem('docTable:filter:docTo');
        const storedExpFrom = window.localStorage.getItem('docTable:filter:expFrom');
        const storedExpTo = window.localStorage.getItem('docTable:filter:expTo');
        const storedExpIn = window.localStorage.getItem('docTable:filter:expIn');
        if (storedPage) setPage(Math.max(1, Number(storedPage)));
        if (storedSearch) setSearch(storedSearch);
        if (storedArchives) setSelectedArchives(JSON.parse(storedArchives));
        if (storedDocFrom) setDocDateFrom(storedDocFrom);
        if (storedDocTo) setDocDateTo(storedDocTo);
        if (storedExpFrom) setExpireDateFrom(storedExpFrom);
        if (storedExpTo) setExpireDateTo(storedExpTo);
        if (storedExpIn) setExpireInDays(Number(storedExpIn) || '');
      }
    } catch {}
  }, []);

  // Simpan preferensi saat berubah
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') window.localStorage.setItem('docTable:viewMode', viewMode);
    } catch {}
  }, [viewMode]);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') window.localStorage.setItem('docTable:pageSize', String(pageSize));
    } catch {}
  }, [pageSize]);

  // Persist sort & page
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') window.localStorage.setItem('docTable:sortKey', sortKey);
    } catch {}
  }, [sortKey]);
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') window.localStorage.setItem('docTable:sortDir', sortDir);
    } catch {}
  }, [sortDir]);
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') window.localStorage.setItem('docTable:page', String(page));
    } catch {}
  }, [page]);
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') window.localStorage.setItem('docTable:search', search);
    } catch {}
  }, [search]);
  // persist filters
  useEffect(() => {
    try { if (typeof window !== 'undefined') window.localStorage.setItem('docTable:filter:archives', JSON.stringify(selectedArchives)); } catch {}
  }, [selectedArchives]);
  useEffect(() => {
    try { if (typeof window !== 'undefined') window.localStorage.setItem('docTable:filter:docFrom', docDateFrom); } catch {}
  }, [docDateFrom]);
  useEffect(() => {
    try { if (typeof window !== 'undefined') window.localStorage.setItem('docTable:filter:docTo', docDateTo); } catch {}
  }, [docDateTo]);
  useEffect(() => {
    try { if (typeof window !== 'undefined') window.localStorage.setItem('docTable:filter:expFrom', expireDateFrom); } catch {}
  }, [expireDateFrom]);
  useEffect(() => {
    try { if (typeof window !== 'undefined') window.localStorage.setItem('docTable:filter:expTo', expireDateTo); } catch {}
  }, [expireDateTo]);
  useEffect(() => {
    try { if (typeof window !== 'undefined') window.localStorage.setItem('docTable:filter:expIn', String(expireInDays || '')); } catch {}
  }, [expireInDays]);

  // close menu on outside click / escape
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const el = containerRef.current;
      if (!el) return;
      const target = e.target as Node | null;
      // Close only if clicking outside the table/card container
      if (target && !el.contains(target)) {
        setOpenMenuId(null);
        setOpenFilterPanel(false);
        setOpenArchiveFilter(false);
        setOpenDocDateFilter(false);
        setOpenExpireDateFilter(false);
        setOpenExpireInFilter(false);
        setOpenViewMenu(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpenMenuId(null);
        setOpenFilterPanel(false);
        setOpenArchiveFilter(false);
        setOpenDocDateFilter(false);
        setOpenExpireDateFilter(false);
        setOpenExpireInFilter(false);
        setOpenViewMenu(false);
      }
    }
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  // Shortcut '/' untuk fokus ke search (abaikan jika sedang mengetik di field lain)
  useEffect(() => {
    function onSlash(e: KeyboardEvent) {
      if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const tag = (e.target as HTMLElement | null)?.tagName?.toLowerCase();
        if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
        e.preventDefault();
        searchRef.current?.focus();
      }
    }
    document.addEventListener('keydown', onSlash);
    return () => document.removeEventListener('keydown', onSlash);
  }, []);

  const parseDate = (s?: string) => {
    if (!s) return NaN;
    const t = Date.parse(s);
    if (!Number.isNaN(t)) return t;
    // try yyyy-mm-dd fallback
    const m = s.match(/(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
    if (m) return Date.parse(`${m[1]}-${m[2].padStart(2, '0')}-${m[3].padStart(2, '0')}`);
    return NaN;
  };

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    const termFilter = (r: DocumentRow) => {
      if (!term) return true;
      return [
        String(r.id),
        r.numberTitle,
        r.description ?? '',
  r.documentDate ?? '',
  r.expireDate ?? '',
        (r.contributors ?? []).join(' '),
        r.archive ?? '',
        r.updatedCreatedBy ?? '',
      ]
        .join(' ')
        .toLowerCase()
        .includes(term);
    };

    const archiveFilter = (r: DocumentRow) => {
      if (!selectedArchives.length) return true;
      return selectedArchives.includes((r.archive ?? '').toString());
    };

    const docDateFilter = (r: DocumentRow) => {
      if (!docDateFrom && !docDateTo) return true;
      const t = parseDate(r.documentDate);
      if (Number.isNaN(t)) return false;
      const min = docDateFrom ? parseDate(docDateFrom) : -Infinity;
      const max = docDateTo ? parseDate(docDateTo) : Infinity;
      return t >= min && t <= max;
    };

    const expDateFilter = (r: DocumentRow) => {
      if (!expireDateFrom && !expireDateTo) return true;
      const exp = parseDate(r.expireDate);
      if (Number.isNaN(exp)) return false;
      const min = expireDateFrom ? parseDate(expireDateFrom) : -Infinity;
      const max = expireDateTo ? parseDate(expireDateTo) : Infinity;
      return exp >= min && exp <= max;
    };

    const expInFilter = (r: DocumentRow) => {
      if (expireInDays === '' || expireInDays === undefined || expireInDays === null) return true;
      const exp = parseDate(r.expireDate);
      if (Number.isNaN(exp)) return false;
      const now = new Date();
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
      const range = startOfToday + (Number(expireInDays) * 24 * 60 * 60 * 1000);
      return exp >= startOfToday && exp <= range;
    };

    return data.filter((r) => termFilter(r) && archiveFilter(r) && docDateFilter(r) && expDateFilter(r) && expInFilter(r));
  }, [data, search, selectedArchives, docDateFrom, docDateTo, expireDateFrom, expireDateTo, expireInDays]);

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

  const SortIcon = ({ col }: { col: SortKey }) => {
    const isActive = sortKey === col;
    return (
      <span className={`inline-block ml-1 ${isActive ? 'text-gray-700' : 'text-gray-400'}`} aria-hidden="true">
        {isActive ? (sortDir === 'asc' ? '▲' : '▼') : '↕'}
      </span>
    );
  };
  // Export CSV of current filtered rows
  const handleExport = useCallback(() => {
    const rows = sorted; // export using current sorting & filters
    const header = ['ID', 'Number & Title', 'Description', 'Document Date', 'Expire Date', 'Contributors', 'Archive', 'Updated/Created by'];
    const csvRows: string[] = [];
    csvRows.push(header.map((h) => '"' + h.replace(/"/g, '""') + '"').join(','));
    rows.forEach((r) => {
      const line = [
        r.id,
        r.numberTitle ?? '',
        r.description ?? '',
  r.documentDate ?? '',
  r.expireDate ?? '',
        (r.contributors ?? []).join(' | '),
        r.archive ?? '',
        r.updatedCreatedBy ?? '',
      ].map((v) => '"' + String(v).replace(/"/g, '""') + '"').join(',');
      csvRows.push(line);
    });
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const safeTitle = (title || 'documents').toLowerCase().replace(/[^a-z0-9-_]/g, '-');
    a.download = `${safeTitle}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [sorted, title]);

  const clearAllFilters = () => {
    setSelectedArchives([]);
    setDocDateFrom('');
    setDocDateTo('');
    setExpireDateFrom('');
    setExpireDateTo('');
    setExpireInDays('');
  };

  const uniqueArchives = useMemo(() => Array.from(new Set(data.map(d => d.archive).filter(Boolean))) as string[], [data]);


  const handleEdit = (row: DocumentRow) => {
    if (onEdit) return onEdit(row);
    alert(`Edit Document ID ${row.id}`);
  };

  const handleDelete = async (row: DocumentRow) => {
    pendingDeleteRef.current = row;
    setConfirmOpen(true);
  };

  const doConfirmDelete = async () => {
    const row = pendingDeleteRef.current;
    if (!row) return setConfirmOpen(false);
    try {
      if (onDelete) {
        await onDelete(row);
      }
      // local delete fallback or optimistic update
      setData((prev) => prev.filter((r) => String(r.id) !== String(row.id)));
    } finally {
      setOpenMenuId(null);
      setConfirmOpen(false);
      pendingDeleteRef.current = null;
    }
  };

  const cancelConfirmDelete = () => {
    setConfirmOpen(false);
    pendingDeleteRef.current = null;
  };

  return (
    <>
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
              ref={searchRef}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search Document"
              className="block w-full sm:w-72 pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent"
            />
            {search && (
              <button
                aria-label="Clear search"
                title="Clear search"
                className="absolute inset-y-0 right-0 pr-3 text-gray-400 hover:text-gray-600"
                onClick={() => setSearch('')}
              >
                ×
              </button>
            )}
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
      <div className="relative flex flex-wrap items-center gap-3 mb-3">
        {/* Filter overview */}
        <div className="relative">
          <button onClick={(e) => { e.stopPropagation(); setOpenFilterPanel((v) => !v); }} className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-gray-700 bg-white transition hover:shadow-sm active:scale-95">
            <span>⚲</span> Filter document..
          </button>
          {openFilterPanel && (
            <div className="absolute z-20 mt-2 w-72 bg-white border rounded-lg shadow-lg p-3 animate-in fade-in zoom-in" style={{ animationDuration: '120ms' }}>
              <div className="text-sm text-gray-700 font-medium mb-2">Applied Filters</div>
              <ul className="text-sm text-gray-700 space-y-1 mb-3">
                {selectedArchives.length > 0 && <li>Archive: {selectedArchives.join(', ')}</li>}
                {(docDateFrom || docDateTo) && <li>Document Date: {docDateFrom || '...'} – {docDateTo || '...'}</li>}
                {(expireDateFrom || expireDateTo) && <li>Expire Date: {expireDateFrom || '...'} – {expireDateTo || '...'}</li>}
                {expireInDays !== '' && <li>Expire In: ≤ {expireInDays} day(s)</li>}
                {selectedArchives.length === 0 && !docDateFrom && !docDateTo && !expireDateFrom && !expireDateTo && expireInDays === '' && (
                  <li className="text-gray-500">No filters.</li>
                )}
              </ul>
              <div className="flex justify-between">
                <button className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-50" onClick={() => { clearAllFilters(); setOpenFilterPanel(false); }}>Clear all</button>
                <button className="px-3 py-1.5 text-sm text-white rounded-md" style={{ backgroundColor: '#01793b' }} onClick={() => setOpenFilterPanel(false)}>Close</button>
              </div>
            </div>
          )}
        </div>

        {/* Archive filter */}
        <div className="relative">
          <button onClick={(e) => { e.stopPropagation(); setOpenArchiveFilter((v) => !v); }} className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg bg-white transition hover:shadow-sm active:scale-95 ${selectedArchives.length ? 'text-blue-700 border-blue-300 bg-blue-50' : 'text-gray-700'}`}>
            ＋ Archive {selectedArchives.length ? <span className="ml-1 text-xs px-1.5 py-0.5 rounded-full bg-blue-600 text-white">{selectedArchives.length}</span> : null}
          </button>
          {openArchiveFilter && (
            <div className="absolute z-20 mt-2 w-56 bg-white border rounded-lg shadow-lg p-3">
              <div className="text-sm text-gray-700 font-medium mb-2">Choose archives</div>
              <div className="max-h-48 overflow-auto pr-1 space-y-2">
                {uniqueArchives.length === 0 && <div className="text-sm text-gray-500">No archive options</div>}
                {uniqueArchives.map((a) => {
                  const checked = selectedArchives.includes(a);
                  return (
                    <label key={a} className="flex items-center gap-2 text-sm text-gray-700">
                      <input type="checkbox" checked={checked} onChange={(e) => {
                        setSelectedArchives((prev) => e.target.checked ? Array.from(new Set([...prev, a])) : prev.filter(x => x !== a));
                        setPage(1);
                      }} />
                      <span>{a}</span>
                    </label>
                  );
                })}
              </div>
              <div className="mt-3 flex justify-between">
                <button className="text-sm px-3 py-1.5 border rounded-md hover:bg-gray-50" onClick={() => setSelectedArchives([])}>Reset</button>
                <button className="text-sm px-3 py-1.5 rounded-md text-white" style={{ backgroundColor: '#01793b' }} onClick={() => setOpenArchiveFilter(false)}>Apply</button>
              </div>
            </div>
          )}
        </div>

        {/* Document Date range */}
        <div className="relative">
          <button onClick={(e) => { e.stopPropagation(); setOpenDocDateFilter((v) => !v); }} className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg bg-white transition hover:shadow-sm active:scale-95 ${(docDateFrom || docDateTo) ? 'text-blue-700 border-blue-300 bg-blue-50' : 'text-gray-700'}`}>
            ＋ Document Date
          </button>
          {openDocDateFilter && (
            <div className="absolute z-20 mt-2 w-72 bg-white border rounded-lg shadow-lg p-3">
              <div className="text-sm text-gray-700 font-medium mb-2">Document Date range</div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-600">From</label>
                  <input type="date" value={docDateFrom} onChange={(e) => { setDocDateFrom(e.target.value); setPage(1); }} className="mt-1 w-full border rounded-md px-2 py-1" />
                </div>
                <div>
                  <label className="text-xs text-gray-600">To</label>
                  <input type="date" value={docDateTo} onChange={(e) => { setDocDateTo(e.target.value); setPage(1); }} className="mt-1 w-full border rounded-md px-2 py-1" />
                </div>
              </div>
              <div className="mt-3 flex justify-between">
                <button className="text-sm px-3 py-1.5 border rounded-md hover:bg-gray-50" onClick={() => { setDocDateFrom(''); setDocDateTo(''); }}>Reset</button>
                <button className="text-sm px-3 py-1.5 rounded-md text-white" style={{ backgroundColor: '#01793b' }} onClick={() => setOpenDocDateFilter(false)}>Apply</button>
              </div>
            </div>
          )}
        </div>

        {/* Expire Date range */}
        <div className="relative">
          <button onClick={(e) => { e.stopPropagation(); setOpenExpireDateFilter((v) => !v); }} className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg bg-white transition hover:shadow-sm active:scale-95 ${(expireDateFrom || expireDateTo) ? 'text-blue-700 border-blue-300 bg-blue-50' : 'text-gray-700'}`}>
            ＋ Expire Date
          </button>
          {openExpireDateFilter && (
            <div className="absolute z-20 mt-2 w-72 bg-white border rounded-lg shadow-lg p-3">
              <div className="text-sm text-gray-700 font-medium mb-2">Expire Date range</div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-600">From</label>
                  <input type="date" value={expireDateFrom} onChange={(e) => { setExpireDateFrom(e.target.value); setPage(1); }} className="mt-1 w-full border rounded-md px-2 py-1" />
                </div>
                <div>
                  <label className="text-xs text-gray-600">To</label>
                  <input type="date" value={expireDateTo} onChange={(e) => { setExpireDateTo(e.target.value); setPage(1); }} className="mt-1 w-full border rounded-md px-2 py-1" />
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-500">Catatan: baris tanpa Expire Date akan otomatis tidak terikut saat filter aktif.</div>
              <div className="mt-2 flex justify-between">
                <button className="text-sm px-3 py-1.5 border rounded-md hover:bg-gray-50" onClick={() => { setExpireDateFrom(''); setExpireDateTo(''); }}>Reset</button>
                <button className="text-sm px-3 py-1.5 rounded-md text-white" style={{ backgroundColor: '#01793b' }} onClick={() => setOpenExpireDateFilter(false)}>Apply</button>
              </div>
            </div>
          )}
        </div>

        {/* Expire In */}
        <div className="relative">
          <button onClick={(e) => { e.stopPropagation(); setOpenExpireInFilter((v) => !v); }} className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg bg-white transition hover:shadow-sm active:scale-95 ${(expireInDays !== '' && expireInDays !== undefined && expireInDays !== null) ? 'text-blue-700 border-blue-300 bg-blue-50' : 'text-gray-700'}`}>
            ＋ Expire In
          </button>
          {openExpireInFilter && (
            <div className="absolute z-20 mt-2 w-56 bg-white border rounded-lg shadow-lg p-3">
              <div className="text-sm text-gray-700 font-medium mb-2">Expire within</div>
              <div className="grid grid-cols-3 gap-2 mb-2">
                {[7, 30, 90, 180, 365].map((d) => (
                  <button key={d} className={`text-sm px-2 py-1 rounded-md border ${expireInDays === d ? 'bg-blue-600 text-white border-blue-600' : 'bg-white hover:bg-gray-50'}`} onClick={() => { setExpireInDays(d); setPage(1); }}>
                    {d}d
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input type="number" min={1} placeholder="Custom days" value={expireInDays === '' ? '' : expireInDays} onChange={(e) => { const v = e.target.value; setExpireInDays(v ? Number(v) : ''); setPage(1); }} className="w-28 border rounded-md px-2 py-1" />
                <button className="text-sm px-3 py-1.5 border rounded-md hover:bg-gray-50" onClick={() => setExpireInDays('')}>Clear</button>
                <button className="text-sm px-3 py-1.5 rounded-md text-white" style={{ backgroundColor: '#01793b' }} onClick={() => setOpenExpireInFilter(false)}>Apply</button>
              </div>
              <div className="mt-2 text-xs text-gray-500">Catatan: baris tanpa Expire Date tidak akan termasuk saat filter aktif.</div>
            </div>
          )}
        </div>

        {/* Export */}
        <div className="relative">
          <button onClick={handleExport} className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-gray-700 bg-white transition hover:shadow-sm active:scale-95">
            ⬇ Export
          </button>
        </div>

        {/* View menu */}
        <div className="relative">
          <button onClick={(e) => { e.stopPropagation(); setOpenViewMenu((v) => !v); }} className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-gray-700 bg-white transition hover:shadow-sm active:scale-95">
            ☰ View
          </button>
          {openViewMenu && (
            <div className="absolute z-20 mt-2 w-40 bg-white border rounded-lg shadow-lg p-2">
              <button className={`w-full text-left px-3 py-2 rounded-md ${viewMode === 'list' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}`} onClick={() => { setViewMode('list'); setOpenViewMenu(false); }}>List</button>
              <button className={`w-full text-left px-3 py-2 rounded-md ${viewMode === 'card' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}`} onClick={() => { setViewMode('card'); setOpenViewMenu(false); }}>Card</button>
            </div>
          )}
        </div>
      </div>

      {/* content area: table (list) or grid (card) */}
      {viewMode === 'list' ? (
        <div className="overflow-auto border rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-700 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-2 text-left whitespace-nowrap cursor-pointer" onClick={() => toggleSort('id')}>ID <SortIcon col="id" /></th>
                <th className="px-4 py-2 text-left whitespace-nowrap cursor-pointer" onClick={() => toggleSort('numberTitle')}>Number & Title <SortIcon col="numberTitle" /></th>
                <th className="px-4 py-2 text-left whitespace-nowrap cursor-pointer" onClick={() => toggleSort('description')}>Description <SortIcon col="description" /></th>
                <th className="px-4 py-2 text-left whitespace-nowrap cursor-pointer" onClick={() => toggleSort('documentDate')}>Document Date <SortIcon col="documentDate" /></th>
                <th className="px-4 py-2 text-left">Contributors</th>
                <th className="px-4 py-2 text-left whitespace-nowrap cursor-pointer" onClick={() => toggleSort('archive')}>Archive <SortIcon col="archive" /></th>
                <th className="px-4 py-2 text-left whitespace-nowrap cursor-pointer" onClick={() => toggleSort('updatedCreatedBy')}>Update & Create by <SortIcon col="updatedCreatedBy" /></th>
                <th className="px-4 py-2 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {viewRows.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-center text-gray-500" colSpan={8}>
                    No documents found.
                    <div className="mt-3">
                      <button
                        className="inline-flex items-center px-3 py-1.5 text-white text-sm font-medium rounded-md"
                        style={{ backgroundColor: '#01793b' }}
                        onClick={() => (onAddNew ? onAddNew() : alert('Add New Document pressed'))}
                      >
                        + Add New Document
                      </button>
                    </div>
                  </td>
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
                    <td className="px-4 py-2 align-top text-gray-700 max-w-xl">
                      {r.description ? (
                        <Tooltip content={r.description} placement="top">
                          <div className="max-w-xl truncate cursor-help">{r.description}</div>
                        </Tooltip>
                      ) : null}
                    </td>
                    <td className="px-4 py-2 align-top text-gray-700 whitespace-nowrap">{r.documentDate}</td>
                    <td className="px-4 py-2 align-top text-gray-700 whitespace-nowrap">
                      <Tooltip content={(r.contributors ?? []).join(', ')} placement="top">
                        <div className="flex flex-wrap gap-1 cursor-help">
                          {(r.contributors ?? []).map((name, idx) => (
                            <span key={`${r.id}-c-${idx}`} className="inline-flex items-center px-2 py-0.5 text-xs rounded-full border bg-gray-50 text-gray-700">
                              {name}
                            </span>
                          ))}
                        </div>
                      </Tooltip>
                    </td>
                    <td className="px-4 py-2 align-top text-gray-700">
                      {r.archive ? (
                        <span className={`inline-flex items-center px-2 py-0.5 text-xs rounded-full border ${getArchiveBadgeClasses(r.archive)}`}>
                          {r.archive}
                        </span>
                      ) : null}
                    </td>
                    <td className="px-4 py-2 align-top text-gray-700 whitespace-nowrap">
                      {r.updatedCreatedBy ? (
                        <Tooltip content={`Update & Create by: ${r.updatedCreatedBy}`} placement="top">
                          <span className="cursor-help">{r.updatedCreatedBy}</span>
                        </Tooltip>
                      ) : null}
                    </td>
                    <td className="px-4 py-2 align-top text-right relative" onClick={(e) => e.stopPropagation()}>
                      <button
                        aria-label="More actions"
                        aria-expanded={openMenuId === r.id}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-md border hover:bg-gray-100 btn-ripple btn-ellipsis-anim focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        onClick={() => setOpenMenuId((id) => (id === r.id ? null : r.id))}
                        onKeyDown={(e) => {
                          if (e.key === 'ArrowDown') {
                            e.preventDefault();
                            setOpenMenuId(r.id);
                            setTimeout(() => {
                              const first = document.querySelector(`#menu-list-${CSS.escape(String(r.id))} [data-menu-item]`) as HTMLElement | null;
                              first?.focus();
                            }, 0);
                          }
                        }}
                      >
                        ⋯
                      </button>
                      {openMenuId === r.id && (
                        <div id={`menu-list-${String(r.id)}`} className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-20" role="menu" aria-label="Row actions menu"
                          onKeyDown={(e) => {
                            const items = Array.from((e.currentTarget.querySelectorAll('[data-menu-item]')) as NodeListOf<HTMLElement>);
                            const idx = items.findIndex((el) => el === document.activeElement);
                            if (e.key === 'ArrowDown') {
                              e.preventDefault();
                              const next = items[(idx + 1) % items.length];
                              next?.focus();
                            } else if (e.key === 'ArrowUp') {
                              e.preventDefault();
                              const prev = items[(idx - 1 + items.length) % items.length];
                              prev?.focus();
                            } else if (e.key === 'Escape') {
                              setOpenMenuId(null);
                            }
                          }}
                        >
                          <button data-menu-item className="w-full text-left px-3 py-2 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none" onClick={() => handleEdit(r)}>Edit</button>
                          <button data-menu-item className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 focus:bg-red-50 focus:outline-none" onClick={() => handleDelete(r)}>Delete</button>
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
                        {r.archive && (
                          <span className={`hidden sm:inline text-xs px-2 py-0.5 rounded-full border ${getArchiveBadgeClasses(r.archive)}`}>{r.archive}</span>
                        )}
                        <button
                          aria-label="More actions"
                          aria-expanded={openMenuId === r.id}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-md border hover:bg-gray-100 btn-ripple btn-ellipsis-anim focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                          onClick={() => setOpenMenuId((id) => (id === r.id ? null : r.id))}
                          onKeyDown={(e) => {
                            if (e.key === 'ArrowDown') {
                              e.preventDefault();
                              setOpenMenuId(r.id);
                              setTimeout(() => {
                                const first = document.querySelector(`#menu-card-${CSS.escape(String(r.id))} [data-menu-item]`) as HTMLElement | null;
                                first?.focus();
                              }, 0);
                            }
                          }}
                        >
                          ⋯
                        </button>
                      </div>
                    </div>
                    {openMenuId === r.id && (
                      <div id={`menu-card-${String(r.id)}`} className="absolute right-2 top-10 w-40 bg-white border rounded-md shadow-lg z-20" role="menu" aria-label="Card actions menu"
                        onKeyDown={(e) => {
                          const items = Array.from((e.currentTarget.querySelectorAll('[data-menu-item]')) as NodeListOf<HTMLElement>);
                          const idx = items.findIndex((el) => el === document.activeElement);
                          if (e.key === 'ArrowDown') {
                            e.preventDefault();
                            const next = items[(idx + 1) % items.length];
                            next?.focus();
                          } else if (e.key === 'ArrowUp') {
                            e.preventDefault();
                            const prev = items[(idx - 1 + items.length) % items.length];
                            prev?.focus();
                          } else if (e.key === 'Escape') {
                            setOpenMenuId(null);
                          }
                        }}
                      >
                        <button data-menu-item className="w-full text-left px-3 py-2 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none" onClick={() => handleEdit(r)}>Edit</button>
                        <button data-menu-item className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 focus:bg-red-50 focus:outline-none" onClick={() => handleDelete(r)}>Delete</button>
                      </div>
                    )}
                    <div className="leading-tight mb-2">
                      <div className="font-semibold text-gray-900 uppercase">{code}</div>
                      {label && <div className="mt-0.5 text-gray-900 uppercase">{label}</div>}
                    </div>
                    {r.description && (
                      <Tooltip content={r.description} placement="top">
                        <p className="text-sm text-gray-700 mb-3 line-clamp-3 cursor-help">{r.description}</p>
                      </Tooltip>
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
                        <Tooltip content={(r.contributors ?? []).join(', ')} placement="top">
                          <div className="flex items-center gap-2 cursor-help">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                            <span className="text-gray-600 font-medium">Contributors:</span>
                            <span className="text-gray-800">{(r.contributors ?? []).join(', ')}</span>
                          </div>
                        </Tooltip>
                      )}
                      {r.updatedCreatedBy && (
                        <Tooltip content={`Update & Create by: ${r.updatedCreatedBy}`} placement="top">
                          <div className="flex items-center gap-2 cursor-help">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
                            <span className="text-gray-600 font-medium">Updated / Created by:</span>
                            <span className="text-gray-800">{r.updatedCreatedBy}</span>
                          </div>
                        </Tooltip>
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
    <ConfirmDialog
      open={confirmOpen}
      title="Konfirmasi Hapus"
      description="Apakah Anda yakin ingin menghapus dokumen ini? Tindakan ini tidak dapat dibatalkan."
      confirmText="Hapus"
      cancelText="Batal"
      onConfirm={doConfirmDelete}
      onCancel={cancelConfirmDelete}
    />
    </>
  );
}

function getArchiveBadgeClasses(name: string): string {
  const map: Record<string, string> = {
    personal: 'bg-rose-50 text-rose-700 border-rose-200',
    finance: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    legal: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    operations: 'bg-amber-50 text-amber-700 border-amber-200',
    marketing: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
    it: 'bg-sky-50 text-sky-700 border-sky-200',
    default: 'bg-blue-50 text-blue-700 border-blue-200',
  };
  const key = name.trim().toLowerCase();
  const found = Object.keys(map).find(k => key.includes(k));
  return map[found as keyof typeof map] ?? map.default;
}
