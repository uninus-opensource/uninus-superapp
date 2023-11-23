import { Montserrat } from "next/font/google";
import "./global.css";
import { AuthProvider, QueryProvider, RecoilProvider } from "@uninus/web/providers";

const monserrat = Montserrat({
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Welcome to web/tata-usaha",
  description: "Generated by create-nx-workspace",
};
export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${monserrat.className}`}>
        <AuthProvider>
          <QueryProvider>
            <RecoilProvider>
              <main key="landing-tata-usaha">{props.children}</main>
              <div key="modal-landing" id="modal-landing" />
            </RecoilProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
