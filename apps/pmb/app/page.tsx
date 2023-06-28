'use client'
import React from 'react';
import { useForm, FieldError, FieldValues, UseFormRegister } from 'react-hook-form';

type RadioButtonProps = {
  register: UseFormRegister<FieldValues>;
  error?: FieldError;
  name: string;
  value: string;
  label: string;
};

const RadioButton: React.FC<RadioButtonProps> = ({ register, error, name, value, label }) => {
  return (
    <div>
      <input type="radio" value={value} {...register(name)} />
      <label>{label}</label>
      {error && <p>{error.message}</p>}
    </div>
  );
};

const MyForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    alert(data.myRadioField);
  };

  return (
    <div className='flex justify-center items-center h-screen'>
    <form onSubmit={handleSubmit(onSubmit)}>
        
      <RadioButton
        register={register}
        error={errors.myRadioField as FieldError}
        name="myRadioField"
        value="option1"
        label="Opsi 1"
      />
      <RadioButton
        register={register}
        error={errors.myRadioField as FieldError}
        name="myRadioField"
        value="option2"
        label="Opsi 2"
        />

      <button type="submit">Submit</button>
    </form>
        </div>
  );
};

export default MyForm;
