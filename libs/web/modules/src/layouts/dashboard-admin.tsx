'use client';
import { FC, PropsWithChildren, ReactElement, Suspense } from 'react';
import { LazyLoading, SideBar } from '@uninus/web/components';
import { useLogout } from '../auth';
import { signOut, useSession } from 'next-auth/react';
import { lazily } from 'react-lazily';
import { AiFillHome, AiOutlineFileDone } from 'react-icons/ai';
import { FileTextOutlined } from '@ant-design/icons';
import { FaRegUser } from 'react-icons/fa';
const { DashboardContent } = lazily(() => import('./dashboard-content'));

export const DashboardAdminLayout: FC<PropsWithChildren> = ({
  children,
}): ReactElement => {
  const { status } = useSession();
  const { mutate } = useLogout();
  const handleLogout = async () => {
    mutate({
      onSuccess: () => signOut(),
    });
  };

  if (status === 'loading') {
    return <LazyLoading />;
  }

  const sideLists = [
    { label: 'Beranda', link: '/dashboard', icon: <AiFillHome /> },
    { label: 'data diri', link: '/dashboard/biodata', icon: <FaRegUser /> },
    {
      label: 'pendaftaran',
      link: '/dashboard/pendaftaran',
      icon: <AiOutlineFileDone />,
    },
    {
      label: 'Upload Dokumen',
      link: '/dashboard/dokumen',
      icon: <FileTextOutlined />,
    },
  ];

  return (
    <main className="flex w-full min-h-full overflow-x-hidden ">
      <SideBar
        profileName="mawar saidah"
        profileEmail="mwrsdh@gmail.com"
        onLogout={handleLogout}
        sideList={sideLists}
      />
      <Suspense fallback={<LazyLoading />}>
        <DashboardContent>{children}</DashboardContent>
      </Suspense>
    </main>
  );
};
