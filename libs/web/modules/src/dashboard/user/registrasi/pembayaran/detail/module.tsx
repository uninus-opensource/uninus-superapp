"use client";
import { BreadCrumb, Button, CheckBox, RadioButton } from "@uninus/web/components";
import Image from "next/image";
import { FC, ReactElement, SetStateAction, useState } from "react";
import { Modal } from "@uninus/web/components";
import { FieldValues, useForm } from "react-hook-form";
import Link from "next/link";

export const detailBreadcrumb = [
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

export const payment = [
  {
    name: "Bank Mandiri",
    desc: "Biaya Admin : Rp. 3.000",
    select: "mandiri",
    src: "/illustrations/payment/mandiri.webp",
  },
  {
    name: "Bank Tabungan Negara - BTN",
    desc: "Biaya Admin : Rp. 3.000",
    select: "btn",
    src: "/illustrations/payment/btn.webp",
  },
  {
    name: "Bank Central Asia - BCA",
    desc: "Biaya Admin : Rp. 3.000",
    select: "bca",
    src: "/illustrations/payment/bca.webp",
  },
  {
    name: "Shopee",
    desc: "Gratis",
    select: "shopee",
    src: "/illustrations/payment/shopee.webp",
  },
  {
    name: "Tokopedia",
    desc: "Biaya Admin : Rp. 3.000",
    select: "tokped",
    src: "/illustrations/payment/tokopedia.webp",
  },
];

export const DetailPembayaran: FC = (): ReactElement => {
  const { control } = useForm<FieldValues>({
    mode: "all",
  });
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(!showModal);
  const [selectedOption, setSelectedOption] = useState("");

  const handleCheckboxChange = (option: SetStateAction<string>) => {
    setSelectedOption(option);
  };

  const isButtonDisabled = selectedOption === "";

  return (
    <section
      key="detail-pembayaran"
      className="flex flex-col text-center px-4 gap-y-6 lg:text-start"
    >
      <BreadCrumb items={detailBreadcrumb} />
      <h1 className="text-lg 2xl:text-2xl pt-2 font-extrabold text-secondary-green-4">
        Pembayaran Registrasi
      </h1>

      <section className="h-auto w-[90vw] lg:w-[60vw] xl:w-[70vw] shadow-md flex flex-col ">
        <div className="flex flex-col w-full px-4 md:px-5">
          <h1 className="font-bold text-[1.2rem]">Detail Pembayaran</h1>
          <p className="py-2">
            Silahkan memilih metode pembayaran, dan segera selesaikan pembayaran
          </p>
        </div>

        <div className="bg-primary-green w-full h-[3px] mt-3"></div>
        <div className="p-4">
          <div className="flex justify-between p-4 text-left">
            <h1>Biaya Formulir - Program Pascasarjana(S3)</h1>
            <p className="font-bold">Rp. 750.000</p>
          </div>
          <div className="bg-slate-5 w-full h-[2px] "></div>
          <div className="flex justify-between p-4 text-left">
            <h1 className="font-bold">Total Pembayaran</h1>
            <p className="font-bold">Rp. 750.000</p>
          </div>
        </div>
        <div className="flex flex-col w-full items-center lg:items-end p-8">
          <Button
            onClick={handleShowModal}
            variant="elevated"
            size="sm"
            width="w-auto"
            height="h-12"
            className="bg-primary-green p-2 text-white rounded-md"
          >
            Pilih Metode Pembayaran
          </Button>
        </div>
        {showModal && (
          <Modal
            showModal={showModal}
            onClose={handleShowModal}
            modalTitle="Pilih Metode Pembayaran"
            bodyClassName="space-y-2 p-6"
          >
            {payment.map((x, i) => (
              <div key={i} className="flex flex-col gap-2 px-2">
                <div className="flex justify-between gap-3 border border-slate-3 rounded-md px-6 h-[60px] p-2">
                  <div className="flex gap-2">
                    <CheckBox
                      name="mandiri"
                      control={control}
                      label=""
                      variant="primary"
                      size="md"
                      // checked={selectedOption === x.select}
                      onChange={() => handleCheckboxChange(x.select)}
                    />

                    <div>
                      <h1 className="font-semibold text-primary-green">{x.name}</h1>
                      <p className="text-slate-5">{x.desc}</p>
                    </div>
                  </div>
                  <div>
                    <Image src={x.src} width={100} height={100} alt="mandiri" />
                  </div>
                </div>
              </div>
            ))}
            <div className="flex flex-col pt-4 w-full items-center lg:items-end ">
              <Link href="/dashboard/registrasi/pembayaran/status">
                <Button
                  variant="elevated"
                  size="sm"
                  width="w-auto"
                  height="h-12"
                  className="bg-primary-green p-2 text-white rounded-md"
                >
                  Lanjutkan Pembayaran
                </Button>
              </Link>
            </div>
          </Modal>
        )}
      </section>
    </section>
  );
};
