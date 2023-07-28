'use client';
import {
  ReactElement,
  FC,
  useEffect,
  useMemo,
  useState,
  ChangeEvent,
} from 'react';
import {
  Accordion,
  Button,
  RadioButton,
  SelectField,
  TextField,
  UploadField,
  CheckBox,
} from '@uninus/components';
import { useForm } from 'react-hook-form';
import { formBiodataOne, defaultValuesBiodata } from './store';
import { DashboardLayout } from '../../layouts';
import { AiTwotoneEdit } from 'react-icons/ai';

import { useBiodataCreate, useBiodataGet, useBiodataUpdate } from './hooks';

// import { TVSBiodata, VSBiodata } from './schema';

export const ModuleBiodata: FC = (): ReactElement => {
  const { data } = useBiodataGet();
  const student = useMemo(() => {
    return data;
  }, [data]);

  const { control, handleSubmit, reset } = useForm({
    mode: 'all',
    defaultValues: { ...defaultValuesBiodata },
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
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    reset(student);

    setRadioSelected({
      EGender: student?.EGender,
      ECitizenship: student?.ECitizenship,
    });
  }, [reset, student]);

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center lg:items-start p-5 lg:p-0 lg:py-4">
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
              {/* section upload image */}

              <div className="flex flex-col gap-7 ">
                <UploadField
                  className="grid grid-cols-1 lg:flex lg:items-center lg:gap-6 w-full justify-items-center h-full gap-y-6 lg:gap-y-0"
                  classNameField="w-70% lg:w-auto"
                  control={control}
                  name="image"
                  defaultImage="/illustrations/dummy-avatar.webp"
                  previewImage="w-[150px] h-[150px] bg-cover object-cover rounded-full "
                  preview={true}
                />
              </div>

              <section className="grid grid-cols-1 lg:flex  lg:justify-between lg:flex-wrap lg:gap-2 xl:gap-1 gap-y-4 mt-4 lg:items-center lg:w-55% md:flex md:flex-wrap md:items-center md:justify-between md:w-[70vw]">
                {formBiodataOne.map((biodata, idx) => (
                  <TextField
                    key={idx}
                    placeholder={biodata.placeholder}
                    name={biodata.name}
                    label={biodata.item}
                    labelclassname="text-xl font-semibold"
                    variant="sm"
                    required
                    inputWidth="w-70% lg:w-[17vw] xl:w-[15vw] md:w-[21vw]"
                    inputHeight="h-10"
                    type={biodata.type}
                    control={control}
                  />
                ))}
                <TextField
                  name="email"
                  variant="sm"
                  type="email"
                  placeholder="email@gmail.com"
                  labelclassname="text-sm font-semibold"
                  label="Email"
                  required
                  inputWidth="w-70% lg:w-[17vw] xl:w-[20vw] text-base md:w-[21vw]"
                  inputHeight="h-10"
                  control={control}
                  disabled
                />
                <TextField
                  inputHeight="h-10"
                  name="nik"
                  variant="sm"
                  required
                  type="text"
                  placeholder="Nomor dapat dilihat dari KK atau KTP"
                  labelclassname="text-sm font-semibold"
                  label="NIK"
                  inputWidth="w-70% lg:w-[27vw] xl:w-[25vw] text-base md:w-[33vw] "
                  control={control}
                />
                <TextField
                  inputHeight="h-10"
                  name="nisn"
                  variant="sm"
                  type="text"
                  placeholder="Nomor Induk Siswa Nasional"
                  required
                  labelclassname="text-sm font-semibold"
                  label="NISN"
                  inputWidth="w-70% lg:w-[27vw] xl:w-[25vw] text-base md:w-[33vw]"
                  control={control}
                />
              </section>
              <section className="grid grid-cols-1 lg:flex lg:justify-between lg:gap-6 xl:gap-1 gap-y-4 mt-4 lg:items-center lg:w-55% md:flex xl:flex xl:justify-between md:flex-wrap md:w-[70vw] md:justify-between">
                <div className="flex flex-col gap-2 xl:gap-4">
                  <h3 className="text-xs font-semibold">Jenis Kelamin</h3>
                  <div className="flex items-center gap-6">
                    <RadioButton
                      name="EGender"
                      label="Laki-laki"
                      control={control}
                      id="l"
                      size="lg"
                      required
                      onChange={handleChange}
                      value="MALE"
                      variant="primary"
                      isChecked={radioSelected?.EGender === 'MALE'}
                    />
                    <RadioButton
                      name="EGender"
                      label="Perempuan"
                      control={control}
                      id="p"
                      size="lg"
                      onChange={handleChange}
                      value="FEMALE"
                      required
                      variant="primary"
                      isChecked={radioSelected?.EGender === 'FEMALE'}
                    />
                  </div>
                </div>
                <SelectField
                  name="EReligion"
                  label="Agama"
                  size="sm"
                  placeholder="Agama"
                  required
                  options={[
                    'ISLAM',
                    'KRISTEN',
                    'KATOLIK',
                    'KONGHUCU',
                    'HINDU',
                    'BUDDHA',
                  ]}
                  width="w-70% lg:w-[27vw] xl:w-[25vw] md:w-[33vw]"
                  control={control}
                />
              </section>

              <section className="grid grid-cols-1 lg:flex lg:justify-between lg:items-center gap-y-4 mt-2 lg:mt-6 lg:w-55% md:w-[70vw] md:flex md:flex-wrap md:justify-between">
                <SelectField
                  name="birth_place"
                  label="Tempat Lahir"
                  size="sm"
                  placeholder="Kota tempat lahir"
                  required
                  options={['Kota Bandung', 'Kota Jakarta', 'Kota Denpasar']}
                  width="w-70% lg:w-[27vw] xl:w-[25vw] md:w-[33vw]"
                  control={control}
                />
                <TextField
                  inputHeight="h-10"
                  name="birth_date"
                  variant="sm"
                  type="date"
                  labelclassname="text-xl font-semibold"
                  label="Tanggal Lahir"
                  required
                  inputWidth="lg:w-[27vw] xl:w-[25vw] md:w-[33vw] w-[70vw]"
                  control={control}
                />
              </section>

              <section className="flex flex-wrap justify-start w-70% items-center lg:flex lg:justify-start lg:gap-x-3 lg:items-center  gap-y-4 lg:w-55% md:w-[70vw] md:flex md:flex-wrap md:justify-start md:gap-x-8 xl:flex xl:flex-wrap xl:justify-between xl:gap-x-8">
                <div className="mr-2">
                  <SelectField
                    name="marital_status"
                    required
                    label="Status"
                    size="sm"
                    placeholder="Status"
                    options={['Menikah', 'Belum menikah']}
                    width="lg:w-[27vw] xl:w-[25vw] md:w-[33vw] w-[35vw] "
                    control={control}
                  />
                </div>
                <div className="flex flex-col gap-1 xl:gap-2 mt-1 xl:ml-0 xl:self-start xl:w-[25vw] place-self-start">
                  {' '}
                  <h3 className="text-xs font-semibold">Kewarganegaraan</h3>
                  <div className="flex items-center gap-2">
                    <RadioButton
                      name="ECitizenship"
                      label="WNI"
                      control={control}
                      required
                      id="wni"
                      onChange={handleChange}
                      inputname="kewarganegaraan"
                      value="WNI"
                      variant="primary"
                      isChecked={radioSelected?.ECitizenship === 'WNI'}
                    />
                    <RadioButton
                      name="ECitizenship"
                      label="WNA"
                      control={control}
                      id="wna"
                      onChange={handleChange}
                      inputname="kewarganegaraan"
                      required
                      value="WNA"
                      variant="primary"
                      isChecked={radioSelected?.ECitizenship === 'WNA'}
                    />
                  </div>
                </div>
              </section>

              <section className="flex flex-wrap w-full gap-x-1 justify-center items-center lg:flex lg:justify-between lg:items-center gap-y-4 mt-2 lg:mt-6 lg:w-55% md:w-[70vw] md:flex md:flex-wrap md:justify-between">
                <SelectField
                  name="country"
                  label="Asal Negara"
                  size="sm"
                  required
                  placeholder="Asal Negara"
                  options={['Indonesia', 'Malaysia', 'Singapura', 'Kamboja']}
                  width="w-[35vw] lg:w-[27vw] xl:w-[25vw] md:w-[33vw]"
                  control={control}
                />
                <SelectField
                  name="province"
                  label="Provinsi"
                  size="sm"
                  required
                  placeholder="Provinsi"
                  options={['Jawa Barat', 'Jawa Tengah', 'Jawa Timur']}
                  width="w-[35vw] lg:w-[27vw] xl:w-[25vw] md:w-[33vw]"
                  control={control}
                />
              </section>
              <section className="flex flex-wrap w-full gap-x-1 justify-center items-center  lg:flex lg:justify-between lg:items-center gap-y-4 mt-2 lg:mt-6 lg:w-55% md:w-[70vw] md:flex md:flex-wrap md:justify-between">
                <SelectField
                  name="city"
                  label="Kota/Kabupaten"
                  required
                  size="sm"
                  placeholder="Kota/Kabupaten"
                  options={[
                    'Kota Medan',
                    'Kabupaten Bandung',
                    'Kota Jakarta',
                    'Kota Bandung',
                  ]}
                  width="w-[35vw] lg:w-[27vw] xl:w-[25vw] md:w-[33vw]"
                  control={control}
                />
                <SelectField
                  name="subdistrict"
                  label="Kecamatan"
                  size="sm"
                  required
                  placeholder="Kecamatan"
                  options={['Sumur Bandung', 'Batununggal']}
                  width="w-[35vw] lg:w-[27vw] md:w-[33vw] xl:w-[25vw]"
                  control={control}
                />
              </section>

              <section className="grid grid-cols-3 w-[70vw] gap-x-1 justify-between items-start  lg:flex lg:justify-between lg:items-start mt-2 gap-y-4 lg:mt-6 lg:w-55% md:flex md:flex-wrap md:w-[70vw] md:justify-between">
                <div className="col-span-3">
                  <TextField
                    name="address"
                    variant="sm"
                    type="text"
                    labelclassname="text-xl font-semibold"
                    label="Alamat Domisili"
                    control={control}
                    isTextArea
                    textAreaRow={5}
                    textAreaCols={30}
                    inputHeight="h-20"
                    inputWidth="w-[70vw] lg:w-[40vw] md:w-[50vw] md:mr-5"
                    className="resize-none bg-grayscale-2  "
                  />
                </div>
                <div className="col-end-5">
                  <TextField
                    inputHeight="h-10"
                    name="postal_code"
                    variant="md"
                    type="text"
                    labelclassname="text-sm "
                    label="Kode Pos"
                    inputWidth="w-20 text-base"
                    control={control}
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
              <section className="flex flex-wrap justify-center items-center gap-x-1 w-full lg:flex lg:items-center gap-y-4 lg:justify-between lg:w-55% md:flex md:flex-wrap md:w-[70vw] md:justify-between">
                <SelectField
                  name="school_type"
                  label="Jenis Pendidikan Asal"
                  size="sm"
                  placeholder="Jenis Pendidikan"
                  options={['SMA', 'SMK', 'MA']}
                  width="w-[35vw] lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
                  control={control}
                />
                <SelectField
                  name="graduation_year"
                  label="Tahun Lulus"
                  size="sm"
                  placeholder="Tahun Lulus"
                  options={['2020', '2021', '2022']}
                  width="w-[35vw] lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
                  control={control}
                />
                <SelectField
                  name="school_major"
                  label="Jurusan Pendidikan Asal"
                  size="sm"
                  placeholder="Jurusan Pendidikan"
                  options={['Saintek', 'Soshum', 'Lainnya']}
                  width="w-70% lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
                  control={control}
                />
              </section>

              <section className="flex flex-wrap w-full justify-center items-center gap-x-1 lg:flex lg:items-center gap-y-4 lg:justify-between lg:w-55% md:flex md:flex-wrap md:w-[70vw] md:justify-between">
                <TextField
                  inputHeight="h-10"
                  name="npsn"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="NPSN"
                  placeholder="Masukan NPSN"
                  inputWidth="w-[35vw] lg:w-[27vw] xl:w-[25vw] text-base md:w-[33vw] "
                  control={control}
                />
                <TextField
                  inputHeight="h-10"
                  name="school_name"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="Nama Sekolah Asal"
                  inputWidth="w-[35vw] lg:w-[27vw] xl:w-[25vw] text-base md:w-[33vw] "
                  control={control}
                />
              </section>

              <section className="flex flex-wrap w-full justify-center items-center gap-x-1 lg:flex lg:items-start gap-y-4 lg:justify-between lg:w-55% md:flex md:flex-wrap md:w-[70vw] md:justify-between">
                <SelectField
                  name="school_province"
                  label="Provinsi"
                  size="sm"
                  placeholder="Provinsi"
                  options={['Jawa Barat', 'Jawa Tengah', 'Jawa Timur']}
                  width="w-70% lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
                  control={control}
                />
                <SelectField
                  name="school_city"
                  label="Kota/Kabupaten"
                  size="sm"
                  placeholder="Kota/Kabupaten"
                  options={[
                    'Kota Medan',
                    'Kabupaten Bandung',
                    'Kota Jakarta',
                    'Kota Bandung',
                  ]}
                  width="w-[35vw] lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
                  control={control}
                />
                <SelectField
                  name="school_subdistrict"
                  label="Kecamatan"
                  size="sm"
                  placeholder="Kecamatan"
                  options={['Sumur Bandung', 'Batununggal']}
                  width="w-[35vw] lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
                  control={control}
                />
              </section>

              <section className="grid grid-cols-3 w-[70vw] gap-x-1 justify-between items-start  lg:flex lg:justify-between lg:items-start mt-2 gap-y-4 lg:mt-6 lg:w-55% md:flex md:flex-wrap md:w-[70vw] md:justify-between">
                <div className="col-span-3">
                  <TextField
                    name="school_address"
                    variant="sm"
                    type="text"
                    labelclassname="text-xl font-semibold"
                    label="Alamat Pendidikan Asal"
                    control={control}
                    isTextArea
                    textAreaRow={5}
                    textAreaCols={30}
                    inputHeight="h-20"
                    inputWidth="w-[70vw] lg:w-[40vw] md:w-[50vw] md:mr-5"
                    className="resize-none bg-grayscale-2  "
                  />
                </div>
                <div className="col-end-5">
                  <TextField
                    inputHeight="h-10"
                    name="school_postal_code"
                    variant="md"
                    type="text"
                    labelclassname="text-sm "
                    label="Kode Pos"
                    inputWidth="w-20 text-base"
                    control={control}
                  />
                </div>
              </section>
            </Accordion>

            {/* Accordion data orang tua dan wali */}
            {/* section form orang tua/wali */}
            <Accordion
              title="Data Orang Tua "
              className="w-full h-auto mt-[2rem] flex flex-col gap-5 items-center lg:items-baseline lg:ml-[3vw] xl:ml-[5vw] text-left"
            >
              {/* Ayah */}
              <h1 className="font-bold text-xl mt-3  lg:pl-0 md:pl-[11vw] xl:pl-0 place-self-start pl-10">
                Profil Ayah
              </h1>

              <section className="flex flex-wrap w-full justify-center items-start gap-x-1 lg:flex  lg:flex-wrap lg:gap-6 xl:gap-1 gap-y-4 mt-2 lg:items-center lg:w-55% md:flex md:flex-wrap md:w-[70vw] md:justify-between">
                <TextField
                  inputHeight="h-10"
                  name="father_name"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="Nama Ayah"
                  inputWidth="w-[35vw] lg:w-[26vw] max-w-20% xl:w-[25vw] md:w-[33vw]"
                  control={control}
                />
                <SelectField
                  name="school_subdistrict"
                  label="Status Ayah"
                  size="sm"
                  placeholder="Status Ayah"
                  options={['Meninggal', 'Hidup']}
                  width="w-[35vw] lg:w-[12vw] md:w-[16vw]"
                  control={control}
                />
                <SelectField
                  name="school_subdistrict"
                  label="Pendidikan Ayah"
                  size="sm"
                  placeholder="Pendidikan Ayah"
                  options={['SD', 'SMP', 'SMA/SMK', 'S1']}
                  width="w-[35vw] lg:w-[12vw] md:w-[16vw]"
                  control={control}
                />
                <SelectField
                  name="father_occupation"
                  label="Pekerjaan Ayah"
                  size="sm"
                  placeholder="Pilih Pekerjaan"
                  options={[
                    'Petani',
                    'Nelayan',
                    'Guru',
                    'Wirausaha',
                    'Lainnya',
                  ]}
                  width="w-[35vw] lg:w-[26vw] md:w-[33vw]"
                  control={control}
                />
                <SelectField
                  name="father_income"
                  label="Pendapatan Ayah ( Per Bulan )"
                  size="sm"
                  placeholder="Pilih Pendapatan"
                  options={[
                    'Rp. 0 - 2.000.000',
                    'Rp. 2.000.001 - 4.000.000',
                    'Rp. 4.000.001 - 6.000.000',
                  ]}
                  width="w-70% lg:w-[26.5vw] md:w-[33vw]"
                  control={control}
                />
              </section>
              {/* Ibu */}
              <h1 className="font-bold text-xl mt-3  lg:pl-0 md:pl-[11vw] xl:pl-0 place-self-start pl-10">
                Profil Ibu
              </h1>
              <section className="flex flex-wrap justify-center items-start w-full gap-x-1 lg:flex  lg:flex-wrap lg:gap-6 xl:gap-1 gap-y-4 mt-2 lg:items-center lg:w-55% md:flex md:flex-wrap md:w-[70vw] md:justify-between">
                <TextField
                  inputHeight="h-10"
                  name="mother_name"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="Nama Ibu"
                  inputWidth="w-[35vw] lg:w-[26vw] max-w-20% xl:w-[25vw] md:w-[33vw]"
                  control={control}
                />
                <SelectField
                  name="school_subdistrict"
                  label="Status Ibu"
                  size="sm"
                  placeholder="Status Ibu"
                  options={['Meninggal', 'Hidup']}
                  width="w-[35vw] lg:w-[12vw] md:w-[17vw]"
                  control={control}
                />
                <SelectField
                  name="school_subdistrict"
                  label="Pendidikan Ibu"
                  size="sm"
                  placeholder="Pendidikan Ibu"
                  options={['SD', 'SMP', 'SMA/SMK', 'S1']}
                  width="w-[35vw] lg:w-[12vw] md:w-[17vw]"
                  control={control}
                />
                <SelectField
                  name="mother_occupation"
                  label="Pekerjaan Ibu"
                  size="sm"
                  placeholder="Pilih Pekerjaan"
                  options={[
                    'Petani',
                    'Nelayan',
                    'Guru',
                    'Wirausaha',
                    'Lainnya',
                  ]}
                  width="w-[35vw] lg:w-[26vw] md:w-[33vw]"
                  control={control}
                />
                <SelectField
                  name="mother_income"
                  label="Pendapatan Ibu ( Per Bulan )"
                  size="sm"
                  placeholder="Pilih Pendapatan"
                  options={[
                    'Rp. 0 - 2.000.000',
                    'Rp. 2.000.001 - 4.000.000',
                    'Rp. 4.000.001 - 6.000.000',
                  ]}
                  width="w-70% lg:w-[26.5vw] md:w-[33vw]"
                  control={control}
                />
              </section>
              {/* Parent Address */}
              <h1 className="font-bold text-xl mt-3  lg:pl-0 md:pl-[11vw] xl:pl-0 place-self-start pl-10">
                Alamat Orang Tua
              </h1>
              <section className=" flex flex-wrap w-full justify-center items-center gap-x-1 lg:flex lg:items-center gap-y-4 lg:justify-between lg:w-55% md:flex md:flex-wrap md:w-[70vw] md:justify-between">
                <SelectField
                  name="parent_province"
                  label="Provinsi"
                  size="sm"
                  placeholder="Provinsi"
                  options={['Jawa Barat', 'Jawa Tengah', 'Jawa Timur']}
                  width="w-[35vw] lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
                  control={control}
                />
                <SelectField
                  name="parent_city"
                  label="Kota/Kabupaten"
                  size="sm"
                  placeholder="Kota/Kabupaten"
                  options={[
                    'Kota Medan',
                    'Kabupaten Bandung',
                    'Kota Jakarta',
                    'Kota Bandung',
                  ]}
                  width="w-[35vw] lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
                  control={control}
                />
                <SelectField
                  name="parent_subdistrict"
                  label="Kecamatan"
                  size="sm"
                  placeholder="Kecamatan"
                  options={['Sumur Bandung', 'Batununggal']}
                  width="w-70% lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
                  control={control}
                />
              </section>
              <section className="grid grid-cols-3 w-[70vw] gap-x-1 justify-between items-start  lg:flex lg:justify-between lg:items-start mt-2 gap-y-4 lg:mt-6 lg:w-55% md:flex md:flex-wrap md:w-[70vw] md:justify-between">
                <div className="col-span-3">
                  <TextField
                    name="parent_address"
                    variant="sm"
                    type="text"
                    labelclassname="text-xl font-semibold"
                    label="Alamat Domisili"
                    control={control}
                    isTextArea
                    textAreaRow={5}
                    textAreaCols={30}
                    inputHeight="h-20"
                    inputWidth="w-[70vw] lg:w-[40vw] md:w-[50vw] md:mr-5"
                    className="resize-none bg-grayscale-2  "
                  />
                </div>
                <div className="col-end-5">
                  <TextField
                    inputHeight="h-10"
                    name="parent_postal_code"
                    variant="md"
                    type="text"
                    labelclassname="text-sm "
                    label="Kode Pos"
                    inputWidth="w-20 text-base"
                    control={control}
                  />
                </div>
                <div className="col-span-4">
                  <CheckBox
                    name="parent_address"
                    control={control}
                    label="Alamat Sama Dengan Pendaftar"
                    variant="primary"
                    size="md"
                  />
                </div>
              </section>

              <h1 className="font-bold text-xl mt-3  lg:pl-0 md:pl-[11vw] xl:pl-0 place-self-start pl-10">
                Profil Wali
              </h1>
              <section className="flex flex-wrap w-full justify-center items-start gap-x-1 lg:flex  lg:flex-wrap lg:gap-6 xl:gap-1 gap-y-2 mt-2 lg:items-center lg:w-55% md:w-[70vw] md:flex md:flex-wrap md:justify-between">
                <TextField
                  inputHeight="h-10"
                  name="guardian_name"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="Nama Wali"
                  inputWidth="w-[35vw] lg:w-[26vw] max-w-20% xl:w-[25vw] md:w-[33vw]"
                  control={control}
                />
                <SelectField
                  name="school_subdistrict"
                  label="Status Wali"
                  size="sm"
                  placeholder="Status Wali"
                  options={['Meninggal', 'Hidup']}
                  width="w-[35vw] lg:w-[12vw] md:w-[17vw]"
                  control={control}
                />
                <SelectField
                  name="guardian_education"
                  label="Pendidikan Wali"
                  size="sm"
                  placeholder="Pendidikan Wali"
                  options={['SD', 'SMP', 'SMA/SMK', 'S1']}
                  width="w-[35vw] lg:w-[12vw] md:w-[17vw]"
                  control={control}
                />
                <SelectField
                  name="guardian_occupation"
                  label="Pekerjaan Wali"
                  size="sm"
                  placeholder="Pilih Pekerjaan"
                  options={[
                    'Petani',
                    'Nelayan',
                    'Guru',
                    'Wirausaha',
                    'Lainnya',
                  ]}
                  width="w-[35vw] lg:w-[26vw] md:w-[33vw]"
                  control={control}
                />
                <SelectField
                  name="guardian_income"
                  label="Pendapatan Wali ( Per Bulan )"
                  size="sm"
                  placeholder="Pilih Pendapatan"
                  options={[
                    'Rp. 0 - 2.000.000',
                    'Rp. 2.000.001 - 4.000.000',
                    'Rp. 4.000.001 - 6.000.000',
                  ]}
                  width="w-70% lg:w-[26vw] md:w-[33vw]"
                  control={control}
                />
              </section>
              <h1 className="font-bold text-xl mt-3  lg:pl-0 md:pl-[11vw] xl:pl-0 place-self-start pl-10">
                Alamat Wali
              </h1>
              <section className="flex flex-wrap w-full justify-center items-center gap-x-1 lg:flex lg:items-center gap-y-4 lg:justify-between lg:w-55% md:flex md:flex-wrap md:w-[70vw] md:justify-between">
                <SelectField
                  name="guardian_province"
                  label="Provinsi"
                  size="sm"
                  placeholder="Provinsi"
                  options={['Jawa Barat', 'Jawa Tengah', 'Jawa Timur']}
                  width="w-[35vw] lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
                  control={control}
                />
                <SelectField
                  name="guardian_city"
                  label="Kota/Kabupaten"
                  size="sm"
                  placeholder="Kota/Kabupaten"
                  options={[
                    'Kota Medan',
                    'Kabupaten Bandung',
                    'Kota Jakarta',
                    'Kota Bandung',
                  ]}
                  width="w-[35vw] lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
                  control={control}
                />
                <SelectField
                  name="guardian_subdistrict"
                  label="Kecamatan"
                  size="sm"
                  placeholder="Kecamatan"
                  options={['Sumur Bandung', 'Batununggal']}
                  width="w-70% lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
                  control={control}
                />
              </section>
              <section className="grid grid-cols-3 w-[70vw] gap-x-1 justify-between items-start  lg:flex lg:justify-between lg:items-start mt-2 gap-y-4 lg:mt-6 lg:w-55% md:flex md:flex-wrap md:w-[70vw] md:justify-between">
                <div className="col-span-3">
                  <TextField
                    name="guardian_address"
                    variant="sm"
                    type="text"
                    labelclassname="text-xl font-semibold"
                    label="Alamat Wali"
                    control={control}
                    isTextArea
                    textAreaRow={5}
                    textAreaCols={30}
                    inputHeight="h-20"
                    inputWidth="w-[70vw] lg:w-[40vw] md:w-[50vw] md:mr-5"
                    className="resize-none bg-grayscale-2  "
                  />
                </div>
                <div className="col-end-5">
                  <TextField
                    inputHeight="h-10"
                    name="guardian_postal_code"
                    variant="md"
                    type="text"
                    labelclassname="text-sm "
                    label="Kode Pos"
                    inputWidth="w-20 text-base"
                    control={control}
                  />
                </div>
                <div className="col-span-4">
                  <CheckBox
                    name="guardian_address"
                    control={control}
                    label="Alamat Sama Dengan Pendaftar"
                    variant="primary"
                    size="md"
                  />
                </div>
              </section>
            </Accordion>

            <Button
              variant="filled"
              size="md"
              width="lg:w-25% xl:w-15% "
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
