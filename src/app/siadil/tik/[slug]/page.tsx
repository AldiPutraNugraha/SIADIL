import Link from 'next/link';
import DocumentTable, { DocumentRow } from '@/components/DocumentTable';

export default async function TikSubFolderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // useRouter is only available in client components; emulate back button via Link for consistency with others using button.
  const titleMap: Record<string, string> = {
    'licenses-renewals': 'Licenses & Renewals',
    'DOKUMENTASIAPLIKASI': 'Dokumentasi Aplikasi',
  };

  const title = titleMap[slug] || slug;

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
  const rows = sampleRows.filter(r => r.archive === title);

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
            <Link
              href="/siadil/tik"
              aria-label="Back"
              className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-gray-600 text-gray-600 hover:bg-gray-300 transition-all active:scale-95 active:bg-gray-100 hover:shadow-lg hover:-translate-y-0.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
  <DocumentTable title="Document" rows={rows} />
      </div>
    </div>
  );
}
