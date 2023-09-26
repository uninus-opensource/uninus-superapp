import { ReactElement, FC, Fragment } from "react";

import { TDataCard } from "./type";
import { AiOutlineAudit, AiOutlineFileProtect, AiOutlineHdd, AiOutlineTeam } from "react-icons/ai";

export const CardSection: FC = (): ReactElement => {
  const sectionOne: TDataCard[] = [
    {
      icon: <AiOutlineTeam />,
      desc: "Jumlah Karyawan",
      jumlah: 500,
    },
    {
      icon: <AiOutlineAudit />,
      desc: "Jumlah Karyawan Dosen",
      jumlah: 50,
    },
    {
      icon: <AiOutlineHdd />,
      desc: "Jumlah Karyawan Tendik",
      jumlah: 200,
    },
    {
      icon: <AiOutlineFileProtect />,
      desc: "Karyawan Tetap",
      jumlah: 150,
    },
    {
      icon: <AiOutlineHdd />,
      desc: "Karyawan Kontrak",
      jumlah: 200,
    },
  ];

  const sectionTwo: TDataCard[] = [
    {
      icon: <AiOutlineFileProtect />,
      desc: "Karyawan Dosen Yayasan",
      jumlah: 150,
    },
    {
      icon: <AiOutlineHdd />,
      desc: "Karyawan Dosen DPK",
      jumlah: 200,
    },
    {
      icon: <AiOutlineHdd />,
      desc: "Karyawan Dosen LB (Tidak Tetap)",
      jumlah: 200,
    },
    {
      icon: <AiOutlineFileProtect />,
      desc: "Karyawan Tendik Baru",
      jumlah: 150,
    },
    {
      icon: <AiOutlineHdd />,
      desc: "Karyawan Tendik Kontrak",
      jumlah: 200,
    },
  ];

  return (
    <Fragment>
      <section className="relative flex flex-wrap gap-y-12 gap-x-8">
        {sectionOne.map((x, i) => (
          <div
            className="relative flex flex-col justify-center bg-primary-white xl:w-[16em] xl:h-[7em] p-4 shadow-md rounded-lg text-lg"
            key={i}
          >
            <div className="absolute bg-primary-green w-2 h-[7em] -left-1 rounded-tl-lg rounded-bl-lg" />
            <div className="absolute bg-primary-white w-2 h-[7em] left-0.5 rounded-tl-sm rounded-bl-sm" />

            <figure
              className={`flex justify-center items-center text-xl w-[2em] h-auto p-2 rounded-md text-primary-green bg-secondary-green-8`}
            >
              {x.icon}
            </figure>
            <div className="flex flex-col mt-3">
              <h1 className="text-sm">{x.desc}</h1>
              <p className="text-2xl font-bold">{x.jumlah}</p>
            </div>
          </div>
        ))}
      </section>
      <section className="relative flex flex-wrap gap-y-12 gap-x-8 mt-6">
        {sectionTwo.map((x, i) => (
          <div
            className="relative flex flex-col justify-center bg-primary-white xl:w-[16em] xl:h-[7em] p-4 shadow-md rounded-lg text-lg"
            key={i}
          >
            <div className="absolute bg-primary-green w-2 h-[7em] -left-1 rounded-tl-lg rounded-bl-lg" />
            <div className="absolute bg-primary-white w-2 h-[7em] left-0.5 rounded-tl-sm rounded-bl-sm" />

            <figure
              className={`flex justify-center items-center w-[2em] h-auto p-2 rounded-md text-primary-green bg-secondary-green-8`}
            >
              {x.icon}
            </figure>
            <div className="flex flex-col mt-3">
              <h1 className="text-sm">{x.desc}</h1>
              <p className="text-2xl font-bold">{x.jumlah}</p>
            </div>
          </div>
        ))}
      </section>
    </Fragment>
  );
};
