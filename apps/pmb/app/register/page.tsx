'use client';
import { Navbar, TextField, Button } from '@uninus/components';
import { FC, ReactElement } from 'react';
import { useForm } from 'react-hook-form';

const Register: FC = (): ReactElement => {
  const { control } = useForm({
    defaultValues: {
      NIK: '',
      NamaLengkap: '',
      email: '',
      password: '',
    },
  });

  return (
    <div>
      <Navbar />
      <div className="h-[13.5rem] w-full flex items-end justify-center font-bold text-[1.8rem] md:h-[17rem] lg:h-[10rem]">
        <h1 className="text-center 2xl:text-red-500">
          Pendaftaran Mahasiswa Baru
        </h1>
      </div>
      <div className="flex justify-center gap-5 md:mt-[2rem]">
        <div className="w-[80vw] md:w-[60vw] lg:w-[40vw] xl:w-[30vw]">
          <TextField
            name="NIK"
            variant="md"
            control={control}
            label="NIK"
            placeholder="Masukan NIK"
            required
          />
          <TextField
            name="NamaLengkap"
            variant="md"
            control={control}
            label="Nama Lengkap"
            placeholder="Masukan nama lengkap"
            required
          />
          <TextField
            name="email"
            variant="md"
            control={control}
            label="Email"
            placeholder="Masukan email"
            required
          />
          <TextField
            name="password"
            variant="md"
            control={control}
            label="Password"
            placeholder="Masukan password"
            required
          />
          <div className="flex justify-center mt-[1.5rem]">
            <Button size="sm">Daftar</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
