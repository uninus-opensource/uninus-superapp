"use client";
import { ReactElement, FC, Fragment } from "react";
import { TeamOutlined } from "@ant-design/icons";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

export const CardSection: FC = (): ReactElement => {
  const CardData = [
    {
      icon: <TeamOutlined />,
      desc: "Total Dosen",
      jumlah: 300,
      background: "bg-warning-50",
      tcolor: "text-warning-500",
    },
    {
      icon: <TeamOutlined />,
      desc: "Total Mahasiswa",
      jumlah: 200,
      background: "bg-success-100",
      tcolor: "text-success-500",
    },
  ];

  const cardProps = {
    items: CardData?.map((x, i) => (
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
        items: 1,
      },
      768: {
        items: 2,
      },
      1024: {
        items: 2,
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
      <section className="lg:grid lg:grid-cols-2 md:hidden hidden gap-x-4">
        {CardData?.map((x, i) => (
          <div
            className=" bg-primary-white w-auto gap-y-4 shadow-md rounded-md p-2 text-lg relative "
            key={i}
          >
            <figure
              className={`flex justify-center items-center w-[40px] h-auto p-2  rounded-md ${x.background} ${x.tcolor}`}
            >
              {x.icon}
            </figure>
            <h1 className="py-1 text-sm">{x.desc}</h1>
            <p className="font-bold mb-4">{x.jumlah}</p>
          </div>
        ))}
      </section>
      <div className="lg:hidden w-full">
        <AliceCarousel key="card-carousel-landing" {...cardProps} />
      </div>
    </Fragment>
  );
};
