'use client';
import { FC, ReactElement, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import {
  Button,
  CheckBox,
  Modal,
  UploadField,
  DraggableComponent,
  TabJalurSeleksi,
  SelectField,
  Accordion,
} from '@uninus/components';
import { PlusOutlined } from '@ant-design/icons';
import Select from 'react-select';

const MultiOptions = [
  {
    value: '1',
    label: 'CSS',
  },
  {
    value: '2',
    label: 'JS',
  },
  {
    value: '3',
    label: 'Typescript',
  },
  {
    value: '3',
    label: 'Tailwind',
  },
];

const options = [
  {
    label: 'Buah',
    options: [
      { value: 'apple', label: 'Apel' },
      { value: 'orange', label: 'Jeruk' },
      { value: 'banana', label: 'Pisang' },
    ],
  },
  {
    label: 'Sayuran',
    options: [
      { value: 'carrot', label: 'Wortel' },
      { value: 'broccoli', label: 'Brokoli' },
      { value: 'spinach', label: 'Bayam' },
    ],
  },
];

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

  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (value: any) => {
    setSelectedOption(value);
  };

  const onChange = (value: any) => {
    console.log('Selected Option:', selectedOption);
  };

  return (
    <section className="px-6 py-12 my-36">
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
          <Button
            variant="float-bottom-right"
            size="sm"
            width="w-10"
            height="h-10"
          >
            <PlusOutlined />
          </Button>
        </div>
        <Button
          onClick={handleOpenModal}
          variant="filled"
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
          submitText="Save"
          closeText="Cancel"
        />
        <Modal
          showModal={showModal}
          modalTitle="INI CERITANYA MODAL"
          onClose={handleCloseModal}
          submitText="Save"
          closeText="Cancel"
        />
        <div className="flex gap-2 w-auto">
          <UploadField
            className="flex flex-col gap-4"
            control={control}
            name="file"
            defaultImage=""
            previewImage="w-[500px] "
          />
        </div>
        <DraggableComponent control={control} name="draggableComponent" />
        <TabJalurSeleksi />
        <div className="w-1/2">
          <label className="font-bold text-start" htmlFor="">
            Pilih Keahlian:
          </label>
          <Select
            className="w-full border-slate-5"
            options={MultiOptions}
            value={selectedOption}
            onChange={handleChange}
            isClearable
            isSearchable
            isMulti={true}
          />
        </div>
        <Select options={options} onChange={onChange} isMulti={false} />
        <SelectField
          name="nama"
          label="Nama"
          size="md"
          options={['Rian', 'Dejan', 'Edo']}
          placeholder="Pilih Nama"
          control={control}
          width="w-36"
        />
        <Accordion title="Data diri pendaftar">TES</Accordion>
      </div>
    </section>
  );
};

export default LandingPage;
