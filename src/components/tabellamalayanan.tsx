"use client";

const data = [
  {
    jenis_layanan: "Asesmen ASI (Addiction Severity Index)",
    waktu_layanan: "40 menit",
  },
  {
    jenis_layanan: "Proses Penerimaan Klien",
    waktu_layanan: "154 menit",
  },
];

export default function TableModern() {
  return (
    <div className="w-full p-4">
      <div className="min-w-[1150px] bg-white rounded-2xl shadow-md overflow-hidden">
        
        {/* Header */}
        <div className="grid grid-cols-[400px_800px] bg-blue-300 px-8 py-5 font-semibold text-black text-center">
          <div>Jenis Layanan</div>
          <div>Waktu Layanan</div>
        </div>

        {/* Data */}
        {data.map((item, index) => (
          <div
          key={index}
          className="grid grid-cols-[400px_800px] px-8 py-5 items-center  hover:bg-gray-50 transition text-center"
          >
            <div>{item.jenis_layanan}</div>
            <div>{item.waktu_layanan}</div>
            <div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}