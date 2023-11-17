import { Montserrat } from "next/font/google";
import { AuthProvider, QueryProvider, RecoilProvider } from "@uninus/web/providers";
import "./global.css";

const monserrat = Montserrat({
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Evaluasi",
};

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${monserrat.className}`}>
      <body className={`${monserrat.className}`}>
        <AuthProvider>
          <QueryProvider>
            <RecoilProvider>
              <main key="landing-layout">{props.children}</main>
              <div key="modal-landing" id="modal-landing" />
            </RecoilProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
