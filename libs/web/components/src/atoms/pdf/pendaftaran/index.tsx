"use client";
import { Page, Text, View, Document, Image, Font, Link } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { montserrat, montserratBold } from "../fonts";

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
      src: montserrat,
    },
    {
      src: montserratBold,
      fontWeight: "bold",
    },
  ],
});

const pendaftaran = {
  nomor_regis: "37592731238697",
  nama_lengkap: "Thomas shelby",
  tanggal_daftar: "27 Juli 2023",
  jalur_pendaftaran: "Seleksi Prestasi Non Akademik",
  tanggal_lahir: "30 Februari 2003",
  periode: "2023/2024",
  jenis_kelamin: "Laki-laki",
  jurusan_1: "Teknik Informatika",
  jurusan_2: "Teknik Elektro",
  program_pendidikan: "Teknik Elektro",
  nilai_tagihan: "Rp 250.000,-",
  no_pembayaran: "4444081904377804",
  biaya_admin: "Rp 2500,-",
  total_pembayaran: "Rp 252.500,-",
  batas_pembayaran: "20 Agustus 2023 23:23:23",
};

export const KartuPendaftaran = () => {
  return (
    <Document
      title={`${pendaftaran.nomor_regis}_${pendaftaran.nama_lengkap}`}
      author="Informatika developer team"
      language="Indonesia"
      pageMode="fullScreen"
    >
      <Page size="A4" style={tw("bg-white")}>
        {/* Header */}
        <View style={tw("h-20 bg-[#009647] mt-10 flex flex-row items-center gap-10")}>
          <Image
            src="/illustrations/pdfIllustrations/uninus.png"
            style={tw("w-14 h-14 object-cover ml-[15vw]")}
          ></Image>
          <Text style={tw("font-bold text-white font-montserrat")}>
            PMB Universitas Islam Nusantara
          </Text>
        </View>

        <Image
          src="/illustrations/pdfIllustrations/ring.png"
          style={tw("absolute right-[-60] top-[-50] w-[160px] h-[160px]")}
        ></Image>

        {/* Heading */}
        <View style={tw("h-[60px] flex justify-center items-center")}>
          <Text style={tw("font-bold  text-[#292929] text-[16px] font-montserrat")}>
            BUKTI PENDAFTARAN
          </Text>
        </View>

        {/* Line */}
        <View style={tw("flex justify-center items-center")}>
          <View style={tw("h-[2px] bg-[#292929] w-[90%]")}></View>
        </View>

        <Text style={tw("ml-10 font-bold mt-3 text-[1.2rem] font-montserrat")}>
          Data Calon Mahasiswa
        </Text>

        {/* Prospective student data */}
        <View style={tw("h-[60px] flex flex-row")}>
          <View style={tw("w-[34%] text-[#3D3D3D]  text-[1.1rem] flex justify-end gap-2 pl-10")}>
            <Text style={tw("font-montserrat")}>No Regis</Text>
            <Text style={tw("font-montserrat")}>Nama Lengkap</Text>
          </View>
          <View
            style={tw(
              "w-[64%] text-[#3D3D3D]  text-[1.1rem] flex justify-end gap-2 font-bold text-[#009647]",
            )}
          >
            <Text style={tw("font-montserrat")}>{pendaftaran.nomor_regis}</Text>
            <Text style={tw("font-montserrat")}>{pendaftaran.nama_lengkap}</Text>
          </View>
        </View>

        {/* Bio */}
        <View style={tw("h-[130px] flex flex-row items-end")}>
          <View style={tw("w-full h-[80px] flex flex-row justify-center items-center")}>
            <View style={tw("w-[40%] h-full flex flex-col justify-between pl-10")}>
              <View>
                <Text style={tw("text-[#525252] text-[1rem] font-montserrat")}>Tanggal Daftar</Text>
                <Text style={tw("text-[#009647] font-bold text-[1rem] font-montserrat")}>
                  {pendaftaran.tanggal_daftar}
                </Text>
              </View>

              <View>
                <Text style={tw("text-[#525252] text-[1rem] font-montserrat")}>
                  Jalur Pendaftaran
                </Text>
                <Text style={tw("text-[#009647] font-bold text-[1rem] font-montserrat")}>
                  {pendaftaran.jalur_pendaftaran}
                </Text>
              </View>
            </View>
            <View style={tw("w-[30%] h-full flex flex-col justify-between")}>
              <View>
                <Text style={tw("text-[#525252] text-[1rem] font-montserrat")}>Tanggal Lahir</Text>
                <Text style={tw("text-[#009647] font-bold text-[1rem] font-montserrat")}>
                  {pendaftaran.tanggal_lahir}
                </Text>
              </View>

              <View>
                <Text style={tw("text-[#525252] text-[1rem] font-montserrat")}>Periode</Text>
                <Text style={tw("text-[#009647] font-bold text-[1rem] font-montserrat")}>
                  {pendaftaran.periode}
                </Text>
              </View>
            </View>
            <View style={tw("w-[30%] h-full flex flex-col justify-between font-montserrat")}>
              <View>
                <Text style={tw("text-[#525252] text-[1rem] font-montserrat")}>Jenis Kelamin</Text>
                <Text style={tw("text-[#009647] font-bold text-[1rem] font-montserrat")}>
                  {pendaftaran.jenis_kelamin}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Line */}
        <View style={tw("flex justify-center items-center mt-10")}>
          <View style={tw("h-[2px] bg-[#292929] w-[90%]")}></View>
        </View>

        <Text style={tw("font-bold  mt-3 ml-10 text-[1.2rem] font-montserrat")}>
          Pilihan Jurusan
        </Text>

        <View style={tw("flex flex-row mt-5 pl-10")}>
          <View style={tw("w-[50%]")}>
            <Text style={tw("text-[#525252] text-[1rem] font-montserrat")}>Jurusan 1</Text>
            <Text style={tw("text-[#009647] font-bold text-[1rem] font-montserrat")}>
              {pendaftaran.jurusan_1}
            </Text>
          </View>
          <View style={tw("w-[50%]")}>
            <Text style={tw("text-[#525252] text-[1rem] font-montserrat")}>Jurusan 2</Text>
            <Text style={tw("text-[#009647] font-bold text-[1rem] font-montserrat")}>
              {pendaftaran.jurusan_2}
            </Text>
          </View>
        </View>

        {/* Line */}
        <View style={tw("flex justify-center items-center mt-10")}>
          <View style={tw("h-[2px] bg-[#292929] w-[90%]")}></View>
        </View>

        <Text style={tw("font-bold  mt-3 ml-10 text-[1.2rem] font-montserrat")}>
          Rincian Tagihan
        </Text>

        <View
          style={tw(
            "bg-[#F8BF02] w-[90%] h-[25px] ml-10 mt-5 flex flex-row items-center justify-between",
          )}
        >
          <Text style={tw(" text-[1rem] pl-5 font-montserrat")}>Program Pendidikan</Text>
          <Text style={tw(" text-[1rem] pr-[10vw] font-montserrat")}>Nilai Tagihan</Text>
        </View>

        <View style={tw("w-[90%] h-[25px] ml-10 mt-3 flex flex-row items-center justify-between")}>
          <Text style={tw(" text-[1rem] text-[#666666] pl-5 font-montserrat")}>
            {pendaftaran.program_pendidikan}
          </Text>
          <Text style={tw(" text-[1rem] text-[#666666] pr-[10vw] font-montserrat")}>
            {pendaftaran.nilai_tagihan}
          </Text>
        </View>

        <View
          style={tw(
            "bg-[#F8BF02] w-[90%] h-[25px] ml-10 mt-5 flex flex-row items-center justify-between",
          )}
        >
          <Text style={tw(" text-[1rem] pl-5 font-montserrat")}>Metode Pembayaran</Text>
          <Text style={tw(" text-[1rem] font-montserrat")}>No. Pembayaran/Kode VA</Text>
          <Text style={tw(" text-[1rem] font-montserrat")}>Biaya Admin</Text>
          <Text style={tw(" text-[1rem] pr-[2vw] font-montserrat")}>Total Pembayaran</Text>
        </View>

        <View style={tw("w-[90%] h-[25px] ml-10 mt-5 flex flex-row items-center justify-between")}>
          <Text style={tw(" text-[1rem] text-[#666666] pl-5 font-montserrat")}>Transfer Bank</Text>
          <Text style={tw(" text-[1rem] text-[#666666] font-montserrat")}>
            {pendaftaran.no_pembayaran}
          </Text>
          <Text style={tw(" text-[1rem] text-[#666666] font-montserrat")}>
            {pendaftaran.biaya_admin}
          </Text>
          <Text style={tw(" text-[1rem] pr-[2vw] text-[#666666] font-montserrat")}>
            {pendaftaran.total_pembayaran}
          </Text>
        </View>

        <View style={tw("ml-10 mt-8 flex flex-row gap-1")}>
          <Text style={tw("text-[#525252] text-[1rem] font-montserrat")}>Batas Pembayaran</Text>
          <Text style={tw("text-[#009647] font-bold text-[1rem] font-montserrat")}>
            {pendaftaran.batas_pembayaran}
          </Text>
        </View>
        <View style={tw("ml-10 mt-4 flex flex-row gap-[3px]")}>
          <Text style={tw("text-[#666666] text-[1rem] font-montserrat")}>
            Untuk bantuan cara pembayaran silahkan
          </Text>
          <Text style={tw("text-[#F8BF02] font-bold text-[1rem] font-montserrat")}>
            <Link src="https://pmb.uninus.dev/dashboard" style={tw("text-[#F8BF02]")}>
              halaman berikut
            </Link>
          </Text>
        </View>

        <View style={tw("h-[62.5px] bg-[#009647] mt-10")}></View>
        <Image
          src="/illustrations/pdfIllustrations/ring-bottom.png"
          style={tw("w-[90px] h-[90px] absolute left-[-4e0] bottom-0")}
        ></Image>
      </Page>
    </Document>
  );
};
