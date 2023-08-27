"use client";
import { Montserrat } from "next/font/google";
import { AuthProvider, QueryProvider, RecoilProvider } from "@uninus/web/providers";
import "./global.css";

const monserrat = Montserrat({
  subsets: ["latin"],
  weight: "400",
});

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" key="root-layout">
      <body className={`${monserrat.className}`}>
        <AuthProvider>
          <QueryProvider>
            <RecoilProvider>
              <div key="landing-layout">{props.children}</div>

              <div key="modal-logout" id="modal-logout" />
              <div key="modal-landing" id="modal-landing" />
            </RecoilProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
