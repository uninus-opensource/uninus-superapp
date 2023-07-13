'use client';
import { Button, TextField } from '@uninus/components';
import { FC, ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { useForgot } from './hook';
import { useRouter } from 'next/navigation';

export const ForgotModule: FC = (): ReactElement => {
  const { control, handleSubmit } = useForm({
    mode: 'all',
    defaultValues: {
      email: '',
    },
  });

  const { mutate: forgot } = useForgot();
  const router = useRouter();

  const onSubmit = handleSubmit((data) => {
    try {
      forgot(data);
      router.push('/auth/verif-email');
    } catch (error) {
      console.log(error);
    }
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
        />
        <Button>Lanjutkan</Button>
      </div>
    </form>
  );
};
