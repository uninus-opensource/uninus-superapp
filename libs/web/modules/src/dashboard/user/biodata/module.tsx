"use client";
import { ReactElement, FC, useEffect, useMemo, useState, ChangeEvent, Fragment } from "react";
import {
  Accordion,
  Button,
  RadioButton,
  TextField,
  UploadField,
  CheckBox,
  SelectOption,
} from "@uninus/web/components";
import { FieldValues, useForm } from "react-hook-form";
import { formBiodataOne, defaultValuesBiodata } from "./store";
import { useBiodataCreate, useBiodataGet, useBiodataUpdate } from "./hooks";
import { EReligion } from "@uninus/entities";
import { useCityGet, useProvinceGet, useSubdistrictGet } from "@uninus/web/services";

export const ModuleBiodata: FC = (): ReactElement => {
  const { data } = useBiodataGet();

  const student = useMemo(() => {
    return data;
  }, [data]);

  const { control, handleSubmit, reset, watch, setValue } = useForm<FieldValues>({
    mode: "all",
    defaultValues: { ...defaultValuesBiodata },
  });

  const [locationMeta, setLocationMeta] = useState({
    search: "",
    province_id: "",
    city_id: "",
  });

  const { data: getProvincies } = useProvinceGet(locationMeta);

  const provinceOptions = useMemo(
    () =>
      getProvincies?.province?.map((province) => ({
        label: province?.name,
        value: province?.id.toString(),
      })),
    [getProvincies?.province],
  );

  const { data: getCity } = useCityGet({
    province_id: watch("province"),
    search: "",
  });

  const cityOptions = useMemo(
    () =>
      getCity?.city?.map((city) => ({
        label: city?.name,
        value: city?.id.toString(),
      })),
    [getCity?.city],
  );

  const { data: getSubdistrict } = useSubdistrictGet({
    city_id: watch("city"),
    search: "",
  });

  const subDistrictOptions = useMemo(
    () =>
      getSubdistrict?.sub_district?.map((subdistrict) => ({
        label: subdistrict?.name,
        value: subdistrict?.id.toString(),
      })),
    [getSubdistrict?.sub_district],
  );

  const { mutate: createBiodata } = useBiodataCreate();
  const { mutate: updateBiodata } = useBiodataUpdate();

  const [radioSelected, setRadioSelected] = useState<{
    EGender?: string;
    ECitizenship?: string;
  }>({
    EGender: "",
    ECitizenship: "",
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
      // if (student?.identification_number) {
      //   updateBiodata(data);
      // } else {
      //   createBiodata(data);
      // }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    setValue("city", null);
  }, [watch("province")]);

  useEffect(() => {
    reset(student);

    setRadioSelected({
      EGender: student?.gender,
      ECitizenship: student?.citizenship,
    });
  }, [reset, student]);

  return (
    <Fragment key="dashboard-biodata">
      <div className="flex flex-col items-center lg:items-start p-5 lg:p-0 lg:py-4">
        <h1 className="text-slate-5">
          PMB <span className="text-secondary-green-4"> / Data diri</span>
        </h1>
        <p className="text-lg font-bold text-secondary-green-4">Pengisian data diri</p>
      </div>

      {/* Section Biodata */}
      <section className="flex flex-col rounded-lg gap-6 w-full bg-slate-1 ">
        {/* Section Biodata diri pendaftar */}
        <section className="flex flex-col gap-8 py-10 w-full justify-center items-center rounded-lg bg-primary-white overflow-x-hidden">
          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-6 justify-start w-full items-center"
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
              <section className="flex flex-wrap justify-start w-70% items-center lg:flex lg:justify-start lg:gap-x-3 lg:items-center  gap-y-4 lg:w-55% md:w-[70vw] md:flex md:flex-wrap md:justify-between md:gap-x-8 xl:flex xl:flex-wrap xl:justify-between xl:gap-x-8">
                <div className="flex flex-col gap-2 xl:gap-4">
                  <h3 className="text-xs font-semibold">Jenis Kelamin</h3>
                  <div className="flex items-center gap-6">
                    <RadioButton
                      name="gender"
                      label="Laki-laki"
                      control={control}
                      id="l"
                      size="lg"
                      required
                      onChange={handleChange}
                      value="MALE"
                      variant="primary"
                      isChecked={radioSelected?.EGender === "MALE"}
                    />
                    <RadioButton
                      name="gender"
                      label="Perempuan"
                      control={control}
                      id="p"
                      size="lg"
                      onChange={handleChange}
                      value="FEMALE"
                      required
                      variant="primary"
                      isChecked={radioSelected?.EGender === "FEMALE"}
                    />
                  </div>
                </div>
                <SelectOption
                  labels="Agama"
                  className=" rounded-md text-primary-black w-70% lg:w-auto xl:w-[25vw] md:w-[33vw]"
                  placeholder="Agama"
                  options={[
                    {
                      label: "Islam",
                      value: EReligion.ISLAM,
                    },
                    {
                      label: "Kristen",
                      value: EReligion.KRISTEN,
                    },
                    {
                      label: "Buddha",
                      value: EReligion.BUDHA,
                    },
                    {
                      label: "Hindu",
                      value: EReligion.HINDU,
                    },
                    {
                      label: "Konghucu",
                      value: EReligion.KONGHUCU,
                    },
                    {
                      label: "Katolik",
                      value: EReligion.KATOLIK,
                    },
                  ]}
                  isClearable={true}
                  isSearchable={true}
                  name="province"
                  control={control}
                  isMulti={false}
                />
              </section>

              <section className="grid grid-cols-1 lg:flex lg:justify-between lg:items-center gap-y-4 mt-2 lg:mt-6 lg:w-55% md:w-[70vw] md:flex md:flex-wrap md:justify-between">
                <TextField
                  inputHeight="h-10"
                  name="birth_place"
                  variant="sm"
                  type="text"
                  placeholder="Masukan Kota tempat lahir"
                  required
                  labelclassname="text-sm font-semibold"
                  label="Tempat Lahir"
                  inputWidth="w-70% lg:w-[27vw] xl:w-[25vw] text-base md:w-[33vw]"
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
                  <SelectOption
                    name="marital_status"
                    labels="Status"
                    placeholder="Status"
                    className=" rounded-md text-primary-black w-70% lg:w-auto xl:w-[25vw] md:w-[33vw]"
                    options={[
                      {
                        label: "Menikah",
                        value: "Married",
                      },
                      {
                        label: "Belum Menikah",
                        value: "Single",
                      },
                    ]}
                    isSearchable={false}
                    control={control}
                    isMulti={false}
                    isClearable={true}
                  />
                </div>
                <div className="flex flex-col gap-1 xl:gap-2 mt-1 xl:ml-0 xl:self-start xl:w-[25vw] place-self-start">
                  {" "}
                  <h3 className="text-xs font-semibold">Kewarganegaraan</h3>
                  <div className="flex items-center gap-2">
                    <RadioButton
                      name="citizenship"
                      label="WNI"
                      control={control}
                      required
                      id="wni"
                      onChange={handleChange}
                      inputname="kewarganegaraan"
                      value="WNI"
                      variant="primary"
                      isChecked={radioSelected?.ECitizenship === "WNI"}
                    />
                    <RadioButton
                      name="citizenship"
                      label="WNA"
                      control={control}
                      id="wna"
                      onChange={handleChange}
                      inputname="kewarganegaraan"
                      required
                      value="WNA"
                      variant="primary"
                      isChecked={radioSelected?.ECitizenship === "WNA"}
                    />
                  </div>
                </div>
              </section>

              <section className="flex flex-wrap w-full gap-x-1 justify-center items-center lg:flex lg:justify-between lg:items-center gap-y-4 mt-2 lg:mt-6 lg:w-55% md:w-[70vw] md:flex md:flex-wrap md:justify-between">
                <SelectOption
                  name="country"
                  labels="Asal Negara"
                  placeholder="Asal Negara"
                  className="bg-slate-3 rounded-md text-primary-black w-70% lg:w-auto xl:w-[25vw] md:w-[33vw]"
                  labelClassName="font-bold"
                  options={[
                    {
                      label: "Indonesia",
                      value: "Indonesia",
                    },
                    {
                      label: "Malaysia",
                      value: "Malaysia",
                    },
                    {
                      label: "Singapura",
                      value: "Singapura",
                    },
                  ]}
                  isClearable={true}
                  isSearchable={true}
                  control={control}
                  isMulti={false}
                />
                <SelectOption
                  labels="Provinsi"
                  className="bg-slate-3 rounded-md text-primary-black w-70% lg:w-auto xl:w-[25vw] md:w-[33vw]"
                  labelClassName="font-bold"
                  options={provinceOptions || []}
                  placeholder="Provinsi"
                  isSearchable={true}
                  name="province"
                  isClearable={true}
                  control={control}
                  isMulti={false}
                />
              </section>
              <section className="flex flex-wrap w-full gap-x-1 justify-center items-center  lg:flex lg:justify-between lg:items-center gap-y-4 mt-2 lg:mt-6 lg:w-55% md:w-[70vw] md:flex md:flex-wrap md:justify-between">
                <SelectOption
                  labels="City"
                  className="rounded-md text-primary-black  w-70% lg:w-auto xl:w-[25vw] md:w-[33vw]"
                  labelClassName="font-bold"
                  options={cityOptions || []}
                  placeholder="Kota/Kabupaten"
                  isSearchable={true}
                  name="city"
                  isClearable={true}
                  control={control}
                  isMulti={false}
                  disabled={!watch("province")}
                />
                <SelectOption
                  labels="Kecamatan"
                  className="rounded-md text-primary-black w-70% lg:w-auto xl:w-[25vw] md:w-[33vw]"
                  labelClassName="font-bold"
                  options={subDistrictOptions || []}
                  placeholder="Kecamatan"
                  isSearchable={true}
                  name="subdistrict"
                  control={control}
                  isMulti={false}
                  isClearable={true}
                  disabled={!watch("city")}
                />
              </section>
              <section className="flex lg:flex-row flex-col w-[70vw] gap-x-1 justify-between items-start  lg:flex lg:justify-between lg:items-start mt-2 gap-y-4 lg:mt-6 lg:w-55% md:flex md:flex-wrap md:w-[70vw] md:justify-between">
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
                <div>
                  <TextField
                    inputHeight="h-10"
                    name="postal_code"
                    variant="md"
                    type="text"
                    labelclassname="text-sm "
                    label="Kode Pos"
                    inputWidth="w-26 text-base"
                    control={control}
                  />
                </div>
              </section>
              <section className="flex flex-wrap justify-start w-70% items-center lg:flex lg:justify-start lg:gap-x-3 lg:items-center  gap-y-4 lg:w-55% md:w-[70vw] md:flex md:flex-wrap md:justify-start md:gap-x-8 xl:flex xl:flex-wrap xl:justify-between xl:gap-x-8 pb-4">
                <div className="flex flex-col gap-2 xl:gap-4">
                  <h3 className="text-xs font-semibold">Berkebutuhan Khusus</h3>
                  <div className="flex items-center gap-6">
                    <RadioButton
                      name="difabel"
                      label="Ya"
                      control={control}
                      id="y"
                      size="lg"
                      required
                      onChange={handleChange}
                      value="Ya"
                      variant="primary"
                      isChecked={radioSelected?.EGender === "True"}
                    />
                    <RadioButton
                      name="undifabel"
                      label="Tidak"
                      control={control}
                      id="n"
                      size="lg"
                      onChange={handleChange}
                      value="Tidak"
                      required
                      variant="primary"
                      isChecked={radioSelected?.EGender === "False"}
                    />
                  </div>
                </div>
                <SelectOption
                  labels="Kategori Difabel"
                  className=" rounded-md text-primary-black lg:w-auto w-70% xl:w-[25vw] md:w-[33vw]"
                  placeholder="Kategori Difabel"
                  options={[
                    {
                      label: "Tuna Rungu",
                      value: "Tuna Rungu",
                    },
                    {
                      label: "Tuna Daksa",
                      value: "Tuna Daksa",
                    },
                    {
                      label: "Tuna Netra",
                      value: "Tuna Netra",
                    },
                    {
                      label: "Tuna Wicara",
                      value: "Tuna Wicara",
                    },
                  ]}
                  isClearable={true}
                  isSearchable={true}
                  name="province"
                  control={control}
                  isMulti={false}
                />
              </section>
            </Accordion>

            {/* Accordion Data Pndidikan */}
            {/* section form data pendidikan */}
            <Accordion
              title="Data Pendidikan"
              className="w-full h-auto mt-[2rem] flex flex-col gap-5 items-center lg:items-baseline lg:ml-[3vw] xl:ml-[5vw] pb-6 md:pb-0"
            >
              <section className="flex flex-wrap justify-center items-center gap-x-1 w-full lg:flex lg:items-center gap-y-4 lg:justify-between lg:w-55% md:flex md:flex-wrap md:w-[70vw] md:justify-between">
                <SelectOption
                  name="school_type"
                  labels="Jenis Pendidikan Asal"
                  placeholder="Jenis Pendidikan"
                  className=" rounded-md text-primary-black w-70% lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
                  options={[
                    {
                      label: "SMA",
                      value: "SMA",
                    },
                    {
                      label: "SMK",
                      value: "SMK",
                    },
                    {
                      label: "Madrasah",
                      value: "MA",
                    },
                  ]}
                  isSearchable={false}
                  isClearable={true}
                  control={control}
                  isMulti={false}
                />
                <SelectOption
                  name="graduation_year"
                  labels="Tahun Lulus"
                  placeholder="Tahun Lulus"
                  options={[
                    {
                      label: "2020",
                      value: "2020",
                    },
                    {
                      label: "2021",
                      value: "2021",
                    },
                  ]}
                  className=" rounded-md text-primary-black w-70% lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
                  isSearchable={false}
                  control={control}
                  isMulti={false}
                />
                <SelectOption
                  name="school_major"
                  labels="Jurusan Pendidikan Asal"
                  placeholder="Jurusan Pendidikan"
                  options={[
                    {
                      label: "IPA",
                      value: "MIPA",
                    },
                    {
                      label: "IPS",
                      value: "IPS",
                    },
                    {
                      label: "Keagamaan",
                      value: "Agama",
                    },
                  ]}
                  className=" rounded-md text-primary-black w-70% lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
                  isSearchable={false}
                  control={control}
                  isMulti={false}
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
                  inputWidth="w-70% lg:w-[27vw] xl:w-[25vw] text-base md:w-[33vw] "
                  control={control}
                />
                <SelectOption
                  name="school_name"
                  labels="Nama Sekolah Asal"
                  placeholder="Masukan Sekolah Asal"
                  options={[
                    {
                      label: "SMAN 4 Bandung",
                      value: "SMAN 4 Bandung",
                    },
                    {
                      label: "SMAN 5 Bandung",
                      value: "SMAN 5 Bandung",
                    },
                    {
                      label: "SMK 1 Bandung",
                      value: "SMAN 1 Bandung",
                    },
                  ]}
                  className="rounded-md text-primary-black w-70% lg:w-[27vw] xl:w-[25vw] text-base md:w-[33vw] "
                  isSearchable={true}
                  control={control}
                  isMulti={false}
                  isClearable={true}
                />
              </section>

              <section className="flex flex-wrap w-full justify-center items-center gap-x-1 lg:flex lg:items-start gap-y-4 lg:justify-between lg:w-55% md:flex md:flex-wrap md:w-[70vw] md:justify-between">
                <SelectOption
                  labels="Provinsi"
                  className="bg-slate-3 rounded-md text-primary-black w-70% lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
                  labelClassName="font-bold"
                  options={provinceOptions || []}
                  placeholder="Provinsi"
                  isSearchable={true}
                  name="school_province"
                  isClearable={true}
                  control={control}
                  isMulti={false}
                />
                <SelectOption
                  labels="City"
                  className="rounded-md text-primary-black w-70% lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
                  labelClassName="font-bold"
                  options={cityOptions || []}
                  placeholder="Kota/Kabupaten"
                  isSearchable={true}
                  name="school_city"
                  isClearable={true}
                  control={control}
                  isMulti={false}
                  disabled={!watch("province")}
                />
                <SelectOption
                  labels="Kecamatan"
                  className="rounded-md text-primary-black w-70% lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
                  labelClassName="font-bold"
                  options={subDistrictOptions || []}
                  placeholder="Kecamatan"
                  isSearchable={true}
                  name="school_subdistrict"
                  control={control}
                  isMulti={false}
                  isClearable={true}
                  disabled={!watch("city")}
                />
              </section>

              <section className="flex lg:flex-row flex-col w-[70vw] gap-x-1 justify-between items-start  lg:flex lg:justify-between lg:items-start mt-2 gap-y-4 lg:mt-6 lg:w-55% md:flex md:flex-wrap md:w-[70vw] md:justify-between">
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
                    inputWidth="w-26 text-base"
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
                  required
                  placeholder="Nama Lengkap Ayah Kandung"
                  labelclassname="text-sm font-semibold"
                  label="Nama Ayah"
                  inputWidth="w-70% lg:w-[26vw] max-w-20% xl:w-[25vw] md:w-[33vw]"
                  control={control}
                />
                <SelectOption
                  name="school_subdistrict"
                  labels="Status Ayah"
                  placeholder="Status Ayah"
                  options={[
                    {
                      label: "Meninggal",
                      value: "Meninggal",
                    },
                    {
                      label: "Hidup",
                      value: "Hidup",
                    },
                  ]}
                  className=" rounded-md text-primary-black w-70% lg:w-[12vw] md:w-[16vw]"
                  isSearchable={false}
                  control={control}
                  isMulti={false}
                  isClearable={true}
                />
                <SelectOption
                  name="father_education"
                  labels="Pendidikan Terahir Ayah"
                  placeholder="Pendidikan"
                  options={[
                    {
                      label: "SMA",
                      value: "SMA",
                    },
                    {
                      label: "SMK",
                      value: "SMK",
                    },
                    {
                      label: "Stara S1",
                      value: "S1",
                    },
                  ]}
                  className=" rounded-md text-primary-black w-70% lg:w-[12vw] md:w-[16vw]"
                  isSearchable={false}
                  control={control}
                  isMulti={false}
                  isClearable={true}
                />
                <SelectOption
                  name="father_profecy"
                  labels="Pekerjaan Ayah"
                  placeholder="Pilih Pekerjaan"
                  options={[
                    {
                      label: "PNS",
                      value: "Guru",
                    },
                    {
                      label: "Buruh",
                      value: "Berdagang",
                    },
                    {
                      label: "Polri",
                      value: "Polisi",
                    },
                  ]}
                  className=" rounded-md text-primary-black w-70% lg:w-[26vw] md:w-[33vw]"
                  isSearchable={true}
                  control={control}
                  isMulti={false}
                  isClearable={true}
                />
                <SelectOption
                  name="father_income"
                  labels="Pendapatan Ayah ( Per Bulan )"
                  placeholder="Pilih Pendapatan"
                  options={[
                    {
                      value: "Rendah",
                      label: "0 - 1.200.000",
                    },
                    {
                      value: "Menengah",
                      label: "1.200.000 - 3.200.000",
                    },
                    {
                      value: "Tinggi",
                      label: "3.200.000 - 6.000.000",
                    },
                  ]}
                  className=" rounded-md text-primary-black w-70% lg:w-[26.5vw] md:w-[33vw]"
                  isSearchable={false}
                  control={control}
                  isMulti={false}
                  isClearable={true}
                />
              </section>
              {/* Ibu */}
              <h1 className="font-bold text-xl mt-3  lg:pl-0 md:pl-[11vw] xl:pl-0 place-self-start pl-10">
                Profil Ibu
              </h1>
              <section className="flex flex-wrap w-full justify-center items-start gap-x-1 lg:flex  lg:flex-wrap lg:gap-6 xl:gap-1 gap-y-4 mt-2 lg:items-center lg:w-55% md:flex md:flex-wrap md:w-[70vw] md:justify-between">
                <TextField
                  inputHeight="h-10"
                  name="mother_name"
                  variant="sm"
                  type="text"
                  required
                  placeholder="Nama Lengkap Ibu Kandung"
                  labelclassname="text-sm font-semibold"
                  label="Nama Ibu"
                  inputWidth="w-70% lg:w-[26vw] max-w-20% xl:w-[25vw] md:w-[33vw]"
                  control={control}
                />
                <SelectOption
                  name="status_mother"
                  labels="Status Ibu"
                  placeholder="Status Ibu"
                  options={[
                    {
                      label: "Meninggal",
                      value: "Meninggal",
                    },
                    {
                      label: "Hidup",
                      value: "Hidup",
                    },
                  ]}
                  className=" rounded-md text-primary-black w-70% lg:w-[12vw] md:w-[16vw]"
                  isSearchable={false}
                  control={control}
                  isMulti={false}
                  isClearable={true}
                />
                <SelectOption
                  name="mother_education"
                  labels="Pendidikan Terahir Ibu"
                  placeholder="Pendidikan"
                  options={[
                    {
                      label: "SMA",
                      value: "SMA",
                    },
                    {
                      label: "SMK",
                      value: "SMK",
                    },
                    {
                      label: "Stara S1",
                      value: "S1",
                    },
                  ]}
                  className=" rounded-md text-primary-black w-70% lg:w-[12vw] md:w-[16vw]"
                  isSearchable={false}
                  control={control}
                  isMulti={false}
                  isClearable={true}
                />
                <SelectOption
                  name="mother_profecy"
                  labels="Pekerjaan Ibu"
                  placeholder="Pilih Pekerjaan"
                  options={[
                    {
                      label: "PNS",
                      value: "Guru",
                    },
                    {
                      label: "Buruh",
                      value: "Berdagang",
                    },
                    {
                      label: "IRT",
                      value: "IRT",
                    },
                  ]}
                  className=" rounded-md text-primary-black w-70% lg:w-[26vw] md:w-[33vw]"
                  isSearchable={true}
                  control={control}
                  isMulti={false}
                  isClearable={true}
                />
                <SelectOption
                  name="mother_income"
                  labels="Pendapatan Ibu ( Per Bulan )"
                  placeholder="Pilih Pendapatan"
                  options={[
                    {
                      value: "Rendah",
                      label: "0 - 1.200.000",
                    },
                    {
                      value: "Menengah",
                      label: "1.200.000 - 3.200.000",
                    },
                    {
                      value: "Tinggi",
                      label: "3.200.000 - 6.000.000",
                    },
                  ]}
                  className=" rounded-md text-primary-black w-70% lg:w-[26.5vw] md:w-[33vw]"
                  isSearchable={false}
                  control={control}
                  isMulti={false}
                  isClearable={true}
                />
              </section>
              {/* Parent Address */}
              <h1 className="font-bold text-xl mt-3  lg:pl-0 md:pl-[11vw] xl:pl-0 place-self-start pl-10">
                Alamat Orang Tua
              </h1>
              <section className="flex flex-wrap w-full justify-center items-center gap-x-1 lg:flex lg:items-start gap-y-4 lg:justify-between lg:w-55% md:flex md:flex-wrap md:w-[70vw] md:justify-between">
                <SelectOption
                  labels="Provinsi"
                  className="bg-slate-3 rounded-md text-primary-black w-70% lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
                  labelClassName="font-bold"
                  options={provinceOptions || []}
                  placeholder="Provinsi"
                  isSearchable={true}
                  name="address_province"
                  isClearable={true}
                  control={control}
                  isMulti={false}
                />
                <SelectOption
                  labels="City"
                  className="rounded-md text-primary-black w-70% lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
                  labelClassName="font-bold"
                  options={cityOptions || []}
                  placeholder="Kota/Kabupaten"
                  isSearchable={true}
                  name="adress_city"
                  isClearable={true}
                  control={control}
                  isMulti={false}
                  disabled={!watch("province")}
                />
                <SelectOption
                  labels="Kecamatan"
                  className="rounded-md text-primary-black w-70% lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
                  labelClassName="font-bold"
                  options={subDistrictOptions || []}
                  placeholder="Kecamatan"
                  isSearchable={true}
                  name="adress_subdistrict"
                  control={control}
                  isMulti={false}
                  isClearable={true}
                  disabled={!watch("city")}
                />
              </section>
              <section className="lex lg:flex-row flex-col w-[70vw] gap-x-1 justify-between items-start  lg:flex lg:justify-between lg:items-start mt-2 gap-y-4 lg:mt-6 lg:w-55% md:flex md:flex-wrap md:w-[70vw] md:justify-between">
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
                    inputWidth="w-26 text-base"
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
              <section className="flex flex-wrap w-full justify-center items-start gap-x-1 lg:flex  lg:flex-wrap lg:gap-6 xl:gap-1 gap-y-4 mt-2 lg:items-center lg:w-55% md:flex md:flex-wrap md:w-[70vw] md:justify-between">
                <TextField
                  inputHeight="h-10"
                  name="guardian_name"
                  placeholder="Nama Lengkap Wali"
                  variant="sm"
                  type="text"
                  labelclassname="text-sm font-semibold"
                  label="Nama Wali"
                  inputWidth="w-70% lg:w-[26vw] max-w-20% xl:w-[25vw] md:w-[33vw]"
                  control={control}
                />
                <SelectOption
                  name="status_gardian"
                  labels="Status Wali"
                  placeholder="Status Wali"
                  options={[
                    {
                      label: "Meninggal",
                      value: "Meninggal",
                    },
                    {
                      label: "Hidup",
                      value: "Hidup",
                    },
                  ]}
                  className=" rounded-md text-primary-black w-70% lg:w-[12vw] md:w-[16vw]"
                  isSearchable={false}
                  control={control}
                  isMulti={false}
                  isClearable={true}
                />
                <SelectOption
                  name="guardian_education"
                  labels="Pendidikan Terahir Wali"
                  placeholder="Pendidikan"
                  options={[
                    {
                      label: "SMA",
                      value: "SMA",
                    },
                    {
                      label: "SMK",
                      value: "SMK",
                    },
                    {
                      label: "Stara S1",
                      value: "S1",
                    },
                  ]}
                  className=" rounded-md text-primary-black w-70% lg:w-[12vw] md:w-[16vw]"
                  isSearchable={false}
                  control={control}
                  isMulti={false}
                  isClearable={true}
                />
                <SelectOption
                  name="guardian_profecy"
                  labels="Pekerjaan Wali"
                  placeholder="Pilih Pekerjaan"
                  options={[
                    {
                      label: "PNS",
                      value: "Guru",
                    },
                    {
                      label: "Buruh",
                      value: "Berdagang",
                    },
                    {
                      label: "IRT",
                      value: "IRT",
                    },
                  ]}
                  className=" rounded-md text-primary-black w-70% lg:w-[26vw] md:w-[33vw]"
                  isSearchable={true}
                  control={control}
                  isMulti={false}
                  isClearable={true}
                />
                <SelectOption
                  name="guardian_income"
                  labels="Pendapatan Wali ( Per Bulan )"
                  placeholder="Pilih Pendapatan"
                  options={[
                    {
                      value: "Rendah",
                      label: "0 - 1.200.000",
                    },
                    {
                      value: "Menengah",
                      label: "1.200.000 - 3.200.000",
                    },
                    {
                      value: "Tinggi",
                      label: "3.200.000 - 6.000.000",
                    },
                  ]}
                  className=" rounded-md text-primary-black w-70% lg:w-[26.5vw] md:w-[33vw]"
                  isSearchable={false}
                  control={control}
                  isMulti={false}
                  isClearable={true}
                />
              </section>
              <h1 className="font-bold text-xl mt-3  lg:pl-0 md:pl-[11vw] xl:pl-0 place-self-start pl-10">
                Alamat Wali
              </h1>
              <section className="flex flex-wrap w-full justify-center items-center gap-x-1 lg:flex lg:items-start gap-y-4 lg:justify-between lg:w-55% md:flex md:flex-wrap md:w-[70vw] md:justify-between">
                <SelectOption
                  labels="Provinsi"
                  className="bg-slate-3 rounded-md text-primary-black w-70% lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
                  labelClassName="font-bold"
                  options={provinceOptions || []}
                  placeholder="Provinsi"
                  isSearchable={true}
                  name="address2_province"
                  isClearable={true}
                  control={control}
                  isMulti={false}
                />
                <SelectOption
                  labels="City"
                  className="rounded-md text-primary-black w-70% lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
                  labelClassName="font-bold"
                  options={cityOptions || []}
                  placeholder="Kota/Kabupaten"
                  isSearchable={true}
                  name="adress2_city"
                  isClearable={true}
                  control={control}
                  isMulti={false}
                  disabled={!watch("province")}
                />
                <SelectOption
                  labels="Kecamatan"
                  className="rounded-md text-primary-black w-70% lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
                  labelClassName="font-bold"
                  options={subDistrictOptions || []}
                  placeholder="Kecamatan"
                  isSearchable={true}
                  name="adress2_subdistrict"
                  control={control}
                  isMulti={false}
                  isClearable={true}
                  disabled={!watch("city")}
                />
              </section>
              <section className="lex lg:flex-row flex-col w-[70vw] gap-x-1 justify-between items-start  lg:flex lg:justify-between lg:items-start mt-2 gap-y-4 lg:mt-6 lg:w-55% md:flex md:flex-wrap md:w-[70vw] md:justify-between">
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
                <div className="col-end-5">
                  <TextField
                    inputHeight="h-10"
                    name="guardian_postal_code"
                    variant="md"
                    type="text"
                    labelclassname="text-sm "
                    label="Kode Pos"
                    inputWidth="w-26 text-base"
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

            <Button variant="filled" size="md" width="w-50% lg:w-25% xl:w-15% ">
              Submit
            </Button>
          </form>
        </section>
      </section>
    </Fragment>
  );
};
