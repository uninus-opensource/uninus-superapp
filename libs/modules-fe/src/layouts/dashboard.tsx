'use client';
import { FC, PropsWithChildren, ReactElement } from 'react';
import { LazyLoading, SideBar } from '@uninus/components';
import { useLogout } from '../auth';
import { signOut } from 'next-auth/react';
import dynamic from 'next/dynamic';
const DashboardContent = dynamic(
  () => import('./dashboardcontent').then((mod) => mod.DashboardContent),
  { loading: () => <LazyLoading /> }
);
export const DashboardLayout: FC<PropsWithChildren> = ({
  children,
}): ReactElement => {
  const { mutate } = useLogout();
  const handleLogout = async () => {
    mutate({
      onSuccess: () => signOut(),
    });
  };
  return (
    <main className="flex w-full min-h-full overflow-x-hidden ">
      <SideBar
        profileName="mawar saidah"
        profileEmail="mwrsdh@gmail.com"
        onLogout={handleLogout}
      />
      <DashboardContent>{children}</DashboardContent>
    </main>
  );
};
