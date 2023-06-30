'use client';
import { TextField, Button, CheckBox } from '@uninus/components';
import { useRouter } from 'next/navigation';
import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { NextPage } from 'next';

const Register: NextPage = (): ReactElement => {
  const { control } = useForm({
    defaultValues: {
      NIK: '',
      NamaLengkap: '',
      email: '',
      password: '',
      agreement: false,
    },
  });

  const router = useRouter();

  return (
    <div>
      <div className="h-[15rem] w-full flex items-end justify-center font-bold text-[1.8rem] md:h-[17rem] lg:h-[10rem]">
        <h1 className="text-center w-[80vw]">Pendaftaran Mahasiswa Baru</h1>
      </div>
      <form className="flex justify-center gap-5 mt-[2rem] md:mt-[3rem]">
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
          <div className="lg:mt-2 flex justify-start">
            <CheckBox
              name="agreement"
              control={control}
              required
              size="lg"
              label="Dengan mendaftar saya menyetujui syarat dan ketentuan yang berlaku"
            />
          </div>
          <div className="flex justify-center mt-[1.5rem]">
            <Button size="sm" width="w-full">
              Daftar
            </Button>
          </div>
          <div className="flex justify-center mt-[1rem] mb-[1rem]">
            <p>
              Sudah memiliki akun?{' '}
              <span
                className="underline text-bold cursor-pointer"
                onClick={() => router.push('/login')}
              >
                Masuk
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
