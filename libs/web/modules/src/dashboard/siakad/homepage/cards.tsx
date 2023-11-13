import { FC, ReactElement } from "react";
import { TDataCard } from "./type";

export const CardSection: FC = (): ReactElement => {
  const CardDesc: TDataCard[] = [
    {
      desc: "Batas Studi : 14 Semester",
      jumlah: 7,
      background: "bg-[#EDFFF5]",
      tcolor: "bg-primary-green",
      title: "Semester",
    },
    {
      desc: "Syarat Lulus SKS : 144 SKS",
      jumlah: "138 SKS",
      background: "bg-[#EDFFF5]",
      tcolor: "bg-primary-green",
      title: "Jumlah SKS",
    },
    {
      jumlah: "3.57 / 4.00",
      background: "bg-[#EDFFF5]",
      tcolor: "bg-primary-yellow",
      title: "IPK",
    },
    {
      desc: "Segera Lakukan Pembayaran",
      jumlah: "Rp. 4.600.000",
      background: "bg-[#EDFFF5]",
      tcolor: "bg-red-8",
      textColor: "text-red-8",
      title: "Tagihan",
    },
  ];
  return (
    <section className="flex gap-x-7 flex-col md:grid md:grid-cols-2 lg:flex-row lg:flex gap-y-4">
      {CardDesc.map((x, i) => (
        <div
          className=" bg-primary-white w-80% md:w-45%  items-center gap-x-5 xl:w-20% lg:w-25%  flex flex-row shadow-md rounded-md p-4 text-lg "
          key={i}
        >
          <div className={`h-[50%] w-1 rounded-lg ${x.tcolor}`} />
          <div className="flex flex-col text-left ">
            <h1 className="mt-2 text-xs xl:text-base font-semibold">{x.title}</h1>
            <h1 className={`text-xs xl:text-xs font-light ${x.textColor}`}>{x.desc}</h1>
            <p className="mt-2 font-bold text-2xl md:text-base xl:text-2xl">{x.jumlah}</p>
          </div>
        </div>
      ))}
    </section>
  );
};
