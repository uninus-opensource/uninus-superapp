import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  RadioButton,
  SelectOption,
  TSelectOption,
  TextField,
} from "@uninus/web/components";
import {
  useCitizenGet,
  useCityGet,
  useCountryGet,
  useDisabilitiesGet,
  useGenderGet,
  useOccupationGet,
  useOccupationPositionGet,
  useProvinceGet,
  useReligionGet,
  useSalaryGet,
  useStatusGet,
  useStudentDataById,
  useSubdistrictGet,
} from "@uninus/web/services";
import { ChangeEvent, FC, ReactElement, useEffect, useMemo, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { TVSDataDiri, VSDataDiri } from "./schema";
import { GroupBase, SelectInstance } from "react-select";
import { useBiodataUpdate } from "../../../../../user";
import { dataDiri, disabilitiesDataDiri, occupationS2S3 } from "../../../../../user";

export const EditDataDiri: FC = (): ReactElement => {
  const [occValue, setOccValue] = useState<string | null>(null);
  const [disValue, setDisValue] = useState<string | null>(null);
  const { getStudentbyId } = useStudentDataById();

  const student = useMemo(() => {
    return getStudentbyId;
  }, [getStudentbyId]);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues | TVSDataDiri>({
    resolver: zodResolver(VSDataDiri),
    mode: "all",
  });

  const [locationMeta] = useState({
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
    province_id: watch("province_id"),
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
    city_id: watch("city_id"),
    search: "",
  });

  const subDistrictOptions = useMemo(
    () =>
      getSubdistrict?.subdistrict?.map((subdistrict) => ({
        label: subdistrict?.name,
        value: subdistrict?.id.toString(),
      })),
    [getSubdistrict?.subdistrict],
  );

  const provinceId = watch("province_id");

  useEffect(() => {
    setValue("city_id", null);
  }, [provinceId, setValue]);

  const [religion] = useState({
    search: "",
  });

  const { data: getReligion } = useReligionGet(religion);

  const religionOptions = useMemo(
    () =>
      getReligion?.religion?.map((religion) => ({
        label: religion?.name,
        value: religion?.id.toString(),
      })),
    [getReligion?.religion],
  );

  const [status] = useState({
    search: "",
  });

  const { data: getStatus } = useStatusGet(status);

  const statusOptions = useMemo(
    () =>
      getStatus?.maritalStatus?.map((status) => ({
        label: status?.name,
        value: status?.id.toString(),
      })),
    [getStatus?.maritalStatus],
  );

  const [disabilities] = useState({
    search: "",
  });

  const { data: getDisabilities } = useDisabilitiesGet(disabilities);

  const disabilitiesOptions = useMemo(
    () =>
      getDisabilities?.disabilities?.map((disabilities) => ({
        label: disabilities?.name,
        value: disabilities?.id.toString(),
      })),
    [getDisabilities?.disabilities],
  );

  const [gender] = useState({
    search: "",
  });

  const { data: getGender } = useGenderGet(gender);

  const genderOptions = useMemo(
    () =>
      getGender?.gender?.map((gender) => ({
        label: gender?.name,
        value: gender?.id.toString(),
      })),
    [getGender?.gender],
  );

  const [citizen] = useState({
    search: "",
  });

  const { data: getCitizen } = useCitizenGet(citizen);

  const citizenOptions = useMemo(
    () =>
      getCitizen?.citizenship?.map((citizen) => ({
        label: citizen?.name,
        value: citizen?.id.toString(),
      })),
    [getCitizen?.citizenship],
  );

  const { data: getCountry } = useCountryGet({
    citizenship_id: watch("citizenship_id"),
    search: "",
  });

  const countryOptions = useMemo(
    () =>
      getCountry?.country?.map((country) => ({
        label: country?.name,
        value: country?.id.toString(),
      })),
    [getCountry?.country],
  );

  const [occupation] = useState({
    search: "",
  });

  const { data: getOccupation } = useOccupationGet(occupation);

  const occupationOptions = useMemo(
    () =>
      getOccupation?.occupation?.map((occupation) => ({
        label: occupation?.name,
        value: occupation?.id.toString(),
      })),
    [getOccupation?.occupation],
  );

  useEffect(() => {
    setValue("occupation_id", undefined);
  }, [setValue, occValue]);

  const { data: getOccupationPosition } = useOccupationPositionGet({
    search: "",
    occupation_id: watch("occupation_id"),
  });

  const occupationPositionOptions = useMemo(
    () =>
      getOccupationPosition?.occupation_position?.map((occupationPosition) => ({
        label: occupationPosition?.name,
        value: occupationPosition?.id.toString(),
      })),
    [getOccupationPosition?.occupation_position],
  );

  const [salary] = useState({
    search: "",
  });

  const { data: getSalary } = useSalaryGet(salary);

  const salaryOptions = useMemo(
    () =>
      getSalary?.salary?.map((salary) => ({
        label: salary?.name,
        value: salary?.id.toString(),
      })),
    [getSalary?.salary],
  );

  useEffect(() => {
    reset(student);

    if (student?.disabilities_id) {
      setDisValue("Ya");
    } else {
      setDisValue("Tidak");
    }
    if (student?.occupation_id) {
      setOccValue("Sudah");
    } else {
      setOccValue("Belum");
    }
  }, [student, reset, getStudentbyId]);

  useEffect(() => {
    if (disValue === "Tidak") {
      setValue("disabilities_id", undefined);
    }
  }, [disValue, setValue]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDisValue(e.target.value);
  };

  const handleOccupation = (e: ChangeEvent<HTMLInputElement>): void => {
    setOccValue(e.target.value);
  };

  const citizenref = useRef<SelectInstance<TSelectOption, true, GroupBase<TSelectOption>>>(null);
  const provinceref = useRef<SelectInstance<TSelectOption, true, GroupBase<TSelectOption>>>(null);
  const subdisref = useRef<SelectInstance<TSelectOption, true, GroupBase<TSelectOption>>>(null);
  const countryref = useRef<SelectInstance<TSelectOption, true, GroupBase<TSelectOption>>>(null);

  const citizenshipId = watch("citizenship_id");

  useEffect(() => {
    if (citizenref.current) {
      citizenref.current.clearValue();
    }

    if (provinceref.current) {
      provinceref.current.clearValue();
    }

    if (subdisref.current) {
      subdisref.current.clearValue();
    }

    if (countryref.current) {
      countryref.current.clearValue();
    }
  }, [citizenshipId]);

  const { mutate } = useBiodataUpdate();

  const onSubmit = handleSubmit((data) => {
    dataDiri.fullname = data?.fullname;
    dataDiri.nik = data?.nik;
    dataDiri.nisn = data?.nisn;
    dataDiri.no_kk = data?.no_kk;
    dataDiri.gender_id = Number(data?.gender_id);
    dataDiri.religion_id = Number(data?.religion_id);
    dataDiri.birth_place = data?.birth_place;
    dataDiri.birth_date = data?.birth_date;
    dataDiri.marital_status_id = Number(data?.marital_status_id);
    dataDiri.citizenship_id = Number(data?.citizenship_id);
    dataDiri.country_id = Number(data?.country_id);
    dataDiri.province_id = Number(data?.province_id);
    dataDiri.city_id = Number(data?.city_id);
    dataDiri.subdistrict_id = Number(data?.subdistrict_id);
    dataDiri.address = data?.address;

    if (disValue === "Ya") {
      disabilitiesDataDiri.disabilities_id = Number(data?.disabilities_id);
    } else {
      disabilitiesDataDiri.disabilities_id = null;
    }

    if (occValue === "Sudah" && student?.degree_program_id !== 1) {
      occupationS2S3.occupation_id = Number(data?.occupation_id);
      if (data?.occupation_position_id) {
        occupationS2S3.occupation_position_id = Number(data?.occupation_position_id);
      } else {
        occupationS2S3.occupation_position_id = undefined as unknown as number;
      }
      occupationS2S3.company_name = data?.company_name;
      occupationS2S3.company_address = data?.company_address;
      occupationS2S3.salary_id = Number(data?.salary_id);
    }

    try {
      mutate(
        occValue === "Sudah" && student?.degree_program_id !== 1
          ? { ...dataDiri, ...occupationS2S3 }
          : occValue === "Sudah" && disValue === "Ya" && student?.degree_program_id !== 1
          ? { ...dataDiri, ...occupationS2S3, ...disabilitiesDataDiri }
          : occValue === null && student?.degree_program_id === 1 && disValue === "Ya"
          ? { ...dataDiri, ...disabilitiesDataDiri }
          : { ...dataDiri },
        {
          onSuccess: () => {
            setTimeout(() => {
              toast.success("Berhasil mengisi formulir", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }, 500);
          },
          onError: () => {
            setTimeout(() => {
              toast.error("Gagal mengisi formulir", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }, 500);
          },
        },
      );
    } catch (error) {
      toast.error(error as string, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  });

  return (
    <div>
      <form onSubmit={onSubmit} key="data-diri-form" noValidate className="bg-primary-white">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <section
          key="form-biodata"
          className="flex flex-wrap justify-center items-center gap-x-1 w-full lg:flex lg:items-center gap-y-4 lg:justify-between lg:w-[60vw] md:flex md:flex-wrap md:w-80% md:justify-between text-left xl:w-55%"
        >
          <div className="w-80% px-5 flex flex-col gap-y-4 md:flex-row md:w-full md:px-0 md:justify-between">
            <TextField
              placeholder="Nama Lengkap"
              name="fullname"
              label="Nama Lengkap"
              labelclassname="text-xl font-semibold"
              variant="sm"
              required
              disabled
              inputWidth="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
              inputHeight="h-10"
              type="text"
              control={control}
            />

            <SelectOption
              name="marital_status_id"
              labels="Status"
              labelClassName="font-bold text-xs py-2"
              placeholder={
                student?.marital_status_id
                  ? statusOptions?.find(
                      (status) => Number(status.value) === student?.marital_status_id,
                    )?.label
                  : "Status"
              }
              options={statusOptions || []}
              isSearchable={false}
              control={control}
              isMulti={false}
              isClearable={true}
              status={"error"}
              className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
              message={errors?.marital_status_id?.message as string}
            />
          </div>
          <div className="w-80% px-5 flex flex-col gap-y-4 md:flex-row md:w-full md:px-0 md:justify-between">
            <TextField
              placeholder="Nomor Handphone"
              name="phone_number"
              label="Nomor Handphone"
              labelclassname="text-xl font-semibold"
              variant="sm"
              required
              disabled
              inputWidth="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
              inputHeight="h-10"
              type="text"
              control={control}
            />
            <SelectOption
              name="citizenship_id"
              labels="Kewarganegaraan"
              labelClassName="font-bold text-xs py-2"
              placeholder={
                student?.citizenship_id
                  ? citizenOptions?.find(
                      (citizen) => Number(citizen.value) === student?.citizenship_id,
                    )?.label
                  : "Kewarganegaraan"
              }
              options={citizenOptions || []}
              isClearable={true}
              isSearchable={true}
              control={control}
              isMulti={false}
              required={true}
              status={"error"}
              className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
              message={errors?.citizenship_id?.message as string}
            />
          </div>
          <div className="w-80% px-5 flex flex-col gap-y-4 md:flex-row md:w-full md:px-0 md:justify-between">
            <TextField
              name="email"
              variant="sm"
              type="email"
              placeholder="email@gmail.com"
              labelclassname="text-sm font-semibold"
              label="Email"
              required
              inputWidth="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
              inputHeight="h-10"
              control={control}
              disabled
            />
            <SelectOption
              name="country_id"
              labels="Asal Negara"
              labelClassName="font-bold text-xs py-2"
              placeholder={
                student?.country_id
                  ? countryOptions?.find((country) => Number(country.value) === student?.country_id)
                      ?.label
                  : "Asal Negara"
              }
              options={countryOptions || []}
              isClearable={true}
              isSearchable={true}
              // ref={countryref}
              control={control}
              isMulti={false}
              required={false}
              status={"error"}
              className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
              message={errors?.country_id?.message as string}
            />
          </div>
          <div className="w-80% px-5 flex flex-col gap-y-4 md:flex-row md:w-full md:px-0 md:justify-between">
            <TextField
              inputHeight="h-10"
              name="nik"
              variant="sm"
              type="text"
              placeholder="Nomor dapat dilihat dari KK atau KTP"
              labelclassname="text-sm font-semibold"
              label="NIK"
              required
              inputWidth="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
              control={control}
              message={errors?.nik?.message as string}
              status={errors?.nik?.message ? "error" : "none"}
            />
            <SelectOption
              name="province_id"
              labels="Provinsi"
              placeholder={
                student?.province_id
                  ? provinceOptions?.find(
                      (province) => Number(province.value) === student?.province_id,
                    )?.label
                  : "Provinsi"
              }
              labelClassName="font-bold text-xs py-2"
              options={provinceOptions || []}
              isSearchable={true}
              isClearable={true}
              control={control}
              // ref={citizenref}
              isMulti={false}
              status={errors?.province_id?.message ? "error" : "none"}
              className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
              message={errors?.province_id?.message as string}
            />
          </div>
          <div className="w-80% px-5 flex flex-col gap-y-4 md:flex-row md:w-full md:px-0 md:justify-between">
            <TextField
              inputHeight="h-10"
              name="nisn"
              variant="sm"
              type="text"
              placeholder="Nomor Induk Siswa Nasional"
              labelclassname="text-sm font-semibold"
              label="NISN"
              required
              inputWidth="w-70% lg:w-[27vw] xl:w-[25vw] text-base md:w-[33vw]"
              control={control}
              message={errors?.nisn?.message as string}
              status={errors?.nisn?.message ? "error" : "none"}
            />
            <SelectOption
              name="city_id"
              labels="Kota/Kabupaten"
              placeholder={
                student?.city_id
                  ? cityOptions?.find((city) => Number(city.value) === student?.city_id)?.label
                  : "Kota/Kabupaten"
              }
              labelClassName="font-bold text-xs py-2"
              options={cityOptions || []}
              isSearchable={true}
              isClearable={true}
              // ref={provinceref}
              control={control}
              isMulti={false}
              status={"error"}
              className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
              message={errors?.city_id?.message as string}
            />
          </div>
          <div className="w-80% px-5 flex flex-col gap-y-4 md:flex-row md:w-full md:px-0 md:justify-between">
            <TextField
              inputHeight="h-10"
              name="no_kk"
              required
              variant="sm"
              type="text"
              placeholder="Nomor dapat dilihat di KK"
              labelclassname="text-sm font-semibold"
              label="No Kartu Keluarga"
              inputWidth="w-70% lg:w-[27vw] xl:w-[25vw] text-base md:w-[33vw] "
              control={control}
              message={errors?.no_kk?.message as string}
              status={errors?.no_kk?.message ? "error" : "none"}
            />
            <SelectOption
              name="subdistrict_id"
              labels="Kecamatan"
              placeholder={
                student?.subdistrict_id
                  ? subDistrictOptions?.find(
                      (subdistrict) => Number(subdistrict.value) === student?.subdistrict_id,
                    )?.label
                  : "Kecamatan"
              }
              labelClassName="font-bold text-xs py-2"
              options={subDistrictOptions || []}
              isSearchable={true}
              // ref={subdisref}
              control={control}
              isMulti={false}
              isClearable={true}
              status={"error"}
              className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
              message={errors?.subdistrict_id?.message as string}
            />
          </div>

          <div className="w-80% px-5 flex flex-col gap-y-4 md:flex-row md:w-full md:px-0 md:justify-between">
            <SelectOption
              labels="Jenis Kelamin"
              name="gender_id"
              labelClassName="font-bold text-xs py-2"
              placeholder={
                student?.gender_id
                  ? genderOptions?.find((gender) => Number(gender.value) === student?.gender_id)
                      ?.label
                  : "Jenis Kelamin"
              }
              options={genderOptions || []}
              isClearable={true}
              isSearchable={false}
              control={control}
              status={"error"}
              className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
              message={errors?.gender_id?.message as string}
            />

            <TextField
              inputHeight="h-10"
              name="address"
              variant="sm"
              type="text"
              required
              placeholder="Alamar Lengkap"
              labelclassname="text-sm font-semibold"
              label="Alamat Domisili"
              inputWidth="w-70% lg:w-[27vw] xl:w-[25vw] text-base md:w-[33vw]"
              control={control}
              message={errors?.address?.message as string}
              status={errors?.address?.message ? "error" : "none"}
            />
          </div>
          <div className="w-80% px-5 flex flex-col gap-y-4 md:flex-row md:w-full md:px-0 md:justify-between">
            <div className="w-full lg:w-[30%] py-2">
              <RadioButton
                name="difabel"
                label="Ya"
                fieldName="Berkebutuhan Khusus"
                control={control}
                options={[
                  { label: "Ya", value: "Ya" },
                  { label: "Tidak", value: "Tidak" },
                ]}
                size="lg"
                variant="primary"
                onChange={handleOnChange}
                buttonValue={disValue}
              />
            </div>
            <SelectOption
              name="religion_id"
              labels="Agama"
              labelClassName="font-bold text-xs py-2"
              placeholder={
                student?.religion_id
                  ? religionOptions?.find(
                      (religion) => Number(religion.value) === student?.religion_id,
                    )?.label
                  : "Agama"
              }
              options={religionOptions || []}
              isClearable={true}
              isSearchable={true}
              control={control}
              isMulti={false}
              status={"error"}
              className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
              message={errors?.religion_id?.message as string}
            />
          </div>
          <div className="w-80% px-5 flex flex-col gap-y-4 md:flex-row md:w-full md:px-0 md:justify-between">
            <TextField
              inputHeight="h-10"
              name="birth_place"
              variant="sm"
              type="text"
              required
              placeholder="Masukan Kota tempat lahir"
              labelclassname="text-sm font-semibold"
              label="Tempat Lahir"
              inputWidth="w-70% lg:w-[27vw] xl:w-[25vw] text-base md:w-[33vw]"
              control={control}
              message={errors?.birth_place?.message as string}
              status={errors?.birth_place?.message ? "error" : "none"}
            />

            <SelectOption
              name="disabilities_id"
              labels="Kategori Difabel"
              className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
              placeholder={
                student?.disabilities_id
                  ? disabilitiesOptions?.find(
                      (disabilities) => Number(disabilities.value) === student?.disabilities_id,
                    )?.label
                  : "Kategori Difabel"
              }
              labelClassName="font-bold text-xs py-2"
              options={disabilitiesOptions || []}
              isClearable={true}
              isSearchable={true}
              required={false}
              control={control}
              isMulti={false}
              // disabled={
              //   disValue === "Ya" && student?.disabilities_id
              //     ? true
              //     : disValue === "Tidak" && student?.disabilities_id
              //     ? true
              //     : disValue === "Ya"
              //     ? false
              //     : disValue === "Tidak"
              //     ? true
              //     : false
              // }
              status={"error"}
            />
          </div>
          <TextField
            inputHeight="h-10"
            name="birth_date"
            variant="sm"
            required
            type="date"
            labelclassname="text-xl font-semibold"
            label="Tanggal Lahir"
            inputWidth="lg:w-[27vw] xl:w-[25vw] md:w-[33vw] w-[70vw]"
            control={control}
            message={errors?.birth_date?.message as string}
          />

          {student?.degree_program_id !== 1 && (
            <section
              key="education"
              className="flex flex-wrap justify-center items-center gap-x-1 w-full lg:flex lg:items-center gap-y-4 lg:justify-between lg:w-[60VW] md:flex md:flex-wrap md:w-80% md:justify-between text-left"
            >
              <div className="w-full">
                <h1 className="text-left font-bold text-xl pl-6 md:pl-0 pb-8">Pekerjaan</h1>
              </div>
              <div className="w-80% px-5 flex flex-col gap-y-4 md:flex-row md:w-full md:px-0 md:justify-between">
                <RadioButton
                  name="bekerja"
                  label="Sudah"
                  fieldName="Status Bekerja"
                  control={control}
                  options={[
                    { label: "Sudah", value: "Sudah" },
                    { label: "Belum", value: "Belum" },
                  ]}
                  size="lg"
                  variant="primary"
                  onChange={handleOccupation}
                />
                <SelectOption
                  name="occupation_id"
                  labels="Pekerjaan"
                  placeholder={
                    student?.occupation_id
                      ? getOccupation?.occupation?.find(
                          (occupation) => occupation.id === student?.occupation_id,
                        )?.name
                      : "Pekerjaan"
                  }
                  labelClassName="text-left font-bold text-xs py-2"
                  options={occupationOptions || []}
                  isClearable={true}
                  isSearchable={true}
                  required={false}
                  control={control}
                  isMulti={false}
                  // disabled={
                  //   occValue === "Sudah" && student?.occupation_id
                  //     ? true
                  //     : occValue === "Belum" && student?.occupation_id
                  //     ? true
                  //     : occValue === "Sudah"
                  //     ? false
                  //     : occValue === "Belum"
                  //     ? true
                  //     : false
                  // }
                  status={"error"}
                  className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
                  message={errors?.occupation_id?.message as string}
                />
              </div>
              <div className="w-80% px-5 flex flex-col gap-y-4 md:flex-row md:w-full md:px-0 md:justify-between">
                <SelectOption
                  name="occupation_position_id"
                  labels="Jabatan"
                  placeholder={
                    student?.occupation_position_id
                      ? getOccupationPosition?.occupation_position?.find(
                          (occupation_position) =>
                            occupation_position.id === student?.occupation_position_id,
                        )?.name
                      : "Pilih Jabatan"
                  }
                  labelClassName="text-left font-bold text-xs py-2"
                  options={occupationPositionOptions || []}
                  isClearable={true}
                  isSearchable={true}
                  required={false}
                  control={control}
                  isMulti={false}
                  status={"error"}
                  className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
                  message={errors?.occupation_position_id?.message as string}
                />
                <TextField
                  inputHeight="h-10"
                  name="company_name"
                  variant="sm"
                  required
                  type="text"
                  placeholder="Nama Instansi"
                  labelclassname="text-left text-sm font-semibold"
                  label="Nama Instansi"
                  inputWidth="w-70% lg:w-[27vw] xl:w-[25vw] text-base md:w-[33vw] "
                  control={control}
                />
              </div>
              <div className="px-6 md:px-0 lg:px-0 w-full">
                <TextField
                  name="company_address"
                  variant="sm"
                  type="text"
                  labelclassname="text-left text-xl font-semibold"
                  label="Alamat Instansi"
                  control={control}
                  isTextArea
                  textAreaCols={30}
                  inputHeight="h-20"
                  inputWidth="md:w-[80vw] lg:w-[60vw] w-[70vw]"
                  className="resize-none bg-grayscale-2  "
                />
              </div>
              <SelectOption
                name="salary_id"
                labels="Penghasilan Per Bulan"
                labelClassName="text-left font-bold text-xs py-2"
                placeholder={
                  student?.salary_id
                    ? getSalary?.salary?.find((salary) => salary.id === student?.salary_id)?.name
                    : "Pilih Penghasilan"
                }
                options={salaryOptions || []}
                control={control}
                isClearable={true}
                isSearchable={true}
                isMulti={false}
                size="md"
                status="error"
                message={errors?.salary_id?.message as string}
              />
            </section>
          )}
          <div className="flex w-full justify-center lg:justify-end py-4 mt-8 gap-x-3">
            <Button type="submit" variant="filled-red" size="md" width="w-70% lg:w-15% xl:w-15%">
              Batal
            </Button>
            <Button type="submit" variant="filled" size="md" width="w-70% lg:w-15% xl:w-15%">
              Submit
            </Button>
          </div>
        </section>
      </form>
    </div>
  );
};
