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
    <html lang="en">
      <body>
        <main className="flex w-full min-h-screen ">
          <SideBar
            profileName="mawar saidah"
            profileEmail="mwrsdh@gmail.com"
            onLogout={handleLogout}
          />
          <div className="w-full bg-gray-100 p-10 bg-slate-2">{children}</div>
        </main>
      </body>
    </html>
  );
};
