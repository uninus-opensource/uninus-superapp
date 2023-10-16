"use client";
import { FC, Fragment, ReactElement, useEffect, useMemo, useState } from "react";
import { Button, UploadField, Modal, RedirectLink } from "@uninus/web/components";
import { useForm } from "react-hook-form";
import {
  TUploadFileRequest,
  TUploadFileResponse,
  useBiodataUpdate,
  useUploadFile,
} from "../registrasi";
import { TDokumenPendaftaran } from "./type";
import { useStudentData } from "@uninus/web/services";
import { redirect } from "next/navigation";

export const ModuleDokumen: FC = (): ReactElement => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const { control, watch, handleSubmit } = useForm<TDokumenPendaftaran>({
    mode: "all",
  });

  const { getStudent } = useStudentData();
  const { mutate: upload } = useUploadFile();
  const { mutate } = useBiodataUpdate();

  const uploadFile = async (payload: TUploadFileRequest): Promise<TUploadFileResponse> => {
    return new Promise((resolve, reject) => {
      upload(payload, {
        onSuccess: (file) => resolve(file),
        onError: (error) => reject(error),
      });
    });
  };

  const documents = useMemo(() => {
    return getStudent?.documents;
  }, [getStudent?.documents]);

  const degreeProgram = useMemo(() => {
    return getStudent?.degree_program_id;
  }, [getStudent?.degree_program_id]);

  const selectionType = useMemo(() => {
    return getStudent?.selection_path_id;
  }, [getStudent?.selection_path_id]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (!getStudent?.father_name) {
      redirect("/dashboard");
    }
  }, [getStudent]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      // S1
      if (degreeProgram === 1) {
        const { file_url: kartu_keluarga_S1 } = await uploadFile({
          file: data.kartu_keluarga_S1,
        });
        const { file_url: KTP_S1 } = await uploadFile({
          file: data.KTP_S1,
        });
        const { file_url: akta_kelahiran_S1 } = await uploadFile({
          file: data.akta_kelahiran_S1,
        });
        const { file_url: ijazah_SKL_S1 } = await uploadFile({
          file: data.ijazah_SKL_S1,
        });

        if (getStudent?.registration_path_id === 2) {
          const { file_url: surat_pindahan } = await uploadFile({
            file: data.surat_pindahan,
          });
          const { file_url: transkip_nilai_pindahan } = await uploadFile({
            file: data.transkip_nilai_pindahan,
          });

          mutate(
            {
              documents: [
                { name: "Kartu Keluarga", path: kartu_keluarga_S1 },
                { name: "KTP", path: KTP_S1 },
                { name: "Akta Kelahiran", path: akta_kelahiran_S1 },
                { name: "Ijazah/SKL", path: ijazah_SKL_S1 },
                { name: "Surat Pindahan", path: surat_pindahan },
                { name: "Transkip Nilai Pindahan", path: transkip_nilai_pindahan },
              ],
            },
            {
              onSuccess: () => {
                setIsLoading(false);
                setShowModal(true);
                setIsDisabled(true);
              },
              onError: () => {
                setIsLoading(false);
              },
            },
          );
        }

        mutate(
          {
            documents: [
              { name: "Kartu Keluarga", path: kartu_keluarga_S1 },
              { name: "KTP", path: KTP_S1 },
              { name: "Akta Kelahiran", path: akta_kelahiran_S1 },
              { name: "Ijazah/SKL", path: ijazah_SKL_S1 },
            ],
          },
          {
            onSuccess: () => {
              setIsLoading(false);
              setShowModal(true);
              setIsDisabled(true);
            },
            onError: () => {
              setIsLoading(false);
            },
          },
        );

        // S2
      } else if (degreeProgram === 2) {
        const { file_url: ijazahS1_S2 } = await uploadFile({
          file: data.ijazahS1_S2,
        });
        const { file_url: kartu_kerluarga_S2 } = await uploadFile({
          file: data.kartu_keluarga_S2,
        });
        const { file_url: KTP_S2 } = await uploadFile({
          file: data.KTP_S2,
        });
        const { file_url: transkrip_nilai_S2 } = await uploadFile({
          file: data.transkrip_nilai_S2,
        });
        const { file_url: porlap_dikti_S2 } = await uploadFile({
          file: data.porlap_dikti_S2,
        });
        mutate(
          {
            documents: [
              { name: "Ijazah S1", path: ijazahS1_S2 },
              { name: "Kartu Keluarga", path: kartu_kerluarga_S2 },
              { name: "KTP", path: KTP_S2 },
              { name: "Transkrip Nilai", path: transkrip_nilai_S2 },
              { name: "Porlap Dikti", path: porlap_dikti_S2 },
            ],
          },
          {
            onSuccess: () => {
              setIsLoading(false);
              setShowModal(true);
              setIsDisabled(true);
            },
            onError: () => {
              setIsLoading(false);
            },
          },
        );

        // S3
      } else if (degreeProgram === 3) {
        const { file_url: ijazahS1_S3 } = await uploadFile({
          file: data.ijazahS1_S3,
        });
        const { file_url: ijazahS2_S3 } = await uploadFile({
          file: data.ijazahS2_S3,
        });
        const { file_url: kartu_kerluarga_S3 } = await uploadFile({
          file: data.kartu_keluarga_S3,
        });
        const { file_url: KTP_S3 } = await uploadFile({
          file: data.KTP_S3,
        });
        const { file_url: transkrip_nilai_S3 } = await uploadFile({
          file: data.transkrip_nilai_S3,
        });
        const { file_url: porlap_dikti_S3 } = await uploadFile({
          file: data.porlap_dikti_S3,
        });
        mutate(
          {
            documents: [
              { name: "Ijazah S1", path: ijazahS1_S3 },
              { name: "Ijazah S2", path: ijazahS2_S3 },
              { name: "Kartu Keluarga", path: kartu_kerluarga_S3 },
              { name: "KTP", path: KTP_S3 },
              { name: "Transkrip Nilai", path: transkrip_nilai_S3 },
              { name: "Porlap Dikti", path: porlap_dikti_S3 },
            ],
          },
          {
            onSuccess: () => {
              setIsLoading(false);
              setShowModal(true);
              setIsDisabled(true);
            },
            onError: () => {
              setIsLoading(false);
            },
          },
        );
      }
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  });

  return (
    <form
      key="dashboard-dokumen"
      className="flex flex-col text-center overflow-x-hidden px-4 gap-y-6 relative lg:text-start"
      onSubmit={onSubmit}
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
          headerColor="green"
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
              {degreeProgram === 1 && (
                <Fragment>
                  <div className="flex flex-col gap-2">
                    <UploadField
                      label="Kartu Keluarga"
                      control={control}
                      name="kartu_keluarga_S1"
                      variant="custom"
                      required
                      inputLabel="Pilih File"
                      labelClassName={
                        watch("kartu_keluarga_S1")
                          ? "labelTextUploaded"
                          : documents?.find((doc) => doc.name === "Kartu Keluarga")
                          ? "labelTextDisabled"
                          : "labelText"
                      }
                      preview={false}
                      isDisabled={!!documents?.find((doc) => doc.name === "Kartu Keluarga")}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <UploadField
                      label="KTP"
                      control={control}
                      name="KTP_S1"
                      variant="custom"
                      inputLabel="Pilih File"
                      required
                      labelClassName={
                        watch("KTP_S1")
                          ? "labelTextUploaded"
                          : documents?.find((doc) => doc.name === "KTP")
                          ? "labelTextDisabled"
                          : "labelText"
                      }
                      preview={false}
                      isDisabled={!!documents?.find((doc) => doc.name === "KTP")}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <UploadField
                      label="Akta Kelahiran"
                      control={control}
                      name="akta_kelahiran_S1"
                      variant="custom"
                      inputLabel="Pilih File"
                      required
                      labelClassName={
                        watch("akta_kelahiran_S1")
                          ? "labelTextUploaded"
                          : documents?.find((doc) => doc.name === "Akta Kelahiran")
                          ? "labelTextDisabled"
                          : "labelText"
                      }
                      preview={false}
                      isDisabled={!!documents?.find((doc) => doc.name === "Akta Kelahiran")}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <UploadField
                      label="Ijazah/SKL"
                      control={control}
                      name="ijazah_SKL_S1"
                      variant="custom"
                      inputLabel="Pilih File"
                      required
                      labelClassName={
                        watch("ijazah_SKL_S1")
                          ? "labelTextUploaded"
                          : documents?.find((doc) => doc.name === "Ijazah/SKL")
                          ? "labelTextDisabled"
                          : "labelText"
                      }
                      preview={false}
                      isDisabled={!!documents?.find((doc) => doc.name === "Ijazah/SKL")}
                    />
                  </div>
                  {getStudent?.registration_path_id === 2 && (
                    <Fragment>
                      <div className="flex flex-col gap-2">
                        <UploadField
                          label="Surat Pindahan"
                          control={control}
                          name="surat_pindahan"
                          variant="custom"
                          inputLabel="Pilih File"
                          required
                          labelClassName={
                            watch("surat_pindahan")
                              ? "labelTextUploaded"
                              : documents?.find((doc) => doc.name === "Surat Pindahan")
                              ? "labelTextDisabled"
                              : "labelText"
                          }
                          preview={false}
                          isDisabled={!!documents?.find((doc) => doc.name === "Surat Pindahan")}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <UploadField
                          label="Transkip nilai"
                          control={control}
                          name="transkip_nilai_pindahan"
                          variant="custom"
                          inputLabel="Pilih File"
                          required
                          labelClassName={
                            watch("transkip_nilai_pindahan")
                              ? "labelTextUploaded"
                              : documents?.find((doc) => doc.name === "Transkip Nilai Pindahan")
                              ? "labelTextDisabled"
                              : "labelText"
                          }
                          preview={false}
                          isDisabled={
                            !!documents?.find((doc) => doc.name === "Transkip Nilai Pindahan")
                          }
                        />
                      </div>
                    </Fragment>
                  )}
                </Fragment>
              )}

              {degreeProgram === 2 && (
                <Fragment>
                  <div className="flex flex-col gap-2">
                    <UploadField
                      label="Ijazah S1"
                      control={control}
                      name="ijazahS1_S2"
                      variant="custom"
                      inputLabel="Pilih File"
                      required
                      labelClassName={
                        watch("ijazahS1_S2")
                          ? "labelTextUploaded"
                          : documents?.find((doc) => doc.name === "Ijazah S1")
                          ? "labelTextDisabled"
                          : "labelText"
                      }
                      preview={false}
                      isDisabled={!!documents?.find((doc) => doc.name === "Ijazah S1")}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <UploadField
                      label="Kartu Keluarga"
                      control={control}
                      name="kartu_keluarga_S2"
                      variant="custom"
                      required
                      inputLabel="Pilih File"
                      labelClassName={
                        watch("kartu_keluarga_S2")
                          ? "labelTextUploaded"
                          : documents?.find((doc) => doc.name === "Kartu Keluarga")
                          ? "labelTextDisabled"
                          : "labelText"
                      }
                      preview={false}
                      isDisabled={!!documents?.find((doc) => doc.name === "Kartu Keluarga")}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <UploadField
                      label="KTP"
                      control={control}
                      name="KTP_S2"
                      variant="custom"
                      inputLabel="Pilih File"
                      required
                      labelClassName={
                        watch("KTP_S2")
                          ? "labelTextUploaded"
                          : documents?.find((doc) => doc.name === "KTP")
                          ? "labelTextDisabled"
                          : "labelText"
                      }
                      preview={false}
                      isDisabled={!!documents?.find((doc) => doc.name === "KTP")}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <UploadField
                      label="Transkrip Nilai"
                      control={control}
                      name="transkrip_nilai_S2"
                      variant="custom"
                      inputLabel="Pilih File"
                      labelClassName={
                        watch("transkrip_nilai_S2")
                          ? "labelTextUploaded"
                          : documents?.find((doc) => doc.name === "Transkrip Nilai")
                          ? "labelTextDisabled"
                          : "labelText"
                      }
                      preview={false}
                      required
                      isDisabled={!!documents?.find((doc) => doc.name === "Transkrip Nilai")}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <UploadField
                      label="Porlap Dikti"
                      control={control}
                      name="porlap_dikti_S2"
                      variant="custom"
                      inputLabel="Pilih File"
                      required
                      labelClassName={
                        watch("porlap_dikti_S2")
                          ? "labelTextUploaded"
                          : documents?.find((doc) => doc.name === "Porlap Dikti")
                          ? "labelTextDisabled"
                          : "labelText"
                      }
                      preview={false}
                      isDisabled={!!documents?.find((doc) => doc.name === "Porlap Dikti")}
                    />
                  </div>
                </Fragment>
              )}

              {degreeProgram === 3 && (
                <Fragment>
                  <div className="flex flex-col gap-2">
                    <UploadField
                      label="Ijazah S1"
                      control={control}
                      name="ijazahS1_S3"
                      variant="custom"
                      required
                      inputLabel="Pilih File"
                      labelClassName={
                        watch("ijazahS1_S3")
                          ? "labelTextUploaded"
                          : documents?.find((doc) => doc.name === "Ijazah S1")
                          ? "labelTextDisabled"
                          : "labelText"
                      }
                      preview={false}
                      isDisabled={!!documents?.find((doc) => doc.name === "Ijazah S1")}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <UploadField
                      label="Ijazah S2"
                      control={control}
                      name="ijazahS2_S3"
                      variant="custom"
                      required
                      inputLabel="Pilih File"
                      labelClassName={
                        watch("ijazahS2_S3")
                          ? "labelTextUploaded"
                          : documents?.find((doc) => doc.name === "Ijazah S2")
                          ? "labelTextDisabled"
                          : "labelText"
                      }
                      preview={false}
                      isDisabled={!!documents?.find((doc) => doc.name === "Ijazah S2")}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <UploadField
                      label="Kartu Keluarga"
                      control={control}
                      name="kartu_keluarga_S3"
                      variant="custom"
                      required
                      inputLabel="Pilih File"
                      labelClassName={
                        watch("kartu_keluarga_S3")
                          ? "labelTextUploaded"
                          : documents?.find((doc) => doc.name === "Kartu Keluarga")
                          ? "labelTextDisabled"
                          : "labelText"
                      }
                      preview={false}
                      isDisabled={!!documents?.find((doc) => doc.name === "Kartu Keluarga")}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <UploadField
                      label="KTP"
                      control={control}
                      name="KTP_S3"
                      variant="custom"
                      inputLabel="Pilih File"
                      required
                      labelClassName={
                        watch("KTP_S3")
                          ? "labelTextUploaded"
                          : documents?.find((doc) => doc.name === "KTP")
                          ? "labelTextDisabled"
                          : "labelText"
                      }
                      preview={false}
                      isDisabled={!!documents?.find((doc) => doc.name === "KTP")}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <UploadField
                      label="Transkip Nilai"
                      control={control}
                      name="transkrip_nilai_S3"
                      variant="custom"
                      required
                      inputLabel="Pilih File"
                      labelClassName={
                        watch("transkrip_nilai_S3")
                          ? "labelTextUploaded"
                          : documents?.find((doc) => doc.name === "Transkip Nilai")
                          ? "labelTextDisabled"
                          : "labelText"
                      }
                      preview={false}
                      isDisabled={!!documents?.find((doc) => doc.name === "Transkip Nilai")}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <UploadField
                      label="Porlap Dikti"
                      control={control}
                      name="porlap_dikti_S3"
                      variant="custom"
                      inputLabel="Pilih File"
                      required
                      labelClassName={
                        watch("porlap_dikti_S3")
                          ? "labelTextUploaded"
                          : documents?.find((doc) => doc.name === "Porlap Dikti")
                          ? "labelTextDisabled"
                          : "labelText"
                      }
                      preview={false}
                      isDisabled={!!documents?.find((doc) => doc.name === "Porlap Dikti")}
                    />
                  </div>
                </Fragment>
              )}
            </section>
          </div>
        </section>

        {/* Button */}
        <section className="w-full lg:w-[70vw] xl:w-[70vw] lg:pl-[2vw] flex justify-end mt-16 md:mt-10 items-center rounde pr-5 mb-[30px]">
          <Button
            type="submit"
            variant="filled"
            size="md"
            width="w-30% lg:w-25% xl:w-15%"
            loading={isLoading}
            disabled={
              degreeProgram === 1
                ? watch("kartu_keluarga_S1") &&
                  watch("ijazah_SKL_S1") &&
                  watch("KTP_S1") &&
                  watch("akta_kelahiran_S1") &&
                  getStudent?.registration_path_id === 2
                  ? watch("surat_pindahan") && watch("transkip_nilai_pindahan")
                    ? false
                    : true
                  : true
                : degreeProgram === 2
                ? watch("ijazahS1_S2") &&
                  watch("kartu_keluarga_S2") &&
                  watch("KTP_S2") &&
                  watch("transkrip_nilai_S2") &&
                  watch("porlap_dikti_S2")
                  ? false
                  : true
                : degreeProgram === 3
                ? watch("ijazahS1_S3") &&
                  watch("ijazahS2_S3") &&
                  watch("kartu_keluarga_S3") &&
                  watch("KTP_S3") &&
                  watch("transkrip_nilai_S3") &&
                  watch("porlap_dikti_S3")
                  ? false
                  : true
                : false || isDisabled
            }
          >
            Submit Berkas
          </Button>
        </section>
      </section>

      {(selectionType === 1 || selectionType === 2) &&
        (isDisabled || documents?.find((doc) => doc.name === "KTP")) && (
          <RedirectLink link="/dashboard/registrasi/beasiswa">Beasiswa</RedirectLink>
        )}

      {selectionType === 3 && <RedirectLink link="/dashboard/selection">Tes seleksi</RedirectLink>}
    </form>
  );
};
