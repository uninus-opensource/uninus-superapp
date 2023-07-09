'use client';
import { Button, CheckBox, TextField } from '@uninus/components';
import { signIn } from 'next-auth/react';
import { FC, ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TVSLogin, VSLogin } from './schema';
import Link from 'next/link';

export const LoginModule: FC = (): ReactElement => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TVSLogin>({
    mode: 'all',
    resolver: zodResolver(VSLogin),
    defaultValues: {
      email: '',
      password: '',
      aggreement: false,
    },
  });

  const onSubmit = handleSubmit((data) => {
    signIn('login', {
      callbackUrl: '/dashboard',
      redirect: true,
      email: data?.email,
      password: data?.password,
    });
  });

  return (
    <form
      onSubmit={onSubmit}
      className="w-full h-full px-12 py-4 flex flex-col gap-y-3"
    >
      <div className="flex">
        <div className="flex flex-col  justify-end">
          <h1 className="font-bold text-[1.5rem]">Login</h1>
          <div className="border-2 border-primary-green w-36"></div>
          <p className="text-grayscale-5 w-[60vw] text-[12px] lg:text-[13px] lg:w-[30vw]">
            Selamat Datang Calon Mahasiswa Uninus
          </p>
        </div>
      </div>
      <div className="flex flex-col w-full justify-center items-center">
        <div className="justify-center w-full flex flex-col">
          <TextField
            name="email"
            type="email"
            variant="md"
            label="Email"
            placeholder="Masukan email"
            control={control}
            required
            status={errors?.email ? 'error' : undefined}
            message={errors?.email?.message}
          />
          <TextField
            name="password"
            type="password"
            variant="md"
            label="Password"
            control={control}
            placeholder="Masukan password"
            required
            status={errors?.password ? 'error' : undefined}
            message={errors?.password?.message}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex justify-evenly md:justify-around lg:justify-between">
          <CheckBox
            name="aggreement"
            control={control}
            label="Ingat saya"
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
          <Button disabled={!isValid} width="w-full">
            Masuk Sekarang
          </Button>
        </div>
        <div className="flex gap-2">
          <p className="text-grayscale-4 text-[12px]">Belum memiliki akun ?</p>
          <Link
            href="/auth/register"
            className="text-primary-green text-[12px]"
          >
            Register
          </Link>
        </div>
      </div>
    </form>
  );
};
