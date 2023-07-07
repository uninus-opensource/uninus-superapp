'use client';
import { TextField, Button } from '@uninus/components';
import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { NextPage } from 'next';
import { useRegister } from '@uninus/modules-fe';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import neoLogo from '../illustrations/Neo-Uninus2.png';
import hybridLogo from '../illustrations/hybrid-university.png';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const Register: NextPage = (): ReactElement => {
  const registerValidation = z.object({
    nik: z.string().length(16, { message: 'NIK harus diisi 16 karakter' }),
    fullname: z
      .string()
      .min(1, { message: 'Nama lengkap harus tidak boleh kosong' }),
    email: z.string().email({ message: 'Masukkan email yang valid' }),
    password: z
      .string()
      .min(8, { message: 'Password harus memiliki minimal 8 karakter' })
      .regex(/[A-Z]/, {
        message: 'Password harus mengandung huruf besar (uppercase)',
      })
      .regex(/[0-9]/, { message: 'Password harus mengandung angka' }),
  });

  type registerValidation = z.infer<typeof registerValidation>;

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<registerValidation>({
    resolver: zodResolver(registerValidation),
    mode: 'all',
    defaultValues: {
      nik: '',
      fullname: '',
      email: '',
      password: '',
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
    console.log(data);
  });

  return (
    <section className="w-full h-screen  bg-primary-green flex justify-center">
      <div className="w-[52.5rem] h-[30.625rem] bg-grayscale-1 rounded-xl overflow-hidden flex font-bebasNeue ">
        <figure
          className="w-[15.75rem] bg-cover bg-right object-center bg- bg-no-repeat bg-blend-multiply bg-grayscale-5"
          style={{
            backgroundImage: ` url("../foto-mahasiswa-bareng-2.jpg")`,
          }}
        >
          <div className="w-full h-full flex justify-center items-center gap-x-4 ">
            <Image src={neoLogo} alt="neo-uninus" className="w-[4.375rem] " />
            <div className="border-r-[1px] border-r-primary-white h-24"></div>
            <Image
              src={hybridLogo}
              alt="hybrid-uninus"
              className="w-[6.25rem]"
            />
          </div>
        </figure>
        <div className="w-[36.75rem] h-[30.625rem] p-12">
          <div className="w-full h-16 font-bold text-3xl">
            <h1 className="tracking-tight">REGISTRASI</h1>
            <div className="w-32 rounded-sm bg-primary-green h-1 mt-1"></div>
          </div>
          <form
            onSubmit={onSubmit}
            className="w-full flex flex-col h-2/3 relative "
          >
            <div className="grid grid-cols-2 gap-x-4 ">
              <div className="flex flex-col w-full gap-x-5 gap-y-4">
                <TextField
                  name="fullname"
                  variant="sm"
                  control={control}
                  label="Nama Lengkap"
                  placeholder="Masukan nama lengkap"
                  status={errors.fullname ? 'error' : 'none'}
                  message={errors.fullname?.message}
                />
                <TextField
                  name="email"
                  variant="sm"
                  type="email"
                  control={control}
                  label="Email Aktif"
                  placeholder="Masukan Email Aktif"
                  status={errors.email ? 'error' : 'none'}
                  message={errors.email?.message}
                />
              </div>

              <div className="flex flex-col w-full gap-x-5 gap-y-4">
                <TextField
                  name="nik"
                  type="number"
                  variant="sm"
                  control={control}
                  label="Nomor Induk Keluarga"
                  placeholder="Masukan NIK"
                  status={errors.nik ? 'error' : 'none'}
                  message={errors.nik?.message}
                />
                <TextField
                  name="password"
                  variant="sm"
                  control={control}
                  label="Password"
                  type="password"
                  placeholder="Masukkan Password"
                  status={errors.password ? 'error' : 'none'}
                  message={errors.password?.message}
                />
              </div>
            </div>
            <div className="mt-6">
              <p className="text-sm mb-2 text-grayscale-4">
                Sudah memiliki akun?{' '}
                <Link
                  href={'/login'}
                  className="text-secondary-green-1 font-bold ml-1"
                >
                  Login
                </Link>
              </p>
              <Button
                type="submit"
                loading={isLoading}
                size="sm"
                width="w-full"
                disabled={!isValid}
              >
                Lakukan Registrasi
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
