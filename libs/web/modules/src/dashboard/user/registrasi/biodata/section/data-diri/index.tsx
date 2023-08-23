import {
  Accordion,
  UploadField,
  TextField,
  RadioButton,
  SelectOption,
  Button,
} from "@uninus/web/components";
import { dataDiri, formBiodataOne } from "../../store";
import { ChangeEvent, FC, ReactElement, useEffect, useMemo, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useCityGet, useProvinceGet, useSubdistrictGet } from "@uninus/web/services";
import {
  useCitizenGet,
  useCountryGet,
  useDisabilitiesGet,
  useGenderGet,
  useReligionGet,
  useStatusGet,
  useOccupationGet,
  useOccupationPositionGet,
  useSalaryGet,
} from "./hooks";
import { useBiodataUpdate, useGetBiodata } from "../../hooks";

export const DataDiriSection: FC = (): ReactElement => {
  const [isDisabled, setIsdisabled] = useState<boolean>(false);
  const [disValue, setDisValue] = useState<string | null>(null);
  const [occValue, setOccValue] = useState<string | null>(null);

  const { data } = useGetBiodata();

  const student = useMemo(() => {
    return data;
  }, [data]);

  const { control, handleSubmit, watch, setValue, reset } = useForm<FieldValues>({
    mode: "all",
    defaultValues: {},
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

  useEffect(() => {
    setValue("city_id", null);
  }, [watch("province_id")]);

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
        value: citizen?.name,
      })),
    [getCitizen?.citizenship],
  );

  const { data: getCountry } = useCountryGet({
    citizenship_id: watch("citizen_id"),
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
    setValue("occupation_id", null);
  }, [watch("occupation_position_id")]);
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
    if (data?.occupation_id) {
      setOccValue("Sudah");
    } else {
      setOccValue("Belum");
    }
  }, [student, reset, data]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDisValue(e.target.value);
    localStorage.setItem("disValue", e.target.value);
  };
  const handleOccupation = (e: ChangeEvent<HTMLInputElement>): void => {
    setOccValue(e.target.value);
    console.log(e.target.value);
    localStorage.setItem("occValue", e.target.value);
  };
  const { mutate } = useBiodataUpdate();

  const onSubmit = handleSubmit((data) => {
    dataDiri.avatar = data?.avatar;
    dataDiri.fullname = data?.fullname;
    dataDiri.email = data?.email;
    dataDiri.phone_number = data?.phone_number;
    dataDiri.nik = data?.nik;
    dataDiri.nisn = data?.nisn;
    dataDiri.no_kk = data?.no_kk;
    dataDiri.gender_id = Number(data?.gender_id);
    dataDiri.religion_id = Number(data?.religion_id);
    dataDiri.birth_place = data?.birth_place;
    dataDiri.birth_date = data?.birth_date;
    dataDiri.marital_status_id = Number(data?.martial_status_id);
    dataDiri.citizenship_id = Number(data?.citizenship_id);
    dataDiri.country_id = Number(data?.country_id);
    dataDiri.province_id = Number(data?.province_id);
    dataDiri.subdistrict_id = Number(data?.subdistrict_id);
    dataDiri.address = data?.address;
    dataDiri.disabilities_id = Number(data?.disabilities_id);
    dataDiri.city_id = Number(data?.city_id);
    dataDiri.occupation_id = Number(data?.occupation_id);
    dataDiri.occupation_position_id = Number(data?.occupation_position_id);
    dataDiri.company_name = data?.company_name;
    dataDiri.company_address = data?.company_address;
    dataDiri.salary_id = Number(data?.salary_id);

    try {
      mutate({ ...dataDiri });
      setIsdisabled(true);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Accordion
      title="Data Diri Pendaftar"
      titleClassName="text-lg font-extrabold text-secondary-green-4"
      className="w-full h-auto mt-[2rem] flex flex-col items-center lg:items-baseline lg:ml-[3vw] xl:ml-[5vw] gap-5"
    >
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-7 ">
          <UploadField
            className="grid lg:flex lg:items-center lg:gap-6 w-full justify-center lg:justify-start items-center h-full gap-y-6 lg:gap-y-0"
            classNameField="w-70% lg:w-auto"
            control={control}
            variant="default"
            name="image"
            defaultImage="/illustrations/dummy-avatar.webp"
            previewImage="w-[150px] h-[150px] bg-cover object-cover rounded-full "
            preview={true}
          />
        </div>

        <section className="flex flex-wrap w-full gap-x-1 justify-center items-center lg:flex lg:justify-between lg:items-center gap-y-4 mt-2 lg:mt-6 lg:w-55% md:w-80% md:flex md:flex-wrap md:justify-between">
          {formBiodataOne.map((biodata, idx) => (
            <TextField
              key={idx}
              placeholder={biodata.placeholder}
              name={biodata.name}
              label={biodata.item}
              labelclassname="text-xl font-semibold"
              variant="sm"
              required
              disabled
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
            disabled={isDisabled || student?.nik ? true : false}
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
            disabled={isDisabled || student?.nisn ? true : false}
          />
          <div className="lg:w-full">
            <TextField
              inputHeight="h-10"
              name="no_kk"
              variant="sm"
              required
              type="text"
              placeholder="Nomor dapat dilihat di KK"
              labelclassname="text-sm font-semibold"
              label="No Kartu Keluarga"
              inputWidth="w-70% lg:w-[27vw] xl:w-[25vw] text-base md:w-[33vw] "
              control={control}
              disabled={isDisabled || student?.no_kk ? true : false}
            />
          </div>
          <SelectOption
            labels="Jenis Kelamin"
            labelClassName="font-bold text-xs py-2"
            placeholder={
              student?.gender_id
                ? getGender?.gender?.find((gender) => gender.id === student?.gender_id)?.name
                : "Jenis Kelamin"
            }
            className=" rounded-md text-primary-black w-70% lg:w-auto xl:w-[25vw] md:w-[33vw]"
            options={genderOptions || []}
            isClearable={true}
            isSearchable={false}
            name="gender_id"
            control={control}
            disabled={isDisabled || student?.gender_id ? true : false}
          />
          <SelectOption
            labels="Agama"
            labelClassName="font-bold text-xs py-2"
            className=" rounded-md text-primary-black w-70% lg:w-auto xl:w-[25vw] md:w-[33vw]"
            placeholder={
              student?.religion_id
                ? getReligion?.religion?.find((religion) => religion.id === student?.religion_id)
                    ?.name
                : "Agama"
            }
            options={religionOptions || []}
            isClearable={true}
            isSearchable={true}
            name="religion_id"
            control={control}
            isMulti={false}
            disabled={isDisabled || student?.religion_id ? true : false}
          />
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
            disabled={isDisabled || student?.birth_place ? true : false}
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
            disabled={isDisabled || student?.birth_date ? true : false}
          />
          <div className="mr-2">
            <SelectOption
              name="martial_status_id"
              labels="Status"
              labelClassName="font-bold text-xs py-2"
              placeholder={
                student?.marital_status_id
                  ? getStatus?.maritalStatus?.find(
                      (status) => status.id === student?.marital_status_id,
                    )?.name
                  : "Status"
              }
              className=" rounded-md text-primary-black w-70% lg:w-auto xl:w-[25vw] md:w-[33vw]"
              options={statusOptions || []}
              isSearchable={false}
              control={control}
              isMulti={false}
              isClearable={true}
              disabled={isDisabled || student?.marital_status_id ? true : false}
            />
          </div>
          <SelectOption
            name="citizenship_id"
            labels="Kewarganegaraan"
            labelClassName="font-bold text-xs py-2"
            placeholder={
              student?.citizenship_id
                ? getCitizen?.citizenship?.find((citizen) => citizen.id === student?.citizenship_id)
                    ?.name
                : "Kewarganegaraan"
            }
            className="bg-slate-3 rounded-md text-primary-black w-70% lg:w-auto xl:w-[25vw] md:w-[33vw]"
            options={citizenOptions || []}
            isClearable={true}
            isSearchable={true}
            control={control}
            isMulti={false}
            required={false}
            disabled={isDisabled || student?.citizenship_id ? true : false}
          />
          <SelectOption
            name="country_id"
            labels="Asal Negara"
            labelClassName="font-bold text-xs py-2"
            placeholder={
              student?.country_id
                ? getCountry?.country?.find((country) => country.id === student?.country_id)?.name
                : "Asal Negara"
            }
            className="bg-slate-3 rounded-md text-primary-black w-70% lg:w-auto xl:w-[25vw] md:w-[33vw]"
            options={countryOptions || []}
            isClearable={true}
            isSearchable={true}
            control={control}
            isMulti={false}
            required={false}
            disabled={isDisabled || student?.country_id ? true : false}
          />
          <SelectOption
            name="province_id"
            labels="Provinsi"
            placeholder={
              student?.province_id
                ? getProvincies?.province?.find((province) => province.id === student?.province_id)
                    ?.name
                : "Provinsi"
            }
            labelClassName="font-bold text-xs py-2"
            className="bg-slate-3 rounded-md text-primary-black w-70% lg:w-auto xl:w-[25vw] md:w-[33vw]"
            options={provinceOptions || []}
            isSearchable={true}
            isClearable={true}
            control={control}
            isMulti={false}
            disabled={isDisabled || student?.province_id ? true : false}
          />
          <SelectOption
            name="city_id"
            labels="Kota/Kabupaten"
            placeholder={
              student?.city_id
                ? getCity?.city?.find((city) => city.id === student?.city_id)?.name
                : "Kota/Kabupaten"
            }
            className="rounded-md text-primary-black  w-70% lg:w-auto xl:w-[25vw] md:w-[33vw]"
            labelClassName="font-bold text-xs py-2"
            options={cityOptions || []}
            isSearchable={true}
            isClearable={true}
            control={control}
            isMulti={false}
            disabled={isDisabled || student?.city_id ? true : !watch("province_id")}
          />
          <SelectOption
            name="subdistrict_id"
            labels="Kecamatan"
            placeholder={
              student?.subdistrict_id
                ? getSubdistrict?.subdistrict?.find(
                    (subdistrict) => subdistrict.id === student?.subdistrict_id,
                  )?.name
                : "Kecamatan"
            }
            className="rounded-md text-primary-black w-70% lg:w-auto xl:w-[25vw] md:w-[33vw]"
            labelClassName="font-bold text-xs py-2"
            options={subDistrictOptions || []}
            isSearchable={true}
            control={control}
            isMulti={false}
            isClearable={true}
            disabled={isDisabled || student?.subdistrict_id ? true : !watch("city_id")}
          />
          <div className="px-14 md:px-0 lg:px-0 w-full">
            <TextField
              name="address"
              variant="sm"
              type="text"
              labelclassname="text-xl font-semibold"
              label="Alamat Domisili"
              control={control}
              isTextArea
              textAreaCols={30}
              inputHeight="h-20"
              inputWidth="md:w-[50vw] lg:w-55% w-[70vw]"
              className="resize-none bg-grayscale-2  "
              disabled={isDisabled || student?.address ? true : false}
            />
          </div>
          {data?.degree_program_id !== 1 && (
            <>
              <div className="w-full">
                <h1 className="text-left font-bold text-xl pl-10 md:pl-0">Pekerjaan</h1>
              </div>
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
                buttonValue={occValue}
                disabled={
                  isDisabled || (student?.occupation_id && occValue === "Sudah") ? true : false
                }
              />

              <SelectOption
                name="occupation_id"
                labels="Pekerjaan"
                className="rounded-md text-primary-black lg:w-auto w-70% xl:w-[25vw] md:w-[33vw]"
                placeholder={
                  data?.occupation_id
                    ? getOccupation?.occupation?.find(
                        (occupation) => occupation.id === data?.occupation_id,
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
                  occValue === "Sudah" && data?.occupation_id
                    ? true
                    : occValue === "Belum" && student?.occupation_id
                    ? true
                    : occValue === "Sudah"
                    ? false
                    : occValue === "Belum"
                    ? true
                    : false
                }
              />

              <SelectOption
                name="occupation_position_id"
                labels="Jabatan"
                className="rounded-md text-primary-black lg:w-auto w-70% xl:w-[25vw] md:w-[33vw]"
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
                disabled={
                  occValue === "Belum" ||
                  !watch("occupation_id") ||
                  !!student?.occupation_position_id ||
                  occupationPositionOptions?.length === 0
                }
              />
              <TextField
                inputHeight="h-10"
                name="company_name"
                variant="sm"
                required
                type="text"
                placeholder="Nama Perusahaan"
                labelclassname="text-left text-sm font-semibold"
                label="Nama Perusahaan"
                inputWidth="w-70% lg:w-[27vw] xl:w-[25vw] text-base md:w-[33vw] "
                control={control}
                disabled={
                  occValue === "Belum" || isDisabled || student?.company_name ? true : false
                }
              />
              <TextField
                name="company_address"
                variant="sm"
                type="text"
                labelclassname="text-left text-xl font-semibold"
                label="Alamat Perusaahan"
                control={control}
                isTextArea
                textAreaCols={30}
                inputHeight="h-20"
                inputWidth="md:w-[50vw] lg:w-55% w-[70vw]"
                className="resize-none bg-grayscale-2  "
                disabled={
                  occValue === "Belum" || isDisabled || student?.company_address ? true : false
                }
              />
              <SelectOption
                name="salary_id"
                labels="Penghasilan Per Bulan"
                labelClassName="text-left font-bold text-xs py-2"
                placeholder="Pilih Pendapatan"
                options={salaryOptions || []}
                className=" rounded-md text-primary-black md:w-[80vw] lg:w-55% w-[70vw]"
                isSearchable={false}
                control={control}
                isMulti={false}
                isClearable={true}
                disabled={occValue === "Belum" || isDisabled || student?.salary_id ? true : false}
              />
            </>
          )}
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
            disabled={isDisabled || (student?.disabilities_id && disValue === "Ya") ? true : false}
          />

          <SelectOption
            name="disabilities_id"
            labels="Kategori Difabel"
            className=" rounded-md text-primary-black lg:w-auto w-70% xl:w-[25vw] md:w-[33vw]"
            placeholder={
              student?.disabilities_id
                ? getDisabilities?.disabilities?.find(
                    (disabilities) => disabilities.id === student?.disabilities_id,
                  )?.name
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
          />
        </section>
        <div className="flex w-full justify-center lg:justify-end py-4">
          <Button
            type="submit"
            variant="filled"
            size="md"
            width="w-50% lg:w-25% xl:w-15%"
            disabled={isDisabled || student ? true : false}
          >
            Submit
          </Button>
        </div>
      </form>
    </Accordion>
  );
};
