"use client";

import React, { useMemo, useState, useCallback } from "react";
import type { DocumentRow } from "./DocumentTable";

type Props = {
  title?: string;
  rows: DocumentRow[];
  dangerDays?: number; // merah jika diffDays <= dangerDays atau sudah lewat
  warningDays?: number; // kuning jika diffDays <= warningDays
  singleCardViewport?: boolean; // tampilkan 1 kartu per viewport (scroll untuk lainnya)
  cardWidth?: number; // lebar kartu saat singleCardViewport (default 360)
  showLegend?: boolean; // tampilkan legend warna
  enableFilter?: boolean; // tampilkan toggle filter urgent/warning
  onCardClick?: (row: DocumentRow) => void; // klik kartu callback (bisa buka detail)
  enableHideExpired?: boolean; // tampilkan toggle hide expired urgent
  persistStateKey?: string; // nama key localStorage untuk simpan filter state
};

export default function Reminders({ title = "Reminders", rows, dangerDays = 14, warningDays = 60, singleCardViewport = false, cardWidth = 360, showLegend = false, enableFilter = false, onCardClick, enableHideExpired=false, persistStateKey }: Props) {
  const [openAll, setOpenAll] = useState(false);
  const [showUrgent, setShowUrgent] = useState(true);
  const [showWarning, setShowWarning] = useState(true);
  const [showExpiredOnly, setShowExpiredOnly] = useState(false); // true = tampilkan hanya expired (urgent)

  // Load persisted state
  React.useEffect(() => {
    if (!persistStateKey) return;
    try {
      const raw = localStorage.getItem(persistStateKey);
      if (raw) {
        const obj = JSON.parse(raw);
        if (typeof obj.showUrgent === 'boolean') setShowUrgent(obj.showUrgent);
        if (typeof obj.showWarning === 'boolean') setShowWarning(obj.showWarning);
  if (typeof obj.showExpiredOnly === 'boolean') setShowExpiredOnly(obj.showExpiredOnly);
      }
    } catch {}
  }, [persistStateKey]);
  // Persist on change
  React.useEffect(() => {
    if (!persistStateKey) return;
    try {
  localStorage.setItem(persistStateKey, JSON.stringify({ showUrgent, showWarning, showExpiredOnly }));
    } catch {}
  }, [showUrgent, showWarning, showExpiredOnly, persistStateKey]);

  const reminders = useMemo(() => {
    const today = startOfToday();
    const list = rows
      .filter((r) => r.expireDate)
      .map((r) => {
        const t = Date.parse(r.expireDate as string);
        const diffDays = Math.floor((t - today) / (24 * 60 * 60 * 1000));
        // Logika warna:
        // - merah: sudah lewat (diffDays < 0) atau akan kedaluwarsa dalam <= dangerDays
        // - kuning: akan kedaluwarsa dalam > dangerDays dan <= warningDays
        // - lainnya: tidak ditampilkan
        const status: "red" | "yellow" | null = (diffDays <= dangerDays) ? "red" : (diffDays <= warningDays ? "yellow" : null);
        return { row: r, diffDays, status } as const;
      })
      .filter((x) => x.status !== null);

    // Sorting terkini sesuai kebutuhan:
    // 1. Semua RED dulu (paling urgent) kemudian YELLOW.
    // 2. Dalam RED:
    //    a. Yang belum expired (diffDays >= 0) urut naik (0,1,2,...)
    //    b. Lalu yang sudah expired (diffDays < 0) urut mendekati hari ini ( -1, -2, -3 ... )
    // 3. Dalam YELLOW: urut naik (paling cepat kedaluwarsa dulu)
    list.sort((a, b) => {
      if (a.status !== b.status) return a.status === 'red' ? -1 : 1;
      // sama status
      if (a.status === 'red') {
        const aUpcoming = a.diffDays >= 0;
        const bUpcoming = b.diffDays >= 0;
        if (aUpcoming && bUpcoming) return a.diffDays - b.diffDays; // sama-sama upcoming
        if (aUpcoming && !bUpcoming) return -1; // upcoming red sebelum expired red
        if (!aUpcoming && bUpcoming) return 1;
        // sama-sama expired -> diffDays lebih besar (misal -2) artinya lebih baru
        return b.diffDays - a.diffDays; // -1 sebelum -30
      }
      // yellow
      return a.diffDays - b.diffDays;
    });
    return list;
  }, [rows, dangerDays, warningDays]);

  const counts = useMemo(() => {
    let red = 0, redUpcoming=0, redExpired=0, yellow = 0;
    for (const r of reminders) {
      if (r.status === 'red') {
        red++;
        if (r.diffDays < 0) redExpired++; else redUpcoming++;
      } else if (r.status === 'yellow') yellow++;
    }
    return { red, yellow, total: reminders.length, redUpcoming, redExpired };
  }, [reminders]);

  const filtered = useMemo(() => reminders.filter(r => {
    // Expired-only tab: tampilkan hanya urgent yang sudah expired
    if (showExpiredOnly) {
      return r.status === 'red' && r.diffDays < 0;
    }
    // Tab mode eksklusif:
    // - Urgent tab: hanya urgent yang BELUM expired (upcoming)
    if (showUrgent && !showWarning) {
      return r.status === 'red' && r.diffDays >= 0;
    }
    // - Warning tab: hanya yellow
    if (showWarning && !showUrgent) {
      return r.status === 'yellow';
    }
    // Jika keduanya aktif (mis. default atau state lama), tampilkan semua sesuai toggle
    if (r.status === 'red') return showUrgent;
    if (r.status === 'yellow') return showWarning;
    return false;
  }), [reminders, showUrgent, showWarning, showExpiredOnly]);

  const handleCardClick = useCallback((row: DocumentRow) => { if (onCardClick) onCardClick(row); }, [onCardClick]);

  if (reminders.length === 0) return null;
  const total = filtered.length; // tampilkan jumlah yang terlihat setelah filter

  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          {showLegend && (
            <div className="flex flex-col gap-1 text-[11px] text-gray-600">
              <div className="flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-red-500 inline-block" /> Urgent {counts.red}</span>
                <span className="inline-flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-yellow-300 inline-block border border-yellow-500" /> Warning {counts.yellow}</span>
                <span className="inline-flex items-center">Total {counts.total}</span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> Upcoming {counts.redUpcoming}</span>
                <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-800 inline-block" /> Expired {counts.redExpired}</span>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          {enableFilter && (
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => { setShowUrgent(true); setShowWarning(false); setShowExpiredOnly(false); }}
                className={`px-2 py-1 rounded border text-[11px] font-medium ${showUrgent && !showExpiredOnly ? 'reminder-tab-urgent-active' : 'bg-white text-gray-600 hover:bg-red-50'}`}
              >
                Urgent
              </button>
              <button
                onClick={() => { setShowWarning(true); setShowUrgent(false); setShowExpiredOnly(false); }}
                className={`px-2 py-1 rounded border text-[11px] font-medium ${showWarning && !showExpiredOnly ? 'reminder-tab-warning-active' : 'bg-white text-gray-600 hover:bg-yellow-50'}`}
              >
                Warning
              </button>
              {enableHideExpired && (
                <button
                  onClick={() => { setShowExpiredOnly(true); setShowUrgent(false); setShowWarning(false); }}
                  className={`px-2 py-1 rounded border text-[11px] font-medium ${showExpiredOnly ? 'reminder-tab-expired-active' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                  title="Show only expired (urgent) documents"
                >
                  Expired
                </button>
              )}
            </div>
          )}
          <button className="text-green-700 hover:underline" onClick={() => setOpenAll(true)}>View All ({counts.total})</button>
        </div>
      </div>

      {/* Horizontal scroll area */}
      <div className="relative">
        <div className="overflow-x-auto [scrollbar-width:thin]" style={singleCardViewport ? { maxWidth: `${cardWidth}px` } : undefined}>
          <div className="flex gap-3 min-w-max pr-2">
            {filtered.map(({ row, diffDays, status }) => (
              <ReminderCard key={String(row.id)} row={row} diffDays={diffDays} status={status as "red" | "yellow"} widthPx={singleCardViewport ? cardWidth : undefined} onClick={handleCardClick} />
            ))}
          </div>
        </div>
      </div>

      {/* View all modal */}
      {openAll && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpenAll(false)} />
          <div className="relative w-full max-w-3xl mx-4 bg-white rounded-xl shadow-xl border">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="text-lg font-semibold">All Reminders ({total})</div>
              <button className="w-9 h-9 inline-flex items-center justify-center rounded-full hover:bg-gray-100" onClick={() => setOpenAll(false)}>×</button>
            </div>
            <div className="max-h-[70vh] overflow-auto p-4">
              <div className="space-y-3">
                {/* Grouped sections */}
                {counts.red > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-red-600 mb-2">Urgent ({counts.red}) · Upcoming {counts.redUpcoming}{counts.redExpired?`, Expired ${counts.redExpired}`:''}</h3>
                    <div className="space-y-3" role="list">
                      {reminders.filter(r=>r.status==='red').map(({ row, diffDays, status }) => (
                        <ReminderCard key={`all-red-${row.id}`} row={row} diffDays={diffDays} status={status as 'red'} fullWidth onClick={handleCardClick} />
                      ))}
                    </div>
                  </div>
                )}
                {counts.yellow > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold text-yellow-700 mb-2">Warning ({counts.yellow})</h3>
                    <div className="space-y-3" role="list">
                      {reminders.filter(r=>r.status==='yellow').map(({ row, diffDays, status }) => (
                        <ReminderCard key={`all-yellow-${row.id}`} row={row} diffDays={diffDays} status={status as 'yellow'} fullWidth onClick={handleCardClick} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="p-4 border-t text-right">
              <button className="px-4 py-2 rounded-md border hover:bg-gray-50" onClick={() => setOpenAll(false)}>Tutup</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ReminderCard({ row, diffDays, status, fullWidth = false, widthPx, onClick }: { row: DocumentRow; diffDays: number; status: "red" | "yellow"; fullWidth?: boolean; widthPx?: number; onClick?: (row: DocumentRow)=>void }) {
  const isExpired = diffDays < 0;
  const { code, label } = splitNumberTitle(row.numberTitle);
  // Styling khusus expired urgent -> #1f2937 (gray-800)
  let bg = '';
  let iconBg = '';
  if (status === 'yellow') {
    bg = 'reminder-yellow text-gray-900 border-yellow-300';
    iconBg = 'bg-yellow-500/30 border-yellow-700 text-yellow-900';
  } else { // red family
    if (isExpired) {
      bg = 'reminder-expired text-white';
      iconBg = 'bg-white/10 border-white/30 text-white';
    } else {
      bg = 'bg-red-500 text-white border-red-600';
      iconBg = 'bg-white/10 border-white/30 text-white';
    }
  }

  const interactive = !!onClick;
  return (
    <div
      role="listitem"
      aria-label={`${status === 'red' ? 'Urgent' : 'Warning'}: ${label || row.numberTitle}`}
      onClick={interactive ? () => onClick?.(row) : undefined}
      onKeyDown={interactive ? (e)=>{ if(e.key==='Enter' || e.key===' ') { e.preventDefault(); onClick?.(row);} } : undefined}
      tabIndex={interactive ? 0 : -1}
      className={`${fullWidth ? "w-full" : "flex-shrink-0"} rounded-lg min-h-[120px] border ${bg} p-4 outline-none ${interactive ? 'cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition-shadow hover:shadow-md' : ''}`}
      style={!fullWidth && widthPx ? { width: `${widthPx}px` } : (!fullWidth ? { width: '360px' } : undefined)}
    > 
  <div className="flex items-start gap-3">
  <div className={`w-10 h-10 rounded-full border flex items-center justify-center ${iconBg}`} aria-hidden="true">
          {/* icon */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 9v4" />
            <circle cx="12" cy="17" r="1" />
            <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
          </svg>
        </div>
  <div className="flex-1 min-w-0"> 
          <div className={`font-semibold ${status === 'red' ? 'text-white' : 'text-red-700'}`}>{code || label || row.numberTitle}</div>
          <div className={`${status === 'red' ? 'text-white/90' : 'text-gray-800'} truncate`}>{label || row.description || row.numberTitle}</div>
          <div className={`${status === 'red' ? 'text-white/90' : 'text-gray-700'} text-sm mt-1`}>
            {isExpired ? (
              <>This document expired {formatDuration(Math.abs(diffDays))} ago</>
            ) : status === 'red' ? (
              <>This document will expire in {formatDuration(diffDays)} (urgent)</>
            ) : (
              <>This document will expire in {formatDuration(diffDays)}</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function startOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
}

function splitNumberTitle(s: string) {
  const parts = (s || "").split("•");
  const code = (parts[0] || "").trim();
  const label = (parts[1] || "").trim();
  return { code, label };
}

function formatDuration(totalDays: number) {
  const months = Math.floor(totalDays / 30);
  const days = totalDays % 30;
  if (months > 0 && days > 0) return `${months} month${months>1?'s':''} ${days} day${days!==1?'s':''}`;
  if (months > 0) return `${months} month${months>1?'s':''}`;
  return `${days} day${days!==1?'s':''}`;
}
