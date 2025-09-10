'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for theme changes
    const checkTheme = () => {
      const htmlClass = document.documentElement.classList;
      setIsDarkMode(htmlClass.contains('dark'));
    };

    // Initial check
    checkTheme();

    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      style={{
        backgroundColor: isDarkMode ? '#0c0a09' : '#ffffff',
        borderColor: isDarkMode ? '#334155' : '#e5e7eb',
        transition: 'all 0.3s ease'
      }}
      className="w-60 min-h-screen shadow-sm border-r"
    >
      {/* Header with Logo */}
      <div 
        style={{
          borderColor: isDarkMode ? '#334155' : '#e5e7eb'
        }}
        className="px-4 py-4"
      >
        <div className="flex flex-col space-y-2">
          <Image
            src="/logo-demplon.png"
            alt="Demplon Logo"
            width={150}
            height={150}
            className="rounded"
          />
        </div>
      </div>

      {/* User Profile Section */}
      <div 
        style={{
          borderColor: isDarkMode ? '#334155' : '#e5e7eb'
        }}
        className="px-4 py-4"
      >
        <div className="flex items-center space-x-3">
          <div 
            style={{
              backgroundColor: isDarkMode ? '#7c2d12' : '#dc2626',
              color: '#ffffff'
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
          >
            <span className="font-semibold text-sm">DF</span>
          </div>
          <div>
            <div 
              style={{
                color: isDarkMode ? '#f1f5f9' : '#111827'
              }}
              className="font-medium text-sm"
            >
              Difa Nugraha
            </div>
            <div 
              style={{
                color: isDarkMode ? '#94a3b8' : '#6b7280'
              }}
              className="text-xs"
            >
              10122059
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="px-4 py-4"> 
        {/* GENERALS Section */}
        <div className="mb-6">
          <div 
            style={{
              color: isDarkMode ? '#94a3b8' : '#6b7280'
            }}
            className="text-xs font-semibold uppercase tracking-wider mb-3 px-2"
          >
            GENERALS
          </div>
          
          <ul className="space-y-1">
            {/* Home */}
            <li>
              <button
                onClick={() => setActiveMenu('Home')}
                style={{
                  backgroundColor: activeMenu === 'Home' ? '#01793b' : 'transparent',
                  color: activeMenu === 'Home' ? '#ffffff' : (isDarkMode ? '#cbd5e1' : '#111827')
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 transition-colors text-sm rounded-md"
                onMouseEnter={(e) => {
                  if (activeMenu !== 'Home') {
                    e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(243, 244, 246, 1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeMenu !== 'Home') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Home</span>
              </button>
            </li>

            {/* Profile */}
            <li>
              <button
                onClick={() => setActiveMenu('Profile')}
                style={{
                  backgroundColor: activeMenu === 'Profile' ? '#01793b' : 'transparent',
                  color: activeMenu === 'Profile' ? '#ffffff' : (isDarkMode ? '#cbd5e1' : '#111827')
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 transition-colors text-sm rounded-md"
                onMouseEnter={(e) => {
                  if (activeMenu !== 'Profile') {
                    e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(243, 244, 246, 1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeMenu !== 'Profile') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                <span>Profile</span>
              </button>
            </li>

            {/* Employment */}
            <li>
              <button
                onClick={() => setActiveMenu('Employment')}
                style={{
                  backgroundColor: activeMenu === 'Employment' ? '#01793b' : 'transparent',
                  color: activeMenu === 'Employment' ? '#ffffff' : (isDarkMode ? '#cbd5e1' : '#111827')
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 transition-colors text-sm rounded-md"
                onMouseEnter={(e) => {
                  if (activeMenu !== 'Employment') {
                    e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(243, 244, 246, 1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeMenu !== 'Employment') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Employment</span>
              </button>
            </li>

            {/* Kehadiran, Koreksi, Cuti, dan Dinas */}
            <li>
              <button
                onClick={() => setActiveMenu('Kehadiran')}
                style={{
                  backgroundColor: activeMenu === 'Kehadiran' ? '#01793b' : 'transparent',
                  color: activeMenu === 'Kehadiran' ? '#ffffff' : (isDarkMode ? '#cbd5e1' : '#111827')
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 transition-colors text-sm rounded-md"
                onMouseEnter={(e) => {
                  if (activeMenu !== 'Kehadiran') {
                    e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(243, 244, 246, 1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeMenu !== 'Kehadiran') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-left">Kehadiran, Koreksi, Cuti, dan Dinas</span>
              </button>
            </li>
          </ul> 
        </div>
        <div className="mb-6">
          <div 
            style={{
              color: isDarkMode ? '#94a3b8' : '#6b7280'
            }}
            className="text-xs font-semibold uppercase tracking-wider mb-3 px-2"
          >
            APPS & FEATURE
          </div>
          
          <ul className="space-y-1">
            {/* SIADIL */}
            <li>
              <button
                onClick={() => setActiveMenu('SIADIL')}
                style={{
                  backgroundColor: activeMenu === 'SIADIL' ? '#01793b' : 'transparent',
                  color: activeMenu === 'SIADIL' ? '#ffffff' : (isDarkMode ? '#cbd5e1' : '#111827')
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 transition-colors text-sm rounded-md"
                onMouseEnter={(e) => {
                  if (activeMenu !== 'SIADIL') {
                    e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(243, 244, 246, 1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeMenu !== 'SIADIL') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>SIADIL</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
