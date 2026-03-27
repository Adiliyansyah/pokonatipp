"use client";


import { RxPeople } from "react-icons/rx";
import { MdOutlineTrendingUp } from "react-icons/md";
import { MdOutlineTrendingDown } from "react-icons/md";
import TabelPetugas from "@/components/tabelpetugaslayanan"
import TabelShiftPetugas from "@/components/tabelshiftpetugas"


export default function OverviewPage() {
    return (
    <div className="p-6">

      {/* Header */}
        <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
            DATA SUMBER DAYA MANUSIA
        </h1>
        <p className="text-sm font-semibold text-black text-center">
            BALAI REHABILITASI NARKOTIKA TANAH MERAH
        </p>
        <p className="text-sm font-semibold text-grey-300 text-center">
            TAHUN 2025
        </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">

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
            68
            </h1>
            <p className="text-sm-2xl text-white">
            Total Petugas Rehabilitasi
            </p>
        </div>

        {/* Card 2 */}
            <div className="bg-linear-to-r from-green-300 to-green-500 p-6 rounded-xl shadow">
            {/* Icon Kanan & Kiri*/}
            <div className="flex justify-between items-start">
            {/*Icon Kiri*/}
            <div className= "p-1">
                <MdOutlineTrendingUp className="text-white text-5xl"/>
            </div>
            </div>
            <h1 className="text-3xl font-bold p-3 text-white text-left">
            78.5%
            </h1>
            <p className="text-sm-2xl text-white">
            TPOP 2026
            </p>
        </div>


        {/* Card 3 */}
            <div className="bg-linear-to-r from-purple-600 to-pink-500 p-6 rounded-xl shadow">
            {/* Icon Kanan & Kiri*/}
            <div className="flex justify-between items-start">
            {/*Icon Kiri*/}
            <div className="p-1">
                <MdOutlineTrendingDown className="text-white text-5xl"/>
            </div>
            </div>
            <h1 className="text-3xl font-bold p-3 text-white text-left">
            247
            </h1>
            <p className="text-sm-2xl text-white">
            Total Klien Aktif
            </p>
        </div>

    </div>

    <div className="mt-6 min-w-[1200px] bg-white p-6 rounded-xl shadow">
            <h1 className="text-2xl font-bold p-3 text-black text-center">
                        JUMLAH PETUGAS LAYANAN REHABILITASI
                    </h1>
            {/* Tabel 2 */}
            <div>
                <main className="w-full">
                <TabelPetugas />
                </main>
            </div>
            </div>
    

        <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="mt-6 w-full bg-white p-6 rounded-xl shadow">
            <h1 className="text-xl font-bold p-3 text-black text-center">
                        JUMLAH SHIFT PETUGAS
                    </h1>
         {/* Tabel 1 */}
        <div>
            <main className="w-full">
            <TabelShiftPetugas />
            </main>
        </div>
        </div>

        <div className="mt-6 w-full bg-white p-6 rounded-xl shadow">
            <h1 className="text-xl font-bold p-3 text-black text-center">
                        TURN OVER
                    </h1>
         {/* Tabel 1 */}
        <div>
            <main className="w-full">
            <TabelShiftPetugas />
            </main>
        </div>
        </div>

        </div>

        </div>
    );
}

