'use client';
import { ReactElement, FC } from 'react';
import Image from 'next/image';
import {
  Button,
  CheckBox,
  RadioButton,
  SelectField,
  TextField,
  UploadField,
} from '@uninus/components';
import { useForm } from 'react-hook-form';
import { TTextFieldOne, TTextFieldThree, TTextFieldTwo } from './type';
import { DashboardLayout } from '../../layouts';

export const ModuleBiodata: FC = (): ReactElement => {
  const { control } = useForm({
    defaultValues: {
      namaLengkap: '',
      email: '',
      kartuIdentitas: '',
      nomorKartuIdentitas: '',
      nisn: '',
      noWA: '',
      tempatLahir: '',
      tanggalLahir: '',
      laki: '',
      perempuan: '',
      agama: '',
      statusMenikah: '',
      wni: '',
      wna: '',
      asalNegara: '',
      provinsi: '',
      kotaKabupaten: '',
      kecamatan: '',
      alamat: '',
      rt: '',
      rw: '',
      kodepos: '',
      jenisPendidikanAsal: '',
      jurusanPendidikanAsal: '',
      lainnya: '',
      instansiPendidikan: '',
      alamatInstansi: '',
      provinsiInstansi: '',
      kotaKabupatenInstansi: '',
      kecamatanInstansi: '',
      kodeposInstansi: '',
      kontakInstansi: '',
      tahunLulus: '',
      ibuKandung: '',
      ayahKandung: '',
      alamatOrtu: '',
      rtOrtu: '',
      rwOrtu: '',
      kodeposOrtu: '',
      provinsiOrtu: '',
      kotaKabupatenOrtu: '',
      kecamatanOrtu: '',
      alamatSamaOrtu: false,
      pendidikanAyah: '',
      pekerjaanAyah: '',
      pendapatanAyah: '',
      pendidikanIbu: '',
      pekerjaanIbu: '',
      pendapatanIbu: '',
      pendidikanWali: '',
      pekerjaanWali: '',
      pendapatanWali: '',
    },
  });

  const formBiodataOne: TTextFieldOne[] = [
    {
      name: 'namaLengkap',
      item: 'Nama Lengkap',
      type: 'text',
    },
    {
      name: 'email',
      item: 'Email',
      type: 'email',
    },
    {
      name: 'kartuIdentitas',
      item: 'Kartu Identitas',
      type: 'text',
    },
    {
      name: 'nomorKartuIdentitas',
      item: 'Nomor Kartu Identitas',
      type: 'text',
    },
    {
      name: 'nisn',
      item: 'Nomor Induk Siswa Nasional',
      type: 'text',
    },
    {
      name: 'noWA',
      item: 'Nomor Handphone/WA',
      type: 'text',
    },
  ];

  const formBiodataTwo: TTextFieldTwo[] = [
    {
      name: 'rt',
      item: 'RT',
      type: 'number',
    },
    {
      name: 'rw',
      item: 'RW',
      type: 'number',
    },
  ];

  const formBiodataThree: TTextFieldThree[] = [
    {
      name: 'rtOrtu',
      item: 'RT',
      type: 'number',
    },
    {
      name: 'rwOrtu',
      item: 'RW',
      type: 'number',
    },
  ];

  return (
    <DashboardLayout>
      <section className="flex flex-col gap-4 lg:px-10 lg:ml-[18%] ml-0 text-center lg:text-start">
        <h1 className="text-4xl font-semibold">Biodata Diri Pendaftar</h1>
        <div className="flex flex-col gap-7 ">
          <h3 className="text-2xl font-semibold">Upload Foto</h3>
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
            <UploadField variant="md" />
          </div>
        </div>
        {/* section form biodata diri pendaftar */}
        <form action="" className="flex flex-col gap-6">
          <section className="grid grid-cols-2 gap-4">
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
              name="tempatLahir"
              label="Tempat Lahir"
              size="sm"
              placeholder="Kota tempat lahir"
              status="none"
              options={['Kota Bandung', 'Kota Jakarta', 'Kota Denpasar']}
              value="Tempat Lahir"
              width="lg:w-25% xl:w-20%"
              control={control}
            />
            <TextField
              name="tanggalLahir"
              variant="sm"
              type="date"
              labelclassname="text-xl font-semibold"
              label="Tanggal Lahir"
              inputWidth="lg:w-25% xl:w-20%"
              control={control}
            />
          </section>

          <section className="flex justify-between lg:gap-6 xl:gap-1 mt-4 items-center w-55%">
            <div className="flex flex-col lg:gap-2 xl:gap-4">
              <h3 className="text-xs font-semibold">Jenis Kelamin</h3>
              <div className="flex items-center gap-6">
                <RadioButton
                  name="laki"
                  label="Laki-laki"
                  control={control}
                  id="l"
                  inputname="jk"
                  value="laki-laki"
                  variant="primary"
                  required
                />
                <RadioButton
                  name="perempuan"
                  label="Perempuan"
                  control={control}
                  id="p"
                  inputname="jk"
                  value="perempuan"
                  variant="primary"
                  required
                />
              </div>
            </div>
            <SelectField
              name="agama"
              label="Agama"
              size="sm"
              placeholder="Agama"
              status="none"
              options={[
                'Islam',
                'Kristem',
                'Katolik',
                'Hindu',
                'Buddha',
                'Konghuchu',
              ]}
              value="Agama"
              width="lg:w-15% xl:w-10%"
              control={control}
            />
            <SelectField
              name="statusMenikah"
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
                  name="wni"
                  label="WNI"
                  control={control}
                  id="wni"
                  inputname="kewarganegaraan"
                  value="wni"
                  variant="primary"
                  required
                />
                <RadioButton
                  name="wna"
                  label="WNA"
                  control={control}
                  id="wna"
                  inputname="kewarganegaraan"
                  value="wna"
                  variant="primary"
                  required
                />
              </div>
            </div>
            <SelectField
              name="asalNegara"
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
              name="provinsi"
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
              name="kotaKabupaten"
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
              name="kecamatan"
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
              name="alamat"
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
                  maxlenght={1}
                  required
                />
              ))}
              <TextField
                name="kodepos"
                variant="md"
                type="number"
                labelclassname="text-sm font-semibold"
                label="Kode Pos"
                inputWidth="w-20 text-base"
                control={control}
                required
                maxlenght={6}
              />
            </div>
          </section>

          <Button
            variant="filled"
            size="md"
            width="lg:w-25% xl:w-15%"
            styling="mt-4"
          >
            Submit
          </Button>
        </form>

        {/* section form data pendidikan */}
        <form action="" className="flex flex-col gap-6 mt-16">
          <h1 className="text-4xl font-semibold">Data Pendidikan</h1>
          <section className="flex items-center justify-between lg:w-55%">
            <SelectField
              name="jenisPendidikanAsal"
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
              name="jurusanPendidikanAsal"
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

          <section className="flex flex-col gap-2 mt-2">
            <h1 className="text-xs font-semibold">
              Jika jurusan pendidikan asal memilih lainnya
            </h1>
            <TextField
              name="lainnya"
              variant="sm"
              type="text"
              labelclassname="font-light"
              label="Masukan di bawah ini"
              inputWidth="lg:w-full xl:w-55% text-lg"
              control={control}
            />
          </section>

          <section className="flex justify-between lg:w-full xl:w-55%">
            <TextField
              name="instansiPendidikan"
              variant="sm"
              type="text"
              labelclassname="text-sm font-semibold"
              label="Nama Instansi Pendidikan"
              inputWidth="w-20%"
              control={control}
              required
            />
            <TextField
              name="alamatInstansi"
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
              name="provinsiInstansi"
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
              name="kotaKabupatenInstansi"
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
              name="kecamatanInstansi"
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
              name="kodeposInstansi"
              variant="sm"
              type="text"
              labelclassname="text-sm font-semibold"
              label="Kode Pos"
              inputWidth="w-15%"
              control={control}
              required
            />
            <TextField
              name="kontakInstansi"
              variant="sm"
              type="text"
              labelclassname="text-sm font-semibold"
              label="Kontak Instansi"
              inputWidth="w-15%"
              control={control}
              required
            />
            <SelectField
              name="tahunLulus"
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

          <Button
            variant="filled"
            size="md"
            width="lg:w-25% xl:w-15%"
            styling="mt-4"
          >
            Submit
          </Button>
        </form>

        {/* section form orang tua/wali */}
        <form action="" className="flex flex-col gap-6 mt-16">
          <h1 className="text-4xl font-semibold">Data Orang Tua & Wali</h1>

          <section className="grid grid-cols-2 gap-6 lg:w-full w-55% items-center ">
            <TextField
              name="ayahKandung"
              variant="sm"
              type="text"
              labelclassname="text-sm font-semibold"
              label="Nama Ayah Kandung"
              inputWidth="lg:w-25% max-w-20% xl:w-20%"
              control={control}
              required
            />
            <TextField
              name="ibuKandung"
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
                name="alamatOrtu"
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
                  maxlenght={1}
                  required
                />
              ))}
              <TextField
                name="kodeposOrtu"
                variant="md"
                type="number"
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
              name="provinsiOrtu"
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
              name="kotaKabupatenOrtu"
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
              value="Kota/Kabupaten Ortu"
              width="lg:w-20% xl:w-15%"
              control={control}
            />
            <SelectField
              name="kecamatanOrtu"
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
          <CheckBox
            name="alamatSamaOrtu"
            control={control}
            label="Alamat sama dengan pendaftar"
            size="lg"
            labelSize="lg"
          />

          <section className="grid grid-cols-2 xl:w-full lg:w-55% gap-4 items-center mt-8 ">
            <TextField
              name="pendidikanAyah"
              variant="sm"
              type="text"
              labelclassname="text-sm font-semibold"
              label="Pendidikan Ayah"
              inputWidth="lg:w-25% max-w-20% xl:w-20%"
              control={control}
              required
            />
            <TextField
              name="pekerjaanAyah"
              variant="sm"
              type="text"
              labelclassname="text-sm font-semibold"
              label="Pekerjaan Ayah"
              inputWidth="lg:w-25% max-w-20% xl:w-20%"
              control={control}
              required
            />
            <TextField
              name="pendapatanAyah"
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
              name="pendidikanIbu"
              variant="sm"
              type="text"
              labelclassname="text-sm font-semibold"
              label="Pendidikan Ibu"
              inputWidth="lg:w-25% max-w-20% xl:w-20%"
              control={control}
              required
            />
            <TextField
              name="pekerjaanIbu"
              variant="sm"
              type="text"
              labelclassname="text-sm font-semibold"
              label="Pekerjaan Ibu"
              inputWidth="lg:w-25% max-w-20% xl:w-20%"
              control={control}
              required
            />
            <TextField
              name="pendapatanIbu"
              variant="sm"
              type="text"
              labelclassname="text-sm font-semibold"
              label="Pendapatan Ibu"
              inputWidth="lg:w-25% max-w-20% xl:w-20%"
              control={control}
            />
          </section>

          <section className="grid grid-cols-2 xl:w-full lg:w-55% gap-4 items-center mt-6 ">
            <TextField
              name="pendidikanWali"
              variant="sm"
              type="text"
              labelclassname="text-sm font-semibold"
              label="Pendidikan Wali"
              inputWidth="lg:w-25% max-w-20% xl:w-20%"
              control={control}
            />
            <TextField
              name="pekerjaanWali"
              variant="sm"
              type="text"
              labelclassname="text-sm font-semibold"
              label="Pekerjaan Wali"
              inputWidth="lg:w-25% max-w-20% xl:w-20%"
              control={control}
            />
            <TextField
              name="pendapatanWali"
              variant="sm"
              type="text"
              labelclassname="text-sm font-semibold"
              label="Pendapatan Wali"
              inputWidth="lg:w-25% max-w-20% xl:w-20%"
              control={control}
            />
          </section>
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
    </DashboardLayout>
  );
};
