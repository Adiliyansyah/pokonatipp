"use client";


import { RxPeople } from "react-icons/rx";
import { MdOutlineTrendingUp } from "react-icons/md";
import { MdOutlineTrendingDown } from "react-icons/md";
import BarChart from "@/components/barchart";
import TabelKapasitas from "@/components/tabelkapasitas"
import { LuBuilding2 } from "react-icons/lu";
import { GoPulse } from "react-icons/go";

export default function OverviewPage() {
    return (
    <div className="p-6">

      {/* Header */}
        <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">
            Kapasitas & Hunian Fasilitas
        </h1>
        <p className="text-sm text-gray-500">
            Monitorung kapasitas dan tingkat hunian per fase
        </p>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-6">

            {/* Card 1 */}
            <div className="bg-linear-to-r from-blue-500 to-teal-300 p-6 rounded-xl shadow">
            {/* Icon Kanan & Kiri*/}
            <div className="flex justify-between items-start">
            {/*Icon Kiri*/}
            <div className="p-3">
                <LuBuilding2 className="text-white text-5xl"/>
            </div>
            </div>
            <h1 className="text-3xl font-bold p-3 text-white text-left">
            115
            </h1>
            <p className="text-sm-2xl text-white">
            Total Kapasitas
            </p>
        </div>

        {/* Card 2 */}
            <div className="bg-linear-to-r from-green-400 to-green-700 p-6 rounded-xl shadow">
            {/* Icon Kanan & Kiri*/}
            <div className="flex justify-between items-start">
            {/*Icon Kiri*/}
            <div className= "p-3">
                <MdOutlineTrendingUp className="text-white text-5xl"/>
            </div>
            </div>
            <h1 className="text-3xl font-bold p-3 text-white text-left">
            61
            </h1>
            <p className="text-sm-2xl text-white">
            TPOP 2026
            </p>
        </div>


        {/* Card 3 */}
            <div className="bg-linear-to-r from-yellow-400 to-orange-400 p-6 rounded-xl shadow">
            {/* Icon Kanan & Kiri*/}
            <div className="flex justify-between items-start">
            {/*Icon Kiri*/}
            <div className="p-3">
                <LuBuilding2 className="text-white text-5xl"/>
            </div>
            </div>
            <h1 className="text-3xl font-bold p-3 text-white text-left">
            34
            </h1>
            <p className="text-sm-2xl text-white">
            Tempat Kosong
            </p>
        </div>


        {/* Card 4 */}
            <div className="bg-linear-to-r from-purple-600 to-pink-500 p-6 rounded-xl shadow">
            {/* Icon Kanan & Kiri*/}
            <div className="flex justify-between items-start">
            {/*Icon Kiri*/}
            <div className="p-1">
                <GoPulse className="text-white text-5xl"/>
            </div>
            </div>
            <h1 className="text-3xl font-bold p-3 text-white text-left">
            53%
            </h1>
            <p className="text-sm-2xl text-white">
            Tingkat Hunian
            </p>
        </div>

    </div>
<div className="mt-6 min-w-[1200px] bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold p-3 text-black text-center">
                    TPOP HARIAN
                </h1>
                <div className="bg-yellow-200 p-1 rounded-xl shadow">
            {/* Icon Kanan & Kiri*/}
            <div className="flex justify-between items-start">
            {/*Icon Kiri*/}
            </div>
            <h1 className="text-2xl font-bold p-3 text-gray-800 text-center">
            Jumat, 13 Maret 2026
            </h1>
        </div>
        {/* Tabel 2 */}
        <div>
            <main className="w-full">
            <TabelKapasitas />
            </main>
            <p className="text-sm test-gray">
            Total:{" "} 
            <span className="text-bold text-orange-600">
                5 Klien </span>{" "} mengalami relapse
            </p>
        </div>
        </div>

        <div className="w-full p-4">
        {/* Card 3 */}
        <div className="bg-white p-6 rounded-xl shadow">
            {/* Icon Kanan & Kiri*/}
            <div className="flex justify-between items-start">
            <main>
                <h1 className="text-xl font-bold text-center">
                Diagram Batang
                </h1>
                <BarChart />
            </main>
            </div>
            <h1 className="text-2xl font-bold p-3 text-gray-800 text-left">
            247
            </h1>
            <p className="text-sm test-grey">
            Total Klien Aktif
            </p>
        </div>
        </div>
    </div>
    );
}

