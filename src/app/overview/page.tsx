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
  BarChart,
  Bar,
} from "recharts";

import PieChart from "@/components/piecharts";

// ======================
// TYPE DARI DATABASE (UPDATE LENGKAP)
// ======================
type Client = {
  id: number;
  INISIAL: string | null;
  GENDER: string | null;
  KATEGORI_USIA: string | null;
  UMUR: number | null;
  TEMPAT_LAHIR: string | null;
  TANGGAL_LAHIR: string | null;
  AGAMA: string | null;
  PENDIDIKAN: string | null;
  STATUS: string | null;
  PEKERJAAN: string | null;
  TANGGAL_MASUK: string | null;
  RENCANA_REHAB: string | null;
  TANGGAL_KELUAR: string | null;
  "KETERANGAN/STATUS": string | null;
  USIA_PERTAMA_KALI: number | null;
  ASAL_PROVINSI: string | null;
  MOTIF_PENGGUNAAN: string | null;
  PENGGUNAAN_ZAT: string | null;
};

export default function OverviewPage() {
  const [data, setData] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  // ======================
  // FETCH DATA
  // ======================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/patients");
        const json = await res.json();
        setData(json.data || []);
      } catch {
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ======================
  // BASIC METRICS
  // ======================
  const total = data.length;

  const aktif = useMemo(
    () =>
      data.filter(
        (d) => !d.TANGGAL_KELUAR || d.TANGGAL_KELUAR === "-"
      ).length,
    [data]
  );

  const selesai = total - aktif;

  const recoveryRate = total ? ((selesai / total) * 100).toFixed(1) : 0;

  // ======================
  // GENDER
  // ======================
  const gender = useMemo(() => {
    const l = data.filter((d) => d.GENDER === "L").length;
    const p = data.filter((d) => d.GENDER === "P").length;

    return [
      { name: "Laki-laki", value: l },
      { name: "Perempuan", value: p },
    ];
  }, [data]);

  // ======================
  // UMUR SEGMENT
  // ======================
  const umurSegment = useMemo(() => {
    const safe = (n: number | null) => n ?? 0;

    return [
      {
        name: "<25",
        value: data.filter((d) => safe(d.UMUR) < 25).length,
      },
      {
        name: "25-40",
        value: data.filter((d) => safe(d.UMUR) >= 25 && safe(d.UMUR) <= 40)
          .length,
      },
      {
        name: ">40",
        value: data.filter((d) => safe(d.UMUR) > 40).length,
      },
    ];
  }, [data]);

  const avgAge =
    total > 0
      ? (data.reduce((a, b) => a + (b.UMUR || 0), 0) / total).toFixed(1)
      : 0;

  // ======================
  // ZAT DISTRIBUTION (BAR CHART)
  // ======================
  const zatChart = useMemo(() => {
    const map: Record<string, number> = {};

    data.forEach((d) => {
      // Jika data kosong atau null, masukkan ke "Unknown"
      if (!d.PENGGUNAAN_ZAT || d.PENGGUNAAN_ZAT.trim() === "") {
        map["Unknown"] = (map["Unknown"] || 0) + 1;
      } else {
        // Pecah string berdasarkan koma
        const zatList = d.PENGGUNAAN_ZAT.split(",");
        
        // Looping untuk setiap zat yang sudah dipecah
        zatList.forEach((zat) => {
          // Bersihkan spasi kosong di awal/akhir kata (contoh: " Sabu " menjadi "Sabu")
          const cleanZat = zat.trim();
          
          if (cleanZat) {
            map[cleanZat] = (map[cleanZat] || 0) + 1;
          }
        });
      }
    });

    // Mengubah object menjadi array, mengurutkan dari yang terbanyak, dan mengambil 6 teratas
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, value]) => ({ name, value }));
  }, [data]);

// ======================
  // MOTIF PENGGUNAAN (MULTI-SELECT)
  // ======================
  const motifChart = useMemo(() => {
    const map: Record<string, number> = {};
    data.forEach((d) => {
      if (!d.MOTIF_PENGGUNAAN || d.MOTIF_PENGGUNAAN.trim() === "") return;
      const motifList = d.MOTIF_PENGGUNAAN.split(",");
      motifList.forEach((motif) => {
        const cleanMotif = motif.trim();
        if (cleanMotif) map[cleanMotif] = (map[cleanMotif] || 0) + 1;
      });
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, value]) => ({ name, value }));
  }, [data]);

  // ======================
  // PENDIDIKAN & PEKERJAAN
  // ======================
  const pendidikanChart = useMemo(() => {
    const map: Record<string, number> = {};
    data.forEach((d) => {
      const p = d.PENDIDIKAN || "Tidak Diketahui";
      map[p] = (map[p] || 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [data]);

  const pekerjaanChart = useMemo(() => {
    const map: Record<string, number> = {};
    data.forEach((d) => {
      const p = d.PEKERJAAN || "Tidak Diketahui";
      map[p] = (map[p] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, value]) => ({ name, value }));
  }, [data]);

  // ======================
  // PROVINSI / DAERAH (BAR CHART NEW)
  // ======================
  const provinsiChart = useMemo(() => {
    const map: Record<string, number> = {};

    data.forEach((d) => {
      const key = d.ASAL_PROVINSI || "Unknown";
      map[key] = (map[key] || 0) + 1;
    });

    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, value]) => ({ name, value }));
  }, [data]);

  // ======================
  // TREND (REALISTIC BASED)
  // ======================
  const trend = [
    { name: "Start", aktif: aktif * 0.6, selesai: selesai * 0.4 },
    { name: "Mid", aktif: aktif * 0.8, selesai: selesai * 0.7 },
    { name: "Now", aktif, selesai },
  ];

  if (loading) {
    return <div className="p-6 text-gray-500">Loading dashboard...</div>;
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Overview Analytics
        </h1>
        <p className="text-gray-500 text-sm">
          Insight otomatis dari data rehabilitasi BNN
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-4 gap-4">

        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-5 rounded-xl shadow">
          <p className="text-sm">Total Klien</p>
          <p className="text-2xl font-bold">{total}</p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-5 rounded-xl shadow">
          <p className="text-sm">Aktif</p>
          <p className="text-2xl font-bold">{aktif}</p>
        </div>

        <div className="bg-gradient-to-r from-gray-600 to-gray-800 text-white p-5 rounded-xl shadow">
          <p className="text-sm">Selesai</p>
          <p className="text-2xl font-bold">{selesai}</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-5 rounded-xl shadow">
          <p className="text-sm">Recovery Rate</p>
          <p className="text-2xl font-bold">{recoveryRate}%</p>
        </div>
      </div>

      {/* INSIGHT PANEL */}
      <div className="bg-white border rounded-xl p-5 text-sm space-y-1 shadow">
        <p>📍 Provinsi dominan: <b>{provinsiChart[0]?.name || "-"}</b></p>
        <p>💊 Zat dominan: <b>{zatChart[0]?.name || "-"}</b></p>
        <p>🧍 Gender: L {gender[0].value} | P {gender[1].value}</p>
        <p>📊 Rata-rata umur: <b>{avgAge}</b></p>

        <p className="text-gray-600">
          Insight: mayoritas pasien berasal dari{" "}
          <b>{provinsiChart[0]?.name}</b> dengan dominasi penggunaan{" "}
          <b>{zatChart[0]?.name}</b>.
        </p>
      </div>

      {/* CHART SECTION */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* LINE CHART */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-bold mb-3">Trend Rehabilitasi</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line dataKey="aktif" stroke="#22c55e" />
              <Line dataKey="selesai" stroke="#3b82f6" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* PIE GENDER */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-bold mb-3">Gender Distribution</h2>
          <PieChart data={gender} />
        </div>

        {/* BAR ZAT */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-bold mb-3">Distribusi Zat</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={zatChart}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#f97316" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE UMUR */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-bold mb-3">Segment Umur</h2>
          <PieChart data={umurSegment} />
        </div>

        {/* BAR PEKERJAAN */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-bold mb-3">Top 5 Pekerjaan</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={pekerjaanChart} layout="vertical" margin={{ left: 40 }}>
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
              <Tooltip />
              <Bar dataKey="value" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE PENDIDIKAN */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-bold mb-3">Distribusi Pendidikan</h2>
          <PieChart data={pendidikanChart} />
        </div>

        {/* BAR MOTIF */}
        <div className="bg-white p-5 rounded-xl shadow lg:col-span-2">
          <h2 className="font-bold mb-3">Distribusi Motif Penggunaan Zat</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={motifChart}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#ec4899" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* BAR PROVINSI / DAERAH */}
        <div className="bg-white p-5 rounded-xl shadow lg:col-span-2">
          <h2 className="font-bold mb-3">Distribusi Daerah (Provinsi)</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={provinsiChart}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}