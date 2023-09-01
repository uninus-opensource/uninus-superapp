import { FC, ReactElement, useEffect, useMemo, useState } from "react";
import { Accordion, Button, TextField, UploadField } from "@uninus/web/components";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { NilaiValues } from "../../type";
import { useGetStudentGrade, useStudentGradeUpdate } from "../../hooks";

export const DataNilaiSection: FC = (): ReactElement => {
  const [isDisabled, setIsdisabled] = useState<boolean>(false);

  const { control, handleSubmit, reset, setValue, watch, getValues } = useForm<NilaiValues>({
    mode: "all",
    defaultValues: {},
  });

  const { mutate } = useStudentGradeUpdate();

  const onSubmit = handleSubmit((data) => {
    try {
      const { average_grade, utbk, ...dataGrade } = data;
      const studentGrade = JSON.stringify(dataGrade)
        .replace(/{|}/gi, "")
        .split(",")
        .map((el) => {
          const data = el?.split(":");
          return {
            subject: data?.[0]?.includes("mtk")
              ? "matematika"
              : data?.[0]?.includes("bind")
              ? "indonesia"
              : data?.[0]?.includes("bing")
              ? "inggris"
              : "",
            semester: data?.[0]?.includes("1")
              ? "1"
              : data?.[0]?.includes("2")
              ? "2"
              : data?.[0]?.includes("3")
              ? "3"
              : data?.[0]?.includes("4")
              ? "4"
              : "0",
            grade: Number(data?.[1]?.replace(/"|'/gi, "")),
          };
        });

      mutate(
        {
          student_grade: studentGrade,
          average_grade: Number(average_grade),
          utbk: Number(utbk),
        },
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

  const labelSemesterStyle = "text-[13px] md:text-base";
  const labelCourseStyle = "text-[12px] lg:text-base font-bold lg:pr-0";
  const labelUTBKStyle = "flex items-center justify-between w-full lg:w-1/2  xl:pr-12 2xl:pr-16 ";
  const { data } = useGetStudentGrade();

  const student = useMemo(() => {
    return data;
  }, [data]);
  const dataStudentGrade = useMemo(
    () =>
      student?.student_grade.reduce(
        (obj, item) => (
          (obj[
            `${
              item?.subject?.includes("indonesia")
                ? `bind${item.semester}`
                : item?.subject?.includes("matematika")
                ? `mtk${item?.semester}`
                : item?.subject?.includes("inggris") && `bing${item?.semester}`
            }`
          ] = item.grade),
          obj
        ),
        {} as { [key: string]: number },
      ),
    [student?.student_grade],
  );

  const watchStudentGrade = watch([
    "mtk1",
    "mtk2",
    "mtk3",
    "mtk4",
    "bind1",
    "bind2",
    "bind3",
    "bind4",
    "bing1",
    "bing2",
    "bing3",
    "bing4",
  ]);

  useEffect(() => {
    reset(dataStudentGrade);
  }, [dataStudentGrade, reset]);

  useEffect(() => {
    const { average_grade, utbk, ...grades } = getValues();
    const average = Object.values(grades);
    const result = Number(average.reduce((acc, curr) => Number(acc) + Number(curr), 0));
    setValue(
      "average_grade",
      Number(student?.average_grade === 0 ? (result / 12).toFixed(1) : student?.average_grade),
    );
    setValue("utbk", utbk === undefined ? Number(student?.utbk) : Number(utbk));
  }, [getValues, setValue, student?.average_grade, student?.utbk, watchStudentGrade]);

  return (
    <Accordion
      key="data-nilai-section"
      title="Nilai Rapor dan Skor UTBK"
      titleClassName="lg:text-lg text-md font-extrabold text-secondary-green-4 text-left"
      className="min-w-[90%] lg:w-full h-auto mt-[2rem] flex flex-col gap-5 items-center lg:items-baseline lg:ml-[3vw] xl:ml-[5vw] pb-6 md:pb-0"
    >
      <form onSubmit={onSubmit} className="w-screen">
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
        <h1 className="font-bold text-2xl mt-3  lg:pl-0 md:pl-[11vw] xl:pl-0 place-self-start pl-10">
          Nilai Rapor
        </h1>
        <p className="text-sm lg:text-base text-grayscale-7 mt-2">
          Masukkan hanya nilai pengetahuan <span className="text-red text-base text-red-6 ">*</span>
        </p>
        <section className="w-5/6 flex px-2 py-6 gap-y-4 mx-auto flex-col relative justify-center overflow-x-scroll lg:w-full lg:overflow-x-hidden">
          <div className="ml-20 flex gap-x-5 mt-9 lg:ml-36 lg:gap-x-11 lg:w-full">
            <div className="mb-4 flex-shrink-0">
              <p className={labelSemesterStyle}>Semester 1</p>
            </div>
            <div className="mb-4 flex-shrink-0">
              <p className={labelSemesterStyle}>Semester 2</p>
            </div>
            <div className="mb-4 flex-shrink-0">
              <p className={labelSemesterStyle}>Semester 3</p>
            </div>
            <div className="mb-4 flex-shrink-0">
              <p className={labelSemesterStyle}>Semester 4</p>
            </div>
          </div>

          <div className=" flex items-center gap-x-5 lg:gap-x-10 my-auto">
            <p className={labelCourseStyle}>Matematika</p>
            <div className="flex gap-x-7 ">
              <TextField
                inputHeight="h-10"
                name="mtk1"
                variant="md"
                type="number"
                labelclassname="text-xs md:text-sm "
                inputWidth="lg:w-26 w-16 text-base text-center"
                control={control}
                disabled={isDisabled || dataStudentGrade?.mtk1 ? true : false}
              />
              <TextField
                inputHeight="h-10"
                name="mtk2"
                variant="md"
                type="number"
                labelclassname="text-xs md:text-sm "
                inputWidth="lg:w-26 w-16 text-base text-center"
                control={control}
                disabled={isDisabled || dataStudentGrade?.mtk2 ? true : false}
              />
              <TextField
                inputHeight="h-10"
                name="mtk3"
                variant="md"
                type="number"
                labelclassname="text-sm "
                inputWidth="lg:w-26 w-16 text-base text-center"
                control={control}
                disabled={isDisabled || dataStudentGrade?.mtk3 ? true : false}
              />
              <TextField
                inputHeight="h-10"
                name="mtk4"
                variant="md"
                type="number"
                labelclassname="text-sm "
                inputWidth="lg:w-26 w-16 text-base text-center"
                control={control}
                disabled={isDisabled || dataStudentGrade?.mtk4 ? true : false}
              />
            </div>
          </div>
          <div className="flex items-center gap-x-5 lg:gap-x-10 my-auto">
            <p className={labelCourseStyle}>B.Indonesia </p>
            <div className="flex gap-x-7 ml-1">
              <TextField
                inputHeight="h-10"
                name="bind1"
                variant="md"
                type="number"
                labelclassname="text-xs md:text-sm  "
                inputWidth="lg:w-26 w-16 text-base text-center"
                control={control}
                disabled={isDisabled || dataStudentGrade?.bind1 ? true : false}
              />
              <TextField
                inputHeight="h-10"
                name="bind2"
                variant="md"
                type="number"
                labelclassname="text-xs md:text-sm "
                inputWidth="lg:w-26 w-16 text-base text-center"
                control={control}
                disabled={isDisabled || dataStudentGrade?.bind2 ? true : false}
              />
              <TextField
                inputHeight="h-10"
                name="bind3"
                variant="md"
                type="number"
                labelclassname="text-sm "
                inputWidth="lg:w-26 w-16 text-base text-center"
                control={control}
                disabled={isDisabled || dataStudentGrade?.bind3 ? true : false}
              />
              <TextField
                inputHeight="h-10"
                name="bind4"
                variant="md"
                type="number"
                labelclassname="text-sm "
                inputWidth="lg:w-26 w-16 text-base text-center"
                control={control}
                disabled={isDisabled || dataStudentGrade?.bind4 ? true : false}
              />
            </div>
          </div>
          <div className="flex items-center gap-x-6 lg:gap-x-14 my-auto">
            <p className={labelCourseStyle}>B.inggris</p>
            <div className="flex gap-x-7 ml-3">
              <TextField
                inputHeight="h-10"
                name="bing1"
                variant="md"
                type="number"
                labelclassname="text-xs md:text-sm"
                inputWidth="lg:w-26 w-16 text-base text-center"
                control={control}
                className="ml-4"
                disabled={isDisabled || dataStudentGrade?.bing1 ? true : false}
              />
              <TextField
                inputHeight="h-10"
                name="bing2"
                variant="md"
                type="number"
                labelclassname="text-sm "
                inputWidth="lg:w-26 w-16 text-base text-center"
                control={control}
                disabled={isDisabled || dataStudentGrade?.bing2 ? true : false}
              />
              <TextField
                inputHeight="h-10"
                name="bing3"
                variant="md"
                type="number"
                labelclassname="text-sm "
                inputWidth="lg:w-26 w-16 text-base text-center"
                control={control}
                disabled={isDisabled || dataStudentGrade?.bing3 ? true : false}
              />
              <TextField
                inputHeight="h-10"
                name="bing4"
                variant="md"
                type="number"
                labelclassname="text-sm "
                inputWidth="lg:w-26 w-16 text-base text-center"
                control={control}
                disabled={isDisabled || dataStudentGrade?.bing4 ? true : false}
              />
            </div>
          </div>
          <div className="flex lg:gap-x-10 items-center gap-x-8 my-auto w-screen">
            <div className="flex-shrink-0">
              <p className={labelCourseStyle}>Rata-rata</p>
            </div>
            <div className="lg:w-3/5 w-screen lg:ml-4 lg:pl-1 lg:pr-16">
              <TextField
                inputHeight="h-10"
                name="average_grade"
                variant="md"
                type="number"
                labelclassname="text-sm "
                inputWidth="w-95% lg:w-3/4 xl:w-[31.5rem] text-base text-center"
                control={control}
                disabled
              />
            </div>
          </div>
          <div className="flex items-center lg:gap-x-4 w-96 my-auto">
            <div className="flex-shrink-0">
              <p className={labelCourseStyle}>Upload Rapor</p>
            </div>
            <div className="flex gap-x-0 lg:gap-x-11 ml-2 lg:ml-1 w-80%">
              <UploadField
                className="min-w-[30%] "
                control={control}
                name="dokumen1"
                variant="custom"
                labels="Pilih File"
                labelClassName="labelText"
                preview={false}
              />
              <UploadField
                className="min-w-[30%] "
                control={control}
                name="dokumen2"
                variant="custom"
                labels="Pilih File"
                labelClassName="labelText"
                preview={false}
              />
              <UploadField
                className="min-w-[30%]"
                control={control}
                name="dokumen3"
                variant="custom"
                labels="Pilih File"
                labelClassName="labelText"
                preview={false}
              />
              <UploadField
                className="min-w-[30%] "
                control={control}
                name="dokumen4"
                variant="custom"
                labels="Pilih File"
                labelClassName="labelText"
                preview={false}
              />
            </div>
          </div>
        </section>
        <h1 className="font-bold text-2xl lg:pl-0 md:pl-[11vw] xl:pl-0 place-self-start pl-10 mt-16 text-left">
          Skor SNBT
        </h1>
        <section className="w-5/6 flex px-2 py-6 gap-y-4 mx-auto flex-col  justify-center  lg:w-full  ">
          <div className={labelUTBKStyle}>
            <p className="font-bold text-sm md:text-base">Penalaran Umum</p>
            <TextField
              inputHeight="h-10"
              name="utbk"
              variant="md"
              type="number"
              labelclassname="text-sm "
              inputWidth="w-26 text-base text-center"
              control={control}
              disabled={isDisabled || student?.utbk ? true : false}
            />
          </div>
          <div className={labelUTBKStyle}>
            <p className="font-bold text-sm md:text-base">Kemampuan Kuantitatif</p>
            <TextField
              inputHeight="h-10"
              name="utbk"
              variant="md"
              type="number"
              labelclassname="text-sm "
              inputWidth="w-26 text-base text-center"
              control={control}
              disabled={isDisabled || student?.utbk ? true : false}
            />
          </div>
          <div className={labelUTBKStyle}>
            <p className="font-bold text-sm md:text-base text-left">
              Pengetahuan dan Pemahaman Umum
            </p>
            <TextField
              inputHeight="h-10"
              name="utbk"
              variant="md"
              type="number"
              labelclassname="text-sm "
              inputWidth="w-26 text-base text-center"
              control={control}
              disabled={isDisabled || student?.utbk ? true : false}
            />
          </div>
          <div className={labelUTBKStyle}>
            <p className="font-bold text-sm md:text-base text-left">
              Kemampuan Memahami Bacaan dan Menulis
            </p>
            <TextField
              inputHeight="h-10"
              name="utbk"
              variant="md"
              type="number"
              labelclassname="text-sm "
              inputWidth="w-26 text-base text-center"
              control={control}
              disabled={isDisabled || student?.utbk ? true : false}
            />
          </div>
        </section>
        <section className="w-5/6 flex px-2 py-6 gap-y-4 mx-auto flex-col  justify-center   lg:w-full">
          <div className={labelUTBKStyle}>
            <p className="font-bold text-sm md:text-base">Rata-Rata Skor :</p>
            <TextField
              inputHeight="h-10"
              name="utbk"
              variant="md"
              type="number"
              labelclassname="text-sm "
              inputWidth="w-26 text-base text-center"
              control={control}
              disabled={isDisabled || student?.utbk ? true : false}
            />
          </div>
          <div className={labelUTBKStyle}>
            <p className="flex-shrink-0 mr-5 font-bold text-sm md:text-base">Sertifikat UTBK : </p>
            <UploadField control={control} name="UTBK" variant="default" preview={false} />
          </div>
        </section>

        <div className="flex w-5/6 lg:w-3/5 justify-end p-4 mt-8">
          <Button
            type="submit"
            variant="filled"
            size="md"
            width="w-30% lg:w-25% xl:w-15%"
            disabled={isDisabled || !!student?.utbk}
          >
            Submit
          </Button>
        </div>
      </form>
    </Accordion>
  );
};
