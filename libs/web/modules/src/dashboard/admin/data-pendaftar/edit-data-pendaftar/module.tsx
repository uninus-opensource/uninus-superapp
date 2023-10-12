"use client";
import { BreadCrumb } from "@uninus/web/components";
import { ReactElement, FC, useState, Fragment } from "react";
import { TTabSection } from "./type";
import { EditDataDiri } from "./section/data-diri";
import { EditDataPendidikan } from "./section/data-pendidikan";
import { EditDataNilaiRaport } from "./section/nilai-raport";
import { EditDataOrangtua } from "./section/data-orangtua";
import { usePathname } from "next/navigation";
import { useStudentDataById } from "@uninus/web/services";
import { useGetStudentById } from "./hooks";
import { EditFormulirPendaftar } from "./section/data-formulir";
// import { useSession } from "next-auth/react";

export const ModuleEditDataPendaftar: FC = (): ReactElement => {
  const [isActive, setIsActive] = useState<number>(1);

  // const { data: session } = useSession();

  // // const roles = {
  // //   admin_Selek_PMB: "Admin Seleksi PMB",
  // //   super_Admin_PMB: "Super Admin PMB",
  //   admin_keuangan_PMB: "Admin Keuangan PMB",
  // };

  const path = usePathname();
  const id = path.slice(46);

  const { setStudentbyId } = useStudentDataById();

  const { data, isLoading } = useGetStudentById(id);
  setStudentbyId(data);

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
    {
      no: 5,
      item: "Data Formulir Pendaftar",
    },
  ];

  const EditDataBreadcrumb = [
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
      link: path,
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
        {isLoading ? (
          <span className="bg-grayscale-2 w-full h-screen rounded-md animate-pulse"></span>
        ) : (
          <Fragment>
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
            <div className={isActive === 5 ? "block" : "hidden"}>
              <EditFormulirPendaftar />
            </div>
          </Fragment>
        )}
      </div>
    </section>
  );
};
