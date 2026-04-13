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
  const aktif = useMemo(() => data.filter((d) => !d.TANGGAL_KELUAR || d.TANGGAL_KELUAR === "").length, [data]);
  const selesai = total - aktif;
  const recoveryRate = total ? ((selesai / total) * 100).toFixed(1) : 0;
  const avgAge = total > 0 ? (data.reduce((a, b) => a + (b.UMUR || 0), 0) / total).toFixed(1) : 0;

  // ======================
  // GENDER & UMUR
  // ======================
  const gender = useMemo(() => {
    const l = data.filter((d) => d.GENDER === "Laki-Laki" || d.GENDER === "L").length;
    const p = data.filter((d) => d.GENDER === "Perempuan" || d.GENDER === "P").length;
    return [{ name: "Laki-laki", value: l }, { name: "Perempuan", value: p }];
  }, [data]);

  const umurSegment = useMemo(() => {
    const safe = (n: number | null) => n ?? 0;
    return [
      { name: "<25", value: data.filter((d) => safe(d.UMUR) < 25).length },
      { name: "25-40", value: data.filter((d) => safe(d.UMUR) >= 25 && safe(d.UMUR) <= 40).length },
      { name: ">40", value: data.filter((d) => safe(d.UMUR) > 40).length },
    ];
  }, [data]);

  const kategoriUsiaChart = useMemo(() => {
    const map: Record<string, number> = {};
    data.forEach((d) => {
      const val = d.KATEGORI_USIA || "Tidak Diketahui";
      map[val] = (map[val] || 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [data]);

  // ======================
  // KETERANGAN / STATUS PASIEN & RENCANA REHAB
  // ======================
  const statusChart = useMemo(() => {
    const map: Record<string, number> = {};
    data.forEach((d) => {
      const val = d["KETERANGAN/STATUS"] || "Tidak Diketahui";
      map[val] = (map[val] || 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [data]);

  const rencanaRehabChart = useMemo(() => {
    const map: Record<string, number> = {};
    data.forEach((d) => {
      const val = d.RENCANA_REHAB || "Tidak Diketahui";
      map[val] = (map[val] || 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [data]);

  // ======================
  // ZAT & MOTIF
  // ======================
  const zatChart = useMemo(() => {
    const map: Record<string, number> = {};
    data.forEach((d) => {
      if (!d.PENGGUNAAN_ZAT || d.PENGGUNAAN_ZAT.trim() === "") {
        map["Unknown"] = (map["Unknown"] || 0) + 1;
      } else {
        d.PENGGUNAAN_ZAT.split(",").forEach((zat) => {
          const cleanZat = zat.trim();
          if (cleanZat) map[cleanZat] = (map[cleanZat] || 0) + 1;
        });
      }
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([name, value]) => ({ name, value }));
  }, [data]);

  const motifChart = useMemo(() => {
    const map: Record<string, number> = {};
    data.forEach((d) => {
      if (!d.MOTIF_PENGGUNAAN || d.MOTIF_PENGGUNAAN.trim() === "") return;
      d.MOTIF_PENGGUNAAN.split(",").forEach((motif) => {
        const cleanMotif = motif.trim();
        if (cleanMotif) map[cleanMotif] = (map[cleanMotif] || 0) + 1;
      });
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, value]) => ({ name, value }));
  }, [data]);

  // ======================
  // PENDIDIKAN, PEKERJAAN & PROVINSI
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

  const provinsiChart = useMemo(() => {
    const map: Record<string, number> = {};
    data.forEach((d) => {
      const key = d.ASAL_PROVINSI || "Unknown";
      map[key] = (map[key] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, value]) => ({ name, value }));
  }, [data]);

  // ======================
  // TREND REHABILITASI (DINAMIS DARI DATABASE)
  // ======================
  const trend = useMemo(() => {
    const map: Record<string, { name: string; Pasien_Masuk: number; Pasien_Selesai: number }> = {};

    data.forEach((d) => {
      // Hitung Pasien Masuk berdasarkan TANGGAL_MASUK (Format YYYY-MM)
      if (d.TANGGAL_MASUK && d.TANGGAL_MASUK.length >= 7) {
        const month = d.TANGGAL_MASUK.substring(0, 7); 
        if (!map[month]) map[month] = { name: month, Pasien_Masuk: 0, Pasien_Selesai: 0 };
        map[month].Pasien_Masuk += 1;
      }
      
      // Hitung Pasien Selesai berdasarkan TANGGAL_KELUAR (Format YYYY-MM)
      if (d.TANGGAL_KELUAR && d.TANGGAL_KELUAR.length >= 7 && d.TANGGAL_KELUAR !== "-") {
        const month = d.TANGGAL_KELUAR.substring(0, 7);
        if (!map[month]) map[month] = { name: month, Pasien_Masuk: 0, Pasien_Selesai: 0 };
        map[month].Pasien_Selesai += 1;
      }
    });

    // Ubah Object ke Array dan urutkan berdasarkan waktu/bulan dari yang paling lama
    return Object.values(map).sort((a, b) => a.name.localeCompare(b.name));
  }, [data]);

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
        <p>👥 Gender: L {gender[0].value} | P {gender[1].value}</p>
        <p>🎯 Rata-rata umur: <b>{avgAge}</b></p>

        <p className="text-gray-600 mt-2">
          Insight: mayoritas pasien berasal dari{" "}
          <b>{provinsiChart[0]?.name}</b> dengan dominasi penggunaan{" "}
          <b>{zatChart[0]?.name}</b>.
        </p>
      </div>

      {/* CHART SECTION */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* LINE CHART TREND (DINAMIS) */}
        <div className="bg-white p-5 rounded-xl shadow lg:col-span-2">
          <h2 className="font-bold mb-1">Trend Rehabilitasi (Berdasarkan Bulan)</h2>
          <p className="text-xs text-gray-500 mb-4">Grafik perbandingan jumlah pasien yang masuk rehabilitasi dengan yang selesai per bulannya.</p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="Pasien_Masuk" stroke="#22c55e" strokeWidth={2} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="Pasien_Selesai" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* PIE STATUS/KETERANGAN LENGKAP */}
        <div className="bg-white p-5 rounded-xl shadow lg:col-span-2">
          <h2 className="font-bold mb-3">Distribusi Keterangan / Status Pasien</h2>
          <div className="grid md:grid-cols-2 gap-4 items-center">
            <PieChart data={statusChart} />
            <div className="text-xs text-gray-600 space-y-3 bg-blue-50 p-4 rounded-lg border border-blue-100">
              <p><b>Voluntary:</b> Rehabilitasi dilakukan atas kemauan sendiri tanpa keterlibatan proses hukum.</p>
              <p><b>TAT (Voluntary):</b> Rehabilitasi sukarela yang didahului asesmen resmi oleh Tim Asesmen Terpadu untuk menentukan kebutuhan penanganan.</p>
              <p><b>Compulsory:</b> Rehabilitasi wajib yang dijalani berdasarkan perintah hukum sebagai bagian dari proses pidana.</p>
            </div>
          </div>
        </div>

        {/* PIE KATEGORI USIA NEW */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-bold mb-3">Distribusi Kategori Usia</h2>
          <PieChart data={kategoriUsiaChart} />
        </div>

        {/* PIE RENCANA REHAB NEW */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-bold mb-3">Distribusi Rencana Rehab</h2>
          <PieChart data={rencanaRehabChart} />
        </div>

        {/* PIE GENDER */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-bold mb-3">Gender Distribution</h2>
          <PieChart data={gender} />
        </div>

        {/* PIE UMUR */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-bold mb-3">Segment Umur</h2>
          <PieChart data={umurSegment} />
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

        {/* PIE PENDIDIKAN */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-bold mb-3">Distribusi Pendidikan</h2>
          <PieChart data={pendidikanChart} />
        </div>

        {/* BAR PEKERJAAN */}
        <div className="bg-white p-5 rounded-xl shadow lg:col-span-2">
          <h2 className="font-bold mb-3">Top Pekerjaan</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pekerjaanChart} layout="vertical" margin={{ left: 40 }}>
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={150} tick={{fontSize: 12}} />
              <Tooltip />
              <Bar dataKey="value" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
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