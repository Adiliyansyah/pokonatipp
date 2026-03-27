"use client";

import { LuBuilding2 } from "react-icons/lu";
import { GoPulse } from "react-icons/go";
import { MdOutlineTrendingUp, MdOutlineTrendingDown } from "react-icons/md";
import TabelKapasitas from "@/components/tabelkapasitas";
import BarChart from "@/components/barchart";

export default function KapasitasPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Kapasitas & Hunian Fasilitas</h1>
        <p className="text-sm text-gray-500 mt-1">Monitoring kapasitas dan tingkat hunian per fase rehabilitasi</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-5 rounded-xl shadow text-white">
          <LuBuilding2 className="text-4xl mb-2 opacity-80" />
          <p className="text-3xl font-bold">115</p>
          <p className="text-sm mt-1 text-blue-100">Total Kapasitas</p>
        </div>

        <div className="bg-gradient-to-r from-green-400 to-green-700 p-5 rounded-xl shadow text-white">
          <MdOutlineTrendingUp className="text-4xl mb-2 opacity-80" />
          <p className="text-3xl font-bold">61</p>
          <p className="text-sm mt-1 text-green-100">TPOP 2026</p>
        </div>

        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-5 rounded-xl shadow text-white">
          <LuBuilding2 className="text-4xl mb-2 opacity-80" />
          <p className="text-3xl font-bold">34</p>
          <p className="text-sm mt-1 text-yellow-100">Tempat Kosong</p>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-5 rounded-xl shadow text-white">
          <GoPulse className="text-4xl mb-2 opacity-80" />
          <p className="text-3xl font-bold">53%</p>
          <p className="text-sm mt-1 text-purple-100">Tingkat Hunian</p>
        </div>
      </div>

      {/* Tabel TPOP */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">TPOP HARIAN</h2>
          <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
            Jumat, 27 Maret 2026
          </span>
        </div>
        <TabelKapasitas />
        <p className="text-sm text-gray-500 mt-3">
          Total kapasitas terisi:{" "}
          <span className="font-semibold text-blue-600">61 dari 115 tempat</span>
        </p>
      </div>

      {/* Grafik */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Grafik Hunian per Bulan</h2>
        <BarChart />
      </div>
    </div>
  );
}
