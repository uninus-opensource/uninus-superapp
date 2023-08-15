import { Montserrat } from "next/font/google";
import { AuthProvider, QueryProvider, RecoilProvider } from "@uninus/web/providers";
import "./global.css";

const monserrat = Montserrat({
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" key="root-layout">
      <body className={`${monserrat.className}`}>
        <AuthProvider>
          <QueryProvider>
            <RecoilProvider>
              <div key="landing-layout">{children}</div>
              <div key="modal-landing" id="modal"></div>
            </RecoilProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
