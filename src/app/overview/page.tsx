"use client";

import { RxPeople } from "react-icons/rx";
import { MdOutlineTrendingUp, MdOutlineTrendingDown } from "react-icons/md";
import { LuBuilding2, LuPercent } from "react-icons/lu";
import { BsPersonGear } from "react-icons/bs";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from "recharts";
import PieChart from "@/components/piecharts";
import BarChart from "@/components/barchart";

// ✅ Import data dari file data — tidak perlu hardcode lagi di sini
import {
  overviewCards,
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
const cardIcons = [
  <RxPeople       className="text-white text-xl" />,
  <MdOutlineTrendingUp  className="text-white text-xl" />,
  <MdOutlineTrendingDown className="text-white text-xl" />,
  <LuBuilding2    className="text-white text-xl" />,
  <LuPercent   className="text-white text-xl" />,
];

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {overviewCards.map((card: Card, i: number) => (
          <div
            key={i}
            className={`bg-gradient-to-br ${card.bg} p-6 rounded-2xl shadow-lg hover:shadow-2xl text-white group transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer relative overflow-hidden`}
          >
            {/* Animated background gradient overlay */}
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-white bg-opacity-25 p-3 rounded-xl group-hover:bg-opacity-35 transition-all duration-300 shadow-lg">
                  {cardIcons[i]}
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  card.up 
                    ? "bg-green-400 bg-opacity-30 text-green-100" 
                    : "bg-red-400 bg-opacity-30 text-red-100"
                }`}>
                  {card.up ? "↑" : "↓"} {card.trend}
                </span>
              </div>
              <p className="text-4xl font-black mb-1">{card.value}</p>
              <p className="text-sm text-white text-opacity-90 font-medium">{card.label}</p>
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white opacity-5 rounded-full group-hover:opacity-10 transition-opacity duration-300" />
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-gradient-to-b from-green-500 to-teal-500 rounded-full" />
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
            <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
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
            <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full" />
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