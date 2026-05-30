"use client";

import { RxPeople } from "react-icons/rx";
import { LuDoorOpen } from "react-icons/lu";
import { LuClock1 } from "react-icons/lu";
import { LuClock4 } from "react-icons/lu";

import StatCard from "@/components/statcard";
import AntreanAktifTable from "@/components/bebanantrian";
import StatusDokterCard from "@/components/statusdoktercard";

export default function BerandaPage() {

  // ======================
  // DUMMY KPI
  // Nanti ganti dari API
  // ======================

  const totalAntrean = 5;
  const sedangDiperiksa = 1;
  const menunggu = 3;
  const selesai = 1;

  return (
    <div className="w-full min-h-screen bg-gray-300">

      <div className="p-6 py-18 space-y-6">

        {/* ====================== */}
        {/* HEADER */}
        {/* ====================== */}

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Beranda
          </h1>

          <p className="text-gray-500 text-sm">
            Senin, 26 Mei 2025 • Sesi Pagi
          </p>
        </div>

        {/* ====================== */}
        {/* KPI CARDS */}
        {/* ====================== */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 ">

          <StatCard 
            icon={
              <RxPeople className="text-green-600 text-3xl" />
            }
            value={totalAntrean.toString()}
            label="Total antrean hari ini"
            color="text-green-600"
          />

          <StatCard
            icon={
              <LuDoorOpen className="text-blue-600 text-3xl" />
            }
            value={sedangDiperiksa.toString()}
            label="Sedang diperiksa"
            color="text-blue-600"
          />

          <StatCard
            icon={
              <LuClock1 className="text-orange-500 text-3xl" />
            }
            value={menunggu.toString()}
            label="Menunggu dipanggil"
            color="text-orange-500"
          />

          <StatCard
            icon={
              <LuClock4 className="text-gray-500 text-3xl" />
            }
            value={selesai.toString()}
            label="Selesai"
            color="text-gray-500"
          />

        </div>

        {/* ====================== */}
        {/* TABEL ANTREAN & DOKTER */}
        {/* ====================== */}

        <div className="w-full h-screen bg-gray-300 py-3 px-2">

          {/* ANTREAN */}
          <div className="xl:col-span-2 bg-white rounded-2xl p-5 shadow-sm">

            <div className="flex items-center justify-between p-5">

              <h2 className="text-lg font-semibold text-gray-800">
                Beban antrean per poli
              </h2>

            </div>

            <AntreanAktifTable />

          </div>


        </div>

      </div>

    </div>
  );
}