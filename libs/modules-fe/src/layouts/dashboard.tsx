'use client';
import { FC, PropsWithChildren, ReactElement } from 'react';
import { SideBar } from '@uninus/components';
export const DashboardLayout: FC<PropsWithChildren> = ({
  children,
}): ReactElement => {
  return (
    <html lang="en">
      <body>
        <main className="flex w-full min-h-full">
          <SideBar profileName="mawar saidah" profileEmail="mwrsdh@gmail.com" />
          <div className="w-full bg-gray-100 p-10 bg-primary-white">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
};
