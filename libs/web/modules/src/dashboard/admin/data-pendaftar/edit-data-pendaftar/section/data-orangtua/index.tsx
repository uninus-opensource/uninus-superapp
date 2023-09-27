import { FC, ReactElement, useMemo, useState } from "react";
import { TextField, SelectOption, Button } from "@uninus/web/components";
import { useForm } from "react-hook-form";
import {
  useCityGet,
  useProvinceGet,
  useStudentData,
  useSubdistrictGet,
  useOccupationGet,
  useSalaryGet,
  useParentEducationGet,
  useParentStatusGet,
} from "@uninus/web/services";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export const EditDataOrangtua: FC = (): ReactElement => {
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

  const {
    control,

    watch,
  } = useForm({
    mode: "all",
  });

  const { getStudent } = useStudentData();

  const { data: getParentStatus } = useParentStatusGet(parentStatus);
  const { data: getParentEducation } = useParentEducationGet(parentEducation);
  const { data: getOccupation } = useOccupationGet(occupation);
  const { data: getSalary } = useSalaryGet(salary);
  const { data: getProvincies } = useProvinceGet(locationMeta);
  const { data: getCityParent } = useCityGet({
    province_id: watch("parent_province_id"),
    search: "",
  });
  const { data: getCityGuard } = useCityGet({
    province_id: watch("guardian_province_id"),
    search: "",
  });
  const { data: getSubdistrictParent } = useSubdistrictGet({
    city_id: watch("parent_city_id"),
    search: "",
  });
  const { data: getSubdistrictGuard } = useSubdistrictGet({
    city_id: watch("guardian_city_id"),
    search: "",
  });

  const student = useMemo(() => {
    return getStudent;
  }, [getStudent]);

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
  // const occupationPositionFatherOptions = useMemo(
  //   () =>
  //     getOccupationPositionFather?.occupation_position?.map((occupationPosition) => ({
  //       label: occupationPosition?.name,
  //       value: occupationPosition?.id.toString(),
  //     })),
  //   [getOccupationPositionFather?.occupation_position],
  // );
  // const occupationPositionMotherOptions = useMemo(
  //   () =>
  //     getOccupationPositionMother?.occupation_position?.map((occupationPosition) => ({
  //       label: occupationPosition?.name,
  //       value: occupationPosition?.id.toString(),
  //     })),
  //   [getOccupationPositionMother?.occupation_position],
  // );
  // const occupationPositionGuardOptions = useMemo(
  //   () =>
  //     getOccupationPositionGuardian?.occupation_position?.map((occupationPosition) => ({
  //       label: occupationPosition?.name,
  //       value: occupationPosition?.id.toString(),
  //     })),
  //   [getOccupationPositionGuardian?.occupation_position],
  // );
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

  // const addressProvinceParent = watch("parent_province_id");
  // const addressProvinceGuard = watch("guardian_province_id");

  // useEffect(() => {
  //   setValue("parent_city_id", null);
  // }, [addressProvinceParent]);

  // useEffect(() => {
  //   setValue("guardian_city_id", null);
  // }, [addressProvinceGuard]);

  // useEffect(() => {
  //   reset(student);
  // }, [student, reset, getStudent]);

  // useEffect(() => {
  //   if (parentAddressSame) {
  //     setValue("parent_address", "");
  //   } else {
  //     setValue("parent_address", addressStudent);
  //   }

  //   if (guardianAddressSame) {
  //     setValue("guardian_address", "");
  //   } else {
  //     setValue("guardian_address", addressStudent);
  //   }
  // }, [parentAddressSame, guardianAddressSame, setValue, addressStudent]);

  // useEffect(() => {
  //   if (student?.parent_address) {
  //     setValue("parent_address", student?.parent_address);
  //     if (student?.parent_address === addressStudent) {
  //       setValue("check_parent_address", true);
  //     }
  //   }
  //   if (student?.guardian_address) {
  //     setValue("guardian_address", student?.guardian_address);
  //     if (student?.guardian_address === addressStudent) {
  //       setValue("check_guardian_address", true);
  //     }
  //   }
  // }, [student, setValue, addressStudent]);

  // useEffect(() => {
  //   const fatherStatus = watch("father_status_id");
  //   const motherStatus = watch("mother_status_id");
  //   const guardianStatus = watch("guardian_status_id");

  //   if (fatherStatus === "2" || fatherStatus === null || fatherStatus === undefined) {
  //     setIsFatherStatus(true);
  //   } else {
  //     setIsFatherStatus(false);
  //   }

  //   if (motherStatus === "2" || motherStatus === null || motherStatus === undefined) {
  //     setIsMotherStatus(true);
  //   } else {
  //     setIsMotherStatus(false);
  //   }

  //   if (guardianStatus === "2" || guardianStatus === null || guardianStatus === undefined) {
  //     setIsGuardianStatus(true);
  //   } else {
  //     setIsGuardianStatus(false);
  //   }
  // }, [watch("father_status_id"), watch("mother_status_id"), watch("guardian_status_id")]);

  // useEffect(() => {
  //   const statusProfecy = {
  //     father: watch("father_occupation_id"),
  //     mother: watch("mother_occupation_id"),
  //     guardian: watch("guardian_occupation_id"),
  //   };

  //   statusProfecy.father === "14" ? setIsUnemployedFather(true) : setIsUnemployedFather(false);
  //   statusProfecy.mother === "14" ? setIsUnemployedMother(true) : setIsUnemployedMother(false);
  //   statusProfecy.guardian === "14"
  //     ? setIsUnemployedGuardian(true)
  //     : setIsUnemployedGuardian(false);
  // }, [
  //   watch("father_occupation_id"),
  //   watch("mother_occupation_id"),
  //   watch("guardian_occupation_id"),
  // ]);

  // useEffect(() => {
  //   if (isUnemployedFather) {
  //     setValue("father_salary_id", "6");
  //   }

  //   if (isUnemployedMother) {
  //     setValue("mother_salary_id", "6");
  //   }
  //   if (isUnemployedGuardian) {
  //     setValue("guardian_salary_id", "6");
  //   }
  // }, [isUnemployedFather, isUnemployedMother, isUnemployedGuardian, setValue]);

  // const onSubmit = handleSubmit((data) => {
  //   studentParentData.father_name = data?.father_name;
  //   studentParentData.father_status_id = Number(data?.father_status_id);
  //   studentParentData.father_education_id = Number(data?.father_education_id);

  //   studentParentData.father_occupation_id = data?.father_occupation_id
  //     ? Number(data?.father_occupation_id)
  //     : (undefined as unknown as number);

  //   studentParentData.father_position_id = data?.father_occupation_position_id
  //     ? Number(data?.father_occupation_position_id)
  //     : (undefined as unknown as number);

  //   studentParentData.father_salary_id = data?.father_salary_id
  //     ? Number(data?.father_salary_id)
  //     : (undefined as unknown as number);

  //   studentParentData.mother_name = data?.mother_name;
  //   studentParentData.mother_status_id = Number(data?.mother_status_id);
  //   studentParentData.mother_education_id = Number(data?.mother_education_id);

  //   studentParentData.mother_occupation_id = data?.mother_occupation_id
  //     ? Number(data?.mother_occupation_id)
  //     : (undefined as unknown as number);

  //   studentParentData.mother_position_id = data?.mother_occupation_position_id
  //     ? Number(data?.mother_occupation_position_id)
  //     : (undefined as unknown as number);

  //   studentParentData.mother_salary_id = data?.mother_salary_id
  //     ? Number(data?.mother_salary_id)
  //     : (undefined as unknown as number);

  //   studentParentData.parent_address = data?.parent_address;
  //   studentParentData.parent_province_id = Number(data?.parent_province_id);
  //   studentParentData.parent_city_id = Number(data?.parent_city_id);
  //   studentParentData.parent_subdistrict_id = Number(data?.parent_subdistrict_id);

  //   if (data?.guardian_name) {
  //     studentGuardianData.guardian_name = data?.guardian_name;
  //     studentGuardianData.guardian_status_id = Number(data?.guardian_status_id);
  //     studentGuardianData.guardian_education_id = Number(data?.guardian_education_id);
  //     studentGuardianData.guardian_occupation_id = Number(data?.guardian_occupation_id);
  //     studentGuardianData.guardian_position_id = Number(data?.guardian_position_id);
  //     studentGuardianData.guardian_salary_id = Number(data?.guardian_salary_id);
  //     studentGuardianData.guardian_province_id = Number(data?.guardian_province_id);
  //     studentGuardianData.guardian_city_id = Number(data?.guardian_city_id);
  //     studentGuardianData.guardian_subdistrict_id = Number(data?.guardian_subdistrict_id);
  //     studentGuardianData.guardian_address = data?.guardian_address;
  //   }

  //   try {
  //     console.log(data);
  //     console.log(studentParentData);
  //     mutate(
  //       data?.guardian_name
  //         ? { ...studentParentData, ...studentGuardianData }
  //         : { ...studentParentData },
  //       {
  //         onSuccess: () => {
  //           setIsSubmitted(true);
  //           setTimeout(() => {
  //             toast.success("Berhasil mengisi formulir", {
  //               position: "top-center",
  //               autoClose: 5000,
  //               hideProgressBar: false,
  //               closeOnClick: true,
  //               pauseOnHover: true,
  //               draggable: true,
  //               progress: undefined,
  //               theme: "light",
  //             });
  //           }, 500);
  //         },
  //         onError: () => {
  //           setTimeout(() => {
  //             toast.error("Gagal mengisi formulir", {
  //               position: "top-center",
  //               autoClose: 5000,
  //               hideProgressBar: false,
  //               closeOnClick: true,
  //               pauseOnHover: true,
  //               draggable: true,
  //               progress: undefined,
  //               theme: "light",
  //             });
  //           }, 500);
  //         },
  //       },
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // });

  return (
    <form noValidate>
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

      <section className="flex flex-wrap justify-center items-center gap-x-1 w-full lg:flex lg:items-center gap-y-4 lg:justify-between lg:w-[60vw] md:flex md:flex-wrap md:w-80% md:justify-between text-left xl:w-55%">
        <div className="w-80% px-5 flex flex-col gap-y-4 md:flex md:flex-row md:w-full md:px-0 md:justify-between">
          <div className="flex-col">
            <h1 className="font-bold text-xl my-6 lg:pl-0 md:pl-[11vw] place-self-start pl-4">
              Profil Ayah
            </h1>
            <TextField
              inputHeight="h-10"
              name="father_name"
              variant="sm"
              type="text"
              required
              placeholder="Nama Lengkap Ayah Kandung"
              labelclassname="text-sm font-semibold"
              label="Nama Wali"
              inputWidth="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
              control={control}
              // disabled={isSubmitted || !!student?.father_name}
            />
          </div>
          <div className="flex-col">
            <h1 className="font-bold text-xl my-6 lg:pl-0 md:pl-[11vw] place-self-start pl-4">
              Profil Ibu
            </h1>
            <TextField
              inputHeight="h-10"
              name="mother_name"
              variant="sm"
              type="text"
              required
              placeholder="Nama Lengkap Ibu Kandung"
              labelclassname="text-sm font-semibold"
              label="Nama Ibu"
              inputWidth="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
              control={control}
              // disabled={isSubmitted || !!student?.mother_name}
              // message={errors?.mother_name?.message as string}
              // status={errors?.mother_name?.message ? "error" : "none"}
            />
          </div>
        </div>
        <div className="w-80% px-5 flex flex-col gap-y-4 md:flex md:flex-row md:w-full md:px-0 md:justify-between">
          <SelectOption
            name="father_status_id"
            labels="Status ayah"
            placeholder={
              student?.father_status_id
                ? parentStatusOptions?.find(
                    (status) => Number(status.value) === student?.father_status_id,
                  )?.label
                : "Status Ayah"
            }
            labelClassName="font-bold text-xs py-2"
            options={parentStatusOptions || []}
            className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
            required
            isSearchable={false}
            control={control}
            isMulti={false}
            isClearable={true}
            // disabled={isSubmitted || !!student?.mother_status_id}
            status="error"
            // message={errors?.mother_status_id?.message as string}
          />

          <SelectOption
            name="mother_status_id"
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
            className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
            required
            isSearchable={false}
            control={control}
            isMulti={false}
            isClearable={true}
            // disabled={isSubmitted || !!student?.mother_status_id}
            status="error"
            // message={errors?.mother_status_id?.message as string}
          />
        </div>
        <div className="w-80% px-5 flex flex-col gap-y-4 md:flex md:flex-row md:w-full md:px-0 md:justify-between">
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
            className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
            isSearchable={false}
            control={control}
            isMulti={false}
            isClearable={true}
            status="error"
          />
          <SelectOption
            name="mother_education_id"
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
            className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
            isSearchable={false}
            control={control}
            isMulti={false}
            isClearable={true}
            status="error"
          />
        </div>
        <div className="w-80% px-5 flex flex-col gap-y-4 md:flex md:flex-row md:w-full md:px-0 md:justify-between">
          <SelectOption
            name="father_occupation_id"
            labels="Pekerjaan Ayah"
            placeholder={
              student?.father_occupation_id
                ? occupationOptions?.find(
                    (occupation) => Number(occupation.value) === student?.father_occupation_id,
                  )?.label
                : "Pilih pekerjaan"
            }
            options={occupationOptions || []}
            labelClassName="font-bold text-xs py-2"
            className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
            isSearchable={true}
            control={control}
            isMulti={false}
            isClearable={true}
            // disabled={
            //   isSubmitted ||
            //   !!student?.mother_occupation_id ||
            //   isMotherStatus ||
            //   !!student?.mother_status_id
            // }
            status="error"
            // message={errors?.mother_occupation_id?.message as string}
          />
          <SelectOption
            name="mother_occupation_id"
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
            className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
            isSearchable={true}
            control={control}
            isMulti={false}
            isClearable={true}
            // disabled={
            //   isSubmitted ||
            //   !!student?.mother_occupation_id ||
            //   isMotherStatus ||
            //   !!student?.mother_status_id
            // }
            status="error"
            // message={errors?.mother_occupation_id?.message as string}
          />
        </div>
        <div className="w-80% px-5 flex flex-col gap-y-4 md:flex md:flex-row md:w-full md:px-0 md:justify-between">
          <SelectOption
            name="father_salary_id"
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
            className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
            isSearchable={false}
            control={control}
            isMulti={false}
            isClearable={true}
            // disabled={
            //   isSubmitted ||
            //   !!student?.mother_salary_id ||
            //   isMotherStatus ||
            //   isUnemployedMother ||
            //   !!student?.mother_status_id
            // }
            status="error"
            // message={errors?.mother_salary_id?.message as string}
          />
          <SelectOption
            name="mother_salary_id"
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
            className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
            isSearchable={false}
            control={control}
            isMulti={false}
            isClearable={true}
            // disabled={
            //   isSubmitted ||
            //   !!student?.mother_salary_id ||
            //   isMotherStatus ||
            //   isUnemployedMother ||
            //   !!student?.mother_status_id
            // }
            status="error"
            // message={errors?.mother_salary_id?.message as string}
          />
        </div>
      </section>

      {/* Parent Address */}
      <h1 className="font-bold text-xl my-6 lg:pl-0 md:pl-[11vw] xl:pl-0 place-self-start pl-4">
        Alamat Orang Tua
      </h1>
      <section className="flex flex-wrap justify-center items-center gap-x-1 w-full lg:flex lg:items-center gap-y-4 lg:justify-between lg:w-[60vw] md:flex md:flex-wrap md:w-80% md:justify-between text-left xl:w-55%">
        <div className="w-80% px-5 flex flex-col gap-y-4 md:flex md:flex-row md:w-full md:px-0 md:justify-between">
          <SelectOption
            labels="Provinsi"
            className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
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
            name="parent_province_id"
            isClearable={true}
            control={control}
            isMulti={false}
            // disabled={isSubmitted || !!student?.parent_province_id}
            status="error"
            // message={errors?.parent_province_id?.message as string}
          />
          <SelectOption
            labels="Kota/Kabupaten"
            className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
            labelClassName="font-bold text-xs py-2"
            options={cityOptionsParent || []}
            placeholder={
              student?.parent_city_id
                ? cityOptionsParent?.find((city) => Number(city.value) === student?.parent_city_id)
                    ?.label
                : "Kota/Kabupaten"
            }
            isSearchable={true}
            name="parent_city_id"
            isClearable={true}
            control={control}
            isMulti={false}
            // disabled={!watch("parent_province_id") || isSubmitted || !!student?.parent_city_id}
            status="error"
            // message={errors?.parent_city_id?.message as string}
          />
        </div>
        <div className="w-80% px-5 flex flex-col gap-y-4 md:flex md:flex-row md:w-full md:px-0 md:justify-between">
          <SelectOption
            labels="Kecamatan"
            className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
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
            name="parent_subdistrict_id"
            control={control}
            isMulti={false}
            isClearable={true}
            // disabled={!watch("parent_city_id") || isSubmitted || !!student?.parent_subdistrict_id}
            status="error"
            // message={errors?.parent_subdistrict_id?.message as string}
          />

          <TextField
            inputHeight="h-10"
            name="parent_address"
            variant="sm"
            type="text"
            required
            placeholder="Masukan Alamat Orang Tua"
            labelclassname="text-sm font-semibold"
            label="Alamat Orang Tua"
            inputWidth="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
            control={control}
            // disabled={isSubmitted || !!student?.father_name}
          />
        </div>
      </section>

      <section className="flex flex-wrap justify-center items-center gap-x-1 w-full lg:flex lg:items-center gap-y-4 lg:justify-between lg:w-[60vw] md:flex md:flex-wrap md:w-80% md:justify-between text-left xl:w-55%">
        <div className="w-80% px-5 flex flex-col gap-y-4 md:flex md:flex-row md:w-full md:px-0 md:justify-between">
          <div className="flex-col">
            <h1 className="font-bold text-xl my-6 lg:pl-0 md:pl-[11vw] place-self-start pl-4">
              Profil Wali
            </h1>
            <TextField
              inputHeight="h-10"
              name="guardian_name"
              variant="sm"
              type="text"
              required
              placeholder="Nama Lengkap Wali"
              labelclassname="text-sm font-semibold"
              label="Nama Wali"
              inputWidth="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
              control={control}
              // disabled={isSubmitted || !!student?.father_name}
            />
          </div>
          <div className="flex-col">
            <h1 className="font-bold text-xl my-6 lg:pl-0 md:pl-[11vw] place-self-start pl-4">
              Alamat Wali
            </h1>
            <SelectOption
              labels="Provinsi"
              className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
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
              name="guardian_province_id"
              isClearable={true}
              control={control}
              isMulti={false}
              // disabled={isSubmitted || !!student?.parent_province_id}
              status="error"
              // message={errors?.parent_province_id?.message as string}
            />
          </div>
        </div>
        <div className="w-80% px-5 flex flex-col gap-y-4 md:flex md:flex-row md:w-full md:px-0 md:justify-between">
          <SelectOption
            name="guardian_status_id"
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
            className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
            isSearchable={false}
            control={control}
            isMulti={false}
            isClearable={true}
          />
          <SelectOption
            labels="Kota/Kabupaten"
            className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
            labelClassName="font-bold text-xs py-2"
            options={cityOptionsGuard || []}
            placeholder={
              student?.guardian_city_id
                ? cityOptionsGuard?.find((city) => Number(city.value) === student?.guardian_city_id)
                    ?.label
                : "Kota/Kabupaten"
            }
            isSearchable={true}
            name="guardian_city_id"
            isClearable={true}
            control={control}
            isMulti={false}
            // disabled={
            //   !watch("guardian_province_id") ||
            //   isSubmitted ||
            //   !!student?.guardian_city_id ||
            //   !!student?.mother_name
            // }
          />
        </div>
        <div className="w-80% px-5 flex flex-col gap-y-4 md:flex md:flex-row md:w-full md:px-0 md:justify-between">
          <SelectOption
            name="guardian_education_id"
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
            className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
            isSearchable={false}
            control={control}
            isMulti={false}
            isClearable={true}
            // disabled={isSubmitted || !!student?.guardian_education_id || !!student?.mother_name}
          />
          <SelectOption
            labels="Kecamatan"
            className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
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
            name="guardian_subdistrict_id"
            control={control}
            isMulti={false}
            isClearable={true}
            // disabled={
            //   !watch("guardian_city_id") ||
            //   isSubmitted ||
            //   !!student?.guardian_subdistrict_id ||
            //   !!student?.mother_name
            // }
          />
        </div>
        <div className="w-80% px-5 flex flex-col gap-y-4 md:flex md:flex-row md:w-full md:px-0 md:justify-between">
          <SelectOption
            name="guardian_occupation_id"
            labels="Pekerjaan Wali"
            placeholder={
              student?.guardian_occupation_id
                ? occupationOptions?.find(
                    (occupation) => Number(occupation.value) === student?.guardian_occupation_id,
                  )?.label
                : "Pilih pekerjaan"
            }
            options={occupationOptions || []}
            labelClassName="font-bold text-xs py-2"
            className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
            isSearchable={true}
            control={control}
            isMulti={false}
            isClearable={true}
            status="error"
          />
          <TextField
            inputHeight="h-10"
            name="guardian_address"
            variant="sm"
            type="text"
            required
            placeholder="Masukan Alamat Wali"
            labelclassname="text-sm font-semibold"
            label="Alamat Domisili"
            inputWidth="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
            control={control}
            // disabled={isSubmitted || !!student?.father_name}
          />
        </div>
        <div className="w-80% px-5 flex flex-col gap-y-4 md:flex md:flex-row md:w-full md:px-0 md:justify-between">
          <SelectOption
            name="guardian_salary_id"
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
            className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
            isSearchable={false}
            control={control}
            isMulti={false}
            isClearable={true}
            // disabled={
            //   isSubmitted ||
            //   !!student?.guardian_salary_id ||
            //   isGuardianStatus ||
            //   isUnemployedGuardian ||
            //   !!student?.mother_name
            // }
          />
        </div>
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
  );
};