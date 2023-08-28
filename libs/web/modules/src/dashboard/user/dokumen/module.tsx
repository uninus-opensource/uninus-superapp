"use client";
import { FC, ReactElement, useMemo, useState } from "react";
import { Button, UploadField, Modal } from "@uninus/web/components";
import { useForm } from "react-hook-form";
import { useGetBiodata } from "../registrasi";
import Link from "next/link";
import { CaretRightFilled } from "@ant-design/icons";

export const ModuleDokumen: FC = (): ReactElement => {
  const { control } = useForm({
    defaultValues: {},
  });

  const { data } = useGetBiodata();

  const degreeProgram = useMemo(() => {
    return data?.degree_program_id;
  }, [data?.degree_program_id]);

  const selectionType = useMemo(() => {
    return data?.selection_path_id;
  }, [data?.selection_path_id]);

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
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
      <section className="flex flex-col justify-between shadow-lg w-[90vw] rounded-md h-full py-2 mt-5 lg:w-[70vw] xl:w-[70vw]">
        {/* Upload sections */}
        <Modal
          showModal={showModal}
          onClose={handleCloseModal}
          closeClassName="text-primary-white"
          bodyClassName="overflow-y-auto p-8"
          headerColor="bg-primary-green"
          modalTitle={
            <div className=" flex flex-row gap-x-2 items-center">
              <h1 className="text-primary-white">Selamat Anda Berhasil Melakukan Pendaftaran</h1>
            </div>
          }
        >
          <div>
            <p>Silahkan menunggu info kelulusan melalui email masing -masing</p>
          </div>
        </Modal>
        {showModal && (
          <div
            className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-[50]"
            onClick={handleCloseModal}
          />
        )}

        <section className="flex flex-col lg:items-start lg:pl-[2vw] gap-2 mt-5 lg:w-full">
          <h1 className="font-bold text-[1.3rem] text-center">Upload berkas pendaftaran</h1>
          <h2 className="text-center text-grayscale-7 text-[11px] md:text-sm">
            Upload Berkas di bawah ini dengan format berikut : .jpg/.jpeg/.png/.pdf
          </h2>
        </section>

        <section className="flex flex-col h-auto mt-5 px-8">
          <div className="w-full md:h-auto flex ">
            <section className="grid lg:grid-cols-2 grid-cols-1 md:grid-cols-2 gap-10 w-full justify-start items-start px-2">
              {degreeProgram === 1 &&
                documentS1.map((documentType) => (
                  <div key={documentType.name} className="flex flex-col gap-2">
                    <h3 className="font-bold text-xs text-left">{documentType.label}</h3>
                    <UploadField
                      control={control}
                      name={documentType.name}
                      variant="default"
                      preview={false}
                    />
                  </div>
                ))}

              {degreeProgram === 2 &&
                documentS2.map((documentType) => (
                  <div key={documentType.name} className="flex flex-col gap-2">
                    <h3 className="font-bold text-xs text-lef">{documentType.label}</h3>
                    <UploadField
                      control={control}
                      name={documentType.name}
                      variant="default"
                      preview={false}
                    />
                  </div>
                ))}

              {degreeProgram === 3 &&
                documentS3.map((documentType) => (
                  <div key={documentType.name} className="flex flex-col gap-2">
                    <h3 className="font-bold text-xs text-lef">{documentType.label}</h3>
                    <UploadField
                      control={control}
                      name={documentType.name}
                      variant="default"
                      preview={false}
                    />
                  </div>
                ))}
            </section>
          </div>
        </section>

        {/* Button */}
        <section className="w-full lg:w-[70vw] xl:w-[70vw] lg:pl-[2vw] flex justify-end mt-16 md:mt-10 items-center rounde pr-5 mb-[30px]">
          <Button
            onClick={() => {
              handleOpenModal();
            }}
          >
            Submit Berkas
          </Button>
        </section>
      </section>
      {selectionType === 3 && (
        <section className="w-full flex justify-end pr-[3rem]">
          <Link
            href="/dashboard/selection"
            className="bg-primary-green text-primary-white rounded-[5px] px-2 py-1 flex justify-center items-center gap-2"
          >
            Tes seleksi
            <CaretRightFilled />
          </Link>
        </section>
      )}
    </form>
  );
};
