'use client';

import { useState } from 'react';

export default function SiadilPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-600 dark:bg-black text-gray-900 dark:text-gray-100">
      {/* Header Section */}
      <div className="bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Left side - Title and Breadcrumb */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                SIADIL
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Sistem Arsip Digital
              </p>
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-sm">
                <span className="text-gray-500 dark:text-gray-400">📁</span>
                <span className="text-gray-700 dark:text-gray-300">Root</span>
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
                  placeholder="Search Document"
                  className="block w-64 pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Add New Document Button */}
              <button className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New Document
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Archives Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
            Archives
          </h2>
          
          {/* Archives Grid - Horizontal layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            
            {/* Personal Archive */}
            <div className="flex items-center p-4 cursor-pointer">
              <div className="flex-shrink-0">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ backgroundColor: '#dc2626' }}
                >
                  AP
                </div>
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Personal</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">12231149</p>
              </div>
            </div>

            {/* TIK Archive */}
            <div className="flex items-center p-4 cursor-pointer">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Teknologi, Informasi & Komunikasi
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">TIK</p>
              </div>
            </div>

            {/* Create New Archive */}
            <div className="flex items-center justify-center p-4 border-2 border-dashed border-green-300 dark:border-green-700 rounded-lg text-green-600 dark:text-green-400 cursor-pointer">
              <svg className="h-6 w-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <div className="text-left">
                <div className="font-medium text-sm">Create new archive</div>
                <div className="text-xs opacity-75">Folder baru</div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Reminders Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
            Reminders
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* SSL Reminder */}
            <div className="rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                    <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-medium text-red-600 dark:text-red-400">
                    SSL01
                  </h3>
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                    SSL pupuk-kujang.co.id (Non GCP)
                  </p>
                  <p className="text-xs text-red-500 dark:text-red-500 mt-2">
                    This document is expired 2 months 30 days ago
                  </p>
                </div>
              </div>
            </div>

            {/* No other reminders */}
            <div className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-center">
              <div className="text-gray-500 dark:text-gray-400 text-sm">
                No other reminders
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
