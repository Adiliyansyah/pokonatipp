"use client";

import AntreanAktifTable from "@/components/jadwaldokter";
import StatusDokterCard from "@/components/ringkasandokter";

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

      <div className="p-6 py-18 space-y-3">

        {/* ====================== */}
        {/* HEADER */}
        {/* ====================== */}

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Status Dokter
          </h1>

          <p className="text-gray-500 text-sm">
            Senin, 26 Mei 2025 • Sesi Pagi
          </p>
        </div>

        {/* ====================== */}
        {/* KPI CARDS */}
        {/* ====================== */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 ">

        </div>

        {/* ====================== */}
        {/* TABEL ANTREAN & DOKTER */}
        {/* ====================== */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

          {/* ANTREAN */}
          <div className="xl:col-span-2 bg-white rounded-2xl p-5 shadow-sm">

            <div className="flex items-center justify-between p-5">

              <h2 className="text-lg font-semibold text-gray-800">
                Jadwal & status dokter
              </h2>

            </div>

            <AntreanAktifTable />

          </div>

          {/* STATUS DOKTER */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">

            <div className="flex items-center justify-between p-5">

              <h2 className="text-lg font-semibold text-gray-800">
                Ringkasan pasien per dokter
              </h2>


            </div>

            <StatusDokterCard />

          </div>

        </div>

      </div>

    </div>
  );
}