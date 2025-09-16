export default function EmploymentPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Employment</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Informasi Kepegawaian</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status Kepegawaian</label>
              <div className="bg-gray-50 p-3 rounded-md">Mahasiswa Magang</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Divisi</label>
              <div className="bg-gray-50 p-3 rounded-md">IT Development</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Supervisor</label>
              <div className="bg-gray-50 p-3 rounded-md">John Doe</div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai</label>
              <div className="bg-gray-50 p-3 rounded-md">01 September 2025</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Berakhir</label>
              <div className="bg-gray-50 p-3 rounded-md">31 Desember 2025</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi Kerja</label>
              <div className="bg-gray-50 p-3 rounded-md">Jakarta</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}