'use client';
import { Button, CheckBox, TextField } from '@uninus/components';
import { signIn } from 'next-auth/react';
import { FC, ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TVSLogin, VSLogin } from './schema';
import Link from 'next/link';

export const LoginModule: FC = (): ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    setIsLoading(true);
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
      className="w-full h-auto px-5 lg:px-12 py-4 lg:py-6 flex flex-col gap-y-2"
    >
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-base lg:text-[1.5rem]">Login</h1>
        <p className="text-grayscale-5 w-[60vw] text-xs lg:text-sm lg:w-[30vw]">
          Selamat Datang Calon Nusantara Muda
        </p>
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
      <div className="flex flex-col gap-6">
        <div className="flex justify-between md:justify-around lg:justify-between">
          <CheckBox
            name="aggreement"
            control={control}
            label="Ingat saya"
            variant="primary"
            size="md"
          />
          <Link
            href="/auth/forgot-password"
            className="text-grayscale-4 hover:text-grayscale-6 duration-300 text-[12px]"
          >
            Lupa password ?
          </Link>
        </div>
        <div className="flex justify-center">
          <Button loading={isLoading} disabled={!isValid} width="w-full">
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
