"use client";

import Sidebar from "@/components/sidebar";
import { useState } from "react";
import { useRouter } from "next/navigation";

// TYPE FORM
type FormDataType = {
  inisial: string;
  gender: string;
  kategori_usia: string;
  umur: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  agama: string;
  pendidikan: string;
  status: string;
  pekerjaan: string;
  tanggal_masuk: string;
  rencana_rehab: string;
  keterangan: string;
  usia_pertama_kali: string;
  asal_provinsi: string;
  motif_penggunaan: string;
  penggunaan_zat: string;
};

export default function TambahPasienPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState<FormDataType>({
    inisial: "",
    gender: "",
    kategori_usia: "",
    umur: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    agama: "",
    pendidikan: "",
    status: "",
    pekerjaan: "",
    tanggal_masuk: "",
    rencana_rehab: "",
    keterangan: "",
    usia_pertama_kali: "",
    asal_provinsi: "",
    motif_penggunaan: "",
    penggunaan_zat: "",
  });

  // HANDLE CHANGE
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        ...formData,

        // safety conversion
        umur: formData.umur ? Number(formData.umur) : null,
        usia_pertama_kali: formData.usia_pertama_kali
          ? Number(formData.usia_pertama_kali)
          : null,
      };

      const res = await fetch("/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setShowSuccess(true);

        setTimeout(() => {
          setShowSuccess(false);
          router.push("/pendaki/data");
        }, 1500);
      } else {
        console.error(result);
        alert(result.error || "Gagal menyimpan data");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full min-h-screen absolute inset-0 p-6">
    

      <div
        className={`flex flex-col transition-all duration-300 w-full p-6 overflow-y-auto ${
          isSidebarOpen ? "md:ml-60" : "md:ml-16"
        }`}
      >
        <h1 className="text-2xl font-bold mb-6">Tambah Pasien</h1>

        {/* SUCCESS MODAL */}
        {showSuccess && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="p-8 bg-green-500 text-white text-xl font-bold rounded-lg shadow-lg">
              Data berhasil disimpan!
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* INPUT AUTO GENERATE */}
          {[
            { label: "Inisial", name: "inisial" },
            { label: "Kategori Usia", name: "kategori_usia" },
            { label: "Umur", name: "umur", type: "number" },
            { label: "Tempat Lahir", name: "tempat_lahir" },
            { label: "Tanggal Lahir", name: "tanggal_lahir", type: "date" },
            { label: "Agama", name: "agama" },
            { label: "Pendidikan", name: "pendidikan" },
            { label: "Status", name: "status" },
            { label: "Pekerjaan", name: "pekerjaan" },
            { label: "Tanggal Masuk", name: "tanggal_masuk", type: "date" },
            { label: "Rencana Rehab", name: "rencana_rehab" },
            { label: "Keterangan", name: "keterangan" },
            {
              label: "Usia Pertama Kali",
              name: "usia_pertama_kali",
              type: "number",
            },
            { label: "Asal Provinsi", name: "asal_provinsi" },
            { label: "Motif Penggunaan", name: "motif_penggunaan" },
            { label: "Penggunaan Zat", name: "penggunaan_zat" },
          ].map((field) => (
            <div
              key={field.name}
              className="border border-gray-300 bg-blue-950 rounded-lg p-4 shadow-sm"
            >
              <label className="text-white font-medium mb-2 block">
                {field.label}
              </label>

              <input
                type={field.type || "text"}
                name={field.name}
                value={formData[field.name as keyof FormDataType]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-black"
                required
              />
            </div>
          ))}

          {/* GENDER */}
          <div className="border border-gray-300 bg-blue-950 rounded-lg p-4 shadow-sm">
            <label className="text-white font-medium mb-2 block">
              Jenis Kelamin
            </label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 bg-white text-black"
              required
            >
              <option value="">Pilih</option>
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select>
          </div>

          {/* BUTTON */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => router.push("/pendaki/data")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Kembali
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-teal-700 disabled:bg-teal-400"
            >
              {isLoading ? "Menyimpan..." : "Simpan Data"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}