'use client';
import { Footer, Navbar } from '@uninus/components';
import { FC, PropsWithChildren, ReactElement } from 'react';

const MainLayout: FC<PropsWithChildren> = ({ children }): ReactElement => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
        <div id="modal"></div>
      </body>
    </html>
  );
};

export default MainLayout;
