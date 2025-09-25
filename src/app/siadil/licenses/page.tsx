"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import DocumentTable from '@/components/DocumentTable';
import { generateDocs } from '@/lib/documents';

export default function LicensesPage() {
  const router = useRouter();
  const rows = generateDocs(25, 'Licenses');
  return (
    <div className="min-h-screen bg-white dark:bg-white text-gray-900">
      <div className="bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Licenses</h1>
              <nav className="flex items-center space-x-2 text-sm mt-2">
                <Link href="/siadil" className="text-gray-600 hover:underline">Archive</Link>
                <span className="text-gray-400">/</span>
                <span className="text-gray-800">Licenses</span>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
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
        <DocumentTable title="Document" rows={rows} />
      </div>
    </div>
  );
}
