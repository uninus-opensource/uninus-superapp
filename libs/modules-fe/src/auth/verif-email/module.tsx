'use client';
import { Button } from '@uninus/components';
import { FC, ReactElement, useState, useEffect } from 'react';
import clsx from 'clsx';
import { useVerify } from './hook';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import OtpInput from 'react-otp-input';

export const VerifEmailModule: FC = (): ReactElement => {
  const searchParams = useSearchParams();
  const [isError, setIsError] = useState(false);
  const { mutate: verify } = useVerify();
  const email = searchParams.get('email') || '';
  const [otp, setOtp] = useState<string>('');
  const { push } = useRouter();

  useEffect(() => {
    if (otp.length === 6) {
      verify(
        {
          email: email,
          otp,
        },
        {
          onSuccess: () => {
            push('/auth/login');
          },
          onError: (error) => {
            setOtp('');
            setIsError(true);
          },
        }
      );
    }
  }, [otp]);
  const inputStyle = clsx(
    '!w-[64px] text-black focus:outline-none outline-none placeholder:text-black placeholder:p-2 !h-[64px] text-[28px] p-2 rounded-lg w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  shadow-sm ',
    {
      'border border-secodary-green-1 bg-sky-2': !isError,
      'border border-red-4 bg-red-1': isError,
    }
  );
  const containerStyle = clsx('flex gap-x-3 justify-center ');

  return (
    <form className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-[70%] flex flex-col gap-y-6 ">
        <div className="w-[18vw]">
          <h1 className="text-[2rem] font-bold text-primary-black font-bebasNeue">
            Verifikasi Email
          </h1>
        </div>
        <div className="w-[30vw]">
          <p className="text-grayscale-5 text-sm">
            {`Masukkan kode OTP yang sudah dikirimkan melalui email ${email}`}
          </p>
        </div>

        <div className="flex w-full">
          <OtpInput
            containerStyle={containerStyle}
            inputStyle={inputStyle}
            value={otp}
            onChange={setOtp}
            numInputs={6}
            shouldAutoFocus
            renderInput={(props) => <input {...props} />}
            inputType="tel"
          />
        </div>

        <Button type="submit" width="w-full">
          Kirim ulang kode
        </Button>
      </div>
    </form>
  );
};
