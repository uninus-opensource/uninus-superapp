'use client';
import { Footer, Navbar } from '@uninus/components';
import './global.css';
import { FC, PropsWithChildren, ReactElement } from 'react';
import { AuthProvider, QueryProvider, RecoilProvider } from '@uninus/providers';

const RootLayout: FC<PropsWithChildren> = ({ children }): ReactElement => {
  return (
    <html lang="en">
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
