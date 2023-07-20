'use client';
import { Button, TextField } from '@uninus/components';
import { FC, ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { useForgot } from './hook';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { TVSForgot, VSForgot } from './schema';

export const ForgotModule: FC = (): ReactElement => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TVSForgot>({
    mode: 'all',
    resolver: zodResolver(VSForgot),
    defaultValues: {
      email: '',
    },
  });

  const router = useRouter();

  const { mutate, isError } = useForgot();

  const onSubmit = handleSubmit((data) => {
    mutate(
      {
        email: data?.email,
      },
      {
        onSuccess: () =>
          router.push(`/auth/verifikasi-otp?email=${data?.email}`),
      }
    );
  });

  return (
    <form
      className="w-full h-full p-12 lg:px-12 lg:py-4 flex flex-col justify-center items-center"
      onSubmit={onSubmit}
    >
      <div className="w-full flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-primary-black font-bebasNeue w-50%">
          LUPA PASSWORD ?
        </h1>
        <p className="text-grayscale-5 text-sm">
          Masukkan email yang didaftarkan oleh akun anda
        </p>
        <TextField
          name="email"
          type="email"
          variant="md"
          placeholder="Masukan email"
          control={control}
          required
          status={errors?.email || isError ? 'error' : undefined}
          message={
            errors?.email?.message ||
            (isError ? 'email tidak ditemukan atau tidak valid' : undefined)
          }
        />
        <Button disabled={!isValid}>Lanjutkan</Button>
      </div>
    </form>
  );
};
