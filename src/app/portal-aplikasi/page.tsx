export default function PortalAplikasiPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Portal Aplikasi</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Aplikasi Umum */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Aplikasi Umum</h2>
          <div className="space-y-3">
            <a href="#" className="block bg-gray-50 hover:bg-gray-100 p-3 rounded-md transition-colors">
              Email Corporate
            </a>
            <a href="#" className="block bg-gray-50 hover:bg-gray-100 p-3 rounded-md transition-colors">
              File Manager
            </a>
            <a href="#" className="block bg-gray-50 hover:bg-gray-100 p-3 rounded-md transition-colors">
              Calendar
            </a>
          </div>
        </div>

        {/* Aplikasi HR */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Aplikasi HR</h2>
          <div className="space-y-3">
            <a href="#" className="block bg-gray-50 hover:bg-gray-100 p-3 rounded-md transition-colors">
              HRIS
            </a>
            <a href="#" className="block bg-gray-50 hover:bg-gray-100 p-3 rounded-md transition-colors">
              Payroll
            </a>
            <a href="#" className="block bg-gray-50 hover:bg-gray-100 p-3 rounded-md transition-colors">
              Performance
            </a>
          </div>
        </div>

        {/* Aplikasi Keuangan */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Aplikasi Keuangan</h2>
          <div className="space-y-3">
            <a href="#" className="block bg-gray-50 hover:bg-gray-100 p-3 rounded-md transition-colors">
              Budget Planning
            </a>
            <a href="#" className="block bg-gray-50 hover:bg-gray-100 p-3 rounded-md transition-colors">
              Expense Report
            </a>
            <a href="#" className="block bg-gray-50 hover:bg-gray-100 p-3 rounded-md transition-colors">
              Invoice
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}