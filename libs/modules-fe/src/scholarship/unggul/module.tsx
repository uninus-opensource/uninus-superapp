'use client';
import { ReactElement, FC, Suspense } from 'react';
import { Button, HeroBanner, LazyLoading } from '@uninus/components';
import Image from 'next/image';
import { lazily } from 'react-lazily';
const { MainLayout } = lazily(() => import('../../layouts'));

export const ModuleUnggul: FC = (): ReactElement => {
  return (
    <Suspense fallback={<LazyLoading />}>
      <MainLayout>
        <section className="w-full min-h-full">
          <HeroBanner heroImages="/illustrations/beasiswaunggul.svg" />
          <section className="w-full lg:px-16 px-8 lg:py-8 py-4 flex flex-col gap-y-14">
            <div className="text-center flex flex-col gap-y-8">
              <h1 className="lg:text-3xl text-2xl font-bold text-secondary-green-4 uppercase">
                beasiswa nusantara unggul
              </h1>
              <p className="lg:text-lg text-sm lg:w-4/5 w-full mx-auto lg:px-16 px-4">
                Beasiswa ini diperuntukan untuk Siswa Berprestasi di Bidang
                Akademik maupun Non Akademik
              </p>
            </div>

            <div className="w-full flex lg:flex-row md:flex-row flex-col justify-between h-auto pb-24">
              <figure className="lg:absolute flex px-6 right-12">
                <Image
                  src={'/illustrations/beasiswaunggul.svg'}
                  alt="Beasiswa Unggul"
                  width={400}
                  height={400}
                  priority
                />
              </figure>
              <div className="flex flex-wrap flex-col w-full justify-center lg:text-left text-center py-16 lg:pl-16 pl-0 gap-y-6 h-full">
                <div className="">
                  <h2 className="text-secondary-green-1 text-lg font-semibold mb-4">
                    Persyaratan Umum
                  </h2>
                  <ul className="list-decimal list-inside">
                    <li>Siswa Lulusan 2021, 2022, dan 2023</li>
                    <li>
                      Nilai rata-rata rapor {'>'} 85 dan UTBK {'>'} 575
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 className="text-secondary-green-1 text-lg font-semibold mb-2">
                    Benefit
                  </h2>
                  <p>Potongan 50% UKT Semester 1</p>
                </div>
                <div>
                  <h2 className="text-secondary-green-1 text-lg font-semibold mb-2">
                    Periode Pendaftaran
                  </h2>
                  <p>1 Januari - 31 Maret 2023</p>
                </div>
                <div className="flex lg:justify-start justify-center">
                  <Button
                    variant="elevated"
                    size="sm"
                    width="w-48"
                    height="h-12"
                    href="/auth/register"
                  >
                    Daftar
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </section>
      </MainLayout>
    </Suspense>
  );
};
