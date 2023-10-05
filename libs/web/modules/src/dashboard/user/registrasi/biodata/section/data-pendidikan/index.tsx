import { FC, ReactElement, useEffect, useMemo, useState } from "react";
import { Accordion, TextField, SelectOption, Button, Modal } from "@uninus/web/components";
import { useForm, FieldValues } from "react-hook-form";
import { useBiodataUpdate } from "../../hooks";
import { dataPendidikan } from "../../store";
import { ToastContainer, toast } from "react-toastify";
import { TVSDataPendidikan, VSDataPendidikan } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useStudentData,
  useEducationHistoryGet,
  useEducationMajorGet,
  useEducationTypeGet,
  useProvinceGet,
  useCityGet,
  useSubdistrictGet,
} from "@uninus/web/services";

export const DataPendidikanSection: FC = (): ReactElement => {
  const [education, setEducation] = useState<string>("");
  const [isDisabled, setIsdisabled] = useState<boolean>(false);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [locationMeta] = useState({
    search: "",
    province_id: "",
    city_id: "",
  });

  const { getStudent } = useStudentData();
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
  } = useForm<FieldValues | TVSDataPendidikan>({
    resolver: zodResolver(VSDataPendidikan),
    mode: "all",
    defaultValues: {},
  });

  const handleCloseModal = () => {
    setIsShowModal(!isShowModal);
  };

  // Education Type
  const [educationType] = useState({
    degree_program_id: getStudent?.degree_program_id as unknown as string,
  });

  const { data: getEducationType } = useEducationTypeGet(educationType);

  const educationTypeOptions = useMemo(
    () =>
      getEducationType?.school_type?.map((educationType) => ({
        label: educationType?.name,
        value: educationType?.id.toString(),
      })),
    [getEducationType?.school_type],
  );

  // Education History
  const [educationHistory] = useState({
    search: "",
    npsn: student?.education_npsn ? student?.education_npsn : watch("education_npsn"),
  });

  const { data: getEducationHistory } = useEducationHistoryGet(educationHistory);

  const educationHistoryOptions = useMemo(() => {
    return getEducationHistory?.education?.map((educationHistory) => ({
      value: educationHistory?.id.toString(),
      npsn: educationHistory?.npsn,
      school_name: educationHistory.name,
      province: educationHistory.province,
      sub_district: educationHistory.sub_district,
      district_city: educationHistory.district_city,
      street_address: educationHistory.street_address,
    }));
  }, [getEducationHistory?.education]);

  // Education Major

  const { data: getMajor } = useEducationMajorGet({
    education_type_id: watch("education_type_id"),
    search: "",
  });

  const majorOptions = useMemo(
    () =>
      getMajor?.education_major?.map((major) => ({
        label: major?.name,
        value: major?.id.toString(),
      })),
    [getMajor?.education_major],
  );

  const { data: getProvincies } = useProvinceGet(locationMeta);

  const schoolProvinceOptions = useMemo(
    () =>
      getProvincies?.province?.map((province) => ({
        label: province?.name,
        value: province?.id.toString(),
      })),
    [getProvincies?.province],
  );

  const { data: getCitySchool } = useCityGet({
    province_id: watch("address_province_school"),
    search: "",
  });

  const citySchoolOptions = useMemo(
    () =>
      getCitySchool?.city?.map((city) => ({
        label: city?.name,
        value: city?.id.toString(),
      })),
    [getCitySchool?.city],
  );

  const { data: getSubdistrictSchool } = useSubdistrictGet({
    city_id: watch("address_city_school"),
    search: "",
  });

  const subDistrictOptions = useMemo(
    () =>
      getSubdistrictSchool?.subdistrict?.map((subdistrict) => ({
        label: subdistrict?.name,
        value: subdistrict?.id.toString(),
      })),
    [getSubdistrictSchool?.subdistrict],
  );

  useEffect(() => {
    if (education || student?.education_npsn) {
      setValue(
        "school_name",
        educationHistoryOptions?.find(
          (item) => item.npsn === (student?.education_npsn ? student?.education_npsn : education),
        )?.school_name,
      );
      setValue(
        "school_province",
        educationHistoryOptions?.find(
          (item) => item.npsn === (student?.education_npsn ? student?.education_npsn : education),
        )?.province,
      );
      setValue(
        "school_city",
        educationHistoryOptions?.find(
          (item) => item.npsn === (student?.education_npsn ? student?.education_npsn : education),
        )?.district_city,
      );
      setValue(
        "school_subdistrict",
        educationHistoryOptions?.find(
          (item) => item.npsn === (student?.education_npsn ? student?.education_npsn : education),
        )?.sub_district,
      );
      setValue(
        "school_address",
        educationHistoryOptions?.find(
          (item) => item.npsn === (student?.education_npsn ? student?.education_npsn : education),
        )?.street_address,
      );
    } else {
      setValue("school_name", "");
      setValue("school_province", "");
      setValue("school_city", "");
      setValue("school_subdistrict", "");
      setValue("school_address", "");
    }
  }, [setValue, education, educationHistoryOptions, student?.education_npsn]);

  useEffect(() => {
    reset(student);
  }, [student, reset, getStudent]);

  const { mutate } = useBiodataUpdate();

  const onSubmit = handleSubmit((data) => {
    dataPendidikan.education_type_id = Number(data?.education_type_id);
    dataPendidikan.education_major_id = Number(data?.education_major_id);
    dataPendidikan.education_npsn = data?.education_npsn;
    dataPendidikan.graduation_year = data?.graduation_year;

    try {
      mutate(
        { ...dataPendidikan },
        {
          onSuccess: () => {
            setIsdisabled(true);
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
      console.error(error);
    }
  });

  return (
    <Accordion
      title="Data Pendidikan"
      key="data-pendidikan-section"
      titleClassName="lg:text-lg text-md font-extrabold text-secondary-green-4"
      className="w-full h-auto mt-[2rem] flex flex-col gap-5 items-center lg:items-baseline lg:ml-[3vw] xl:ml-[5vw] pb-6 md:pb-0"
    >
      <form onSubmit={onSubmit} noValidate>
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
        <section className="flex flex-wrap justify-center items-center gap-x-1 w-full lg:flex lg:items-start gap-y-4 lg:justify-between lg:w-55% md:flex md:flex-wrap md:w-80% md:justify-between text-left">
          <div className="w-80% px-5 flex flex-col gap-y-4 md:flex md:flex-row md:w-full md:px-0 md:justify-between">
            <SelectOption
              name="education_type_id"
              labels="Jenis Pendidikan Asal"
              labelClassName="font-bold text-xs py-2"
              required
              placeholder={
                student?.education_type_id
                  ? educationTypeOptions?.find(
                      (item) => Number(item.value) === student?.education_type_id,
                    )?.label
                  : "Jenis Pendidikan"
              }
              className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
              options={educationTypeOptions || []}
              isSearchable={false}
              isClearable={true}
              control={control}
              isMulti={false}
              disabled={isDisabled || !!student?.education_type_id}
              status={"error"}
              message={errors?.education_type_id?.message as string}
            />

            <TextField
              inputHeight="h-10"
              name="graduation_year"
              variant="sm"
              type="text"
              required
              labelclassname="text-sm font-semibold"
              label="Tahun Lulus"
              placeholder="Nama Sekolah"
              inputWidth="w-70% lg:w-[27vw] xl:w-[25vw] text-base md:w-[33vw] "
              control={control}
              message={errors?.graduation_year?.message as string}
              disabled={isDisabled || !!student?.graduation_year}
            />
          </div>
          <div className="w-80% px-5 flex flex-col gap-y-4 md:flex md:flex-row md:w-full md:px-0 md:justify-between">
            <div className="flex flex-col justify-center items-start lg:justify-start">
              <TextField
                inputHeight="h-10"
                name="education_npsn"
                variant="sm"
                required={"Harus diisi"}
                type="text"
                labelclassname="text-sm font-semibold"
                label="NPSN"
                placeholder="Masukan NPSN"
                inputWidth="w-70% lg:w-[27vw] xl:w-[25vw] text-base md:w-[33vw] "
                control={control}
                message={errors?.education_npsn?.message as string}
                status={errors?.education_npsn?.message ? "error" : "none"}
                onChange={(e) => {
                  setValue("education_npsn", e.target.value);
                  setEducation(e.target.value);
                }}
                disabled={isDisabled || !!student?.education_npsn}
              />

              <p className="text-[0.8rem] text-primary-black">
                Jika data tidak ditemukan, silakan &nbsp;
                <span
                  className="text-primary-green hover:cursor-pointer underline font-bold"
                  onClick={handleCloseModal}
                >
                  Tambah Sekolah
                </span>
              </p>
              <p className="text-[0.7rem] text-left">
                Cek NPSN &nbsp;
                <a
                  href="https://dapo.kemdikbud.go.id/pencarian"
                  className="hover:cursor-pointer text-primary-black"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://dapo.kemdikbud.go.id/pencarian
                </a>
              </p>
            </div>

            <TextField
              inputHeight="h-10"
              name="school_name"
              variant="sm"
              type="text"
              required
              labelclassname="text-sm font-semibold"
              label="Nama Pendidikan Asal"
              placeholder="Nama Sekolah"
              inputWidth="w-70% lg:w-[27vw] xl:w-[25vw] text-base md:w-[33vw] "
              control={control}
              disabled
            />
          </div>
          <div className="w-80% px-5 flex flex-col gap-y-4 md:flex md:flex-row md:w-full md:px-0 md:justify-between">
            <TextField
              inputHeight="h-10"
              name="school_province"
              variant="sm"
              type="text"
              required
              labelclassname="text-sm font-semibold"
              label="Provinsi"
              placeholder="Provinsi Sekolah"
              inputWidth="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
              control={control}
              disabled
            />

            <TextField
              inputHeight="h-10"
              name="school_city"
              variant="sm"
              required
              type="text"
              labelclassname="text-sm font-semibold"
              label="Kota/Kabupaten"
              placeholder="Kota Sekolah"
              inputWidth="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw] "
              control={control}
              disabled
            />
          </div>

          <div className="w-80% px-5 flex flex-col gap-y-4 md:flex md:flex-row md:w-full md:px-0 md:justify-between">
            <TextField
              inputHeight="h-10"
              name="school_subdistrict"
              variant="sm"
              type="text"
              required
              labelclassname="text-sm font-semibold"
              label="Kecamatan"
              placeholder="Kecamatan Sekolah"
              inputWidth="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw] "
              control={control}
              disabled
            />
            {majorOptions?.find((item) => Number(item.value) === 1) ? (
              <SelectOption
                name="education_major_id"
                labels="Jurusan Pendidikan Asal"
                required={true}
                labelClassName="font-bold text-xs py-2"
                placeholder={
                  student?.education_major_id
                    ? majorOptions?.find(
                        (item) => Number(item.value) === student?.education_major_id,
                      )?.label
                    : "Jurusan Pendidikan"
                }
                options={majorOptions || []}
                isSearchable={false}
                control={control}
                isMulti={false}
                disabled={
                  isDisabled ||
                  !watch("education_type_id") ||
                  !!student?.education_major_id ||
                  majorOptions?.length === 1
                }
                status="error"
                message={errors?.education_major_id?.message as string}
                className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
              />
            ) : (
              <TextField
                inputHeight="h-10"
                name="vocational_high_school"
                variant="sm"
                type="text"
                labelclassname="text-sm font-semibold"
                label="Jurusan Pendidikan Asal"
                placeholder="Masukan jurusan sekolah anda"
                inputWidth="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw] "
                control={control}
                required
                disabled={
                  isDisabled || !watch("education_type_id") || !!student?.education_major_id
                }
              />
            )}
          </div>

          <div className="px-6 md:px-0 lg:px-0 w-full md:w-fit">
            <TextField
              name="school_address"
              variant="sm"
              type="text"
              labelclassname="text-xl font-semibold"
              label="Alamat Pendidikan Asal"
              required
              control={control}
              isTextArea
              textAreaRow={5}
              textAreaCols={30}
              inputHeight="h-20"
              inputWidth="md:w-[80vw] lg:w-55% w-[70vw]"
              className="resize-none bg-grayscale-2  "
              disabled
            />
          </div>
        </section>
        <div className="flex w-full justify-center lg:justify-end py-4 mt-8">
          <Button
            type="submit"
            variant="filled"
            size="md"
            width="w-70% lg:w-25% xl:w-15%"
            disabled={isDisabled || !!student?.education_npsn}
          >
            Submit
          </Button>
        </div>
      </form>
      <Modal showModal={isShowModal} onClose={handleCloseModal} modalTitle="Tambahkan Data Sekolah">
        <form className="w-full flex flex-col justify-center items-center gap-2">
          <div className="w-full">
            <TextField
              inputHeight="h-10"
              name="custom_school_name"
              variant="sm"
              type="text"
              required
              labelclassname="text-sm font-semibold"
              label="Nama Asal Sekolah"
              placeholder="Masukan Nama Sekolah"
              inputWidth="w-full"
              control={control}
            />
          </div>

          <div className="w-full flex gap-2 justify-between items-center">
            <div className="w-[45%]">
              <SelectOption
                name="custom_major"
                labels="Jenis Sekolah"
                labelClassName="font-bold text-xs py-2"
                placeholder="Pilih Jenis Sekolah"
                options={[
                  {
                    value: "SMK",
                    label: "SMK",
                  },
                  {
                    value: "MAN",
                    label: "MAN",
                  },
                  {
                    value: "SMKS",
                    label: "SMKS",
                  },
                  {
                    value: "MAS",
                    label: "MAS",
                  },
                  {
                    value: "SMAS",
                    label: "SMAS",
                  },
                  {
                    value: "SMAN",
                    label: "SMAN",
                  },
                ]}
                isSearchable={true}
                isClearable={true}
                control={control}
                isMulti={false}
                className="w-full"
                required
              />
            </div>

            <div className="w-[55%] mt-4">
              <TextField
                inputHeight="h-10"
                name="custom_NPSN"
                variant="sm"
                type="text"
                required
                labelclassname="text-sm font-semibold"
                label="NPSN ( Nomor Pokok Sekolah Nasional )"
                placeholder="Masukan NPSN"
                control={control}
              />
            </div>
          </div>

          <div className="w-full flex fle-col gap-3 justify-center items-center">
            <div className="w-[33%]">
              <SelectOption
                labels="Provinsi"
                labelClassName="font-bold text-xs py-2"
                options={schoolProvinceOptions || []}
                placeholder="Provinsi"
                isSearchable={true}
                name="address_province_school"
                isClearable={true}
                control={control}
                isMulti={false}
                className="w-full"
              />
            </div>

            <div className="w-[33%]">
              <SelectOption
                labels="Kota/Kabupaten"
                labelClassName="font-bold text-xs py-2"
                options={citySchoolOptions || []}
                placeholder="Kota/Kabupaten"
                isSearchable={true}
                name="address_city_school"
                isClearable={true}
                control={control}
                isMulti={false}
                disabled={!watch("address_province_school")}
                className="w-full"
              />
            </div>

            <div className="w-[33%]">
              <SelectOption
                labels="Kecamatan"
                labelClassName="font-bold text-xs py-2"
                options={subDistrictOptions || []}
                placeholder="Kecamatan"
                isSearchable={true}
                name="address_subdistrict_school"
                control={control}
                isMulti={false}
                isClearable={true}
                disabled={!watch("address_city_school")}
                className="w-full"
              />
            </div>
          </div>
          <div className="w-auto flex justify-center items-center">
            <TextField
              name="complete_school_address"
              variant="sm"
              type="text"
              labelclassname="text-xl font-semibold"
              label="Alamat Lengkap Sekolah"
              control={control}
              isTextArea
              textAreaRow={5}
              textAreaCols={70}
              inputHeight="h-20"
              className="resize-none bg-grayscale-2"
              inputWidth="lg:w-full"
              placeholder="Masukan Alamat Lengkap Sekolah"
            />
          </div>

          <div className="w-full flex justify-end items-center gap-3">
            <span
              className="text-secondary-green-5 px-2 py-1 hover:cursor-pointer font-bold"
              onClick={() => {
                setIsShowModal(false);
              }}
            >
              Batal
            </span>
            <Button variant="filled" size="md">
              Tambahkan
            </Button>
          </div>
        </form>
      </Modal>
    </Accordion>
  );
};
