import { FC, ReactElement, useEffect } from "react";
import { Button, TextField, UploadField } from "@uninus/web/components";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

// import { TVSDataNilai, VSDataNilai } from "./schema";
// import { zodResolver } from "@hookform/resolvers/zod";

export const EditDataNilaiRaport: FC = (): ReactElement => {
  const { control, setValue, watch, getValues } = useForm({
    mode: "all",
  });

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

  const watchUtbk = watch(["utbk_kk", "utbk_pu", "utbk_ppu", "utbk_kmbm"]);

  useEffect(() => {
    const {
      utbk_kk,
      utbk_pu,
      utbk_ppu,
      utbk_kmbm,
      mtk1,
      mtk2,
      mtk3,
      mtk4,
      bind1,
      bind2,
      bind3,
      bind4,
      bing1,
      bing2,
      bing3,
      bing4,
    } = getValues();

    const average = Object.values({
      mtk1,
      mtk2,
      mtk3,
      mtk4,
      bind1,
      bind2,
      bind3,
      bind4,
      bing1,
      bing2,
      bing3,
      bing4,
    });

    const result = Number(average.reduce((acc, curr) => Number(acc) + Number(curr), 0));
    const averageUtbk =
      utbk_kk && utbk_pu && utbk_ppu && utbk_kmbm // Check if all UTBK values are present
        ? Object.values({ utbk_kk, utbk_pu, utbk_ppu, utbk_kmbm })
        : [];

    const resultUtbk = Number(averageUtbk.reduce((acc, curr) => Number(acc) + Number(curr), 0));

    setValue("average_grade", Number((result / 12).toFixed(1)));

    setValue("average_utbk", Number((resultUtbk / 4).toFixed(1)));
  }, [getValues, setValue, watchStudentGrade, watchUtbk]);

  return (
    <form>
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
      <h1 className="font-bold text-2xl md:pl-16 lg:pl-0 mt-3 place-self-start text-center md:text-left">
        Nilai Rapor
      </h1>

      <section className="flex flex-wrap justify-center items-center gap-x-1 w-full lg:flex lg:items-center gap-y-4 lg:justify-between lg:w-[60vw] md:flex md:flex-wrap md:w-80% md:justify-between text-left xl:w-55%">
        <div className="md:ml-20 lg:ml-[8rem] flex gap-x-12 md:gap-x-5 mt-9 lg:gap-x-11 lg:w-full ">
          <p className="text-[12px] lg:text-base font-bold lg:pr-0 md:hidden">Semester</p>
          <div className="mb-4 flex-shrink-0">
            <p className="hidden md:block md:text-[13px] lg:text-base">Semester 1</p>
            <p className="text-[13px] md:hidden">1</p>
          </div>
          <div className="mb-4 flex-shrink-0">
            <p className="hidden md:block md:text-[13px] lg:text-base">Semester 2</p>
            <p className="text-[13px] md:hidden">2</p>
          </div>
          <div className="mb-4 flex-shrink-0">
            <p className="hidden md:block md:text-[13px] lg:text-base">Semester 3</p>
            <p className="text-[13px] md:hidden">3</p>
          </div>
          <div className="mb-4 flex-shrink-0">
            <p className="hidden md:block md:text-[13px] lg:text-base">Semester 4</p>
            <p className="text-[13px] md:hidden">4</p>
          </div>
        </div>

        <div className=" flex items-center gap-x-5 lg:gap-x-10 my-auto">
          <p className="text-[12px] lg:text-base font-bold lg:pr-0">Matematika</p>
          <div className="flex gap-x-4 md:gap-x-4">
            <TextField
              inputHeight="h-10"
              name="mtk1"
              variant="md"
              type="number"
              labelclassname="text-xs md:text-sm "
              inputWidth="lg:w-26 w-10 md:w-16 text-xs md:text-base text-center"
              control={control}
              // disabled={isDisabled || dataStudentGrade?.mtk1 ? true : false}
            />
            <TextField
              inputHeight="h-10"
              name="mtk2"
              variant="md"
              type="number"
              labelclassname="text-xs md:text-sm "
              inputWidth="lg:w-26 w-10 md:w-16 text-xs md:text-base text-center"
              control={control}
              // disabled={isDisabled || dataStudentGrade?.mtk2 ? true : false}
            />
            <TextField
              inputHeight="h-10"
              name="mtk3"
              variant="md"
              type="number"
              labelclassname="text-sm "
              inputWidth="lg:w-26 w-10 md:w-16 text-xs md:text-base text-center"
              control={control}
              // disabled={isDisabled || dataStudentGrade?.mtk3 ? true : false}
            />
            <TextField
              inputHeight="h-10"
              name="mtk4"
              variant="md"
              type="number"
              labelclassname="text-sm "
              inputWidth="lg:w-26 w-10 md:w-16 text-xs md:text-base text-center"
              control={control}
              // disabled={isDisabled || dataStudentGrade?.mtk4 ? true : false}
            />
          </div>
        </div>
        <div className="flex items-center gap-x-5 lg:gap-x-10 my-auto">
          <p className="text-[12px] lg:text-base font-bold lg:pr-0">B.Indonesia</p>
          <div className="flex gap-x-4 md:gap-x-4">
            <TextField
              inputHeight="h-10"
              name="bind1"
              variant="md"
              type="number"
              labelclassname="text-xs md:text-sm"
              inputWidth="lg:w-26 w-10 md:w-16 text-xs md:text-base text-center"
              control={control}
              // disabled={isDisabled || dataStudentGrade?.bind1 ? true : false}
            />
            <TextField
              inputHeight="h-10"
              name="bind2"
              variant="md"
              type="number"
              labelclassname="text-xs md:text-sm"
              inputWidth="lg:w-26 w-10 md:w-16 text-xs md:text-base text-center"
              control={control}
              // disabled={isDisabled || dataStudentGrade?.bind2 ? true : false}
            />
            <TextField
              inputHeight="h-10"
              name="bind3"
              variant="md"
              type="number"
              labelclassname="text-sm "
              inputWidth="lg:w-26 w-10 md:w-16 text-xs md:text-base text-center"
              control={control}
              // disabled={isDisabled || dataStudentGrade?.bind3 ? true : false}
            />
            <TextField
              inputHeight="h-10"
              name="bind4"
              variant="md"
              type="number"
              labelclassname="text-sm "
              inputWidth="lg:w-26 w-10 md:w-16 text-xs md:text-base text-center"
              control={control}
              // disabled={isDisabled || dataStudentGrade?.bind4 ? true : false}
            />
          </div>
        </div>
        <div className="flex items-center gap-x-6 lg:gap-x-14 my-auto">
          <p className="text-[12px] lg:text-base font-bold lg:pr-0">B.inggris</p>
          <div className="flex gap-x-4 md:gap-x-4 ml-4 lg:ml-2">
            <TextField
              inputHeight="h-10"
              name="bing1"
              variant="md"
              type="number"
              labelclassname="text-xs md:text-sm"
              inputWidth="lg:w-26 w-10 md:w-16 text-xs md:text-base text-center"
              control={control}
              className="ml-4"
              // disabled={isDisabled || dataStudentGrade?.bing1 ? true : false}
            />
            <TextField
              inputHeight="h-10"
              name="bing2"
              variant="md"
              type="number"
              labelclassname="text-sm "
              inputWidth="lg:w-26 w-10 md:w-16 text-xs md:text-base text-center"
              control={control}
              // disabled={isDisabled || dataStudentGrade?.bing2 ? true : false}
            />
            <TextField
              inputHeight="h-10"
              name="bing3"
              variant="md"
              type="number"
              labelclassname="text-sm "
              inputWidth="lg:w-26 w-10 md:w-16 text-xs md:text-base text-center"
              control={control}
              // disabled={isDisabled || dataStudentGrade?.bing3 ? true : false}
            />
            <TextField
              inputHeight="h-10"
              name="bing4"
              variant="md"
              type="number"
              labelclassname="text-sm "
              inputWidth="lg:w-26 w-10 md:w-16 text-xs md:text-base text-center"
              control={control}
              // disabled={isDisabled || dataStudentGrade?.bing4 ? true : false}
            />
          </div>
        </div>
        <div className="flex lg:gap-x-10 items-center gap-x-8 my-auto w-full ">
          <div className="flex-shrink-0">
            <p className="text-[12px] lg:text-base font-bold lg:pr-0">Rata-rata</p>
          </div>
          <div className="w-full lg:ml-4 lg:pl-1 lg:pr-16">
            <TextField
              inputHeight="h-10"
              name="average_grade"
              variant="md"
              type="number"
              labelclassname="text-sm "
              inputWidth="text-base text-center md:w-full lg:w-45% "
              control={control}
              disabled
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-x-6 lg:gap-x-4 w-full">
          <p className="text-[12px] lg:text-base font-bold text-left">Upload Rapor</p>
          <div className="flex gap-4 mt-2">
            <UploadField
              control={control}
              name="dokumen1"
              variant="custom"
              labels="Buka File"
              labelClassName={watch("dokumen1") ? "labelTextUploaded" : "labelText"}
              preview={false}
            />
            <UploadField
              control={control}
              name="dokumen2"
              variant="custom"
              labels="Buka File"
              labelClassName={watch("dokumen2") ? "labelTextUploaded" : "labelText"}
              preview={false}
            />
            <UploadField
              control={control}
              name="dokumen3"
              variant="custom"
              labels="Buka File"
              labelClassName={watch("dokumen3") ? "labelTextUploaded" : "labelText"}
              preview={false}
            />
            <UploadField
              control={control}
              name="dokumen4"
              variant="custom"
              labels="Buka File"
              labelClassName={watch("dokumen4") ? "labelTextUploaded" : "labelText"}
              preview={false}
            />
          </div>
        </div>
      </section>
      <h1 className="font-bold text-2xl lg:pl-0 md:pl-[11vw] xl:pl-0 place-self-start pl-10 mt-16 text-left">
        Skor SNBT
      </h1>

      <section className="flex flex-wrap justify-center items-center gap-x-1 w-full lg:flex lg:items-center gap-y-4 lg:justify-between lg:w-[60vw] md:flex md:flex-wrap md:w-80% md:justify-between text-left xl:w-55%">
        <div className="flex items-center justify-between w-full   ">
          <p className="font-bold text-sm md:text-base">Penalaran Umum</p>
          <TextField
            inputHeight="h-10"
            name="utbk_pu"
            variant="md"
            type="number"
            labelclassname="text-sm "
            inputWidth="w-26 text-base text-center"
            control={control}
          />
        </div>
        <div className="flex items-center justify-between w-full    ">
          <p className="font-bold text-sm md:text-base">Kemampuan Kuantitatif</p>
          <TextField
            inputHeight="h-10"
            name="utbk_kk"
            variant="md"
            type="number"
            labelclassname="text-sm "
            inputWidth="w-26 text-base text-center"
            control={control}
          />
        </div>
        <div className="flex items-center justify-between w-full  ">
          <p className="font-bold text-sm md:text-base text-left">Pengetahuan dan Pemahaman Umum</p>
          <TextField
            inputHeight="h-10"
            name="utbk_ppu"
            variant="md"
            type="number"
            labelclassname="text-sm "
            inputWidth="w-26 text-base text-center"
            control={control}
          />
        </div>
        <div className="flex items-center justify-between w-full   ">
          <p className="font-bold text-sm md:text-base text-left">
            Kemampuan Memahami Bacaan dan Menulis
          </p>
          <TextField
            inputHeight="h-10"
            name="utbk_kmbm"
            variant="md"
            type="number"
            labelclassname="text-sm "
            inputWidth="w-26 text-base text-center"
            control={control}
          />
        </div>
        <div className="flex items-center justify-between w-full    ">
          <p className="font-bold text-sm md:text-base">Rata-Rata Skor :</p>
          <TextField
            inputHeight="h-10"
            name="average_utbk"
            variant="md"
            type="number"
            labelclassname="text-sm "
            inputWidth="w-26 text-base text-center"
            control={control}
            disabled
          />
        </div>
        <div className="flex items-center justify-between w-full   ">
          <p className="flex-shrink-0  font-bold text-sm md:text-base">Sertifikat UTBK : </p>
          <UploadField
            control={control}
            name="UTBK"
            variant="custom"
            labels="Buka File"
            labelClassName={watch("UTBK") ? "labelTextUploaded" : "labelText"}
            preview={false}
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
