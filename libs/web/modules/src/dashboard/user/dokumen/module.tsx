"use client";
import { FC, ReactElement, useMemo } from "react";
import { Button, UploadField } from "@uninus/web/components";
import { useForm } from "react-hook-form";
import { useGetBiodata } from "../registrasi";

export const ModuleDokumen: FC = (): ReactElement => {
  const { control } = useForm({
    defaultValues: {},
  });

  const { data } = useGetBiodata();

  const degreeProgram = useMemo(() => {
    return data?.degree_program_id;
  }, [data?.degree_program_id]);

  const documentS1 = [
    { label: "Kartu Keluarga", name: "kartu_keluarga" },
    { label: "KTP", name: "KTP" },
    { label: "Akta Kelahiran", name: "akta_kelahiran" },
    { label: "Ijazah/SKL", name: "ijazah_SKL" },
  ];

  const documentS2 = [
    { label: "Ijazah S1", name: "ijazah_s1" },
    { label: "Kartu Keluarga", name: "kartu_keluarga" },
    { label: "KTP", name: "KTP" },
    { label: "Transkrip Nilai", name: "transkrip_nilai" },
    { label: "Porlap Dikti", name: "porlap_dikti" },
  ];

  const documentS3 = [
    { label: "Ijazah S1", name: "ijazah_s1" },
    { label: "KTP", name: "KTP" },
    { label: "Ijazah S2", name: "ijazah_s2" },
    { label: "Transkrip Nilai", name: "transkrip_nilai" },
    { label: "Kartu Keluarga", name: "kartu_keluarga" },
    { label: "Porlap Dikti", name: "porlap_dikti" },
  ];

  return (
    <form
      key="dashboard-dokumen"
      className="flex flex-col text-center overflow-x-hidden px-4 gap-y-6 relative lg:text-start"
    >
      <div className="2xl:text-2xl">
        <h1 className="text-slate-5">
          PMB <span className="text-secondary-green-4"> / Upload Berkas</span>
        </h1>
        <p className=" text-lg 2xl:text-2xl pt-2 font-extrabold text-secondary-green-4">
          Upload Berkas
        </p>
      </div>

      {/* body */}
      <section className="flex flex-col justify-between shadow-lg w-[90vw] rounded-md h-[61rem] md:h-[35rem] mt-5 lg:w-[70vw] xl:w-[70vw]">
        {/* Upload sections */}
        <section className="w-full">
          <section className="flex flex-col lg:items-start lg:pl-[2vw] gap-2 mt-5 lg:w-full">
            <h1 className="font-bold text-[1.3rem] text-center">Upload berkas pendaftaran</h1>
            <h2 className="text-center text-grayscale-7 text-[11px] md:text-sm">
              Upload Berkas di bawah ini dengan format berikut : .jpg/.jpeg/.png/.pdf
            </h2>
          </section>

          <section className="flex flex-col h-auto md:items-center mt-5">
            <div className="md:w-[80vw] lg:w-[66vw] xl:w-[66vw] md:h-auto flex">
              <section className="grid grid-cols-2 gap-10 w-50% ">
                {degreeProgram === 1 &&
                  documentS1.map((documentType) => (
                    <div key={documentType.name} className="flex flex-col gap-2">
                      <h3 className="font-bold text-xs md:text-base">{documentType.label}</h3>
                      <UploadField
                        control={control}
                        name={documentType.name}
                        variant="custom"
                        preview={false}
                      />
                    </div>
                  ))}

                {degreeProgram === 2 &&
                  documentS2.map((documentType) => (
                    <div key={documentType.name} className="flex flex-col gap-2">
                      <h3 className="font-bold text-xs md:text-base">{documentType.label}</h3>
                      <UploadField
                        control={control}
                        name={documentType.name}
                        variant="custom"
                        preview={false}
                      />
                    </div>
                  ))}

                {degreeProgram === 3 &&
                  documentS3.map((documentType) => (
                    <div key={documentType.name} className="flex flex-col gap-2">
                      <h3 className="font-bold text-xs md:text-base">{documentType.label}</h3>
                      <UploadField
                        control={control}
                        name={documentType.name}
                        variant="custom"
                        preview={false}
                      />
                    </div>
                  ))}
              </section>
            </div>
          </section>
        </section>

        {/* Button */}
        <section className="w-full lg:w-[70vw] xl:w-[70vw] lg:pl-[2vw] flex justify-end mt-16 md:mt-10 items-center rounde pr-5">
          <Button styling="bg-primary-green px-2 py-1 rounded-[3px] w-40% lg:w-25% xl:w-15% ">
            Submit Berkas
          </Button>
        </section>
      </section>
    </form>
  );
};
