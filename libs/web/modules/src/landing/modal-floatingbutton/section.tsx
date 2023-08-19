import { FC, Fragment, ReactElement, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TVSNoPesertaUser, VSNoPesertaUser } from "@uninus/entities";
import { zodResolver } from "@hookform/resolvers/zod";
import { TSeleksiProps } from "./type";
import { Button, Modal, PopUp, TextField } from "@uninus/web/components";
import Image from "next/image";
import { BsCalendarCheck, BsTelephone } from "react-icons/bs";
import { motion } from "framer-motion";
import { FaCircleUser } from "react-icons/fa6";
import { useCheckRegistration } from "./hook";

/*
Untuk cek kelulusan sementara pakai nomor berikut
3215435543
3432432453
3432468090
4354366788
5465486799
*/

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
      registration_number: "",
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
        modalTitle={
          data?.registration_status === "Lulus" ? (
            <div className="flex items-center gap-4 md:w-[70%]">
              <Image
                alt="logo-uninus"
                src="/illustrations/uninus-logo.webp"
                quality={100}
                width={300}
                height={300}
                className="w-16 h-16"
              />
              <p className="text-xs text-primary-white">
                SELAMAT! ANDA DINYATAKAN LULUS SELEKSI PMB UNINUS 2023
              </p>
            </div>
          ) : data?.registration_status === "Tidak Lulus" ? (
            <div className="flex items-center gap-4 md:w-[70%]">
              <Image
                alt="logo-uninus"
                src="/illustrations/uninus-logo.webp"
                quality={100}
                width={300}
                height={300}
                className="w-16 h-16"
              />
              <p className="text-xs text-primary-white">
                MAAF ANDA DINYATAKAN TIDAK LULUS SELEKSI PMB UNINUS 2023
              </p>
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
          data?.registration_status === "Lulus"
            ? "bg-secondary-green-1"
            : data?.registration_status === "Tidak Lulus"
            ? "bg-red-7"
            : data?.message
            ? "bg-primary-orange"
            : ""
        }`}
      >
        {/* Input nomor pendaftaran modal */}
        {!data && (
          <section className="flex w-full flex-col md:flex-row gap-10 h-[40vh] px-12 items-center md:items-start font-extrabold md:justify-between pt-2 md:pt-12">
            <div className="w-full text-center md:text-left md:w-[60%] text-primary-white">
              <h1 className="uppercase text-lg">pengumuman kelulusan</h1>
              <h2 className="text-xs">Calon Mahasiswa Baru 2023/2024</h2>
            </div>
            <form onSubmit={onCheckRegistration} className="w-full md:w-[40%]">
              <TextField
                type="number"
                name="registration_number"
                label="Masukan No Peserta"
                labelclassname="font-semibold text-primary-white"
                placeholder="Masukan Nomor Pendaftaran"
                variant="sm"
                control={control}
                inputHeight="h-8"
                inputBackground="bg-primary-white"
                status={errors?.registration_number ? "error" : isError ? "error" : undefined}
                message={
                  isError ? error?.response?.data?.message : errors?.registration_number?.message
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
          ${data?.registration_status === "Tidak Lulus" ? "" : "justify-center lg:h-[22em]"}`}
          >
            {data?.registration_number && (
              <section className="flex flex-col gap-2 w-full font-semibold py-2 px-4 md:px-0">
                <h4 className="text-[10px] md:text-xs text-grayscale-9">
                  No Registrasi : {data?.registration_number}
                </h4>
                <h2 className="text-secondary-green-4 font-extrabold md:text-xl">
                  {data?.fullname}
                </h2>
              </section>
            )}

            {/* Ketika Lulus */}
            {data?.registration_status === "Lulus" && (
              <Fragment>
                <section className="flex flex-col w-full items-center text-center md:items-start md:text-left">
                  <div className="flex flex-col gap-5 md:gap-1">
                    <p className="text-xs sm:text-sm w-full font-medium text-grayscale-9 pt-6">
                      Selamat! Anda dinyatakan{" "}
                      <span className="text-primary-green font-semibold">lulus</span> seleksi PMB
                      Uninus
                    </p>
                    <div className="flex flex-col md:flex-row gap-6 lg:gap-16 mt-2">
                      {dataPeserta.map((peserta, idx) => (
                        <div key={idx} className="flex flex-col gap-1">
                          <h1 className="text-base md:text-sm font-bold text-secondary-green-4">
                            {peserta.label}
                          </h1>
                          <p className="text-grayscale-9 text-xs md:text-[10px] lg:text-sm font-semibold">
                            {peserta.item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
                <div className="flex w-[90%] md:w-full flex-col gap-4 lg:gap-8 items-center text-center mt-12   ">
                  <p className="text-[10px] lg:text-xs font-semibold w-[90%] sm:w-[75%] lg:w-[70%]">
                    Silahkan melakukan tahapan berikutnya dengan mengunduh bukti kelulusan di bawah
                    ini
                  </p>
                  <Button variant="filled" width="w-full" height="md:h-8 lg:h-6">
                    Unduh Bukti Kelulusan
                  </Button>
                </div>
              </Fragment>
            )}

            {/* Ketika tidak lulus */}
            {data?.registration_status === "Tidak Lulus" && (
              <section className="flex flex-col w-full gap-12 md:gap-6 items-center text-center  mt-2">
                <p className="text-sm w-full sm:w-[70%] md:w-full lg:w-[80%] font-medium text-grayscale-9 pt-6">
                  Anda dinyatakan <span className="text-red-6 font-semibold">tidak lulus</span>{" "}
                  seleksi penerimaan mahasiswa baru Universitas Islam Nusantara
                </p>
                <div className="flex flex-col rounded-md p-6 gap-4 shadow-md sm:w-[90%] md:w-full lg:w-[90%] ">
                  <h1 className="text-lg lg:text-base text-secondary-green-4 font-black">
                    JANGAN PUTUS ASA DAN TETAP SEMANGAT!
                  </h1>
                  <h2 className="text-xs font-semibold">
                    Masih ada kesempatan untuk mendaftar melalui jalur beasiswa unggul dan jalur
                    reguler gelombang 3
                  </h2>
                </div>
              </section>
            )}

            {/* Ketika sedang dalam proses selesi */}
            {!data?.registration_status && (
              <section className="flex flex-col w-full items-center text-center">
                <p className="text-xl md:text-3xl w-full text-secondary-green-1 font-medium">
                  Sedang dalam proses{" "}
                  <span className="text-primary-yellow font-semibold">seleksi</span>{" "}
                </p>
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
        <BsTelephone className="-rotate-90 text-xl duration-200 text-primary-white font-bold " />
      </motion.button>

      {/* Floating button cek kelulusan */}
      <motion.button
        style={{
          x: 500,
        }}
        animate={{
          x: isVisible ? [0, 500] : [500, 0],
        }}
        className={`fixed flex flex-col gap-1 items-center justify-center transition-transform bottom-6 right-6 xl:right-8 z-50 group bg-primary-green rounded-full h-16 w-16 md:h-20 md:w-20 active:bg-secondary-green-1`}
        onClick={() => setIsModal(true)}
      >
        <BsCalendarCheck className="text-primary-white text-2xl md:text-3xl" />
        <span className="text-[8px] md:text-[10px] font-bold text-primary-white leading-none">
          Cek <br /> Kelulusan
        </span>
      </motion.button>

      {/* PopUp CallCenter */}
      <PopUp
        showPopUp={isPopUp}
        position="fixed bottom-2 md:bottom-6 right-24 md:right-32"
        className="flex flex-col items-center justify-between pt-8 pb-6"
        header={
          <div className="flex w-full h-full justify-start gap-4 text-primary-white items-center px-5">
            <FaCircleUser className="h-6 w-6" />
            <p className="font-semibold text-xs sm:text-sm md:text-lg">Call Center UNINUS</p>
          </div>
        }
      >
        <div className="border-2 border-primary-green rounded-lg w-[60vw] sm:w-[18em] lg:w-[19em] h-[4.5em] flex justify-center items-center p-4">
          <p className="text-[9px] sm:text-[10px] md:text-xs text-secondary-green-1 font-semibold">
            {`"`}Ingin informasi cepat tentang pendaftaran, program studi, atau fasilitas kampus?
            Call center kami, siap membantumu!{`"`}
          </p>
        </div>
        <Button size="sm" height="h-5" styling="text-xs" onClick={callCenter}>
          Hubungi Kami
        </Button>
      </PopUp>
    </Fragment>
  );
};
