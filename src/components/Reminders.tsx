"use client";

import React, { useMemo, useState } from "react";
import type { DocumentRow } from "./DocumentTable";

type Props = {
  title?: string;
  rows: DocumentRow[];
  dangerDays?: number; // merah jika diffDays <= dangerDays atau sudah lewat
  warningDays?: number; // kuning jika diffDays <= warningDays
  singleCardViewport?: boolean; // tampilkan 1 kartu per viewport (scroll untuk lainnya)
  cardWidth?: number; // lebar kartu saat singleCardViewport (default 360)
};

export default function Reminders({ title = "Reminders", rows, dangerDays = 14, warningDays = 60, singleCardViewport = false, cardWidth = 360 }: Props) {
  const [openAll, setOpenAll] = useState(false);

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

    // Urutkan yang paling mendesak (hari paling sedikit/negatif dulu)
    list.sort((a, b) => a.diffDays - b.diffDays);
    return list;
  }, [rows, dangerDays, warningDays]);

  if (reminders.length === 0) return null;

  const total = reminders.length;

  return (
    <div className="mb-6">
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <button className="text-green-700 hover:underline" onClick={() => setOpenAll(true)}>View All ({total})</button>
      </div>

      {/* Horizontal scroll area */}
      <div className="relative">
        <div className="overflow-x-auto [scrollbar-width:thin]" style={singleCardViewport ? { maxWidth: `${cardWidth}px` } : undefined}>
          <div className="flex gap-3 min-w-max pr-2">
            {reminders.map(({ row, diffDays, status }) => (
              <ReminderCard key={String(row.id)} row={row} diffDays={diffDays} status={status as "red" | "yellow"} widthPx={singleCardViewport ? cardWidth : undefined} />
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
                {reminders.map(({ row, diffDays, status }) => (
                  <ReminderCard key={`all-${row.id}`} row={row} diffDays={diffDays} status={status as "red" | "yellow"} fullWidth />
                ))}
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

function ReminderCard({ row, diffDays, status, fullWidth = false, widthPx }: { row: DocumentRow; diffDays: number; status: "red" | "yellow"; fullWidth?: boolean; widthPx?: number }) {
  const isExpired = diffDays < 0;
  const { code, label } = splitNumberTitle(row.numberTitle);
  const bg = status === "red" ? "bg-red-500 text-white border-red-600" : "bg-yellow-100 text-gray-900 border-yellow-300";
  const iconBg = status === "red" ? "bg-white/10 border-white/30 text-white" : "bg-yellow-50 border-yellow-300 text-yellow-800";
  const yellowBgStyle = status === 'yellow' ? { backgroundColor: '#FEF3C7' } : undefined; // Tailwind yellow-100

  return (
    <div className={`${fullWidth ? "w-full" : "flex-shrink-0"} rounded-lg min-h-[120px] border ${bg} p-4`} style={!fullWidth && widthPx ? { width: `${widthPx}px` } : (!fullWidth ? { width: '360px' } : undefined)}> 
  <div className="flex items-start gap-3 bg-inherit" style={yellowBgStyle}>
        <div className={`w-10 h-10 rounded-full border flex items-center justify-center ${iconBg}`}>
          {/* icon */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 9v4" />
            <circle cx="12" cy="17" r="1" />
            <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0 bg-inherit" style={yellowBgStyle}>
          <div className={`font-semibold ${status === "red" ? "text-white" : "text-red-700"}`}>{code || label || row.numberTitle}</div>
          <div className={`${status === "red" ? "text-white/90" : "text-gray-800"} truncate bg-inherit`} style={yellowBgStyle}>{label || row.description || row.numberTitle}</div>
          <div className={`${status === "red" ? "text-white/90" : "text-gray-700"} text-sm mt-1 bg-inherit`} style={yellowBgStyle}>
            {isExpired ? (
              <>Dokumen ini telah kedaluwarsa sejak {formatDuration(Math.abs(diffDays))}</>
            ) : status === 'red' ? (
              <>Dokumen ini akan kedaluwarsa dalam {formatDuration(diffDays)} (mendesak)</>
            ) : (
              <>Dokumen ini akan kedaluwarsa dalam {formatDuration(diffDays)}</>
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
  if (months > 0 && days > 0) return `${months} bulan ${days} hari`;
  if (months > 0) return `${months} bulan`;
  return `${days} hari`;
}
