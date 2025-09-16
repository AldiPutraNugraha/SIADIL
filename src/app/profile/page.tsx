export default function ProfilePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Profile</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white text-xl font-semibold">
            AP
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Aldi Putra Nugraha</h2>
            <p className="text-gray-600">10122076</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <div className="bg-gray-50 p-3 rounded-md">Aldi Putra Nugraha</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">NIM</label>
            <div className="bg-gray-50 p-3 rounded-md">10122076</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="bg-gray-50 p-3 rounded-md">aldi.putra@example.com</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fakultas</label>
            <div className="bg-gray-50 p-3 rounded-md">Teknik Informatika</div>
          </div>
        </div>
      </div>
    </div>
  );
}