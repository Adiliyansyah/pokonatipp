"use client";

const data = [
  {
    kegiatan: "Rehabilitasi Narkoba Rawat Inap",
    biaya_perorang: "Rp 4.743.000",
    keterangan: "Biaya rehabilitasi ini meliputi layanan penerimaan awal, layanan monitoring evaluasi fisik & psikologis (MEFP), layanan lanjutan, dan layanan pilihan.",
  },
];

export default function TableModern() {
  return (
    <div className="w-full p-4">
      <div className="min-w-[1150px] bg-white rounded-2xl shadow-md overflow-hidden">
        
        {/* Header */}
        <div className="grid grid-cols-[400px_325px_400px] bg-gray-300 px-8 py-5 font-semibold text-black text-center">
          <div>Kegiatan</div>
          <div>Rata-rata Biaya Perawatan Per Orang/Bulan</div>
          <div>Keterangan</div>
        </div>

        {/* Data */}
{data.map((item, index) => (
  <div
    key={index}
    className="grid grid-cols-[400px_350px_350px] px-8 py-5 items-center hover:bg-gray-50 transition text-center"
  >
    <div>{item.kegiatan}</div>
    <div>{item.biaya_perorang}</div>
    <div>{item.keterangan}</div>
  </div>
    
        ))}
      </div>
    </div>
  );
}