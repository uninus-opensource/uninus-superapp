'use client';
import { ReactElement } from 'react';
import { NextPage } from 'next';
import { Button, CheckBox, TextField } from '@uninus/components';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

const ForgotPassword: NextPage = (): ReactElement => {
  const { control } = useForm({
    defaultValues: {
      email: '',
    },
  });

  return (
    <section className="h-[42rem] md:h-screen lg:h-screen flex flex-col items-center bg-primary-green">
      <div className="w-full h-[6rem] flex justify-between">
        <div className="w-[40%] lg:w-[47%] flex justify-center md:justify-end lg:justify-start md:pr-[3vw] items-center lg:gap-5 lg:pl-[7vw]">
          <Image
            src="/illustrations/Neo-Uninus.png"
            alt="Neo Uninus"
            width={130}
            height={130}
            className="object-cover"
          />
          <div className="w-[2px] h-[3rem] bg-primary-white hidden lg:flex"></div>
          <div className="hidden lg:flex">
            <Image
              src="/illustrations/nu-white.png"
              alt="Neo Uninus"
              width={70}
              height={70}
              className="object-cover"
            />
          </div>
          <div className="hidden lg:flex">
            <Image
              src="/illustrations/kampus-merdeka-white.png"
              alt="Neo Uninus"
              width={70}
              height={70}
              className="object-cover"
            />
          </div>
        </div>
        <div className="w-[40%] lg:w-[27%] md:justify-start lg:justify-end lg:pr-[7vw] md:pl-[5vw] flex justify-center items-center">
          <Image
            src="/illustrations/hybrid-university.png"
            alt="Hybrid University"
            width={100}
            height={100}
          />
        </div>
      </div>
      <form className="w-[80vw] md:w-[60vw] lg:w-[70vw] lg:flex h-[27rem] lg:h-[32rem] rounded-lg bg-primary-white">
        <div className="w-[50%] hidden lg:flex bg-grayscale-9 rounded-l-lg">
          <Image
            src="/illustrations/talent-focus.png"
            alt="talent"
            className="object-cover rounded-l-lg opacity-[.28] w-full"
            width={500}
            height={100}
          />
          <div className="absolute">
            <div className="flex gap-4 justify-center items-center w-[35vw] h-[29.1rem]">
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
        </div>
        <div className="w-full lg:w-[50%] h-full flex flex-col justify-center items-center gap-3">
          <div className="lg:flex w-[80%] flex justify-center lg:justify-start">
            <div className="w-full md:flex md:w-full lg:w-[290px] md:justify-start">
              <h1 className="font-bold text-[1.9rem] lg:text-[2.5rem] text-primary-black tracking-normal lg:tracking-tighter font-bebasNeue">
                LUPA PASSWORD ?
              </h1>
            </div>
          </div>

          <p className="text-grayscale-5 text-sm w-[80%]">
            Masukkan email yang didaftarkan oleh akun anda
          </p>
          <div className="w-[80%]">
            <TextField
              name="email"
              type="email"
              variant="md"
              label="Email"
              placeholder="Masukan email"
              control={control}
              required
            />
          </div>
          <div className="w-[80%]">
            <Button width="w-full">Lanjutkan</Button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ForgotPassword;
