export default function DokumenkuPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Dokumenku</h1>
      <p className="text-gray-600 mb-6">Kelola semua dokumen pribadi dan pekerjaan Anda</p>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Dokumen Saya</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Upload Dokumen
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Nama File</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Ukuran</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Tanggal Upload</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-2">CV_AldiPutra.pdf</td>
                <td className="px-4 py-2 text-sm text-gray-600">245 KB</td>
                <td className="px-4 py-2 text-sm text-gray-600">15 Sep 2025</td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:underline text-sm">Download</button>
                    <button className="text-red-600 hover:underline text-sm">Hapus</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}