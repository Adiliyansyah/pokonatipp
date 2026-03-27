"use client";

import { MdOutlineTrendingUp } from "react-icons/md";
import { MdAttachMoney } from "react-icons/md";
import TabelKeuangan from "@/components/tabelkeuangan";

export default function KeuanganPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">DATA KEUANGAN</h1>
        <h2 className="text-base font-semibold text-gray-600">
          BALAI REHABILITASI NARKOTIKA TANAH MERAH
        </h2>
        <p className="text-sm text-gray-400">TAHUN ANGGARAN 2025</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-800 to-blue-400 p-6 rounded-xl shadow text-white">
          <MdAttachMoney className="text-5xl mb-2 opacity-80" />
          <p className="text-3xl font-bold">Rp 4.743.000</p>
          <p className="text-sm mt-1 text-blue-100">Rata-rata Biaya Per Orang / Bulan</p>
        </div>

        <div className="bg-gradient-to-r from-green-400 to-green-600 p-6 rounded-xl shadow text-white">
          <MdOutlineTrendingUp className="text-5xl mb-2 opacity-80" />
          <p className="text-3xl font-bold">100%</p>
          <p className="text-sm mt-1 text-green-100">Realisasi Anggaran</p>
        </div>
      </div>

      {/* Tabel */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-bold text-gray-800 text-center mb-4">
          RATA-RATA BIAYA REHABILITASI NARKOBA RAWAT INAP DI BALAI REHABILITASI BNN TANAH MERAH T.A. 2025
        </h2>
        <TabelKeuangan />
      </div>
    </div>
  );
}
