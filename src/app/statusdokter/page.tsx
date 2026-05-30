"use client";

import { useEffect, useState } from "react";
import TabelShiftPetugas from "@/components/tabelshiftpetugas";
import TabelTurnover from "@/components/tabelturnover";
// ======================
// TYPE DATA
// ======================
type Client = {
  id: number;
  INISIAL: string | null;
  GENDER: string | null;
  UMUR: number | null;
  TANGGAL_MASUK: string | null;
  TANGGAL_KELUAR: string | null;
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
      } catch (error) {
        console.error(error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ======================
  // KPI
  // ======================
  const total = data.length;

  const aktif = data.filter(
    (item) =>
      !item.TANGGAL_KELUAR ||
      item.TANGGAL_KELUAR === "-" ||
      item.TANGGAL_KELUAR === ""
  ).length;

  const selesai = data.filter(
    (item) =>
      item.TANGGAL_KELUAR &&
      item.TANGGAL_KELUAR !== "-" &&
      item.TANGGAL_KELUAR !== ""
  ).length;

  const antreanAktif = data.filter(
    (item) =>
      !item.TANGGAL_KELUAR ||
      item.TANGGAL_KELUAR === "-" ||
      item.TANGGAL_KELUAR === ""
  );

  if (loading) {
    return (
      <div className="p-6 text-gray-500">
        Loading dashboard...
      </div>
    );
  }

return (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">
          Antrean Aktif
        </h2>

        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
          Lihat Semua →
        </button>
      </div>

      <TabelShiftPetugas />
    </div>

    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">
          Status Dokter hari ini
        </h2>

        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
          Kelola →
        </button>
      </div>

      <TabelTurnover />
    </div>
  </div>
);
}