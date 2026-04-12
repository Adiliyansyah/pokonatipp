"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";

// ======================
// TYPE DATABASE
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

export default function DetailClientPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [data, setData] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // ======================
  // FETCH DETAIL
  // ======================
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`/api/patients/${id}`);
        const json = await res.json();

        if (json.success) {
          setData(json.data);
        } else {
          setData(null);
        }
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDetail();
  }, [id]);

  // ======================
  // HANDLE INPUT CHANGE
  // ======================
  const handleChange = (field: keyof Client, value: string) => {
    if (!data) return;
    setData({
      ...data,
      [field]: value,
    });
  };

  // ======================
  // SIMPAN DATA
  // ======================
  const handleSave = async () => {
    if (!data) return;

    setSaving(true);
    try {
      const res = await fetch(`/api/patients/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (json.success) {
        setShowSuccess(true);

        setTimeout(() => {
          setShowSuccess(false);
          router.back();
        }, 1500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  // ======================
  // LOADING
  // ======================
  if (loading) {
    return (
      <div className="p-6 text-gray-500">
        Loading data...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 text-red-500">
        Data tidak ditemukan
      </div>
    );
  }

  // ======================
  // UI
  // ======================
  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-800">
          Detail Klien
        </h1>

        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 px-3 py-2 border rounded-lg hover:bg-gray-100"
        >
          <ChevronLeft size={16} />
          Kembali
        </button>
      </div>

      {/* CARD DATA */}
      <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow">
        <div>
          <label className="text-xs text-gray-500">Inisial</label>
          <input
            value={data.INISIAL ?? ""}
            onChange={(e) => handleChange("INISIAL", e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500">Gender</label>
          <input
            value={data.GENDER ?? ""}
            onChange={(e) => handleChange("GENDER", e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500">Umur</label>
          <input
            value={data.UMUR ?? ""}
            onChange={(e) => handleChange("UMUR", e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500">Pekerjaan</label>
          <input
            value={data.PEKERJAAN ?? ""}
            onChange={(e) => handleChange("PEKERJAAN", e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500">Provinsi</label>
          <input
            value={data.ASAL_PROVINSI ?? ""}
            onChange={(e) =>
              handleChange("ASAL_PROVINSI", e.target.value)
            }
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500">Status</label>
          <input
            value={data.STATUS ?? ""}
            onChange={(e) => handleChange("STATUS", e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="col-span-2">
          <label className="text-xs text-gray-500">
            Tanggal Keluar
          </label>
          <input
            value={data.TANGGAL_KELUAR ?? ""}
            onChange={(e) =>
              handleChange("TANGGAL_KELUAR", e.target.value)
            }
            className="w-full border p-2 rounded"
          />
        </div>
      </div>

      {/* BUTTON */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 border rounded-lg"
        >
          Kembali
        </button>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          {saving ? "Menyimpan..." : "Simpan"}
        </button>
      </div>

      {/* POPUP SUCCESS */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h2 className="text-green-600 font-bold text-lg">
              Berhasil!
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Data berhasil disimpan
            </p>
          </div>
        </div>
      )}
    </div>
  );
}