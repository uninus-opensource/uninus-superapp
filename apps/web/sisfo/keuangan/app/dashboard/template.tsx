"use client";
import { FC, PropsWithChildren, ReactElement, ReactNode } from "react";
import { SideBar } from "@uninus/web/components";
import { useLogoutToRoot } from "@uninus/web/modules";
import { useSession } from "next-auth/react";
import { Montserrat } from "next/font/google";
import {
  HomeOutlined,
  FormOutlined,
  FileTextOutlined,
  FileDoneOutlined,
  NotificationOutlined,
  SettingOutlined,
} from "@ant-design/icons";
// import { usePopularPrograms, useRegistransData } from "@uninus/web/services";

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
    mutate(session?.user?.refreshToken);

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
  ];

  const sideListsAdminSeleksi: TSideList = [
    {
      label: "Beranda",
      link: "/dashboard",
      icon: <HomeOutlined />,
    },

    { label: "Data Pendaftar", link: "/dashboard/data-pendaftar", icon: <FormOutlined /> },
  ];

  const sideListsAdminKeuangan: TSideList = [
    {
      label: "Beranda",
      link: "/dashboard",
      icon: <HomeOutlined />,
    },
    { label: "Master Data", link: "/dashboard/data-master", icon: <FileTextOutlined /> },

    { label: "Manajemen", link: "#", icon: <FileTextOutlined /> },
    { label: "Pengumuman", link: "#", icon: <NotificationOutlined /> },
    { label: "Pengaturan", link: "#", icon: <SettingOutlined /> },
  ];

  const roles = {
    admin_Selek_PMB: "Admin Seleksi PMB",
    super_Admin_PMB: "Super Admin PMB",
    admin_keuangan_PMB: "Admin Keuangan PMB",
  };

  return (
    <main className={`flex w-full min-h-full overflow-x-hidden ${monserrat?.className}`}>
      <SideBar
        profileName="mawar saidah"
        profileEmail="mwrsdh@gmail.com"
        onLogout={handleLogout}
        sideList={
          session?.user?.role === roles?.admin_Selek_PMB
            ? sideListsAdminSeleksi
            : session?.user?.role === roles?.super_Admin_PMB
            ? sideListsSuperAdmin
            : sideListsAdminKeuangan
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
