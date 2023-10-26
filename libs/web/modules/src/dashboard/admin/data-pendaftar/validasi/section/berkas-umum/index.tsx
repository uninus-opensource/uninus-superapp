import { Accordion, Button, RadioButton } from "@uninus/web/components";
import { useStudentDataByIdValidation } from "@uninus/web/services";
import { usePathname } from "next/navigation";
import { FC, MouseEvent, ReactElement, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useBiodataUpdateById } from "../../../edit-data-pendaftar/hooks";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";

export type TIsVerifiedDocs = {
  id: string | undefined;
  isVerified: boolean;
};

export const BerkasUmum: FC = (): ReactElement => {
  const { getStudentbyId } = useStudentDataByIdValidation();
  const [isAkta, setIsAkta] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isKtp, setIsKtp] = useState<string | null>(null);
  const [isKartuKeluarga, setIsKartuKeluarga] = useState<string | null>(null);
  const [isIjazahSkl, setIsIjazahSkl] = useState<string | null>(null);
  const [isPorlap, setIsPorlap] = useState<string | null>(null);
  const [isIjazahS1, setIsIjazahS1] = useState<string | null>(null);
  const [isIjazahS2, setIsIjazahS2] = useState<string | null>(null);
  const [isTranskrip, setIsTranskrip] = useState<string | null>(null);
  const path = usePathname();
  const id = path.split("/")[4];

  const documents = useMemo(() => {
    return getStudentbyId?.documents;
  }, [getStudentbyId]);

  const degreeProgram = useMemo(() => {
    return getStudentbyId?.degree_program_id;
  }, [getStudentbyId]);

  const { control, handleSubmit, setValue } = useForm({
    mode: "all",
  });

  const kartu_keluarga = documents?.find((doc) => doc.name === "Kartu Keluarga");
  const akta_kelahiran = documents?.find((doc) => doc.name === "Akta Kelahiran");
  const ktp = documents?.find((doc) => doc.name === "KTP");
  const ijazah = documents?.find((doc) => doc.name === "Ijazah/SKL");
  const ijazah_S1 = documents?.find((doc) => doc.name === "Ijazah S1");
  const ijazah_S2 = documents?.find((doc) => doc.name === "Ijazah S2");
  const transkrip_nilai = documents?.find((doc) => doc.name === "Transkrip Nilai");
  const porlap_dikti = documents?.find((doc) => doc.name === "Porlap Dikti");

  const download = (e: MouseEvent<HTMLButtonElement>, url: string) => {
    e.preventDefault();
    window.open(url, "_blank");
  };

  const { mutate } = useBiodataUpdateById(id);

  useEffect(() => {
    if (akta_kelahiran?.isVerified) {
      setIsAkta("Ya");
    } else {
      setIsAkta("Tidak");
    }
  }, [akta_kelahiran]);

  useEffect(() => {
    if (isAkta === "Tidak") {
      setValue("akta_kelahiran", false);
    } else {
      setValue("akta_kelahiran", true);
    }
  }, [isAkta, setValue]);
  useEffect(() => {
    if (ktp?.isVerified) {
      setIsKtp("Ya");
    } else {
      setIsKtp("Tidak");
    }
  }, [ktp]);
  useEffect(() => {
    if (isKtp === "Tidak") {
      setValue("ktp", false);
    } else {
      setValue("ktp", true);
    }
  }, [isKtp, setValue]);
  useEffect(() => {
    if (kartu_keluarga?.isVerified) {
      setIsKartuKeluarga("Ya");
    } else {
      setIsKartuKeluarga("Tidak");
    }
  }, [kartu_keluarga]);
  useEffect(() => {
    if (isKartuKeluarga === "Tidak") {
      setValue("kartu_keluarga", false);
    } else {
      setValue("kartu_keluarga", true);
    }
  }, [isKartuKeluarga, setValue]);
  useEffect(() => {
    if (isIjazahSkl === "Tidak") {
      setValue("ijazah_skl", false);
    } else {
      setValue("ijazah_skl", true);
    }
  }, [isIjazahSkl, setValue]);
  useEffect(() => {
    if (ijazah?.isVerified) {
      setIsIjazahSkl("Ya");
    } else {
      setIsIjazahSkl("Tidak");
    }
  }, [ijazah]);
  useEffect(() => {
    if (isPorlap === "Tidak") {
      setValue("porlap_dikti", false);
    } else {
      setValue("porlap_dikti", true);
    }
  }, [isPorlap, setValue]);
  useEffect(() => {
    if (porlap_dikti?.isVerified) {
      setIsPorlap("Ya");
    } else {
      setIsPorlap("Tidak");
    }
  }, [porlap_dikti]);
  useEffect(() => {
    if (ijazah_S1?.isVerified) {
      setIsIjazahS1("Ya");
    } else {
      setIsIjazahS1("Tidak");
    }
  }, [ijazah_S1]);
  useEffect(() => {
    if (isIjazahS1 === "Tidak") {
      setValue("ijazah_S1", false);
    } else {
      setValue("ijazah_S1", true);
    }
  }, [isIjazahS1, setValue]);
  useEffect(() => {
    if (ijazah_S2?.isVerified) {
      setIsIjazahS2("Ya");
    } else {
      setIsIjazahS2("Tidak");
    }
  }, [ijazah_S2]);
  useEffect(() => {
    if (isIjazahS2 === "Tidak") {
      setValue("ijazah_S2", false);
    } else {
      setValue("ijazah_S2", true);
    }
  }, [isIjazahS2, setValue]);
  useEffect(() => {
    if (transkrip_nilai?.isVerified) {
      setIsTranskrip("Ya");
    } else {
      setIsTranskrip("Tidak");
    }
  }, [transkrip_nilai]);
  useEffect(() => {
    if (isTranskrip === "Tidak") {
      setValue("transkrip_nilai", false);
    } else {
      setValue("transkrip_nilai", true);
    }
  }, [isTranskrip, setValue]);
  const onSubmit = handleSubmit((data) => {
    try {
      if (degreeProgram === 1) {
        mutate(
          {
            documents: [
              { id: kartu_keluarga?.id, isVerified: data?.kartu_keluarga },
              { id: akta_kelahiran?.id, isVerified: data?.akta_kelahiran },
              { id: ktp?.id, isVerified: data?.ktp },
              { id: ijazah?.id, isVerified: data?.ijazah_skl },
            ],
          },
          {
            onSuccess: () => {
              setIsDisabled(true);

              setTimeout(() => {
                toast.success("Data Berhasil Diverifikasi", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }, 500);
            },
            onError: () => {
              setTimeout(() => {
                toast.error("Data Gagal Diverifikasi", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }, 500);
            },
          },
        );
      } else if (degreeProgram === 2) {
        mutate(
          {
            documents: [
              { id: kartu_keluarga?.id, isVerified: data?.kartu_keluarga },
              { id: ktp?.id, isVerified: data?.ktp },
              { id: ijazah_S1?.id, isVerified: data?.ijazah_S1 },
              { id: transkrip_nilai?.id, isVerified: data?.transkrip_nilai },
              { id: porlap_dikti?.id, isVerified: data?.porlap_dikti },
            ],
          },
          {
            onSuccess: () => {
              setIsDisabled(true);

              setTimeout(() => {
                toast.success("Data Berhasil Diverifikasi", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }, 500);
            },
            onError: () => {
              setTimeout(() => {
                toast.error("Data Gagal Diverifikasi", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }, 500);
            },
          },
        );
      } else if (degreeProgram === 3) {
        mutate(
          {
            documents: [
              { id: kartu_keluarga?.id, isVerified: data?.kartu_keluarga },
              { id: ktp?.id, isVerified: data?.ktp },
              { id: ijazah_S1?.id, isVerified: data?.ijazah_S1 },
              { id: ijazah_S2?.id, isVerified: data?.ijazah_S2 },
              { id: transkrip_nilai?.id, isVerified: data?.transkrip_nilai },
              { id: porlap_dikti?.id, isVerified: data?.porlap_dikti },
            ],
          },
          {
            onSuccess: () => {
              setIsDisabled(true);

              setTimeout(() => {
                toast.success("Data Berhasil Diverifikasi", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }, 500);
            },
            onError: () => {
              setTimeout(() => {
                toast.error("Data Gagal Diverifikasi", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }, 500);
            },
          },
        );
      }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Accordion
      title="Berkas Umum"
      key="berkas-umum-section"
      titleClassName="lg:text-lg text-md font-extrabold text-secondary-green-4"
      className="w-full h-auto mt-[2rem] flex flex-col gap-5 items-center lg:items-baseline lg:ml-[3vw] xl:ml-[1.5vw] pb-6 md:pb-0 overflow-y-hidden"
    >
      <form
        onSubmit={onSubmit}
        className="w-full md:w-[85%] flex flex-col gap-5 bg-primary-white py-4 px-4 md:px-8 text-sm md:text-lg"
      >
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Ijazah S1 */}
        {degreeProgram !== 1 && (
          <section className="w-full flex items-center justify-between">
            <div className=" flex flex-col gap-2 items-start">
              <h3 className="font-bold">Ijazah S1</h3>
              <div className="w-full flex flex-col md:flex-row gap-2">
                <Link
                  href={`${ijazah_S1?.path}`}
                  className="text-primary-green underline truncate w-[10em] md:w-[18em]"
                  target="_blank"
                >
                  {ijazah_S1?.path.split("/")[4].slice(10)}
                </Link>
                <Button
                  onClick={(e) => download(e, `${ijazah_S1?.path}`)}
                  size="sm"
                  height="h-8"
                  variant="filled"
                >
                  Download
                </Button>
              </div>
            </div>

            <div className="font-bold  flex flex-col gap-4 items-end md:items-start">
              <h3>Sudah Sesuai?</h3>
              <div className="flex flex-row gap-x-4">
                <RadioButton
                  name="ijazah_S1"
                  label="Ya"
                  // disabled={isDisabled || !!ijazah_S1}
                  size="sm"
                  value="Ya"
                  variant="primary"
                  labelSize="sm"
                  control={control}
                  defaultChecked={ijazah_S1?.isVerified}
                  onChange={(e) => setIsIjazahS1(e.target.value)}
                />
                <RadioButton
                  name="ijazah_S1"
                  label="Tidak"
                  // disabled={isDisabled || !!ijazah_S1}
                  size="sm"
                  value="Tidak"
                  variant="primary"
                  labelSize="sm"
                  control={control}
                  defaultChecked={ijazah_S1?.isVerified !== true}
                  onChange={(e) => setIsIjazahS1(e.target.value)}
                />
              </div>
            </div>
          </section>
        )}

        {/* Ijazah S2 */}
        {degreeProgram === 3 && (
          <section className="w-full flex items-center justify-between mt-8 md:mt-0">
            <div className=" flex flex-col gap-2 items-start">
              <h3 className="font-bold">Ijazah S2</h3>
              <div className="w-full flex flex-col md:flex-row gap-2">
                <Link
                  href={`${ijazah_S2?.path}`}
                  className="text-primary-green underline truncate w-[10em] md:w-[18em]"
                  target="_blank"
                >
                  {ijazah_S2?.path.split("/")[4].slice(10)}
                </Link>
                <Button
                  onClick={(e) => download(e, `${ijazah_S2?.path}`)}
                  size="sm"
                  height="h-8"
                  variant="filled"
                >
                  Download
                </Button>
              </div>
            </div>

            <div className="font-bold  flex flex-col gap-4 items-end md:items-start">
              <h3>Sudah Sesuai?</h3>
              <div className="flex flex-row gap-x-4">
                <RadioButton
                  name="ijazah_S2"
                  label="Ya"
                  size="sm"
                  // disabled={isDisabled || !!ijazah_S2}
                  value="Ya"
                  variant="primary"
                  labelSize="sm"
                  control={control}
                  defaultChecked={ijazah_S2?.isVerified}
                  onChange={(e) => setIsIjazahS2(e.target.value)}
                />
                <RadioButton
                  name="ijazah_S2"
                  label="Tidak"
                  size="sm"
                  // disabled={isDisabled || !!ijazah_S2}
                  value="Tidak"
                  variant="primary"
                  labelSize="sm"
                  control={control}
                  defaultChecked={ijazah_S2?.isVerified !== true}
                  onChange={(e) => setIsIjazahS2(e.target.value)}
                />
              </div>
            </div>
          </section>
        )}

        {/* Transkrip Nilai */}
        {degreeProgram !== 1 && (
          <section className="w-full flex items-center justify-between mt-8 md:mt-0">
            <div className=" flex flex-col gap-2 items-start">
              <h3 className="font-bold">Transkip Nilai</h3>
              <div className="w-full flex flex-col md:flex-row gap-2">
                <Link
                  href={`${transkrip_nilai?.path}`}
                  className="text-primary-green underline truncate w-[10em] md:w-[18em]"
                  target="_blank"
                >
                  {transkrip_nilai?.path.split("/")[4].slice(10)}
                </Link>
                <Button
                  onClick={(e) => download(e, `${transkrip_nilai?.path}`)}
                  size="sm"
                  height="h-8"
                  variant="filled"
                >
                  Download
                </Button>
              </div>
            </div>

            <div className="font-bold  flex flex-col gap-4 items-end md:items-start">
              <h3>Sudah Sesuai?</h3>
              <div className="flex flex-row gap-x-4">
                <RadioButton
                  name="transkrip_nilai"
                  label="Ya"
                  size="sm"
                  // disabled={isDisabled || !!transkrip_nilai}
                  value="Ya"
                  variant="primary"
                  labelSize="sm"
                  control={control}
                  defaultChecked={transkrip_nilai?.isVerified}
                  onChange={(e) => setIsTranskrip(e.target.value)}
                />
                <RadioButton
                  name="transkrip_nilai"
                  label="Tidak"
                  size="sm"
                  // disabled={isDisabled || !!transkrip_nilai}
                  value="Tidak"
                  variant="primary"
                  labelSize="sm"
                  control={control}
                  defaultChecked={transkrip_nilai?.isVerified !== true}
                  onChange={(e) => setIsTranskrip(e.target.value)}
                />
              </div>
            </div>
          </section>
        )}

        {/* Kartu Keluarga */}
        <section className="w-full flex items-center justify-between mt-8 md:mt-0">
          <div className=" flex flex-col gap-2 items-start">
            <h3 className="font-bold">Kartu Keluarga</h3>
            <div className="w-full flex flex-col md:flex-row gap-2">
              <Link
                href={`${kartu_keluarga?.path}`}
                className="text-primary-green underline truncate w-[10em] md:w-[18em]"
                target="_blank"
              >
                {kartu_keluarga?.path.split("/")[4].slice(10)}
              </Link>
              <Button
                onClick={(e) => download(e, `${kartu_keluarga?.path}`)}
                size="sm"
                height="h-8"
                variant="filled"
              >
                Download
              </Button>
            </div>
          </div>

          <div className="font-bold  flex flex-col gap-4 items-end md:items-start">
            <h3>Sudah Sesuai?</h3>
            <div className="flex flex-row gap-x-4">
              <RadioButton
                name="kartu_keluarga"
                label="Ya"
                disabled={isDisabled || !!kartu_keluarga}
                size="sm"
                value="Ya"
                variant="primary"
                labelSize="sm"
                control={control}
                defaultChecked={kartu_keluarga?.isVerified}
                onChange={(e) => setIsKartuKeluarga(e.target.value)}
              />
              <RadioButton
                name="kartu_keluarga"
                label="Tidak"
                disabled={isDisabled || !!kartu_keluarga}
                size="sm"
                value="Tidak"
                variant="primary"
                labelSize="sm"
                control={control}
                defaultChecked={kartu_keluarga?.isVerified !== true}
                onChange={(e) => setIsKartuKeluarga(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Porlap Dikti */}
        {degreeProgram !== 1 && (
          <section className="w-full flex items-center justify-between mt-8 md:mt-0">
            <div className=" flex flex-col gap-2 items-start">
              <h3 className="font-bold">Porlap Dikti</h3>
              <div className="w-full flex flex-col md:flex-row gap-2">
                <Link
                  href={`${porlap_dikti?.path}`}
                  className="text-primary-green underline truncate w-[10em] md:w-[18em]"
                  target="_blank"
                >
                  {porlap_dikti?.path.split("/")[4].slice(10)}
                </Link>
                <Button
                  onClick={(e) => download(e, `${porlap_dikti?.path}`)}
                  size="sm"
                  height="h-8"
                  variant="filled"
                >
                  Download
                </Button>
              </div>
            </div>

            <div className="font-bold  flex flex-col gap-4 items-end md:items-start">
              <h3>Sudah Sesuai?</h3>
              <div className="flex flex-row gap-x-4">
                <RadioButton
                  name="porlap_dikti"
                  label="Ya"
                  disabled={isDisabled || !!porlap_dikti}
                  size="sm"
                  value="Ya"
                  variant="primary"
                  labelSize="sm"
                  control={control}
                  defaultChecked={porlap_dikti?.isVerified}
                  onChange={(e) => setIsPorlap(e.target.value)}
                />
                <RadioButton
                  name="porlap_dikti"
                  label="Tidak"
                  disabled={isDisabled || !!porlap_dikti}
                  size="sm"
                  value="Tidak"
                  variant="primary"
                  labelSize="sm"
                  control={control}
                  defaultChecked={porlap_dikti?.isVerified !== true}
                  onChange={(e) => setIsPorlap(e.target.value)}
                />
              </div>
            </div>
          </section>
        )}

        {/* Akta Kelahiran */}
        {degreeProgram === 1 && (
          <section className="w-full flex items-center justify-between mt-8 md:mt-0">
            <div className=" flex flex-col gap-2 items-start">
              <h3 className="font-bold">Akta Kelahiran</h3>
              <div className="w-full flex flex-col md:flex-row gap-2">
                <Link
                  href={`${akta_kelahiran?.path}`}
                  className="text-primary-green underline truncate w-[10em] md:w-[18em]"
                  target="_blank"
                >
                  {akta_kelahiran?.path.split("/")[4].slice(10)}
                </Link>
                <Button
                  onClick={(e) => download(e, `${akta_kelahiran?.path}`)}
                  size="sm"
                  height="h-8"
                  variant="filled"
                >
                  Download
                </Button>
              </div>
            </div>

            <div className="font-bold  flex flex-col gap-4 items-end md:items-start">
              <h3>Sudah Sesuai?</h3>
              <div className="flex flex-row gap-x-4">
                <RadioButton
                  name="akta_kelahiran"
                  label="Ya"
                  size="sm"
                  disabled={isDisabled || !!akta_kelahiran}
                  value="Ya"
                  variant="primary"
                  labelSize="sm"
                  control={control}
                  defaultChecked={akta_kelahiran?.isVerified}
                  onChange={(e) => setIsAkta(e.target.value)}
                />
                <RadioButton
                  name="akta_kelahiran"
                  label="Tidak"
                  size="sm"
                  disabled={isDisabled || !!akta_kelahiran}
                  value="Tidak"
                  variant="primary"
                  labelSize="sm"
                  control={control}
                  defaultChecked={akta_kelahiran?.isVerified !== true}
                  onChange={(e) => setIsAkta(e.target.value)}
                />
              </div>
            </div>
          </section>
        )}

        {/* KTP */}
        <section className="w-full flex items-center justify-between mt-8 md:mt-0">
          <div className=" flex flex-col gap-2 items-start">
            <h3 className="font-bold">KTP</h3>
            <div className="w-full flex flex-col md:flex-row gap-2">
              <Link
                href={`${ktp?.path}`}
                className="text-primary-green underline truncate w-[10em] md:w-[18em]"
                target="_blank"
              >
                {ktp?.path.split("/")[4].slice(10)}
              </Link>
              <Button
                onClick={(e) => download(e, `${ktp?.path}`)}
                size="sm"
                height="h-8"
                variant="filled"
              >
                Download
              </Button>
            </div>
          </div>

          <div className="font-bold  flex flex-col gap-4 items-end md:items-start">
            <h3>Sudah Sesuai?</h3>
            <div className="flex flex-row gap-x-4">
              <RadioButton
                name="ktp"
                label="Ya"
                size="sm"
                disabled={isDisabled || !!ktp}
                value="Ya"
                variant="primary"
                labelSize="sm"
                control={control}
                defaultChecked={ktp?.isVerified}
                onChange={(e) => setIsKtp(e.target.value)}
              />
              <RadioButton
                name="ktp"
                label="Tidak"
                size="sm"
                disabled={isDisabled || !!ktp}
                value="Tidak"
                variant="primary"
                labelSize="sm"
                control={control}
                defaultChecked={ktp?.isVerified !== true}
                onChange={(e) => setIsKtp(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Ijazah/SKL */}
        {degreeProgram === 1 && (
          <section className="w-full flex items-center justify-between mt-8 md:mt-0">
            <div className=" flex flex-col gap-2 items-start">
              <h3 className="font-bold">Ijazah/SKL</h3>
              <div className="w-full flex flex-col md:flex-row gap-2">
                <Link
                  href={`${ijazah?.path}`}
                  className="text-primary-green underline truncate w-[10em] md:w-[18em]"
                  target="_blank"
                >
                  {ijazah?.path.split("/")[4].slice(10)}
                </Link>
                <Button
                  onClick={(e) => download(e, `${ijazah?.path}`)}
                  size="sm"
                  height="h-8"
                  variant="filled"
                >
                  Download
                </Button>
              </div>
            </div>

            <div className="font-bold  flex flex-col gap-4 items-end md:items-start">
              <h3>Sudah Sesuai?</h3>
              <div className="flex flex-row gap-x-4">
                <RadioButton
                  name="ijazah_skl"
                  disabled={isDisabled || !!ijazah}
                  label="Ya"
                  size="sm"
                  value="Ya"
                  variant="primary"
                  labelSize="sm"
                  control={control}
                  defaultChecked={ijazah?.isVerified}
                  onChange={(e) => setIsIjazahSkl(e.target.value)}
                />
                <RadioButton
                  name="ijazah_skl"
                  disabled={isDisabled || !!ijazah}
                  label="Tidak"
                  size="sm"
                  value="Tidak"
                  variant="primary"
                  labelSize="sm"
                  control={control}
                  defaultChecked={ijazah?.isVerified !== true}
                  onChange={(e) => setIsIjazahSkl(e.target.value)}
                />
              </div>
            </div>
          </section>
        )}

        <div className="flex w-full justify-center lg:justify-end py-4 mt-12 md:mt-8 relative md:left-16">
          <Button
            type="submit"
            variant="filled"
            size="md"
            height="h-6"
            disabled={isDisabled || !!kartu_keluarga || !!ijazah_S1 || !!ijazah_S2}
          >
            Submit
          </Button>
        </div>
      </form>
    </Accordion>
  );
};
