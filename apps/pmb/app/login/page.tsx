'use client';
import { TextField, Button, CheckBox } from '@uninus/components';
import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import talent from '../../public/talent-focus.png';
import neoUninus from '../../public/Neo-uninus-2.png';
import hybridUniversity from '../../public/hybrid-university.png';

const Login: NextPage = (): ReactElement => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
      agreement: false,
    },
  });

  return (
    <section className="h-[38rem] lg:h-[32rem] flex justify-center items-center bg-primary-green">
      <form className="w-[80vw] md:w-[60vw] lg:w-[70vw] lg:flex h-[27rem] lg:h-[29rem] rounded-lg bg-primary-white">
        <div className="w-[50%] hidden lg:flex bg-grayscale-9 rounded-l-lg">
          <Image
            src={talent}
            alt="talent"
            className="object-cover rounded-l-lg w-full h-full opacity-[.28]"
          />
          <div className="absolute">
            <div className="flex gap-4 justify-center items-center w-[35vw] h-[29.1rem]">
              <Image
                src={neoUninus}
                alt="Neo uninus"
                className="object cover"
              />
              <div className="w-[1px] h-[5rem] bg-primary-white"></div>
              <Image
                src={hybridUniversity}
                alt="Hybrid University"
                className="object cover w-[150px]"
              />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[50%] h-full">
          <div className="h-[25%] lg:h-[28%] flex">
            <div className="flex flex-col gap-2 lg:gap-0 ml-[8vw] lg:ml-[4.5vw] justify-end lg:justify-end lg:mb-[1rem]">
              <h1 className="font-bold text-[1.5rem]">LOGIN</h1>
              <p className="text-grayscale-5 w-[60vw] text-[12px] lg:text-[13px] lg:w-[30vw]">
                Selamat datang ! Silahkan masukkan akun anda
              </p>
            </div>
          </div>
          <div className="h-[42%] md:h-[39%] flex flex-col justify-center items-center">
            <div className="w-[80%] justify-center md:w-[75%]">
              <TextField
                name="email"
                type="email"
                variant="md"
                label="Email"
                placeholder="Masukan email"
                control={control}
                required
              />
              <TextField
                name="password"
                type="password"
                variant="md"
                label="Password"
                control={control}
                placeholder="Masukan password"
                required
              />
            </div>
          </div>
          <div className="h-[33%] md:h-[36%] lg:h-[33%] flex flex-col gap-3 lg:mt-[0.5rem]">
            <div className="flex justify-evenly md:justify-around lg:justify-between lg:px-[4.5vw]">
              <CheckBox
                name="agreement"
                control={control}
                label="Remember me"
                variant="primary"
                size="md"
              />
              <Link
                href="/forgot-password"
                className="text-grayscale-4 hover:text-grayscale-6 duration-300 text-[12px]"
              >
                Lupa password ?
              </Link>
            </div>
            <div className="flex justify-center">
              <div className="w-[78%] md:w-[75%]">
                <Button width="w-full">Login</Button>
              </div>
            </div>
            <div className="flex gap-2 ml-[10vw] md:ml-[8vw] lg:ml-[4.5vw]">
              <p className="text-grayscale-4 text-[12px]">
                Belum memiliki akun ?
              </p>
              <Link href="/register" className="text-primary-green text-[12px]">
                Register
              </Link>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;
