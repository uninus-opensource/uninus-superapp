"use client";
import { FC, PropsWithChildren, ReactElement, useEffect, useMemo, useState } from "react";
import { SideBar } from "@uninus/web/components";
import { useLogout } from "@uninus/web/modules";
import { useSession } from "next-auth/react";
import { FileTextOutlined, FormOutlined, HomeOutlined, UploadOutlined } from "@ant-design/icons";
import { Montserrat } from "next/font/google";
import { useGetBiodata, useStudentGet } from "@uninus/web/modules";
import { useStudentData } from "@uninus/web/services";

const monserrat = Montserrat({
  subsets: ["latin"],
  weight: "400",
});

const DashboardLayout: FC<PropsWithChildren> = ({ children }): ReactElement => {
  const { mutate } = useLogout();
  const { data: session } = useSession();

  const [formStatus, setFormStatus] = useState<number | null | undefined>(null);

  const handleLogout = async () => {
    mutate(session?.user?.refresh_token);
  };

  const { data: student } = useGetBiodata();

  const { getStudent, setStudent } = useStudentData();
  setStudent(student);

  const { data: user } = useStudentGet();
  const userStatus = useMemo(() => {
    return user?.registration_status;
  }, [user?.registration_status]);

  useEffect(() => {
    setFormStatus(getStudent?.degree_program_id);
  }, [getStudent?.degree_program_id]);

  const sideLists = [
    { label: "Beranda", link: "/dashboard", icon: <HomeOutlined />, disabledStatus: false },
    {
      label: "Formulir",
      link: "/dashboard/pendaftaran",
      icon: <FileTextOutlined />,
      disabledStatus: false,
    },
    {
      label: "Registrasi",
      link: "/dashboard/registrasi/biodata",
      icon: <FormOutlined />,
      disabledStatus: formStatus ? false : true,
    },
    {
      label: "Upload Berkas",
      link: "/dashboard/dokumen",
      icon: <UploadOutlined />,
      disabledStatus:
        userStatus === "Belum Mendaftar" || userStatus === "Belum Membayar" ? true : false,
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
