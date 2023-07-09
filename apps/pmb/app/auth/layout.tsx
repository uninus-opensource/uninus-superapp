import { FC, PropsWithChildren, ReactElement } from 'react';
import Image from 'next/image';

const AuthLayout: FC<PropsWithChildren> = ({ children }): ReactElement => {
  return (
    <main className="h-screen justify-start w-full flex flex-col gap-y-16 bg-primary-green">
      <header className="w-full flex justify-between h-auto px-[52px] ">
        <figure className="flex w-full gap-x-4">
          <Image
            src={'/illustrations/neo-uninus.svg'}
            width={163}
            height={47}
            alt={'neo-uninus'}
          />
          <div className="w-[2px] h-24 bg-primary-white"></div>
          <Image
            src={'/illustrations/nu-white.png'}
            width={120}
            height={47}
            alt={'neo-uninus'}
          />
          <Image
            src={'/illustrations/kampus-merdeka.svg'}
            width={120}
            height={47}
            alt={'neo-uninus'}
          />
        </figure>
        <figure className="flex w-full gap-x-4 justify-end">
          <Image
            src={'/illustrations/hybrid.svg'}
            width={163}
            height={47}
            alt={'neo-uninus'}
          />
        </figure>
      </header>
      <section className="h-fit flex justify-center items-center">
        <div className="w-1/4 hidden lg:flex bg-grayscale-9 rounded-l-lg">
          <Image
            src="/illustrations/talent-focus.png"
            alt="talent"
            className="object-cover rounded-l-lg opacity-[.28] w-full"
            width={500}
            height={100}
          />
          <div className="absolute flex gap-4 items-center justify-center px-6 pt-40 w-auto">
            <Image
              src="/illustrations/neo-uninus-2.png"
              alt="Neo uninus"
              className="object-cover"
              width={100}
              height={100}
            />
            <div className="w-[1px] h-[5rem] bg-primary-white"></div>
            <Image
              src="/illustrations/hybrid-university.png"
              alt="Hybrid University"
              className="object-cover"
              width={150}
              height={100}
            />
          </div>
        </div>
        <div className="w-1/2 flex h-full rounded-tr-lg rounded-br-lg bg-primary-white">
          {children}
        </div>
      </section>
    </main>
  );
};

export default AuthLayout;
