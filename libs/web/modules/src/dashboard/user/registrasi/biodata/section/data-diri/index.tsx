import {
  Accordion,
  UploadField,
  TextField,
  RadioButton,
  SelectOption,
  Button,
} from "@uninus/web/components";
import { dataDiri, disabilitiesDataDiri, formBiodataOne, occupationS2S3 } from "../../store";
import { ChangeEvent, FC, ReactElement, useEffect, useMemo, useRef, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import {
  useCityGet,
  useProvinceGet,
  useStudentData,
  useSubdistrictGet,
  useOccupationGet,
  useSalaryGet,
  useGenderGet,
  useReligionGet,
  useCitizenGet,
  useCountryGet,
  useDisabilitiesGet,
  useStatusGet,
  useUpdateAvatar,
  useDashboardStateControl,
  useUpdateFullname,
} from "@uninus/web/services";
import { GroupBase, SelectInstance } from "react-select";
import { TSelectOption } from "@uninus/web/components";
import { useBiodataUpdate, useUploadFile } from "../../hooks";
import { ToastContainer, toast } from "react-toastify";
import { VSDataDiri, TVSDataDiri, TVSImage, VSImage } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditOutlined } from "@ant-design/icons";

export const DataDiriSection: FC = (): ReactElement => {
  const [isDisabled, setIsdisabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [disValue, setDisValue] = useState<string | null>(null);
  const [occValue, setOccValue] = useState<string | null>(null);
  const { getDashboardControlState, setDashboardControlState } = useDashboardStateControl();
  const { getStudent } = useStudentData();
  const { setUpdateAvatar } = useUpdateAvatar();
  const { setFullname } = useUpdateFullname();
  const student = useMemo(() => {
    return getStudent;
  }, [getStudent]);

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

  const {
    control: image,
    handleSubmit: imageHandleSubmit,
    formState: { errors: imageErrors },
  } = useForm<TVSImage>({
    mode: "all",
    resolver: zodResolver(VSImage),
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
        value: disabilities?.id,
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
  }, [student, reset, getStudent]);

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
  const { mutate: mutateUpload } = useUploadFile();
  const { mutate } = useBiodataUpdate();

  const imageSubmit = imageHandleSubmit((data) => {
    try {
      setIsLoading(true);
      mutateUpload(data, {
        onSuccess: (data) => {
          mutate(
            {
              avatar: data?.file_url,
            },
            {
              onSuccess: () => {
                setIsLoading(false);
                setUpdateAvatar(data?.file_url);
                setTimeout(() => {
                  toast.success("Berhasil Simpan Foto", {
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
        },
        onError: () => {
          setIsLoading(false);
          setTimeout(() => {
            toast.error("Gagal Simpan Foto", {
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
      });
    } catch (error) {
      console.log(error);
    }
  });
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

    watch("citizenship_id") === "1"
      ? (dataDiri.province_id = undefined as unknown as number)
      : (dataDiri.province_id = Number(data?.province_id));

    watch("citizenship_id") === "1"
      ? (dataDiri.city_id = undefined as unknown as number)
      : (dataDiri.city_id = Number(data?.city_id));

    watch("citizenship_id") === "1"
      ? (dataDiri.subdistrict_id = undefined as unknown as number)
      : (dataDiri.subdistrict_id = Number(data?.subdistrict_id));

    dataDiri.address = data?.address;

    if (disValue === "Ya") {
      disabilitiesDataDiri.disabilities_id = Number(data?.disabilities_id);
    } else {
      disabilitiesDataDiri.disabilities_id = null;
    }

    if (occValue === "Sudah" && student?.degree_program_id !== 1) {
      occupationS2S3.occupation_id = Number(data?.occupation_id);
      occupationS2S3.occupation_position = data?.occupation_position;
      occupationS2S3.company_name = data?.company_name;
      occupationS2S3.company_address = data?.company_address;
      occupationS2S3.salary_id = Number(data?.salary_id);
    }
    try {
      mutate(
        occValue === "Sudah" && student?.degree_program_id !== 1 && disValue === "Tidak"
          ? { ...dataDiri, ...occupationS2S3 }
          : occValue === "Sudah" && disValue === "Ya" && student?.degree_program_id !== 1
            ? { ...dataDiri, ...occupationS2S3, ...disabilitiesDataDiri }
            : occValue === "Belum" && student?.degree_program_id === 1 && disValue === "Ya"
              ? { ...dataDiri, ...disabilitiesDataDiri }
              : { ...dataDiri },
        {
          onSuccess: () => {
            setIsdisabled(true);
            setFullname(dataDiri.fullname);
            setDashboardControlState(!getDashboardControlState);
            setTimeout(() => {
              toast.success("Berhasil mengisi Data diri", {
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
              toast.error("Gagal mengisi Data diri", {
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
    <Accordion
      key="data-diri-section"
      title="Data Diri Pendaftar"
      titleClassName="lg:text-lg text-md font-extrabold text-secondary-green-4"
      className="w-full h-auto mt-[2rem] flex flex-col gap-5 items-center lg:items-baseline lg:ml-[3vw] xl:ml-[5vw] pb-6 md:pb-0"
    >
      <form
        key="upload-image-form"
        onSubmit={imageSubmit}
        className="w-full md:w-[80%] flex flex-col md:flex-row md:gap-x-10 items-center"
      >
        <UploadField
          name="file"
          classNameField="w-70% lg:w-auto"
          control={image}
          variant="custom"
          labelClassName="iconUpload"
          inputLabel={<EditOutlined className="text-3xl rounded-full" />}
          defaultImage={student?.avatar || "/illustrations/dummy-avatar.webp"}
          previewImage="w-[165px] h-[165px] bg-cover object-cover rounded-full -z-10"
          layoutInputClassName="flex flex-col justify-center items-center"
          preview={true}
          message={imageErrors?.file?.message}
        />
        <div className="flex flex-col w-full md:w-[80%] items-center md:items-start gap-y-3 ">
          <Button
            type="submit"
            variant="green-outline"
            size="sm"
            title="change-image"
            width="w-[30%] md:w-[35%] xl:w-[30%]"
            loading={isLoading}
            disabled={isLoading}
          >
            Simpan Gambar
          </Button>
          <p className="text-red-4 text-xs lg:text-sm">
            *Masukan foto formal berlatar belakang biru/merah
          </p>
        </div>
      </form>

      <form key="data-diri-form" onSubmit={onSubmit} noValidate>
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
          className="flex flex-wrap justify-center items-center gap-x-1 w-full lg:flex lg:items-center gap-y-4 lg:justify-between lg:w-55% md:flex md:flex-wrap md:w-80% md:justify-between text-left"
        >
          {formBiodataOne.map((biodata, idx) => (
            <TextField
              key={idx}
              placeholder={biodata.placeholder}
              name={biodata.name}
              label={biodata.item}
              labelclassname="text-xl font-semibold"
              variant="sm"
              required={biodata.required}
              disabled={biodata.disabled}
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
            type="text"
            placeholder="Nomor dapat dilihat dari KK atau KTP"
            labelclassname="text-sm font-semibold"
            label="NIK"
            required
            inputWidth="w-70% lg:w-[27vw] xl:w-[25vw] text-base md:w-[33vw] "
            control={control}
            disabled={isDisabled || !!student?.nik}
            message={errors?.nik?.message as string}
            status={errors?.nik?.message ? "error" : "none"}
          />
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
            disabled={isDisabled || !!student?.nisn}
            message={errors?.nisn?.message as string}
            status={errors?.nisn?.message ? "error" : "none"}
          />
          <div className="lg:w-full">
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
              disabled={isDisabled || !!student?.no_kk}
              message={errors?.no_kk?.message as string}
              status={errors?.no_kk?.message ? "error" : "none"}
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
              required
              disabled={isDisabled || !!student?.gender_id}
              status={"error"}
              className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
              message={errors?.gender_id?.message as string}
            />

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
              required
              control={control}
              isMulti={false}
              disabled={isDisabled || !!student?.religion_id}
              status={"error"}
              className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
              message={errors?.religion_id?.message as string}
            />
          </div>

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
            disabled={isDisabled || !!student?.birth_place}
            message={errors?.birth_place?.message as string}
            status={errors?.birth_place?.message ? "error" : "none"}
          />
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
            disabled={isDisabled || !!student?.birth_date}
            message={errors?.birth_date?.message as string}
          />
          <div className="w-80% px-5 flex flex-col gap-y-4 md:flex md:flex-row md:w-full md:px-0 md:justify-between">
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
              required
              isClearable={true}
              disabled={isDisabled || !!student?.marital_status_id}
              status={"error"}
              className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
              message={errors?.marital_status_id?.message as string}
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
              disabled={isDisabled || !!student?.citizenship_id}
              status={"error"}
              className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
              message={errors?.citizenship_id?.message as string}
            />
          </div>
          <div className="w-80% px-5 flex flex-col gap-y-4 md:flex md:flex-row md:w-full md:px-0 md:justify-between">
            <SelectOption
              name="country_id"
              labels="Asal Negara"
              labelClassName="font-bold text-xs py-2"
              required
              placeholder={
                student?.country_id
                  ? countryOptions?.find((country) => Number(country.value) === student?.country_id)
                      ?.label
                  : "Asal Negara"
              }
              options={countryOptions || []}
              isClearable={true}
              isSearchable={true}
              control={control}
              isMulti={false}
              disabled={isDisabled || !!student?.country_id || !watch("citizenship_id")}
              status={"error"}
              className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
              message={errors?.country_id?.message as string}
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
              required={countryOptions?.length === 1}
              ref={citizenref}
              isMulti={false}
              disabled={isDisabled || !!student?.province_id || countryOptions?.length !== 1}
              status={errors?.province_id?.message ? "error" : "none"}
              className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
              message={errors?.province_id?.message as string}
            />
          </div>
          <div className="w-80% px-5 flex flex-col gap-y-4 md:flex md:flex-row md:w-full md:px-0 md:justify-between">
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
              ref={provinceref}
              required={countryOptions?.length === 1}
              control={control}
              isMulti={false}
              disabled={
                isDisabled ||
                !!student?.city_id ||
                !watch("province_id") ||
                countryOptions?.length !== 1
              }
              status={"error"}
              className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
              message={errors?.city_id?.message as string}
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
              ref={subdisref}
              control={control}
              isMulti={false}
              isClearable={true}
              required={countryOptions?.length === 1}
              disabled={
                isDisabled ||
                !!student?.subdistrict_id ||
                !watch("city_id") ||
                countryOptions?.length !== 1
              }
              status={"error"}
              className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
              message={errors?.subdistrict_id?.message as string}
            />
          </div>
          <div className="px-6 md:px-0 lg:px-0 w-full">
            <TextField
              name="address"
              variant="sm"
              type="text"
              labelclassname="text-xl font-semibold"
              label="Alamat Domisili"
              placeholder="Masukan Alamat Lengkap Anda"
              control={control}
              required
              isTextArea
              textAreaCols={30}
              inputHeight="h-20"
              inputWidth="md:w-[80vw] lg:w-55% w-[70vw]"
              className="resize-none bg-grayscale-2  "
              disabled={isDisabled || !!student?.address}
              message={errors?.address?.message as string}
              status={errors?.address?.message ? "error" : "none"}
            />
          </div>
          {student?.degree_program_id !== 1 && (
            <section key="education">
              <div className="w-full">
                <h1 className="text-left font-bold text-xl pl-6 md:pl-0 pb-8">Pekerjaan</h1>
              </div>
              <div className="w-80% px-5 flex flex-col gap-y-4 md:flex-row md:w-full md:px-0 md:justify-between">
                <div className="flex flex-col justify-center gap-2">
                  <h3 className="text-xs font-semibold">Status Bekerja</h3>
                  <div className=" w-full flex items-center lg:w-[30%] gap-x-10">
                    <RadioButton
                      name="bekerja"
                      label="Sudah"
                      control={control}
                      value="Sudah"
                      size="lg"
                      variant="primary"
                      onChange={handleOccupation}
                      defaultChecked={occValue === "Sudah"}
                      disabled={isDisabled || !!student?.occupation_id || !!student?.nik}
                    />

                    <RadioButton
                      name="bekerja"
                      label="Belum"
                      control={control}
                      value="Belum"
                      size="lg"
                      variant="primary"
                      onChange={handleOccupation}
                      defaultChecked={occValue === "Tidak"}
                      disabled={isDisabled || !!student?.occupation_id || !!student?.nik}
                    />
                  </div>
                </div>

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
                  disabled={
                    occValue === "Sudah" && student?.occupation_id
                      ? true
                      : occValue === "Belum" && student?.occupation_id
                        ? true
                        : occValue === "Sudah"
                          ? false
                          : occValue === "Belum"
                            ? true
                            : false
                  }
                  status={"error"}
                  className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
                  message={errors?.occupation_id?.message as string}
                />
              </div>
              <div className="w-80% px-5 flex flex-col gap-y-4 md:flex-row md:w-full md:px-0 md:justify-between mt-4">
                <TextField
                  inputHeight="h-10"
                  name="occupation_position"
                  variant="sm"
                  type="text"
                  placeholder={student?.occupation_position || "Jabatan"}
                  labelclassname="text-sm font-semibold"
                  label="Jabatan"
                  inputWidth="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
                  control={control}
                  disabled={
                    occValue === "Belum" || isDisabled || !watch("occupation_id")
                      ? true
                      : false || student?.occupation_position
                        ? true
                        : false
                  }
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
                  disabled={occValue === "Belum" || isDisabled || !!student?.company_name}
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
                  inputWidth="md:w-[80vw] lg:w-55% w-[70vw]"
                  className="resize-none bg-grayscale-2  "
                  disabled={occValue === "Belum" || isDisabled || !!student?.company_address}
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
                disabled={occValue === "Belum" || isDisabled || !!student?.salary_id}
              />
            </section>
          )}
          <section className="w-80% px-5 flex flex-col gap-y-4 md:flex-row md:w-full md:px-0 md:justify-between">
            <div className="flex flex-col justify-center gap-2">
              <h3 className="text-xs font-semibold">Berkebutuhan Khusus</h3>
              <div className=" w-full flex items-center lg:w-[30%] gap-x-10">
                <RadioButton
                  name="difabel"
                  label="Ya"
                  control={control}
                  value="Ya"
                  size="lg"
                  variant="primary"
                  onChange={handleOnChange}
                  defaultChecked={disValue === "Ya" || !!student?.disabilities_id}
                  disabled={isDisabled || !!student?.disabilities_id || !!student?.nik}
                />

                <RadioButton
                  name="difabel"
                  label="Tidak"
                  fieldName=""
                  control={control}
                  value="Tidak"
                  size="lg"
                  variant="primary"
                  onChange={handleOnChange}
                  defaultChecked={disValue === "Tidak" || !student?.disabilities_id}
                  disabled={isDisabled || !!student?.disabilities_id || !!student?.nik}
                />
              </div>
            </div>

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
              disabled={
                disValue === "Ya" && student?.disabilities_id
                  ? true
                  : disValue === "Tidak" && student?.disabilities_id
                    ? true
                    : disValue === "Ya"
                      ? false
                      : disValue === "Tidak"
                        ? true
                        : false
              }
              status={"error"}
            />
          </section>
        </section>
        <div className="flex w-full justify-center lg:justify-end py-4 mt-8">
          <Button
            type="submit"
            variant="filled"
            size="md"
            width="w-70% lg:w-25% xl:w-15%"
            disabled={isDisabled || !!student?.nik}
          >
            Submit
          </Button>
        </div>
      </form>
    </Accordion>
  );
};
