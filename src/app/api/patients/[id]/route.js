import { supabase } from "@/lib/supabase";

export async function PUT(req, { params }) {
  try {
    // 1. Ambil ID dari URL
    const id = params.id;
    
    // 2. Ambil data yang dikirim dari frontend
    const body = await req.json();

    // 3. Persiapkan payload (data yang akan diupdate). 
    // Kita tangani masalah string kosong untuk kolom tanggal dan angka.
    const payload = {
      INISIAL: body.INISIAL,
      GENDER: body.GENDER,
      UMUR: body.UMUR === "" || body.UMUR === null ? null : Number(body.UMUR),
      PEKERJAAN: body.PEKERJAAN,
      ASAL_PROVINSI: body.ASAL_PROVINSI,
      PENGGUNAAN_ZAT: body.PENGGUNAAN_ZAT,
      TANGGAL_MASUK: body.TANGGAL_MASUK === "" ? null : body.TANGGAL_MASUK,
      TANGGAL_KELUAR: body.TANGGAL_KELUAR === "" ? null : body.TANGGAL_KELUAR,
      // Anda bisa menambahkan field lain yang perlu di-update di sini
    };

    // 4. Lakukan update ke Supabase berdasarkan ID
    const { data, error } = await supabase
      .from("data_client") // Pastikan nama tabel ini benar
      .update(payload)
      .eq("id", id)
      .select();

    // 5. Jika terjadi error dari Supabase
    if (error) {
      console.error("Supabase Error:", error);
      return Response.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    // 6. Jika berhasil
    return Response.json({ success: true, data });

  } catch (err) {
    console.error("Server Error:", err);
    return Response.json(
      { success: false, error: "Terjadi kesalahan di server backend" },
      { status: 500 }
    );
  }
}