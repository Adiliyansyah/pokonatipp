"use client";


import { RxPeople } from "react-icons/rx";
import { MdOutlineTrendingUp } from "react-icons/md";
import { MdOutlineTrendingDown } from "react-icons/md";
import TabelLamaLAyanan from "@/components/tabellamalayanan"
import TabelPengukuranKepuasan from "@/components/pengukurankepuasan"

export default function OverviewPage() {
    return (
    <div className="p-6">

      {/* Header */}
        <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">
            Kepuasan Layanan
        </h1>
        <p className="text-sm text-gray-500">
            Monitoring kepuasan dan kualitas Layanan
        </p>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-6">

            {/* Card 1 */}
            <div className="bg-linear-to-r from-green-400 to-green-600 p-6 rounded-xl shadow">
            {/* Icon Kanan & Kiri*/}
            <div className="flex justify-between items-start">
            {/*Icon Kiri*/}
            <div className="p-3">
                <RxPeople className="text-white text-xl"/>
            </div>
            </div>
            <h1 className="text-2xl font-bold p-3 text-white text-left">
            3.74
            </h1>
            <p className="text-sm text-white">
            IKM Rawat Jalan
            </p>
        </div>

        {/* Card 2 */}
            <div className="bg-linear-to-r from-purple-600 to-pink-500 p-6 rounded-xl shadow">
            {/* Icon Kanan & Kiri*/}
            <div className="flex justify-between items-start">
            {/*Icon Kiri*/}
            <div className= "p-3">
                <MdOutlineTrendingUp className="text-white text-xl"/>
            </div>
            </div>
            <h1 className="text-2xl font-bold p-3 text-white text-left">
            3.72
            </h1>
            <p className="text-sm text-white">
            IKM Rawat Inap
            </p>
        </div>


        {/* Card 3 */}
            <div className="bg-linear-to-r from-yellow-300 to-orange-400 p-6 rounded-xl shadow">
            {/* Icon Kanan & Kiri*/}
            <div className="flex justify-between items-start">
            {/*Icon Kiri*/}
            <div className="p-3">
                <MdOutlineTrendingDown className="text-white text-xl"/>
            </div>
            </div>
            <h1 className="text-2xl font-bold p-3 text-white text-left">
            88.79%
            </h1>
            <p className="text-sm text-white">
            Presentase Kualitas Hidup
            </p>
        </div>


        {/* Card 4 */}
            <div className="bg-linear-to-r from-blue-700 to-blue-400 p-6 rounded-xl shadow">
            {/* Icon Kanan & Kiri*/}
            <div className="flex justify-between items-start">
            {/*Icon Kiri*/}
            <div className="p-3">
                <RxPeople className="text-white text-xl"/>
            </div>
            </div>
            <h1 className="text-2xl font-bold p-3 text-white text-left">
            4.00
            </h1>
            <p className="text-sm text-white">
            IKR
            </p>
        </div>

    </div>

    <div className="mt-6 min-w-[1200px] bg-white p-6 rounded-xl shadow">
                <h1 className="text-2xl font-bold p-3 text-black text-center">
                            Lama Layanan
                        </h1>
                {/* Tabel 2 */}
                <div>
                    <main className="w-full">
                    <TabelLamaLAyanan />
                    </main>
                </div>
                </div>

                <div className="mt-6 min-w-[1200px] bg-white p-6 rounded-xl shadow">
                <h1 className="text-2xl font-bold p-3 text-black text-center">
                            HASIL PENGUKURAN KEPUASAN PENERIMA LAYANAN REHABILITAS, PENGUKURAN KAPABILITAS REHABILITASI (IKR), DAN PRESENTASE KUALITAS HIDUP T.A 2025
                        </h1>
                {/* Tabel 2 */}
                <div>
                    <main className="w-full">
                    <TabelPengukuranKepuasan />
                    </main>
                    <p className="text-sm test-gray">
                    Berdasarkan Surat Kepala BNN No: B/136/I/DE/RH/2026/BNN
                    </p>
                </div>
                </div>
    </div>
    );
}

