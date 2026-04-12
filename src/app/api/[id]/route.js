import { supabase } from "@/lib/supabase";

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    
    // Cegah id "undefined"
    if (!id || id === "undefined") {
      return Response.json({ success: false, error: "ID Klien tidak valid" }, { status: 400 });
    }

    const body = await req.json();

    const payload = {
      INISIAL: body.INISIAL,
      GENDER: body.GENDER,
      KATEGORI_USIA: body.KATEGORI_USIA,
      UMUR: body.UMUR ? Number(body.UMUR) : null,
      TEMPAT_LAHIR: body.TEMPAT_LAHIR,
      TANGGAL_LAHIR: body.TANGGAL_LAHIR || null,
      AGAMA: body.AGAMA,
      PENDIDIKAN: body.PENDIDIKAN,
      STATUS: body.STATUS,
      PEKERJAAN: body.PEKERJAAN,
      TANGGAL_MASUK: body.TANGGAL_MASUK || null,
      RENCANA_REHAB: body.RENCANA_REHAB,
      TANGGAL_KELUAR: body.TANGGAL_KELUAR || null,
      "KETERANGAN/STATUS": body["KETERANGAN/STATUS"],
      USIA_PERTAMA_KALI: body.USIA_PERTAMA_KALI ? Number(body.USIA_PERTAMA_KALI) : null,
      ASAL_PROVINSI: body.ASAL_PROVINSI,
      MOTIF_PENGGUNAAN: body.MOTIF_PENGGUNAAN,
      PENGGUNAAN_ZAT: body.PENGGUNAAN_ZAT,
    };

    const { data, error } = await supabase
      .from("data_client")
      .update(payload)
      .eq("id", id)
      .select();

    if (error) throw error;
    return Response.json({ success: true, data });
  } catch (err) {
    console.error("Server Error:", err);
    return Response.json({ success: false, error: err.message || "Terjadi kesalahan" }, { status: 500 });
  }
}