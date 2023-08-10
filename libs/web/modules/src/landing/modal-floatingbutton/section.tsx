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

  const dataSeleksi: TSeleksiProps[] = [
    {
      label: "Tanggal Lahir",
      item: data?.birth_date,
    },
    {
      label: "Kabupaten/Kota",
      item: data?.birth_place,
    },
    {
      label: "Asal Sekolah",
      item: data?.school_name,
    },
    {
      label: "Provinsi",
      item: data?.province,
    },
  ];

  return (
    <Fragment>
      {/* Modal Cek Kelulusan */}
      <Modal
        showModal={isModal}
        onClose={closeModal}
        closeClassName="text-primary-white p-0"
        bodyClassName="py-4 md:py-8"
        modalTitle={
          data?.registration_status === "Lulus" ? (
            <div className="flex items-center gap-4">
              <Image
                alt="logo-uninus"
                src="/illustrations/uninus-logo.webp"
                quality={100}
                width={300}
                height={300}
                className="w-16 h-16"
              />
              <p className="text-xs text-primary-white">
                SELAMAT! ANDA DINYATAKAN LULUS SELEKSI JALUR REGULER 2023
              </p>
            </div>
          ) : data?.registration_status === "Tidak Lulus" ? (
            <div className="flex items-center gap-4">
              <Image
                alt="logo-uninus"
                src="/illustrations/uninus-logo.webp"
                quality={100}
                width={300}
                height={300}
                className="w-16 h-16"
              />
              <p className="text-xs text-primary-white">
                ANDA DINYATAKAN TIDAK LULUS SELEKSI JALUR REGULER 2023
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
          data ? "bg-primary-white max-w-5xl" : "bg-primary-green max-w-2xl xl:max-w-3xl"
        }  rounded-lg duration-150 ease-in-out`}
        headerColor={`${
          data?.registration_status === "Lulus"
            ? "bg-secondary-green-1"
            : data?.registration_status === "Tidak Lulus"
            ? "bg-red-7"
            : ""
        }`}
      >
        {/* Input nomor pendaftaran modal */}
        {!data && (
          <section
            className={`flex w-full flex-col md:flex-row gap-10 h-[40vh] px-12 items-center md:items-start font-extrabold md:justify-between pt-2 md:pt-12`}
          >
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
          <section className="flex flex-col md:flex-row w-full lg:h-[30vh] px-4 md:px-12 items-center justify-between">
            <section className="flex flex-col gap-7 w-full md:w-[60%]">
              <div className="flex flex-col gap-1">
                <h6 className="text-xs">No Pendaftaran : {data?.registration_number}</h6>
                <h1 className="font-semibold text-xl text-secondary-green-4">{data?.fullname}</h1>
                <h5 className="font-semibold text-sm">Program Studi : S1 - Teknik Informatika</h5>
                <h5 className="font-semibold text-sm">
                  Jalur Pendaftaran : Beasiswa Nusantara Berprestasi
                </h5>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {dataSeleksi.map((data, idx) => (
                  <div key={idx} className="flex flex-col">
                    <h2 className="text-secondary-green-4 text-sm font-semibold">{data.label}</h2>
                    <h2 className="text-xs">{data.item}</h2>
                  </div>
                ))}
              </div>
            </section>

            {/* Ketika Lulus */}
            <section
              className={`${
                data?.registration_status === "Lulus" ? "flex" : "hidden"
              } flex-col w-full md:w-[30%] items-center justify-center gap-2 mt-12`}
            >
              <span className="text-[10px] font-bold">Silahkan lakukan pendaftaran ulang</span>
              <Button variant="filled" width="w-[15em]">
                Unduh Bukti Kelulusan
              </Button>
            </section>

            {/* Ketika tidak lulus */}
            <section
              className={`${
                data?.registration_status === "Tidak Lulus" ? "flex" : "hidden"
              } flex-col justify-center text-center items-center w-full md:w-[40%] h-auto py-6 px-4 shadow-md rounded-lg gap-1 mt-12 md:mt-0`}
            >
              <h1 className="text-sm text-secondary-green-4 font-black">
                JANGAN PUTUS ASA DAN TETAP SEMANGAT!
              </h1>
              <h2 className="text-[10px] font-semibold">
                Masih ada kesempatan untuk mendaftar melalui jalur beasiswa unggul dan jalur reguler
                gelombang 3
              </h2>
            </section>
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
