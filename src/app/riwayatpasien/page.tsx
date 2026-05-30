"use client";

import { useState } from "react";
import { 
  FiPrinter, 
  FiFileText, 
  FiChevronLeft, 
  FiActivity,
  FiHeart,
  FiThermometer,
  FiUser,
  FiCalendar,
  FiClock
} from "react-icons/fi";

export default function RiwayatPasien() {
  const [activeTab, setActiveTab] = useState("Riwayat Pasien");

  const tabs = ["Riwayat Pasien", "Surat & Dokumen"];

  // Data pasien
  const pasien = {
    nama: "Dewi Lestari",
    noRM: "RM-20312",
    poli: "Poli Umum",
    jenisPembayaran: "BPJS",
    status: "Selesai",
  };

  const vitalSign = {
    tekananDarah: "120/80 mmHg",
    nadi: "78 bpm",
    suhuTubuh: "36.5 °C",
    beratBadan: "55 kg",
  };

  const rekamMedis = {
    keluhanUtama: "Demam dan batuk sejak 2 hari",
    pemeriksaanFisik: "Tenggorokan kemerahan, tidak ada tanda infeksi berat",
    diagnosis: "ISPA (Infeksi Saluran Pernapasan Akut)",
    kodeDiagnosis: "J06.9",
    tatalaksana: "Paracetamol 500mg 3×1, Ambroxol 30mg 3×1",
  };

  const dokumenDiperlukan = ["Surat Kontrol Ulang", "Surat Keterangan Sakit"];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* MAIN CONTENT */}
      <main className="w-full">
        {/* Header dengan judul dan tanggal */}
        <div className="bg-white border-b border-gray-200 px-8 py-5">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <FiChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h2 className="text-xl font-bold text-gray-800">Riwayat Pasien</h2>
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
          <div className="max-w-6xl mx-auto">
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
              
              {/* Header Pasien */}
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-white">
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                      <FiUser className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{pasien.nama}</h3>
                      <p className="text-sm text-gray-500 mt-1">No. RM: {pasien.noRM}</p>
                    </div>
                  </div>
                  <div className="flex gap-6 text-sm">
                    <div>
                      <p className="text-gray-500">Poliklinik</p>
                      <p className="font-semibold text-gray-800">{pasien.poli}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Jenis Pembayaran</p>
                      <p className="font-semibold text-gray-800">{pasien.jenisPembayaran}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Status</p>
                      <span className="inline-flex px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                        {pasien.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dua Kolom: Vital Sign (Kiri) dan Rekam Medis (Kanan) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
                
                {/* Kolom Kiri - Vital Sign */}
                <div className="p-6">
                  <h4 className="text-md font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FiActivity className="w-5 h-5 text-emerald-600" />
                    Vital Sign
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4 text-center hover:bg-gray-100 transition-colors">
                      <div className="flex justify-center mb-2">
                        <FiHeart className="w-5 h-5 text-red-500" />
                      </div>
                      <p className="text-xs text-gray-500 mb-1">Tekanan Darah</p>
                      <p className="text-lg font-bold text-gray-800">{vitalSign.tekananDarah}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 text-center hover:bg-gray-100 transition-colors">
                      <div className="flex justify-center mb-2">
                        <FiActivity className="w-5 h-5 text-blue-500" />
                      </div>
                      <p className="text-xs text-gray-500 mb-1">Nadi</p>
                      <p className="text-lg font-bold text-gray-800">{vitalSign.nadi}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 text-center hover:bg-gray-100 transition-colors">
                      <div className="flex justify-center mb-2">
                        <FiThermometer className="w-5 h-5 text-orange-500" />
                      </div>
                      <p className="text-xs text-gray-500 mb-1">Suhu Tubuh</p>
                      <p className="text-lg font-bold text-gray-800">{vitalSign.suhuTubuh}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 text-center hover:bg-gray-100 transition-colors">
                      <div className="flex justify-center mb-2">
                        <FiUser className="w-5 h-5 text-purple-500" />
                      </div>
                      <p className="text-xs text-gray-500 mb-1">Berat Badan</p>
                      <p className="text-lg font-bold text-gray-800">{vitalSign.beratBadan}</p>
                    </div>
                  </div>
                </div>

                {/* Kolom Kanan - Rekam Medis Terakhir */}
                <div className="p-6">
                  <h4 className="text-md font-bold text-gray-900 mb-4">Rekam Medis Terakhir</h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                        <span>📋</span> Keluhan Utama
                      </p>
                      <p className="text-gray-800 bg-gray-50 p-3 rounded-xl">{rekamMedis.keluhanUtama}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                        <span>🔍</span> Pemeriksaan Fisik
                      </p>
                      <p className="text-gray-800 bg-gray-50 p-3 rounded-xl">{rekamMedis.pemeriksaanFisik}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                        <span>🏥</span> Diagnosis
                      </p>
                      <p className="text-gray-800 bg-gray-50 p-3 rounded-xl">
                        {rekamMedis.diagnosis}
                        <span className="text-emerald-600 ml-2 text-sm">({rekamMedis.kodeDiagnosis})</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                        <span>💊</span> Tatalaksana / Resep
                      </p>
                      <p className="text-gray-800 bg-gray-50 p-3 rounded-xl">{rekamMedis.tatalaksana}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dokumen Diperlukan Section - Full Width */}
              <div className="p-6 border-t border-gray-200">
                <h4 className="text-md font-bold text-gray-900 mb-4">Dokumen Diperlukan:</h4>
                <div className="flex gap-3 flex-wrap">
                  {dokumenDiperlukan.map((dokumen, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-sm font-medium"
                    >
                      <FiFileText className="w-4 h-4" />
                      {dokumen}
                    </div>
                  ))}
                </div>
              </div>

              {/* Catatan Admin */}
              <div className="p-6 bg-blue-50 border-l-4 border-blue-500">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Catatan Admin:</span>{" "}
                  Data rekam medis ini diinput oleh dokter. Sebagai admin, Anda hanya dapat melihat data
                  untuk keperluan administrasi seperti pembuatan surat rujukan, surat sakit, atau surat kontrol.
                </p>
              </div>

              {/* Action Button */}
              <div className="p-6 bg-gray-50 flex justify-end">
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors shadow-sm">
                  <FiPrinter className="w-4 h-4" />
                  Buat Surat / Dokumen
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}