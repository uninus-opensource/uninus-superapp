"use client";
import { FC, PropsWithChildren, ReactElement, useState } from "react";
import { SideBar } from "@uninus/web/components";
import { useLogoutToRoot } from "@uninus/web/modules";
import { useSession } from "next-auth/react";
import {
  AiOutlineAudit,
  AiOutlineFileText,
  AiOutlineForm,
  AiOutlineHdd,
  AiOutlineHome,
  AiOutlineTeam,
} from "react-icons/ai";

const DashboardLayout: FC<PropsWithChildren> = ({ children }): ReactElement => {
  const [isDropPegawai, setIsDropPegawai] = useState<boolean>(false);
  const [isDropPensiun, setIsDropPensiun] = useState<boolean>(false);
  const { mutate } = useLogoutToRoot();
  const { data: session } = useSession();

  const handleLogout = async () => {
    mutate(session?.user?.refresh_token);
  };

  const sideLists = [
    {
      label: "Dashboard",
      link: "/dashboard",
      icon: <AiOutlineHome className="text-2xl" />,
      disabledStatus: false,
    },
    {
      label: "Data Pegawai",
      icon: <AiOutlineTeam className="text-2xl" />,
      sideDropdown: true,
      isDropdown: isDropPegawai,
      onClick: () => {
        setIsDropPegawai(!isDropPegawai);
        setIsDropPensiun(false);
      },
      sideDropdownList: [
        {
          label: "Data Dosen",
          link: "/dashboard/data-dosen",
          icon: <AiOutlineAudit className="text-2xl" />,
          disabledStatus: false,
        },
        {
          label: "Data Tendik",
          link: "/dashboard/data-tendik",
          icon: <AiOutlineHdd className="text-2xl" />,
          disabledStatus: false,
        },
      ],
    },
    {
      label: "Data Pensiun",
      icon: <AiOutlineFileText className="text-2xl" />,
      sideDropdown: true,
      isDropdown: isDropPensiun,
      onClick: () => {
        setIsDropPensiun(!isDropPensiun);
        setIsDropPegawai(false);
      },
      sideDropdownList: [
        {
          label: "Data Pensiun Dosen",
          link: "/dashboard/data-pensiun-dosen",
          icon: <AiOutlineAudit className="text-2xl" />,
          disabledStatus: false,
        },
        {
          label: "Data Pensiun Tendik",
          link: "/dashboard/data-pensiun-tendik",
          icon: <AiOutlineHdd className="text-2xl" />,
          disabledStatus: false,
        },
      ],
    },
    {
      label: "Data Pelamar",
      link: "/dashboard/data-pelamar-dosen",
      icon: <AiOutlineForm className="text-2xl" />,
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
