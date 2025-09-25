"use client";

import React, { useEffect } from "react";
import type { DocumentRow } from "./DocumentTable";

type Props = {
  open: boolean;
  row: DocumentRow | null;
  onClose: () => void;
  onEdit?: (row: DocumentRow) => void;
  onDelete?: (row: DocumentRow) => void;
};

export default function DocumentDetailModal({ open, row, onClose, onEdit, onDelete }: Props) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !row) return null;

  const parts = (row.numberTitle ?? "").split("•");
  const code = (parts[0] ?? "").trim();
  const label = (parts[1] ?? "").trim();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/35" onClick={onClose} />
      <div
        className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-xl border animate-in fade-in zoom-in"
        role="dialog"
        aria-modal="true"
      >
        <button
          aria-label="Close"
          className="absolute top-3 right-3 w-9 h-9 inline-flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500"
          onClick={onClose}
        >
          ×
        </button>

        <div className="px-6 pt-8 pb-4 text-center">
          {/* Icon */}
          <div className="mx-auto mb-4 w-14 h-14 rounded-xl bg-gray-100 border flex items-center justify-center text-gray-600">
            {/* simple document icon */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
              <path d="M14 3v5h5" />
            </svg>
          </div>

          {/* Title & code */}
          <h3 className="text-xl font-semibold text-gray-900 leading-snug">
            {label || row.numberTitle}
          </h3>
          {code && (
            <div className="mt-1 text-sm text-gray-600 tracking-wide">{code}</div>
          )}

          {/* Description */}
          {row.description && (
            <div className="mt-4 text-left">
              <div className="text-sm font-semibold text-gray-700">Deskripsi</div>
              <p className="mt-1 text-sm text-gray-700 leading-relaxed">{row.description}</p>
            </div>
          )}

          {/* Properties */}
          <div className="mt-5 pt-4 border-t text-left">
            <div className="text-sm font-semibold text-gray-700 mb-2">Properti</div>
            <dl className="text-sm text-gray-700 space-y-2">
              {row.archive && (
                <div className="flex items-center justify-between">
                  <dt className="text-gray-600">Arsip</dt>
                  <dd className="font-medium text-gray-800">{row.archive}</dd>
                </div>
              )}
              {row.documentDate && (
                <div className="flex items-center justify-between">
                  <dt className="text-gray-600">Tanggal Dokumen</dt>
                  <dd className="font-medium text-gray-800">{row.documentDate}</dd>
                </div>
              )}
              {row.expireDate && (
                <div className="flex items-center justify-between">
                  <dt className="text-gray-600">Expire</dt>
                  <dd className="font-medium text-gray-800">{row.expireDate}</dd>
                </div>
              )}
              {row.updatedCreatedBy && (
                <div className="flex items-center justify-between">
                  <dt className="text-gray-600">Updated/Created by</dt>
                  <dd className="font-medium text-gray-800">{row.updatedCreatedBy}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 pb-6 pt-2 flex items-center justify-end gap-2">
          <button
            className="px-4 py-2 rounded-md border text-gray-700 hover:bg-gray-50"
            onClick={onClose}
          >
            Tutup
          </button>
          {onEdit && (
            <button
              className="px-4 py-2 rounded-md text-white"
              style={{ backgroundColor: "#01793b" }}
              onClick={() => onEdit(row)}
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              className="px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700"
              onClick={() => onDelete(row)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
