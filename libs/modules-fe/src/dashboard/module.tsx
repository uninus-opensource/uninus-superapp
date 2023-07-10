'use client';
import { DashboardLayout } from '../layouts';
import { ReactElement, FC } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export const DashboardModule: FC = (): ReactElement => {
  const { data: session } = useSession();
  return (
    <DashboardLayout>
      <section className="flex flex-col gap-4 lg:px-10 lg:ml-[18%] ml-0 text-center lg:text-start">
        <h1 className="text-4xl font-semibold uppercase">
          Hallo, {session?.user?.name}
        </h1>
        <p className="text-lg font-normal lg:w-2/3">
          Selamat Datang Di Aplikasi Penerimaan Mahasiswa Baru Universitas Islam
          Nusantara
        </p>
        <p className="text-lg lg:pr-16">
          Calon mahasiswa yang ingin mendaftarkan diri di Universitas Islam
          Nusantara, dapat mengisi kelengkapan seluruh data yang diperlukan
          dalam dashboard ini. Kemudian lakukan pendaftaran PMB Uninus pada menu
          Pendaftaran.
        </p>

        <figure className="w-full px-16 py-8">
          <Image
            src={'/illustrations/tata_cara.png'}
            alt="profil"
            width={584}
            height={400}
            quality={100}
            priority
          />
        </figure>
      </section>
    </DashboardLayout>
  );
};
