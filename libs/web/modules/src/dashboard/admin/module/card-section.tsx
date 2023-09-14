"use client";
import { ReactElement, FC, Fragment, useMemo } from "react";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  FileDoneOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { TDataCard } from "./type";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useRegistransData } from "@uninus/web/services";

export const CardSection: FC = (): ReactElement => {
  const { getRegistransData } = useRegistransData();

  const registrans = useMemo(() => {
    return getRegistransData;
  }, [getRegistransData]);

  const CardDesc: TDataCard[] = [
    {
      icon: <TeamOutlined />,
      desc: "Total Pendaftar",
      jumlah: registrans?.total_registrans,
      background: "bg-secondary-green-7",
      tcolor: "text-primary-green",
    },
    {
      icon: <CloseCircleOutlined />,
      desc: "Belum Membayar",
      jumlah: registrans?.unpaids,
      background: "bg-red-3",
      tcolor: "text-red-5",
    },
    {
      icon: <FileDoneOutlined />,
      desc: "Sudah Membayar",
      jumlah: registrans?.paids,
      background: "bg-[#FFFAA0]",
      tcolor: "text-primary-yellow",
    },
    {
      icon: <CheckCircleOutlined />,
      desc: "Sudah Diterima",
      jumlah: registrans?.accepted_registrans,
      background: "bg-secondary-green-1",
      tcolor: "text-primary-white",
    },
  ];

  const cardProps = {
    items: CardDesc.map((x, i) => (
      <div key={i} className="flex h-full p-4">
        <div
          className=" bg-primary-white w-full h-[130px] gap-y-4 shadow-md rounded-md p-4 text-lg"
          key={i}
        >
          <figure
            className={`flex justify-center items-center w-[40px] h-auto p-2  rounded-md ${x.background} ${x.tcolor}`}
          >
            {x.icon}
          </figure>
          <h1 className="py-1">{x.desc}</h1>
          <p className="font-bold">{x.jumlah}</p>
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
      <section className="lg:grid lg:grid-cols-4 md:hidden hidden gap-x-4">
        {CardDesc.map((x, i) => (
          <div
            className=" bg-primary-white w-auto h-[130px] gap-y-4 shadow-md rounded-md p-4 text-lg"
            key={i}
          >
            <figure
              className={`flex justify-center items-center w-[40px] h-auto p-2  rounded-md ${x.background} ${x.tcolor}`}
            >
              {x.icon}
            </figure>
            <h1 className="py-1">{x.desc}</h1>
            <p className="font-bold">{x.jumlah}</p>
          </div>
        ))}
      </section>
      <div className="lg:hidden w-full">
        <AliceCarousel key="card-carousel-landing" {...cardProps} />
      </div>
    </Fragment>
  );
};
