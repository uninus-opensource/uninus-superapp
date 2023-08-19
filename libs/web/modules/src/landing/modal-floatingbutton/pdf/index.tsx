"use client";
import { Page, Text, View, Document, Image, Font } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

const tw = createTw({
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
});

Font.register({
  family: "Montserrat",
  fonts: [
    {
      src: "/fonts/Montserrat.ttf",
    },
    {
      src: "/fonts/Montserrat-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});

const detailPembayaran = {
  nomor_regis: "37592731238697",
  nama_lengkap: "Thomas shelby",
  tanggal_daftar: "27 Juli 2023",
  jalur_pendaftaran: "Seleksi Prestasi Non Akademik",
  tempat_tanggal_lahir: "Bandung, 30 Februari 2003",
  alamat_Domisili: "Gg. West Cibaduyut",
  asal_sekolah: "SMKN 90 Bandung",
  no_identitas: "327317xxxxxxxxxxx",
  periode: "2023/2024",
  jenis_kelamin: "Laki-laki",
  jurusan_1: "Teknik Informatika",
  ukt: "Rp. 6.700.000",
  potongan: "Rp. 1.340.000",
  total_kewajiban: "Rp. 5.360.000",
  terbilang: "(Lima Juta Tiga Ratus Enam Puluh Ribu Rupiah)",
  batas_pembayaran: "20 Agustus 2023",
};

export const KartuKelulusan = () => {
  return (
    <Document
      title={`${detailPembayaran.nomor_regis}_${detailPembayaran.nama_lengkap}`}
      author="Informatika developer team"
      language="Indonesia"
      pageMode="fullScreen"
    >
      <Page size="A4" style={tw("bg-white")}>
        {/* Header */}
        <View style={tw("h-20 bg-[#009647] mt-10 flex flex-row items-center gap-10")}>
          <Image
            src="/illustrations/pdfIllustrations/uninus.png"
            style={tw("w-14 h-14 object-cover ml-[10vw]")}
          ></Image>
          <View style={tw("flex flex-col items-center  justify-center")}>
            <Text style={tw("font-bold text-white text-[16px] font-montserrat")}>
              Bukti Kelulusan Calon Mahasiswa Baru
            </Text>
            <Text style={tw("font-normal text-white text-[16px] font-montserrat")}>
              Tahun Akademik 2023/2024
            </Text>
          </View>
        </View>

        <Image
          src="/illustrations/pdfIllustrations/ring.png"
          style={tw("absolute right-[-60] top-[-50] w-[160px] h-[160px]")}
        ></Image>

        {/* Heading */}
        <View style={tw("h-[60px] flex justify-center items-center")}>
          <Text style={tw("font-bold  text-[#009647] text-[16px] font-montserrat")}>
            Selamat Anda Diterima
          </Text>
        </View>

        <Text style={tw("ml-10 font-bold mt-3 text-[14px] font-montserrat")}>
          Data Calon Mahasiswa
        </Text>

        {/* Prospective student data */}
        <View style={tw("h-[180px] flex flex-row")}>
          <View style={tw("w-[34%] text-[#3D3D3D]  text-[12px] flex justify-end gap-2 pl-10")}>
            <Text style={tw("font-montserrat")}>No Regis</Text>
            <Text style={tw("font-montserrat")}>Nama Lengkap</Text>
            <Text style={tw("font-montserrat")}>No. Identitas</Text>
            <Text style={tw("font-montserrat")}>Jenis Kelamin</Text>
            <Text style={tw("font-montserrat")}>Tempat, Tanggal Lahir</Text>
            <Text style={tw("font-montserrat")}>Alamat Domisili</Text>
            <Text style={tw("font-montserrat")}>Asal Sekolah</Text>
            <Text style={tw("font-montserrat font-bold")}>DITERIMA</Text>
            <Text style={tw("font-montserrat font-bold")}>Jalur Pendaftaran</Text>
          </View>
          <View
            style={tw(
              "w-[34%] text-[#3D3D3D]  text-[12px] flex justify-end gap-2 font-bold text-[#009647]",
            )}
          >
            <Text style={tw("font-montserrat")}>{detailPembayaran.nomor_regis}</Text>
            <Text style={tw("font-montserrat")}>{detailPembayaran.nama_lengkap}</Text>
            <Text style={tw("font-montserrat")}>{detailPembayaran.no_identitas}</Text>
            <Text style={tw("font-montserrat")}>{detailPembayaran.nomor_regis}</Text>
            <Text style={tw("font-montserrat")}>{detailPembayaran.jenis_kelamin}</Text>
            <Text style={tw("font-montserrat")}>{detailPembayaran.tempat_tanggal_lahir}</Text>
            <Text style={tw("font-montserrat")}>{detailPembayaran.nomor_regis}</Text>
            <Text style={tw("font-montserrat")}>{detailPembayaran.jurusan_1}</Text>
            <Text style={tw("font-montserrat")}>{detailPembayaran.jalur_pendaftaran}</Text>
          </View>
          <Image
            src="/illustrations/pdfIllustrations/pdf-test.jpeg"
            style={tw("w-[100px] h-[100px]")}
          />
        </View>

        {/* Line */}
        <View style={tw("flex justify-center items-center mt-5")}>
          <View style={tw("h-[2px] bg-[#292929] w-[90%]")}></View>
        </View>
        <Text style={tw("font-normal pl-10  text-[12px] my-3 font-montserrat")}>
          Selanjutnya, silahkan melakukan pembayaran biaya pendidikan semester 1 :
        </Text>
        <View style={tw("h-[90px] w-full flex flex-row")}>
          <View style={tw("w-[60%] text-[#3D3D3D]  text-[12px] flex justify-end gap-3 pl-10 ")}>
            <Text style={tw("font-montserrat")}>Uang Kuliah Tunggal (UKT) Semester 1</Text>
            <Text style={tw("font-montserrat")}>Beasiswa (potongan) 20 %</Text>
            <Text style={tw("font-montserrat")}>Total Kewajiban</Text>
            <Text style={tw("font-montserrat font-normal")}>Terbilang</Text>
            <Text style={tw("font-montserrat")}>Batas akhir pembayaran Registrasi </Text>
          </View>
          <View style={tw("w-[64%]   text-[12px] flex justify-end gap-3  ")}>
            <Text style={tw("font-montserrat text-[#3D3D3D]")}>{detailPembayaran.ukt}</Text>
            <Text style={tw("font-montserrat  text-[#3D3D3D]")}>{detailPembayaran.potongan}</Text>
            <Text style={tw("font-montserrat text-[#009647] font-bold")}>
              {detailPembayaran.total_kewajiban}
            </Text>
            <Text style={tw("font-montserrat text-[1rem] font-normal text-[#009647]")}>
              {detailPembayaran.terbilang}
            </Text>
            <Text style={tw("font-montserrat text-[#009647] font-bold")}>
              {detailPembayaran.batas_pembayaran}
            </Text>
          </View>
        </View>
        {/* Line */}
        <View style={tw("flex justify-center items-center mt-5")}>
          <View style={tw("h-[2px] bg-[#292929] w-[90%]")}></View>
        </View>

        <View style={tw("h-[20px] flex justify-center items-center m-4")}>
          <Text style={tw("font-bold   text-[12px] font-montserrat")}>
            Tata Cara Pembayaran UKT
          </Text>
        </View>
        {/* Tata Cara*/}
        <View style={tw("flex flex-row h-[200px] justify-center gap-x-10 text-[10px] mb-14")}>
          <View style={tw("w-[40%] bg-[#FAFCFF] drop-shadow-md gap-3")}>
            <Text style={tw(" bg-[#FFC107] rounded-md p-2 text-center font-montserrat")}>ATM </Text>
            <Text style={tw("font-normal font-montserrat")}>
              1. Pilih <Text style={tw("font-bold font-montserrat")}>Menu Lain</Text>
            </Text>
            <Text style={tw("font-normal font-montserrat")}>
              2. Pilih <Text style={tw("font-bold font-montserrat")}>Transfer</Text>
            </Text>
            <Text style={tw("font-normal font-montserrat")}>
              3. Pilih dari <Text style={tw("font-bold font-montserrat")}>rekening tabungan</Text>
            </Text>
            <Text style={tw("font-normal font-montserrat")}>
              4. Pilih dari <Text style={tw("font-bold font-montserrat")}>rek. Bank lain</Text>{" "}
            </Text>
            <Text style={tw("font-normal font-montserrat")}>
              5. Masukan kode bank dilanjutkan dengan nomor virtual Account anda
              <Text style={tw("font-bold font-montserrat")}>
                (Mandiri 088-nomor Virtual Account)
              </Text>
            </Text>
            <Text style={tw("font-normal font-montserrat")}>
              6. Input Nominal yang ditagihkan sebagai Nominal transfer
            </Text>
            <Text style={tw("font-normal font-montserrat")}>
              7. <Text style={tw("font-bold font-montserrat")}>Selesai</Text>, transaksi berhasil{" "}
            </Text>
          </View>
          <View style={tw("w-[40%] bg-[#FAFCFF] drop-shadow-md gap-3")}>
            <Text style={tw(" bg-[#FFC107] p-2 rounded-md text-center")}>Mobile Banking</Text>
            <Text style={tw("font-normal font-montserrat")}>
              1. Masukan <Text style={tw("font-bold font-montserrat")}>User Id dan Password</Text>
            </Text>
            <Text style={tw("font-normal font-montserrat")}>
              2. Pilih <Text style={tw("font-bold font-montserrat")}>Transfer</Text>
            </Text>
            <Text style={tw("font-normal font-montserrat")}>
              3. Pilih <Text style={tw("font-bold font-montserrat")}>ke rek. Bank Lain</Text>
            </Text>
            <Text style={tw("font-normal font-montserrat")}>
              4. Pilih <Text style={tw("font-bold font-montserrat")}>Bank Tujuan</Text>
            </Text>
            <Text style={tw("font-normal font-montserrat")}>
              5. Masukan Nomor Virtual Account anda{" "}
              <Text style={tw("font-bold font-montserrat")}>
                (Mandiri 88608-nomor virtual account)
              </Text>
            </Text>
            <Text style={tw("font-normal font-montserrat")}>
              6. Input Nominal yang ditagihkan sebagaai Nominal Transfer
            </Text>
            <Text style={tw("font-normal font-montserrat")}>
              7. <Text style={tw("font-bold font-montserrat")}>Selesai</Text>,transaksi berhasil
            </Text>
          </View>
        </View>
        <View style={tw("h-[40px] bg-[#009647]  ")}></View>
        <Image
          src="/illustrations/pdfIllustrations/ring-bottom.png"
          style={tw("w-[90px] h-[90px] absolute left-[-4e0] bottom-0")}
        ></Image>
      </Page>
    </Document>
  );
};
