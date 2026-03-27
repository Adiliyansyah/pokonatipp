"use client";

import { RxPeople } from "react-icons/rx";
import { MdOutlineTrendingUp, MdOutlineTrendingDown } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import TabelLamaLAyanan from "@/components/tabellamalayanan";
import TabelPengukuranKepuasan from "@/components/pengukurankepuasan";

export default function KepuasanPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Kepuasan Layanan</h1>
        <p className="text-sm text-gray-500 mt-1">
          Monitoring kepuasan dan kualitas layanan rehabilitasi
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-r from-green-400 to-green-600 p-5 rounded-xl shadow text-white">
          <RxPeople className="text-3xl mb-2 opacity-80" />
          <p className="text-3xl font-bold">3.74</p>
          <p className="text-sm mt-1 text-green-100">IKM Rawat Jalan</p>
          <p className="text-xs text-green-200 mt-0.5">Indeks 4 — Sangat Baik</p>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-5 rounded-xl shadow text-white">
          <MdOutlineTrendingUp className="text-3xl mb-2 opacity-80" />
          <p className="text-3xl font-bold">3.72</p>
          <p className="text-sm mt-1 text-purple-100">IKM Rawat Inap</p>
          <p className="text-xs text-purple-200 mt-0.5">Indeks 4 — Sangat Baik</p>
        </div>

        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-5 rounded-xl shadow text-white">
          <MdOutlineTrendingDown className="text-3xl mb-2 opacity-80" />
          <p className="text-3xl font-bold">88.79%</p>
          <p className="text-sm mt-1 text-yellow-100">Kualitas Hidup</p>
          <p className="text-xs text-yellow-200 mt-0.5">Presentase T.A. 2025</p>
        </div>

        <div className="bg-gradient-to-r from-blue-700 to-blue-400 p-5 rounded-xl shadow text-white">
          <FaRegStar className="text-3xl mb-2 opacity-80" />
          <p className="text-3xl font-bold">4.00</p>
          <p className="text-sm mt-1 text-blue-100">IKR</p>
          <p className="text-xs text-blue-200 mt-0.5">Indeks Kapabilitas Rehab</p>
        </div>
      </div>

      {/* Tabel Lama Layanan */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-lg font-bold text-gray-800 text-center mb-4">Lama Layanan</h2>
        <TabelLamaLAyanan />
      </div>

      {/* Tabel Pengukuran */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-bold text-gray-800 text-center mb-2">
          HASIL PENGUKURAN KEPUASAN PENERIMA LAYANAN REHABILITASI,
          PENGUKURAN KAPABILITAS REHABILITASI (IKR), DAN PRESENTASE KUALITAS HIDUP T.A. 2025
        </h2>
        <TabelPengukuranKepuasan />
        <p className="text-xs text-gray-400 mt-3 text-center">
          Berdasarkan Surat Kepala BNN No: B/136/I/DE/RH/2026/BNN
        </p>
      </div>
    </div>
  );
}
