'use client';
import { FC, ReactElement } from 'react';
import { Button, UploadField } from '@uninus/web/components';
import { useForm } from 'react-hook-form';

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
    { label: 'Kartu Keluarga', name: 'kartu_keluarga' },
    { label: 'KTP', name: 'KTP' },
    { label: 'Akta Kelahiran', name: 'akta_kelahiran' },
    { label: 'Ijazah/SKL', name: 'ijazah_SKL' },
  ];

  const graduationDocument = [
    { label: 'Pas Foto 3x4', name: 'foto' },
    { label: 'Rapor Sekolah', name: 'Rapor' },
    {
      label: 'Dokumen Tambahan (Sertifikat, Penghargaan dll)',
      name: 'optionalDocument',
    },
    { label: 'KIP-K', name: 'kip' },
  ];

  return (
      <form key="dashboard-dokumen" className="flex flex-col items-center">
        <section className="w-[90vw] lg:w-[70vw] flex justify-center lg:justify-start xl:w-[70vw] xl:mb-3">
          <div className="flex flex-col justify-center items-center lg:items-start">
            <h1 className="text-secondary-green-4">
              <span className="text-primary-black opacity-[.32]">PMB </span> /
              Upload Dokumen
            </h1>
            <h1 className="text-secondary-green-4 font-bold">Upload Dokumen</h1>
          </div>
        </section>

        {/* body */}
        <section className="flex flex-col items-center shadow-[0px_4px_8px_0px_rgba(0,0,0,0.1)] w-[90vw] rounded-md h-[61rem] md:h-[35rem] mt-5 lg:w-[70vw] xl:w-[70vw]">
          {/* heading */}
          <section className="flex flex-col items-center lg:items-start lg:pl-[2vw] gap-2 mt-5 lg:w-full">
            <h1 className="font-bold text-[1.3rem] text-center">
              Upload berkas pendaftaran
            </h1>
            <h2 className="text-center text-grayscale-7 text-[11px] md:text-sm">
              Upload Berkas di bawah ini dengan format berikut :
              .jpg/.jpeg/.png/.pdf
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
                      classNameField="file:bg-primary-green file:text-primary-white file:rounded-[3px] file:border-none w-[59vw] md:w-[29vw] lg:w-[22vw] xl:w-[18vw] xl:w-[17vw] cursor-pointer "
                      preview={false}
                    />
                  </div>
                ))}
              </section>

              <section className="flex flex-col gap-10 w-[70vw] mt-10 md:mt-0 md:w-[60%] xl:w-[70%] ">
                {graduationDocument.map((documentType) => (
                  <div
                    key={documentType.name}
                    className="flex flex-col gap-2 md:mt-[0.4vh]"
                  >
                    <h3 className="font-bold text-[14.5px]">
                      {documentType.label}
                    </h3>
                    <UploadField
                      control={control}
                      name={documentType.name}
                      classNameField="file:bg-primary-green file:text-primary-white file:rounded-sm file:border-none border-primary-green w-[59vw] md:w-[29vw] lg:w-[18vw] xl:w-[17vw] cursor-pointer "
                      preview={false}
                    />
                  </div>
                ))}
              </section>
            </div>
          </section>

          {/* Button */}
          <section className="w-[80vw] lg:w-[70vw] xl:w-[70vw] lg:pl-[2vw] flex justify-center lg:justify-start items-center rounde">
            <Button styling="bg-primary-green px-2 py-1 rounded-[3px] w-[69vw] md:w-[25vw] lg:w-[20vw] xl:w-[10vw] mt-8 md:mt-10">
              Submit Berkas
            </Button>
          </section>
        </section>
      </form>
  );
};
