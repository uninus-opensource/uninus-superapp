'use client';
import { Button, TextField } from '@uninus/components';
import { FC, ReactElement } from 'react';
import { useForm } from 'react-hook-form';

export const ResetModule: FC = (): ReactElement => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      aggreement: false,
    },
  });
  return (
    <form className="w-full h-full p-12 lg:px-12 lg:py-6 flex flex-col justify-center items-center">
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
          />
          <TextField
            name="password"
            type="password"
            variant="sm"
            placeholder="Masukan password"
            control={control}
            required
          />
          <TextField
            name="confirmPassword"
            type="password"
            variant="sm"
            placeholder="Masukan ulang password"
            control={control}
            required
          />
        </div>

        <Button width="w-full">Atur Ulang Password</Button>
      </div>
    </form>
  );
};
