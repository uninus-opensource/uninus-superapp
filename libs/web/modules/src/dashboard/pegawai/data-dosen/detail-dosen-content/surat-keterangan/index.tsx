import { UploadFieldV2 } from "@uninus/web/components";
import { FC, ReactElement } from "react";
import { useForm } from "react-hook-form";
import { TUploadFields } from "./types";

export const SuratKeteranganiDosen: FC = (): ReactElement => {
  const { control } = useForm({
    mode: "all",
  });

  const uploadFields: TUploadFields[] = [
    {
      name: "status_dosen",
      label: "Status Dosen",
    },
    {
      name: "jafung",
      label: "Jabatan Fungsional",
    },
    {
      name: "sk_mengajar",
      label: "SK Mengajar ",
    },
    {
      name: "sk_homebase",
      label: "SK Homebase ",
    },
    {
      name: "tugas_tambahan",
      label: "Tugas Tambahan",
    },
    {
      name: "sertifikat_pendidik",
      label: "Sertifikat Pendidik",
    },
    {
      name: "sertifikat_profesi",
      label: "Sertifikat Profesi",
    },
  ];

  return (
    <section className="w-full h-full flex flex-col items-center overflow-auto px-6 pt-3 pb-14 gap-10">
      <div className="w-full flex items-center justify-between">
        <h1 className="font-bold xl:text-2xl text-xl">Surat Keterangan</h1>
      </div>

      <div className="w-full grid grid-cols-2 gap-x-8 gap-y-10">
        {uploadFields.map((field, idx) => (
          <div key={idx} className="w-full text-lg flex flex-col gap-4 font-bold">
            <h2>{field.label}</h2>
            <UploadFieldV2 name={field.name} control={control} />
          </div>
        ))}
      </div>
    </section>
  );
};
