"use client";
import { FC, PropsWithChildren, ReactElement } from "react";
import { SideBar } from "@uninus/web/components";
import { useLogoutToRoot } from "@uninus/web/modules";
import { useSession } from "next-auth/react";
import {
  AiOutlineCreditCard,
  AiOutlineFileText,
  AiOutlineForm,
  AiOutlineHome,
} from "react-icons/ai";

const DashboardLayout: FC<PropsWithChildren> = ({ children }): ReactElement => {
  const { mutate } = useLogoutToRoot();
  const { data: session } = useSession();

  const handleLogout = async () => {
    mutate(session?.user?.refresh_token);
  };

  const sideLists = [
    {
      label: "Data Pegawai",
      link: "/dashboard",
      icon: <AiOutlineHome className="text-2xl" />,
      disabledStatus: false,
    },
    {
      label: "Data Pensiun",
      link: "/dashboard/data-pensiun",
      icon: <AiOutlineFileText className="text-2xl" />,
      disabledStatus: false,
    },
    {
      label: "Data Pelamar",
      link: "/dashboard/data-pelamar",
      icon: <AiOutlineForm className="text-2xl" />,
      disabledStatus: false,
    },
    {
      label: "Pembayaran",
      link: "/dashboard/pembayaran",
      icon: <AiOutlineCreditCard className="text-2xl" />,
      disabledStatus: false,
    },
  ];

  return (
    <main key="main" className={`flex w-full min-h-full overflow-x-hidden`}>
      <SideBar profileName="" profileEmail="" onLogout={handleLogout} sideList={sideLists} />

      <section
        key="dashboard"
        className="w-full bg-gray-100 lg:p-10 py-4 bg-grayscale-1 h-screen overflow-y-auto"
      >
        {children}
      </section>
    </main>
  );
};

export default DashboardLayout;
