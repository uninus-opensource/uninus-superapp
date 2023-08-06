"use client";
import { FC, PropsWithChildren, ReactElement, ReactNode } from "react";
import { SideBar } from "@uninus/web/components";
import { useLogout } from "@uninus/web/modules";
import { useSession } from "next-auth/react";
import { AiFillHome, AiOutlineFileDone } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { Montserrat } from "next/font/google";

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
  const { mutate } = useLogout();
  const { data: session } = useSession();

  const handleLogout = async () => {
    mutate(session?.user?.refresh_token);
  };

  const sideLists: TSideList = [
    {
      label: "Beranda",
      link: "/dashboard",
      icon: <AiFillHome />,
    },
    {
      label: "Master Pendaftar",
      link: "/dashboard/pendaftaran",
      icon: <AiOutlineFileDone />,
    },
    { label: "Master Data User", link: "/dashboard/biodata", icon: <FaRegUser /> },
  ];

  return (
    <html>
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