"use client";

import React from 'react';

type Props = {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  open,
  title = 'Konfirmasi',
  description = 'Apakah Anda yakin?',
  confirmText = 'Hapus',
  cancelText = 'Batal',
  onConfirm,
  onCancel,
}: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onCancel} />
      <div className="relative w-full max-w-sm mx-4 bg-white rounded-lg shadow-lg border">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <div className="p-4 text-sm text-gray-700">
          {description}
        </div>
        <div className="p-4 flex justify-end gap-2 border-t">
          <button onClick={onCancel} className="px-3 py-1.5 border rounded-md text-gray-700 hover:bg-gray-50">{cancelText}</button>
          <button onClick={onConfirm} className="px-3 py-1.5 rounded-md text-white" style={{ backgroundColor: '#dc2626' }}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
}
