'use client';
import { ReactElement, FC } from 'react';
import Image from 'next/image';
import {
  Accordion,
  Button,
  RadioButton,
  SelectField,
  TextField,
  UploadField,
  DraggableComponent,
} from '@uninus/components';
import { useForm } from 'react-hook-form';
import { TTextFieldOne, TTextFieldThree, TTextFieldTwo } from './type';
import { DashboardLayout } from '../../layouts';
import { useBiodataCreate } from './hook';

// import { TVSBiodata, VSBiodata } from './schema';

export const ModuleBiodata: FC = (): ReactElement => {
  const { control, handleSubmit } = useForm({
    mode: 'all',
    defaultValues: {
      avatar: undefined,
      nim: '123213213',
      email: '132131',
      identification_type: 'KTP',
      identification_number: '213123123',
      nisn: '123123123',
      phone_number: '12312312',
      kk_number: 'asdsa',
      birth_place: '',
      birth_date: '',
      gender: '',
      religion: '',
      marital_status: '',
      citizenship: '',
      country: '',
      province: '',
      city: '',
      subdistrict: '',
      address: '',
      rt: '002',
      rw: '005',
      postal_code: '32423',
      school_type: '',
      school_major: '',
      school_name: '',
      school_address: '',
      school_province: '',
      school_city: '',
      school_subdistrict: '',
      school_postal_code: '',
      school_phone_number: '',
      graduation_year: '',
      mother_name: '',
      father_name: '',
      guardian_name: 'Rian',
      parent_address: '',
      parent_rt: '',
      parent_rw: '',
      parent_postal_code: '',
      parent_province: '',
      parent_phone_number: '651564846',
      parent_subdistrict: '',
      father_education: '',
      father_occupation: '',
      father_income: '',
      mother_education: '',
      mother_occupation: '',
      mother_income: '',
      guardian_education: undefined,
      guardian_occupation: undefined,
      guardian_income: undefined,
      selection_type: 'JSPA',
      program: 'KIP',
      academic_year: '2023',
      registration_wave: '5',
    },
  });

  const { mutate: createBiodata } = useBiodataCreate();

  const onSubmit = handleSubmit((data) => {
    try {
      createBiodata(data);
    } catch (error) {
      console.log(error);
    }
  });

  const formBiodataOne: TTextFieldOne[] = [
    {
      name: 'email',
      item: 'Email',
      type: 'text',
    },
    {
      name: 'identification_number',
      item: 'Nomor Kartu Identitas',
      type: 'text',
    },
    {
      name: 'nisn',
      item: 'Nomor Induk Siswa Nasional',
      type: 'text',
    },
    {
      name: 'phone_number',
      item: 'Nomor Handphone/WA',
      type: 'text',
    },
  ];

  const formBiodataTwo: TTextFieldTwo[] = [
    {
      name: 'rt',
      item: 'RT',
      type: 'text',
    },
    {
      name: 'rw',
      item: 'RW',
      type: 'text',
    },
  ];

  const formBiodataThree: TTextFieldThree[] = [
    {
      name: 'parent_rt',
      item: 'RT',
      type: 'text',
    },
    {
      name: 'parent_rw',
      item: 'RW',
      type: 'text',
    },
  ];

  return (
    <DashboardLayout>
      <h1 className="text-slate-5">
        PMB <span className="text-secondary-green-4"> / Data diri</span>
      </h1>
      <p className="text-lg font-bold text-secondary-green-4">
        Pengisian data diri
      </p>
      {/* Section Biodata */}
      <section className="flex flex-col gap-6 h-screen">
        {/* Section Biodata diri pendaftar */}
        <section className="flex flex-col gap-8 px-8 py-10 w-full h-full rounded-lg bg-primary-white overflow-y-auto ">
          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            {/* Accordion data diri pendaftar */}
            {/* section form biodata diri pendaftar */}
            <Accordion
              title="Data diri pendaftar"
              className="w-full h-auto pl-[5rem] mt-[2rem] flex flex-col gap-5"
            >
              <div className="flex flex-col gap-7 ">
                <div className="flex items-center gap-14">
                  <figure className="w-fit rounded-full relative overflow-hidden ">
                    <Image
                      src={'/illustrations/foto-cewe.png'}
                      alt="profil"
                      width={200}
                      height={200}
                      quality={100}
                      priority
                      className="inline h-full scale-110 top-2 left-2 relative"
                    />
                  </figure>
                  <UploadField />
                </div>
              </div>
              <section className="grid grid-cols-2 gap-4">
                <TextField
                  name="nim"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="Nama lengkap"
                  inputWidth="lg:w-25% xl:w-20% text-base"
                  control={control}
                  required
                />
                {formBiodataOne.map((biodata, idx) => (
                  <TextField
                    key={idx}
                    name={biodata.name}
                    label={biodata.item}
                    labelclassname="text-xl font-semibold"
                    variant="sm"
                    inputWidth="lg:w-25% xl:w-20%"
                    type={biodata.type}
                    control={control}
                    required
                  />
                ))}
              </section>
              <section className="grid grid-cols-2 gap-4 mt-2">
                <SelectField
                  name="birth_place"
                  label="Tempat Lahir"
                  size="sm"
                  placeholder="Kota tempat lahir"
                  status="none"
                  options={['Kota Bandung', 'Kota Jakarta', 'Kota Denpasar']}
                  value="Tempat Lahir"
                  width="lg:w-25% xl:w-20%"
                  control={control}
                  required
                />
                <TextField
                  name="birth_date"
                  variant="sm"
                  type="date"
                  labelclassname="text-xl font-semibold"
                  label="Tanggal Lahir"
                  inputWidth="lg:w-25% xl:w-20%"
                  control={control}
                  required
                />
              </section>
              <section className="flex justify-between lg:gap-6 xl:gap-1 mt-4 items-center w-55%">
                <div className="flex flex-col lg:gap-2 xl:gap-4">
                  <h3 className="text-xs font-semibold">Jenis Kelamin</h3>
                  <div className="flex items-center gap-6">
                    <RadioButton
                      name="gender"
                      label="Laki-laki"
                      control={control}
                      id="l"
                      inputname="jk"
                      value="MALE"
                      variant="primary"
                      required
                    />
                    <RadioButton
                      name="gender"
                      label="Perempuan"
                      control={control}
                      id="p"
                      inputname="jk"
                      value="FEMALE"
                      variant="primary"
                      required
                    />
                  </div>
                </div>
                <SelectField
                  name="religion"
                  label="Agama"
                  size="sm"
                  placeholder="Agama"
                  status="none"
                  options={[
                    'ISLAM',
                    'KRISTEN',
                    'KATOLIK',
                    'KONGHUCU',
                    'HINDU',
                    'BUDDHA',
                  ]}
                  value="Agama"
                  width="lg:w-15% xl:w-10%"
                  control={control}
                />
                <SelectField
                  name="marital_status"
                  label="Status"
                  size="sm"
                  placeholder="Status"
                  status="none"
                  options={['Menikah', 'Belum menikah']}
                  value="Status Menikah"
                  width="lg:w-20% xl:w-15%"
                  control={control}
                />
              </section>

              <section className="flex justify-between items-center mt-6 w-55%">
                <div className="flex flex-col lg:gap-2 xl:gap-4">
                  <h3 className="text-xs font-semibold">Kewarganegaraan</h3>
                  <div className="flex items-center gap-6">
                    <RadioButton
                      name="citizenship"
                      label="WNI"
                      control={control}
                      id="wni"
                      inputname="kewarganegaraan"
                      value="WNI"
                      variant="primary"
                      required
                    />
                    <RadioButton
                      name="citizenship"
                      label="WNA"
                      control={control}
                      id="wna"
                      inputname="kewarganegaraan"
                      value="WNA"
                      variant="primary"
                      required
                    />
                  </div>
                </div>
                <SelectField
                  name="country"
                  label="Asal Negara"
                  size="sm"
                  placeholder="Asal Negara"
                  status="none"
                  options={['Indonesia', 'Malaysia', 'Singapura', 'Kamboja']}
                  value="Asal Negara"
                  width="lg:w-20% xl:w-15%"
                  control={control}
                />
              </section>

              <section className="flex justify-between items-center mt-6 w-55%">
                <SelectField
                  name="province"
                  label="Provinsi"
                  size="sm"
                  placeholder="Provinsi"
                  status="none"
                  options={['Jawa Barat', 'Jawa Tengah', 'Jawa Timur']}
                  value="Provinsi"
                  width="lg:w-15% xl:w-15%"
                  control={control}
                />
                <SelectField
                  name="city"
                  label="Kota/Kabupaten"
                  size="sm"
                  placeholder="Kota/Kabupaten"
                  status="none"
                  options={[
                    'Kota Medan',
                    'Kabupaten Bandung',
                    'Kota Jakarta',
                    'Kota Bandung',
                  ]}
                  value="Kota/Kabupaten"
                  width="lg:w-20% xl:w-15%"
                  control={control}
                />
                <SelectField
                  name="subdistrict"
                  label="Kecamatan"
                  size="sm"
                  placeholder="Kecamatan"
                  status="none"
                  options={['Sumur Bandung', 'Batununggal']}
                  value="Kecamatan"
                  width="w-15%"
                  control={control}
                />
              </section>

              <section className="flex justify-between items-center mt-6 w-55%">
                <TextField
                  name="address"
                  variant="sm"
                  type="text"
                  labelclassname="text-xl font-semibold"
                  label="Alamat"
                  control={control}
                  required
                  isTextArea
                  textAreaRow={5}
                  textAreaCols={30}
                  className="bg-grayscale-2 h-20 rounded-lg text-xs resize-none"
                />

                <div className="flex lg:w-30% xl:w-20% items-center lg:justify-evenly xl:justify-between">
                  {formBiodataTwo.map((biodata, idx) => (
                    <TextField
                      key={idx}
                      name={biodata.name}
                      variant="md"
                      type={biodata.type}
                      labelclassname="text-base font-semibold"
                      label={biodata.item}
                      inputWidth="w-14 text-base"
                      control={control}
                      maxlenght={3}
                      required
                    />
                  ))}
                  <TextField
                    name="postal_code"
                    variant="md"
                    type="text"
                    labelclassname="text-sm font-semibold"
                    label="Kode Pos"
                    inputWidth="w-20 text-base"
                    control={control}
                    required
                    maxlenght={6}
                  />
                </div>
              </section>
            </Accordion>

            {/* Accordion Data Pndidikan */}
            {/* section form data pendidikan */}
            <Accordion
              title="Data Pendidikan"
              className="w-full h-auto pl-[5rem] mt-[2rem] flex flex-col gap-5"
            >
              <section className="flex items-center justify-between lg:w-55%">
                <SelectField
                  name="school_type"
                  label="Jenis Pendidikan Asal"
                  size="sm"
                  placeholder="Jenis Pendidikan"
                  status="none"
                  options={['SMA', 'SMK', 'MA']}
                  value="Pendidikan Asal"
                  width="lg:w-20% xl:w-15%"
                  control={control}
                />
                <SelectField
                  name="school_major"
                  label="Jurusan Pendidikan Asal"
                  size="sm"
                  placeholder="Jurusan Pendidikan"
                  status="none"
                  options={['Saintek', 'Soshum', 'Lainnya']}
                  value="Jurusan Asal"
                  width="lg:w-20% xl:w-15%"
                  control={control}
                />
              </section>

              <section className="flex justify-between lg:w-full xl:w-55%">
                <TextField
                  name="school_name"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="Nama Instansi Pendidikan"
                  inputWidth="w-20%"
                  control={control}
                  required
                />
                <TextField
                  name="school_address"
                  variant="sm"
                  type="text"
                  labelclassname="text-xl font-semibold"
                  label="Alamat Instansi Pendidikan"
                  control={control}
                  required
                  isTextArea
                  textAreaRow={5}
                  textAreaCols={30}
                  className="bg-grayscale-2 h-20 rounded-lg text-xs resize-none"
                />
              </section>

              <section className="flex justify-between items-center mt-6 w-55%">
                <SelectField
                  name="school_province"
                  label="Provinsi"
                  size="sm"
                  placeholder="Provinsi"
                  status="none"
                  options={['Jawa Barat', 'Jawa Tengah', 'Jawa Timur']}
                  value="Provinsi Instansi"
                  width="lg:w-15% xl:w-15%"
                  control={control}
                />
                <SelectField
                  name="school_city"
                  label="Kota/Kabupaten"
                  size="sm"
                  placeholder="Kota/Kabupaten"
                  status="none"
                  options={[
                    'Kota Medan',
                    'Kabupaten Bandung',
                    'Kota Jakarta',
                    'Kota Bandung',
                  ]}
                  value="Kota/Kabupaten Instansi"
                  width="lg:w-20% xl:w-15%"
                  control={control}
                />
                <SelectField
                  name="school_subdistrict"
                  label="Kecamatan"
                  size="sm"
                  placeholder="Kecamatan"
                  status="none"
                  options={['Sumur Bandung', 'Batununggal']}
                  value="Kecamatan Instansi"
                  width="w-15%"
                  control={control}
                />
              </section>

              <section className="flex justify-between gap-12 mt-6 w-55%">
                <TextField
                  name="school_postal_code"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="Kode Pos"
                  inputWidth="w-15%"
                  control={control}
                  required
                />
                <TextField
                  name="school_phone_number"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="Kontak Instansi"
                  inputWidth="w-15%"
                  control={control}
                  required
                />
                <SelectField
                  name="graduation_year"
                  label="Tahun Lulus"
                  size="sm"
                  placeholder="Tahun lulus"
                  status="none"
                  options={['2023', '2022']}
                  value="Tahun Lulus"
                  width="w-15%"
                  control={control}
                />
              </section>
            </Accordion>

            {/* Accordion data orang tua dan wali */}
            {/* section form orang tua/wali */}
            <Accordion
              title="Data Orang tua dan wali"
              className="w-full h-auto pl-[5rem] mt-[2rem] flex flex-col gap-5"
            >
              <section className="grid grid-cols-2 gap-6 lg:w-full w-55% items-center ">
                <TextField
                  name="father_name"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="Nama Ayah Kandung"
                  inputWidth="lg:w-25% max-w-20% xl:w-20%"
                  control={control}
                  required
                />
                <TextField
                  name="mother_name"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="Nama Ibu Kandung"
                  inputWidth="lg:w-25% max-w-20% xl:w-20%"
                  control={control}
                  required
                />

                <div className="w-25% xl:w-20%">
                  <TextField
                    name="parent_address"
                    variant="sm"
                    type="text"
                    labelclassname="text-xl font-semibold"
                    label="Alamat Orang Tua"
                    control={control}
                    required
                    isTextArea
                    textAreaRow={5}
                    textAreaCols={30}
                    className="bg-grayscale-2 h-20 rounded-lg text-xs resize-none"
                  />
                </div>

                <div className="flex lg:w-30% xl:w-20% items-center lg:justify-evenly xl:justify-between">
                  {formBiodataThree.map((biodata, idx) => (
                    <TextField
                      key={idx}
                      name={biodata.name}
                      variant="md"
                      type={biodata.type}
                      labelclassname="text-base font-semibold"
                      label={biodata.item}
                      inputWidth="w-14 text-base"
                      control={control}
                      maxlenght={3}
                      required
                    />
                  ))}
                  <TextField
                    name="parent_postal_code"
                    variant="md"
                    type="text"
                    labelclassname="text-sm font-semibold"
                    label="Kode Pos"
                    inputWidth="w-20 text-base"
                    control={control}
                    required
                    maxlenght={6}
                  />
                </div>
              </section>

              <section className="flex justify-between items-center mt-6 w-55% mb-2">
                <SelectField
                  name="parent_province"
                  label="Provinsi"
                  size="sm"
                  placeholder="Provinsi"
                  status="none"
                  options={['Jawa Barat', 'Jawa Tengah', 'Jawa Timur']}
                  value="Provinsi Ortu"
                  width="lg:w-15% xl:w-15%"
                  control={control}
                />
                <SelectField
                  name="parent_subdistrict"
                  label="Kecamatan"
                  size="sm"
                  placeholder="Kecamatan"
                  status="none"
                  options={['Sumur Bandung', 'Batununggal']}
                  value="Kecamatan Ortu"
                  width="w-15%"
                  control={control}
                />
              </section>

              <section className="grid grid-cols-2 xl:w-full lg:w-55% gap-4 items-center mt-8 ">
                <TextField
                  name="father_education"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="Pendidikan Ayah"
                  inputWidth="lg:w-25% max-w-20% xl:w-20%"
                  control={control}
                  required
                />
                <TextField
                  name="father_occupation"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="Pekerjaan Ayah"
                  inputWidth="lg:w-25% max-w-20% xl:w-20%"
                  control={control}
                  required
                />
                <TextField
                  name="father_income"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="Pendapatan Ayah"
                  inputWidth="lg:w-25% max-w-20% xl:w-20%"
                  control={control}
                  required
                />
              </section>

              <section className="grid grid-cols-2 xl:w-full lg:w-55% gap-4 items-center mt-6 ">
                <TextField
                  name="mother_education"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="Pendidikan Ibu"
                  inputWidth="lg:w-25% max-w-20% xl:w-20%"
                  control={control}
                  required
                />
                <TextField
                  name="mother_occupation"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="Pekerjaan Ibu"
                  inputWidth="lg:w-25% max-w-20% xl:w-20%"
                  control={control}
                  required
                />
                <TextField
                  name="mother_income"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="Pendapatan Ibu"
                  inputWidth="lg:w-25% max-w-20% xl:w-20%"
                  control={control}
                  required
                />
              </section>

              <section className="grid grid-cols-2 xl:w-full lg:w-55% gap-4 items-center mt-6 ">
                <TextField
                  name="guardian_education"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="Pendidikan Wali"
                  inputWidth="lg:w-25% max-w-20% xl:w-20%"
                  control={control}
                />
                <TextField
                  name="guardian_occupation"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="Pekerjaan Wali"
                  inputWidth="lg:w-25% max-w-20% xl:w-20%"
                  control={control}
                />
                <TextField
                  name="guardian_income"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="Pendapatan Wali"
                  inputWidth="lg:w-25% max-w-20% xl:w-20%"
                  control={control}
                />
              </section>
            </Accordion>

            <Button
              variant="filled"
              size="md"
              width="lg:w-25% xl:w-15%"
              styling="mt-4"
            >
              Submit
            </Button>
          </form>
        </section>
      </section>
    </DashboardLayout>
  );
};
