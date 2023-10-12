"use client";
import { ReactElement, FC, Fragment, useMemo } from "react";
import { TDataCard } from "./type";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useRegistransData } from "@uninus/web/services";
import {
  AiOutlineCheckCircle,
  AiOutlineFileDone,
  AiOutlineFileText,
  AiOutlineTeam,
} from "react-icons/ai";

export const CardSection: FC = (): ReactElement => {
  const { getRegistransData } = useRegistransData();

  const registrans = useMemo(() => {
    return getRegistransData;
  }, [getRegistransData]);

  const CardDesc: TDataCard[] = [
    {
      icon: <AiOutlineTeam className="text-3xl" />,
      desc: "Total Peminat",
      jumlah: registrans?.total_registrans,
      background: "bg-[#FBFDE9]",
      tcolor: "text-red-7",
    },
    {
      icon: <AiOutlineTeam className="text-3xl" />,
      desc: "Total Pendaftar",
      jumlah: registrans?.unpaids,
      background: "bg-blue-5",
      tcolor: "text-blue-1",
    },
    {
      icon: <AiOutlineFileText className="text-3xl" />,
      desc: "Membayar Formulir",
      jumlah: registrans?.paids,
      background: "bg-[#FBFDE9]",
      tcolor: "text-secondary-yellow-1",
    },
    {
      icon: <AiOutlineCheckCircle className="text-3xl" />,
      desc: "Lulus",
      jumlah: registrans?.accepted_registrans,
      background: "bg-secondary-green-7",
      tcolor: "text-primary-green",
    },
    {
      icon: <AiOutlineFileDone className="text-3xl" />,
      desc: "Membayar UKT",
      jumlah: registrans?.accepted_registrans,
      background: "bg-[#F1FFF8]",
      tcolor: "text-blue-4",
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
            className={`flex justify-center items-center w-[40px] p-1 rounded-md ${x.background} ${x.tcolor}`}
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
      <section className="lg:grid lg:grid-cols-5 md:hidden hidden gap-x-4">
        {CardDesc.map((x, i) => (
          <div
            className=" bg-primary-white w-auto h-[130px] gap-y-4 shadow-md rounded-md p-4 text-lg"
            key={i}
          >
            <figure
              className={`flex justify-center items-center w-[40px] p-1 rounded-md font-normal ${x.background} ${x.tcolor}`}
            >
              {x.icon}
            </figure>
            <h1 className="mt-2 text-xs xl:text-sm font-semibold">{x.desc}</h1>
            <p className="font-bold text-2xl md:text-xl xl:text-2xl">{x.jumlah}</p>
          </div>
        ))}
      </section>
      <div className="lg:hidden w-full">
        <AliceCarousel key="card-carousel-landing" {...cardProps} />
      </div>
    </Fragment>
  );
};
