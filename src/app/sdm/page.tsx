"use client";

import { RxPeople } from "react-icons/rx";
import { MdOutlineTrendingUp, MdOutlineTrendingDown } from "react-icons/md";
import TabelPetugas from "@/components/tabelpetugaslayanan";
import TabelShiftPetugas from "@/components/tabelshiftpetugas";
import TabelTurnover from "@/components/tabelturnover";

export default function SDMPage() {
  return (
    <div className="p-2">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">DATA SUMBER DAYA MANUSIA</h1>
        <p className="text-sm font-semibold text-gray-600">BALAI REHABILITASI NARKOTIKA TANAH MERAH</p>
        <p className="text-sm text-gray-400">TAHUN 2025</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-800 to-blue-400 p-6 rounded-xl shadow">
          <RxPeople className="text-white text-5xl mb-2" />
          <h2 className="text-3xl font-bold text-white">68</h2>
          <p className="text-blue-100 text-sm mt-1">Total Petugas Rehabilitasi</p>
        </div>

        <div className="bg-gradient-to-r from-green-400 to-green-600 p-6 rounded-xl shadow">
          <MdOutlineTrendingUp className="text-white text-5xl mb-2" />
          <h2 className="text-3xl font-bold text-white">21</h2>
          <p className="text-green-100 text-sm mt-1">Petugas Shift Aktif</p>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 rounded-xl shadow">
          <MdOutlineTrendingDown className="text-white text-5xl mb-2" />
          <h2 className="text-3xl font-bold text-white">3</h2>
          <p className="text-purple-100 text-sm mt-1">Turn Over (2026)</p>
        </div>
      </div>

      {/* Tabel Petugas */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
          JUMLAH PETUGAS LAYANAN REHABILITASI
        </h2>
        <TabelPetugas />
      </div>

      {/* Tabel Shift & Turnover */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-bold text-gray-800 mb-4 text-center">
            JUMLAH SHIFT PETUGAS
          </h2>
          <TabelShiftPetugas />
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-bold text-gray-800 mb-4 text-center">
            TURN OVER PETUGAS
          </h2>
          <TabelTurnover />
        </div>
      </div>
    </div>
  );
}
