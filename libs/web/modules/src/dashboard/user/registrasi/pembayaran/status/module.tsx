"use client";
import { CopyOutlined, DownloadOutlined } from "@ant-design/icons";
import { BreadCrumb, Button, Accordion } from "@uninus/web/components";
import dynamic from "next/dynamic";
import { FC, ReactElement, useEffect, useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Page, Text, View, Document, Image, Font } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { StatusAlert } from "./alertStatus";
import { useStudentData, useUserData } from "@uninus/web/services";
const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <p className="text-primary-green">Menyiapkan dokumen..</p>,
  },
);

// const BlobProvider = dynamic(() => import("@react-pdf/renderer").then((mod) => mod.BlobProvider), {
//   ssr: false,
//   loading: () => <p className="text-primary-green">Tunggu sebentar..</p>,
// });

export const pembayaranBreadcrumb = [
  {
    name: "Beranda",
    link: "/dashboard",
  },
  {
    name: "Registrasi",
    link: "/dashboard/registrasi/biodata",
  },
  {
    name: "Pembayaran",
    link: "/dashboard/registrasi/pembayaran",
  },
];

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

export const Pembayaran: FC = (): ReactElement => {
  const [textToCopy] = useState("4444081904377804");
  const [status, setStatus] = useState<string | null>("unpaid"); // Status dummy
  const { getStudent } = useStudentData();

  const { getUser } = useUserData();

  const registrationStatus = useMemo(() => {
    return getUser?.registration_status;
  }, [getUser?.registration_status]);

  useEffect(() => {
    if (registrationStatus === "Sudah Membayar") {
      setStatus("success");
    } else {
      setStatus("unpaid");
    }
  }, [registrationStatus]);

  const copyText = () => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast.success("kode berhasil disalin", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        console.error("Error copying text:", error);
      });
  };

  const detailPembayaran = {
    nomor_regis: "37592731238697",
    nama_lengkap: getStudent?.fullname,
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

  return (
    <section key="regist-pembayaran" className="flex flex-col px-4 gap-y-6 ">
      <BreadCrumb items={pembayaranBreadcrumb} />
      <h1 className="text-lg 2xl:text-2xl pt-2 font-extrabold text-secondary-green-4">
        Pembayaran Registrasi
      </h1>

      <section className="h-auto w-[90vw] lg:w-[60vw] xl:w-[70vw] shadow-md flex flex-col">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="flex justify-between items-center w-full px-3 md:px-5">
          <h1 className="font-bold text-[1.2rem] mt-3">Pembayaran</h1>
          {status === "unpaid" && (
            <div className="h-auto">
              <PDFDownloadLink
                document={
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
                      <View style={tw("h-[90px] flex flex-row")}>
                        <View
                          style={tw(
                            "w-[34%] text-[#3D3D3D]  text-[12px] flex justify-end gap-2 pl-10",
                          )}
                        >
                          <Text style={tw("font-montserrat")}>No Regis</Text>
                          <Text style={tw("font-montserrat")}>Nama Lengkap</Text>
                          <Text style={tw("font-montserrat")}>Jenis Kelamin</Text>
                          <Text style={tw("font-montserrat")}>Tanggal Lahir</Text>
                        </View>
                        <View
                          style={tw(
                            "w-[34%] text-[#3D3D3D]  text-[12px] flex justify-end gap-2 font-bold text-[#009647]",
                          )}
                        >
                          <Text style={tw("font-montserrat")}>{detailPembayaran.nomor_regis}</Text>
                          <Text style={tw("font-montserrat")}>{detailPembayaran.nama_lengkap}</Text>
                          <Text style={tw("font-montserrat")}>
                            {detailPembayaran.jenis_kelamin}
                          </Text>
                          <Text style={tw("font-montserrat")}>
                            {detailPembayaran.tanggal_lahir}
                          </Text>
                        </View>
                      </View>
                      <Text style={tw("ml-10 font-bold mt-10 text-[1.2rem] font-montserrat")}>
                        Data Registrasi
                      </Text>
                      <View style={tw("h-[50px] flex flex-row ")}>
                        <View style={tw("w-full flex flex-row justify-center items-center mt-5")}>
                          <View style={tw("w-[40%] h-full flex flex-col justify-between pl-10 ")}>
                            <View style={tw("gap-2")}>
                              <Text style={tw("text-[#525252] text-[1rem] font-montserrat")}>
                                Tanggal Daftar
                              </Text>
                              <Text
                                style={tw("text-[#009647] font-bold text-[1rem] font-montserrat")}
                              >
                                {detailPembayaran.tanggal_daftar}
                              </Text>
                            </View>
                          </View>
                          <View style={tw("w-[50%] h-full flex flex-col justify-between ")}>
                            <View style={tw("gap-2")}>
                              <Text style={tw("text-[#525252] text-[1rem] font-montserrat")}>
                                Jalur Pendaftaran
                              </Text>
                              <Text
                                style={tw("text-[#009647] font-bold text-[1rem] font-montserrat")}
                              >
                                {detailPembayaran.jalur_pendaftaran}
                              </Text>
                            </View>
                          </View>
                          <View style={tw("w-[30%] h-full flex flex-col justify-between gap-2")}>
                            <View style={tw("gap-2")}>
                              <Text style={tw("text-[#525252] text-[1rem] font-montserrat")}>
                                Periode
                              </Text>
                              <Text
                                style={tw("text-[#009647] font-bold text-[1rem] font-montserrat")}
                              >
                                2023/2024
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      {/* Line */}
                      <View style={tw("flex justify-center items-center mt-5")}>
                        <View style={tw("h-[2px] bg-[#292929] w-[90%]")}></View>
                      </View>

                      <Text style={tw("font-bold  mt-5 ml-10 text-[1.2rem] font-montserrat")}>
                        Pilihan Jurusan
                      </Text>

                      <View style={tw("flex flex-row mt-5 pl-10")}>
                        <View style={tw("w-[50%]")}>
                          <Text style={tw("text-[#525252] text-[1rem] font-montserrat")}>
                            Jurusan 1
                          </Text>
                          <Text style={tw("text-[#009647] font-bold text-[1rem] font-montserrat")}>
                            {detailPembayaran.jurusan_1}
                          </Text>
                        </View>
                        <View style={tw("w-[50%]")}>
                          <Text style={tw("text-[#525252] text-[1rem] font-montserrat")}>
                            Jurusan 2
                          </Text>
                          <Text style={tw("text-[#009647] font-bold text-[1rem] font-montserrat")}>
                            {detailPembayaran.jurusan_2}
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
                        <Text style={tw(" text-[1rem] pl-5 font-montserrat")}>
                          Program Pendidikan
                        </Text>
                        <Text style={tw(" text-[1rem] pr-[10vw] font-montserrat")}>
                          Nilai Tagihan
                        </Text>
                      </View>

                      <View
                        style={tw(
                          "w-[90%] h-[25px] ml-10 mt-3 flex flex-row items-center justify-between",
                        )}
                      >
                        <Text style={tw(" text-[1rem] text-[#666666] pl-5 font-montserrat")}>
                          {detailPembayaran.program_pendidikan}
                        </Text>
                        <Text style={tw(" text-[1rem] text-[#666666] pr-[10vw] font-montserrat")}>
                          {detailPembayaran.nilai_tagihan}
                        </Text>
                      </View>

                      <View
                        style={tw(
                          "bg-[#F8BF02] w-[90%] h-[25px] ml-10 mt-5 flex flex-row items-center justify-between",
                        )}
                      >
                        <Text style={tw(" text-[1rem] pl-5 font-montserrat")}>
                          Metode Pembayaran
                        </Text>
                        <Text style={tw(" text-[1rem] font-montserrat")}>
                          No. Pembayaran/Kode VA
                        </Text>
                        <Text style={tw(" text-[1rem] font-montserrat")}>Biaya Admin</Text>
                        <Text style={tw(" text-[1rem] pr-[2vw] font-montserrat")}>
                          Total Pembayaran
                        </Text>
                      </View>

                      <View
                        style={tw(
                          "w-[90%] h-[25px] ml-10 mt-5 flex flex-row items-center justify-between",
                        )}
                      >
                        <Text style={tw(" text-[1rem] text-[#666666] pl-5 font-montserrat")}>
                          Transfer Bank
                        </Text>
                        <Text style={tw(" text-[1rem] text-[#666666] font-montserrat")}>
                          {detailPembayaran.no_pembayaran}
                        </Text>
                        <Text style={tw(" text-[1rem] text-[#666666] font-montserrat")}>
                          {detailPembayaran.biaya_admin}
                        </Text>
                        <Text style={tw(" text-[1rem] pr-[2vw] text-[#666666] font-montserrat")}>
                          {detailPembayaran.total_pembayaran}
                        </Text>
                      </View>

                      <View style={tw("w-[100%]  h-[90px] flex justify-center items-center")}>
                        <Text
                          style={tw(
                            "text-[#009647] font-bold text-center text-[1rem] border-[1px] border-[#009647] rounded-[5px] px-7 py-4 font-montserrat uppercase",
                          )}
                        >
                          pembayaran lunas
                        </Text>
                      </View>

                      <View style={tw("h-[62.5px] bg-[#009647] mt-5")}></View>
                      <Image
                        src="/illustrations/pdfIllustrations/ring-bottom.png"
                        style={tw("w-[90px] h-[90px] absolute left-[-4e0] bottom-0")}
                      ></Image>
                    </Page>
                  </Document>
                }
                fileName={`${detailPembayaran.nama_lengkap}_Kartu Pembayaran.pdf`}
              >
                {({ loading }) =>
                  loading ? (
                    <p className="text-primary-green">hampir selesai...</p>
                  ) : (
                    <Button variant="green-outline" size="sm">
                      <div className="flex justify-center items-center gap-2">
                        <DownloadOutlined />
                        Download Bukti
                      </div>
                    </Button>
                  )
                }
              </PDFDownloadLink>
            </div>
          )}
        </div>

        <div className="bg-primary-green w-full h-[3px] mt-3"></div>
        <div className="px-4 md:px-8 pb-6">
          {status === "unpaid" ? (
            <StatusAlert
              status="unpaid"
              message="Segera Selesaikan Pembayaranmu!"
              messageDetails="Sedikit Lagi Kamu akan terdaftar di Universitas Islam Nusantara"
            />
          ) : (
            <StatusAlert
              status="success"
              message="Pembayaran berhasil"
              messageDetails="Proses verifikasi oleh sistem selesai dilakukan, dan silahkan melanjutkan proses registrasi"
            />
          )}

          <div className="mt-5 flex justify-between items-center gap-y-2 w-full">
            {/* <div className="flex flex-col">
              <h2 className="text-grayscale-6 text-xs md:text-base">Metode Pembayaran</h2>
              <h2 className="font-bold text-xs md:text-base">Mandiri</h2>
            </div> */}
            {/* <figure>
              <Image
                src="/illustrations/payment/mandiri.webp"
                width={100}
                height={100}
                quality={100}
                alt="mandiri"
              />
            </figure> */}
          </div>
          <div className="mt-4 md:mt-2 flex justify-between flex-col gap-y-2">
            <h2 className="text-grayscale-6 text-xs md:text-base">Nomor Virtual Account</h2>
            <div className="flex justify-between">
              <h2 className="font-bold text-xs md:text-base">4444081904377804</h2>
              <div
                className="flex gap-2 justify-between items-center hover:cursor-pointer"
                onClick={copyText}
              >
                <p className="text-primary-green text-xs md:text-base">salin</p>
                <CopyOutlined className="text-primary-green" />
              </div>
            </div>
          </div>

          <div className="mt-4 md:mt-2 flex justify-between flex-col  gap-y-2 ">
            <h2 className="text-grayscale-6 text-xs md:text-base">
              Total Pembayaran (Sudah termasuk biaya admin)
            </h2>
            <div className="flex justify-between text-xs md:text-base">
              <h2 className="font-bold">Rp. 253.000</h2>
              <div
                className="flex gap-2 justify-between items-center hover:cursor-pointer"
                onClick={copyText}
              >
                <p className="text-primary-green text-xs md:text-base">salin</p>
                <CopyOutlined className="text-primary-green" />
              </div>
            </div>
          </div>
          <h2 className="text-grayscale-6 text-xs md:text-base mt-5 ">
            Selesaikan Pembayaran Sebelum
          </h2>
          <h2 className="font-bold py-2 text-xs md:text-base ">22 Agustus 2023, 23:59 WIB</h2>
        </div>
        <div className="bg-slate-3 w-full h-[3px]"></div>
        <section className="px-8 py-4">
          <h1 className="font-bold text-xs md:text-base">Cara Pembayaran</h1>
          <div className="py-4 gap-y-8">
            <Accordion
              showIcon={true}
              title="Mobile Banking Payment"
              titleClassName="text-slate-7 hover:text-primary-green font-normal"
            >
              <div className="p-4 lg:text-base text-xs">
                <li>
                  1. Masukan <span className="font-bold">User ID dan Password</span>
                </li>
                <li>
                  2. Pilih <span className="font-bold">Transfer</span>
                </li>
                <li>
                  3. Pilih <span className="font-bold">ke rek. Bank lain</span>
                </li>
                <li>
                  4. Pilih <span className="font-bold">bank tujuan</span>
                </li>
                <li>
                  5. Masukan Nomor Virtual Account Anda{" "}
                  <span className="font-bold">(Mandiri 88608 - nomor virtual account)</span>
                </li>
                <li>6. Input nominal yang ditagihkan sebagai Nominal Transfer</li>
                <li>
                  <span className="font-bold">7. Selesai </span>Transaksi berhasil
                </li>
              </div>
            </Accordion>
            <Accordion
              showIcon={true}
              title="ATM Payment"
              titleClassName="text-slate-7 hover:text-primary-green font-normal"
            >
              <div className="p-4 lg:text-base text-xs">
                <li>
                  1. Masukan <span className="font-bold">kartu ATM dan Pin</span>
                </li>
                <li>
                  2. Pilih Menu <span className="font-bold">Bayar / Beli</span>
                </li>
                <li>
                  3. Pilih Menu <span className="font-bold">Lainnya</span>
                </li>
                <li>
                  4. Masukkan kode bank dilanjutkan dengan Nomor Virtual Account Anda{" "}
                  <span className="font-bold">(Mandiri 88608 - nomor virtual account)</span>
                </li>
                <li>5. Input nominal yang ditagihkan sebagai Nominal Transfer</li>
                <li>
                  6. Konfirmasi Pembayaran <span className="font-bold">dan Transaksi berhasil</span>
                </li>
                <li>
                  7. Setelah transaksi anda selesai, invoice ini akan diupdate secara otomatis.
                  Proses ini mungkin memakan waktu hingga 5 menit
                </li>
              </div>
            </Accordion>
          </div>
        </section>
      </section>
    </section>
  );
};
