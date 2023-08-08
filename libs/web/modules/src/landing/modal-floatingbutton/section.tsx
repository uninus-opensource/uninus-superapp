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

export const ModalAndButtons: FC = (): ReactElement => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isPopUp, setIsPopUp] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isPassed, setIsPassed] = useState<boolean | null>(null);

  const {
    control,
    formState: { errors },
  } = useForm<TVSNoPesertaUser>({
    mode: "all",
    resolver: zodResolver(VSNoPesertaUser),
    defaultValues: {
      noPeserta: "",
    },
  });

  const callCenter = () => {
    window.open("https://wa.me/6282116860530", "_blank");
  };

  const closeModal = () => {
    setIsModal(!isModal);
    setIsPassed(null);
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

  const dataSeleksi: TSeleksiProps[] = [
    {
      label: "Tanggal Lahir",
      item: "16 Juli 2006",
    },
    {
      label: "Kabupaten/Kota",
      item: "Kota Bandung",
    },
    {
      label: "Asal Sekolah",
      item: "SMAN 2 Bandung",
    },
    {
      label: "Provinsi",
      item: "Jawa Barat",
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
          isPassed === true ? (
            <p className="text-xs text-primary-white">
              SELAMAT! ANDA DINYATAKAN LULUS SELEKSI JALUR REGULER 2023
            </p>
          ) : isPassed === false ? (
            <p className="text-xs text-primary-white">
              ANDA DINYATAKAN TIDAK LULUS SELEKSI JALUR REGULER 2023
            </p>
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
          isPassed === null
            ? "bg-primary-green max-w-2xl xl:max-w-3xl"
            : "bg-primary-white max-w-4xl"
        }  rounded-lg duration-150 ease-in-out`}
        headerColor={`${
          isPassed === true ? "bg-secondary-green-1" : isPassed === false ? "bg-red-7" : ""
        }`}
      >
        <section
          className={`${
            isPassed === null ? "flex" : "hidden"
          } w-full flex-col md:flex-row gap-10 h-[40vh] px-12 items-center md:items-start font-extrabold md:justify-between pt-2 md:pt-12`}
        >
          <div className="w-full text-center md:text-left md:w-[60%] text-primary-white">
            <h1 className="uppercase text-lg">pengumuman kelulusan</h1>
            <h2 className="text-xs">Calon Mahasiswa Baru 2023/2024</h2>
          </div>
          <div className="w-full md:w-[40%]">
            <TextField
              type="number"
              name="noPeserta"
              label="Masukan No Peserta"
              labelclassname="font-semibold text-primary-white"
              variant="sm"
              control={control}
              inputHeight="h-6"
              inputBackground="bg-primary-white"
              status={errors?.noPeserta ? "error" : undefined}
              message={errors?.noPeserta?.message}
              messageClassName="text-red-3"
            />
            <Button
              variant="green-outline"
              size="sm"
              width="w-full"
              height="h-4"
              onClick={() => setIsPassed(true)}
            >
              Cek Hasil
            </Button>
          </div>
        </section>
        <section
          className={`${
            isPassed === null ? "hidden" : "flex"
          } flex-col md:flex-row w-full xl:h-[30vh] lg:h-[40vh] px-4 md:px-12 items-center justify-between`}
        >
          <section className="flex flex-col gap-7 w-full md:w-[60%]">
            <div>
              <h6 className="text-xs">No Pendaftaran : 0234232</h6>
              <h1 className="font-semibold text-xl text-secondary-green-4">Harry Potter</h1>
              <h5 className="font-semibold text-sm">Fakultas Teknik</h5>
              <h5 className="font-semibold text-sm">Teknik Informatika</h5>
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
              isPassed === true ? "flex md:hidden" : "hidden"
            } flex-col w-full items-center justify-center gap-2 mt-12`}
          >
            <span className="text-[10px] font-bold">Silahkan lakukan pendaftaran ulang</span>
            <Button variant="filled" width="w-[15em]">
              Unduh Bukti Kelulusan
            </Button>
          </section>

          {/* Ketika tidak lulus */}
          <section
            className={`${
              isPassed === false ? "flex" : "hidden"
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
