'use client';
import { Button, TextField } from '@uninus/components';
import { FC, ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { TOtp } from './type';

export const OtpModule: FC = (): ReactElement => {
  const inputField: TOtp[] = [
    { name: 'otp1' },
    { name: 'otp2' },
    { name: 'otp3' },
    { name: 'otp4' },
    { name: 'otp5' },
    { name: 'otp6' },
  ];

  const { control, handleSubmit } = useForm({
    defaultValues: {
      otp1: '',
      otp2: '',
      otp3: '',
      otp4: '',
      otp5: '',
      otp6: '',
    },
  });

  const otpFields = Array.from({ length: 6 }, (_, index) => `otp${index + 1}`);

  return (
    <form className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-[70%] flex flex-col gap-2">
        <div className="w-[18vw]">
          <h1 className="text-[2rem] font-bold text-primary-black font-bebasNeue">
            LUPA PASSWORD?
          </h1>
        </div>
        <div className="w-[30vw]">
          <p className="text-grayscale-5 text-sm">
            Masukkan kode OTP yang sudah dikirimkan melalui email
          </p>
        </div>

        <div className="flex gap-2">
          {inputField?.map((field) => (
            <TextField
              name={field.name}
              type="text"
              variant="otp"
              control={control}
              maxlenght={1}
            />
          ))}
        </div>

        <Button width="w-full">Kirim kode</Button>
      </div>
    </form>
  );
};
