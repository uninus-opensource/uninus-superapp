'use client';
import { Button, TextField } from '@uninus/web/components';
import { FC, ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { useReset } from './hook';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { TVSReset, VSReset } from './schema';

export const ResetModule: FC = (): ReactElement => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TVSReset>({
    mode: 'all',
    resolver: zodResolver(VSReset),
    defaultValues: {
      email: '',
      password: '',
      cpassword: '',
    },
  });

  const { mutate, isError } = useReset();
  const router = useRouter();

  const onSubmit = handleSubmit((data) => {
    mutate(
      {
        email: data?.email,
        password: data?.password,
      },
      {
        onSuccess: () => router.push(`/auth/login`),
      }
    );
  });

  return (
    <form
      className="w-full h-full p-12 lg:px-12 lg:py-6 flex flex-col justify-center items-center"
      onSubmit={onSubmit}
    >
      <div className="w-full flex flex-col gap-y-6 ">
        <h1 className="text-2xl font-bold text-primary-black font-bebasNeue w-50%">
          LUPA PASSWORD ?
        </h1>
        <p className="text-grayscale-5 text-sm">
          Silahkan mengatur ulang password akun anda
        </p>
        <div className="flex flex-col">
          <TextField
            name="email"
            type="email"
            variant="sm"
            placeholder="Masukan email"
            control={control}
            required
            status={errors?.email || isError ? 'error' : undefined}
            message={
              errors?.email?.message ||
              (isError ? 'email tidak ditemukan' : undefined)
            }
          />
          <TextField
            name="password"
            type="password"
            variant="sm"
            placeholder="Masukan password"
            control={control}
            required
            status={errors?.password ? 'error' : undefined}
            message={errors?.password?.message}
          />
          <TextField
            name="cpassword"
            type="password"
            variant="sm"
            placeholder="Masukan ulang password"
            control={control}
            required
            status={errors?.cpassword ? 'error' : undefined}
            message={errors?.cpassword?.message}
          />
        </div>

        <Button width="w-full" disabled={!isValid}>
          Atur Ulang Password
        </Button>
      </div>
    </form>
  );
};
