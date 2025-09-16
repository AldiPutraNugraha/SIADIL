export default function KehadiranPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Kehadiran, Koreksi, Cuti, dan Dinas</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Kehadiran Hari Ini */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Kehadiran Hari Ini</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Jam Masuk</span>
              <span className="text-green-600 font-medium">08:00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Jam Keluar</span>
              <span className="text-red-600 font-medium">-</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Status</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Hadir</span>
            </div>
          </div>
        </div>

        {/* Rekap Bulanan */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Rekap Bulan Ini</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Hari Kerja</span>
              <span className="font-medium">22</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Hadir</span>
              <span className="text-green-600 font-medium">20</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Tidak Hadir</span>
              <span className="text-red-600 font-medium">2</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Cuti</span>
              <span className="text-blue-600 font-medium">0</span>
            </div>
          </div>
        </div>

        {/* Pengajuan Cuti/Izin */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Pengajuan Cuti/Izin</h2>
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
            Ajukan Cuti/Izin
          </button>
        </div>

        {/* Koreksi Kehadiran */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Koreksi Kehadiran</h2>
          <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors">
            Ajukan Koreksi
          </button>
        </div>
      </div>
    </div>
  );
}