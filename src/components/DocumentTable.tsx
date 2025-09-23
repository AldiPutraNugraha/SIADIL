"use client";

import { useMemo, useState } from 'react';

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
};

export default function DocumentTable({
  title = 'Document',
  rows,
  pageSizeOptions = [10, 25, 50],
  defaultPageSize = 10,
  onAddNew,
}: Props) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [sortKey, setSortKey] = useState<SortKey>('id');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    let data = rows;
    if (term) {
      data = rows.filter((r) =>
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
    }
    return data;
  }, [rows, search]);

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

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
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

      {/* table */}
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
            </tr>
          </thead>
          <tbody className="divide-y">
            {viewRows.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan={7}>No documents found.</td>
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
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

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
