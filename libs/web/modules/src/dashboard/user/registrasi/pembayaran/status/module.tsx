"use client";
import { CopyOutlined, DownloadOutlined } from "@ant-design/icons";
import { BreadCrumb, Button } from "@uninus/web/components";
import dynamic from "next/dynamic";
import { FC, ReactElement, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { KartuPembayaran } from "../pdf";
import { StatusAlert } from "./alertStatus";
const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <p className="text-primary-green">Menyiapkan dokumen..</p>,
  },
);

const BlobProvider = dynamic(() => import("@react-pdf/renderer").then((mod) => mod.BlobProvider), {
  ssr: false,
  loading: () => <p className="text-primary-green">Tunggu sebentar..</p>,
});

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
  const [textToCopy, setTextToCopy] = useState("4444081904377804");
  const [status, setStatus] = useState("unpaid"); // Status dummy

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
  };

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
          <h1 className="font-bold text-[1.2rem]">Pembayaran</h1>
          {status === "success" && (
            <div className="h-auto">
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
            </div>
          )}
        </div>

        <div className="bg-primary-green w-full h-[3px] mt-3"></div>
        <div className="px-4 md:px-8">
          <StatusAlert
            status="unpaid"
            message="Segera Selesaikan Pembayaranmu!"
            messageDetails="Sedikit Lagi Kamu akan terdaftar di Universitas Islam Nusantara"
            onStatusChange={handleStatusChange}
          />
          <div className="mt-2 flex justify-between flex-col  gap-y-2">
            <h2 className="text-grayscale-6 text-xs md:text-base">Metode Pembayaran</h2>
            <h2 className="font-bold text-xs md:text-base">Mandiri</h2>
          </div>
          <div className="mt-4 md:mt-2 flex justify-between flex-col  gap-y-2">
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
              Total Pembayaran (Belum termasuk admin)
            </h2>
            <div className="flex justify-between text-xs md:text-base">
              <h2 className="font-bold">Rp. 250.000</h2>
              <BlobProvider document={<KartuPembayaran />}>
                {({ url }) => (
                  <a
                    href={url != null ? url : ""}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary-green "
                  >
                    Lihat Detail
                  </a>
                )}
              </BlobProvider>
            </div>
          </div>
          <h2 className="text-grayscale-6 text-xs md:text-base mt-5 ">
            Selesaikan Pembayaran Sebelum
          </h2>
          <h2 className="font-bold py-2 text-xs md:text-base ">22 Agustus 2023, 23:59 WIB</h2>
        </div>
      </section>
    </section>
  );
};
