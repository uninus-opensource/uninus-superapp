"use client";
import { FC, PropsWithChildren, ReactElement, ReactNode } from "react";
import { SideBar } from "@uninus/web/components";
import { useGetPopularData, useGetRegistrans, useLogoutToRoot } from "@uninus/web/modules";
import { useSession } from "next-auth/react";
import { Montserrat } from "next/font/google";
import {
  HomeOutlined,
  FormOutlined,
  FileTextOutlined,
  CreditCardOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import { usePopularPrograms, useRegistransData } from "@uninus/web/services";

const monserrat = Montserrat({
  subsets: ["latin"],
  weight: "400",
});

type TSideList = Array<{
  label: string;
  link: string;
  icon: ReactNode;
}>;

const DashboardLayout: FC<PropsWithChildren> = ({ children }): ReactElement => {
  const { mutate } = useLogoutToRoot();
  const { data: session } = useSession();

  const handleLogout = async () => {
    mutate(session?.user?.refresh_token);
  };

  const sideListsSuperAdmin: TSideList = [
    {
      label: "Beranda",
      link: "/dashboard",
      icon: <HomeOutlined />,
    },
    { label: "Master Data", link: "/dashboard/data-master", icon: <FileDoneOutlined /> },
    {
      label: "Data Akun",
      link: "/dashboard/data-akun",
      icon: <FileTextOutlined />,
    },
    { label: "Data Pendaftar", link: "/dashboard/data-pendaftar", icon: <FormOutlined /> },

    { label: "Pengajuan", link: "/dashboard/data-bayar", icon: <CreditCardOutlined /> },
  ];

  const sideListsAdminSeleksi: TSideList = [
    {
      label: "Beranda",
      link: "/dashboard",
      icon: <HomeOutlined />,
    },

    { label: "Data Pendaftar", link: "/dashboard/data-pendaftar", icon: <FormOutlined /> },
  ];

  const { data } = useGetRegistrans();

  const { setRegistransData } = useRegistransData();
  setRegistransData(data);

  const { data: popularProgram } = useGetPopularData();

  const { setPopularData } = usePopularPrograms();
  setPopularData(popularProgram);

  const roles = {
    Admin_Selek_PMB: "Admin Seleksi PMB",
    Super_Admin_PMB: "Super Admin PMB",
  };

  return (
    <main className={`flex w-full min-h-full overflow-x-hidden ${monserrat?.className}`}>
      <SideBar
        profileName="mawar saidah"
        profileEmail="mwrsdh@gmail.com"
        onLogout={handleLogout}
        sideList={
          session?.user?.role === roles?.Admin_Selek_PMB
            ? sideListsAdminSeleksi
            : sideListsSuperAdmin
        }
      />

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
