'use client';
import { Footer, Navbar } from '@uninus/components';
import './global.css';
import { FC, PropsWithChildren, ReactElement } from 'react';
import { AuthProvider, QueryProvider, RecoilProvider } from '@uninus/providers';
import { Montserrat, Bebas_Neue } from 'next/font/google';

const monserrat = Montserrat({
  subsets: ['latin'],
});

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
});

const RootLayout: FC<PropsWithChildren> = ({ children }): ReactElement => {
  return (
    <html lang="en" className={`${monserrat.className}`}>
      <body>
        <AuthProvider>
          <QueryProvider>
            <RecoilProvider>
              <Navbar />
              {children}
              <Footer />
            </RecoilProvider>
          </QueryProvider>
        </AuthProvider>
        <div id="modal"></div>
      </body>
    </html>
  );
};

export default RootLayout;
