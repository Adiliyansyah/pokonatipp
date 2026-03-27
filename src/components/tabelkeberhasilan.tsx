"use client";

const data = [
  {
    no: 1,
    jenis_kelamin: "Pria",
    umur: 28,
    tanggal_masuk: "15 Jan 2026",
    tanggal_keluar: "25 Feb 2026",
    lama_rehabilitasi: "41 hari",
    status: "Pulih",
  },
  {
    no: 2,
    jenis_kelamin: "Wanita",
    umur: 24,
    tanggal_masuk: "20 Jan 2026",
    tanggal_keluar: "02 Mar 2026",
    lama_rehabilitasi: "42 hari",
    status: "Pulih",
  },
  {
    no: 3,
    jenis_kelamin: "Pria",
    umur: 32,
    tanggal_masuk: "10 Feb 2026",
    tanggal_keluar: "23 Mar 2026",
    lama_rehabilitasi: "41 hari",
    status: "Pulih",
  },
  {
    no: 4,
    jenis_kelamin: "Wanita",
    umur: 26,
    tanggal_masuk: "05 Feb 2026",
    tanggal_keluar: "18 Mar 2026",
    lama_rehabilitasi: "41 hari",
    status: "Pulih",
  },
  {
    no: 5,
    jenis_kelamin: "Pria",
    umur: 30,
    tanggal_masuk: "01 Mar 2026",
    tanggal_keluar: "12 Apr 2026",
    lama_rehabilitasi: "42 hari",
    status: "Pulih",
  },
  {
    no: 6,
    jenis_kelamin: "Wanita",
    umur: 27,
    tanggal_masuk: "12 Mar 2026",
    tanggal_keluar: "23 Apr 2026",
    lama_rehabilitasi: "42 hari",
    status: "Pulih",
  },
  {
    no: 7,
    jenis_kelamin: "Pria",
    umur: 35,
    tanggal_masuk: "18 Feb 2026",
    tanggal_keluar: "01 Apr 2026",
    lama_rehabilitasi: "42 hari",
    status: "Pulih",
  },
  {
    no: 8,
    jenis_kelamin: "Pria",
    umur: 29,
    tanggal_masuk: "22 Jan 2026",
    tanggal_keluar: "05 Mar 2026",
    lama_rehabilitasi: "42 hari",
    status: "Pulih",
  },
];

export default function TableModern() {
  return (
    <div className="w-full p-4">
      <div className="min-w-[1125px] bg-white rounded-2xl shadow-md overflow-hidden">
        
        {/* Header */}
        <div className="grid grid-cols-[80px_180px_110px_230px_230px_180px_140px] bg-green-200 px-8 py-5 font-semibold text-gray-700">
          <div>No</div>
          <div>Jenis Kelamin</div>
          <div>Umur</div>
          <div>Tanggal Masuk</div>
          <div>Tanggal Keluar</div>
          <div>Lama Rehab</div>
          <div>Status</div>
        </div>

        {/* Data */}
        {data.map((item) => (
          <div
            key={item.no}
            className="grid grid-cols-[95px_180px_110px_230px_240px_155px_120px] px-8 py-5 items-center hover:bg-gray-50 transition"
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
                  item.status === "Pulih"
                    ? "bg-green-100 text-green-600"
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