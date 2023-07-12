import { FC, PropsWithChildren, ReactElement } from 'react';
import Image from 'next/image';

const AuthLayout: FC<PropsWithChildren> = ({ children }): ReactElement => {
  return (
    <main className="h-screen w-full flex flex-col lg:gap-y-10 xl:gap-y-16 bg-primary-green py-4 lg:py-8">
      <header className="w-full flex justify-between h-auto px-4 lg:px-8 mb-[7vh] sm:mb-[15vh] lg:-mb-2 ">
        <figure className="flex w-full gap-8 h-auto items-center ">
          <figure className="flex w-60 lg:w-56 h-auto justify-between items-center">
            <Image
              src={'/illustrations/neo-uninus.svg'}
              width={200}
              height={200}
              priority
              quality={100}
              alt={'neo-uninus'}
              className="w-32 sm:w-48"
            />
            <div className="w-[1px] hidden sm:block h-16 text bg-primary-white"></div>
          </figure>
          <figure className="flex w-64 lg:w-60 justify-between items-center">
            <Image
              src={'/illustrations/nu-white.png'}
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
      <section className="h-fit flex justify-center items-center lg:my-0 my-auto">
        <div className="lg:w-1/4 hidden lg:h-full lg:flex lg:justify-center lg:items-center bg-grayscale-9 rounded-l-lg">
          <Image
            src="/illustrations/talent-focus.png"
            alt="talent"
            priority
            quality={100}
            className="object-cover rounded-l-lg opacity-[.28] w-full h-full"
            width={500}
            height={100}
          />
          <div className="absolute flex gap-4 items-center justify-center px-6 w-auto">
            <Image
              src="/illustrations/neo-uninus-2.png"
              alt="Neo uninus"
              priority
              quality={100}
              className="object-cover w-20"
              width={200}
              height={100}
            />
            <div className="w-[1px] h-[5rem] bg-primary-white"></div>
            <Image
              src="/illustrations/hybrid-university.png"
              alt="Hybrid University"
              className="object-cover w-32"
              quality={100}
              priority
              width={150}
              height={100}
            />
          </div>
        </div>
        <div className="w-95% lg:w-1/2 flex items-center h-auto lg:h-full rounded-lg lg:rounded-tl-none lg:rounded-bl-none lg:rounded-tr-lg lg:rounded-br-lg bg-primary-white">
          {children}
        </div>
      </section>
    </main>
  );
};

export default AuthLayout;
