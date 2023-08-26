"use client";
import { ReactElement, FC, Fragment, useEffect, PropsWithChildren } from "react";
import { Footer, Navbar } from "@uninus/web/components";
import { match } from "ts-pattern";
import Image from "next/image";
import { usePathname } from "next/navigation";

const DetailTemplate: FC<PropsWithChildren> = ({ children }): ReactElement => {
  useEffect(() => {
    window.scrollTo(0, 1000);
  }, []);

  const router = usePathname();

  console.log(router);

  const imagePathPrefix = (path: string): string => `/illustrations/${path}`;

  const pathnamePrefix = "/beasiswa/detail/";

  const imageToLoad = match(router)
    .with(pathnamePrefix + "beasiswa-mitra", () => imagePathPrefix("beasiswa-mitra.webp"))
    .with(pathnamePrefix + "beasiswa-peduli", () => imagePathPrefix("slider-4.webp"))
    .with(pathnamePrefix + "beasiswa-prestasi", () => imagePathPrefix("beasiswa-prestasi.webp"))
    .with(pathnamePrefix + "beasiswa-unggul", () => imagePathPrefix("beasiswa-unggul.webp"))
    .otherwise(() => "");

  return (
    <Fragment key="beasiswa-peduli">
      <Navbar />
      <section className="w-full min-h-screen">
        <Image
          src={imageToLoad}
          alt={router}
          width={100}
          height={100}
          layout="responsive"
          style={{ paddingTop: "80px" }}
          quality={100}
        />
        {children}
      </section>
      <Footer />
    </Fragment>
  );
};

export default DetailTemplate;
