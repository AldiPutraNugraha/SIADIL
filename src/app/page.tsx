import MainLayout from '@/components/MainLayout';
import SiadilHeaderSimple from '@/components/SiadilHeaderSimple';

export default function Home() {
  return (
    <MainLayout>
      <div className="min-h-screen">
        <SiadilHeaderSimple />
        <div className="p-8">
          {/* Content area - ready for your application */}
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Dashboard
            </h1>
            {/* Your app content goes here */}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
