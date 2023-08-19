import { FC, ReactElement } from "react";
import { Accordion, Button, UploadField } from "@uninus/web/components";
import { useForm, FieldValues } from "react-hook-form";
import { useBiodataUpdate } from "../../hooks";

export const BerkasKhususSection: FC = (): ReactElement => {
  const { control, handleSubmit } = useForm<FieldValues>({
    mode: "all",
    defaultValues: {
      kartu_anggota_NU: undefined,
      surat_ket_tugas: undefined,
      surat_ket_difabel: undefined,
      surat_ket_tahfidz: undefined,
      sertifikat: undefined,
    },
  });

  const berkasKhusus = [
    { label: "Kartu Tanda Anggota NU", name: "kartu_anggota_NU" },
    { label: "Surat Keterangan Tugas", name: "surat_ket_tugas" },
    { label: "Surat Keterangan Dokter(Difabel)", name: "surat_ket_difabel" },
    { label: "Surat Keteragan/Sertifikat Hafal Qur'an", name: "surat_ket_tahfidz" },
    { label: "Sertifikat Prestasi Non Akademik", name: "sertifikat" },
  ];
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
      title="Berkas Khusus Optional"
      className="w-full h-auto mt-[2rem] flex flex-col items-center lg:items-baseline lg:ml-[3vw] xl:ml-[5vw] gap-5"
      titleClassName="text-lg font-extrabold text-secondary-green-4"
    >
      <form onSubmit={onSubmit} className="w-[80%] ">
        <section className="flex flex-col gap-10 w-[70vw] mt-10 md:mt-0 md:w-[60%] lg:w-full ">
          {berkasKhusus.map((documentType) => (
            <div key={documentType.name} className="flex flex-col gap-2 md:mt-[0.4vh]">
              <h3 className="font-bold text-xl">{documentType.label}</h3>
              <UploadField
                control={control}
                name={documentType.name}
                classNameField="file:bg-primary-green file:text-primary-white file:rounded-md  file:border-none border-primary-green w-[59vw] md:w-[29vw] lg:w-[18vw] xl:w-[17vw] file:cursor-pointer "
                preview={false}
              />
            </div>
          ))}
        </section>
        <div className="flex w-full justify-end items-end py-8">
          <Button variant="filled" size="md" width="w-50% lg:w-25% xl:w-15%">
            Submit
          </Button>
        </div>
      </form>
    </Accordion>
  );
};
