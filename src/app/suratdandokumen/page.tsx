"use client";

import { useState } from "react";
import { 
  FiPrinter, 
  FiChevronLeft, 
  FiUser,
  FiCalendar,
  FiClock,
  FiAlertCircle,
  FiMapPin,
  FiFileText,
  FiInfo
} from "react-icons/fi";

export default function SuratRujukan() {
  const [activeTab, setActiveTab] = useState("Surat Rujukan");
  const [namaPasien, setNamaPasien] = useState("");
  const [noBPJS, setNoBPJS] = useState("");
  const [jenisRujukan, setJenisRujukan] = useState("");
  const [tingkatUrgensi, setTingkatUrgensi] = useState("");
  const [fasilitasTujuan, setFasilitasTujuan] = useState("");
  const [alasanRujukan, setAlasanRujukan] = useState("");
  const [catatan, setCatatan] = useState("");

  const tabs = ["Surat Rujukan", "Surat Sakit", "Surat Kontrol"];

  const jenisRujukanOptions = ["Rujukan Balik", "Rujukan Lanjutan", "Rujukan Spesialis"];
  const tingkatUrgensiOptions = ["Biasa", "Segera", "Gawat Darurat"];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* MAIN CONTENT */}
      <main className="w-full">
        {/* Header dengan judul dan tanggal */}
        <div className="bg-white border-b border-gray-200 px-8 py-5">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <FiChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h2 className="text-xl font-bold text-gray-800">Administrasi & Dokumen Pasien</h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FiCalendar className="w-4 h-4" />
                  <span>Senin, 26 Mei 2025</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FiClock className="w-4 h-4" />
                  <span>Sesi Pagi</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8">
          <div className="max-w-5xl mx-auto">
            {/* Tabs */}
            <div className="flex gap-1 mb-6 border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-medium transition-all border-b-2 ${
                    activeTab === tab
                      ? "border-emerald-500 text-emerald-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Card Utama */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              
              {/* Form Section */}
              <div className="p-8 space-y-8">
                
                {/* Data Pasien Section */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Data pasien</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-gray-600">Nama pasien</label>
                      <div className="relative">
                        <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input 
                          type="text" 
                          value={namaPasien}
                          onChange={(e) => setNamaPasien(e.target.value)}
                          placeholder="Masukkan nama pasien"
                          className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-gray-600">No. BPJS (opsional)</label>
                      <input 
                        type="text" 
                        value={noBPJS}
                        onChange={(e) => setNoBPJS(e.target.value)}
                        placeholder="000012345678"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Informasi Rujukan Section */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Informasi rujukan</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-gray-600">Jenis rujukan</label>
                      <select 
                        value={jenisRujukan}
                        onChange={(e) => setJenisRujukan(e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                      >
                        <option value="">Pilih jenis rujukan</option>
                        {jenisRujukanOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-gray-600">Tingkat urgensi</label>
                      <select 
                        value={tingkatUrgensi}
                        onChange={(e) => setTingkatUrgensi(e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                      >
                        <option value="">Pilih tingkat urgensi</option>
                        {tingkatUrgensiOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Fasilitas/Poli tujuan Section */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Fasilitas/Poli tujuan</h3>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-gray-600">Fasilitas / Poli tujuan</label>
                    <div className="relative">
                      <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input 
                        type="text" 
                        value={fasilitasTujuan}
                        onChange={(e) => setFasilitasTujuan(e.target.value)}
                        placeholder="Contoh: RSUD Kota / Poli Bedah"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Diagnosis Section */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Diagnosis (dari dokter)</h3>
                  <div className="space-y-1.5">
                    <div className="relative">
                      <FiFileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input 
                        type="text" 
                        disabled
                        placeholder="Akan terisi otomatis setelah dokter input diagnosis"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 text-sm cursor-not-allowed placeholder:text-gray-400 italic"
                      />
                    </div>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                      <FiInfo className="w-3 h-3" />
                      Diagnosis akan terisi otomatis dari rekam medis terakhir
                    </p>
                  </div>
                </div>

                {/* Alasan Rujukan Section */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Alasan rujukan</h3>
                  <div className="space-y-1.5">
                    <textarea 
                      rows={4}
                      value={alasanRujukan}
                      onChange={(e) => setAlasanRujukan(e.target.value)}
                      placeholder="Alasan merujuk pasien..."
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Catatan Section */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Catatan</h3>
                  <div className="space-y-1.5">
                    <textarea 
                      rows={3}
                      value={catatan}
                      onChange={(e) => setCatatan(e.target.value)}
                      placeholder="Catatan tambahan untuk rujukan..."
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Informasi BPJS Note */}
                <div className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
                  <div className="flex items-start gap-3">
                    <FiAlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-800">
                      <span className="font-semibold">Informasi:</span> Untuk rujukan BPJS, pastikan data juga diinput ke aplikasi P-Care setelah cetak.
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-4 border-t border-gray-200 flex justify-end">
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors shadow-sm">
                    <FiPrinter className="w-4 h-4" />
                    Cetak Surat Rujukan
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}