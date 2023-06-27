'use client';
import { Fragment, ReactElement } from 'react';
import { TextField, Button } from '@uninus/components';
import { BUTTON_VARIANT } from 'libs/components/src/atoms/button/enums';
import { useForm } from 'react-hook-form';

const LandingPage = (): ReactElement => {
  const { control } = useForm({
    defaultValues: {
      name: 'text field',
    },
  });
  return (
    <Fragment>
      <Button href="https://litera.uninus.ac.id/uninus/login.jsp">
        LITERA
      </Button>
      <Button variant={BUTTON_VARIANT.ERROR}>Waduh</Button>
      <TextField
        required
        control={control}
        name={'name'}
        label="Nama Lengkap"
        placeholder="Masukkan Nama Anda"
        variant="lg"
        message="Berhasil Memvalidasi"
        status="success"
      />
      <TextField
        required
        control={control}
        name={'name'}
        label="Nama Lengkap"
        placeholder="Masukkan Nama Anda"
        variant="md"
        message="Gagal tidak valid"
        status="error"
      />
      <TextField
        required
        control={control}
        name={'name'}
        label="Nama Lengkap"
        placeholder="Masukkan Nama Anda"
        variant="sm"
        message="Kurang banyak"
        status="warning"
      />
      <TextField
        required
        type="password"
        control={control}
        name={'name'}
        label="Kata Sandi"
        placeholder="Masukkan Nama Anda"
        variant="lg"
        message="Berhasil Memvalidasi"
        status="none"
        hint="Password setidaknya ada 8 karakter"
      />
    </Fragment>
  );
};

export default LandingPage;
