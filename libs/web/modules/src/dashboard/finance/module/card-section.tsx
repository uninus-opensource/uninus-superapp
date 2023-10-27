"use client";
import { ReactElement, FC, Fragment } from "react";
import {
  CloseCircleOutlined,
  CreditCardOutlined,
  SafetyOutlined,
  TeamOutlined,
} from "@ant-design/icons";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useRecoilValue } from "recoil";
import { paymentSummary } from "./store";
import { TDataCard } from "./type";

export const CardSection: FC = (): ReactElement => {
  const paymentSummaryData = useRecoilValue(paymentSummary);

  const CardData: TDataCard[] = [
    {
      icon: <TeamOutlined />,
      desc: "Jumlah Mahasiswa",
      jumlah: paymentSummaryData?.summary?.total_student,
      update_data: "+20 penambahan",
      background: "bg-secondary-green-7",
      tcolor: "text-primary-green",
    },
    {
      icon: <TeamOutlined />,
      desc: "Jumlah Penerima Beasiswa",
      jumlah: paymentSummaryData?.summary?.additions_student_scholarship,
      update_data: "+20 penambahan",
      background: "bg-secondary-green-7",
      tcolor: "text-blue-2",
    },
    {
      icon: <SafetyOutlined />,
      desc: "Jumlah Lunas ",
      jumlah: paymentSummaryData?.summary?.paids,
      update_data: "+20 penambahan",
      background: "bg-secondary-green-7",
      tcolor: "text-primary-green",
    },
    {
      icon: <CreditCardOutlined />,
      desc: "Jumlah Cicil",
      jumlah: paymentSummaryData?.summary?.installment_payment,
      update_data: "+20 penambahan",
      background: "bg-secondary-green-7",
      tcolor: "text-primary-yellow ",
    },
    {
      icon: <CloseCircleOutlined />,
      desc: "Jumlah Belum Bayar",
      jumlah: paymentSummaryData?.summary?.undone_payment,
      update_data: "+20 penambahan",
      background: "bg-secondary-green-7",
      tcolor: "text-red-6",
    },
  ];

  // const CardData = paymentSummaryData?.data?.map((paymentSummary) => [
  //   {
  //     icon: <TeamOutlined />,
  //     desc: "Jumlah Mahasiswa",
  //     jumlah: paymentSummary.total_student,
  //     update_data: "+20 penambahan",
  //     background: "bg-secondary-green-7",
  //     tcolor: "text-primary-green",
  //   },
  //   {
  //     icon: <TeamOutlined />,
  //     desc: "Jumlah Penerima Beasiswa",
  //     jumlah: paymentSummary.installment_payment,
  //     update_data: "+20 penambahan",
  //     background: "bg-secondary-green-7",
  //     tcolor: "text-blue-2",
  //   },
  //   {
  //     icon: <SafetyOutlined />,
  //     desc: "Jumlah Lunas ",
  //     jumlah: paymentSummary.paid,
  //     update_data: "+20 penambahan",
  //     background: "bg-secondary-green-7",
  //     tcolor: "text-primary-green",
  //   },
  //   {
  //     icon: <CreditCardOutlined />,
  //     desc: "Jumlah Cicil",
  //     jumlah: paymentSummary.installment_payment,
  //     update_data: "+20 penambahan",
  //     background: "bg-secondary-green-7",
  //     tcolor: "text-primary-yellow ",
  //   },
  //   {
  //     icon: <CloseCircleOutlined />,
  //     desc: "Jumlah Belum Bayar",
  //     jumlah: paymentSummary.unpaid,
  //     update_data: "+20 penambahan",
  //     background: "bg-secondary-green-7",
  //     tcolor: "text-red-6",
  //   },
  // ]);

  const cardProps = {
    items: CardData?.map((x, i) => (
      <div key={i} className="flex h-full p-4 bg-">
        <div
          className=" bg-primary-white w-full h-[130px] gap-y-4 shadow-md rounded-md p-4 text-lg "
          key={i}
        >
          <figure
            className={`flex justify-center items-center w-[40px] h-auto p-2  rounded-md ${x.background} ${x.tcolor}`}
          >
            {x.icon}
          </figure>
          <h1 className="py-1">{x.desc}</h1>
          <p className="font-bold">{x.jumlah}</p>
          <small className="text-grayscale-3">{x.update_data}</small>
        </div>
      </div>
    )),
    responsive: {
      0: {
        items: 1,
      },
      640: {
        items: 2,
      },
      768: {
        items: 3,
      },
      1024: {
        items: 4,
      },
    },
    autoPlay: true,
    autoPlayInterval: 3000,
    animationDuration: 1000,
    infinite: true,
    disableButtonsControls: true,
  };

  return (
    <Fragment>
      <section className="lg:grid lg:grid-cols-5 md:hidden hidden gap-x-4">
        {CardData?.map((x, i) => (
          <div
            className=" bg-primary-white w-auto  gap-y-4 shadow-md rounded-md p-2 text-lg"
            key={i}
          >
            <figure
              className={`flex justify-center items-center w-[40px] h-auto p-2  rounded-md ${x.background} ${x.tcolor}`}
            >
              {x.icon}
            </figure>
            <h1 className="py-1 text-sm">{x.desc}</h1>
            <p className="font-bold">{x.jumlah}</p>
            <small className="text-grayscale-3">{x.update_data}</small>
          </div>
        ))}
      </section>
      <div className="lg:hidden w-full">
        <AliceCarousel key="card-carousel-landing" {...cardProps} />
      </div>
    </Fragment>
  );
};
