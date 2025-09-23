"use client";

import Link from 'next/link';
import DocumentTable, { DocumentRow } from '@/components/DocumentTable';

export default function TikSubFolderPage({ params }: { params: { slug: string } }) {
  const titleMap: Record<string, string> = {
    'licenses-renewals': 'Licenses & Renewals',
    'DOKUMENTASIAPLIKASI': 'Dokumentasi Aplikasi',
  };

  const title = titleMap[params.slug] || params.slug;

  // sample rows; replace with data fetching later
  const sampleRows: DocumentRow[] = [
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
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-white text-gray-900">
      <div className="bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{title}</h1>
              <nav className="flex items-center space-x-2 text-sm mt-2">
                <Link href="/siadil" className="text-gray-600 hover:underline">Company Archive</Link>
                <span className="text-gray-400">/</span>
                <Link href="/siadil/tik" className="text-gray-600 hover:underline">Teknologi, Informasi & Komunikasi</Link>
                <span className="text-gray-400">/</span>
                <span className="text-gray-800">{title}</span>
              </nav>
            </div>
            <Link href="/siadil/tik" className="text-sm text-gray-600 hover:underline">Back</Link>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <DocumentTable title="Document" rows={sampleRows} />
      </div>
    </div>
  );
}
