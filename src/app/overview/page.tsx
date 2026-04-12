"use client";

import { RxPeople } from "react-icons/rx";
import { MdOutlineTrendingUp, MdOutlineTrendingDown } from "react-icons/md";
import { LuBuilding2 } from "react-icons/lu";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import PieChart from "@/components/piecharts";
import BarChart from "@/components/barchart";
import { GoPulse } from "react-icons/go"

// ✅ Import data dari file data — tidak perlu hardcode lagi di sini
import {
  trendData,
  distribusiStatusKlien,
  kapasitasBulanan,
} from "../data/overview2.js";

// Interface untuk card
interface Card {
  label: string;
  value: string;
  trend: string;
  up: boolean;
  bg: string;
}

// Icon untuk tiap card (urutan harus sama dengan overviewCards di data/overview.ts)

export default function OverviewPage() {
  const totalStatus = distribusiStatusKlien.reduce((sum, item) => sum + item.value, 0);
  const statusPercent = distribusiStatusKlien.map((item) => ({
    ...item,
    percent: totalStatus > 0 ? Math.round((item.value / totalStatus) * 100) : 0,
  }));

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Overview Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Ringkasan data dan metrik utama fasilitas rehabilitasi BNN Tanah Merah
        </p>
      </div>

      {/* Stat Cards */}
 <div className="grid lg:grid-cols-5 gap-4 mt-4">

            {/* Card 1 */}
            <div className="bg-white p-6 rounded-xl shadow">
            {/* Icon Kanan & Kiri*/}
            <div className="flex justify-between items-start">
            {/*Icon Kiri*/}
            <div className="bg-linear-to-r from-blue-400 to-teal-300 p-3 w-10 h-10 rounded-lg">
                <RxPeople className="text-white text-xl"/>
            </div>
            <div className="flex justify-between items-start">
            <MdOutlineTrendingUp className="text-green-600 cursor-pointer" />
            <p className="text-sm text-green-600">
            +12%
            </p>
            </div>
            </div>
            <h1 className="text-2xl font-bold p-3 text-gray-800 text-left">
            247
            </h1>
            <p className="text-sm test-grey">
            Total Klien Aktif
            </p>
        </div>

        {/* Card 2 */}
            <div className="bg-white p-6 rounded-xl shadow">
            {/* Icon Kanan & Kiri*/}
            <div className="flex justify-between items-start">
            {/*Icon Kiri*/}
            <div className="bg-linear-to-r from-green-400 to-green-600 p-3 w-10 h-10 rounded-lg">
                <MdOutlineTrendingUp className="text-white text-xl"/>
            </div>
            <div className="flex justify-between items-start">
            <MdOutlineTrendingUp className="text-green-600 cursor-pointer" />
            <p className="text-sm text-green-600">
            +5.2%
            </p>
            </div>
            </div>
            <h1 className="text-2xl font-bold p-3 text-gray-800 text-left">
            78.5%
            </h1>
            <p className="text-sm test-grey">
            Tingkat Kesembuhan
            </p>
        </div>


        {/* Card 3 */}
            <div className="bg-white p-6 rounded-xl shadow">
            {/* Icon Kanan & Kiri*/}
            <div className="flex justify-between items-start">
            {/*Icon Kiri*/}
            <div className="bg-linear-to-r from-orange-400 to-orange-600 p-3 w-10 h-10 rounded-lg">
                <MdOutlineTrendingDown className="text-white text-xl"/>
            </div>
            <div className="flex justify-between items-start">
            <MdOutlineTrendingDown className="text-orange-600 cursor-pointer" />
            <p className="text-sm text-orange-600">
            -2.1%
            </p>
            </div>
            </div>
            <h1 className="text-2xl font-bold p-3 text-gray-800 text-left">
            12.3%
            </h1>
            <p className="text-sm test-grey">
            Tingkat Relapse
            </p>
        </div>

        {/* Card 4 */}
            <div className="bg-white p-6 rounded-xl shadow">
            {/* Icon Kanan & Kiri*/}
            <div className="flex justify-between items-start">
            {/*Icon Kiri*/}
            <div className="bg-linear-to-r from-purple-500 to-pink-400 p-3 w-10 h-10 rounded-lg">
                <LuBuilding2 className="text-white text-xl"/>
            </div>
            <div className="flex justify-between items-start">
            <MdOutlineTrendingUp className="text-orange-600 cursor-pointer" />
            <p className="text-sm text-orange-600">
            +3.8%
            </p>
            </div>
            </div>
            <h1 className="text-2xl font-bold p-3 text-gray-800 text-left">
            85.2%
            </h1>
            <p className="text-sm test-grey">
            Tingkat Hunian
            </p>
        </div>

        {/* Card 5 */}
            <div className="bg-white p-6 rounded-xl shadow">
            {/* Icon Kanan & Kiri*/}
            <div className="flex justify-between items-start">
            {/*Icon Kiri*/}
            <div className="bg-linear-to-r from-yellow-400 to-orange-400 p-3 w-10 h-10 rounded-lg">
                <GoPulse className="text-white text-xl"/>
            </div>
            <div className="flex justify-between items-start">
            <MdOutlineTrendingDown className="text-orange-600 cursor-pointer" />
            <p className="text-sm text-orange-600">
            -3 Hari
            </p>
            </div>
            </div>
            <h1 className="text-2xl font-bold p-3 text-gray-800 text-left">
            42 Hari
            </h1>
            <p className="text-sm test-grey">
            Rata-rata Masa Rehabilitasi
            </p>
        </div>
    </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        {/* Line Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-lienar-to-b from-green-500 to-teal-500 rounded-full" />
            Tren Rehabilitasi Klien
          </h2>
          <div className="h-72 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line
                  type="monotone" dataKey="sembuh" stroke="#22c55e"
                  strokeWidth={2} dot={{ r: 4 }} name="Pulih"
                />
                <Line
                  type="monotone" dataKey="relapse" stroke="#f97316"
                  strokeWidth={2} dot={{ r: 4 }} name="Relapse"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-6 mt-4 justify-center text-xs">
            <span className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
              <span className="text-gray-700 font-medium">Pulih</span>
            </span>
            <span className="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-400 inline-block" />
              <span className="text-gray-700 font-medium">Relapse</span>
            </span>
          </div>
        </div>

        {/* Pie Chart — kirim data sebagai props */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col items-center justify-center">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2 w-full">
            <span className="w-1 h-6 bg-linear-to-b from-blue-500 to-purple-500 rounded-full" />
            Status Klien
          </h2>
          <PieChart data={distribusiStatusKlien} />
          <div className="mt-4 w-full grid grid-cols-3 gap-2 text-xs">
            {statusPercent.map((item) => (
              <div key={item.name} className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-center">
                <p className="font-bold text-gray-700">{item.name}</p>
                <p className="text-gray-500">{item.value} klien</p>
                <p className="text-blue-600 font-semibold">{item.percent}%</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart — kirim data sebagai props */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 lg:col-span-2">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-linear-to-b from-blue-500 to-cyan-500 rounded-full" />
            Hunian per Bulan (Masuk & Keluar)
          </h2>
          <div className="h-80 -mx-2">
            <BarChart data={kapasitasBulanan} />
          </div>
        </div>
      </div>
    </div>
  );
}