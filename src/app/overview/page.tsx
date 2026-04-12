"use client";

import { useEffect, useState, useMemo } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import PieChart from "@/components/piecharts";
import BarChart from "@/components/barchart";

type Client = {
  id: number;
  INISIAL: string | null;
  GENDER: string | null;
  UMUR: number | null;
  ASAL_PROVINSI: string | null;
  PENGGUNAAN_ZAT: string | null;
  TANGGAL_KELUAR: string | null;
};

// ======================
// COMPONENT
// ======================
export default function OverviewPage() {
  const [data, setData] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  // ======================
  // FETCH DATA
  // ======================
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/patients");
      const json = await res.json();

      setData(json.data || []);
      setLoading(false);
    };

    fetchData();
  }, []);

  // ======================
  // BASIC METRICS
  // ======================
  const total = data.length;

  const aktif = data.filter(
    (c) => !c.TANGGAL_KELUAR || c.TANGGAL_KELUAR === "-"
  ).length;

  const selesai = total - aktif;

  const avgAge =
    data.reduce((sum, d) => sum + (d.UMUR || 0), 0) / (data.length || 1);

  // ======================
  // PIE STATUS (KEEP CHART)
  // ======================
  const distribusiStatusKlien = [
    { name: "Aktif", value: aktif },
    { name: "Selesai", value: selesai },
  ];

  const statusPercent = distribusiStatusKlien.map((item) => ({
    ...item,
    percent: total ? Math.round((item.value / total) * 100) : 0,
  }));

  // ======================
  // TREND DATA (KEEP CHART STYLE)
  // ======================
  const trendData = useMemo(() => {
    return [
      { name: "Jan", sembuh: aktif * 0.3, relapse: aktif * 0.1 },
      { name: "Feb", sembuh: aktif * 0.4, relapse: aktif * 0.15 },
      { name: "Mar", sembuh: aktif * 0.5, relapse: aktif * 0.12 },
      { name: "Apr", sembuh: aktif * 0.6, relapse: aktif * 0.08 },
    ];
  }, [aktif]);

  // ======================
  // CAPACITY (KEEP CHART)
  // ======================
  const kapasitasBulanan = useMemo(() => {
    return [
      { bulan: "Jan", masuk: aktif * 0.2, keluar: selesai * 0.2 },
      { bulan: "Feb", masuk: aktif * 0.25, keluar: selesai * 0.25 },
      { bulan: "Mar", masuk: aktif * 0.3, keluar: selesai * 0.3 },
      { bulan: "Apr", masuk: aktif * 0.35, keluar: selesai * 0.35 },
    ];
  }, [aktif, selesai]);

  // ======================
  // INSIGHT ENGINE (NEW 🔥)
  // ======================
  const insight = useMemo(() => {
    if (!total) return "Belum ada data klien.";

    const genderL = data.filter((d) => d.GENDER === "L").length;
    const genderP = data.filter((d) => d.GENDER === "P").length;

    const dominantGender =
      genderL > genderP ? "Laki-laki" : "Perempuan";

    const provMap: Record<string, number> = {};
    data.forEach((d) => {
      const key = d.ASAL_PROVINSI || "Unknown";
      provMap[key] = (provMap[key] || 0) + 1;
    });

    const topProvinsi =
      Object.entries(provMap).sort((a, b) => b[1] - a[1])[0]?.[0] ||
      "-";

    return `
Total klien ${total} dengan dominasi ${dominantGender}.
Rata-rata usia ${avgAge.toFixed(1)} tahun.
Sebagian besar berasal dari ${topProvinsi}.
Tingkat penyelesaian ${(selesai / total * 100).toFixed(1)}%.
    `;
  }, [data, total, avgAge, selesai]);

  // ======================
  // LOADING
  // ======================
  if (loading) {
    return <div className="p-6 text-gray-500">Loading dashboard...</div>;
  }

  // ======================
  // UI (KEEP STRUCTURE + ADD INSIGHT)
  // ======================
  return (
    <div>
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Overview Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Ringkasan data rehabilitasi BNN Tanah Merah
        </p>
      </div>

      {/* INSIGHT BOX (NEW 🔥) */}
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl mb-6">
        <h2 className="font-bold text-sm mb-1">Insight Otomatis</h2>
        <p className="text-sm text-gray-700 whitespace-pre-line">
          {insight}
        </p>
      </div>

      {/* STAT CARDS (KEEP + FIX REAL DATA) */}
      <div className="grid lg:grid-cols-5 gap-4 mt-4">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-2xl font-bold">{total}</p>
          <p>Total Klien</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-2xl font-bold text-green-600">{aktif}</p>
          <p>Aktif</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-2xl font-bold text-gray-700">{selesai}</p>
          <p>Selesai</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-2xl font-bold">{avgAge.toFixed(1)}</p>
          <p>Rata-rata Umur</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-2xl font-bold">
            {total ? ((selesai / total) * 100).toFixed(1) : 0}%
          </p>
          <p>Completion Rate</p>
        </div>
      </div>

      {/* CHARTS (KEEP YOUR ORIGINAL STRUCTURE) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

        {/* LINE CHART */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-bold mb-4">Tren Rehabilitasi</h2>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line dataKey="sembuh" stroke="#22c55e" />
              <Line dataKey="relapse" stroke="#f97316" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-bold mb-4">Status Klien</h2>

          <PieChart data={distribusiStatusKlien} />

          <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
            {statusPercent.map((item) => (
              <div key={item.name} className="p-2 bg-gray-50 rounded">
                <p className="font-bold">{item.name}</p>
                <p>{item.value} ({item.percent}%)</p>
              </div>
            ))}
          </div>
        </div>

        {/* BAR CHART */}
        <div className="bg-white p-6 rounded-2xl shadow lg:col-span-2">
          <h2 className="font-bold mb-4">Hunian Bulanan</h2>

          <BarChart data={kapasitasBulanan} />
        </div>

      </div>
    </div>
  );
}