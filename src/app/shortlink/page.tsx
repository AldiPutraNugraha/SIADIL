export default function ShortlinkPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Shortlink</h1>
      
      {/* Create Shortlink */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Buat Link Pendek</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL Asli</label>
            <input 
              type="url" 
              placeholder="https://example.com/very-long-url"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Custom Alias (Opsional)</label>
            <input 
              type="text" 
              placeholder="my-link"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Buat Shortlink
          </button>
        </div>
      </div>

      {/* My Links */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Link Saya</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Short URL</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Original URL</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Clicks</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Created</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-2">
                  <a href="#" className="text-blue-600 hover:underline">short.ly/abc123</a>
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 max-w-xs truncate">
                  https://example.com/very-long-url-example
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">142</td>
                <td className="px-4 py-2 text-sm text-gray-600">15 Sep 2025</td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:underline text-sm">Copy</button>
                    <button className="text-red-600 hover:underline text-sm">Delete</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <a href="#" className="text-blue-600 hover:underline">short.ly/def456</a>
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 max-w-xs truncate">
                  https://another-example.com/another-long-url
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">87</td>
                <td className="px-4 py-2 text-sm text-gray-600">14 Sep 2025</td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:underline text-sm">Copy</button>
                    <button className="text-red-600 hover:underline text-sm">Delete</button>
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