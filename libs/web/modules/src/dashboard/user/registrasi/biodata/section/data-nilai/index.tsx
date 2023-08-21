import { FC, ReactElement } from "react";
import { Accordion, Button, TextField, UploadField } from "@uninus/web/components";
import { useForm, FieldValues } from "react-hook-form";
import { useBiodataUpdate } from "../../hooks";

export const DataNilaiSection: FC = (): ReactElement => {
  const { control, handleSubmit } = useForm<FieldValues>({
    mode: "all",
    defaultValues: {},
  });

  const { mutate } = useBiodataUpdate();

  const onSubmit = handleSubmit((data) => {
    try {
      // mutate({
      //   ...data,
      // });
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Accordion
      title="Nilai Rapor dan Skor UTBK"
      titleClassName="text-lg font-extrabold text-secondary-green-4"
      className="w-full h-auto mt-[2rem] flex flex-col gap-5 items-center lg:items-baseline lg:ml-[3vw] xl:ml-[5vw] pb-6 md:pb-0"
    >
      <form onSubmit={onSubmit}>
        <h1 className="font-bold text-2xl mt-3  lg:pl-0 md:pl-[11vw] xl:pl-0 place-self-start pl-10">
          Nilai Rapor
        </h1>
        <p className="text-sm lg:text-base text-grayscale-7 mt-2">
          Masukkan hanya nilai pengetahuan <span className="text-red text-base text-red-6 ">*</span>
        </p>

        <div className="grid grid-cols-5 grid-rows-5 gap-y-4 mt-9">
          <div className="col-start-2 my-auto">
            <p className="text-[10px] md:text-base">Semester 1</p>
          </div>
          <div className="col-start-3 my-auto">
            <p className="text-[10px] md:text-base">Semester 2</p>
          </div>
          <div className="col-start-4 my-auto">
            <p className="text-[10px] md:text-base">Semester 3</p>
          </div>
          <div className="col-start-5 my-auto">
            <p className="text-[10px] md:text-base">Semester 4</p>
          </div>
          <div className="row-start-2 my-auto">
            <p className="text-[8px] lg:text-base font-bold pr-4 lg:pr-0">Matematika</p>
          </div>
          <div className="col-start-1 row-start-3 my-auto">
            <p className="text-[8px] lg:text-base font-bold pr-4 lg:pr-0">B.Indonesia </p>
          </div>
          <div className="col-start-1 row-start-4 my-auto">
            <p className="text-[8px] lg:text-base font-bold pr-4 lg:pr-0">B.inggris</p>
          </div>
          <div className="col-start-1 row-start-5 my-auto">
            <p className="text-[8px] lg:text-base font-bold pr-2 lg:pr-0">Rata-rata</p>
          </div>
          <div className="col-start-1 row-start-6 my-auto">
            <p className="text-[8px] lg:text-base font-bold pr-2 ">Upload Rapor</p>
          </div>
          <div className="col-start-2 row-start-2 my-auto">
            {" "}
            <TextField
              inputHeight="h-10"
              name="Mtk1"
              variant="md"
              type="text"
              labelclassname="text-xs md:text-sm "
              inputWidth="lg:w-26 w-12 text-base text-center"
              control={control}
            />
          </div>
          <div className="col-start-3 row-start-2">
            {" "}
            <TextField
              inputHeight="h-10"
              name="Bind1"
              variant="md"
              type="text"
              labelclassname="text-xs md:text-sm "
              inputWidth="lg:w-26 w-12 text-base text-center"
              control={control}
            />
          </div>
          <div className="col-start-4 row-start-2">
            {" "}
            <TextField
              inputHeight="h-10"
              name="Bing1"
              variant="md"
              type="text"
              labelclassname="text-xs md:text-sm "
              inputWidth="lg:w-26 w-12 text-base text-center"
              control={control}
            />
          </div>
          <div className="col-start-5 row-start-2">
            {" "}
            <TextField
              inputHeight="h-10"
              name="Mtk2"
              variant="md"
              type="text"
              labelclassname="text-xs md:text-sm "
              inputWidth="lg:w-26 w-12 text-base text-center"
              control={control}
            />
          </div>
          <div className="col-start-2 row-start-3">
            {" "}
            <TextField
              inputHeight="h-10"
              name="Bind2"
              variant="md"
              type="text"
              labelclassname="text-xs md:text-sm "
              inputWidth="lg:w-26 w-12 text-base text-center"
              control={control}
            />
          </div>
          <div className="col-start-3 row-start-3">
            {" "}
            <TextField
              inputHeight="h-10"
              name="Bing2"
              variant="md"
              type="text"
              labelclassname="text-sm "
              inputWidth="lg:w-26 w-12 text-base text-center"
              control={control}
            />
          </div>
          <div className="col-start-4 row-start-3">
            {" "}
            <TextField
              inputHeight="h-10"
              name="Mtk3"
              variant="md"
              type="text"
              labelclassname="text-sm "
              inputWidth="lg:w-26 w-12 text-base text-center"
              control={control}
            />
          </div>
          <div className="col-start-5 row-start-3">
            {" "}
            <TextField
              inputHeight="h-10"
              name="Bind3"
              variant="md"
              type="text"
              labelclassname="text-sm "
              inputWidth="lg:w-26 w-12 text-base text-center"
              control={control}
            />
          </div>
          <div className="col-start-2 row-start-4">
            {" "}
            <TextField
              inputHeight="h-10"
              name="Bing3"
              variant="md"
              type="text"
              labelclassname="text-sm "
              inputWidth="lg:w-26 w-12 text-base text-center"
              control={control}
            />
          </div>
          <div className="col-start-3 row-start-4">
            {" "}
            <TextField
              inputHeight="h-10"
              name="Mtk4"
              variant="md"
              type="text"
              labelclassname="text-sm "
              inputWidth="lg:w-26 w-12 text-base text-center"
              control={control}
            />
          </div>
          <div className="col-start-4 row-start-4">
            {" "}
            <TextField
              inputHeight="h-10"
              name="Bind4"
              variant="md"
              type="text"
              labelclassname="text-sm "
              inputWidth="lg:w-26 w-12 text-base text-center"
              control={control}
            />
          </div>
          <div className="col-start-5 row-start-4">
            {" "}
            <TextField
              inputHeight="h-10"
              name="Bing4"
              variant="md"
              type="text"
              labelclassname="text-sm "
              inputWidth="lg:w-26 w-12 text-base text-center"
              control={control}
            />
          </div>
          <div className="col-start-2 row-start-5 col-end-6 lg:pr-10">
            <TextField
              inputHeight="h-10"
              name="average"
              variant="md"
              type="text"
              labelclassname="text-sm "
              inputWidth="w-full text-base text-center"
              control={control}
            />
          </div>

          <div className="col-start-2 row-start-6">
            {" "}
            <UploadField control={control} name="dokumen1" variant="custom" preview={false} />
          </div>
          <div className="col-start-3 row-start-6">
            {" "}
            <UploadField control={control} name="dokumen2" variant="custom" preview={false} />
          </div>
          <div className="col-start-4 row-start-6">
            {" "}
            <UploadField control={control} name="dokumen3" variant="custom" preview={false} />
          </div>
          <div className="col-start-5 row-start-6">
            {" "}
            <UploadField control={control} name="dokumen4" variant="custom" preview={false} />
          </div>
        </div>

        <h1 className="font-bold text-2xl lg:pl-0 md:pl-[11vw] xl:pl-0 place-self-start pl-10 mt-10">
          Skor UTBK
        </h1>
        <section className="flex lg:flex-row flex-col gap-y-4 justify-between w-full lg:w-55%  py-4 ">
          <div className="flex items-center font-bold gap-8 text-xs lg:text-base">
            <p>Nilai UTBK : </p>
            <TextField
              inputHeight="h-10"
              name="Nilai UTBK"
              variant="md"
              type="text"
              labelclassname="text-sm "
              inputWidth="w-26 text-base"
              control={control}
            />
          </div>
          <div className="flex items-center font-bold gap-8 lg:text-base text-xs">
            <p>Sertifikat UTBK : </p>
            <UploadField control={control} name="UTBK" variant="default" preview={false} />
          </div>
        </section>

        <div className="flex w-full justify-end p-4">
          <Button variant="filled" size="md" width="w-40% lg:w-25% xl:w-15%">
            Submit
          </Button>
        </div>
      </form>
    </Accordion>
  );
};
