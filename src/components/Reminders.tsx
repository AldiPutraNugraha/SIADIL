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
};

export default function Reminders({ title = "Reminders", rows, dangerDays = 14, warningDays = 60, singleCardViewport = false, cardWidth = 360, showLegend = false, enableFilter = false, onCardClick }: Props) {
  const [openAll, setOpenAll] = useState(false);
  const [showUrgent, setShowUrgent] = useState(true);
  const [showWarning, setShowWarning] = useState(true);

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
    let red = 0, yellow = 0;
    for (const r of reminders) {
      if (r.status === 'red') red++; else if (r.status === 'yellow') yellow++;
    }
    return { red, yellow, total: reminders.length };
  }, [reminders]);

  const filtered = useMemo(() => reminders.filter(r => (r.status === 'red' && showUrgent) || (r.status === 'yellow' && showWarning)), [reminders, showUrgent, showWarning]);

  const handleCardClick = useCallback((row: DocumentRow) => { if (onCardClick) onCardClick(row); }, [onCardClick]);

  if (reminders.length === 0) return null;
  const total = filtered.length; // tampilkan jumlah yang terlihat setelah filter

  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          {showLegend && (
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <span className="inline-flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-red-500 inline-block" /> Urgent ({counts.red})</span>
              <span className="inline-flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-yellow-300 inline-block border border-yellow-500" /> Warning ({counts.yellow})</span>
              <span className="inline-flex items-center">Total {counts.total}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          {enableFilter && (
            <div className="flex items-center gap-2 text-xs">
              <button onClick={() => setShowUrgent(v=>!v)} className={`px-2 py-1 rounded border text-[11px] font-medium ${showUrgent? 'bg-red-500 text-white border-red-600':'bg-white text-gray-600 hover:bg-red-50'}`}>Urgent</button>
              <button onClick={() => setShowWarning(v=>!v)} className={`px-2 py-1 rounded border text-[11px] font-medium ${showWarning? 'bg-yellow-300 border-yellow-500 text-gray-900':'bg-white text-gray-600 hover:bg-yellow-50'}`}>Warning</button>
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
                    <h3 className="text-sm font-semibold text-red-600 mb-2">Urgent ({counts.red})</h3>
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
  // Untuk kartu kuning, cukup gunakan background di container luar agar solid penuh (seperti kartu merah)
  const bg = status === "red" ? "bg-red-500 text-white border-red-600" : "reminder-yellow text-gray-900 border-yellow-300";
  const iconBg = status === "red" ? "bg-white/10 border-white/30 text-white" : "bg-yellow-500/30 border-yellow-700 text-yellow-900";

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
          <div className={`font-semibold ${status === "red" ? "text-white" : "text-red-700"}`}>{code || label || row.numberTitle}</div>
          <div className={`${status === "red" ? "text-white/90" : "text-gray-800"} truncate`}>{label || row.description || row.numberTitle}</div>
          <div className={`${status === "red" ? "text-white/90" : "text-gray-700"} text-sm mt-1`}>
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
