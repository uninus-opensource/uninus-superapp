import { FC, ReactElement } from "react";
import { TDataCard } from "./type";
import { AiOutlineCheckCircle } from "react-icons/ai";

export const CardSection: FC = (): ReactElement => {
  const CardDesc: TDataCard[] = [
    {
      icon: <AiOutlineCheckCircle className="text-3xl" />,
      desc: "Total Jumlah Lulusan",
      jumlah: 500,
      background: "bg-[#EDFFF5]",
      tcolor: "text-primary-green",
    },
  ];
  return (
    <section className="flex">
      {CardDesc.map((x, i) => (
        <div
          className=" bg-primary-white w-[20%] xl:w-[13vw] lg:w-25% gap-y-2 flex flex-col shadow-md rounded-md p-4 text-lg border-l-8 border-l-primary-green"
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
  );
};
