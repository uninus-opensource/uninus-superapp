"use client";
import { FC, PropsWithChildren, ReactElement, ReactNode } from "react";
import { SideBar } from "@uninus/web/components";
import { useLogoutToRoot } from "@uninus/web/modules";
import { useSession } from "next-auth/react";
import { Montserrat } from "next/font/google";
import { HomeOutlined, FormOutlined, FileTextOutlined, FileDoneOutlined } from "@ant-design/icons";

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
    {
      label: "Data Dosen",
      link: "/dashboard/data-dosen",
      icon: <FileTextOutlined />,
    },

    { label: "Kelola Pertanyaan", link: "/dashboard/kelola-pertanyaan", icon: <FormOutlined /> },
    { label: "Hasil Evaluasi", link: "/dashboard/hasil-evaluasi", icon: <FileDoneOutlined /> },
  ];

  return (
    <main className={`flex w-full min-h-full overflow-x-hidden ${monserrat?.className}`}>
      <SideBar
        moduleName="Evaluasi Dosen"
        profileName="mawar saidah"
        profileEmail="mwrsdh@gmail.com"
        onLogout={handleLogout}
        sideList={sideListsSuperAdmin}
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
