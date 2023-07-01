'use client';
import { Button, TextField } from '@uninus/components';
import { NextPage } from 'next';
import { ReactElement } from 'react';
import { TOtp } from './type';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

const OTPLogin: NextPage = (): ReactElement => {
  const inputField: TOtp[] = [
    { name: 'otp1' },
    { name: 'otp2' },
    { name: 'otp3' },
    { name: 'otp4' },
    { name: 'otp5' },
    { name: 'otp6' },
  ];

  const { control } = useForm({});

  return (
    <section className="h-screen flex justify-center items-center border-2 border-black p-10 font-semibold">
      <div className="flex flex-col items-center py-6 w-[35rem] h-[26rem] border border-gray-200 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-[1.5rem]">Email Verification</h1>
          <span className="text-[0.7rem] text-slate-400">
            We have sent a code to your email ba**@dipainhouse.com
          </span>
          <form className="flex flex-col justify-between items-center mt-16 h-56 w-[30rem] ">
            <div className="flex gap-4">
              {inputField?.map((field, idx) => (
                <div key={idx} className="w-full flex justify-center">
                  <div className="w-16 ">
                    <TextField
                      name={field.name}
                      type="text"
                      variant="otp"
                      control={control}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <Button size="sm" height="h-12">
                Verify Account
              </Button>
              <p className="text-xs">
                Did not recieve code?{' '}
                <span className="hover:cursor-pointer">Resend</span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default OTPLogin;
