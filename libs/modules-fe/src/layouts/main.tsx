'use client';
import { Footer, LazyLoading, Navbar } from '@uninus/components';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { FC, Fragment, PropsWithChildren, ReactElement } from 'react';

export const MainLayout: FC<PropsWithChildren> = ({
  children,
}): ReactElement => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === 'loading') {
    return <LazyLoading />;
  }

  if (status === 'authenticated') {
    router.push('/dashboard');
  }

  return (
    <Fragment>
      <Navbar />
      {children}
      <Footer />
    </Fragment>
  );
};
