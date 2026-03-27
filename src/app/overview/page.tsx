"use client";

import { RxPeople } from "react-icons/rx";
import { MdOutlineTrendingUp, MdOutlineTrendingDown } from "react-icons/md";
import { LuBuilding2 } from "react-icons/lu";
import { BsPersonGear } from "react-icons/bs";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import PieChart from "@/components/piecharts";
import BarChart from "@/components/barchart";

const trendData = [
  { name: "Jan", sembuh: 20, relapse: 4 },
  { name: "Feb", sembuh: 28, relapse: 3 },
  { name: "Mar", sembuh: 35, relapse: 5 },
  { name: "Apr", sembuh: 40, relapse: 2 },
  { name: "Mei", sembuh: 48, relapse: 6 },
];

const cards = [
  {
    label: "Total Klien Aktif",
    value: "247",
    trend: "+12%",
    up: true,
    icon: <RxPeople className="text-white text-xl" />,
    bg: "from-blue-500 to-teal-400",
  },
  {
    label: "Tingkat Kesembuhan",
    value: "78.5%",
    trend: "+5.2%",
    up: true,
    icon: <MdOutlineTrendingUp className="text-white text-xl" />,
    bg: "from-green-400 to-green-600",
  },
  {
    label: "Kasus Relapse",
    value: "30",
    trend: "+2.1%",
    up: false,
    icon: <MdOutlineTrendingDown className="text-white text-xl" />,
    bg: "from-orange-500 to-red-400",
  },
  {
    label: "Kapasitas Hunian",
    value: "53%",
    trend: "-3%",
    up: false,
    icon: <LuBuilding2 className="text-white text-xl" />,
    bg: "from-purple-500 to-pink-400",
  },
  {
    label: "Total Petugas",
    value: "68",
    trend: "Stabil",
    up: true,
    icon: <BsPersonGear className="text-white text-xl" />,
    bg: "from-yellow-400 to-orange-400",
  },
];

export default function OverviewPage() {
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {cards.map((card, i) => (
          <div key={i} className={`bg-gradient-to-r ${card.bg} p-5 rounded-xl shadow text-white`}>
            <div className="flex justify-between items-start mb-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg">{card.icon}</div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full bg-white bg-opacity-20 ${card.up ? "text-white" : "text-white"}`}>
                {card.trend}
              </span>
            </div>
            <p className="text-3xl font-bold">{card.value}</p>
            <p className="text-xs mt-1 text-white text-opacity-80">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Tren Rehabilitasi Klien</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="sembuh" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} name="Sembuh" />
                <Line type="monotone" dataKey="relapse" stroke="#f97316" strokeWidth={2} dot={{ r: 4 }} name="Relapse" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 mt-2 justify-center text-xs">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-500 inline-block" /> Sembuh</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-orange-400 inline-block" /> Relapse</span>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Distribusi Jenis Layanan</h2>
          <PieChart />
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow lg:col-span-2">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Data Kapasitas per Bulan</h2>
          <BarChart />
        </div>
      </div>
    </div>
  );
}
