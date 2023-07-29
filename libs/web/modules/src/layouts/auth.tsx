'use client';
import { FC, PropsWithChildren, ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LazyLoading } from '@uninus/web/components';

export const AuthLayout: FC<PropsWithChildren> = ({
  children,
}): ReactElement => {
  const { status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <LazyLoading />;
  }

  if (status === 'authenticated') {
    router.push('/dashboard');
  }

  return (
    <main className="h-screen w-full flex flex-col lg:gap-y-10 xl:gap-y-16 bg-primary-green py-4 lg:py-8">
      <header className="w-full flex justify-between h-auto px-4 lg:px-8">
        <figure className="flex w-full gap-8 h-auto items-center">
          <figure className="flex w-60 lg:w-56 h-auto justify-between items-center">
            <Link href="/">
              <Image
                src={'/illustrations/neo-uninus.svg'}
                width={200}
                height={200}
                priority
                quality={100}
                alt={'neo-uninus'}
                className="w-32 sm:w-48"
              />
            </Link>
            <div className="w-[1px] hidden sm:block h-16 text bg-primary-white"></div>
          </figure>
          <figure className="flex w-64 lg:w-60 justify-between items-center">
            <Image
              src={'/illustrations/nu-white.webp'}
              width={500}
              height={500}
              priority
              quality={100}
              alt={'neo-uninus'}
              className="w-12 sm:w-24 "
            />
            <Image
              src={'/illustrations/kampus-merdeka.svg'}
              width={200}
              height={200}
              priority
              quality={100}
              alt={'neo-uninus'}
              className="w-12 sm:w-24"
            />
          </figure>
          <Image
            src={'/illustrations/hybrid.svg'}
            width={200}
            height={200}
            quality={100}
            alt={'hybrid-uninus'}
            className="w-14 sm:w-20 md:w-32 block md:hidden"
          />
        </figure>
        <figure className="flex w-full gap-x-4 justify-end">
          <Image
            src={'/illustrations/hybrid.svg'}
            width={200}
            height={200}
            quality={100}
            alt={'hybrid-uninus'}
            className="w-12 md:w-32 hidden md:block "
          />
        </figure>
      </header>
      <section className="h-[65vh] flex justify-center md:items-center py-1 lg:my-0 my-auto bg-primary-green">
        <div className="w-11/12 h-full flex justify-center md:items-center">
          <div className="hidden lg:h-full lg:flex lg:justify-center lg:items-center w-1/4 bg-grayscale-9 rounded-l-lg">
            <Image
              src="/illustrations/talent-focus.webp"
              alt="talent"
              priority
              quality={100}
              className="object-cover bg-cover rounded-l-lg opacity-[.28] w-full h-full"
              width={500}
              height={100}
            />
            <div className="absolute flex gap-4 items-center justify-center px-6 w-auto">
              <Image
                src="/illustrations/neo-uninus-2.webp"
                alt="Neo uninus"
                priority
                quality={100}
                className="object-cover lg:w-18 xl:w-20 2xl:w-28"
                width={200}
                height={100}
              />
              <div className="w-[1px] xl:h-[5rem] 2xl:h-[6rem] lg:h-[4rem] bg-primary-white"></div>
              <Image
                src="/illustrations/hybrid-university.webp"
                alt="Hybrid University"
                className="object-cover lg:w-24 xl:w-32 2xl:w-36"
                quality={100}
                priority
                width={150}
                height={100}
              />
            </div>
          </div>
          <div className="w-95% relative lg:w-1/2 flex items-center h-fit py-8 lg:-pt-24 lg:pb-10  lg:h-full rounded-lg lg:rounded-tl-none lg:rounded-bl-none lg:rounded-tr-lg lg:rounded-br-lg bg-primary-white overflow-hidden">
            {children}
          </div>
        </div>
      </section>
    </main>
  );
};
