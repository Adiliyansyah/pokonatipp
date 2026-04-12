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
// TYPE UNTUK UI
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

  // STATE UNTUK MODAL EDIT
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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
  // STATUS LOGIC
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
      status:
        k.TANGGAL_KELUAR && k.TANGGAL_KELUAR !== "-" ? "Selesai" : "Aktif",
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

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // ======================
  // HANDLER EDIT
  // ======================
  const handleEditClick = (id: number) => {
    const clientToEdit = data.find((c) => c.id === id);
    if (clientToEdit) {
      setEditingClient({ ...clientToEdit }); // Clone data untuk diedit
    }
  };

  const handleModalChange = (field: keyof Client, value: string | number) => {
    if (!editingClient) return;
    setEditingClient((prev) => ({
      ...prev!,
      [field]: value,
    }));
  };

  const handleSaveEdit = async () => {
    if (!editingClient) return;
    setIsSaving(true);

    try {
      // Asumsi Anda memiliki endpoint PUT /api/patients/[id] yang berfungsi
      const res = await fetch(`/api/patients/${editingClient.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingClient),
      });

      const json = await res.json();

      if (json.success) {
        // Update data di state lokal agar tabel langsung berubah
        setData((prevData) =>
          prevData.map((c) => (c.id === editingClient.id ? editingClient : c))
        );
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setEditingClient(null); // Tutup modal
        }, 1500);
      } else {
        alert(json.error || "Gagal menyimpan data");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan pada server");
    } finally {
      setIsSaving(false);
    }
  };

  // ======================
  // UI
  // ======================
  return (
    <div className="relative">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Biodata Klien</h1>
        <p className="text-sm text-gray-500 mt-1">
          Data identitas klien rehabilitasi BNN Tanah Merah
        </p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-5 rounded-xl shadow text-white">
          <p className="text-3xl font-bold">{biodataKlien.length}</p>
          <p className="text-sm text-blue-100 mt-1">Total Data Klien</p>
        </div>

        <div className="bg-gradient-to-r from-green-400 to-green-600 p-5 rounded-xl shadow text-white">
          <p className="text-3xl font-bold">{biodataKlien.filter(isAktif).length}</p>
          <p className="text-sm text-green-100 mt-1">Klien Aktif</p>
        </div>

        <div className="bg-gradient-to-r from-gray-500 to-gray-700 p-5 rounded-xl shadow text-white">
          <p className="text-3xl font-bold">{biodataKlien.filter(isSelesai).length}</p>
          <p className="text-sm text-gray-200 mt-1">Klien Selesai</p>
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
                  <td className="px-3 py-2">{(page - 1) * PAGE_SIZE + i + 1}</td>
                  <td className="px-3 py-2 font-medium">{item.nama}</td>
                  <td className="px-3 py-2">{item.jk}</td>
                  <td className="px-3 py-2">{item.umur}</td>
                  <td className="px-3 py-2 text-xs">{item.ttl}</td>
                  <td className="px-3 py-2 text-xs">{item.pekerjaan}</td>
                  <td className="px-3 py-2 text-xs">{item.tgl_masuk}</td>
                  <td className="px-3 py-2 text-xs">{item.tgl_keluar}</td>
                  <td className="px-3 py-2 text-xs">{item.provinsi}</td>
                  <td className="px-3 py-2 text-xs">{item.zat}</td>
                  <td className="px-3 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <button
                      onClick={() => handleEditClick(item.id)}
                      className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}

              {paginated.length === 0 && (
                <tr>
                  <td colSpan={12} className="text-center p-6 text-gray-400">
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
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="p-1 rounded border hover:bg-gray-100"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="p-1 rounded border hover:bg-gray-100"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ====================== */}
      {/* MODAL EDIT LENGKAP */}
      {/* ====================== */}
      {editingClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="sticky top-0 bg-white px-6 py-4 border-b flex justify-between items-center z-10 rounded-t-xl">
              <h2 className="text-lg font-bold text-gray-800">Edit Data Klien Lengkap</h2>
              <button onClick={() => setEditingClient(null)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              
              {/* Kolom Input Standard */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Inisial</label>
                <input type="text" value={editingClient.INISIAL ?? ""} onChange={(e) => handleModalChange("INISIAL", e.target.value)} className="w-full border px-3 py-2 rounded-lg text-sm" />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Umur</label>
                <input 
                  type="number" 
                  value={editingClient.UMUR ?? ""} 
                  onChange={(e) => {
                    const umur = parseInt(e.target.value) || 0;
                    handleModalChange("UMUR", umur);
                    // Auto Kategori Usia
                    handleModalChange("KATEGORI_USIA", umur < 18 ? "Anak" : "Dewasa");
                  }} 
                  className="w-full border px-3 py-2 rounded-lg text-sm" 
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Kategori Usia (Auto)</label>
                <input type="text" readOnly value={editingClient.KATEGORI_USIA ?? ""} className="w-full border px-3 py-2 rounded-lg text-sm bg-gray-100 text-gray-500 cursor-not-allowed" />
              </div>

              {/* Dropdowns */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Gender</label>
                <select value={editingClient.GENDER ?? ""} onChange={(e) => handleModalChange("GENDER", e.target.value)} className="w-full border px-3 py-2 rounded-lg text-sm">
                  <option value="">Pilih</option>
                  <option value="Laki-Laki">Laki-Laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Agama</label>
                <select value={editingClient.AGAMA ?? ""} onChange={(e) => handleModalChange("AGAMA", e.target.value)} className="w-full border px-3 py-2 rounded-lg text-sm">
                  <option value="">Pilih</option>
                  <option value="Islam">Islam</option>
                  <option value="Kristen">Kristen</option>
                  <option value="Katolik">Katolik</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Buddha">Buddha</option>
                  <option value="Konghucu">Konghucu</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Pendidikan</label>
                <select value={editingClient.PENDIDIKAN ?? ""} onChange={(e) => handleModalChange("PENDIDIKAN", e.target.value)} className="w-full border px-3 py-2 rounded-lg text-sm">
                  <option value="">Pilih</option>
                  <option value="Tidak Sekolah">Tidak Sekolah</option>
                  <option value="SD/Sederajat">SD/Sederajat</option>
                  <option value="SMP/Sederajat">SMP/Sederajat</option>
                  <option value="SMA/Sederajat">SMA/Sederajat</option>
                  <option value="S1/D4">S1/D4</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Status Pernikahan</label>
                <select value={editingClient.STATUS ?? ""} onChange={(e) => handleModalChange("STATUS", e.target.value)} className="w-full border px-3 py-2 rounded-lg text-sm">
                  <option value="">Pilih</option>
                  <option value="Belum Menikah">Belum Menikah</option>
                  <option value="Menikah">Menikah</option>
                  <option value="Duda/Janda">Duda/Janda</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Keterangan / Status</label>
                <select value={editingClient["KETERANGAN/STATUS"] ?? ""} onChange={(e) => handleModalChange("KETERANGAN/STATUS", e.target.value)} className="w-full border px-3 py-2 rounded-lg text-sm">
                  <option value="">Pilih</option>
                  <option value="Voluntary">Voluntary</option>
                  <option value="TAT(Voluntary)">TAT(Voluntary)</option>
                  <option value="Compulsory">Compulsory</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Rencana Rehab</label>
                <select value={editingClient.RENCANA_REHAB ?? ""} onChange={(e) => handleModalChange("RENCANA_REHAB", e.target.value)} className="w-full border px-3 py-2 rounded-lg text-sm">
                  <option value="">Pilih</option>
                  <option value="BERAT">BERAT</option>
                  <option value="SEDANG">SEDANG</option>
                  <option value="RINGAN">RINGAN</option>
                </select>
              </div>

              {/* Text & Date Inputs */}
              <div><label className="block text-xs font-medium text-gray-500 mb-1">Pekerjaan</label><input type="text" value={editingClient.PEKERJAAN ?? ""} onChange={(e) => handleModalChange("PEKERJAAN", e.target.value)} className="w-full border px-3 py-2 rounded-lg text-sm" /></div>
              <div><label className="block text-xs font-medium text-gray-500 mb-1">Tempat Lahir</label><input type="text" value={editingClient.TEMPAT_LAHIR ?? ""} onChange={(e) => handleModalChange("TEMPAT_LAHIR", e.target.value)} className="w-full border px-3 py-2 rounded-lg text-sm" /></div>
              <div><label className="block text-xs font-medium text-gray-500 mb-1">Tanggal Lahir</label><input type="date" value={editingClient.TANGGAL_LAHIR ?? ""} onChange={(e) => handleModalChange("TANGGAL_LAHIR", e.target.value)} className="w-full border px-3 py-2 rounded-lg text-sm" /></div>
              <div><label className="block text-xs font-medium text-gray-500 mb-1">Asal Provinsi</label><input type="text" value={editingClient.ASAL_PROVINSI ?? ""} onChange={(e) => handleModalChange("ASAL_PROVINSI", e.target.value)} className="w-full border px-3 py-2 rounded-lg text-sm" /></div>
              <div><label className="block text-xs font-medium text-gray-500 mb-1">Usia Pertama Pakai</label><input type="number" value={editingClient.USIA_PERTAMA_KALI ?? ""} onChange={(e) => handleModalChange("USIA_PERTAMA_KALI", e.target.value)} className="w-full border px-3 py-2 rounded-lg text-sm" /></div>
              <div><label className="block text-xs font-medium text-gray-500 mb-1">Tanggal Masuk</label><input type="date" value={editingClient.TANGGAL_MASUK ?? ""} onChange={(e) => handleModalChange("TANGGAL_MASUK", e.target.value)} className="w-full border px-3 py-2 rounded-lg text-sm" /></div>
              <div><label className="block text-xs font-medium text-gray-500 mb-1">Tanggal Keluar</label><input type="date" value={editingClient.TANGGAL_KELUAR ?? ""} onChange={(e) => handleModalChange("TANGGAL_KELUAR", e.target.value)} className="w-full border px-3 py-2 rounded-lg text-sm" /></div>

              {/* Multi-Select (ZAT & MOTIF) menggunakan string manual agar mudah dengan database */}
              <div className="md:col-span-2 lg:col-span-3 mt-2 border-t pt-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Zat yang Digunakan (Pisahkan dengan koma jika lebih dari satu)</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Sabu, Ganja, Alkohol"
                  value={editingClient.PENGGUNAAN_ZAT ?? ""} 
                  onChange={(e) => handleModalChange("PENGGUNAAN_ZAT", e.target.value)} 
                  className="w-full border px-3 py-2 rounded-lg text-sm bg-blue-50" 
                />
              </div>

              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Motif Penggunaan (Pisahkan dengan koma)</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Eksperimen / Coba-coba, Faktor Sosial & Lingkungan"
                  value={editingClient.MOTIF_PENGGUNAAN ?? ""} 
                  onChange={(e) => handleModalChange("MOTIF_PENGGUNAAN", e.target.value)} 
                  className="w-full border px-3 py-2 rounded-lg text-sm bg-blue-50" 
                />
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t flex justify-end gap-3 rounded-b-xl">
              <button onClick={() => setEditingClient(null)} className="px-4 py-2 text-sm font-medium border rounded-lg hover:bg-gray-100">Batal</button>
              <button onClick={handleSaveEdit} disabled={isSaving} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50">
                {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP SUCCESS */}
      {showSuccess && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[60] bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <span className="font-semibold">Berhasil!</span> Data klien berhasil diperbarui.
        </div>
      )}
    </div>
  );
}