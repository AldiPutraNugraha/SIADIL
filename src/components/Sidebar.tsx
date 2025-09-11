'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

// CSS Animation for blinking badges (same as header notification)
const blinkingBadgeStyles = `
  @keyframes blinkNotification {
    0%, 50% { 
      opacity: 1; 
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
    }
    25% { 
      transform: scale(1.2);
      box-shadow: 0 0 0 6px rgba(34, 197, 94, 0.3);
    }
    51%, 100% { 
      opacity: 0.6; 
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
    }
  }
  
  .notification-blink {
    animation: blinkNotification 2s ease-in-out infinite;
    background-color: #10b981 !important;
  }

  .sidebar-scrollable::-webkit-scrollbar {
    width: 8px;
  }
  
  .sidebar-scrollable::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .sidebar-scrollable::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }
  
  .sidebar-scrollable::-webkit-scrollbar-thumb:hover {
    background-color: rgba(156, 163, 175, 0.8);
  }
  
  .sidebar-scrollable {
    scrollbar-width: thin;
    scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
  }
`;

// Inject styles into document head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = blinkingBadgeStyles;
  if (!document.head.querySelector('style[data-sidebar-badges]')) {
    styleSheet.setAttribute('data-sidebar-badges', 'true');
    document.head.appendChild(styleSheet);
  }
}

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

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
        transition: 'all 0.3s ease',
        width: isCollapsed ? '80px' : '240px'
      }}
      className="h-screen shadow-sm border-r flex flex-col group relative"
    >
      {/* Collapse/Expand Button - Positioned on the border */}
      <div className="absolute top-4 -right-4 z-10 group-hover:block hidden">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{
            backgroundColor: isDarkMode ? '#ffffff' : '#ffffff',
            color: isDarkMode ? '#374151' : '#374151',
            border: '1px solid #e5e7eb'
          }}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-200 shadow-md"
        >
          <svg 
            className={`w-4 h-4 transform transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>

      {/* Header with Logo */}
      <div 
        style={{
          borderColor: isDarkMode ? '#334155' : '#e5e7eb'
        }}
        className="px-4 py-4 flex-shrink-0 relative"
      >
        <div className="flex flex-col space-y-2">
          {!isCollapsed && (
            <Image
              src="/logo-demplon.png"
              alt="Demplon Logo"
              width={150}
              height={150}
              className="rounded"
            />
          )}
          {isCollapsed && (
            <div className="w-16 h-16 mx-auto">
              <Image
                src="/logo-demplon.png"
                alt="Demplon Logo"
                width={64}
                height={64}
                className="rounded"
              />
            </div>
          )}
        </div>
      </div>

      {/* User Profile Section */}
      <div 
        style={{
          borderColor: isDarkMode ? '#334155' : '#e5e7eb'
        }}
        className="px-4 py-4 flex-shrink-0"
      >
        {!isCollapsed ? (
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
        ) : (
          <div className="flex justify-center">
            <div 
              style={{
                backgroundColor: isDarkMode ? '#7c2d12' : '#dc2626',
                color: '#ffffff'
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
            >
              <span className="font-semibold text-sm">DF</span>
            </div>
          </div>
        )}
      </div>

      {/* Scrollable Navigation Menu */}
      <div className="flex-1 overflow-y-auto sidebar-scrollable">
        <nav className={isCollapsed ? "px-2 py-4" : "px-4 py-4"}> 
        {/* GENERALS Section */}
        <div className="mb-6">
          {!isCollapsed && (
            <div 
              style={{
                color: isDarkMode ? '#94a3b8' : '#6b7280'
              }}
              className="text-xs font-semibold uppercase tracking-wider mb-3 px-2"
            >
              GENERALS
            </div>
          )}
          
          <ul className="space-y-1">
            {/* Home */}
            <li>
              <button
                onClick={() => setActiveMenu('Home')}
                style={{
                  backgroundColor: activeMenu === 'Home' ? '#01793b' : 'transparent',
                  color: activeMenu === 'Home' ? '#ffffff' : (isDarkMode ? '#cbd5e1' : '#111827')
                }}
                className={`w-full flex items-center transition-colors text-sm rounded-md ${
                  isCollapsed ? 'justify-center px-2 py-2' : 'space-x-3 px-3 py-2'
                }`}
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
                title={isCollapsed ? 'Home' : ''}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                {!isCollapsed && <span>Home</span>}
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
                className={`w-full flex items-center transition-colors text-sm rounded-md ${
                  isCollapsed ? 'justify-center px-2 py-2' : 'space-x-3 px-3 py-2'
                }`}
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
                title={isCollapsed ? 'Profile' : ''}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                {!isCollapsed && <span>Profile</span>}
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
                className={`w-full flex items-center transition-colors text-sm rounded-md ${
                  isCollapsed ? 'justify-center px-2 py-2' : 'space-x-3 px-3 py-2'
                }`}
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
                title={isCollapsed ? 'Employment' : ''}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {!isCollapsed && <span>Employment</span>}
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
                className={`w-full flex items-center transition-colors text-sm rounded-md ${
                  isCollapsed ? 'justify-center px-2 py-2' : 'space-x-3 px-3 py-2'
                }`}
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
                title={isCollapsed ? 'Kehadiran, Koreksi, Cuti, dan Dinas' : ''}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {!isCollapsed && <span className="text-left">Kehadiran, Koreksi, Cuti, dan Dinas</span>}
              </button>
            </li>
          </ul> 
        </div>

        {/* MAIN MENU Section */}
        <div className="mb-6">
          {!isCollapsed && (
            <div 
              style={{
                color: isDarkMode ? '#94a3b8' : '#6b7280'
              }}
              className="text-xs font-semibold uppercase tracking-wider mb-3 px-2"
            >
              MAIN MENU
            </div>
          )}
          
          <ul className="space-y-1">
            {/* Portal Aplikasi */}
            <li>
              <button
                onClick={() => setActiveMenu('Portal Aplikasi')}
                style={{
                  backgroundColor: activeMenu === 'Portal Aplikasi' ? '#01793b' : 'transparent',
                  color: activeMenu === 'Portal Aplikasi' ? '#ffffff' : (isDarkMode ? '#cbd5e1' : '#111827')
                }}
                className={`w-full flex items-center transition-colors text-sm rounded-md ${
                  isCollapsed ? 'justify-center px-2 py-2 relative' : 'justify-between px-3 py-2'
                }`}
                onMouseEnter={(e) => {
                  if (activeMenu !== 'Portal Aplikasi') {
                    e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(243, 244, 246, 1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeMenu !== 'Portal Aplikasi') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
                title={isCollapsed ? 'Portal Aplikasi' : ''}
              >
                {isCollapsed ? (
                  <>
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <div 
                      className="w-2 h-2 rounded-full notification-blink absolute top-1 right-1"
                      style={{ backgroundColor: '#10b981' }}
                    ></div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <span>Portal Aplikasi</span>
                    </div>
                    <div 
                      className="w-2 h-2 rounded-full notification-blink"
                      style={{ backgroundColor: '#10b981' }}
                    ></div>
                  </>
                )}
              </button>
            </li>

            {/* Kujang AI */}
            <li>
              <button
                onClick={() => setActiveMenu('Kujang AI')}
                style={{
                  backgroundColor: activeMenu === 'Kujang AI' ? '#01793b' : 'transparent',
                  color: activeMenu === 'Kujang AI' ? '#ffffff' : (isDarkMode ? '#cbd5e1' : '#111827')
                }}
                className={`w-full flex items-center transition-colors text-sm rounded-md ${
                  isCollapsed ? 'justify-center px-2 py-2' : 'space-x-3 px-3 py-2'
                }`}
                onMouseEnter={(e) => {
                  if (activeMenu !== 'Kujang AI') {
                    e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(243, 244, 246, 1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeMenu !== 'Kujang AI') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
                title={isCollapsed ? 'Kujang AI' : ''}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                {!isCollapsed && <span>Kujang AI</span>}
              </button>
            </li>

            {/* Library */}
            <li>
              <button
                onClick={() => setActiveMenu('Library')}
                style={{
                  backgroundColor: activeMenu === 'Library' ? '#01793b' : 'transparent',
                  color: activeMenu === 'Library' ? '#ffffff' : (isDarkMode ? '#cbd5e1' : '#111827')
                }}
                className={`w-full flex items-center transition-colors text-sm rounded-md ${
                  isCollapsed ? 'justify-center px-2 py-2' : 'space-x-3 px-3 py-2'
                }`}
                onMouseEnter={(e) => {
                  if (activeMenu !== 'Library') {
                    e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(243, 244, 246, 1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeMenu !== 'Library') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
                title={isCollapsed ? 'Library' : ''}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                {!isCollapsed && <span>Library</span>}
              </button>
            </li>

            {/* Shortlink */}
            <li>
              <button
                onClick={() => setActiveMenu('Shortlink')}
                style={{
                  backgroundColor: activeMenu === 'Shortlink' ? '#01793b' : 'transparent',
                  color: activeMenu === 'Shortlink' ? '#ffffff' : (isDarkMode ? '#cbd5e1' : '#111827')
                }}
                className={`w-full flex items-center transition-colors text-sm rounded-md ${
                  isCollapsed ? 'justify-center px-2 py-2 relative' : 'justify-between px-3 py-2'
                }`}
                onMouseEnter={(e) => {
                  if (activeMenu !== 'Shortlink') {
                    e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(243, 244, 246, 1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeMenu !== 'Shortlink') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
                title={isCollapsed ? 'Shortlink' : ''}
              >
                {isCollapsed ? (
                  <>
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <div 
                      className="w-2 h-2 rounded-full notification-blink absolute top-1 right-1"
                      style={{ backgroundColor: '#10b981' }}
                    ></div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      <span>Shortlink</span>
                    </div>
                    <div 
                      className="w-2 h-2 rounded-full notification-blink"
                      style={{ backgroundColor: '#10b981' }}
                    ></div>
                  </>
                )}
              </button>
            </li>
          </ul>
        </div>

        <div className="mb-6">
          {!isCollapsed && (
            <div 
              style={{
                color: isDarkMode ? '#94a3b8' : '#6b7280'
              }}
              className="text-xs font-semibold uppercase tracking-wider mb-3 px-2"
            >
              APPS & FEATURE
            </div>
          )}
          
          <ul className="space-y-1">
            {/* E-Prosedur */}
            <li>
              <button
                onClick={() => setActiveMenu('E-Prosedur')}
                style={{
                  backgroundColor: activeMenu === 'E-Prosedur' ? '#01793b' : 'transparent',
                  color: activeMenu === 'E-Prosedur' ? '#ffffff' : (isDarkMode ? '#cbd5e1' : '#111827')
                }}
                className={`w-full flex items-center transition-colors text-sm rounded-md ${
                  isCollapsed ? 'justify-center px-2 py-2' : 'space-x-3 px-3 py-2'
                }`}
                onMouseEnter={(e) => {
                  if (activeMenu !== 'E-Prosedur') {
                    e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(243, 244, 246, 1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeMenu !== 'E-Prosedur') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
                title={isCollapsed ? 'E-Prosedur' : ''}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                {!isCollapsed && <span className="text-left">E-Prosedur</span>}
              </button>
            </li>

            {/* Employee Directory */}
            <li>
              <button
                onClick={() => setActiveMenu('Employee Directory')}
                style={{
                  backgroundColor: activeMenu === 'Employee Directory' ? '#01793b' : 'transparent',
                  color: activeMenu === 'Employee Directory' ? '#ffffff' : (isDarkMode ? '#cbd5e1' : '#111827')
                }}
                className={`w-full flex items-center transition-colors text-sm rounded-md ${
                  isCollapsed ? 'justify-center px-2 py-2' : 'space-x-3 px-3 py-2'
                }`}
                onMouseEnter={(e) => {
                  if (activeMenu !== 'Employee Directory') {
                    e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(243, 244, 246, 1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeMenu !== 'Employee Directory') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
                title={isCollapsed ? 'Employee Directory' : ''}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {!isCollapsed && <span className="text-left">Employee Directory</span>}
              </button>
            </li>

            {/* SIADIL */}
            <li>
              <button
                onClick={() => setActiveMenu('SIADIL')}
                style={{
                  backgroundColor: activeMenu === 'SIADIL' ? '#01793b' : 'transparent',
                  color: activeMenu === 'SIADIL' ? '#ffffff' : (isDarkMode ? '#cbd5e1' : '#111827')
                }}
                className={`w-full flex items-center transition-colors text-sm rounded-md ${
                  isCollapsed ? 'justify-center px-2 py-2' : 'space-x-3 px-3 py-2'
                }`}
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
                title={isCollapsed ? 'SIADIL' : ''}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {!isCollapsed && <span>SIADIL</span>}
              </button>
            </li>

            {/* SYSTIK */}
            <li>
              <button
                onClick={() => setActiveMenu('SYSTIK')}
                style={{
                  backgroundColor: activeMenu === 'SYSTIK' ? '#01793b' : 'transparent',
                  color: activeMenu === 'SYSTIK' ? '#ffffff' : (isDarkMode ? '#cbd5e1' : '#111827')
                }}
                className={`w-full flex items-center transition-colors text-sm rounded-md ${
                  isCollapsed ? 'justify-center px-2 py-2' : 'space-x-3 px-3 py-2'
                }`}
                onMouseEnter={(e) => {
                  if (activeMenu !== 'SYSTIK') {
                    e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(243, 244, 246, 1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeMenu !== 'SYSTIK') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
                title={isCollapsed ? 'SYSTIK' : ''}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                {!isCollapsed && <span>SYSTIK</span>}
              </button>
            </li>

            {/* Konsumsi */}
            <li>
              <button
                onClick={() => setActiveMenu('Konsumsi')}
                style={{
                  backgroundColor: activeMenu === 'Konsumsi' ? '#01793b' : 'transparent',
                  color: activeMenu === 'Konsumsi' ? '#ffffff' : (isDarkMode ? '#cbd5e1' : '#111827')
                }}
                className={`w-full flex items-center transition-colors text-sm rounded-md ${
                  isCollapsed ? 'justify-center px-2 py-2' : 'space-x-3 px-3 py-2'
                }`}
                onMouseEnter={(e) => {
                  if (activeMenu !== 'Konsumsi') {
                    e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(243, 244, 246, 1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeMenu !== 'Konsumsi') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
                title={isCollapsed ? 'Konsumsi' : ''}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                {!isCollapsed && <span>Konsumsi</span>}
              </button>
            </li>

            {/* Dokumenku */}
            <li>
              <button
                onClick={() => setActiveMenu('Dokumenku')}
                style={{
                  backgroundColor: activeMenu === 'Dokumenku' ? '#01793b' : 'transparent',
                  color: activeMenu === 'Dokumenku' ? '#ffffff' : (isDarkMode ? '#cbd5e1' : '#111827')
                }}
                className={`w-full flex items-center transition-colors text-sm rounded-md ${
                  isCollapsed ? 'justify-center px-2 py-2' : 'space-x-3 px-3 py-2'
                }`}
                onMouseEnter={(e) => {
                  if (activeMenu !== 'Dokumenku') {
                    e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(243, 244, 246, 1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeMenu !== 'Dokumenku') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
                title={isCollapsed ? 'Dokumenku' : ''}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {!isCollapsed && <span>Dokumenku</span>}
              </button>
            </li>

            {/* MyStatement */}
            <li>
              <button
                onClick={() => setActiveMenu('MyStatement')}
                style={{
                  backgroundColor: activeMenu === 'MyStatement' ? '#01793b' : 'transparent',
                  color: activeMenu === 'MyStatement' ? '#ffffff' : (isDarkMode ? '#cbd5e1' : '#111827')
                }}
                className={`w-full flex items-center transition-colors text-sm rounded-md ${
                  isCollapsed ? 'justify-center px-2 py-2' : 'space-x-3 px-3 py-2'
                }`}
                onMouseEnter={(e) => {
                  if (activeMenu !== 'MyStatement') {
                    e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(243, 244, 246, 1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeMenu !== 'MyStatement') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
                title={isCollapsed ? 'MyStatement' : ''}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {!isCollapsed && <span>MyStatement</span>}
              </button>
            </li>

            {/* Work Area */}
            <li>
              <button
                onClick={() => setActiveMenu('Work Area')}
                style={{
                  backgroundColor: activeMenu === 'Work Area' ? '#01793b' : 'transparent',
                  color: activeMenu === 'Work Area' ? '#ffffff' : (isDarkMode ? '#cbd5e1' : '#111827')
                }}
                className={`w-full flex items-center transition-colors text-sm rounded-md ${
                  isCollapsed ? 'justify-center px-2 py-2' : 'space-x-3 px-3 py-2'
                }`}
                onMouseEnter={(e) => {
                  if (activeMenu !== 'Work Area') {
                    e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(243, 244, 246, 1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeMenu !== 'Work Area') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
                title={isCollapsed ? 'Work Area' : ''}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {!isCollapsed && <span className="text-left">Work Area</span>}
              </button>
            </li>

            {/* Peraturan Perundangan */}
            <li>
              <button
                onClick={() => setActiveMenu('Peraturan Perundangan')}
                style={{
                  backgroundColor: activeMenu === 'Peraturan Perundangan' ? '#01793b' : 'transparent',
                  color: activeMenu === 'Peraturan Perundangan' ? '#ffffff' : (isDarkMode ? '#cbd5e1' : '#111827')
                }}
                className={`w-full flex items-center transition-colors text-sm rounded-md ${
                  isCollapsed ? 'justify-center px-2 py-2' : 'space-x-3 px-3 py-2'
                }`}
                onMouseEnter={(e) => {
                  if (activeMenu !== 'Peraturan Perundangan') {
                    e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(71, 85, 105, 0.3)' : 'rgba(243, 244, 246, 1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeMenu !== 'Peraturan Perundangan') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
                title={isCollapsed ? 'Peraturan Perundangan' : ''}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                {!isCollapsed && <span className="text-left">Peraturan Perundangan</span>}
              </button>
            </li>
          </ul>
        </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
