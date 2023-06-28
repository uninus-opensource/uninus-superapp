'use client';
import { Fragment, ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  CheckBox,
  Navbar,
  SelectField,
  Modal,
} from '@uninus/components';

const LandingPage = (): ReactElement => {
  const { control } = useForm({
    defaultValues: {
      checkboxField: false,
    },
  });

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(!showModal);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

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
          <div className="mb-2">
            <SelectField
              name="peran"
              label="Peran"
              size="md"
              placeholder="pilih peran"
              status="none"
              options={['Mahasiswa', 'Dosen', 'Staff']}
            />
          </div>
          <SelectField
            name="peran"
            label="Peran"
            size="md"
            placeholder="pilih peran"
            status="error"
            options={['Mahasiswa', 'Dosen', 'Staff']}
            message="error sample"
          />
          <SelectField
            name="peran"
            label="Peran"
            size="md"
            placeholder="pilih peran"
            status="success"
            options={['Mahasiswa', 'Dosen', 'Staff']}
            message="success sample"
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
        <Button
          onClick={handleOpenModal}
          variant="primary"
          size="sm"
          width="w-28"
          height="h-8"
        >
          Modal
        </Button>

        <Modal
          showModal={showModal}
          modalTitle="INI CERITANYA MODAL"
          onClose={handleCloseModal}
          onSubmit={() => alert('Submit Succes')}
          submitText="Save"
          closeText="Cancel"
        />
      </div>
    </Fragment>
  );
};

export default LandingPage;
