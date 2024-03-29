"use client";
import { FC, PropsWithChildren, ReactElement } from "react";
import { SideBar } from "@uninus/web/components";
import { useLogoutToRoot } from "@uninus/web/modules";
import { useSession } from "next-auth/react";
import { FileDoneOutlined, HomeOutlined, TeamOutlined, AuditOutlined } from "@ant-design/icons";

const DashboardLayout: FC<PropsWithChildren> = ({ children }): ReactElement => {
  const { mutate } = useLogoutToRoot();
  const { data: session } = useSession();

  const handleLogout = async () => {
    mutate(session?.user?.refreshToken);

  };

  const sideLists = [
    { label: "Beranda", link: "/dashboard", icon: <HomeOutlined />, disabledStatus: false },
    {
      label: "Data Mahasiswa",
      link: "/dashboard/data-mahasiswa",
      icon: <TeamOutlined />,
      disabledStatus: false,
    },
    {
      label: "Data Dosen",
      link: "/dashboard/data-dosen",
      icon: <TeamOutlined />,
      disabledStatus: false,
    },
    {
      label: "Perkuliahan",
      link: "/dashboard/perkuliahan",
      icon: <FileDoneOutlined />,
      disabledStatus: false,
    },
    {
      label: "Laporan",
      link: "/dashboard/laporan",
      icon: <AuditOutlined />,
      disabledStatus: false,
    },
  ];

  return (
    <main key="main" className="flex w-full min-h-full overflow-x-hidden">
      <SideBar
        moduleName="TATA USAHA"
        profileName="mawar saidah"
        profileEmail="mwrsdh@gmail.com"
        onLogout={handleLogout}
        sideList={sideLists}
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
