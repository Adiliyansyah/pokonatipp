"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, X } from "lucide-react";

const PAGE_SIZE = 20;

// ======================
// TYPE DARI DATABASE
// ======================
type Client = {
  id: number;
  INISIAL: string | null;
  GENDER: string | null;
  UMUR: number | null;
  TEMPAT_LAHIR: string | null;
  TANGGAL_LAHIR: string | null;
  PEKERJAAN: string | null;
  TANGGAL_MASUK: string | null;
  TANGGAL_KELUAR: string | null;
  ASAL_PROVINSI: string | null;
  PENGGUNAAN_ZAT: string | null;
  STATUS: string | null;
};

// ======================
// TYPE UNTUK UI (IMPORTANT FIX)
// ======================
type ClientView = {
  id: number;
  nama: string;
  jk: string;
  umur: string | number;
  ttl: string;
  pekerjaan: string;
  tgl_masuk: string;
  tgl_keluar: string;
  provinsi: string;
  zat: string;
  status: string;
};

export default function BiodataPage() {
  const [data, setData] = useState<Client[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [page, setPage] = useState(1);

  const [selected, setSelected] = useState<ClientView | null>(null);
  const [success, setSuccess] = useState(false);

  
  // ======================
  // FETCH DATA
  // ======================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/patients");
        const json = await res.json();

        if (json.success) {
          setData(json.data || []);
        } else {
          setData([]);
        }
      } catch {
        setData([]);
      }
    };

    fetchData();
  }, []);

  // ======================
  // STATUS LOGIC (FIX UTAMA)
  // ======================
  const isAktif = (k: ClientView) =>
    !k.tgl_keluar || k.tgl_keluar === "-" || k.tgl_keluar === "";

  const isSelesai = (k: ClientView) =>
    !!k.tgl_keluar && k.tgl_keluar !== "-" && k.tgl_keluar !== "";

  // ======================
  // MAPPING DATABASE → UI
  // ======================
  const biodataKlien: ClientView[] = useMemo(() => {
    return data.map((k) => ({
      id: k.id,
      nama: k.INISIAL ?? "-",
      jk: k.GENDER === "L" ? "Laki-Laki" : "Perempuan",
      umur: k.UMUR ?? "-",
      ttl: `${k.TEMPAT_LAHIR ?? "-"}, ${k.TANGGAL_LAHIR ?? "-"}`,
      pekerjaan: k.PEKERJAAN ?? "-",
      tgl_masuk: k.TANGGAL_MASUK ?? "-",
      tgl_keluar: k.TANGGAL_KELUAR ?? "-",
      provinsi: k.ASAL_PROVINSI ?? "-",
      zat: k.PENGGUNAAN_ZAT ?? "-",

      // 🔥 INI YANG KITA UBAH (STATUS DINAMIS)
      status:
        k.TANGGAL_KELUAR && k.TANGGAL_KELUAR !== "-"
          ? "Selesai"
          : "Aktif",
    }));
  }, [data]);

  // ======================
  // FILTER
  // ======================
  const filtered = useMemo(() => {
    return biodataKlien.filter((k) => {
      const matchSearch =
        k.nama.toLowerCase().includes(search.toLowerCase()) ||
        k.provinsi.toLowerCase().includes(search.toLowerCase()) ||
        k.pekerjaan.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        filterStatus === "Semua" || k.status === filterStatus;

      return matchSearch && matchStatus;
    });
  }, [search, filterStatus, biodataKlien]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const paginated = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // ======================
  // UI
  // ======================
  return (
    <div>
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Biodata Klien
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Data identitas klien rehabilitasi BNN Tanah Merah
        </p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-5 rounded-xl shadow text-white">
          <p className="text-3xl font-bold">{biodataKlien.length}</p>
          <p className="text-sm text-blue-100 mt-1">
            Total Data Klien
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-400 to-green-600 p-5 rounded-xl shadow text-white">
          <p className="text-3xl font-bold">
            {biodataKlien.filter(isAktif).length}
          </p>
          <p className="text-sm text-green-100 mt-1">
            Klien Aktif
          </p>
        </div>

        <div className="bg-gradient-to-r from-gray-500 to-gray-700 p-5 rounded-xl shadow text-white">
          <p className="text-3xl font-bold">
            {biodataKlien.filter(isSelesai).length}
          </p>
          <p className="text-sm text-gray-200 mt-1">
            Klien Selesai
          </p>
        </div>
      </div>

      {/* FILTER */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari nama, provinsi, pekerjaan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option>Semua</option>
            <option>Aktif</option>
            <option>Selesai</option>
          </select>

          <span className="text-sm text-gray-500">
            Menampilkan {filtered.length} dari {biodataKlien.length}
          </span>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-3 py-3 text-left">No</th>
                <th className="px-3 py-3 text-left">Nama/Inisial</th>
                <th className="px-3 py-3 text-left">JK</th>
                <th className="px-3 py-3 text-left">Umur</th>
                <th className="px-3 py-3 text-left">TTL</th>
                <th className="px-3 py-3 text-left">Pekerjaan</th>
                <th className="px-3 py-3 text-left">Tgl Masuk</th>
                <th className="px-3 py-3 text-left">Tgl Keluar</th>
                <th className="px-3 py-3 text-left">Provinsi</th>
                <th className="px-3 py-3 text-left">Zat</th>
                <th className="px-3 py-3 text-left">Status</th>
                <th className="px-3 py-3 text-left">Edit</th>
              </tr>
            </thead>

            <tbody>
              {paginated.map((item, i) => (
                <tr
                  key={item.id}
                  className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-3 py-2">
                    {(page - 1) * PAGE_SIZE + i + 1}
                  </td>
                  <td className="px-3 py-2 font-medium">{item.nama}</td>
                  <td className="px-3 py-2">{item.jk}</td>
                  <td className="px-3 py-2">{item.umur}</td>
                  <td className="px-3 py-2 text-xs">{item.ttl}</td>
                  <td className="px-3 py-2 text-xs">{item.pekerjaan}</td>
                  <td className="px-3 py-2 text-xs">{item.tgl_masuk}</td>
                  <td className="px-3 py-2 text-xs">{item.tgl_keluar}</td>
                  <td className="px-3 py-2 text-xs">{item.provinsi}</td>
                  <td className="px-3 py-2 text-xs">{item.zat}</td>

                  {/* 🔥 STATUS FINAL FIX */}
                  <td className="px-3 py-2">
                    {item.status}
                  </td>
                  <td className="px-3 py-2">
                    <button
                      onClick={() => alert(`Edit ID: ${item.id}`)}
                      className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}

              {paginated.length === 0 && (
                <tr>
                  <td colSpan={11} className="text-center p-6 text-gray-400">
                    Tidak ada data ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-between mt-4 text-sm">
            <span>
              Halaman {page} dari {totalPages}
            </span>

            <div className="flex gap-2">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))}>
                <ChevronLeft />
              </button>

              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
                <ChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}