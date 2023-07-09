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
    <form className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-[65%] flex flex-col gap-2">
        <div className="w-[18vw]">
          <h1 className="text-[1.5rem] font-bold text-primary-black font-bebasNeue">
            LUPA PASSWORD?
          </h1>
        </div>
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
