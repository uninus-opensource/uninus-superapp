import { FC, ReactElement } from "react";
import { Accordion, Button, TextField } from "@uninus/web/components";
import { defaultValuesBiodata } from "../../store";
import { useForm, FieldValues } from "react-hook-form";
import { useBiodataUpdate } from "../../hooks";

export const DataNilaiSection: FC = (): ReactElement => {
  const { control, handleSubmit } = useForm<FieldValues>({
    mode: "all",
    defaultValues: { ...defaultValuesBiodata },
  });

  const { mutate } = useBiodataUpdate();

  const onSubmit = handleSubmit((data) => {
    try {
      mutate({
        ...data,
      });
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Accordion
      title="Nilai Rapor dan Skor UTBK"
      className="w-full h-auto mt-[2rem] flex flex-col gap-5 items-center lg:items-baseline lg:ml-[3vw] xl:ml-[5vw] pb-6 md:pb-0"
    >
      <form onSubmit={onSubmit}>
        <h1 className="font-bold text-2xl mt-3  lg:pl-0 md:pl-[11vw] xl:pl-0 place-self-start pl-10">
          Nilai Rapor
        </h1>
        <section className="grid grid-cols-5 w-60% py-4 ">
          <div className="grid grid-rows-5 gap-2 font-bold ">
            <p className="py-2"></p>
            <p>Matematika</p>
            <p>B. Indonesia</p>
            <p>B. Inggris</p>
            <p>Upload File</p>
          </div>
          <div className="grid grid-rows-5 gap-2">
            <p>Semester 1</p>
            <TextField
              inputHeight="h-10"
              name="Mtk1"
              variant="md"
              type="text"
              labelclassname="text-sm "
              inputWidth="w-26 text-base"
              control={control}
            />
            <TextField
              inputHeight="h-10"
              name="Bind1"
              variant="md"
              type="text"
              labelclassname="text-sm "
              inputWidth="w-26 text-base"
              control={control}
            />
            <TextField
              inputHeight="h-10"
              name="Bing1"
              variant="md"
              type="text"
              labelclassname="text-sm "
              inputWidth="w-26 text-base"
              control={control}
            />
            <Button size="sm" width="w-26">
              Choose File
            </Button>
          </div>
          <div className="grid grid-rows-5 gap-2">
            <p>Semester 2</p>
            <TextField
              inputHeight="h-10"
              name="Mtk2"
              variant="md"
              type="text"
              labelclassname="text-sm "
              inputWidth="w-26 text-base"
              control={control}
            />
            <TextField
              inputHeight="h-10"
              name="Bind2"
              variant="md"
              type="text"
              labelclassname="text-sm "
              inputWidth="w-26 text-base"
              control={control}
            />
            <TextField
              inputHeight="h-10"
              name="Bing2"
              variant="md"
              type="text"
              labelclassname="text-sm "
              inputWidth="w-26 text-base"
              control={control}
            />
            <Button size="sm" width="w-26">
              Choose File
            </Button>
          </div>

          <div className="grid grid-rows-5 gap-2">
            <p>Semester 3</p>
            <TextField
              inputHeight="h-10"
              name="Mtk3"
              variant="md"
              type="text"
              labelclassname="text-sm "
              inputWidth="w-26 text-base"
              control={control}
            />
            <TextField
              inputHeight="h-10"
              name="Bind3"
              variant="md"
              type="text"
              labelclassname="text-sm "
              inputWidth="w-26 text-base"
              control={control}
            />
            <TextField
              inputHeight="h-10"
              name="Bing3"
              variant="md"
              type="text"
              labelclassname="text-sm "
              inputWidth="w-26 text-base"
              control={control}
            />
            <Button size="sm" width="w-26">
              Choose File
            </Button>
          </div>
          <div className="grid grid-rows-5 gap-2">
            <p>Semester 4</p>
            <TextField
              inputHeight="h-10"
              name="Mtk4"
              variant="md"
              type="text"
              labelclassname="text-sm "
              inputWidth="w-26 text-base"
              control={control}
            />
            <TextField
              inputHeight="h-10"
              name="Bind4"
              variant="md"
              type="text"
              labelclassname="text-sm "
              inputWidth="w-26 text-base"
              control={control}
            />
            <TextField
              inputHeight="h-10"
              name="Bing4"
              variant="md"
              type="text"
              labelclassname="text-sm "
              inputWidth="w-26 text-base"
              control={control}
            />
            <Button size="sm" width="w-26">
              Choose File
            </Button>
          </div>
        </section>
        <h1 className="font-bold text-2xl mt-3  lg:pl-0 md:pl-[11vw] xl:pl-0 place-self-start pl-10">
          Skor UTBK
        </h1>
        <section className="flex justify-between w-55% py-4 ">
          <div className="flex items-center font-bold gap-8">
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
          <div className="flex items-center font-bold gap-8">
            <p>Sertifikat UTBK : </p>
            <Button size="md">Choose File</Button>
          </div>
        </section>

        <div className="flex w-full justify-end py-4">
          <Button variant="filled" size="md" width="w-50% lg:w-25% xl:w-15%">
            Submit
          </Button>
        </div>
      </form>
    </Accordion>
  );
};
