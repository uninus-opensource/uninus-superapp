'use client';
import { FC, PropsWithChildren, ReactElement } from 'react';

export const DashboardContent: FC<PropsWithChildren> = ({
  children,
}): ReactElement => {
  return (
    <section className="w-full bg-gray-100 lg:p-10 py-4 bg-grayscale-1 h-screen overflow-y-auto">
      {children}
    </section>
  );
};
