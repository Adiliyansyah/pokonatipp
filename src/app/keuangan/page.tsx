"use client";


import { RxPeople } from "react-icons/rx";
import { MdOutlineTrendingUp } from "react-icons/md";
import TabelKeuangan from "@/components/tabelkeuangan"


export default function OverviewPage() {
    return (
    <div className="p-6">

      {/* Header */}
        <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">
            DATA KEUANGAN
        </h1>
        <h2 className="text-2xl font-bold text-gray-800">
            BALAI RHABILITASI NARKOTIKA TANAH MERAH
        </h2>
        <p className="text-sm text-gray-500">
            TAHUN ANGGARAN 2025
        </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">

            {/* Card 1 */}
            <div className="bg-linear-to-r from-blue-800 to-blue-300 p-6 rounded-xl shadow">
            {/* Icon Kanan & Kiri*/}
            <div className="flex justify-between items-start">
            {/*Icon Kiri*/}
            <div className="p-1">
                <RxPeople className="text-white text-5xl"/>
            </div>
            </div>
            <h1 className="text-3xl font-bold p-3 text-white text-left">
            Rp 4.743.000
            </h1>
            <p className="text-sm-2xl text-white">
            Rata-rata Biaya Per Orang
            </p>
        </div>

        {/* Card 2 */}
            <div className="bg-linear-to-r from-green-400 to-green-600 p-6 rounded-xl shadow">
            {/* Icon Kanan & Kiri*/}
            <div className="flex justify-between items-start">
            {/*Icon Kiri*/}
            <div className= "p-1">
                <MdOutlineTrendingUp className="text-white text-5xl"/>
            </div>
            </div>
            <h1 className="text-3xl font-bold p-3 text-white text-left">
            100%
            </h1>
            <p className="text-sm-2xl text-white">
            Realisasi Anggaran
            </p>
        </div>

    </div>

        <div className="mt-6 min-w-[1200px] bg-white p-2 rounded-xl shadow">
            <h1 className="text-2xl font-bold p-3 text-black text-center">
                        RATA-RATA BIAYA RAHABILITASI NARKOBA RAWAT INAP DI BALAI REHABILITASI BNN 
                        TANAH MERAH T.A. 2025
                    </h1>
            {/* Tabel 2 */}
            <div>
                <main className="w-full">
                <TabelKeuangan />
                </main>
            </div>
            </div>
    </div>
    );
}

