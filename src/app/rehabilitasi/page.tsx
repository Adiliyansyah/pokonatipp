"use client";


import { RxPeople } from "react-icons/rx";
import { MdOutlineTrendingUp } from "react-icons/md";
import { MdOutlineTrendingDown } from "react-icons/md";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import PieChart from "@/components/piecharts"
import TabelKeberhasilan from "@/components/tabelkeberhasilan";
import TabelRelapse from "@/components/tabelrelapse";
import TabelSelesaiRehab from "@/components/selesairehab";

const data = [
    {name: "Jan", value: 20},
    {name: "feb", value: 30},
    {name: "Mar", value: 40},
    {name: "Apr", value: 50},
    {name: "Mei", value: 60},
];


export default function OverviewPage() {
    return (
    <div className="p-6">

      {/* Header */}
        <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">
            Data Rehabilitas Klien
        </h1>
        <p className="text-sm text-gray-500">
            Informasi lengkap tentang klien yang sedang menjalani rehabilitasi
        </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">

            {/* Card 1 */}
            <div className="bg-linear-to-r from-blue-500 to-teal-300 p-6 rounded-xl shadow">
            {/* Icon Kanan & Kiri*/}
            <div className="flex justify-between items-start">
            {/*Icon Kiri*/}
            <div className="p-1">
                <RxPeople className="text-white text-5xl"/>
            </div>
            </div>
            <h1 className="text-3xl font-bold p-3 text-white text-left">
            247
            </h1>
            <p className="text-sm-2xl text-white">
            Total Klien Aktif
            </p>
        </div>

        {/* Card 2 */}
            <div className="bg-linear-to-r from-green-300 to-green-600 p-6 rounded-xl shadow">
            {/* Icon Kanan & Kiri*/}
            <div className="flex justify-between items-start">
            {/*Icon Kiri*/}
            <div className= "p-1">
                <MdOutlineTrendingUp className="text-white text-5xl"/>
            </div>
            
            </div>
            <h1 className="text-3xl font-bold p-3 text-white text-left">
            194
            </h1>
            <p className="text-sm-2xl text-white">
            Klien Sembuh
            </p>
        </div>


        {/* Card 3 */}
            <div className="bg-linear-to-r from-orange-700 to-orange-400 p-6 rounded-xl shadow">
            {/* Icon Kanan & Kiri*/}
            <div className= "p-1">
                <MdOutlineTrendingDown className="text-white text-5xl"/>
            </div>
            <h1 className="text-3xl font-bold p-3 text-white text-left">
            30
            </h1>
            <p className="text-sm-2xl text-white">
            Kasus Relapse
            </p>
        </div>

    </div>

        <div className="grid grid-cols-2 gap-4 mt-6">

            {/* Card 1 */}
            <div className="bg-white p-6 rounded-xl shadow">
                <h1 className="text-2xl font-bold p-3 text-gray-800 text-left">
                    Tren rehabilitasi
                </h1>
            {/* Icon Kanan & Kiri*/}
            <div className="flex justify-center">
                <div className="w-full h-64">
                <ResponsiveContainer>
                    <LineChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            </div>
            <div className="flex justify-center">
            <p className="text-sm text-green-600">
            Sembuh
            </p>
            <p className="text-sm text-orange-600">
            Relapse
            </p>
            </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-xl shadow">
            {/* Icon Kanan & Kiri*/}
            <div className="flex justify-between items-start">
            <main>
            <h1 className="text-xl font-bold text-left">
                Distribusi Gender
            </h1>
            <PieChart />
            </main>
            </div>
        </div>
        <div>
        <div className="mt-6 min-w-[1185px] bg-white p-6 rounded-xl shadow">
            <h1 className="text-2xl font-bold p-3 text-green-500 text-left">
                    A. Tingkat Keberhasilan Rehabilitasi Klien (Pulih)
                </h1>
         {/* Tabel 1 */}
        <div>
            <main className="w-full">
            <TabelKeberhasilan />
            </main>
            <p className="text-sm test-gray">
            Total:{" "} 
            <span className="text-bold text-green-400">
                8 Klien </span>{" "} berhasil pulih dari rehabilitasi
            </p>
        </div>
        </div>

        <div className="mt-6 min-w-[1185px] bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold p-3 text-orange-700 text-left">
                    B. Tingkat Relapse (Kambuh Kembali) Klien
                </h1>
        {/* Tabel 2 */}
        <div>
            <main className="w-full">
            <TabelRelapse />
            </main>
            <p className="text-sm test-gray">
            Total:{" "} 
            <span className="text-bold text-orange-600">
                5 Klien </span>{" "} mengalami relapse
            </p>
        </div>
        </div>

        <div className="mt-6 min-w-[1185px] bg-white p-6 rounded-xl shadow">
            <h1 className="text-2xl font-bold p-3 text-blue-500 text-left">
                    C. Jumlah Klien yang Menyelesaikan Program Rehabilitasi (Pulih)
                </h1>
         {/* Tabel 1 */}
        <div>
            <main className="w-full">
            <TabelSelesaiRehab />
            </main>
            <p className="text-sm test-gray">
            Total:{" "} 
            <span className="text-bold text-blue-500">
                6 Klien </span>{" "} menyelesaikan program rehabilitasi
            </p>
        </div>
        </div>
        </div>
        </div>



        
    </div>
    );
}

