"use client";
import { FC, ReactElement } from "react";
import { Button, UploadField } from "@uninus/web/components";
import { useForm } from "react-hook-form";

export const ModuleDokumen: FC = (): ReactElement => {
  const { control } = useForm({
    defaultValues: {
      kartu_keluarga: undefined,
      KTP: undefined,
      akta_kelahiran: undefined,
      ijazah_SKL: undefined,
      foto: undefined,
      Rapor: undefined,
      optionalDocument: undefined,
      kip: undefined,
    },
  });

  const personalDocument = [
    { label: "Kartu Keluarga", name: "kartu_keluarga" },
    { label: "KTP", name: "KTP" },
    { label: "Akta Kelahiran", name: "akta_kelahiran" },
    { label: "Ijazah/SKL", name: "ijazah_SKL" },
  ];

  const graduationDocument = [
    { label: "Pas Foto 3x4", name: "foto" },
    { label: "Rapor Sekolah", name: "Rapor" },
    {
      label: "Dokumen Tambahan (Sertifikat, Penghargaan dll)",
      name: "optionalDocument",
    },
    { label: "KIP-K", name: "kip" },
  ];

  return (
    <form key="dashboard-dokumen" className="flex flex-col text-center px-4 gap-y-6  lg:text-start">
      <div className="2xl:text-2xl">
        <h1 className="text-slate-5">
          PMB <span className="text-secondary-green-4"> / Upload Berkas</span>
        </h1>
        <p className=" text-lg 2xl:text-2xl pt-2 font-extrabold text-secondary-green-4">
          Upload Berkas
        </p>
      </div>

      {/* body */}
      <section className="flex flex-col items-center shadow-lg w-[90vw] rounded-md h-[61rem] md:h-[35rem] mt-5 lg:w-[70vw] xl:w-[70vw]">
        {/* heading */}
        <section className="flex flex-col items-center lg:items-start lg:pl-[2vw] gap-2 mt-5 lg:w-full">
          <h1 className="font-bold text-[1.3rem] text-center">Upload berkas pendaftaran</h1>
          <h2 className="text-center text-grayscale-7 text-[11px] md:text-sm">
            Upload Berkas di bawah ini dengan format berikut : .jpg/.jpeg/.png/.pdf
          </h2>
        </section>

        {/* Document upload field */}
        <section className="flex flex-col  h-auto items-center mt-5">
          <div className="md:w-[80vw] lg:w-[66vw] xl:w-[66vw] md:h-auto md:flex ">
            <section className="flex flex-col gap-10 w-50% ">
              {personalDocument.map((documentType) => (
                <div key={documentType.name} className="flex flex-col gap-2">
                  <h3 className="font-bold">{documentType.label}</h3>
                  <UploadField
                    control={control}
                    name={documentType.name}
                    classNameField="file:bg-primary-green file:text-primary-white file:rounded-[3px] file:border-none w-[59vw] md:w-[29vw] lg:w-[22vw] xl:w-[18vw] xl:w-[17vw] file:cursor-pointer "
                    preview={false}
                  />
                </div>
              ))}
            </section>

            <section className="flex flex-col gap-10 w-[70vw] mt-10 md:mt-0 md:w-[60%] xl:w-full ">
              {graduationDocument.map((documentType) => (
                <div key={documentType.name} className="flex flex-col gap-2 md:mt-[0.4vh]">
                  <h3 className="font-bold text-[14.5px]">{documentType.label}</h3>
                  <UploadField
                    control={control}
                    name={documentType.name}
                    classNameField="file:bg-primary-green file:text-primary-white file:rounded-sm file:border-none border-primary-green w-[59vw] md:w-[29vw] lg:w-[18vw] xl:w-[17vw] file:cursor-pointer "
                    preview={false}
                  />
                </div>
              ))}
            </section>
          </div>
        </section>

        {/* Button */}
        <section className="w-[80vw] lg:w-[70vw] xl:w-[70vw] lg:pl-[2vw] flex justify-center lg:justify-end pr-16 items-center rounde">
          <Button styling="bg-primary-green px-2 py-1 rounded-[3px] w-50% lg:w-25% xl:w-15% mt-8 md:mt-10">
            Submit Berkas
          </Button>
        </section>
      </section>
    </form>
  );
};
