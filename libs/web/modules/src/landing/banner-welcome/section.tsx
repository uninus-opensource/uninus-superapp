import { FC, Fragment, ReactElement } from "react";
import Image from "next/image";
import { Ellipse, Reveal, HalfEllipseYellow, HalfEllipseGreen } from "@uninus/web/components";
import { NeoTypography } from "@uninus/ui-atoms";

export const WelcomeSection: FC = (): ReactElement => {
  return (
    <Fragment>
      <figure className="absolute left-0">
        <Ellipse />
      </figure>

      <Reveal>
        <section className="xl:px-[10vw] md:px-10 px:14 mx-auto lg:w-full md:w-full w-auto flex 2xl:justify-center xl:justify-evenly lg:justify-around lg:flex-row md:flex-row flex-col gap-8 items-center mt-28 h-auto">
          <Image
            src={"/illustrations/gerbang-crop.webp"}
            priority
            alt="gedung1"
            quality={100}
            width={400}
            height={400}
            className="rounded-lg bg-primary-white w-72 mr-4 md:mr-0 lg:w-96 h-auto"
          />
          <div className="flex flex-col lg:w-7/12 w-full px-6 leading-normal lg:pl-6 gap-12">
            <NeoTypography
              size="title-5"
              variant="bold"
              textPosisition="center"
              color="text-secondary-green-4"
              sizeResponsiveLG="title-5"
              responsiveClassName="lg:text-left"
            >
              Selamat Datang
              <br />
              Calon Nusantara Muda
            </NeoTypography>
            <NeoTypography
              size="body-1"
              textPosisition="justify"
              responsiveClassName="xl:font-normal lg:leading-6"
            >
              Selamat datang <span className="font-bold">Calon Nusantara Muda</span> di Universitas
              Islam Nusantara. Kami sangat senang Anda bergabung dengan kami dan yakin Anda akan
              menemukan banyak peluang belajar, berkembang, dan berkontribusi. Kami memiliki
              fasilitas pendidikan terbaik, dosen berkualitas, dan komunitas mahasiswa inklusif.
              Kami sangat menantikan kerjasama kita dan membantu mencapai impian Anda.
            </NeoTypography>
          </div>
        </section>
      </Reveal>
      <figure className="absolute lg:flex hidden z-30 mt-16 right-0">
        <HalfEllipseYellow />
      </figure>
      <figure className="absolute right-0 lg:flex hidden mt-0.5">
        <HalfEllipseGreen />
      </figure>
    </Fragment>
  );
};
