import { FC, Fragment, ReactElement, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TVSNoPesertaUser, VSNoPesertaUser } from "@uninus/entities";
import { zodResolver } from "@hookform/resolvers/zod";
import { TSeleksiProps } from "./type";
import { Button, Modal, PopUp, TextField } from "@uninus/web/components";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { FaCircleUser } from "react-icons/fa6";
import { useCheckRegistration } from "./hook";
import { KartuKelulusan } from "./pdf";
import { AiOutlineCarryOut, AiOutlinePhone } from "react-icons/ai";
import { NeoTypography } from "@uninus/ui-atoms";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <p className="text-primary-green">Menyiapkan dokumen..</p>,
  },
);

export const ModalAndButtons: FC = (): ReactElement => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isPopUp, setIsPopUp] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TVSNoPesertaUser>({
    mode: "all",
    resolver: zodResolver(VSNoPesertaUser),
    defaultValues: {
      registrationNumber: "",
    },
  });

  const callCenter = () => {
    window.open("https://wa.me/6282116860530", "_blank");
  };

  const closeModal = () => {
    setIsModal(!isModal);
    reset();
  };

  const listenToScroll = useCallback(() => {
    const heightToHide = 300;
    const heightToHideFooter = 3400;
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightToHide) {
      if (winScroll > heightToHideFooter) {
        setIsVisible(true);
        setIsPopUp(false);
      } else {
        isVisible && setIsVisible(false);
      }
    } else {
      setIsVisible(true);
      setIsPopUp(false);
    }
  }, [isVisible]);

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => {
      window.removeEventListener("scroll", listenToScroll);
    };
  }, [listenToScroll]);

  const { mutate, data, reset, error, isError } = useCheckRegistration();

  const onCheckRegistration = handleSubmit((data) => {
    try {
      mutate(data);
    } catch (error) {
      console.error(error);
    }
  });

  const dataPeserta: TSeleksiProps[] = [
    {
      label: "Program Studi",
      item: "S1 - Pendidikan Luar Biasa",
    },
    {
      label: "Jalur Pendidikan",
      item: "Beasiswa Nusantara Berprestasi",
    },
  ];

  return (
    <Fragment>
      {/* Modal Cek Kelulusan */}
      <Modal
        showModal={isModal}
        onClose={closeModal}
        closeClassName="text-primary-white p-0"
        bodyClassName="py-4"
        footerColor="green"
        modalTitle={
          data?.registrationStatus === "Lulus" ? (
            <div className="flex items-center gap-4 md:w-[70%]">
              <Image
                alt="logo-uninus"
                src="/illustrations/uninus-logo.webp"
                quality={100}
                width={300}
                height={300}
                className="w-16 h-16"
              />
              <NeoTypography size="body-2" variant="reguler" color="text-white">
                SELAMAT! ANDA DINYATAKAN LULUS SELEKSI PMB UNINUS 2023
              </NeoTypography>
            </div>
          ) : data?.registrationStatus === "Tidak Lulus" ? (
            <div className="flex items-center gap-4 md:w-[70%]">
              <Image
                alt="logo-uninus"
                src="/illustrations/uninus-logo.webp"
                quality={100}
                width={300}
                height={300}
                className="w-16 h-16"
              />
              <NeoTypography size="body-2" variant="reguler" color="text-white">
                MAAF ANDA DINYATAKAN TIDAK LULUS SELEKSI PMB UNINUS 2023
              </NeoTypography>
            </div>
          ) : (
            <Image
              src={"/illustrations/Neo-Uninus.webp"}
              width={500}
              height={500}
              quality={100}
              alt="logo-uninus"
              priority
              className="w-36"
            />
          )
        }
        className={`${
          data
            ? "bg-primary-white max-w-md md:max-w-xl lg:max-w-2xl"
            : "bg-primary-green max-w-2xl xl:max-w-3xl"
        }  rounded-lg duration-150 ease-in-out`}
        headerColor={`${
          data?.registrationStatus === "Lulus"
            ? "secondary-green"
            : data?.registrationStatus === "Tidak Lulus"
              ? "red"
              : data?.message
                ? "orange"
                : "green"
        }`}
      >
        {/* Input nomor pendaftaran modal */}
        {!data && (
          <section className="flex w-full flex-col md:flex-row gap-10 h-[40vh] px-12 items-center md:items-start font-extrabold md:justify-between pt-2 md:pt-12">
            <div className="w-full text-center md:text-left md:w-[60%] text-white">
              <NeoTypography size="subtitle-1" textType="uppercase">
                pengumuman kelulusan
              </NeoTypography>
              <NeoTypography size="body-2" variant="reguler">
                Calon Mahasiswa Baru 2023/2024
              </NeoTypography>
            </div>
            <form onSubmit={onCheckRegistration} className="w-full md:w-[40%]">
              <TextField
                type="number"
                name="registrationNumber"
                label="Masukan No Peserta"
                labelclassname="font-semibold text-primary-white"
                placeholder="Masukan Nomor Pendaftaran"
                variant="sm"
                control={control}
                inputHeight="h-8"
                inputBackground="bg-primary-white"
                status={errors?.registrationNumber ? "error" : isError ? "error" : undefined}
                message={
                  isError ? error?.response?.data?.message : errors?.registrationNumber?.message
                }
                messageClassName="text-red-3"
              />
              <Button variant="green-outline" size="sm" width="w-full" height="h-10">
                Cek Hasil
              </Button>
            </form>
          </section>
        )}

        {/* Kelulusan modal */}
        {data && (
          <section
            className={`flex flex-col w-full h-[25em] md:h-[20em] px-4 md:px-10 items-center 
          ${data?.registrationStatus === "Tidak Lulus" ? "" : "justify-center lg:h-[22em]"}`}
          >
            {data?.registrationNumber && (
              <section className="flex flex-col gap-2 w-full font-semibold py-2 px-4 md:px-0 text-xl">
                <NeoTypography size="caption" sizeResponsiveMD="body-2" color="text-grey-950">
                  No Registrasi : {data?.registrationNumber}
                </NeoTypography>
                <NeoTypography
                  variant="bold"
                  color="text-green-pea-500"
                  sizeResponsiveMD="subtitle-2"
                >
                  {data?.fullname}
                </NeoTypography>
              </section>
            )}

            {/* Ketika Lulus */}
            {data?.registrationStatus === "Lulus" && (
              <Fragment>
                <section className="flex flex-col w-full items-center text-center md:items-start md:text-left">
                  <div className="flex flex-col gap-5 md:gap-1 pb-6">
                    <NeoTypography
                      size="body-2"
                      variant="medium"
                      color="text-grey-950"
                      sizeResponsiveMD="body-2"
                    >
                      Selamat! Anda dinyatakan{" "}
                      <span className="text-primary-green font-semibold">lulus</span> seleksi PMB
                      Uninus
                    </NeoTypography>

                    <div className="flex flex-col md:flex-row gap-6 lg:gap-16 mt-2">
                      {dataPeserta.map((peserta, idx) => (
                        <div key={idx} className="flex flex-col gap-1">
                          <NeoTypography
                            variant="bold"
                            color="text-green-pea-500"
                            sizeResponsiveMD="body-2"
                          >
                            {peserta.label}
                          </NeoTypography>
                          <NeoTypography
                            size="body-2"
                            variant="bold"
                            sizeResponsiveMD="caption"
                            sizeResponsiveLG="body-2"
                            color="text-grey-950"
                          >
                            {peserta.item}
                          </NeoTypography>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
                <div className="flex w-[90%] md:w-full flex-col gap-4 lg:gap-8 items-center text-center mt-12">
                  <NeoTypography size="caption" variant="semi-bold" sizeResponsiveLG="body-2">
                    Silahkan melakukan tahapan berikutnya dengan mengunduh bukti kelulusan di bawah
                    ini
                  </NeoTypography>

                  <PDFDownloadLink
                    document={<KartuKelulusan />}
                    fileName="4103700434832748_Kartu Kelulusan.pdf"
                  >
                    {({ loading }) =>
                      loading ? (
                        <NeoTypography color="text-green-500">hampir selesai...</NeoTypography>
                      ) : (
                        <Button variant="filled" width="w-full" height="md:h-8 lg:h-6">
                          <div className="flex justify-center items-center gap-2">
                            Unduh Bukti Kelulusan
                          </div>
                        </Button>
                      )
                    }
                  </PDFDownloadLink>
                </div>
              </Fragment>
            )}
            {/* Ketika tidak lulus */}
            {data?.registrationStatus === "Tidak Lulus" && (
              <section className="flex flex-col w-full gap-12 md:gap-6 items-center text-center mt-2 pb-6">
                <NeoTypography size="body-2" variant="medium" color="text-grey-950">
                  Anda dinyatakan <span className="text-red-6 font-semibold">tidak lulus</span>{" "}
                  seleksi penerimaan mahasiswa baru Universitas Islam Nusantara
                </NeoTypography>

                <div className="flex flex-col rounded-md p-6 gap-4 shadow-md sm:w-[90%] md:w-full lg:w-[90%]">
                  <NeoTypography size="body-1" variant="bold" color="text-green-500">
                    JANGAN PUTUS ASA DAN TETAP SEMANGAT!
                  </NeoTypography>

                  <NeoTypography size="body-2" variant="semi-bold">
                    Masih ada kesempatan untuk mendaftar melalui jalur beasiswa unggul dan jalur
                    reguler gelombang 3
                  </NeoTypography>
                </div>
              </section>
            )}
            {/* Ketika sedang dalam proses selesi */}
            {!data?.registrationStatus && (
              <section className="flex flex-col w-full items-center text-center">
                <NeoTypography
                  size="subtitle-2"
                  variant="medium"
                  color="text-green-400"
                  sizeResponsiveMD="title-5"
                >
                  Sedang dalam proses{" "}
                  <span className="text-primary-yellow font-semibold">seleksi</span>{" "}
                </NeoTypography>
              </section>
            )}
          </section>
        )}
      </Modal>

      {/* Floating Button WA */}
      <motion.button
        style={{
          x: 300,
          y: isPopUp ? -105 : 0,
          rotate: isPopUp ? 360 : 0,
        }}
        animate={{
          x: isVisible ? [0, 300] : [300, 0],
        }}
        className={`fixed flex items-center justify-center transition-transform bottom-24 md:bottom-28 right-9 md:right-10 xl:right-12 z-50 group bg-primary-green rounded-full h-10 w-10 md:h-12 md:w-12 active:bg-secondary-green-1 ${
          isVisible ? "" : "duration-300"
        }`}
        onClick={() => setIsPopUp(!isPopUp)}
      >
        <AiOutlinePhone className="text-2xl duration-200 text-primary-white font-bold " />
      </motion.button>

      {/* Floating button cek kelulusan */}
      <motion.button
        style={{
          x: 500,
        }}
        animate={{
          x: isVisible ? [0, 500] : [500, 0],
        }}
        className={`fixed flex flex-col items-center justify-center transition-transform bottom-6 right-6 xl:right-8 z-50 group bg-primary-green rounded-full h-16 w-16 md:h-20 md:w-20 active:bg-secondary-green-1`}
        onClick={() => setIsModal(true)}
      >
        <AiOutlineCarryOut className="text-primary-white text-2xl md:text-4xl" />
        <NeoTypography
          size="caption"
          variant="semi-bold"
          textPosisition="center"
          color="text-white"
        >
          Cek <br /> Kelulusan
        </NeoTypography>
      </motion.button>

      {/* PopUp CallCenter */}
      <PopUp
        showPopUp={isPopUp}
        position="fixed bottom-2 md:bottom-6 right-24 md:right-32"
        className="flex flex-col items-center justify-between pt-8 pb-6"
        header={
          <div className="flex w-full h-full justify-start gap-4 text-primary-white items-center px-5">
            <FaCircleUser className="h-6 w-6" />
            <NeoTypography size="body-2" variant="semi-bold" sizeResponsiveLG="body-1">
              Call Center PMB UNINUS
            </NeoTypography>
          </div>
        }
      >
        <div className="border-2 border-primary-green rounded-lg w-[60vw] sm:w-[18em] lg:w-[19em] h-[4.5em] flex justify-center items-center p-4">
          <NeoTypography size="caption" sizeResponsiveMD="body-2" color="text-green-400">
            {`"`}Ingin informasi cepat tentang pendaftaran, program studi, atau fasilitas kampus?
            Call center kami, siap membantumu!{`"`}
          </NeoTypography>
        </div>
        <Button size="sm" height="h-5" styling="text-xs" onClick={callCenter}>
          Hubungi Kami
        </Button>
      </PopUp>
    </Fragment>
  );
};
