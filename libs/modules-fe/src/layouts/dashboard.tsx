'use client';
import { FC, PropsWithChildren, ReactElement } from 'react';
import { SideBar } from '@uninus/components';
import { useLogout } from '../auth';
import { signOut } from 'next-auth/react';
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
    <main className="flex w-full min-h-full ">
      <SideBar
        profileName="mawar saidah"
        profileEmail="mwrsdh@gmail.com"
        onLogout={handleLogout}
      />
      <div className="w-full bg-gray-100 lg:p-10 py-4 bg-grayscale-1 h-screen overflow-y-scroll">
        {children}
      </div>
    </main>
  );
};
