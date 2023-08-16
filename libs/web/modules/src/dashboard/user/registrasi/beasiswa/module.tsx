"use client";
import { BreadCrumb } from "@uninus/web/components";
import { FC, Fragment, ReactElement } from "react";

export const beasiswaBreadcrumb = [
  {
    name: "Registrasi",
    link: "/dashboard/registrasi/biodata",
  },
  {
    name: "beasiswa",
    link: "/dashboard/registrasi/beasiswa",
  },
];

export const BeasiswaDashboardModule: FC = (): ReactElement => {
  return (
    <Fragment key="dashboard-beasiswa">
      <div className="w-full flex justify-center items-center gap-3">
        <h1 className="text-[1.5rem] md:text-sm text-slate-5 font-bold">
          PMB&nbsp;&nbsp;&nbsp;&gt;
        </h1>
        <BreadCrumb items={beasiswaBreadcrumb} />
      </div>
    </Fragment>
  );
};
