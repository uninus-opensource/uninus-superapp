'use client';
import { FC, ReactElement, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import {
  Button,
  CheckBox,
  SelectField,
  Modal,
  UploadField,
  DraggableComponent,
} from '@uninus/components';
import { PlusOutlined } from '@ant-design/icons';

const LandingPage: FC = (): ReactElement => {
  const { control } = useForm<FieldValues>({
    defaultValues: {
      checkboxField: false,
      uploadField: '',
      draggableComponent: '',
    },
  });

  const [showModal, setShowModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setShowModal(!showModal);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <section className="px-6 py-12">
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
          <Button variant="elevated" size="sm">
            Elevated
          </Button>
          <Button variant="elevated" size="sm" disabled>
            Elevated
          </Button>
          <Button variant="filled" size="sm">
            Filled
          </Button>
          <Button variant="filled" size="sm" disabled>
            Filled
          </Button>
          <Button variant="filled-tonal" size="sm">
            Filled Tonal
          </Button>
          <Button variant="filled-tonal" size="sm" disabled>
            Filled Tonal
          </Button>
          <Button variant="outlined" size="sm">
            Outlined
          </Button>
          <Button variant="text-icon" size="sm">
            Text/Icon Only
          </Button>
          <Button variant="text-icon" size="sm" disabled>
            Text/Icon Only
          </Button>
          <Button variant="filled-tonal" size="sm" width="w-10" height="h-10">
            <PlusOutlined />
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
        <div className="flex gap-2 w-auto">
          <UploadField
            control={control}
            label="Upload"
            variant="lg"
            name="uploadField"
            required
            accept="application/pdf"
          />
          <UploadField
            control={control}
            label="Upload"
            variant="md"
            name="uploadField"
            required
            accept="application/pdf"
          />
          <UploadField
            control={control}
            label="Upload"
            variant="sm"
            name="uploadField"
            required
            accept="application/pdf"
          />
        </div>
        <DraggableComponent control={control} name="draggableComponent" />
      </div>
    </section>
  );
};

export default LandingPage;
