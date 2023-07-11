'use client';
import { Button, TextField } from '@uninus/components';
import { FC, ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { useForgot } from './hook';

export const ForgotModule: FC = (): ReactElement => {
  const { control, handleSubmit } = useForm({
    mode: 'all',
    defaultValues: {
      email: '',
    },
  });

  const { mutate: forgotPassword } = useForgot();

  const onSubmit = handleSubmit((data) => {
    try {
      forgotPassword(data);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="w-full h-full flex flex-col justify-center items-center"
    >
      <div className="w-[70%] flex flex-col gap-2">
        <div className="w-[18vw]">
          <h1 className="text-[2rem] font-bold text-primary-black font-bebasNeue">
            LUPA PASSWORD ?
          </h1>
        </div>
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
        <Button width="w-full">Lanjutkan</Button>
      </div>
    </form>
  );
};
