"use client";

import AntreanAktifTable from "@/components/antreanaktiftable";
import { RxPeople } from "react-icons/rx";
import { RxSpeakerLoud } from "react-icons/rx";

  export default function BerandaPage() {
  return (
    <div className="w-full h-screen bg-gray-300 pt-22 py-20 px-5">
      <div>
        <div className= "flex items-center gap-2">
          <RxSpeakerLoud className="text-green-600 text-xl" />
        <p className="text-green-700 text-sm">
            Antrian aktif saat ini. No.015 Siti Rahayu. Tekan "Panggil" untuk memanggil pasien berikutnya. 
          </p>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 py-3">
            Daftar antrean poli
          </h1>
        </div>

      <div className="flex justify-between items-center p-2">
          <h2 className="text-lg font-semibold text-gray-800">
                Antrean Aktif
              </h2>
              <div className="flex items-center gap-2">
              <RxPeople className="text-green-600 text-3xl" />
              <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                Pasien Baru
              </button>
            </div>
            </div>

        {/* ANTREAN */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm flex flex-col">

          {/* Isi tabel memenuhi sisa ruang */}
          <div className="flex-1 overflow-auto px-5 pb-5">
            <AntreanAktifTable />
          </div>

        </div>

      </div>
  );
}