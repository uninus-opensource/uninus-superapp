'use client';
import { FC, PropsWithChildren, ReactElement } from 'react';
import { SideBar } from '@uninus/web/components';
import { useLogout } from '@uninus/web/modules';
import { signOut } from 'next-auth/react';
import { AiFillHome, AiOutlineFileDone } from 'react-icons/ai';
import { FaRegUser } from 'react-icons/fa';
import { FileTextOutlined } from '@ant-design/icons';

const DashboardLayout: FC<PropsWithChildren> = ({ children }): ReactElement => {
  const { mutate } = useLogout();

  const handleLogout = async () => {
    mutate({
      onSuccess: () => signOut(),
    });
  };

  const sideLists = [
    { label: 'Beranda', link: '/dashboard', icon: <AiFillHome /> },
    {
      label: 'pendaftaran',
      link: '/dashboard/pendaftaran',
      icon: <AiOutlineFileDone />,
    },
    { label: 'data diri', link: '/dashboard/biodata', icon: <FaRegUser /> },
    {
      label: 'Upload Dokumen',
      link: '/dashboard/dokumen',
      icon: <FileTextOutlined />,
    },
  ];

  return (
    <html>
      <body>
        <main className="flex w-full min-h-full overflow-x-hidden ">
          <SideBar
            profileName="mawar saidah"
            profileEmail="mwrsdh@gmail.com"
            onLogout={handleLogout}
            sideList={sideLists}
          />

          <section className="w-full bg-gray-100 lg:p-10 py-4 bg-grayscale-1 h-screen overflow-y-auto">
            {children}
          </section>
        </main>
      </body>
    </html>
  );
};

export default DashboardLayout;
