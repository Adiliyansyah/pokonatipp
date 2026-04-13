"use client";

import Sidebar from "@/components/sidebar";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
          <div className="bg-blue-950 p-4 rounded-lg shadow-sm"><label className="text-white text-sm block mb-1">Inisial</label><input name="inisial" required onChange={handleChange} className="w-full px-3 py-2 rounded bg-white" /></div>
          
          <div className="bg-blue-950 p-4 rounded-lg shadow-sm"><label className="text-white text-sm block mb-1">Umur</label><input type="number" name="umur" required onChange={handleChange} className="w-full px-3 py-2 rounded bg-white" /></div>
          <div className="bg-blue-950 p-4 rounded-lg shadow-sm"><label className="text-white text-sm block mb-1">Kategori Usia (Auto)</label><input name="kategori_usia" readOnly value={formData.kategori_usia} className="w-full px-3 py-2 rounded bg-gray-200 cursor-not-allowed" /></div>

          <div className="bg-blue-950 p-4 rounded-lg shadow-sm">
            <label className="text-white text-sm block mb-1">Gender</label>
            <select name="gender" required onChange={handleChange} className="w-full px-3 py-2 rounded bg-white text-black">
              <option value="">Pilih</option><option value="Laki-Laki">Laki-Laki</option><option value="Perempuan">Perempuan</option>
            </select>
          </div>

          <div className="bg-blue-950 p-4 rounded-lg shadow-sm">
            <label className="text-white text-sm block mb-1">Agama</label>
            <select name="agama" required onChange={handleChange} className="w-full px-3 py-2 rounded bg-white text-black">
              <option value="">Pilih</option><option value="Islam">Islam</option><option value="Kristen">Kristen</option><option value="Katolik">Katolik</option><option value="Hindu">Hindu</option><option value="Buddha">Buddha</option><option value="Konghucu">Konghucu</option>
            </select>
          </div>

          <div className="bg-blue-950 p-4 rounded-lg shadow-sm">
            <label className="text-white text-sm block mb-1">Pendidikan</label>
            <select name="pendidikan" required onChange={handleChange} className="w-full px-3 py-2 rounded bg-white text-black">
              <option value="">Pilih</option><option value="Tidak Sekolah">Tidak Sekolah</option><option value="SD/Sederajat">SD/Sederajat</option><option value="SMP/Sederajat">SMP/Sederajat</option><option value="SMA/Sederajat">SMA/Sederajat</option><option value="S1/D4">S1/D4</option>
            </select>
          </div>

          <div className="bg-blue-950 p-4 rounded-lg shadow-sm">
            <label className="text-white text-sm block mb-1">Keterangan / Status</label>
            <select name="keterangan" required onChange={handleChange} className="w-full px-3 py-2 rounded bg-white text-black">
              <option value="">Pilih</option><option value="Voluntary">Voluntary</option><option value="TAT(Voluntary)">TAT(Voluntary)</option><option value="Compulsory">Compulsory</option>
            </select>
          </div>

          <div className="bg-blue-950 p-4 rounded-lg shadow-sm"><label className="text-white text-sm block mb-1">Pekerjaan</label><input name="pekerjaan" required onChange={handleChange} className="w-full px-3 py-2 rounded bg-white" /></div>
          <div className="bg-blue-950 p-4 rounded-lg shadow-sm"><label className="text-white text-sm block mb-1">Asal Provinsi</label><input name="asal_provinsi" required onChange={handleChange} className="w-full px-3 py-2 rounded bg-white" /></div>
          <div className="bg-blue-950 p-4 rounded-lg shadow-sm"><label className="text-white text-sm block mb-1">Tanggal Masuk</label><input type="date" name="tanggal_masuk" required onChange={handleChange} className="w-full px-3 py-2 rounded bg-white" /></div>

          {/* Zat & Motif diubah ke text input dengan petunjuk koma */}
          <div className="bg-blue-950 p-4 rounded-lg shadow-sm md:col-span-2">
            <label className="text-white text-sm block mb-1">Motif Penggunaan (Pisahkan dengan koma)</label>
            <input name="motif_penggunaan" placeholder="Cth: Eksperimen / Coba-coba, Faktor Sosial" required onChange={handleChange} className="w-full px-3 py-2 rounded bg-white" />
          </div>
          
          <div className="bg-blue-950 p-4 rounded-lg shadow-sm md:col-span-2 lg:col-span-1">
            <label className="text-white text-sm block mb-1">Penggunaan Zat (Pisahkan dengan koma)</label>
            <input name="penggunaan_zat" placeholder="Cth: Sabu, Ganja" required onChange={handleChange} className="w-full px-3 py-2 rounded bg-white" />
          </div>

          <div className="col-span-full flex justify-between mt-4">
            <button type="button" onClick={() => router.push("/biodata")} className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600">Kembali</button>
            <button type="submit" disabled={isLoading} className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600 font-bold">{isLoading ? "Menyimpan..." : "Simpan Data"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}