import { supabase } from "@/lib/supabase";

// ✅ GET ALL DATA
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("data_client")
      .select("*");

    if (error) {
      console.error("SUPABASE ERROR:", error);
      return Response.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return Response.json({ success: true, data });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return Response.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

// (POST kamu biarkan tetap)
export async function POST(req) {
  try {
    const body = await req.json();

    const payload = {
      INISIAL: body.inisial,
      GENDER: body.gender,
      KATEGORI_USIA: body.kategori_usia,
      UMUR: Number(body.umur),
      TEMPAT_LAHIR: body.tempat_lahir,
      TANGGAL_LAHIR: body.tanggal_lahir,
      AGAMA: body.agama,
      PENDIDIKAN: body.pendidikan,
      STATUS: body.status,
      PEKERJAAN: body.pekerjaan,
      TANGGAL_MASUK: body.tanggal_masuk,
      RENCANA_REHAB: body.rencana_rehab,
      "KETERANGAN/STATUS": body.keterangan,
      USIA_PERTAMA_KALI: Number(body.usia_pertama_kali),
      ASAL_PROVINSI: body.asal_provinsi,
      MOTIF_PENGGUNAAN: body.motif_penggunaan,
      PENGGUNAAN_ZAT: body.penggunaan_zat,
    };

    const { data, error } = await supabase
      .from("data_client")
      .insert([payload])
      .select();

    if (error) {
      return Response.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return Response.json({ success: true, data });
  } catch (err) {
    return Response.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}