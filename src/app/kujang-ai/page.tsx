export default function KujangAIPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Kujang AI</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Asisten AI Kujang</h2>
          <p className="text-gray-600">Tanyakan apa saja kepada asisten AI untuk membantu pekerjaan Anda</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6 min-h-[300px]">
          <div className="text-center text-gray-500 mt-20">
            Mulai percakapan dengan mengetik pesan di bawah...
          </div>
        </div>

        <div className="flex space-x-2">
          <input 
            type="text" 
            placeholder="Ketik pesan Anda di sini..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Kirim
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm transition-colors">
            Bantuan dengan Excel
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm transition-colors">
            Tulis email formal
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm transition-colors">
            Analisis data
          </button>
        </div>
      </div>
    </div>
  );
}