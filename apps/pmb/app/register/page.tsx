'use client';
import { TextField, Button, CheckBox } from '@uninus/components';
import { Fragment, ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { NextPage } from 'next';
import { TRegisterRequest } from '@uninus/entities';
import { useRegister } from '@uninus/modules-fe';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Register: NextPage = (): ReactElement => {
  const { control, handleSubmit } = useForm<
    TRegisterRequest & { aggrement?: boolean }
  >({
    defaultValues: {
      nik: '',
      fullname: '',
      email: '',
      password: '',
      aggrement: false,
    },
  });

  const { push } = useRouter();

  const { mutate, isLoading } = useRegister();

  const onSubmit = handleSubmit((data) => {
    mutate(
      {
        email: data?.email,
        password: data?.password,
        nik: data?.nik,
        fullname: data?.fullname,
      },
      {
        onSuccess: () => push('/login'),
      }
    );
  });

  return (
    <Fragment>
      <div className="h-[15rem] w-full flex items-end justify-center font-bold text-[1.8rem] md:h-[17rem] lg:h-[10rem]">
        <h1 className="text-center w-[80vw]">Pendaftaran Mahasiswa Baru</h1>
      </div>
      <form
        onSubmit={onSubmit}
        className="flex justify-center gap-5 mt-[2rem] md:mt-[3rem]"
      >
        <div className="w-[80vw] md:w-[60vw] lg:w-[40vw] xl:w-[30vw]">
          <TextField
            name="nik"
            variant="md"
            control={control}
            label="NIK"
            placeholder="Masukan NIK"
          />
          <TextField
            name="fullname"
            variant="md"
            control={control}
            label="Nama Lengkap"
            placeholder="Masukan nama lengkap"
          />
          <TextField
            name="email"
            variant="md"
            control={control}
            label="Email"
            placeholder="Masukan email"
          />
          <TextField
            name="password"
            type="password"
            variant="md"
            control={control}
            label="Password"
            placeholder="Masukan password"
          />
          <div className="lg:mt-2 flex justify-start">
            <CheckBox
              name="aggrement"
              control={control}
              size="lg"
              label="Dengan mendaftar saya menyetujui syarat dan ketentuan yang berlaku"
            />
          </div>
          <div className="flex justify-center mt-[1.5rem]">
            <Button type="submit" loading={isLoading} size="sm" width="w-full">
              Daftar
            </Button>
          </div>
          <div className="flex justify-center mt-[1rem] mb-[1rem]">
            <p>
              Sudah memiliki akun?{' '}
              <Link
                href={'/login'}
                className="underline text-bold cursor-pointer"
              >
                Masuk
              </Link>
            </p>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default Register;
