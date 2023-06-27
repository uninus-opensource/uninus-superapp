'use client';
import { Fragment, ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import {
  CheckBox,
  CHECKBOX_VARIANT,
  CHECKBOX_SIZE,
  LABEL_SIZE,
  STATUS_MESSAGE,
} from '@uninus/components';

const LandingPage = (): ReactElement => {
  const { control } = useForm({
    defaultValues: {
      checkboxField: false,
    },
  });

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <CheckBox
        control={control}
        name={'checkboxField'}
        required
        variant={CHECKBOX_VARIANT.PRIMARY}
        size={CHECKBOX_SIZE.SM}
        labelSize={LABEL_SIZE.SM}
        label="Setuju"
        message="Valid"
        messageStatus={STATUS_MESSAGE.SUCCESS}
      />

      <CheckBox
        control={control}
        name={'checkboxField'}
        required
        variant={CHECKBOX_VARIANT.ERROR}
        size={CHECKBOX_SIZE.SM}
        labelSize={LABEL_SIZE.SM}
        label="Setuju"
        message="Valid"
        messageStatus={STATUS_MESSAGE.ERROR}
      />

      <CheckBox
        control={control}
        name={'checkboxField'}
        required
        variant={CHECKBOX_VARIANT.WARNING}
        size={CHECKBOX_SIZE.SM}
        labelSize={LABEL_SIZE.SM}
        label="Setuju"
        message="Valid"
        messageStatus={STATUS_MESSAGE.WARNING}
      />
    </div>
  );
};

export default LandingPage;
