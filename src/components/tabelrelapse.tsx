"use client";

const data = [
  {
    no: 1,
    jenis_kelamin: "Pria",
    umur: 28,
    tanggal_masuk: "08 Jan 2026",
    tanggal_keluar: "15 Feb 2026",
    lama_rehabilitasi: "38 hari",
    status: "Relaps",
  },
  {
    no: 2,
    jenis_kelamin: "Pria",
    umur: 25,
    tanggal_masuk: "14 Feb 2026",
    tanggal_keluar: "20 Mar 2026",
    lama_rehabilitasi: "34 hari",
    status: "Relaps",
  },
  {
    no: 3,
    jenis_kelamin: "Wanita",
    umur: 25,
    tanggal_masuk: "22 Feb 2026",
    tanggal_keluar: "28 Mar 2026",
    lama_rehabilitasi: "34 hari",
    status: "Relaps",
  },
  {
    no: 4,
    jenis_kelamin: "Pria",
    umur: 33,
    tanggal_masuk: "05 Mar 2026",
    tanggal_keluar: "10 Apr 2026",
    lama_rehabilitasi: "36 hari",
    status: "Relaps",
  },
  {
    no: 5,
    jenis_kelamin: "Pria",
    umur: 27,
    tanggal_masuk: "18 Mar2026",
    tanggal_keluar: "22 Apr 2026",
    lama_rehabilitasi: "35 hari",
    status: "Relaps",
  },
];

export default function TableModern() {
  return (
    <div className="w-full p-4">
      <div className="min-w-[1125px] bg-white rounded-2xl shadow-md overflow-hidden">
        
        {/* Header */}
        <div className="grid grid-cols-[80px_180px_110px_190px_230px_220px_140px] bg-orange-600 px-8 py-5 font-semibold text-gray-700">
          <div>No</div>
          <div>Jenis Kelamin</div>
          <div>Umur</div>
          <div>Tanggal Masuk</div>
          <div>Tanggal Keluar</div>
          <div>Lama Rehabilitasi</div>
          <div>Status</div>
        </div>

        {/* Data */}
        {data.map((item) => (
          <div
            key={item.no}
            className="grid grid-cols-[115px_160px_110px_190px_265px_160px_120px] px-8 py-5 items-center hover:bg-gray-50 transition"
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
                  item.status === "Relaps"
                    ? "bg-red-200 text-red-600"
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