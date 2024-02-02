import "./global.css";

export const metadata = {
  title: "PMB Uninus",
  description: "PMB Uninus adalah aplikasi PMB Uninus",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
