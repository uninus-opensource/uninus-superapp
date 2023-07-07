'use client';
import { TextField, Button } from '@uninus/components';
import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { NextPage } from 'next';
import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

const Login: NextPage = (): ReactElement => {
  return (
    <section className="h-screen bg-primary-green flex justify-center">
      <div className="w-[75%] rounded-md h-[80%] mt-[5vh] bg-primary-white flex flex-col">
        <h1>Login</h1>
      </div>
    </section>
  );
};

export default Login;
