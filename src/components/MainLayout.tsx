'use client';

import { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Sidebar />
      <main className="flex-1 bg-white dark:bg-gray-900">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
