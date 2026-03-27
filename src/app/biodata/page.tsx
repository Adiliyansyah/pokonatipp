"use client";

import { useState } from "react";
import { RxPeople } from "react-icons/rx";
import { Search } from "lucide-react";

const biodataKlien = [
  { id: 1, nama: "Ahmad Fauzi", nik: "3174010101900001", jk: "Pria", ttl: "Jakarta, 01 Jan 1990", alamat: "Jl. Merdeka No. 10, Jakarta", status: "Aktif" },
  { id: 2, nama: "Siti Rahayu", nik: "3578025502950002", jk: "Wanita", ttl: "Surabaya, 15 Feb 1995", alamat: "Jl. Pahlawan No. 5, Surabaya", status: "Selesai" },
  { id: 3, nama: "Budi Santoso", nik: "3273031203880003", jk: "Pria", ttl: "Bandung, 12 Mar 1988", alamat: "Jl. Asia Afrika No. 22, Bandung", status: "Aktif" },
  { id: 4, nama: "Dewi Kurniasih", nik: "3471040707920004", jk: "Wanita", ttl: "Yogyakarta, 07 Jul 1992", alamat: "Jl. Malioboro No. 3, Yogyakarta", status: "Aktif" },
  { id: 5, nama: "Rizky Pratama", nik: "3175052809970005", jk: "Pria", ttl: "Jakarta, 28 Sep 1997", alamat: "Jl. Sudirman No. 45, Jakarta", status: "Relapse" },
  { id: 6, nama: "Rina Marlina", nik: "3578061501940006", jk: "Wanita", ttl: "Medan, 15 Jan 1994", alamat: "Jl. Diponegoro No. 7, Medan", status: "Selesai" },
];

export default function BiodataPage() {
  const [search, setSearch] = useState("");

  const filtered = biodataKlien.filter((k) =>
    k.nama.toLowerCase().includes(search.toLowerCase()) ||
    k.nik.includes(search)
  );

  const statusColor: Record<string, string> = {
    Aktif: "bg-blue-100 text-blue-700",
    Selesai: "bg-green-100 text-green-700",
    Relapse: "bg-red-100 text-red-600",
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Biodata Klien</h1>
        <p className="text-sm text-gray-500 mt-1">Data identitas klien rehabilitasi BNN Tanah Merah</p>
      </div>

      {/* Card total */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-5 rounded-xl shadow text-white">
          <RxPeople className="text-4xl mb-2 opacity-80" />
          <p className="text-3xl font-bold">{biodataKlien.length}</p>
          <p className="text-sm text-blue-100">Total Data Klien</p>
        </div>
        <div className="bg-gradient-to-r from-green-400 to-green-600 p-5 rounded-xl shadow text-white">
          <p className="text-3xl font-bold">{biodataKlien.filter(k => k.status === "Aktif").length}</p>
          <p className="text-sm text-green-100 mt-1">Klien Aktif</p>
        </div>
        <div className="bg-gradient-to-r from-gray-500 to-gray-700 p-5 rounded-xl shadow text-white">
          <p className="text-3xl font-bold">{biodataKlien.filter(k => k.status === "Selesai").length}</p>
          <p className="text-sm text-gray-200 mt-1">Klien Selesai</p>
        </div>
      </div>

      {/* Search & Tabel */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari nama atau NIK..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-4 py-3 text-left rounded-tl-lg">No</th>
                <th className="px-4 py-3 text-left">Nama</th>
                <th className="px-4 py-3 text-left">NIK</th>
                <th className="px-4 py-3 text-left">JK</th>
                <th className="px-4 py-3 text-left">TTL</th>
                <th className="px-4 py-3 text-left">Alamat</th>
                <th className="px-4 py-3 text-left rounded-tr-lg">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => (
                <tr key={item.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-3">{item.id}</td>
                  <td className="px-4 py-3 font-medium">{item.nama}</td>
                  <td className="px-4 py-3 font-mono text-xs">{item.nik}</td>
                  <td className="px-4 py-3">{item.jk}</td>
                  <td className="px-4 py-3 text-xs">{item.ttl}</td>
                  <td className="px-4 py-3 text-xs">{item.alamat}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[item.status]}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                    Tidak ada data ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
