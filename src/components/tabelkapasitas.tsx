"use client";

const data = [
  {
    no: 1,
    nama: "Andi",
    umur: 21,
    alamat: "Jakarta",
    email: "andi@mail.com",
    hp: "08123",
    status: "Aktif",
  },
  {
    no: 2,
    nama: "Budi",
    umur: 23,
    alamat: "Bandung",
    email: "budi@mail.com",
    hp: "08987",
    status: "Nonaktif",
  },
];

export default function TableModern() {
  return (
    <div className="w-full p-4">
      <div className="min-w-[1150px] bg-white rounded-2xl shadow-md overflow-hidden">
        
        {/* Header */}
        <div className="grid grid-cols-[50px_150px_80px_200px_200px_150px_120px] bg-gray-100 px-8 py-5 font-semibold text-gray-700">
          <div>No</div>
          <div>Nama</div>
          <div>Umur</div>
          <div>Alamat</div>
          <div>Email</div>
          <div>No HP</div>
          <div>Status</div>
        </div>

        {/* Data */}
        {data.map((item) => (
          <div
            key={item.no}
            className="grid grid-cols-[50px_150px_80px_200px_200px_150px_120px] px-8 py-5 items-center border-t hover:bg-gray-50 transition"
          >
            <div>{item.no}</div>
            <div>{item.nama}</div>
            <div>{item.umur}</div>
            <div>{item.alamat}</div>
            <div>{item.email}</div>
            <div>{item.hp}</div>
            <div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  item.status === "Aktif"
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