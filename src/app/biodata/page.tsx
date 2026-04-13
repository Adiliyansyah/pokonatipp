"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, X, Trash2 } from "lucide-react";

const PAGE_SIZE = 20;

const DAFTAR_PROVINSI = [
  "Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Kepulauan Riau", "Jambi", "Bengkulu", "Sumatera Selatan", "Kepulauan Bangka Belitung", "Lampung",
  "Banten", "DKI Jakarta", "Jawa Barat", "Jawa Tengah", "DI Yogyakarta", "Jawa Timur", "Bali", "Nusa Tenggara Barat", "Nusa Tenggara Timur",
  "Kalimantan Barat", "Kalimantan Tengah", "Kalimantan Selatan", "Kalimantan Timur", "Kalimantan Utara",
  "Sulawesi Utara", "Sulawesi Tengah", "Sulawesi Selatan", "Sulawesi Tenggara", "Gorontalo", "Sulawesi Barat",
  "Maluku", "Maluku Utara", "Papua Barat", "Papua", "Papua Tengah", "Papua Pegunungan", "Papua Selatan", "Papua Barat Daya"
];

const COMMON_ZAT = ["Sabu", "Ganja", "Ekstasi", "Alkohol", "Tramadol", "Benzo", "Koplo", "Lem", "Tembakau Sintetis"];
const COMMON_MOTIF = ["Eksperimen / Coba-coba", "Faktor Sosial & Lingkungan", "Doping Kerja & Fisik", "Kesenangan / Rekreasi", "Masalah Keluarga / Pribadi"];

// ======================
// TYPE DARI DATABASE
// ======================
type Client = {
  id: number;
  INISIAL: string | null;
  GENDER: string | null;
  KATEGORI_USIA: string | null;
  UMUR: number | null;
  TEMPAT_LAHIR: string | null;
  TANGGAL_LAHIR: string | null;
  AGAMA: string | null;
  PENDIDIKAN: string | null;
  STATUS: string | null;
  PEKERJAAN: string | null;
  TANGGAL_MASUK: string | null;
  RENCANA_REHAB: string | null;
  TANGGAL_KELUAR: string | null;
  "KETERANGAN/STATUS": string | null;
  USIA_PERTAMA_KALI: number | null;
  ASAL_PROVINSI: string | null;
  MOTIF_PENGGUNAAN: string | null;
  PENGGUNAAN_ZAT: string | null;
};

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
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/patients");
      const json = await res.json();
      if (json.success) setData(json.data || []);
    } catch {
      setData([]);
    }
  };

  const isAktif = (k: ClientView) => !k.tgl_keluar || k.tgl_keluar === "-" || k.tgl_keluar === "";
  const isSelesai = (k: ClientView) => !!k.tgl_keluar && k.tgl_keluar !== "-" && k.tgl_keluar !== "";

  const biodataKlien: ClientView[] = useMemo(() => {
    return data.map((k) => ({
      id: k.id,
      nama: k.INISIAL ?? "-",
      jk: k.GENDER ?? "-",
      umur: k.UMUR ?? "-",
      ttl: `${k.TEMPAT_LAHIR ?? "-"}, ${k.TANGGAL_LAHIR ?? "-"}`,
      pekerjaan: k.PEKERJAAN ?? "-",
      tgl_masuk: k.TANGGAL_MASUK ?? "-",
      tgl_keluar: k.TANGGAL_KELUAR ?? "-",
      provinsi: k.ASAL_PROVINSI ?? "-",
      zat: k.PENGGUNAAN_ZAT ?? "-",
      status: k.TANGGAL_KELUAR && k.TANGGAL_KELUAR !== "-" ? "Selesai" : "Aktif",
    }));
  }, [data]);

  const filtered = useMemo(() => {
    return biodataKlien.filter((k) => {
      const matchSearch = k.nama.toLowerCase().includes(search.toLowerCase()) ||
        k.provinsi.toLowerCase().includes(search.toLowerCase()) ||
        k.pekerjaan.toLowerCase().includes(search.toLowerCase());
      return matchSearch && (filterStatus === "Semua" || k.status === filterStatus);
    });
  }, [search, filterStatus, biodataKlien]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleEditClick = (id: number) => {
    const client = data.find((c) => c.id === id);
    if (client) setEditingClient({ ...client });
  };

  const handleModalChange = (field: keyof Client, value: any) => {
    if (!editingClient) return;
    setEditingClient(prev => {
      const updated = { ...prev!, [field]: value };
      if (field === "UMUR") {
        const u = parseInt(value) || 0;
        updated.KATEGORI_USIA = u < 12 ? "Anak/Khusus" : u <= 17 ? "Adolescent" : "Dewasa";
      }
      return updated;
    });
  };

  const handleToggleTag = (currentValue: string | null, tag: string, field: keyof Client) => {
    let items = currentValue ? currentValue.split(",").map(i => i.trim()).filter(i => i !== "") : [];
    if (items.includes(tag)) {
      items = items.filter(i => i !== tag);
    } else {
      items.push(tag);
    }
    handleModalChange(field, items.join(", "));
  };

  const handleSaveEdit = async () => {
    if (!editingClient) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/patients/${editingClient.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingClient),
      });
      const json = await res.json();
      if (json.success) {
        setData(prev => prev.map(c => c.id === editingClient.id ? editingClient : c));
        setShowSuccess(true);
        setTimeout(() => { setShowSuccess(false); setEditingClient(null); }, 1500);
      } else {
        alert(json.error || "Gagal menyimpan");
      }
    } catch {
      alert("Terjadi kesalahan koneksi");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!editingClient || !confirm("Yakin ingin menghapus data ini secara permanen?")) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/patients/${editingClient.id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setData(prev => prev.filter(c => c.id !== editingClient.id));
        setEditingClient(null);
      } else {
        alert(json.error || "Gagal menghapus");
      }
    } catch {
      alert("Gagal menghapus data");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="relative">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Biodata Klien</h1>
        <p className="text-sm text-gray-500 mt-1">Data identitas klien rehabilitasi BNN Tanah Merah</p>
      </div>

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
          <span className="text-sm text-gray-500">Menampilkan {filtered.length} dari {biodataKlien.length}</span>
        </div>

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
                <tr key={item.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
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
                    <button onClick={() => handleEditClick(item.id)} className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-between mt-4 text-sm">
            <span>Halaman {page} dari {totalPages}</span>
            <div className="flex gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} className="p-1 rounded border hover:bg-gray-100"><ChevronLeft size={18} /></button>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} className="p-1 rounded border hover:bg-gray-100"><ChevronRight size={18} /></button>
            </div>
          </div>
        )}
      </div>

      {editingClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="sticky top-0 bg-white px-6 py-4 border-b flex justify-between items-center z-10 rounded-t-xl">
              <h2 className="text-lg font-bold text-gray-800">Edit Data Klien Lengkap</h2>
              <button onClick={() => setEditingClient(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>

            <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Inisial</label>
                <input type="text" value={editingClient.INISIAL ?? ""} onChange={(e) => handleModalChange("INISIAL", e.target.value)} className="w-full border px-3 py-2 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Umur</label>
                <input type="number" value={editingClient.UMUR ?? ""} onChange={(e) => handleModalChange("UMUR", e.target.value)} className="w-full border px-3 py-2 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Kategori Usia (Auto)</label>
                <input type="text" readOnly value={editingClient.KATEGORI_USIA ?? ""} className="w-full border px-3 py-2 rounded-lg text-sm bg-gray-100" />
              </div>
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
                  <option value="Kepercayaan Terhadap Tuhan Yang Maha Esa">Kepercayaan Terhadap Tuhan Yang Maha Esa</option>
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
                  <option value="S2/S3">S2/S3</option>
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
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Pekerjaan</label>
                <input type="text" value={editingClient.PEKERJAAN ?? ""} onChange={(e) => handleModalChange("PEKERJAAN", e.target.value)} className="w-full border px-3 py-2 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Tempat Lahir</label>
                <input type="text" value={editingClient.TEMPAT_LAHIR ?? ""} onChange={(e) => handleModalChange("TEMPAT_LAHIR", e.target.value)} className="w-full border px-3 py-2 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Tanggal Lahir</label>
                <input type="date" value={editingClient.TANGGAL_LAHIR ?? ""} onChange={(e) => handleModalChange("TANGGAL_LAHIR", e.target.value)} className="w-full border px-3 py-2 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Asal Provinsi</label>
                <select value={editingClient.ASAL_PROVINSI ?? ""} onChange={(e) => handleModalChange("ASAL_PROVINSI", e.target.value)} className="w-full border px-3 py-2 rounded-lg text-sm">
                  <option value="">Pilih Provinsi</option>
                  {DAFTAR_PROVINSI.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Usia Pertama Pakai</label>
                <input type="number" value={editingClient.USIA_PERTAMA_KALI ?? ""} onChange={(e) => handleModalChange("USIA_PERTAMA_KALI", e.target.value)} className="w-full border px-3 py-2 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Tanggal Masuk</label>
                <input type="date" value={editingClient.TANGGAL_MASUK ?? ""} onChange={(e) => handleModalChange("TANGGAL_MASUK", e.target.value)} className="w-full border px-3 py-2 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Tanggal Keluar</label>
                <input type="date" value={editingClient.TANGGAL_KELUAR ?? ""} onChange={(e) => handleModalChange("TANGGAL_KELUAR", e.target.value)} className="w-full border px-3 py-2 rounded-lg text-sm" />
                <p className="text-[10px] text-gray-400 mt-1">Kosongkan jika klien masih aktif</p>
              </div>
              
              <div className="md:col-span-3 border-t pt-4">
                <label className="block text-sm font-bold text-gray-700 mb-1">PENGGUNAAN ZAT</label>
                <p className="text-xs text-gray-500 mb-3 italic">ℹ️ Anda dapat memilih lebih dari satu dengan mengklik tag di bawah ini, atau mengetik zat baru secara manual di dalam kotak (pisahkan dengan tanda koma).</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {COMMON_ZAT.map(z => (
                    <button key={z} type="button" onClick={() => handleToggleTag(editingClient.PENGGUNAAN_ZAT, z, "PENGGUNAAN_ZAT")} className={`px-3 py-1 rounded-full text-xs border transition ${editingClient.PENGGUNAAN_ZAT?.includes(z) ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{z}</button>
                  ))}
                </div>
                <input type="text" value={editingClient.PENGGUNAAN_ZAT ?? ""} onChange={(e) => handleModalChange("PENGGUNAAN_ZAT", e.target.value)} className="w-full border px-3 py-2 rounded-lg text-sm bg-blue-50" placeholder="Ketik zat lain di sini..." />
              </div>

              <div className="md:col-span-3 mt-2">
                <label className="block text-sm font-bold text-gray-700 mb-1">MOTIF PENGGUNAAN</label>
                <p className="text-xs text-gray-500 mb-3 italic">ℹ️ Anda dapat memilih lebih dari satu dengan mengklik tag di bawah ini, atau mengetik motif baru secara manual di dalam kotak (pisahkan dengan tanda koma).</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {COMMON_MOTIF.map(m => (
                    <button key={m} type="button" onClick={() => handleToggleTag(editingClient.MOTIF_PENGGUNAAN, m, "MOTIF_PENGGUNAAN")} className={`px-3 py-1 rounded-full text-xs border transition ${editingClient.MOTIF_PENGGUNAAN?.includes(m) ? 'bg-green-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{m}</button>
                  ))}
                </div>
                <input type="text" value={editingClient.MOTIF_PENGGUNAAN ?? ""} onChange={(e) => handleModalChange("MOTIF_PENGGUNAAN", e.target.value)} className="w-full border px-3 py-2 rounded-lg text-sm bg-green-50" placeholder="Ketik motif lain di sini..." />
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t flex justify-between items-center rounded-b-xl">
              <button onClick={handleDelete} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-200 bg-red-50 rounded-lg hover:bg-red-100 transition"><Trash2 size={16}/> Hapus Data</button>
              <div className="flex gap-3">
                <button onClick={() => setEditingClient(null)} className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100">Batal</button>
                <button onClick={handleSaveEdit} disabled={isSaving} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50">{isSaving ? "Menyimpan..." : "Simpan Perubahan"}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[60] bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">Berhasil! Data telah diperbarui.</div>
      )}
    </div>
  );
}