'use client';
import { Footer, Navbar } from '@uninus/components';
import { FC, Fragment, PropsWithChildren, ReactElement } from 'react';

export const MainLayout: FC<PropsWithChildren> = ({
  children,
}): ReactElement => {
  return (
    <Fragment>
      <Navbar />
      {children}
      <Footer />
    </Fragment>
  );
};
