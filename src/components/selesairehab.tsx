"use client";

const data = [
  {
    no: 1,
    jenis_kelamin: "Wanita",
    umur: 29,
    tanggal_masuk: "10 Jan 2026",
    tanggal_keluar: "22 feb 2026",
    lama_rehabilitasi: "43 hari",
    status: "Selesai",
  },
  {
    no: 2,
    jenis_kelamin: "Pria",
    umur: 34,
    tanggal_masuk: "17 Jan 2026",
    tanggal_keluar: "01 Mar 2026",
    lama_rehabilitasi: "43 hari",
    status: "Selesai",
  },
  {
    no: 3,
    jenis_kelamin: "Pria",
    umur: 26,
    tanggal_masuk: "25 Feb 2026",
    tanggal_keluar: "08 Apr 2026",
    lama_rehabilitasi: "42 hari",
    status: "Selesai",
  },
  {
    no: 4,
    jenis_kelamin: "Wanita",
    umur: 31,
    tanggal_masuk: "03 Mar 2026",
    tanggal_keluar: "15 Apr 2026",
    lama_rehabilitasi: "43 hari",
    status: "Selesai",
  },{
    no: 5,
    jenis_kelamin: "Pria",
    umur: 28,
    tanggal_masuk: "10 Mar 2026",
    tanggal_keluar: "22 Apr 2026",
    lama_rehabilitasi: "43 hari",
    status: "Selesai",
  },{
    no: 6,
    jenis_kelamin: "Pria",
    umur: 30,
    tanggal_masuk: "15 Mar 2026",
    tanggal_keluar: "27 Apr 2026",
    lama_rehabilitasi: "43 hari",
    status: "Selesai",
  },
];

export default function TableModern() {
  return (
    <div className="w-full p-4">
      <div className="min-w-[1125px] bg-white rounded-2xl shadow-md overflow-hidden">
        
        {/* Header */}
        <div className="grid grid-cols-[80px_180px_110px_230px_230px_180px_140px] bg-blue-400 px-8 py-5 font-semibold text-gray-700">
          <div>No</div>
          <div>Jenis Kelamin</div>
          <div>Umur</div>
          <div>Tanggal Masuk</div>
          <div>Tanggal Keluar</div>
          <div>Lama</div>
          <div>Status</div>
        </div>

        {/* Data */}
        {data.map((item) => (
          <div
            key={item.no}
            className="grid grid-cols-[95px_180px_110px_230px_215px_160px_120px] px-8 py-5 items-center hover:bg-gray-50 transition"
          >
            <div>{item.no}</div>
            <div>{item.jenis_kelamin}</div>
            <div>{item.umur}</div>
            <div>{item.tanggal_masuk}</div>
            <div>{item.tanggal_keluar}</div>
            <div>{item.lama_rehabilitasi}</div>
            <div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  item.status === "Selesai"
                    ? "bg-green-100 text-blue-400"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}