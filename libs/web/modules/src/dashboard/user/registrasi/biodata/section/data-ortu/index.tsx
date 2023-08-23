import { FC, ReactElement, useEffect, useMemo, useState } from "react";
import { Accordion, TextField, SelectOption, Button, CheckBox } from "@uninus/web/components";
import { useForm, FieldValues } from "react-hook-form";
import { useCityGet, useProvinceGet, useSubdistrictGet } from "@uninus/web/services";
import { useBiodataUpdate, useGetBiodata } from "../../hooks";
import { useOccupationGet, useParentEducationGet, useParentStatusGet, useSalaryGet } from "./hooks";
import { studentData } from "./type";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export const DataOrtuSection: FC = (): ReactElement => {
  const [parentStatus] = useState({
    search: "",
  });
  const [parentEducation] = useState({
    search: "",
  });
  const [occupation] = useState({
    search: "",
  });
  const [salary] = useState({
    search: "",
  });
  const [locationMeta] = useState({
    search: "",
    province_id: "",
    city_id: "",
  });
  const [parentAddressSame, setParentAddressSame] = useState(true);
  const [guardianAddressSame, setGuardianAddressSame] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    mode: "all",
    defaultValues: {},
  });

  const { data } = useGetBiodata();
  const { data: getParentStatus } = useParentStatusGet(parentStatus);
  const { data: getParentEducation } = useParentEducationGet(parentEducation);
  const { data: getOccupation } = useOccupationGet(occupation);
  const { data: getSalary } = useSalaryGet(salary);
  const { data: getProvincies } = useProvinceGet(locationMeta);
  const { data: getCityParent } = useCityGet({
    province_id: watch("address_province_parent"),
    search: "",
  });
  const { data: getCityGuard } = useCityGet({
    province_id: watch("address_province_guard"),
    search: "",
  });
  const { data: getSubdistrictParent } = useSubdistrictGet({
    city_id: watch("address_city_parent"),
    search: "",
  });
  const { data: getSubdistrictGuard } = useSubdistrictGet({
    city_id: watch("address_city_guard"),
    search: "",
  });

  const student = useMemo(() => {
    return data;
  }, [data]);

  const addressStudent = student?.address;

  const parentStatusOptions = useMemo(
    () =>
      getParentStatus?.parent_status?.map((parentStatus) => ({
        label: parentStatus?.name,
        value: parentStatus?.id.toString(),
      })),
    [getParentStatus?.parent_status],
  );
  const parentEducationOptions = useMemo(
    () =>
      getParentEducation?.parent_education?.map((parentEducation) => ({
        label: parentEducation?.name,
        value: parentEducation?.id.toString(),
      })),
    [getParentEducation?.parent_education],
  );
  const salaryOptions = useMemo(
    () =>
      getSalary?.salary?.map((salary) => ({
        label: salary?.name,
        value: salary?.id.toString(),
      })),
    [getSalary?.salary],
  );
  const occupationOptions = useMemo(
    () =>
      getOccupation?.occupation?.map((occupation) => ({
        label: occupation?.name,
        value: occupation?.id.toString(),
      })),
    [getOccupation?.occupation],
  );
  const provinceOptions = useMemo(
    () =>
      getProvincies?.province?.map((province) => ({
        label: province?.name,
        value: province?.id.toString(),
      })),
    [getProvincies?.province],
  );
  const cityOptionsParent = useMemo(
    () =>
      getCityParent?.city?.map((city) => ({
        label: city?.name,
        value: city?.id.toString(),
      })),
    [getCityParent?.city],
  );
  const cityOptionsGuard = useMemo(
    () =>
      getCityGuard?.city?.map((city) => ({
        label: city?.name,
        value: city?.id.toString(),
      })),
    [getCityGuard?.city],
  );
  const subDistrictOptionsParent = useMemo(
    () =>
      getSubdistrictParent?.subdistrict?.map((subdistrict) => ({
        label: subdistrict?.name,
        value: subdistrict?.id.toString(),
      })),
    [getSubdistrictParent?.subdistrict],
  );
  const subDistrictOptionsGuard = useMemo(
    () =>
      getSubdistrictGuard?.subdistrict?.map((subdistrict) => ({
        label: subdistrict?.name,
        value: subdistrict?.id.toString(),
      })),
    [getSubdistrictGuard?.subdistrict],
  );

  const handleParentAddressCheckboxChange = () => {
    setParentAddressSame(!parentAddressSame);
  };
  const handleGuardianAddressCheckboxChange = () => {
    setGuardianAddressSame(!guardianAddressSame);
  };

  useEffect(() => {
    setValue("address_city_parent", null);
  }, [watch("address_province_parent")]);

  useEffect(() => {
    setValue("address_city_guard", null);
  }, [watch("address_province_guard")]);

  useEffect(() => {
    reset(student);
    console.log(student);
  }, [student, reset]);

  useEffect(() => {
    if (parentAddressSame) {
      setValue("parent_address", "");
    } else {
      setValue("parent_address", addressStudent);
    }

    if (guardianAddressSame) {
      setValue("guardian_address", "");
    } else {
      setValue("guardian_address", addressStudent);
    }
  }, [parentAddressSame, guardianAddressSame, setValue]);

  const { mutate } = useBiodataUpdate();

  const onSubmit = handleSubmit((data) => {
    studentData.father_name = data.father_name;
    studentData.father_status_id = Number(data.father_status_id);
    studentData.father_education_id = Number(data.father_education_id);
    studentData.father_occupation_id = Number(data.father_profecy);
    studentData.father_salary_id = Number(data.father_income);
    studentData.mother_name = data.mother_name;
    studentData.mother_status_id = Number(data.status_mother);
    studentData.mother_education_id = Number(data.mother_education);
    studentData.mother_occupation_id = Number(data.mother_profecy);
    studentData.mother_salary_id = Number(data.mother_income);
    studentData.parent_address = data.parent_address;
    studentData.parent_province_id = Number(data.address_province_parent);
    studentData.parent_city_id = Number(data.address_city_parent);
    studentData.parent_subdistrict_id = Number(data.address_subdistrict_parent);
    studentData.guardian_name = data.guardian_name;
    studentData.guardian_status_id = Number(data.status_gardian);
    studentData.guardian_education_id = Number(data.guardian_education);
    studentData.guardian_occupation_id = Number(data.guardian_profecy);
    studentData.guardian_salary_id = Number(data.guardian_income);
    studentData.guardian_address = data.guardian_address;
    studentData.guardian_province_id = Number(data.address_province_guard);
    studentData.guardian_city_id = Number(data.address_city_guard);
    studentData.guardian_subdistrict_id = Number(data.address_subdistrict_guard);

    try {
      mutate(studentData, {
        onSuccess: () => {
          setIsSubmitted(true);
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
      });
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Accordion
      title="Data Orang Tua"
      titleClassName="text-lg font-extrabold text-secondary-green-4"
      className="w-full h-auto mt-[2rem] flex flex-col gap-5 items-center lg:items-baseline lg:ml-[3vw] xl:ml-[5vw] text-left"
    >
      <form onSubmit={onSubmit}>
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
        {/* Ayah */}
        <h1 className="font-bold text-xl my-6 lg:pl-0 md:pl-[11vw] place-self-start pl-4">
          Profil Ayah
        </h1>

        <section className="flex flex-wrap w-full justify-center items-start gap-x-1 lg:flex  lg:flex-wrap lg:gap-6 xl:gap-1 gap-y-4 mt-2 lg:items-center lg:w-55% md:flex md:flex-wrap md:w-80% md:justify-between">
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
            disabled={isSubmitted || student?.father_name ? true : false}
          />
          <SelectOption
            name="father_status_id"
            labels="Status Ayah"
            required={true}
            labelClassName="font-bold text-xs py-2"
            placeholder={
              student?.father_status_id
                ? parentStatusOptions?.find(
                    (status) => Number(status.value) === student?.father_status_id,
                  )?.label
                : "Status ayah"
            }
            options={parentStatusOptions || []}
            className="rounded-md text-primary-black w-70% lg:w-[12vw] md:w-[16vw]"
            isSearchable={false}
            control={control}
            isMulti={false}
            isClearable={true}
            disabled={isSubmitted || student?.father_status_id ? true : false}
          />
          <SelectOption
            name="father_education_id"
            labels="Pendidikan Terahir Ayah"
            labelClassName="font-bold text-xs py-2"
            placeholder={
              student?.father_education_id
                ? parentEducationOptions?.find(
                    (edu) => Number(edu.value) === student?.father_education_id,
                  )?.label
                : "Pendidikan"
            }
            options={parentEducationOptions || []}
            className="rounded-md text-primary-black w-70% lg:w-[12vw] md:w-[16vw]"
            isSearchable={false}
            control={control}
            isMulti={false}
            isClearable={true}
            disabled={isSubmitted || student?.father_education_id ? true : false}
          />
          <SelectOption
            name="father_profecy"
            labels="Pekerjaan Ayah"
            labelClassName="font-bold text-xs py-2"
            placeholder={
              student?.father_occupation_id
                ? occupationOptions?.find(
                    (occupations) => Number(occupations.value) === student?.father_occupation_id,
                  )?.label
                : "Pilih pekerjaan"
            }
            options={occupationOptions || []}
            className=" rounded-md text-primary-black w-70% lg:w-[26vw] md:w-[33vw]"
            isSearchable={true}
            control={control}
            isMulti={false}
            isClearable={true}
            disabled={isSubmitted || student?.father_occupation_id ? true : false}
          />
          <SelectOption
            name="father_income"
            labels="Pendapatan Ayah ( Per Bulan )"
            labelClassName="font-bold text-xs py-2"
            placeholder={
              student?.father_salary_id
                ? salaryOptions?.find(
                    (salary) => Number(salary.value) === student?.father_salary_id,
                  )?.label
                : "Pilih pendapatan"
            }
            options={salaryOptions || []}
            className="rounded-md text-primary-black w-70% lg:w-[26.5vw] md:w-[33vw]"
            isSearchable={false}
            control={control}
            isMulti={false}
            isClearable={true}
            disabled={isSubmitted || student?.father_salary_id ? true : false}
          />
        </section>
        {/* Ibu */}
        <h1 className="font-bold text-xl my-6  lg:pl-0 md:pl-[11vw] xl:pl-0 place-self-start pl-4">
          Profil Ibu
        </h1>
        <section className="flex flex-wrap w-full justify-center items-start gap-x-1 lg:flex  lg:flex-wrap lg:gap-6 xl:gap-1 gap-y-4 mt-2 lg:items-center lg:w-55% md:flex md:flex-wrap md:w-80% md:justify-between">
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
            disabled={isSubmitted || student?.father_name ? true : false}
          />
          <SelectOption
            name="status_mother"
            labels="Status Ibu"
            placeholder={
              student?.mother_status_id
                ? parentStatusOptions?.find(
                    (status) => Number(status.value) === student?.mother_status_id,
                  )?.label
                : "Status ibu"
            }
            labelClassName="font-bold text-xs py-2"
            options={parentStatusOptions || []}
            className="rounded-md text-primary-black w-70% lg:w-[12vw] md:w-[16vw]"
            isSearchable={false}
            control={control}
            isMulti={false}
            isClearable={true}
            disabled={isSubmitted || student?.mother_status_id ? true : false}
          />
          <SelectOption
            name="mother_education"
            labels="Pendidikan Terahir Ibu"
            labelClassName="font-bold text-xs py-2"
            placeholder={
              student?.mother_education_id
                ? parentEducationOptions?.find(
                    (edu) => Number(edu.value) === student?.mother_education_id,
                  )?.label
                : "Pendidikan"
            }
            options={parentEducationOptions || []}
            className="rounded-md text-primary-black w-70% lg:w-[12vw] md:w-[16vw]"
            isSearchable={false}
            control={control}
            isMulti={false}
            isClearable={true}
            disabled={isSubmitted || student?.mother_education_id ? true : false}
          />
          <SelectOption
            name="mother_profecy"
            labels="Pekerjaan Ibu"
            placeholder={
              student?.mother_occupation_id
                ? occupationOptions?.find(
                    (occupation) => Number(occupation.value) === student?.mother_occupation_id,
                  )?.label
                : "Pilih pekerjaan"
            }
            options={occupationOptions || []}
            labelClassName="font-bold text-xs py-2"
            className=" rounded-md text-primary-black w-70% lg:w-[26vw] md:w-[33vw]"
            isSearchable={true}
            control={control}
            isMulti={false}
            isClearable={true}
            disabled={isSubmitted || student?.mother_occupation_id ? true : false}
          />
          <SelectOption
            name="mother_income"
            labels="Pendapatan Ibu ( Per Bulan )"
            labelClassName="font-bold text-xs py-2"
            placeholder={
              student?.mother_salary_id
                ? salaryOptions?.find(
                    (salary) => Number(salary.value) === student?.mother_salary_id,
                  )?.label
                : "Pilih pendapatan"
            }
            options={salaryOptions || []}
            className=" rounded-md text-primary-black w-70% lg:w-[26.5vw] md:w-[33vw]"
            isSearchable={false}
            control={control}
            isMulti={false}
            isClearable={true}
            disabled={isSubmitted || student?.mother_salary_id ? true : false}
          />
        </section>
        {/* Parent Address */}
        <h1 className="font-bold text-xl my-6 lg:pl-0 md:pl-[11vw] xl:pl-0 place-self-start pl-4">
          Alamat Orang Tua
        </h1>
        <section className="flex flex-wrap w-full justify-center items-center gap-x-1 lg:flex lg:items-start gap-y-4 lg:justify-between lg:w-55% md:flex md:flex-wrap md:w-80% md:justify-between">
          <SelectOption
            labels="Provinsi"
            className="bg-slate-3 rounded-md text-primary-black w-70% lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
            labelClassName="font-bold text-xs py-2"
            options={provinceOptions || []}
            placeholder={
              student?.parent_province_id
                ? provinceOptions?.find(
                    (province) => Number(province.value) === student?.parent_province_id,
                  )?.label
                : "Provinsi"
            }
            isSearchable={true}
            name="address_province_parent"
            isClearable={true}
            control={control}
            isMulti={false}
            disabled={isSubmitted || student?.parent_province_id ? true : false}
          />
          <SelectOption
            labels="Kota/Kabupaten"
            className="rounded-md text-primary-black w-70% lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
            labelClassName="font-bold text-xs py-2"
            options={cityOptionsParent || []}
            placeholder={
              student?.parent_city_id
                ? cityOptionsParent?.find((city) => Number(city.value) === student?.parent_city_id)
                    ?.label
                : "Kota/Kabupaten"
            }
            isSearchable={true}
            name="address_city_parent"
            isClearable={true}
            control={control}
            isMulti={false}
            disabled={
              !watch("address_province_parent") || isSubmitted || student?.parent_city_id
                ? true
                : false
            }
          />
          <SelectOption
            labels="Kecamatan"
            className="rounded-md text-primary-black w-70% lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
            labelClassName="font-bold text-xs py-2"
            options={subDistrictOptionsParent || []}
            placeholder={
              student?.parent_subdistrict_id
                ? subDistrictOptionsParent?.find(
                    (subdistrict) => Number(subdistrict.value) === student?.parent_subdistrict_id,
                  )?.label
                : "Kecamatan"
            }
            isSearchable={true}
            name="address_subdistrict_parent"
            control={control}
            isMulti={false}
            isClearable={true}
            disabled={
              !watch("address_city_parent") || isSubmitted || student?.parent_subdistrict_id
                ? true
                : false
            }
          />


          <div className="px-6 md:px-0 lg:px-0 w-full">
            <TextField
              name="parent_address"
              variant="sm"
              type="text"
              labelclassname="text-xl font-semibold"
              label="Alamat Domisili"
              control={control}
              required
              isTextArea
              textAreaRow={5}
              textAreaCols={30}
              inputHeight="h-20"
              inputWidth="md:w-[50vw] lg:w-55% w-[70vw]"
              className="resize-none bg-grayscale-2"
              disabled={!parentAddressSame || isSubmitted || student?.parent_address ? true : false}
              placeholder={studentData.parent_address}
            />
          </div>
          <div className="w-70% md:w-26 lg:w-26">
            {/* <TextField
              inputHeight="h-10"
              name="parent_postal_code"
              variant="md"
              required
              type="text"
              labelclassname="text-sm "
              label="Kode Pos"
              inputWidth="w-26 text-base"
              control={control}
            /> */}
          </div>
          <div className="col-span-4">
            <CheckBox
              name="check_parent_address"
              control={control}
              label="Alamat Sama Dengan Pendaftar"
              variant="primary"
              size="md"
              onClick={handleParentAddressCheckboxChange}
              disabled={isSubmitted || student?.parent_address ? true : false}
            />
          </div>
        </section>

        <h1 className="font-bold text-xl my-6  lg:pl-0 md:pl-[11vw] xl:pl-0 place-self-start pl-4">
          Profil Wali
        </h1>
        <section className="flex flex-wrap w-full justify-center items-start gap-x-1 lg:flex  lg:flex-wrap lg:gap-6 xl:gap-1 gap-y-4 mt-2 lg:items-center lg:w-55% md:flex md:flex-wrap md:w-80% md:justify-between">
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
            disabled={isSubmitted || student?.guardian_name ? true : false}
          />
          <SelectOption
            name="status_gardian"
            labels="Status Wali"
            labelClassName="font-bold text-xs py-2"
            placeholder={
              student?.guardian_status_id
                ? parentStatusOptions?.find(
                    (status) => Number(status.value) === student?.guardian_status_id,
                  )?.label
                : "Status wali"
            }
            options={parentStatusOptions || []}
            className=" rounded-md text-primary-black w-70% lg:w-[12vw] md:w-[16vw]"
            isSearchable={false}
            control={control}
            isMulti={false}
            isClearable={true}
            disabled={isSubmitted || student?.guardian_status_id ? true : false}
          />
          <SelectOption
            name="guardian_education"
            labels="Pendidikan Terahir Wali"
            labelClassName="font-bold text-xs py-2"
            placeholder={
              student?.guardian_education_id
                ? parentEducationOptions?.find(
                    (edu) => Number(edu.value) === student?.guardian_education_id,
                  )?.label
                : "Pendidikan"
            }
            options={parentEducationOptions || []}
            className=" rounded-md text-primary-black w-70% lg:w-[12vw] md:w-[16vw]"
            isSearchable={false}
            control={control}
            isMulti={false}
            isClearable={true}
            disabled={isSubmitted || student?.guardian_education_id ? true : false}
          />
          <SelectOption
            name="guardian_profecy"
            labels="Pekerjaan Wali"
            labelClassName="font-bold text-xs py-2"
            placeholder={
              student?.guardian_occupation_id
                ? occupationOptions?.find(
                    (occupation) => Number(occupation.value) === student?.guardian_occupation_id,
                  )?.label
                : "Pilih Pekerjaan"
            }
            options={occupationOptions || []}
            className=" rounded-md text-primary-black w-70% lg:w-[26vw] md:w-[33vw]"
            isSearchable={true}
            control={control}
            isMulti={false}
            isClearable={true}
            disabled={isSubmitted || student?.guardian_occupation_id ? true : false}
          />
          <SelectOption
            name="guardian_income"
            labels="Pendapatan Wali ( Per Bulan )"
            labelClassName="font-bold text-xs py-2"
            placeholder={
              student?.guardian_salary_id
                ? salaryOptions?.find(
                    (salary) => Number(salary.value) === student?.guardian_salary_id,
                  )?.label
                : "Pilih pendapatan"
            }
            options={salaryOptions || []}
            className=" rounded-md text-primary-black w-70% lg:w-[26.5vw] md:w-[33vw]"
            isSearchable={false}
            control={control}
            isMulti={false}
            isClearable={true}
            disabled={isSubmitted || student?.guardian_salary_id ? true : false}
          />
        </section>
        <h1 className="font-bold text-xl my-6 lg:pl-0 md:pl-[11vw] xl:pl-0 place-self-start pl-4">
          Alamat Wali
        </h1>
        <section className="flex flex-wrap w-full justify-center items-center gap-x-1 lg:flex lg:items-start gap-y-4 lg:justify-between lg:w-55% md:flex md:flex-wrap md:w-80% md:justify-between">
          <SelectOption
            labels="Provinsi"
            className="bg-slate-3 rounded-md text-primary-black w-70% lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
            labelClassName="font-bold text-xs py-2"
            options={provinceOptions || []}
            placeholder={
              student?.guardian_province_id
                ? provinceOptions?.find(
                    (province) => Number(province.value) === student?.guardian_province_id,
                  )?.label
                : "Provinsi"
            }
            isSearchable={true}
            required={false}
            name="address_province_guard"
            isClearable={true}
            control={control}
            isMulti={false}
            disabled={isSubmitted || student?.guardian_province_id ? true : false}
          />
          <SelectOption
            labels="Kota/Kabupaten"
            className="rounded-md text-primary-black w-70% lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
            labelClassName="font-bold text-xs py-2"
            options={cityOptionsGuard || []}
            placeholder={
              student?.guardian_city_id
                ? cityOptionsGuard?.find((city) => Number(city.value) === student?.guardian_city_id)
                    ?.label
                : "Kota/Kabupaten"
            }
            isSearchable={true}
            name="address_city_guard"
            isClearable={true}
            control={control}
            isMulti={false}
            disabled={
              !watch("address_province_guard") || isSubmitted || student?.guardian_city_id
                ? true
                : false
            }
          />
          <SelectOption
            labels="Kecamatan"
            className="rounded-md text-primary-black w-70% lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
            labelClassName="font-bold text-xs py-2"
            options={subDistrictOptionsGuard || []}
            placeholder={
              student?.guardian_subdistrict_id
                ? subDistrictOptionsGuard?.find(
                    (subdistrict) => Number(subdistrict.value) === student?.guardian_subdistrict_id,
                  )?.label
                : "Kecamatan"
            }
            required={false}
            isSearchable={true}
            name="address_subdistrict_guard"
            control={control}
            isMulti={false}
            isClearable={true}
            disabled={
              !watch("address_city_guard") || isSubmitted || student?.guardian_subdistrict_id
                ? true
                : false
            }
          />

          <div className="px-6 md:px-0 lg:px-0 w-full">
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
              inputWidth="md:w-[50vw] lg:w-55% w-[70vw]"
              className="resize-none bg-grayscale-2"
              disabled={
                !guardianAddressSame || isSubmitted || student?.guardian_address ? true : false
              }
            />
          </div>
          <div className="w-70% md:w-26 lg:w-26"></div>
          <div className="col-span-4">
            <CheckBox
              name="check_guardian_address"
              control={control}
              label="Alamat Sama Dengan Pendaftar"
              variant="primary"
              size="md"
              onClick={handleGuardianAddressCheckboxChange}
              disabled={isSubmitted || student?.guardian_address ? true : false}
            />
          </div>
        </section>
        <div className="flex w-full justify-center lg:justify-end py-4">
          <Button
            variant="filled"
            size="md"
            width="w-50% lg:w-25% xl:w-15%"
            disabled={isSubmitted || student?.father_name ? true : false}
          >
            Submit
          </Button>
        </div>
      </form>
    </Accordion>
  );
};
