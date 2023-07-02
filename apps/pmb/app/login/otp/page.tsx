'use client';
import { Button, TextField } from '@uninus/components';
import { NextPage } from 'next';
import { ReactElement, useState, useEffect } from 'react';
import { TOtp } from './type';
import { useForm } from 'react-hook-form';

const OTPLogin: NextPage = (): ReactElement => {
  const inputField: TOtp[] = [
    { name: 'otp1' },
    { name: 'otp2' },
    { name: 'otp3' },
    { name: 'otp4' },
    { name: 'otp5' },
    { name: 'otp6' },
  ];

  const [countdown, setCountdown] = useState<number>(120);
  const [isSendcode, setIsSentCode] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 0) {
        setCountdown((prev) => prev - 1);
      } else {
        setCountdown(0);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  useEffect(() => {
    if (countdown === 0) {
      console.log('countdown selesai');
      setIsSentCode(true);
    }
  }, [countdown]);

  const { control } = useForm({
    defaultValues: {
      otp1: '',
      otp2: '',
      otp3: '',
      otp4: '',
      otp5: '',
      otp6: '',
    },
  });

  return (
    <section className="h-screen flex justify-center items-center border-2 border-black p-10 font-semibold">
      <div className="flex flex-col items-center py-8 w-[94vw] md:w-[35rem] h-[27rem] md:h-[30rem] border border-gray-200 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-md md:text-[1.5rem]">Verifikasi Email</h1>
          <span className="text-[0.6rem] md:text-xs text-slate-400">
            Kami sudah mengirim kode verifikasi ke email ba**@gmail.com
          </span>
          <form className="flex flex-col justify-between gap-10 items-center mt-14 h-56 w-[30rem] ">
            <div className="flex gap-4">
              {inputField?.map((field, idx) => (
                <div key={idx} className="w-full flex justify-center">
                  <div className="w-10 md:w-16 ">
                    <TextField
                      name={field.name}
                      type="text"
                      variant="otp"
                      control={control}
                      maxlenght={1}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div
              className={`text-xs md:text-sm ${isSendcode ? 'opacity-50' : ''}`}
            >
              <h1>Kode akan kadaluarsa pada:</h1>
              <span>{countdown}</span>
            </div>
            <div className="flex flex-col gap-2">
              <Button size="md" height="h-12">
                Verifikasi Akun
              </Button>
              <p className="text-xs">
                Belum menerima kode?
                <span className={`hover:cursor-pointer `}> Kirim ulang</span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default OTPLogin;
