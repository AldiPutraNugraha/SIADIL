"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import DocumentTable from '@/components/DocumentTable';
import { generateDocs } from '@/lib/documents';

export default function TikArchivePage() {
  const router = useRouter();

  const subFolders = [
    { title: 'Licenses & Renewals', slug: 'licenses-renewals' },
    { title: 'Dokumentasi Aplikasi', slug: 'DOKUMENTASIAPLIKASI' },
  ];

  const visibleSubFolders = subFolders;

  return (
    <div className="min-h-screen bg-white dark:bg-white text-gray-900">
      {/* Header sederhana seperti halaman lainnya */}
      <div className="bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Teknologi, Informasi & Komunikasi</h1>
              <nav className="flex items-center space-x-2 text-sm mt-2">
                <Link href="/siadil" className="text-gray-600 hover:underline">Company Archive</Link>
                <span className="text-gray-400">/</span>
                <span className="text-gray-800">Teknologi, Informasi & Komunikasi</span>
              </nav>
            </div>
          </div>
        </div>
      </div>

        {/* Main Content - hanya sub-folder dan tabel dokumen */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
          {/* Tombol Back (sesuai halaman lain) */}
          <div className="mb-4">
            <button
              aria-label="Back"
              title="Back"
              className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-gray-600 text-gray-600 hover:bg-gray-300 transition-all active:scale-95 active:bg-gray-100 hover:shadow-lg hover:-translate-y-0.5"
              onClick={() => router.push('/siadil')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          {/* Tidak ada My Archive/Reminders di halaman TIK */}

        {/* Sub-folders Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Archives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleSubFolders.map((s) => (
              <Link
                key={s.slug}
                href={`/siadil/tik/${s.slug}`}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-200 flex items-center"
              >
                <div className="flex items-center space-x-4 w-full">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#01793b' }}>
                      <Image src="/icon_folder.png" alt="Folder Icon" width={24} height={24} className="object-contain brightness-0 invert" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-medium text-gray-900 leading-6">{s.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 leading-5">{s.slug}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Tabel dokumen khusus TIK (35 item) */}
        <div className="mb-12">
          <DocumentTable title="Document" rows={generateDocs(35, 'Teknologi, Informasi & Komunikasi')} />
        </div>
      </div>
    </div>
  );
}
