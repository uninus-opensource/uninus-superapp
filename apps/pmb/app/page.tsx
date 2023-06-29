'use client';
import { Fragment, ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { Button, CheckBox, Navbar, SelectField } from '@uninus/components';

const LandingPage = (): ReactElement => {
  const { control } = useForm({
    defaultValues: {
      checkboxField: false,
    },
  });

  return (
    <Fragment>
      <Navbar />
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <CheckBox
          control={control}
          name={'checkboxField'}
          required
          variant="primary"
          size="sm"
          labelSize="sm"
          label="Setuju"
          message="Valid"
        />

        <CheckBox
          control={control}
          name={'checkboxField'}
          required
          variant="error"
          size="md"
          labelSize="md"
          label="Setuju"
          message="Valid"
        />

        <CheckBox
          control={control}
          name={'checkboxField'}
          required
          variant="warning"
          size="lg"
          labelSize="lg"
          label="Setuju"
          message="Valid"
        />
        <div className="flex gap-2">
          <SelectField
            name="peran"
            label="Peran"
            size="sm"
            placeholder="pilih peran"
            status="none"
            options={['Mahasiswa', 'Dosen', 'Staff']}
            value="Dosen"
          />
          <SelectField
            name="peran"
            label="Peran"
            size="sm"
            placeholder="pilih peran"
            status="warning"
            options={['Mahasiswa', 'Dosen', 'Staff']}
            message="warning sample"
            value="Mahasiswa"
          />
        </div>
        <div className="flex gap-2">
          <SelectField
            name="peran"
            label="Peran"
            size="md"
            placeholder="pilih peran"
            status="error"
            options={['Mahasiswa', 'Dosen', 'Staff']}
            message="error sample"
            value="Mahasiswa"
          />
          <SelectField
            name="peran"
            label="Peran"
            size="md"
            placeholder="pilih peran"
            status="success"
            options={['Mahasiswa', 'Dosen', 'Staff']}
            message="success sample"
            value="Staff"
          />
        </div>

        <div className="flex gap-4">
          <Button
            href="https://litera.uninus.ac.id/uninus/login.jsp"
            variant="primary"
            size="sm"
            width="w-28"
            height="h-8"
          >
            Litera
          </Button>
          <Button
            href="https://www.facebook.com/"
            variant="error"
            size="md"
            width="w-28"
            height="h-8"
          >
            Facebook
          </Button>
          <Button
            href="https://www.google.com/"
            variant="warning"
            size="lg"
            width="w-28"
            height="h-8"
          >
            Google
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default LandingPage;
