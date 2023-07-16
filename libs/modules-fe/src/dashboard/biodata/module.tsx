'use client';
import { ReactElement, FC, useEffect, useMemo } from 'react';
import Image from 'next/image';
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

  const { control, handleSubmit, setValue } = useForm({
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
      gender: student?.gender,
      religion: student?.religion,
      marital_status: student?.marital_status,
      citizenship: student?.citizenship,
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
  });

  useEffect(() => {
    setValue('avatar', student?.avatar);
    setValue('nim', student?.nim);
    setValue('email', student?.email);
    setValue('identification_type', student?.identification_type);
    setValue('identification_number', student?.identification_number);
    setValue('nisn', student?.nisn);
    setValue('phone_number', student?.phone_number);
    setValue('kk_number', student?.kk_number);
    setValue('birth_place', student?.birth_place);
    setValue('birth_date', student?.birth_date);
    setValue('gender', student?.gender);
    setValue('religion', student?.religion);
    setValue('marital_status', student?.marital_status);
    setValue('citizenship', student?.citizenship);
    setValue('country', student?.country);
    setValue('province', student?.province);
    setValue('city', student?.city);
    setValue('subdistrict', student?.subdistrict);
    setValue('address', student?.address);
    setValue('rt', student?.rt);
    setValue('rw', student?.rw);
    setValue('postal_code', student?.postal_code);
    setValue('school_type', student?.school_type);
    setValue('school_major', student?.school_major);
    setValue('school_name', student?.school_name);
    setValue('school_address', student?.school_address);
    setValue('school_province', student?.school_province);
    setValue('school_city', student?.city);
    setValue('school_subdistrict', student?.school_subdistrict);
    setValue('school_postal_code', student?.school_postal_code);
    setValue('school_phone_number', student?.school_phone_number);
    setValue('graduation_year', student?.graduation_year);
    setValue('mother_name', student?.mother_name);
    setValue('father_name', student?.father_name);
    setValue('guardian_name', student?.guardian_name);
    setValue('parent_address', student?.parent_address);
    setValue('parent_rt', student?.parent_rt);
    setValue('parent_rw', student?.parent_rw);
    setValue('parent_postal_code', student?.parent_postal_code);
    setValue('parent_province', student?.parent_province);
    setValue('parent_phone_number', student?.parent_phone_number);
    setValue('parent_subdistrict', student?.subdistrict);
    setValue('father_education', student?.father_education);
    setValue('father_occupation', student?.father_occupation);
    setValue('father_income', student?.father_income);
    setValue('mother_education', student?.mother_education);
    setValue('mother_occupation', student?.mother_occupation);
    setValue('mother_income', student?.mother_income);
    setValue('guardian_education', student?.guardian_education);
    setValue('guardian_occupation', student?.guardian_occupation);
    setValue('guardian_income', student?.guardian_income);
    setValue('selection_type', student?.selection_type);
    setValue('program', student?.program);
    setValue('academic_year', student?.academic_year);
    setValue('registration_wave', student?.registration_wave);
  }, [student, setValue]);

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
                  label="NIM"
                  inputWidth="lg:w-25% xl:w-20% text-base"
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
                      isChecked={student?.gender === 'MALE' ? true : false}
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
                      isChecked={student?.gender === 'FEMALE' ? true : false}
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
                      isChecked={student?.citizenship === 'WNI' ? true : false}
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
                      isChecked={student?.citizenship === 'WNA' ? true : false}
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
                  options={['SMA', 'SMK', 'MA']}
                  width="lg:w-20% xl:w-15%"
                  control={control}
                />
                <SelectField
                  name="school_major"
                  label="Jurusan Pendidikan Asal"
                  size="sm"
                  placeholder="Jurusan Pendidikan"
                  options={['Saintek', 'Soshum', 'Lainnya']}
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
                  placeholder="Pilih Provinsi"
                  status="none"
                  options={['Jawa Barat', 'Jawa Tengah', 'Jawa Timur']}
                  width="lg:w-15% xl:w-15%"
                  control={control}
                />
                <SelectField
                  name="parent_subdistrict"
                  label="Kecamatan"
                  size="sm"
                  placeholder="Pilih Kecamatan"
                  status="none"
                  options={['Sumur Bandung', 'Batununggal']}
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
