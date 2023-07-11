'use client';
import { FC, ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { FormData, TUploadFile } from './types';
import { Button } from '../../../atoms';

export const UploadField: FC<TUploadFile> = ({
  className,
  required,
}): ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    const file = data.file[0];
    console.log(file);
  });

  return (
    <fieldset>
      <input
        className={className}
        type="file"
        {...register('file', { required })}
      />
      {errors.file && <span>This field is required</span>}
    </fieldset>
  );
};
