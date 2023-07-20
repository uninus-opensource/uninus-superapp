import { FC, Fragment, ReactElement } from 'react';
import Image from 'next/image';
import {
  Ellipse,
  Reveal,
  HalfEllipseYellow,
  HalfEllipseGreen,
} from '@uninus/components';

export const WellcomeSection: FC = (): ReactElement => {
  return (
    <Fragment>
      <figure className="absolute left-0">
        <Ellipse />
      </figure>

      <Reveal>
        <section className="xl:px-[10vw] md:px-10 mx-auto lg:w-full md:w-full w-auto flex 2xl:justify-center xl:justify-evenly lg:justify-around lg:flex-row md:flex-row flex-col gap-8 items-center mt-32 h-auto">
          <Image
            src={'/illustrations/gerbang-uninus.png'}
            priority
            alt="gedung1"
            quality={100}
            width={400}
            height={400}
            className="rounded-lg bg-primary-white w-72 mr-4 md:mr-0 lg:w-96"
          />
          <div className="flex flex-col lg:w-7/12 w-full px-6 leading-normal font-semibold lg:pl-6">
            <h1 className="lg:text-4xl text-3xl text-left font-semibold text-secondary-green-4 mt-6">
              Selamat Datang Calon
              <br />
              Nusantara
              <span className="text-primary-green px-2">Muda</span>
            </h1>
            <p className="text-left text-base xl:text-lg font-semibold xl:font-normal lg:leading-6 text-grayscale-9 lg:mt-12 mt-8 w-full">
              Selamat datang nusantara muda di Universitas Islam Nusantara. Kami
              sangat senang Anda bergabung dengan kami dan yakin Anda akan
              menemukan banyak peluang belajar, berkembang, dan berkontribusi.
              Kami memiliki fasilitas pendidikan terbaik, dosen berkualitas, dan
              komunitas mahasiswa inklusif. Kami sangat menantikan kerjasama
              kita dan membantu Anda mencapai impian Anda.
            </p>
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
