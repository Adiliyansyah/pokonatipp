"use client";

import { useEffect, useState } from "react";
import TabelShiftPetugas from "@/components/tabelshiftpetugas";
import TabelTurnover from "@/components/tabelturnover";
import { RxPeople } from "react-icons/rx";
import { LuClock4 } from "react-icons/lu";
import { LuDoorOpen } from "react-icons/lu";
import { LuClock1 } from "react-icons/lu";
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
    <div className=" py-12 w-full min-h-screen bg-gray-100">
      <div className="p-6 space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            OPD Administration Dashboard
          </h1>
          <p className="text-gray-500 text-sm">
            Monitoring data klien rehabilitasi
          </p>
        </div>


        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-xl shadow border">
            <RxPeople className="text-green-500 text-5xl mb-2" />
            <p className="text-3xl font-bold text-green-600">
              {total}
            </p>
            <p className="text-sm text-gray-500">Total antrean hari ini</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow border">
            <LuDoorOpen className="text-blue-600 text-5xl mb-2" />
    
            <p className="text-3xl font-bold text-blue-600">
              {aktif}
            </p>
            <p className="text-sm text-gray-500">
              Sedang diperiksa
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow border">
            <LuClock1 className="text-orange-600 text-5xl mb-2" />
            <p className="text-3xl font-bold text-orange-600">
              {selesai}
            </p>
            <p className="text-sm text-orange-600">
              Menunggu dipanggil
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow border">
            <LuClock4 className="text-gray-500 text-5xl mb-2" />
            <p className="text-3xl font-bold text-gray-500">
              {selesai}
            </p>
            <p className="text-sm text-gray-500">
              Selesai
            </p>
          </div>

        </div>

        {/* TABEL ANTREAN AKTIF */}
        {/* Tabel Shift & Turnover */}
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

      </div>
    </div>
  );
}