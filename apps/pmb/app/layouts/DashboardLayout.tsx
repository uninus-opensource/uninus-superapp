'use client';
import { FC, PropsWithChildren, ReactElement } from 'react';
import { SideBar } from '@uninus/components';
const DashboardLayout: FC<PropsWithChildren> = ({ children }): ReactElement => {
  return (
    <html lang="en">
      <body className="flex">
        <SideBar
          profilePicture="/illustrations/dummy-avatar.jpg"
          profileName="mawar saidah"
          profileEmail="mwrsdh@gmail.com"
        />
        <div className="w-full bg-gray-100 p-10 bg-slate-2">{children}</div>
      </body>
    </html>
  );
};

export default DashboardLayout;
