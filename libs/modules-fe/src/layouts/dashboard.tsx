'use client';
import { FC, PropsWithChildren, ReactElement, Suspense } from 'react';
import { LazyLoading, SideBar } from '@uninus/components';
import { useLogout } from '../auth';
import { signOut, useSession } from 'next-auth/react';
import { lazily } from 'react-lazily';
import { useRouter } from 'next/navigation';
import { AiFillHome, AiOutlineFileDone } from 'react-icons/ai';
import { FaRegUser } from 'react-icons/fa';
import { FileTextOutlined } from '@ant-design/icons';
const { DashboardContent } = lazily(() => import('./dashboardcontent'));

export const DashboardLayout: FC<PropsWithChildren> = ({
  children,
}): ReactElement => {
  const { data: session, status } = useSession();
  const { mutate } = useLogout();
  const handleLogout = async () => {
    mutate({
      onSuccess: () => signOut(),
    });
  };
  const router = useRouter();

  if (status === 'loading') {
    return <LazyLoading />;
  }

  if (status === 'unauthenticated') {
    router.push('/auth/login');
  }

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
