"use client";
import { ReactElement, FC, Fragment } from "react";
import { Footer, HeroBanner, Navbar } from "@uninus/web/components";
import Image from "next/image";
import Link from "next/link";

export const ModulBeasiswa: FC = (): ReactElement => {
  const beasiswaList: { name: string; img: string; link: string }[] = [
    {
      name: "beasiswa unggul",
      img: "/illustrations/beasiswaunggul.webp",
      link: "/beasiswa/beasiswaunggul ",
    },
    {
      name: "beasiswa berprestasi",
      img: "/illustrations/beasiswa2.webp",
      link: "/beasiswa/beasiswaprestasi ",
    },
    {
      name: "beasiswa mitra nusantara",
      img: "/illustrations/beasiswa3.webp",
      link: "/beasiswa/beasiswamitra",
    },
  ];

  return (
    <Fragment>
      <Navbar />
      <section className="w-full min-h-screen">
        <HeroBanner
          heroImages="/illustrations/foto-mahasiswa-bareng-2.webp"
          heroTitleBottomRight="BEASISWA"
          backgrounColor="bg-grayscale-8"
          blur
        />
        <div className="lg:w-full w-auto h-full lg:p-16 py-16 px-8 text-center flex justify-center font-bebasNeue">
          <div className="flex flex-col lg:gap-y-16 lg:w-5/6 w-full gap-y-8">
            <div className="lg:w-4/5 w-full lg:mx-auto ">
              <h1 className="text-center text-secondary-green-5 lg:text-3xl text-lg font-bold">
                PILIHAN BERBAGAI BEASISWA TERSEDIA DI UNIVERSITAS ISLAM NUSANTARA
              </h1>
            </div>
            <div className="lg:w-4/5 w-full mx-auto">
              <p className="lg:px-16 lg:text-lg text-sm  ">
                Beasiswa Nusantara adalah sebuah program beasiswa yang ditawarkan oleh Universitas
                Islam Nusantara untuk membantu mahasiswa melanjutkan studi ke jenjang yang lebih
                tinggi. Beasiswa ini bertujuan untuk memberikan kesempatan bagi mahasiswa untuk
                mencapai potensinya dan mengembangkan bakat dan minat mereka
              </p>
            </div>
          </div>
        </div>
        <div className="w-full px-14 py-4 h-16 bg-grayscale-2 bg-opacity-20 text-secondary-green-5 capitalize font-bold text-2xl">
          <h2>pilihan beasiswa</h2>
          <div className="h-1 w-28 mt-1 bg-primary-yellow rounded"></div>
        </div>
        <section className="w-full h-full py-16 px-4">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-y-8 place-items-center">
            {beasiswaList.map((item, idx) => (
              <Link href={item.link} key={idx} className="w-5/6">
                <div className="hover:-translate-y-4 duration-75  aspect-auto">
                  <Image
                    className="w-full "
                    src={item.img}
                    alt={item.name}
                    width={400}
                    height={400}
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </section>
      <Footer />
    </Fragment>
  );
};
