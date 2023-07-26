'use client';
import { Button, CheckBox, TextField } from '@uninus/components';
import { signIn } from 'next-auth/react';
import { FC, ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TVSLoginAdmin, VSLoginAdmin } from './schema';
import { lazily } from 'react-lazily';
const { AuthLayout } = lazily(() => import('../../layouts'));

export const LoginModuleAdmin: FC = (): ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TVSLoginAdmin>({
    mode: 'all',
    resolver: zodResolver(VSLoginAdmin),
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
    <AuthLayout>
      <form
        onSubmit={onSubmit}
        className="w-full px-5 lg:px-0 flex flex-col gap-y-4 lg:items-center flex-wrap"
      >
        <div className="flex flex-col p-4 xl:w-4/5 2xl:w-4/5 lg:mt-4 mt-0">
          <div className="flex flex-col gap-y-1 2xl:gap-y-2 ">
            <h1 className="font-bold text-base lg:text-2xl 2xl:text-4xl text-center lg:text-start">
              Login Admin
            </h1>
            <p className="text-grayscale-5 w-[60vw] text-xs lg:text-sm lg:w-[30vw] 2xl:text-md lg:mb-1">
              Selamat Datang Admin PMB
            </p>
          </div>
          {/* <span className=" mx-auto border border-red-5 my-3  text-red-5 p-1 text-xs rounded-md text-center w-1/3">
        akun tidak ditemukan
      </span> */}
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
          <div className="flex flex-col xl:gap-y-6 lg:gap-y-4 gap-y-5">
            <div className="flex justify-between md:justify-around lg:justify-between">
              <CheckBox
                name="aggreement"
                control={control}
                label="Ingat saya"
                variant="primary"
                size="md"
              />
            </div>
            <div className="flex justify-center">
              <Button loading={isLoading} disabled={!isValid} width="w-full">
                Masuk Sekarang
              </Button>
            </div>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};
