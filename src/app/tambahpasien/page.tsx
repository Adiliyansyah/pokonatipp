"use client";

import Sidebar from "@/components/sidebar";
import { useState } from "react";
import { useRouter } from "next/navigation";

// KONSTANTA DAFTAR PILIHAN
const DAFTAR_PROVINSI = [
  "Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Kepulauan Riau", "Jambi", "Bengkulu", "Sumatera Selatan", "Kepulauan Bangka Belitung", "Lampung",
  "Banten", "DKI Jakarta", "Jawa Barat", "Jawa Tengah", "DI Yogyakarta", "Jawa Timur", "Bali", "Nusa Tenggara Barat", "Nusa Tenggara Timur",
  "Kalimantan Barat", "Kalimantan Tengah", "Kalimantan Selatan", "Kalimantan Timur", "Kalimantan Utara",
  "Sulawesi Utara", "Sulawesi Tengah", "Sulawesi Selatan", "Sulawesi Tenggara", "Gorontalo", "Sulawesi Barat",
  "Maluku", "Maluku Utara", "Papua Barat", "Papua", "Papua Tengah", "Papua Pegunungan", "Papua Selatan", "Papua Barat Daya"
];

const COMMON_ZAT = ["Sabu", "Ganja", "Ekstasi", "Alkohol", "Tramadol", "Benzo", "Koplo", "Lem", "Tembakau Sintetis"];
const COMMON_MOTIF = ["Eksperimen / Coba-coba", "Faktor Sosial & Lingkungan", "Doping Kerja & Fisik", "Kesenangan / Rekreasi", "Masalah Keluarga / Pribadi"];

export default function TambahPasienPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    inisial: "", gender: "", kategori_usia: "", umur: "", tempat_lahir: "",
    tanggal_lahir: "", agama: "", pendidikan: "", status: "", pekerjaan: "",
    tanggal_masuk: "", rencana_rehab: "", keterangan: "", usia_pertama_kali: "",
    asal_provinsi: "", motif_penggunaan: "", penggunaan_zat: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      
      // Auto Kategori Usia (Revisi 3 Kategori)
      if (name === "umur") {
        const umur = parseInt(value) || 0;
        if (umur < 12) {
          newData.kategori_usia = "Anak/Khusus";
        } else if (umur >= 12 && umur <= 17) {
          newData.kategori_usia = "Adolescent";
        } else {
          newData.kategori_usia = "Dewasa";
        }
      }
      return newData;
    });
  };

  // HELPER UNTUK MULTI-SELECT TAGS (ZAT/MOTIF)
  const handleToggleTag = (currentValue: string, tag: string, field: string) => {
    let items = currentValue ? currentValue.split(",").map(i => i.trim()).filter(i => i !== "") : [];
    if (items.includes(tag)) {
      items = items.filter(i => i !== tag); // Hapus jika sudah ada
    } else {
      items.push(tag); // Tambah jika belum ada
    }
    setFormData(prev => ({ ...prev, [field]: items.join(", ") }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Bersihkan data: ubah string kosong menjadi null sebelum dikirim
    const cleanedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value === "" ? null : value])
    );

    try {
      const res = await fetch("/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedData),
      });

      const result = await res.json();
      if (result.success) {
        setShowSuccess(true);
        setTimeout(() => {
          router.push("/biodata");
        }, 1500);
      } else {
        alert(result.error || "Gagal menyimpan");
      }
    } catch (error) {
      alert("Terjadi kesalahan sistem");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full min-h-screen absolute inset-0 p-6">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className={`flex flex-col w-full p-6 overflow-y-auto transition-all ${isSidebarOpen ? "md:ml-60" : "md:ml-16"}`}>
        <h1 className="text-2xl font-bold mb-6">Tambah Pasien Baru</h1>

        {showSuccess && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="p-8 bg-green-500 text-white text-xl font-bold rounded-lg shadow-lg">Data berhasil disimpan!</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-950 p-4 rounded-lg shadow-sm"><label className="text-white text-sm block mb-1">Inisial</label><input name="inisial" required value={formData.inisial} onChange={handleChange} className="w-full px-3 py-2 rounded bg-white text-black" /></div>
          
          <div className="bg-blue-950 p-4 rounded-lg shadow-sm"><label className="text-white text-sm block mb-1">Umur</label><input type="number" name="umur" required value={formData.umur} onChange={handleChange} className="w-full px-3 py-2 rounded bg-white text-black" /></div>
          <div className="bg-blue-950 p-4 rounded-lg shadow-sm"><label className="text-white text-sm block mb-1">Kategori Usia (Auto)</label><input name="kategori_usia" readOnly value={formData.kategori_usia} className="w-full px-3 py-2 rounded bg-gray-300 text-gray-700 cursor-not-allowed" /></div>

          <div className="bg-blue-950 p-4 rounded-lg shadow-sm">
            <label className="text-white text-sm block mb-1">Gender</label>
            <select name="gender" required value={formData.gender} onChange={handleChange} className="w-full px-3 py-2 rounded bg-white text-black">
              <option value="">Pilih</option><option value="Laki-Laki">Laki-Laki</option><option value="Perempuan">Perempuan</option>
            </select>
          </div>

          <div className="bg-blue-950 p-4 rounded-lg shadow-sm">
            <label className="text-white text-sm block mb-1">Agama</label>
            <select name="agama" required value={formData.agama} onChange={handleChange} className="w-full px-3 py-2 rounded bg-white text-black">
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

          <div className="bg-blue-950 p-4 rounded-lg shadow-sm">
            <label className="text-white text-sm block mb-1">Pendidikan</label>
            <select name="pendidikan" required value={formData.pendidikan} onChange={handleChange} className="w-full px-3 py-2 rounded bg-white text-black">
              <option value="">Pilih</option>
              <option value="Tidak Sekolah">Tidak Sekolah</option>
              <option value="SD/Sederajat">SD/Sederajat</option>
              <option value="SMP/Sederajat">SMP/Sederajat</option>
              <option value="SMA/Sederajat">SMA/Sederajat</option>
              <option value="S1/D4">S1/D4</option>
              <option value="S2/S3">S2/S3</option>
            </select>
          </div>

          <div className="bg-blue-950 p-4 rounded-lg shadow-sm">
            <label className="text-white text-sm block mb-1">Status Pernikahan</label>
            <select name="status" required value={formData.status} onChange={handleChange} className="w-full px-3 py-2 rounded bg-white text-black">
              <option value="">Pilih</option>
              <option value="Belum Menikah">Belum Menikah</option>
              <option value="Menikah">Menikah</option>
              <option value="Duda/Janda">Duda/Janda</option>
            </select>
          </div>

          <div className="bg-blue-950 p-4 rounded-lg shadow-sm">
            <label className="text-white text-sm block mb-1">Keterangan / Status</label>
            <select name="keterangan" required value={formData.keterangan} onChange={handleChange} className="w-full px-3 py-2 rounded bg-white text-black">
              <option value="">Pilih</option>
              <option value="Voluntary">Voluntary</option>
              <option value="TAT(Voluntary)">TAT(Voluntary)</option>
              <option value="Compulsory">Compulsory</option>
            </select>
          </div>

          <div className="bg-blue-950 p-4 rounded-lg shadow-sm">
            <label className="text-white text-sm block mb-1">Rencana Rehab</label>
            <select name="rencana_rehab" value={formData.rencana_rehab} onChange={handleChange} className="w-full px-3 py-2 rounded bg-white text-black">
              <option value="">Pilih</option>
              <option value="BERAT">BERAT</option>
              <option value="SEDANG">SEDANG</option>
              <option value="RINGAN">RINGAN</option>
            </select>
          </div>

          <div className="bg-blue-950 p-4 rounded-lg shadow-sm"><label className="text-white text-sm block mb-1">Pekerjaan</label><input name="pekerjaan" required value={formData.pekerjaan} onChange={handleChange} className="w-full px-3 py-2 rounded bg-white text-black" /></div>
          <div className="bg-blue-950 p-4 rounded-lg shadow-sm"><label className="text-white text-sm block mb-1">Tempat Lahir</label><input name="tempat_lahir" value={formData.tempat_lahir} onChange={handleChange} className="w-full px-3 py-2 rounded bg-white text-black" /></div>
          <div className="bg-blue-950 p-4 rounded-lg shadow-sm"><label className="text-white text-sm block mb-1">Tanggal Lahir</label><input type="date" name="tanggal_lahir" value={formData.tanggal_lahir} onChange={handleChange} className="w-full px-3 py-2 rounded bg-white text-black" /></div>
          
          <div className="bg-blue-950 p-4 rounded-lg shadow-sm">
            <label className="text-white text-sm block mb-1">Asal Provinsi</label>
            <select name="asal_provinsi" required value={formData.asal_provinsi} onChange={handleChange} className="w-full px-3 py-2 rounded bg-white text-black">
              <option value="">Pilih Provinsi</option>
              {DAFTAR_PROVINSI.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div className="bg-blue-950 p-4 rounded-lg shadow-sm"><label className="text-white text-sm block mb-1">Usia Pertama Pakai</label><input type="number" name="usia_pertama_kali" value={formData.usia_pertama_kali} onChange={handleChange} className="w-full px-3 py-2 rounded bg-white text-black" /></div>
          <div className="bg-blue-950 p-4 rounded-lg shadow-sm"><label className="text-white text-sm block mb-1">Tanggal Masuk</label><input type="date" name="tanggal_masuk" required value={formData.tanggal_masuk} onChange={handleChange} className="w-full px-3 py-2 rounded bg-white text-black" /></div>

          {/* ZAT & MOTIF MULTI SELECT */}
          <div className="bg-blue-950 p-4 rounded-lg shadow-sm md:col-span-2 lg:col-span-3 mt-2">
            <label className="text-white text-sm block font-bold mb-1">Penggunaan Zat</label>
            <p className="text-xs text-blue-200 mb-3 italic">ℹ️ Anda dapat memilih lebih dari satu dengan mengklik tag di bawah ini, atau mengetik zat baru secara manual di dalam kotak (pisahkan dengan tanda koma).</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {COMMON_ZAT.map(z => (
                <button 
                  key={z} 
                  type="button" 
                  onClick={() => handleToggleTag(formData.penggunaan_zat, z, "penggunaan_zat")} 
                  className={`px-3 py-1 rounded-full text-xs border transition ${formData.penggunaan_zat?.includes(z) ? 'bg-teal-500 text-white border-teal-500' : 'bg-white text-black hover:bg-gray-200'}`}
                >
                  {z}
                </button>
              ))}
            </div>
            <input 
              name="penggunaan_zat" 
              placeholder="Ketik zat lain di sini (contoh: Sabu, Ganja)..." 
              value={formData.penggunaan_zat} 
              onChange={handleChange} 
              className="w-full px-3 py-2 rounded bg-white text-black" 
            />
          </div>

          <div className="bg-blue-950 p-4 rounded-lg shadow-sm md:col-span-2 lg:col-span-3">
            <label className="text-white text-sm block font-bold mb-1">Motif Penggunaan</label>
            <p className="text-xs text-blue-200 mb-3 italic">ℹ️ Anda dapat memilih lebih dari satu dengan mengklik tag di bawah ini, atau mengetik motif baru secara manual di dalam kotak (pisahkan dengan tanda koma).</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {COMMON_MOTIF.map(m => (
                <button 
                  key={m} 
                  type="button" 
                  onClick={() => handleToggleTag(formData.motif_penggunaan, m, "motif_penggunaan")} 
                  className={`px-3 py-1 rounded-full text-xs border transition ${formData.motif_penggunaan?.includes(m) ? 'bg-teal-500 text-white border-teal-500' : 'bg-white text-black hover:bg-gray-200'}`}
                >
                  {m}
                </button>
              ))}
            </div>
            <input 
              name="motif_penggunaan" 
              placeholder="Ketik motif lain di sini..." 
              value={formData.motif_penggunaan} 
              onChange={handleChange} 
              className="w-full px-3 py-2 rounded bg-white text-black" 
            />
          </div>

          <div className="col-span-full flex justify-between mt-4">
            <button type="button" onClick={() => router.push("/biodata")} className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition">Kembali</button>
            <button type="submit" disabled={isLoading} className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600 font-bold transition disabled:opacity-50">
              {isLoading ? "Menyimpan..." : "Simpan Data"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}