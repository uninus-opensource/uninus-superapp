'use client';
import { ReactElement } from 'react';
import { NextPage } from 'next';
import { Button, TextField } from '@uninus/components';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

const ForgotPassword: NextPage = (): ReactElement => {
  const { control } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const router = useRouter();

  return (
    <section className="h-screen flex flex-col justify-center items-center">
      <div className="w-[60vw] md:w-[45vw] lg:w-[40vw] xl:w-[30vw]">
        <h1 className="font-bold text-[2rem]">Lupa kata sandi ?</h1>
        <p className="mt-2 text-[0.9rem]">
          Ketik email anda di kolom bawah ini dan kami akan mengirimkan kode
          untuk mengatur ulang kata sandi anda
        </p>
        <div className="mt-4">
          <TextField
            name="email"
            type="text"
            variant="sm"
            control={control}
            label="Email anda"
            placeholder="nama@gmail.com"
            required
          />
        </div>
        <Button size="sm" width="w-full">
          Kirim kode
        </Button>
        <p
          className="text-right text-green-600 text-sm mt-2 cursor-pointer"
          onClick={() => router.push('/login')}
        >
          Kembali ke login
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;
