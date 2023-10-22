"use client";
import { CopyOutlined, DownloadOutlined } from "@ant-design/icons";
import { BreadCrumb, Button, Accordion } from "@uninus/web/components";
import dynamic from "next/dynamic";
import { FC, ReactElement, useEffect, useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { KartuPembayaran } from "../pdf";
import { StatusAlert } from "./alertStatus";
import { useUserData } from "@uninus/web/services";
import { SessionProvider } from "next-auth/react";
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

export const Pembayaran: FC = (): ReactElement => {
  const [textToCopy] = useState("4444081904377804");
  const [status, setStatus] = useState<string | null>("unpaid"); // Status dummy

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
              <SessionProvider>
                <PDFDownloadLink
                  document={<KartuPembayaran />}
                  fileName="4103700434832748_Kartu Pembayaran.pdf"
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
              </SessionProvider>
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
