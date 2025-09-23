'use client';

import { ReactNode, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import SiadilHeaderSimple from './SiadilHeaderSimple';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Listen to sidebar width changes
  useEffect(() => {
    const handleSidebarResize = (event: CustomEvent) => {
      setSidebarWidth(event.detail.width);
    };

    window.addEventListener('sidebarResize', handleSidebarResize as EventListener);
    
    return () => {
      window.removeEventListener('sidebarResize', handleSidebarResize as EventListener);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Fixed Sidebar - Hidden on mobile */}
      <div className={`fixed top-0 left-0 h-full z-30 ${isMobile ? 'hidden' : 'block'}`}>
        <Sidebar />
      </div>
      
      {/* Main Content Area with responsive margin */}
      <div 
        className="transition-all duration-300 ease-in-out" 
        style={{ marginLeft: isMobile ? '0px' : `${sidebarWidth}px` }}
      >
        {/* Fixed Header */}
        <div className="sticky top-0 z-20 bg-white dark:bg-gray-900 shadow-sm">
          <SiadilHeaderSimple />
        </div>
        
        {/* Scrollable Main Content */}
        <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
