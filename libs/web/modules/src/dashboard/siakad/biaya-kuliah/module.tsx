"use client";

import { FC, ReactElement } from "react";
import { TDataCard } from "./type";
import { TableBiayaKuliah } from "./table";

export const MenuBiayaKuliah: FC = (): ReactElement => {
  const CardDesc: TDataCard[] = [
    {
      title: "Total Tunggakan",
      jumlah: 7,
      background: "bg-[#EDFFF5]",
      tcolor: "bg-primary-green",
    },
    {
      title: "Syarat KRS",
      jumlah: "Rp. 200.000",
      background: "bg-[#EDFFF5]",
      tcolor: "bg-primary-green",
    },
    {
      title: "Syarat UTS",
      jumlah: "Rp. 200.000",
      background: "bg-[#EDFFF5]",
      tcolor: "bg-primary-yellow",
    },
    {
      title: "Tagihan",
      desc: "Segera Lakukan Pembayaran",
      jumlah: "Rp. 4.600.000",
      background: "bg-[#EDFFF5]",
      tcolor: "bg-red-8",
      textColor: "text-red-8",
    },
  ];
  return (
    <section className="flex flex-col p-8 h-auto  gap-y-6 lg:text-start w-full ">
      <div className="2xl:text-2xl ">
        <h1 className="text-grayscale-9 text-[1.6rem] font-bold text-left">Biaya Kuliah</h1>
      </div>
      {/* CardSection */}
      <div className="flex gap-x-7 flex-col md:grid md:grid-cols-2 lg:flex-row lg:flex gap-y-4">
        {CardDesc.map((x, i) => (
          <div
            className=" bg-primary-white w-80% md:w-45%  items-center gap-x-5 xl:w-25% lg:w-25%  flex flex-row shadow-md rounded-md p-4 text-lg "
            key={i}
          >
            <div className={`h-[40px] w-1 rounded-lg ${x.tcolor}`} />
            <div className="flex flex-col text-left ">
              <h1 className="mt-2 text-xs xl:text-base font-semibold">{x.title}</h1>
              <h1 className={`text-xs xl:text-xs font-light ${x.textColor}`}>{x.desc}</h1>
              <p className="mt-2 font-bold text-2xl md:text-base xl:text-2xl">{x.jumlah}</p>
            </div>
          </div>
        ))}
      </div>
      {/* TableSection */}

      <div className="w-full">
        <TableBiayaKuliah />
      </div>
    </section>
  );
};
