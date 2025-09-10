'use client';

import { useState, useEffect } from 'react';

const SiadilHeader = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Inisialisasi theme saat component mount
  useEffect(() => {
    setIsClient(true);
    
    // Cek localStorage atau system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Cek apakah HTML sudah memiliki class dark (dari script di head)
    const htmlHasDark = document.documentElement.classList.contains('dark');
    
    let shouldBeDark = false;
    
    if (savedTheme) {
      shouldBeDark = savedTheme === 'dark';
    } else if (htmlHasDark) {
      shouldBeDark = true;
    } else {
      shouldBeDark = prefersDark;
    }
    
    setIsDarkMode(shouldBeDark);
    
    // Sinkronisasi HTML class dengan state
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    console.log('Initial theme setup:', {
      savedTheme,
      prefersDark,
      htmlHasDark,
      shouldBeDark,
      finalHtmlClass: document.documentElement.className
    });
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    
    console.log('Toggle theme clicked:', {
      currentMode: isDarkMode ? 'dark' : 'light',
      newMode: newDarkMode ? 'dark' : 'light',
      htmlClassBefore: document.documentElement.className
    });
    
    // Update state
    setIsDarkMode(newDarkMode);
    
    // Force update HTML class
    document.documentElement.classList.remove('dark');
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
    
    // Verify the change
    const htmlClassAfter = document.documentElement.className;
    const darkClassPresent = document.documentElement.classList.contains('dark');
    
    console.log('Toggle theme result:', {
      newState: newDarkMode,
      htmlClassAfter,
      darkClassPresent,
      localStorage: localStorage.getItem('theme')
    });
  };

  // Render nothing until client-side to avoid hydration issues
  if (!isClient) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-3 transition-colors duration-200">
      {/* Layout utama diubah menjadi justify-end 
        karena sekarang hanya ada konten di sisi kanan.
      */}
      <div className="flex items-center justify-end">
        
        {/* === BAGIAN KANAN YANG BARU === */}
        <div className="flex items-center space-x-6">
          
          {/* Search Command Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search command..."
              className="pl-4 pr-12 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-64 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <kbd className="inline-flex items-center border border-gray-200 dark:border-gray-600 rounded px-2 text-sm font-sans font-medium text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-600">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Icon Actions */}
          <div className="flex items-center space-x-2">
            {/* Notification Bell Icon */}
            <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200">
              {/* Status dot */}
              <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-800"></span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            {/* Theme/Sparkle Icon */}
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L10 12l-2.293-2.293a1 1 0 010-1.414L12 4z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l2.293 2.293a1 1 0 010 1.414L10 20l-2.293-2.293a1 1 0 010-1.414L12 12z" />
              </svg>
            </button>
            
            {/* Light/Dark Mode Toggle (mengganti Settings Icon) */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
              aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
              title={`Current: ${isDarkMode ? 'Dark' : 'Light'} mode - Click to toggle`}
            >
              {isDarkMode ? (
                // Sun icon untuk switch ke light mode
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                // Moon icon untuk switch ke dark mode  
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SiadilHeader;