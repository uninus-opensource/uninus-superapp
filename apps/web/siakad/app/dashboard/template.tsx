"use client";
import { FC, PropsWithChildren, ReactElement } from "react";
import { NavbarSiakad, SidebarV2 } from "@uninus/web/components";
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
import { useSidebarSiakadToogle } from "@uninus/web/services";

const DashboardLayout: FC<PropsWithChildren> = ({ children }): ReactElement => {
  const { mutate } = useLogoutToRoot();
  const { data: session } = useSession();

  const { getSiakadToogle, setSiakadToogle } = useSidebarSiakadToogle();

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
      link: "/dashboard/krs",
      icon: <AiOutlineFileText />,
    },
    {
      name: "Biaya Kuliah",
      link: "/dashboard/biaya-kuliah",
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
    <main key="main" className={`flex w-full h-screen min-h-full overflow-hidden`}>
      <SidebarV2
        title="NusaVerse"
        sideList={sideList}
        onLogout={handleLogout}
        showSideBar={getSiakadToogle as boolean}
        onHoverOn={() => setSiakadToogle(true)}
        onHoverOff={() => setSiakadToogle(false)}
      />

      <div className={`w-full flex flex-col h-full lg:overflow-y-hidden`}>
        {getSiakadToogle && (
          <div
            className="h-screen w-full absolute bg-opacity-30 bg-primary-black lg:hidden z-30"
            onClick={() => setSiakadToogle(false)}
          />
        )}

        <NavbarSiakad />
        <section
          key="dashboard"
          className={`w-full bg-grayscale-1 overflow-auto`}
          onClick={() => setSiakadToogle(false)}
        >
          {children}
        </section>
      </div>
    </main>
  );
};

export default DashboardLayout;
