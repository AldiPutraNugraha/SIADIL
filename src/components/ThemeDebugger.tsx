'use client';

import { useEffect, useState } from 'react';

export default function ThemeDebugger() {
  const [htmlClass, setHtmlClass] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const updateHtmlClass = () => {
      const newClass = document.documentElement.className;
      setHtmlClass(newClass);
      console.log('Debug: HTML class updated to:', newClass);
    };

    updateHtmlClass();
    
    // Watch for changes dengan lebih frequent check
    const observer = new MutationObserver(updateHtmlClass);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });

    // Juga check setiap detik untuk memastikan sinkronisasi
    const interval = setInterval(updateHtmlClass, 1000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  if (!isClient) {
    return null;
  }

  const isDark = htmlClass.includes('dark');
  const currentTheme = isDark ? 'dark' : 'light';
  const localStorage = isClient ? window.localStorage.getItem('theme') : null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg text-xs font-mono z-50 max-w-xs">
      <div className="space-y-1">
        <div>Theme: <span className="text-yellow-300">{currentTheme}</span></div>
        <div>HTML class: <span className="text-blue-300">&ldquo;{htmlClass}&rdquo;</span></div>
        <div>Dark class: {isDark ? '✅ Present' : '❌ Missing'}</div>
        <div>localStorage: <span className="text-green-300">{localStorage || 'null'}</span></div>
        <div className="pt-2 border-t border-gray-600">
          <button 
            onClick={() => {
              console.log('Manual debug check:', {
                htmlClass: document.documentElement.className,
                localStorage: window.localStorage.getItem('theme'),
                classList: Array.from(document.documentElement.classList)
              });
            }}
            className="text-xs bg-blue-600 px-2 py-1 rounded hover:bg-blue-700"
          >
            Log Debug
          </button>
        </div>
      </div>
    </div>
  );
}
