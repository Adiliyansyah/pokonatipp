"use client";

const data = [
  {
    no: 1,
    jabatan: "Konselor Aksi Muda",
    jumlah: 2,
  },
 {
    no: 2,
    jabatan: "Konselor Aksi Pertama",
    jumlah: 13,
  },
  {
    no: 3,
    jabatan: "Asisten Konselor",
    jumlah: 14,
  },
  {
    no: 4,
    jabatan: "Dokter",
    jumlah: 2,
  },
  {
    no: 5,
    jabatan: "Dokter Gigi",
    jumlah: 1,
  },
  {
    no: 6,
    jabatan: "Psikolog Klinis",
    jumlah: 1,
  },
  {
    no: 7,
    jabatan: "Perawat Muda",
    jumlah: 2,
  },
  {
    no: 8,
    jabatan: "Perawat Pertama",
    jumlah: 9,
  },
  {
    no: 9,
    jabatan: "Perawat Terampil",
    jumlah: 7,
  },
  {
    no: 10,
    jabatan: "Pranata Laboratorium Kesehatan",
    jumlah: 2,
  },
  {
    no: 11,
    jabatan: "Nutrisionis",
    jumlah: 2,
  },
  {
    no: 12,
    jabatan: "Apoteker",
    jumlah: 1,
  },
  {
    no: 13,
    jabatan: "Asisten Apoteker",
    jumlah: 1,
  },
  {
    no: 14,
    jabatan: "Konselor SDM",
    jumlah: 3,
  },
  {
    no: 15,
    jabatan: "Instruktur Vokasional",
    jumlah: 3,
  },
  {
    no: 16,
    jabatan: "Bidan",
    jumlah: 1,
  },
  {
    no: 17,
    jabatan: "Perekam Medis",
    jumlah: 1,
  },
  {
    no: 18,
    jabatan: "Pengadministrasi Umum Layanan",
    jumlah: 3,
  },
];

const total = data.reduce((acc, item) => acc + item.jumlah, 0);


export default function TableModern() {
  return (
    <div className="w-full p-4">
      <div className="min-w-[1150px] bg-white rounded-2xl shadow-md overflow-hidden">
        
        {/* Header */}
        <div className="grid grid-cols-[400px_600px_200px] bg-blue-400 px-8 py-5 font-semibold text-white">
          <div>No</div>
          <div>Jabatan</div>
          <div>Jumlah</div>
        </div>

        {/* Data */}
        {data.map((item) => (
          <div
            key={item.no}
            className="grid grid-cols-[350px_675px_200px] px-8 py-5 items-center hover:bg-blue-50 transition"
          >
            <div>{item.no}</div>
            <div>{item.jabatan}</div>
            <div>{item.jumlah}</div>
          </div>
        ))}
{/* Total */}
        <div className="grid grid-cols-[400px_600px_400px] px-5 py-2 bg-gray-100 font-bold text-lg">
          <span>Total Petugas Rehabilitasi</span>
          <span>{total}</span>
        </div>

      </div>
    </div>
  );
}