"use client";

const data = [
  {
    no: 1,
    nama: "Bambang Sutrisno",
    jabatan: "Konselor Aksi Pertama",
    tanggal_masuk: "10 Jan 2023",
    tanggal_keluar: "05 Feb 2026",
    alasan: "Pindah Tugas",
  },
  {
    no: 2,
    nama: "Dewi Rahayu",
    jabatan: "Perawat Terampil",
    tanggal_masuk: "15 Mar 2022",
    tanggal_keluar: "20 Jan 2026",
    alasan: "Pensiun",
  },
  {
    no: 3,
    nama: "Agus Prasetyo",
    jabatan: "Asisten Konselor",
    tanggal_masuk: "01 Jun 2021",
    tanggal_keluar: "28 Feb 2026",
    alasan: "Resign",
  },
];

export default function TabelTurnover() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[50px_200px_200px_160px_160px_140px] bg-purple-400 px-6 py-4 font-semibold text-white text-sm">
          <div>No</div>
          <div>Nama</div>
          <div>Jabatan</div>
          <div>Tgl Masuk</div>
          <div>Tgl Keluar</div>
          <div>Alasan</div>
        </div>

        {data.map((item) => (
          <div
            key={item.no}
            className="grid grid-cols-[50px_200px_200px_160px_160px_140px] px-6 py-4 items-center hover:bg-purple-50 transition text-sm border-t border-gray-100"
          >
            <div>{item.no}</div>
            <div>{item.nama}</div>
            <div>{item.jabatan}</div>
            <div>{item.tanggal_masuk}</div>
            <div>{item.tanggal_keluar}</div>
            <div>
              <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-600">
                {item.alasan}
              </span>
            </div>
          </div>
        ))}

        <div className="px-6 py-3 bg-gray-50 border-t font-semibold text-sm text-gray-700">
          Total Turn Over: <span className="text-purple-600">{data.length} Petugas</span>
        </div>
      </div>
    </div>
  );
}
