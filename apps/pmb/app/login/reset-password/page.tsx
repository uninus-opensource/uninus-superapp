'use client';
import { FC, ReactElement } from 'react';
import { Button, TextField } from '@uninus/components';
import { useForm } from 'react-hook-form';

const ResetPassword: FC = (): ReactElement => {
  const { control } = useForm({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  return (
    <section>
      <div className="h-screen flex flex-col justify-center items-center gap-2">
        <div className="w-[50vw] md:w-[40vw] lg:w-[30vw] xl:w-[25vw]">
          <h1 className="font-bold text-[1.7rem]">Ubah Password</h1>
          <div className="mt-5">
            <TextField
              name="newPassword"
              variant="sm"
              type="password"
              label="Password baru"
              placeholder="********"
              control={control}
              required
            />
          </div>
          <TextField
            name="newPassword"
            variant="sm"
            type="password"
            label="Konfirmasi password"
            placeholder="********"
            control={control}
            required
          />
          <div className="mt-5">
            <Button width="w-full">Reset Password</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
