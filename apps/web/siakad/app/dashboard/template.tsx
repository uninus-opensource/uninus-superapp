"use client";
import { FC, PropsWithChildren, ReactElement } from "react";
import { SidebarV2 } from "@uninus/web/components";
import {
  AiOutlineAppstore,
  AiOutlineAudit,
  AiOutlineBook,
  AiOutlineCopy,
  AiOutlineCreditCard,
  AiOutlineFileDone,
  AiOutlineFileText,
  AiOutlineForm,
  AiOutlineTeam,
} from "react-icons/ai";
import { useLogoutToRoot } from "@uninus/web/modules";
import { useSession } from "next-auth/react";

const DashboardLayout: FC<PropsWithChildren> = ({ children }): ReactElement => {
  const { mutate } = useLogoutToRoot();
  const { data: session } = useSession();

  const handleLogout = async () => {
    mutate(session?.user?.refresh_token);
  };

  const sideList = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <AiOutlineAppstore />,
    },
    {
      name: "KRS",
      link: "/krs",
      icon: <AiOutlineFileText />,
    },
    {
      name: "Biaya Kuliah",
      link: "/biaya-kuliah",
      icon: <AiOutlineCreditCard />,
    },
    {
      name: "E-Learning",
      link: "/e-learning",
      icon: <AiOutlineBook />,
    },
    {
      name: "Kuisioner",
      link: "/kuisioner",
      icon: <AiOutlineForm />,
    },
    {
      name: "Hasil Studi",
      link: "/hasil-studi",
      icon: <AiOutlineFileDone />,
    },
    {
      name: "Kegiatan",
      link: "/kegiatan",
      icon: <AiOutlineCopy />,
    },
    {
      name: "Pengajuan",
      link: "/pengajuan",
      icon: <AiOutlineAudit />,
    },
    {
      name: "Tracer Study",
      link: "/tracer-study",
      icon: <AiOutlineTeam />,
    },
  ];

  return (
    <main key="main" className="flex w-full min-h-full overflow-x-hidden">
      <SidebarV2 title="NusaVerse" sideList={sideList} onLogout={handleLogout} />
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
