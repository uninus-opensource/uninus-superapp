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
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

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

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      const result = await signIn('login', {
        callbackUrl: '/dashboard',
        redirect: false,
        email: data.email,
        password: data.password,
      });

      setEmailError('');
      setPasswordError('');

      if (result?.error === 'Akun tidak ditemukan') {
        setEmailError('Akun tidak ditemukan');
      } else if (result?.error === 'Password salah') {
        setPasswordError('Password salah');
      } else {
      }

      if (!result?.error) {
        signIn('login', {
          callbackUrl: '/dashboard',
          redirect: true,
          email: data.email,
          password: data.password,
        });
      }
    } catch (error) {
      console.error('Unexpected error occurred during sign-in:', error);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="w-full px-5 lg:px-0 flex flex-col gap-y-4 lg:items-center flex-wrap"
    >
      <div className="flex flex-col p-4 xl:w-4/5 2xl:w-4/5 lg:mt-4 mt-0">
        <div className="flex flex-col gap-y-1 2xl:gap-y-2 ">
          <h1 className="font-bold text-base lg:text-2xl 2xl:text-4xl text-center lg:text-start">
            Login
          </h1>
          <p className="text-grayscale-5 w-[60vw] text-xs lg:text-sm lg:w-[30vw] 2xl:text-md lg:mb-1">
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
              status={errors?.email || emailError ? 'error' : undefined}
              message={errors?.email?.message || emailError}
            />
            <TextField
              name="password"
              type="password"
              variant="md"
              label="Password"
              control={control}
              placeholder="Masukan password"
              required
              status={errors?.password || passwordError ? 'error' : undefined}
              message={errors?.password?.message || passwordError}
            />
          </div>
        </div>
        <div className="flex flex-col xl:gap-y-6 lg:gap-y-4 gap-y-5">
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
            <p className="text-grayscale-4 text-[12px]">
              Belum memiliki akun ?
            </p>
            <Link
              href="/auth/register"
              className="text-primary-green text-[12px]"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};
