"use client";
import { FC, PropsWithChildren, ReactElement } from "react";
import { SideBar } from "@uninus/web/components";
import { useLogout } from "@uninus/web/modules";
import { useSession } from "next-auth/react";
import { FileTextOutlined, FormOutlined, HomeOutlined, UploadOutlined } from "@ant-design/icons";
import { Montserrat } from "next/font/google";

const monserrat = Montserrat({
  subsets: ["latin"],
  weight: "400",
});

const DashboardLayout: FC<PropsWithChildren> = ({ children }): ReactElement => {
  const { mutate } = useLogout();
  const { data: session } = useSession();

  const handleLogout = async () => {
    mutate(session?.user?.refresh_token);
  };

  const sideLists = [
    { label: "Beranda", link: "/dashboard", icon: <HomeOutlined /> },
    {
      label: "Formulir",
      link: "/dashboard/pendaftaran",
      icon: <FileTextOutlined />,
    },
    { label: "Registrasi", link: "/dashboard/registrasi/biodata", icon: <FormOutlined /> },
    {
      label: "Upload Berkas",
      link: "/dashboard/dokumen",
      icon: <UploadOutlined />,
    },
  ];

  return (
    <html key="dashboard-layout">
      <body className={`${monserrat.className}`}>
        <div key="modal-logout" id="modal" />
        <main className="flex w-full min-h-full overflow-x-hidden ">
          <SideBar
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
      </body>
    </html>
  );
};

export default DashboardLayout;
