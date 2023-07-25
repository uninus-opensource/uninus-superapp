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

              <section className="grid grid-cols-1 lg:flex  lg:justify-between lg:flex-wrap lg:gap-2 xl:gap-1 gap-y-4 mt-4 lg:items-center lg:w-55%">
                {formBiodataOne.map((biodata, idx) => (
                  <TextField
                    key={idx}
                    placeholder={biodata.placeholder}
                    name={biodata.name}
                    label={biodata.item}
                    labelclassname="text-xl font-semibold"
                    variant="sm"
                    inputWidth="w-70% lg:w-[17vw] xl:w-20%"
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
                  inputWidth="w-70% lg:w-[17vw] xl:w-20% text-base"
                  control={control}
                  disabled
                />
                <TextField
                  name="nik"
                  variant="sm"
                  type="text"
                  placeholder="Nomor dapat dilihat dari KK atau KTP"
                  labelclassname="text-sm font-semibold"
                  label="NIK"
                  inputWidth="w-70% lg:w-[27vw] xl:w-20% text-base"
                  control={control}
                />
                <TextField
                  name="nisn"
                  variant="sm"
                  type="text"
                  placeholder="Nomor Induk Siswa Nasional"
                  labelclassname="text-sm font-semibold"
                  label="NISN"
                  inputWidth="w-70% lg:w-[27vw] xl:w-20% text-base"
                  control={control}
                  disabled
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
                  width="w-70% lg:w-[27vw] xl:w-10%"
                  control={control}
                />
              </section>
              <section className="grid grid-cols-1 lg:flex lg:justify-between lg:gap-6 xl:gap-1 gap-y-4 mt-4 lg:items-center lg:w-55%">
                <SelectField
                  name="birth_place"
                  label="Tempat Lahir"
                  size="sm"
                  placeholder="Kota tempat lahir"
                  status="none"
                  options={['Kota Bandung', 'Kota Jakarta', 'Kota Denpasar']}
                  width="w-70% lg:w-[27vw] xl:w-20%"
                  control={control}
                />
                <TextField
                  name="birth_date"
                  variant="sm"
                  type="date"
                  labelclassname="text-xl font-semibold"
                  label="Tanggal Lahir"
                  inputWidth="lg:w-[27vw] xl:w-20%"
                  control={control}
                />
              </section>

              <section className="grid grid-cols-1 lg:flex lg:justify-start lg:gap-x-3 lg:items-center mt-6 gap-y-4 lg:w-55%">
                <SelectField
                  name="marital_status"
                  label="Status"
                  size="sm"
                  placeholder="Status"
                  status="none"
                  options={['Menikah', 'Belum menikah']}
                  width="lg:w-[27vw]"
                  control={control}
                />
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
                      isChecked={radioSelected?.ECitizenship === 'WNA'}
                    />
                  </div>
                </div>
              </section>

              <section className="grid grid-cols-1 lg:flex lg:justify-between lg:items-center gap-y-4 mt-2 lg:mt-6 lg:w-55%">
                <SelectField
                  name="country"
                  label="Asal Negara"
                  size="sm"
                  placeholder="Asal Negara"
                  status="none"
                  options={['Indonesia', 'Malaysia', 'Singapura', 'Kamboja']}
                  width="w-70% lg:w-[27vw] xl:w-15%"
                  control={control}
                />
                <SelectField
                  name="province"
                  label="Provinsi"
                  size="sm"
                  placeholder="Provinsi"
                  status="none"
                  options={['Jawa Barat', 'Jawa Tengah', 'Jawa Timur']}
                  width="w-70% lg:w-[27vw] xl:w-15%"
                  control={control}
                />
              </section>
              <section className="grid grid-cols-1 lg:flex lg:justify-between lg:items-center gap-y-4 mt-2 lg:mt-6 lg:w-55%">
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
                  width="w-70% lg:w-[27vw] xl:w-15%"
                  control={control}
                />
                <SelectField
                  name="subdistrict"
                  label="Kecamatan"
                  size="sm"
                  placeholder="Kecamatan"
                  status="none"
                  options={['Sumur Bandung', 'Batununggal']}
                  width="w-70% lg:w-[27vw]"
                  control={control}
                />
              </section>
              <section className="grid grid-cols-1 lg:flex lg:justify-between lg:items-center mt-2 gap-y-4 lg:mt-6 lg:w-55%">
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
                  className="bg-grayscale-2 h-20 rounded-lg text-xs resize-none w-70% lg:w-[40vw]"
                />

                <div className="flex lg:w-30% xl:w-20% items-center justify-between lg:justify-evenly xl:justify-between">
                  <TextField
                    name="postal_code"
                    variant="md"
                    type="text"
                    labelclassname="text-sm font-semibold"
                    label="Kode Pos"
                    inputWidth="w-20 text-base"
                    control={control}
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
                  width="w-70% lg:w-[17vw] xl:w-15%"
                  control={control}
                />
                <SelectField
                  name="graduation_year"
                  label="Tahun Lulus"
                  size="sm"
                  placeholder="Tahun Lulus"
                  options={['2020', '2021', '2022']}
                  width="w-70% lg:w-[17vw] xl:w-15%"
                  control={control}
                />
                <SelectField
                  name="school_major"
                  label="Jurusan Pendidikan Asal"
                  size="sm"
                  placeholder="Jurusan Pendidikan"
                  options={['Saintek', 'Soshum', 'Lainnya']}
                  width="w-70% lg:w-[17vw] xl:w-15%"
                  control={control}
                />
              </section>

              <section className="grid grid-cols-1 lg:flex lg:items-center gap-y-4 lg:justify-between lg:w-55%">
                <TextField
                  name="school_name"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="NPSN"
                  placeholder="Masukan NPSN"
                  inputWidth="w-70% lg:w-[27vw]"
                  control={control}
                />
                <TextField
                  name="school_name"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="Nama Instansi Pendidikan"
                  inputWidth="w-70% lg:w-[27vw]"
                  control={control}
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
                  name="school_phone_number"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="Kontak Instansi"
                  inputWidth="w-70% lg:w-15%"
                  control={control}
                />
              </section>

              <section className="grid grid-cols-1 lg:flex lg:justify-between lg:items-center mt-2 gap-y-4 lg:mt-3 lg:w-55%">
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
                  className="bg-grayscale-2 h-20 rounded-lg text-xs resize-none w-70% lg:w-[40vw]"
                />

                <div className="flex lg:w-30% xl:w-20% items-center justify-between lg:justify-evenly xl:justify-between">
                  <TextField
                    name="school_postal_code"
                    variant="md"
                    type="text"
                    labelclassname="text-sm font-semibold"
                    label="Kode Pos"
                    inputWidth="w-20 text-base"
                    control={control}
                    maxlenght={6}
                  />
                </div>
              </section>
            </Accordion>

            {/* Accordion data orang tua dan wali */}
            {/* section form orang tua/wali */}
            <Accordion
              title="Data Orang Tua "
              className="w-full h-auto mt-[2rem] flex flex-col gap-5 items-center lg:items-baseline lg:ml-[3vw] xl:ml-[5vw]"
            >
              {/* Ayah */}
              <h1 className="font-bold text-xl">Profil Ayah</h1>
              <section className="grid grid-cols-1 lg:flex  lg:flex-wrap lg:gap-6 xl:gap-1 gap-y-2 mt-2 lg:items-center lg:w-55%">
                <TextField
                  name="father_name"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="Nama Ayah"
                  inputWidth="w-70% lg:w-[25vw] max-w-20% xl:w-20%"
                  control={control}
                />
                <SelectField
                  name="school_subdistrict"
                  label="Status Ayah"
                  size="sm"
                  placeholder="Status Ayah"
                  status="none"
                  options={['Meninggal', 'Hidup']}
                  width="w-70% lg:w-[12vw]"
                  control={control}
                />
                <SelectField
                  name="school_subdistrict"
                  label="Pendidikan Ayah"
                  size="sm"
                  placeholder="Pendidikan Ayah"
                  status="none"
                  options={['SD', 'SMP', 'SMA/SMK', 'S1']}
                  width="w-70% lg:w-[12vw]"
                  control={control}
                />
                <SelectField
                  name="father_occupation"
                  label="Pekerjaan Ayah"
                  size="sm"
                  placeholder="Pilih Pekerjaan"
                  status="none"
                  options={[
                    'Petani',
                    'Nelayan',
                    'Guru',
                    'Wirausaha',
                    'Lainnya',
                  ]}
                  width="w-70% lg:w-[25vw]"
                  control={control}
                />
                <SelectField
                  name="father_income"
                  label="Pendapatan Ayah ( Per Bulan )"
                  size="sm"
                  placeholder="Pilih Pendapatan"
                  status="none"
                  options={[
                    'Rp. 0 - 2.000.000',
                    'Rp. 2.000.001 - 4.000.000',
                    'Rp. 4.000.001 - 6.000.000',
                  ]}
                  width="w-70% lg:w-[25vw]"
                  control={control}
                />
              </section>
              {/* Ibu */}
              <h1 className="font-bold text-xl mt-3">Profil Ibu</h1>
              <section className="grid grid-cols-1 lg:flex  lg:flex-wrap lg:gap-6 xl:gap-1 gap-y-2 mt-2 lg:items-center lg:w-55%">
                <TextField
                  name="mother_name"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="Nama Ibu"
                  inputWidth="w-70% lg:w-[25vw] max-w-20% xl:w-20%"
                  control={control}
                />
                <SelectField
                  name="school_subdistrict"
                  label="Status Ibu"
                  size="sm"
                  placeholder="Status Ibu"
                  status="none"
                  options={['Meninggal', 'Hidup']}
                  width="w-70% lg:w-[12vw]"
                  control={control}
                />
                <SelectField
                  name="school_subdistrict"
                  label="Pendidikan Ibu"
                  size="sm"
                  placeholder="Pendidikan Ibu"
                  status="none"
                  options={['SD', 'SMP', 'SMA/SMK', 'S1']}
                  width="w-70% lg:w-[12vw]"
                  control={control}
                />
                <SelectField
                  name="mother_occupation"
                  label="Pekerjaan Ibu"
                  size="sm"
                  placeholder="Pilih Pekerjaan"
                  status="none"
                  options={[
                    'Petani',
                    'Nelayan',
                    'Guru',
                    'Wirausaha',
                    'Lainnya',
                  ]}
                  width="w-70% lg:w-[25vw]"
                  control={control}
                />
                <SelectField
                  name="father_income"
                  label="Pendapatan Ibu ( Per Bulan )"
                  size="sm"
                  placeholder="Pilih Pendapatan"
                  status="none"
                  options={[
                    'Rp. 0 - 2.000.000',
                    'Rp. 2.000.001 - 4.000.000',
                    'Rp. 4.000.001 - 6.000.000',
                  ]}
                  width="w-70% lg:w-[25vw]"
                  control={control}
                />
              </section>
              {/* Parent Address */}
              <h1 className="font-bold text-xl mt-3">Alamat Orang Tua</h1>
              <section className="grid grid-cols-1 lg:flex  lg:flex-wrap lg:gap-6 xl:gap-1 gap-y-2 mt-2 lg:items-center lg:w-55%">
                <SelectField
                  name="province"
                  label="Provinsi"
                  size="sm"
                  placeholder="Provinsi"
                  status="none"
                  options={['Jawa Barat', 'Jawa Tengah', 'Jawa Timur']}
                  width="w-70% lg:w-[15vw] xl:w-15%"
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
                  width="w-70% lg:w-[15vw] xl:w-15%"
                  control={control}
                />
                <SelectField
                  name="subdistrict"
                  label="Kecamatan"
                  size="sm"
                  placeholder="Kecamatan"
                  status="none"
                  options={['Sumur Bandung', 'Batununggal']}
                  width="w-70% lg:w-[15vw]"
                  control={control}
                />
              </section>
              <section className="grid grid-cols-1 lg:flex lg:justify-between lg:items-center mt-2 gap-y-4 lg:mt-6 lg:w-55%">
                <TextField
                  name="parent_address"
                  variant="sm"
                  type="text"
                  labelclassname="text-xl font-semibold"
                  label="Alamat Lengkap Orang Tua"
                  control={control}
                  isTextArea
                  textAreaRow={5}
                  textAreaCols={30}
                  className="bg-grayscale-2 h-20 rounded-lg text-xs resize-none w-70% lg:w-[40vw]"
                />

                <div className="flex lg:w-30% xl:w-20% items-center justify-between lg:justify-evenly xl:justify-between">
                  <TextField
                    name="parent_postal_code"
                    variant="md"
                    type="text"
                    labelclassname="text-sm font-semibold"
                    label="Kode Pos"
                    inputWidth="w-20 text-base"
                    control={control}
                    maxlenght={6}
                  />
                </div>
              </section>
              <CheckBox
                name="parent_address"
                control={control}
                label="Alamat Sama Dengan Pendaftar"
                variant="primary"
                size="md"
              />
              <h1 className="font-bold text-xl mt-3">Profil Wali</h1>
              <section className="grid grid-cols-1 lg:flex  lg:flex-wrap lg:gap-6 xl:gap-1 gap-y-2 mt-2 lg:items-center lg:w-55%">
                <TextField
                  name="guardian_name"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="Nama Wali"
                  inputWidth="w-70% lg:w-[25vw] max-w-20% xl:w-20%"
                  control={control}
                />
                <SelectField
                  name="school_subdistrict"
                  label="Status Wali"
                  size="sm"
                  placeholder="Status Wali"
                  status="none"
                  options={['Meninggal', 'Hidup']}
                  width="w-70% lg:w-[12vw]"
                  control={control}
                />
                <SelectField
                  name="guardian_education"
                  label="Pendidikan Wali"
                  size="sm"
                  placeholder="Pendidikan Wali"
                  status="none"
                  options={['SD', 'SMP', 'SMA/SMK', 'S1']}
                  width="w-70% lg:w-[12vw]"
                  control={control}
                />
                <SelectField
                  name="guardian_occupation"
                  label="Pekerjaan Wali"
                  size="sm"
                  placeholder="Pilih Pekerjaan"
                  status="none"
                  options={[
                    'Petani',
                    'Nelayan',
                    'Guru',
                    'Wirausaha',
                    'Lainnya',
                  ]}
                  width="w-70% lg:w-[25vw]"
                  control={control}
                />
                <SelectField
                  name="guardian_income"
                  label="Pendapatan Wali ( Per Bulan )"
                  size="sm"
                  placeholder="Pilih Pendapatan"
                  status="none"
                  options={[
                    'Rp. 0 - 2.000.000',
                    'Rp. 2.000.001 - 4.000.000',
                    'Rp. 4.000.001 - 6.000.000',
                  ]}
                  width="w-70% lg:w-[25vw]"
                  control={control}
                />
              </section>
              <h1 className="font-bold text-xl mt-3">Alamat Wali</h1>
              <section className="grid grid-cols-1 lg:flex  lg:flex-wrap lg:gap-6 xl:gap-1 gap-y-2 mt-2 lg:items-center lg:w-55%">
                <SelectField
                  name="province"
                  label="Provinsi"
                  size="sm"
                  placeholder="Provinsi"
                  status="none"
                  options={['Jawa Barat', 'Jawa Tengah', 'Jawa Timur']}
                  width="w-70% lg:w-[15vw] xl:w-15%"
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
                  width="w-70% lg:w-[15vw] xl:w-15%"
                  control={control}
                />
                <SelectField
                  name="subdistrict"
                  label="Kecamatan"
                  size="sm"
                  placeholder="Kecamatan"
                  status="none"
                  options={['Sumur Bandung', 'Batununggal']}
                  width="w-70% lg:w-[15vw]"
                  control={control}
                />
              </section>
              <section className="grid grid-cols-1 lg:flex lg:justify-between lg:items-center mt-2 gap-y-4 lg:mt-6 lg:w-55%">
                <TextField
                  name="parent_address"
                  variant="sm"
                  type="text"
                  labelclassname="text-xl font-semibold"
                  label="Alamat Lengkap Wali"
                  control={control}
                  isTextArea
                  textAreaRow={5}
                  textAreaCols={30}
                  className="bg-grayscale-2 h-20 rounded-lg text-xs resize-none w-70% lg:w-[40vw]"
                />

                <div className="flex lg:w-30% xl:w-20% items-center justify-between lg:justify-evenly xl:justify-between">
                  <TextField
                    name="parent_postal_code"
                    variant="md"
                    type="text"
                    labelclassname="text-sm font-semibold"
                    label="Kode Pos"
                    inputWidth="w-20 text-base"
                    control={control}
                    maxlenght={6}
                  />
                </div>
              </section>
              <CheckBox
                name="parent_address"
                control={control}
                label="Alamat Sama Dengan Pendaftar"
                variant="primary"
                size="md"
              />
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
