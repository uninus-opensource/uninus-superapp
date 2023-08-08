import { FC, ReactElement } from "react";
import { Accordion, Button, UploadField } from "@uninus/web/components";
import { defaultValuesBiodata } from "../../store";
import { useForm, FieldValues } from "react-hook-form";
import { useBiodataUpdate } from "../../hooks";

export const BerkasKhususSection: FC = (): ReactElement => {
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
      title="Berkas Khusus (optional)"
      className="w-full h-auto mt-[2rem] flex flex-col gap-5 items-center lg:items-baseline lg:ml-[3vw] xl:ml-[5vw] pb-6 md:pb-0"
    >
      <form onSubmit={onSubmit}>
        <div className="flex w-full justify-end py-4">
          <h3 className="font-bold">Kartu Tanda Anggota NU</h3>
          <UploadField
            control={control}
            name="upload"
            classNameField="file:bg-primary-green file:text-primary-white file:rounded-[3px] file:border-none w-full file:cursor-pointer "
            preview={false}
          />
          <Button variant="filled" size="md" width="w-50% lg:w-25% xl:w-15%">
            Submit
          </Button>
        </div>
      </form>
    </Accordion>
  );
};
