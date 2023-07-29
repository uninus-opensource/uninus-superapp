import { Montserrat } from 'next/font/google';
import {
  AuthProvider,
  QueryProvider,
  RecoilProvider,
} from '@uninus/web/providers';
import './global.css';

const monserrat = Montserrat({
  subsets: ['latin'],
  weight: '400',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${monserrat.className}`}>
        <AuthProvider>
          <QueryProvider>
            <RecoilProvider>{children}</RecoilProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
