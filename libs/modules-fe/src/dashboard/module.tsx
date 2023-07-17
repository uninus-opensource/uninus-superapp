'use client';
import { DashboardLayout } from '../layouts';
import { ReactElement, FC } from 'react';
import Image from 'next/image';

export const DashboardModule: FC = (): ReactElement => {
  return (
    <DashboardLayout>
      <section className="flex flex-col lg:px-10 px-4 text-center gap-y-6 lg:text-start">
        <div className="2xl:text-2xl">
          <h1 className="text-slate-5 ">
            PMB <span className="text-secondary-green-4"> / Homepage</span>
          </h1>
          <p className="text-lg 2xl:text-2xl font-bold text-secondary-green-4">
            Homepage
          </p>
        </div>
        <div className="w-full rounded-lg lg:h-full h-[400px] 2xl:h-[700px] bg-primary-white flex flex-col 2xl:gap-y-4 items-center py-6 px-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] ">
          <p className="lg:text-md text-xs 2xl:text-xl text-center py-4 font-semibold lg:w-5/6 text-secondary-green-4">
            Selamat datang di dashboard PMB Universitas Islam Nusantara, untuk
            melakukan pendaftaran PMB dapat melihat tata cara di bawah ini :
          </p>
          <figure className="pb-4">
            <Image
              src={'/illustrations/tata_cara.png'}
              alt="profil"
              className="2xl:w-[800px] 2xl:h-[530px] w-fit"
              width={584}
              height={400}
              quality={100}
              priority
            />
          </figure>
        </div>
      </section>
    </DashboardLayout>
  );
};
