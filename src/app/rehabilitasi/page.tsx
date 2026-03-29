"use client";

import { RxPeople } from "react-icons/rx";
import { MdOutlineTrendingUp, MdOutlineTrendingDown } from "react-icons/md";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import PieChart from "@/components/piecharts";
import TabelKeberhasilan from "@/components/tabelkeberhasilan";
import TabelRelapse from "@/components/tabelrelapse";
import TabelSelesaiRehab from "@/components/selesairehab";
import { distribusiStatusKlien } from "../data/overview2.js";

const genderData = [
  { name: "Pria", value: 192 },
  { name: "Wanita", value: 55 },
];

const trendData = [
  { name: "Jan", sembuh: 20, relapse: 4 },
  { name: "Feb", sembuh: 28, relapse: 3 },
  { name: "Mar", sembuh: 35, relapse: 5 },
  { name: "Apr", sembuh: 40, relapse: 2 },
  { name: "Mei", sembuh: 48, relapse: 6 },
];

const totalKlienAktif = distribusiStatusKlien.reduce((sum, item) => sum + item.value, 0);
const kasusSembuh = distribusiStatusKlien.find((item) => item.name === "Sembuh")?.value ?? 0;
const kasusRelapse = distribusiStatusKlien.find((item) => item.name === "Relapse")?.value ?? 0;

export default function RehabilitasiPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Data Rehabilitasi Klien</h1>
        <p className="text-sm text-gray-500 mt-1">
          Informasi lengkap tentang klien yang sedang menjalani rehabilitasi
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-6 rounded-xl shadow text-white">
          <RxPeople className="text-5xl mb-2 opacity-80" />
          <p className="text-3xl font-bold">{totalKlienAktif}</p>
          <p className="text-sm mt-1 text-blue-100">Total Klien Aktif</p>
        </div>

        <div className="bg-gradient-to-r from-green-400 to-green-600 p-6 rounded-xl shadow text-white">
          <MdOutlineTrendingUp className="text-5xl mb-2 opacity-80" />
          <p className="text-3xl font-bold">{kasusSembuh}</p>
          <p className="text-sm mt-1 text-green-100">Klien Sembuh</p>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-400 p-6 rounded-xl shadow text-white">
          <MdOutlineTrendingDown className="text-5xl mb-2 opacity-80" />
          <p className="text-3xl font-bold">{kasusRelapse}</p>
          <p className="text-sm mt-1 text-orange-100">Kasus Relapse</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Tren Rehabilitasi</h2>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="sembuh" stroke="#22c55e" strokeWidth={2} name="Sembuh" dot={{ r: 4 }} />
                <Line type="monotone" dataKey="relapse" stroke="#f97316" strokeWidth={2} name="Relapse" dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 mt-2 justify-center text-xs">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-500 inline-block" /> Sembuh</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-orange-400 inline-block" /> Relapse</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Distribusi Gender</h2>
          <PieChart data={genderData} />
        </div>
      </div>

      {/* Tabel A */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-lg font-bold text-green-600 mb-4">
          A. Tingkat Keberhasilan Rehabilitasi Klien (Pulih)
        </h2>
        <TabelKeberhasilan />
        <p className="text-sm text-gray-500 mt-3">
          Total:{" "}
          <span className="font-semibold text-green-500">8 Klien</span> berhasil pulih dari rehabilitasi
        </p>
      </div>

      {/* Tabel B */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-lg font-bold text-orange-600 mb-4">
          B. Tingkat Relapse (Kambuh Kembali) Klien
        </h2>
        <TabelRelapse />
        <p className="text-sm text-gray-500 mt-3">
          Total:{" "}
          <span className="font-semibold text-orange-500">5 Klien</span> mengalami relapse
        </p>
      </div>

      {/* Tabel C */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-bold text-blue-600 mb-4">
          C. Jumlah Klien yang Menyelesaikan Program Rehabilitasi
        </h2>
        <TabelSelesaiRehab />
        <p className="text-sm text-gray-500 mt-3">
          Total:{" "}
          <span className="font-semibold text-blue-500">6 Klien</span> menyelesaikan program rehabilitasi
        </p>
      </div>
    </div>
  );
}
