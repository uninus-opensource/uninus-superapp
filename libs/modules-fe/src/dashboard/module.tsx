'use client';
import { DashboardLayout } from '../layouts';
import { ReactElement, FC } from 'react';
import Image from 'next/image';

export const DashboardModule: FC = (): ReactElement => {
  return (
    <DashboardLayout>
      <section className="flex flex-col text-center lg:text-start">
        <h1 className="text-slate-5">
          PMB <span className="text-secondary-green-4"> / Homepage</span>
        </h1>
        <p className="text-lg font-bold text-secondary-green-4">Homepage</p>
        <div className="w-full px-16 rounded-lg shadow-lg m-6">
          <p className="text-lg text-center py-8 lg:w-2/3 text-secondary-green-4">
            Selamat datang di dashboard PMB Universitas Islam Nusantara, untuk
            melakukan pendaftaran PMB dapat melihat tata cara di bawah ini :
          </p>
          <figure className="py-4">
            <Image
              src={'/illustrations/tata_cara.png'}
              alt="profil"
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
