"use client";

import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DocumentTable, { DocumentRow } from '@/components/DocumentTable';
import { useRouter } from 'next/navigation';

export default function TikArchivePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const subFolders = [
    { title: 'Licenses & Renewals', slug: 'licenses-renewals' },
    { title: 'Dokumentasi Aplikasi', slug: 'DOKUMENTASIAPLIKASI' },
  ];

  const filtered = subFolders.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
    s.slug.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  // Sample data untuk TIK (bisa diganti API)
  const allRows: DocumentRow[] = useMemo(() => ([
    {
      id: 1,
      numberTitle: 'IT-001 • SSL Certificate - pupuk-kujang.co.id',
      description: 'Wildcard cert for primary domain (non GCP).',
      documentDate: '2025-01-15',
      contributors: ['Aldi P.', 'Nia K.'],
      archive: 'Licenses & Renewals',
      updatedCreatedBy: 'Aldi P. / Nia K.',
    },
    {
      id: 2,
      numberTitle: 'IT-002 • App Documentation - KUJANG AI',
      description: 'Onboarding + architecture overview.',
      documentDate: '2025-03-02',
      contributors: ['Ahmad R.'],
      archive: 'Dokumentasi Aplikasi',
      updatedCreatedBy: 'Ahmad R.',
    },
  ]), []);

  const [selectedArchive, setSelectedArchive] = useState<string | null>(null);
  const docRef = useRef<HTMLDivElement | null>(null);
  const displayRows = useMemo(
    () => (selectedArchive ? allRows.filter((r) => r.archive === selectedArchive) : allRows),
    [allRows, selectedArchive]
  );
  const visibleSubFolders = useMemo(
    () => (selectedArchive ? filtered.filter((s) => s.title === selectedArchive) : filtered),
    [filtered, selectedArchive]
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header Section (tetap sama dengan halaman utama) */}
      <div className="bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Left side - Title and Breadcrumb */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">SIADIL</h1>
              <p className="text-gray-600 mb-3">Sistem Arsip Digital</p>
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-sm">
                <Image src="/icon_folder.png" alt="Folder Icon" width={16} height={16} className="text-gray-500" />
                <Link href="/siadil" className="text-gray-700 hover:underline">Root</Link>
                <span className="text-gray-400">/</span>
                {/* TIK breadcrumb; klik untuk reset filter */}
                <button
                  type="button"
                  onClick={() => setSelectedArchive(null)}
                  className={`hover:underline text-left ${selectedArchive ? 'text-gray-700' : 'text-gray-900'}`}
                >
                  Teknologi, Informasi & Komunikasi
                </button>
                {selectedArchive && (
                  <>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-900">{selectedArchive}</span>
                  </>
                )}
              </nav>
            </div>

            {/* Right side - Search and Add Button */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Archive"
                  className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent custom-focus-ring"
                />
              </div>

              {/* Create new archives Button */}
              <button
                className="inline-flex items-center px-4 py-2 text-white font-medium rounded-lg transition-colors duration-200 hover:opacity-90"
                style={{ backgroundColor: '#01793b' }}
              >
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create New Archive
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - sama seperti halaman utama */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Back icon (posisi konsisten di area konten bagian atas kiri) */}
        <div className="mb-4">
          <button
            aria-label="Back"
            title="Back"
            className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50"
            onClick={() => {
              if (selectedArchive) {
                setSelectedArchive(null);
              } else {
                router.push('/siadil');
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        {/* My Archive and Reminders Section - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* My Archive (copy dari halaman utama) */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">My Archive</h2>
            <div className="grid grid-cols-1 gap-6">
              <div className="cursor-pointer transition-shadow duration-200 min-h-[120px] flex items-center hover:shadow-2xl rounded-lg border w-full max-w-xs p-4" style={{ background: '#01793b', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)', borderColor: '#16a34a', padding: '1rem' }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'; }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', width: '100%' }}>
                  <div style={{ flexShrink: 0 }}>
                    <div style={{ width: '3rem', height: '3rem', backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1rem', fontWeight: 'bold' }}>AP</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Image src="/lock.png" alt="Lock Icon" width={16} height={16} className="object-contain brightness-0 invert" />
                      <h3 style={{ fontSize: '1rem', fontWeight: '500', color: 'white', margin: 0, padding: 0, background: 'none', lineHeight: '1.5' }}>Personal</h3>
                    </div>
                    <p style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.8)', margin: '0.25rem 0 0 0', padding: 0, background: 'none' }}>ID: 10122076</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reminders (copy dari halaman utama) */}
          <div className="flex flex-col items-start lg:pl-32 xl:pl-48">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Reminders</h2>
            <div className="grid grid-cols-1 gap-6 w-full">
              <div className="bg-red-500 rounded-lg shadow-sm border border-red-600 p-4 min-h-[120px] flex items-start w-full max-w-xs">
                <div className="flex items-start w-full">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                      <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                    </div>
                  </div>
                  <div className="ml-3 flex-1" style={{ background: 'transparent !important', backgroundColor: 'transparent !important' }}>
                    <h3 className="text-sm font-medium text-white" style={{ color: 'white !important', background: 'transparent !important', backgroundColor: 'transparent !important' }}>SSL01</h3>
                    <p className="text-xs text-white mt-1" style={{ color: 'white !important', background: 'transparent !important', backgroundColor: 'transparent !important' }}>SSL pupuk-kujang.co.id (Non GCP)</p>
                    <p className="text-xs text-red-100 mt-2" style={{ color: '#fecaca !important', background: 'transparent !important', backgroundColor: 'transparent !important' }}>This document is expired 3 months ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-folders Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Archives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleSubFolders.map((s) => (
              <button
                key={s.slug}
                onClick={() => { setSelectedArchive(s.title); docRef.current?.scrollIntoView({ behavior: 'smooth' }); }}
                className="bg-white text-left rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-200 flex items-center"
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
              </button>
            ))}
          </div>
        </div>

        {/* Document table langsung tampil di halaman TIK */}
        <div ref={docRef}>
          <DocumentTable title={selectedArchive ?? 'Document'} rows={displayRows} />
        </div>
      </div>
    </div>
  );
}
