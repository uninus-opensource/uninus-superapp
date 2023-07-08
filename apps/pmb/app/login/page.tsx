'use client';
import { TextField, Button, CheckBox } from '@uninus/components';
import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

const Login: NextPage = (): ReactElement => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
      agreement: false,
    },
  });

  const onSubmit = handleSubmit((data) => {
    signIn('login', {
      email: data?.email,
      password: data?.password,
    });
  });

  const session = useSession();

  return (
    <section className="h-[42rem] md:h-screen lg:h-[45rem] flex flex-col items-center bg-primary-green">
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
      <form
        onSubmit={onSubmit}
        className="w-[80vw] md:w-[60vw] lg:w-[70vw] lg:flex h-[27rem] lg:h-[32rem] rounded-lg bg-primary-white"
      >
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
        <div className="w-full lg:w-[50%] h-full">
          <div className="h-[25%] lg:h-[28%] flex">
            <div className="flex flex-col gap-2 lg:gap-0 ml-[8vw] md:ml-[7.5vw] lg:ml-[4.5vw] justify-end lg:justify-end lg:mb-[1rem]">
              <h1 className="font-bold text-[1.5rem]">
                LOGIN {session?.data?.user?.name}
              </h1>
              {session.data && (
                <span
                  onClick={() =>
                    signOut({
                      redirect: true,
                    })
                  }
                >
                  Keluar
                </span>
              )}
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
