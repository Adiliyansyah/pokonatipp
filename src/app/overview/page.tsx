"use client";


import { RxPeople } from "react-icons/rx";
import { MdOutlineTrendingUp } from "react-icons/md";
import { MdOutlineTrendingDown } from "react-icons/md";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import PieChart from "@/components/piecharts"
import BarChart from "@/components/barchart";
import HorizontalBarChart from "@/components/horizontalbarchart";

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
            Overview Dashboard
        </h1>
        <p className="text-sm text-gray-500">
            Ringkasan data dan metrik utama fasilitas rehabilitasi
        </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">

            {/* Card 1 */}
            <div className="bg-white p-6 rounded-xl shadow">
            {/* Icon Kanan & Kiri*/}
            <div className="flex justify-between items-start">
            {/*Icon Kiri*/}
            <div className="bg-linear-to-r from-blue-400 to-teal-300 p-3 w-10 h-10 rounded-lg">
                <RxPeople className="text-white text-xl"/>
            </div>
            <div className="flex justify-between items-start">
            <MdOutlineTrendingUp className="text-green-600 cursor-pointer" />
            <p className="text-sm text-green-600">
            +12%
            </p>
            </div>
            </div>
            <h1 className="text-2xl font-bold p-3 text-gray-800 text-left">
            247
            </h1>
            <p className="text-sm test-grey">
            Total Klien Aktif
            </p>
        </div>

        {/* Card 2 */}
            <div className="bg-white p-6 rounded-xl shadow">
            {/* Icon Kanan & Kiri*/}
            <div className="flex justify-between items-start">
            {/*Icon Kiri*/}
            <div className="bg-green-600 p-3 w-10 h-10 rounded-lg">
                <MdOutlineTrendingUp className="text-white text-xl"/>
            </div>
            <div className="flex justify-between items-start">
            <MdOutlineTrendingUp className="text-green-600 cursor-pointer" />
            <p className="text-sm text-green-600">
            +5.2%
            </p>
            </div>
            </div>
            <h1 className="text-2xl font-bold p-3 text-gray-800 text-left">
            78.5%
            </h1>
            <p className="text-sm test-grey">
            Tingkat Kesembuhan
            </p>
        </div>


        {/* Card 3 */}
            <div className="bg-white p-6 rounded-xl shadow">
            {/* Icon Kanan & Kiri*/}
            <div className="flex justify-between items-start">
            {/*Icon Kiri*/}
            <div className="bg-orange-600 p-3 w-10 h-10 rounded-lg">
                <MdOutlineTrendingDown className="text-white text-xl"/>
            </div>
            <div className="flex justify-between items-start">
            <MdOutlineTrendingDown className="text-orange-600 cursor-pointer" />
            <p className="text-sm text-orange-600">
            +12%
            </p>
            </div>
            </div>
            <h1 className="text-2xl font-bold p-3 text-gray-800 text-left">
            247
            </h1>
            <p className="text-sm test-grey">
            Total Klien Aktif
            </p>
        </div>

        {/* Card 4 */}
            <div className="bg-white p-6 rounded-xl shadow">
            {/* Icon Kanan & Kiri*/}
            <div className="flex justify-between items-start">
            {/*Icon Kiri*/}
            <div className="bg-orange-600 p-3 w-10 h-10 rounded-lg">
                <MdOutlineTrendingDown className="text-white text-xl"/>
            </div>
            <div className="flex justify-between items-start">
            <MdOutlineTrendingDown className="text-orange-600 cursor-pointer" />
            <p className="text-sm text-orange-600">
            +12%
            </p>
            </div>
            </div>
            <h1 className="text-2xl font-bold p-3 text-gray-800 text-left">
            247
            </h1>
            <p className="text-sm test-grey">
            Total Klien Aktif
            </p>
        </div>

        {/* Card 5 */}
            <div className="bg-white p-6 rounded-xl shadow">
            {/* Icon Kanan & Kiri*/}
            <div className="flex justify-between items-start">
            {/*Icon Kiri*/}
            <div className="bg-orange-600 p-3 w-10 h-10 rounded-lg">
                <MdOutlineTrendingDown className="text-white text-xl"/>
            </div>
            <div className="flex justify-between items-start">
            <MdOutlineTrendingDown className="text-orange-600 cursor-pointer" />
            <p className="text-sm text-orange-600">
            +12%
            </p>
            </div>
            </div>
            <h1 className="text-2xl font-bold p-3 text-gray-800 text-left">
            247
            </h1>
            <p className="text-sm test-grey">
            Total Klien Aktif
            </p>
        </div>
    </div>

        <div className="grid grid-cols-2 gap-4 mt-6">

            {/* Card 1 */}
            <div className="bg-white p-6 rounded-xl shadow">
                <h1 className="text-2xl font-bold p-3 text-gray-800 text-left">
                    Tren rehabilitasi Klien
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
            <h1 className="text-xl font-bold text-center">
                Diagram Lingkaran
            </h1>
            <PieChart />
            </main>
            </div>
            <h1 className="text-2xl font-bold p-3 text-gray-800 text-left">
            247
            </h1>
            <p className="text-sm test-grey">
            Total Klien Aktif
            </p>
        </div>

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

{/* Card 3 */}
        <div className="bg-white p-6 rounded-xl shadow">
            {/* Icon Kanan & Kiri*/}
            <div className="flex justify-between items-start">
            <main>
            <h1 className="text-xl font-bold text-center">
                Diagram Batang Menyamping
            </h1>
            <HorizontalBarChart />
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

