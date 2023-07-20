'use client';
<<<<<<< HEAD
import { ReactElement, FC, useEffect, useMemo } from 'react';
=======
import {
  ReactElement,
  FC,
  useEffect,
  useMemo,
  useState,
  ChangeEvent,
} from 'react';
import Image from 'next/image';
>>>>>>> develop
import {
  Accordion,
  Button,
  RadioButton,
  SelectField,
  TextField,
  UploadField,
} from '@uninus/components';
import { useForm } from 'react-hook-form';
import { formBiodataOne, formBiodataThree, formBiodataTwo } from './store';
import { DashboardLayout } from '../../layouts';
import { useBiodataCreate, useBiodataGet, useBiodataUpdate } from './hook';

// import { TVSBiodata, VSBiodata } from './schema';

export const ModuleBiodata: FC = (): ReactElement => {
  const { data } = useBiodataGet();
  const student = useMemo(() => {
    return data;
  }, [data]);
  const { control, handleSubmit, reset } = useForm({
    mode: 'all',
    defaultValues: {
      avatar: student?.avatar,
      nim: student?.nim,
      email: student?.email,
      identification_type: student?.identification_type,
      identification_number: student?.identification_number,
      nisn: student?.nisn,
      phone_number: student?.phone_number,
      kk_number: student?.kk_number,
      birth_place: student?.birth_place,
      birth_date: student?.birth_date,
      EGender: student?.gender,
      EReligion: student?.EReligion,
      marital_status: student?.marital_status,
      ECitizenship: student?.citizenship,
      country: student?.country,
      province: student?.province,
      city: student?.city,
      subdistrict: student?.subdistrict,
      address: student?.address,
      rt: student?.rt,
      rw: student?.rw,
      postal_code: student?.postal_code,
      school_type: student?.school_type,
      school_major: student?.school_major,
      school_name: student?.school_name,
      school_address: student?.school_address,
      school_province: student?.school_province,
      school_city: student?.city,
      school_subdistrict: student?.school_subdistrict,
      school_postal_code: student?.school_postal_code,
      school_phone_number: student?.school_phone_number,
      graduation_year: student?.graduation_year,
      mother_name: student?.mother_name,
      father_name: student?.father_name,
      guardian_name: student?.guardian_name,
      parent_address: student?.parent_address,
      parent_rt: student?.parent_rt,
      parent_rw: student?.parent_rw,
      parent_postal_code: student?.parent_postal_code,
      parent_province: student?.parent_province,
      parent_phone_number: student?.parent_phone_number,
      parent_subdistrict: student?.subdistrict,
      father_education: student?.father_education,
      father_occupation: student?.father_occupation,
      father_income: student?.father_income,
      mother_education: student?.mother_education,
      mother_occupation: student?.mother_occupation,
      mother_income: student?.mother_income,
      guardian_education: student?.guardian_education,
      guardian_occupation: student?.guardian_occupation,
      guardian_income: student?.guardian_income,
      selection_type: student?.selection_type,
      program: student?.program,
      academic_year: student?.academic_year,
      registration_wave: student?.registration_wave,
    },
  });

  const { mutate: createBiodata } = useBiodataCreate();
  const { mutate: updateBiodata } = useBiodataUpdate();

  const [radioSelected, setRadioSelected] = useState<{
    EGender?: string;
    ECitizenship?: string;
  }>({
    EGender: '',
    ECitizenship: '',
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setRadioSelected({
      ...radioSelected,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
    console.log(data);
  };

  const onSubmit = handleSubmit((data) => {
    try {
      if (student?.identification_number) {
        updateBiodata(data);
      } else {
        createBiodata(data);
      }
    } catch (error) {
      console.log(error);
    }
    console.log('submit');
  });

  useEffect(() => {
    reset(student);
    setRadioSelected({
      EGender: student?.gender,
      ECitizenship: student?.citizenship,
    });
  }, [student, reset]);

  return (
    <DashboardLayout>
      <div className="p-5 lg:p-0 lg:py-4">
        <h1 className="text-slate-5">
          PMB <span className="text-secondary-green-4"> / Data diri</span>
        </h1>
        <p className="text-lg font-bold text-secondary-green-4">
          Pengisian data diri
        </p>
      </div>

      {/* Section Biodata */}
      <section className="flex flex-col shadow-md rounded-lg gap-6 w-full ">
        {/* Section Biodata diri pendaftar */}
        <section className="flex flex-col gap-8 px-8 py-10 w-full justify-center items-center rounded-lg bg-primary-white overflow-x-hidden">
          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-6 justify-center w-full items-center"
          >
            {/* Accordion data diri pendaftar */}
            {/* section form biodata diri pendaftar */}
            <Accordion
              title="Data diri pendaftar"
              className="w-full h-auto mt-[2rem] flex flex-col items-center lg:items-baseline lg:ml-[3vw] xl:ml-[5vw] gap-5"
            >
              {/* section upload avatar */}
              <div className="flex flex-col gap-7 ">
                <UploadField
                  className="grid grid-cols-1 lg:flex lg:items-center lg:gap-6 w-full justify-items-center h-full gap-y-6 lg:gap-y-0"
                  classNameField="w-70% lg:w-auto"
                  control={control}
                  name="avatar"
                  defaultImage="/illustrations/dummy-avatar.jpg"
                  previewImage="w-[150px] h-[150px] bg-cover object-cover rounded-full "
                />
              </div>

              <section className="grid grid-cols-1 lg:flex lg:justify-between lg:flex-wrap lg:gap-6 xl:gap-1 gap-y-4 mt-4 lg:items-center lg:w-55%">
                <TextField
                  name="nim"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="NIM"
                  inputWidth="w-70% lg:w-25% xl:w-20% text-base"
                  disabled
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
                    inputWidth="w-70% lg:w-25% xl:w-20%"
                    type={biodata.type}
                    control={control}
                    required
                  />
                ))}
              </section>
              <section className="grid grid-cols-1 lg:flex lg:justify-between lg:gap-6 xl:gap-1 gap-y-4 mt-4 lg:items-center lg:w-55%">
                <SelectField
                  name="birth_place"
                  label="Tempat Lahir"
                  size="sm"
                  placeholder="Kota tempat lahir"
                  status="none"
                  options={['Kota Bandung', 'Kota Jakarta', 'Kota Denpasar']}
                  width="w-70% lg:w-25% xl:w-20%"
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
              <section className="grid grid-cols-1 lg:flex lg:justify-between lg:gap-6 xl:gap-1 gap-y-4 mt-4 lg:items-center lg:w-55%">
                <div className="flex flex-col gap-2 xl:gap-4">
                  <h3 className="text-xs font-semibold">Jenis Kelamin</h3>
                  <div className="flex items-center gap-6">
                    <RadioButton
                      name="EGender"
                      label="Laki-laki"
                      control={control}
                      id="l"
                      onChange={handleChange}
                      value="MALE"
                      variant="primary"
                      required
                      isChecked={radioSelected?.EGender === 'MALE'}
                    />
                    <RadioButton
                      name="EGender"
                      label="Perempuan"
                      control={control}
                      id="p"
                      onChange={handleChange}
                      value="FEMALE"
                      variant="primary"
                      required
                      isChecked={radioSelected?.EGender === 'FEMALE'}
                    />
                  </div>
                </div>
                <SelectField
                  name="EReligion"
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
                  width="w-70% lg:w-15% xl:w-10%"
                  control={control}
                />
                <SelectField
                  name="marital_status"
                  label="Status"
                  size="sm"
                  placeholder="Status"
                  status="none"
                  options={['Menikah', 'Belum menikah']}
                  width="lg:w-15%"
                  control={control}
                />
              </section>

              <section className="grid grid-cols-1 lg:flex lg:justify-between lg:items-center mt-6 gap-y-4 lg:w-55%">
                <div className="flex flex-col gap-2 xl:gap-4">
                  <h3 className="text-xs font-semibold">Kewarganegaraan</h3>
                  <div className="flex items-center gap-6">
                    <RadioButton
                      name="ECitizenship"
                      label="WNI"
                      control={control}
                      id="wni"
                      onChange={handleChange}
                      inputname="kewarganegaraan"
                      value="WNI"
                      variant="primary"
                      required
                      isChecked={radioSelected?.ECitizenship === 'WNI'}
                    />
                    <RadioButton
                      name="ECitizenship"
                      label="WNA"
                      control={control}
                      id="wna"
                      onChange={handleChange}
                      inputname="kewarganegaraan"
                      value="WNA"
                      variant="primary"
                      required
                      isChecked={radioSelected?.ECitizenship === 'WNA'}
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
                  width="w-70% lg:w-20% xl:w-15%"
                  control={control}
                />
              </section>

              <section className="grid grid-cols-1 lg:flex lg:justify-between lg:items-center gap-y-4 mt-2 lg:mt-6 lg:w-55%">
                <SelectField
                  name="province"
                  label="Provinsi"
                  size="sm"
                  placeholder="Provinsi"
                  status="none"
                  options={['Jawa Barat', 'Jawa Tengah', 'Jawa Timur']}
                  width="w-70% lg:w-15% xl:w-15%"
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
                  width="w-70% lg:w-20% xl:w-15%"
                  control={control}
                />
                <SelectField
                  name="subdistrict"
                  label="Kecamatan"
                  size="sm"
                  placeholder="Kecamatan"
                  status="none"
                  options={['Sumur Bandung', 'Batununggal']}
                  width="w-70% lg:w-15%"
                  control={control}
                />
              </section>

              <section className="grid grid-cols-1 lg:flex lg:justify-between lg:items-center mt-2 gap-y-4 lg:mt-6 lg:w-55%">
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
                  className="bg-grayscale-2 h-20 rounded-lg text-xs resize-none w-70% lg:w-auto"
                />

                <div className="flex lg:w-30% xl:w-20% items-center justify-between lg:justify-evenly xl:justify-between">
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
              className="w-full h-auto mt-[2rem] flex flex-col gap-5 items-center lg:items-baseline lg:ml-[3vw] xl:ml-[5vw] pb-6 md:pb-0"
            >
              <section className="grid grid-cols-1 lg:flex lg:items-center gap-y-4 lg:justify-between lg:w-55%">
                <SelectField
                  name="school_type"
                  label="Jenis Pendidikan Asal"
                  size="sm"
                  placeholder="Jenis Pendidikan"
                  options={['SMA', 'SMK', 'MA']}
                  width="w-70% lg:w-20% xl:w-15%"
                  control={control}
                />
                <SelectField
                  name="school_major"
                  label="Jurusan Pendidikan Asal"
                  size="sm"
                  placeholder="Jurusan Pendidikan"
                  options={['Saintek', 'Soshum', 'Lainnya']}
                  width="w-70% lg:w-20% xl:w-15%"
                  control={control}
                />
              </section>

              <section className="grid grid-cols-1 lg:flex lg:items-center gap-y-4 lg:justify-between lg:w-55%">
                <TextField
                  name="school_name"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="Nama Instansi Pendidikan"
                  inputWidth="w-70% lg:w-20%"
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

              <section className="grid grid-cols-1 lg:flex lg:items-center gap-y-4 lg:justify-between lg:w-55%">
                <SelectField
                  name="school_province"
                  label="Provinsi"
                  size="sm"
                  placeholder="Provinsi"
                  status="none"
                  options={['Jawa Barat', 'Jawa Tengah', 'Jawa Timur']}
                  width="w-70% lg:w-15% xl:w-15%"
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
                  width="w-70% lg:w-20% xl:w-15%"
                  control={control}
                />
                <SelectField
                  name="school_subdistrict"
                  label="Kecamatan"
                  size="sm"
                  placeholder="Kecamatan"
                  status="none"
                  options={['Sumur Bandung', 'Batununggal']}
                  width="w-70% lg:w-15%"
                  control={control}
                />
              </section>

              <section className="grid grid-cols-1 lg:flex lg:items-center gap-y-4 lg:justify-between lg:w-55%">
                <TextField
                  name="school_postal_code"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="Kode Pos"
                  inputWidth="w-70% lg:w-15%"
                  control={control}
                  required
                />
                <TextField
                  name="school_phone_number"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="Kontak Instansi"
                  inputWidth="w-70% lg:w-15%"
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
                  width="w-70% lg:w-15%"
                  control={control}
                />
              </section>
            </Accordion>

            {/* Accordion data orang tua dan wali */}
            {/* section form orang tua/wali */}
            <Accordion
              title="Data Orang tua dan wali"
              className="w-full h-auto mt-[2rem] flex flex-col gap-5 items-center lg:items-baseline lg:ml-[3vw] xl:ml-[5vw]"
            >
              <section className="grid grid-cols-1 lg:flex lg:justify-between lg:flex-wrap lg:gap-6 xl:gap-1 gap-y-4 mt-4 lg:items-center lg:w-55%">
                <TextField
                  name="father_name"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="Nama Ayah Kandung"
                  inputWidth="w-70% lg:w-25% max-w-20% xl:w-20%"
                  control={control}
                  required
                />
                <TextField
                  name="mother_name"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="Nama Ibu Kandung"
                  inputWidth="w-70% lg:w-25% max-w-20% xl:w-20%"
                  control={control}
                  required
                />

                <div className="w-70% w-25% xl:w-20%">
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

                <div className="flex lg:w-30% xl:w-20% items-center justify-between lg:justify-evenly xl:justify-between">
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

              <section className="grid grid-cols-1 lg:flex lg:items-center gap-y-4 lg:justify-between lg:w-55%">
                <SelectField
                  name="parent_province"
                  label="Provinsi"
                  size="sm"
                  placeholder="Pilih Provinsi"
                  status="none"
                  options={['Jawa Barat', 'Jawa Tengah', 'Jawa Timur']}
                  width="w-70% lg:w-15% xl:w-15%"
                  control={control}
                />
                <SelectField
                  name="parent_subdistrict"
                  label="Kecamatan"
                  size="sm"
                  placeholder="Pilih Kecamatan"
                  status="none"
                  options={['Sumur Bandung', 'Batununggal']}
                  width="w-70% lg:w-15%"
                  control={control}
                />
              </section>

              <section className="grid grid-cols-1 lg:flex lg:flex-wrap lg:items-center gap-y-4 lg:justify-between mt-4 lg:w-55%">
                <TextField
                  name="father_education"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="Pendidikan Ayah"
                  inputWidth="w-70% lg:w-25% max-w-20% xl:w-20%"
                  control={control}
                  required
                />
                <TextField
                  name="father_occupation"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="Pekerjaan Ayah"
                  inputWidth="w-70% lg:w-25% max-w-20% xl:w-20%"
                  control={control}
                  required
                />
                <TextField
                  name="father_income"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="Pendapatan Ayah"
                  inputWidth="w-70% lg:w-25% max-w-20% xl:w-20%"
                  control={control}
                  required
                />
              </section>

              <section className="grid grid-cols-1 lg:flex lg:flex-wrap lg:items-center gap-y-4 lg:justify-between mt-4 lg:w-55%">
                <TextField
                  name="mother_education"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="Pendidikan Ibu"
                  inputWidth="w-70%  lg:w-25% max-w-20% xl:w-20%"
                  control={control}
                  required
                />
                <TextField
                  name="mother_occupation"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="Pekerjaan Ibu"
                  inputWidth="w-70% lg:w-25% max-w-20% xl:w-20%"
                  control={control}
                  required
                />
                <TextField
                  name="mother_income"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="Pendapatan Ibu"
                  inputWidth="w-70% lg:w-25% max-w-20% xl:w-20%"
                  control={control}
                  required
                />
              </section>

              <section className="grid grid-cols-1 lg:flex lg:flex-wrap lg:items-center gap-y-4 lg:justify-between mt-4 lg:w-55%">
                <TextField
                  name="guardian_education"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="Pendidikan Wali"
                  inputWidth="w-70% lg:w-25% max-w-20% xl:w-20%"
                  control={control}
                />
                <TextField
                  name="guardian_occupation"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="Pekerjaan Wali"
                  inputWidth="w-70% lg:w-25% max-w-20% xl:w-20%"
                  control={control}
                />
                <TextField
                  name="guardian_income"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="Pendapatan Wali"
                  inputWidth="w-70% lg:w-25% max-w-20% xl:w-20%"
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
