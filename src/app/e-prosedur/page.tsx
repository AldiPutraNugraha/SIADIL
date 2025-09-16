export default function EProsedurPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">E-Prosedur</h1>
      <p className="text-gray-600 mb-6">Sistem manajemen prosedur dan standar operasional digital</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Prosedur Tersedia</h2>
          <div className="space-y-2">
            <div className="p-3 bg-gray-50 rounded-md">Prosedur Pengajuan Cuti</div>
            <div className="p-3 bg-gray-50 rounded-md">Prosedur Reimbursement</div>
            <div className="p-3 bg-gray-50 rounded-md">Prosedur IT Support</div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Status Pengajuan</h2>
          <div className="text-center text-gray-500">Tidak ada pengajuan aktif</div>
        </div>
      </div>
    </div>
  );
}