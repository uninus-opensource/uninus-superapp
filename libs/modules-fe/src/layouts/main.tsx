'use client';
import { Footer, Navbar } from '@uninus/components';
import { FC, PropsWithChildren, ReactElement } from 'react';

export const MainLayout: FC<PropsWithChildren> = ({
  children,
}): ReactElement => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
};
