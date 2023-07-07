'use client';
import { TextField, Button } from '@uninus/components';
import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { NextPage } from 'next';
import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

const Login: NextPage = (): ReactElement => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    signIn('login', {
      email: data?.email,
      password: data?.password,
    });
  });

  const router = useRouter();

  const session = useSession();

  return (
    <section className="h-screen">
      <div className="h-[15rem] w-full flex items-end justify-center font-bold text-[1.8rem] md:h-[17rem] lg:h-[10rem]">
        <h1 className="text-center w-[80vw]">
          Masuk {session?.data?.user?.name}
        </h1>
        {session.data && (
          <span
            onClick={() =>
              signOut({
                redirect: true,
              })
            }
          >
            Keluar
          </span>
        )}
      </div>
      <form
        onSubmit={onSubmit}
        className="flex justify-center gap-5 mt-[2rem] md:mt-[3rem]"
      >
        <div className="w-[80vw] md:w-[60vw] lg:w-[40vw] xl:w-[30vw]">
          <TextField
            name="email"
            variant="md"
            control={control}
            label="Email"
            placeholder="Masukan email yang sudah terdaftar"
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
          <p
            className="text-green-700 underline cursor-pointer text-sm"
            onClick={() => router.push('/login/forgot-password')}
          >
            Lupa password ?
          </p>
          <div className="flex justify-center mt-[1.5rem]">
            <Button size="sm" width="w-full">
              Masuk
            </Button>
          </div>
          <div className="flex justify-center mt-[1rem] mb-[3rem]">
            <p>
              Belum mempunyai akun ? {''}
              <span
                className="underline text-bold cursor-pointer"
                onClick={() => router.push('/register')}
              >
                Daftar
              </span>
            </p>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;
