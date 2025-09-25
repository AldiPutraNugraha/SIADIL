'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Reminders from '@/components/Reminders';
import { DocumentRow } from '@/components/DocumentTable';

export default function SiadilPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  type ArchiveItem = { title: string; count: number; href?: string };

  // Central archive data (16 total). First 8 are page 1, next 8 are page 2.
  const allArchives: ArchiveItem[] = [
    { title: 'Teknologi, Informasi & Komunikasi', count: 35, href: '/siadil/tik' },
    { title: 'Licenses', count: 25, href: '/siadil/licenses' },
    { title: 'Finance', count: 30, href: '/siadil/finance' },
    { title: 'Human Resources', count: 25, href: '/siadil/human-resources' },
    { title: 'Operations', count: 40, href: '/siadil/operations' },
    { title: 'Legal', count: 25, href: '/siadil/legal' },
    { title: 'Quality Assurance', count: 25, href: '/siadil/quality-assurance' },
    { title: 'Marketing & Communication', count: 30, href: '/siadil/marketing-communication' },
    // Page 2 (new archives)
    { title: 'Procurement', count: 25, href: '/siadil/procurement' },
    { title: 'Research & Development', count: 30, href: '/siadil/research-development' },
    { title: 'IT Security', count: 35, href: '/siadil/it-security' },
    { title: 'Facilities & Maintenance', count: 25, href: '/siadil/facilities-maintenance' },
    { title: 'Supply Chain', count: 25, href: '/siadil/supply-chain' },
    { title: 'Customer Service', count: 30, href: '/siadil/customer-service' },
    { title: 'Strategy & Planning', count: 25, href: '/siadil/strategy-planning' },
    { title: 'Health, Safety & Environment', count: 35, href: '/siadil/health-safety-environment' },
  ];

  const ITEMS_PER_PAGE = 8;

  // Filter by search (case-insensitive), then paginate
  const filtered = allArchives.filter(a =>
    a.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset to first page when search changes
  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  const ArchiveCard = ({ title, count, href }: { title: string; count: number; href?: string }) => {
    const content = (
      <div className="flex items-center space-x-4 w-full">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#01793b' }}>
            <Image
              src="/icon_folder.png"
              alt="Folder Icon"
              width={24}
              height={24}
              className="object-contain brightness-0 invert"
            />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-medium text-gray-900 leading-6">{title}</h3>
          <p className="text-sm text-gray-500 mt-1 leading-5">{count} items</p>
        </div>
      </div>
    );

    const cls = 'bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-200 md:col-span-1 min-h-[120px] flex items-center';
    return href ? (
      <Link href={href} className={cls}>
        {content}
      </Link>
    ) : (
      <div className={cls}>
        {content}
      </div>
    );
  };

  // Fixed 15 reminder rows (deterministic) agar jumlah Reminders selalu 15
  const reminderRows: DocumentRow[] = useMemo(() => {
    const today = new Date();
    const offsets = [-7, -3, 0, 2, 4, 6, 9, 12, 16, 20, 25, 30, 40, 50, 55]; // semua masuk red/yellow threshold
    return offsets.map((offset, idx) => {
      const expire = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset);
      const mm = String(expire.getMonth() + 1).padStart(2, '0');
      const dd = String(expire.getDate()).padStart(2, '0');
      const expireDate = `${expire.getFullYear()}-${mm}-${dd}`;
      return {
        id: idx + 1,
        numberTitle: `RM-${String(idx + 1).padStart(3, '0')} • REMINDER DOC ${idx + 1}`,
        description: 'Fixed reminder item',
        documentDate: `${today.getFullYear()}-01-01`,
        expireDate,
        contributors: ['System'],
        archive: 'Root',
        updatedCreatedBy: 'System / System',
      } as DocumentRow;
    });
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-white text-gray-900">
      {/* Header Section */}
      <div className="bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Left side - Title and Breadcrumb */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                SIADIL
              </h1>
              <p className="text-gray-600 mb-3">
                Sistem Arsip Digital
              </p>
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-sm">
                <Image 
                  src="/icon_folder.png" 
                  alt="Folder Icon" 
                  width={16}
                  height={16}
                  className="text-gray-500"
                />
                <span className="text-gray-700">Root</span>
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

      {/* Main Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        
  {/* My Archive and Reminders Section - Side by Side */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* My Archive Column */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              My Archive
            </h2>
            
            <div className="grid grid-cols-1 gap-6">
              {/* Personal Archive Card */}
              <Link href="/siadil/personal" 
                className="cursor-pointer transition-shadow duration-200 min-h-[120px] flex items-center hover:shadow-2xl rounded-lg border w-full max-w-xs p-4"
                style={{ 
                  background: '#01793b',
                  boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                  borderColor: '#16a34a',
                  padding: '1rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', width: '100%' }}>
                  <div style={{ flexShrink: 0 }}>
                    <div style={{
                      width: '3rem',
                      height: '3rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '1rem',
                      fontWeight: 'bold'
                    }}>
                      AP
                    </div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Image 
                        src="/lock.png" 
                        alt="Lock Icon" 
                        width={16}
                        height={16}
                        className="object-contain brightness-0 invert"
                      />
                      <h3 style={{
                        fontSize: '1rem',
                        fontWeight: '500',
                        color: 'white',
                        margin: 0,
                        padding: 0,
                        background: 'none',
                        lineHeight: '1.5'
                      }}>
                        Personal
                      </h3>
                    </div>
                    <p style={{
                      marginTop: '0.25rem',
                      fontSize: '0.875rem',
                      color: 'rgba(255, 255, 255, 0.8)',
                      margin: '0.25rem 0 0 0',
                      padding: 0,
                      background: 'none'
                    }}>
                      ID: 10122076
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Reminders Column (single card viewport + scroll + View All) */}
          <div className="flex flex-col items-start lg:pl-32 xl:pl-48">
            <Reminders title="Reminders" rows={reminderRows} singleCardViewport cardWidth={320} />
          </div>
          
        </div>

        {/* Corporate Archives Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Archive
          </h2>
          {/* Archives Grid - Card layout (paginated) */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
            {pageItems.map((a) => (
              <ArchiveCard key={a.title} title={a.title} count={a.count} href={a.href} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between sm:justify-start gap-4">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg border text-sm font-medium ${
                currentPage === 1
                  ? 'text-gray-400 border-gray-200 bg-white cursor-not-allowed'
                  : 'text-gray-700 border-gray-300 bg-white hover:bg-gray-50'
              }`}
              aria-label="Previous page"
            >
              Previous
            </button>

            <span className="text-sm text-gray-600">
              Page <span className="font-semibold">{currentPage}</span> of{' '}
              <span className="font-semibold">{totalPages}</span>
            </span>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg border text-sm font-medium ${
                currentPage === totalPages
                  ? 'text-gray-400 border-gray-200 bg-white cursor-not-allowed'
                  : 'text-white' 
              }`}
              style={currentPage === totalPages ? undefined : { backgroundColor: '#01793b' }}
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
