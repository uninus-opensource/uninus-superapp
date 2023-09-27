"use client";
import { BreadCrumb } from "@uninus/web/components";
import { ReactElement, FC, useState } from "react";
import { TTabSection } from "./type";
import { EditDataDiri } from "./section/data-diri";
import { EditDataPendidikan } from "./section/data-pendidikan";
import { EditDataNilaiRaport } from "./section/nilai-raport";
import { EditDataOrangtua } from "./section/data-orangtua";

export const EditDataBreadcrumb = [
  {
    name: "Beranda",
    link: "/dashboard",
  },
  {
    name: "Data Pendaftar",
    link: "/dashboard/data-pendaftar",
  },
  {
    name: "Edit Data Pendaftar",
    link: "/dashboard/data-pendaftar/edit-data-pendaftar",
  },
];
export const ModuleEditDataPendaftar: FC = (): ReactElement => {
  const [isActive, setIsActive] = useState<number>(1);
  const tabList: TTabSection[] = [
    {
      no: 1,
      item: "Data Diri Pendaftar",
    },
    {
      no: 2,
      item: "Data Pendidikan",
    },
    {
      no: 3,
      item: "Nilai Raport & SNBT",
    },
    {
      no: 4,
      item: "Data Orang Tua",
    },
  ];

  return (
    <section className="flex flex-col text-center gap-y-6 lg:text-start">
      <BreadCrumb items={EditDataBreadcrumb} />
      <h1 className="text-lg lg:text-2xl font-bold text-secondary-green-4">Edit Data Pendaftar</h1>
      <div className="flex justify-between w-full items-center h-[52px] rounded-md shadow-md my-4 p-2 ">
        <section className="flex text-md gap-4 text-slate-5">
          {tabList.map((list, idx) => (
            <div
              key={idx}
              onClick={() => setIsActive(list.no)}
              className={`p-1 hover:shadow-md hover:rounded-md hover:text-primary-green cursor-pointer ${
                isActive === list.no ? "text-primary-green shadow-md rounded md" : ""
              }`}
            >
              {list.item}
            </div>
          ))}
        </section>
      </div>
      <div className="flex flex-col justify-center gap-2 text-sm">
        <div className={isActive === 1 ? "block" : "hidden"}>
          <EditDataDiri />
        </div>
        <div className={isActive === 2 ? "block" : "hidden"}>
          <EditDataPendidikan />
        </div>
        <div className={isActive === 3 ? "block" : "hidden"}>
          <EditDataNilaiRaport />
        </div>
        <div className={isActive === 4 ? "block" : "hidden"}>
          <EditDataOrangtua />
        </div>
      </div>
    </section>
  );
};