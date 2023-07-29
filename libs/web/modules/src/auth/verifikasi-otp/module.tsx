'use client';
import { FC, ReactElement, useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useVerify, useNewOtpRequest } from './hook';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import OtpInput from 'react-otp-input';
import { lazily } from 'react-lazily';
const { AuthLayout } = lazily(() => import('@uninus/web/layouts'));

export const VerifEmailModule: FC = (): ReactElement => {
  const searchParams = useSearchParams();
  const [isError, setIsError] = useState(false);
  const { mutate: verify } = useVerify();
  const { mutate: request } = useNewOtpRequest();
  const email = searchParams.get('email') || '';
  const [otp, setOtp] = useState<string>('');
  const { push } = useRouter();
  const [timer, setTimer] = useState(120);
  const intervalRef = useRef<any>();

  const countDownTimer = () => setTimer((prev) => prev - 1);
  useEffect(() => {
    intervalRef.current = setInterval(countDownTimer, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

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
          onError: () => {
            setOtp('');
            setIsError(true);
          },
        }
      );
    }
  }, [email, otp, push, verify]);
  const inputStyle = clsx(
    '!w-full text-black border-2 border-grayscale-3 focus:outline-none outline-none placeholder:text-black placeholder:p-2 lg:!h-[64px] h-10 text-[28px] p-2 rounded-lg shadow-sm',
    {
      'border border-secodary-green-1 ': !isError,
      'border border-red-4 ': isError,
    }
  );
  const containerStyle = clsx('flex lg:gap-x-3 gap-x-1 justify-center w-full ');

  return (
    <AuthLayout>
      <form className="w-full h-full p-12 lg:px-12 lg:py-4 flex flex-col  justify-center items-center">
        <div className="w-full flex flex-col gap-y-6 ">
          <h1 className="text-3xl font-bold text-primary-black font-bebasNeue w-60%">
            Verifikasi Kode OTP
          </h1>

          <p className="text-grayscale-5 lg:text-sm w-60%">
            {`Masukkan kode OTP yang sudah dikirimkan melalui email ${email}`}
          </p>

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
          <div>
            <small>
              Belum menerima kode ?{' '}
              <span>
                <span className="text-secondary-green-1">
                  {timer < 0 ? (
                    <span
                      onClick={() => {
                        setTimer(120);
                        request({ email: email });
                      }}
                      ref={intervalRef}
                      className="text-secondary-green-1 hover:underline underline-offset-4 font-semibold cursor-pointer"
                    >
                      Kirim Ulang
                    </span>
                  ) : (
                    timer
                  )}
                </span>
              </span>
            </small>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};
