import { supabase } from "@/lib/supabase";

export async function PUT(req, { params }) {
  try {
    // 1. Await params untuk Next.js versi terbaru
    const { id } = await params;

    // Validasi jika ID tidak ada atau string "undefined"
    if (!id || id === "undefined") {
      return Response.json({ success: false, error: "ID Pasien tidak valid" }, { status: 400 });
    }

    const body = await req.json();

    // 2. Fungsi pembantu untuk menangani empty string menjadi null
    const toNull = (val) => (val === "" || val === undefined ? null : val);
    const toNumberNull = (val) => (val === "" || val === undefined || isNaN(val) ? null : Number(val));

    const payload = {
      INISIAL: toNull(body.INISIAL),
      GENDER: toNull(body.GENDER),
      UMUR: toNumberNull(body.UMUR),
      KATEGORI_USIA: toNull(body.KATEGORI_USIA),
      TEMPAT_LAHIR: toNull(body.TEMPAT_LAHIR),
      TANGGAL_LAHIR: toNull(body.TANGGAL_LAHIR),
      AGAMA: toNull(body.AGAMA),
      PENDIDIKAN: toNull(body.PENDIDIKAN),
      STATUS: toNull(body.STATUS),
      PEKERJAAN: toNull(body.PEKERJAAN),
      TANGGAL_MASUK: toNull(body.TANGGAL_MASUK),
      RENCANA_REHAB: toNull(body.RENCANA_REHAB),
      TANGGAL_KELUAR: toNull(body.TANGGAL_KELUAR),
      "KETERANGAN/STATUS": toNull(body["KETERANGAN/STATUS"]),
      USIA_PERTAMA_KALI: toNumberNull(body.USIA_PERTAMA_KALI),
      ASAL_PROVINSI: toNull(body.ASAL_PROVINSI),
      MOTIF_PENGGUNAAN: toNull(body.MOTIF_PENGGUNAAN),
      PENGGUNAAN_ZAT: toNull(body.PENGGUNAAN_ZAT),
    };

    const { data, error } = await supabase
      .from("data_client")
      .update(payload)
      .eq("id", id)
      .select();

    if (error) throw error;

    return Response.json({ success: true, data });
  } catch (err) {
    console.error("API Error:", err);
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    const { error } = await supabase
      .from("data_client")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return Response.json({ success: true, message: "Data berhasil dihapus" });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}