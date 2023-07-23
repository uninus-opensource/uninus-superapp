'use client';
import { DashboardLayout } from '../layouts';
import { ReactElement, FC, useMemo } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export const DashboardModule: FC = (): ReactElement => {
  const { data: session } = useSession();

  const namaStudent = useMemo(() => {
    return session?.user?.name;
  }, [session?.user?.name]);

  return (
    <DashboardLayout>
      <section className="flex flex-col  lg:px-10 px-4 text-center gap-y-6 lg:text-start">
        <div className="2xl:text-2xl">
          <h1 className="text-slate-5 ">
            PMB <span className="text-secondary-green-4"> / Beranda</span>
          </h1>
          <p className="text-lg 2xl:text-2xl font-bold text-secondary-green-4">
            Beranda
          </p>
        </div>
        <div className="w-full rounded-lg h-auto bg-primary-white flex text-secondary-green-4 flex-col text-center items-center py-8 gap-5 px-7 lg:px-14 shadow-full">
          <figure className="w-56">
            <Image
              src={'/illustrations/dashboard-home.png'}
              alt="home"
              width={1000}
              height={1000}
              quality={100}
              priority
            />
          </figure>
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold">Hello, {namaStudent}</h1>
            <h2 className="font-semibold text-sm lg:text-base xl:text-lg">
              Selamat Datang di Dashboard Penerimaan Mahasiswa Baru (PMB) <br />
              Universitas Islam Nusantara
            </h2>
          </div>
          <hr className="w-full" />
          <h3 className="text-xs xl:text-sm mb-10">
            Bagi Nusantara Muda yang ingin mendaftarkan diri di Universitas
            Islam Nusantara, dapat mengisi kelengkapan data pribadi, data
            pendidikan, dan data orang tua pada menu{' '}
            <span className="font-bold">Data Diri</span> , Kemudian dapat
            mengisi formulir pendaftaran PMB yang dapat diakses pada menu{' '}
            <span className="font-bold">Pendaftaran</span>. Kemudian lakukan
            pembayaran, dan lihat status pendaftaran.
          </h3>
        </div>
      </section>
    </DashboardLayout>
  );
};
