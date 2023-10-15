import { Accordion, Button, CheckBox } from "@uninus/web/components";
import { useStudentDataByIdValidation } from "@uninus/web/services";
import { usePathname } from "next/navigation";
import { ChangeEvent, FC, MouseEvent, ReactElement, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useBiodataUpdateById } from "../../../edit-data-pendaftar/hooks";
import Link from "next/link";

export type TIsVerifiedDocs = {
  id: string | undefined;
  isVerified: boolean;
};

export const BerkasUmum: FC = (): ReactElement => {
  const { getStudentbyId } = useStudentDataByIdValidation();

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

  const onChangeCheked = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.name, e.target.checked);
  };

  const { mutate } = useBiodataUpdateById(id);

  const onSubmit = handleSubmit((data) => {
    try {
      if (degreeProgram === 1) {
        mutate({
          documents: [
            { id: kartu_keluarga?.id, isVerified: data?.kartu_keluarga },
            { id: akta_kelahiran?.id, isVerified: data?.akta_kelahiran },
            { id: ktp?.id, isVerified: data?.ktp },
            { id: ijazah?.id, isVerified: data?.ijazah_skl },
          ],
        });
      } else if (degreeProgram === 2) {
        mutate({
          documents: [
            { id: kartu_keluarga?.id, isVerified: data?.kartu_keluarga },
            { id: ktp?.id, isVerified: data?.ktp },
            { id: ijazah_S1?.id, isVerified: data?.ijazah_S1 },
            { id: transkrip_nilai?.id, isVerified: data?.transkrip_nilai },
            { id: porlap_dikti?.id, isVerified: data?.porlap_dikti },
          ],
        });
      } else if (degreeProgram === 3) {
        mutate({
          documents: [
            { id: kartu_keluarga?.id, isVerified: data?.kartu_keluarga },
            { id: ktp?.id, isVerified: data?.ktp },
            { id: ijazah_S1?.id, isVerified: data?.ijazah_S1 },
            { id: ijazah_S2?.id, isVerified: data?.ijazah_S2 },
            { id: transkrip_nilai?.id, isVerified: data?.transkrip_nilai },
            { id: porlap_dikti?.id, isVerified: data?.porlap_dikti },
          ],
        });
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
        {/* Ijazah S1 */}
        {degreeProgram !== 1 && (
          <section className="w-full flex items-center justify-between">
            <div className="h-[5em] flex flex-col gap-2 items-start">
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

            <div className="font-bold h-[5em] flex flex-col gap-4 items-end md:items-start">
              <h3>Sudah Sesuai?</h3>
              <CheckBox
                name="ijazah_S1"
                control={control}
                onChange={onChangeCheked}
                defaultChecked={ijazah_S1?.isVerified}
              />
            </div>
          </section>
        )}

        {/* Ijazah S2 */}
        {degreeProgram === 3 && (
          <section className="w-full flex items-center justify-between mt-8 md:mt-0">
            <div className="h-[5em] flex flex-col gap-2 items-start">
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

            <div className="font-bold h-[5em] flex flex-col gap-4 items-end md:items-start">
              <h3>Sudah Sesuai?</h3>
              <CheckBox
                name="ijazah_S2"
                control={control}
                onChange={onChangeCheked}
                defaultChecked={ijazah_S2?.isVerified}
              />
            </div>
          </section>
        )}

        {/* Transkrip Nilai */}
        {degreeProgram !== 1 && (
          <section className="w-full flex items-center justify-between mt-8 md:mt-0">
            <div className="h-[5em] flex flex-col gap-2 items-start">
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

            <div className="font-bold h-[5em] flex flex-col gap-4 items-end md:items-start">
              <h3>Sudah Sesuai?</h3>
              <CheckBox
                name="transkrip_nilai"
                control={control}
                onChange={onChangeCheked}
                defaultChecked={transkrip_nilai?.isVerified}
              />
            </div>
          </section>
        )}

        {/* Kartu Keluarga */}
        <section className="w-full flex items-center justify-between mt-8 md:mt-0">
          <div className="h-[5em] flex flex-col gap-2 items-start">
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

          <div className="font-bold h-[5em] flex flex-col gap-4 items-end md:items-start">
            <h3>Sudah Sesuai?</h3>
            <CheckBox
              name="kartu_keluarga"
              control={control}
              onChange={onChangeCheked}
              defaultChecked={kartu_keluarga?.isVerified}
            />
          </div>
        </section>

        {/* Porlap Dikti */}
        {degreeProgram !== 1 && (
          <section className="w-full flex items-center justify-between mt-8 md:mt-0">
            <div className="h-[5em] flex flex-col gap-2 items-start">
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

            <div className="font-bold h-[5em] flex flex-col gap-4 items-end md:items-start">
              <h3>Sudah Sesuai?</h3>
              <CheckBox
                name="porlap_dikti"
                control={control}
                onChange={onChangeCheked}
                defaultChecked={porlap_dikti?.isVerified}
              />
            </div>
          </section>
        )}

        {/* Akta Kelahiran */}
        {degreeProgram === 1 && (
          <section className="w-full flex items-center justify-between mt-8 md:mt-0">
            <div className="h-[5em] flex flex-col gap-2 items-start">
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

            <div className="font-bold h-[5em] flex flex-col gap-4 items-end md:items-start">
              <h3>Sudah Sesuai?</h3>
              <CheckBox
                name="akta_kelahiran"
                control={control}
                onChange={onChangeCheked}
                defaultChecked={akta_kelahiran?.isVerified}
              />
            </div>
          </section>
        )}

        {/* KTP */}
        <section className="w-full flex items-center justify-between mt-8 md:mt-0">
          <div className="h-[5em] flex flex-col gap-2 items-start">
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

          <div className="font-bold h-[5em] flex flex-col gap-4 items-end md:items-start">
            <h3>Sudah Sesuai?</h3>
            <CheckBox
              name="ktp"
              control={control}
              onChange={onChangeCheked}
              defaultChecked={ktp?.isVerified}
            />
          </div>
        </section>

        {/* Ijazah/SKL */}
        {degreeProgram === 1 && (
          <section className="w-full flex items-center justify-between mt-8 md:mt-0">
            <div className="h-[5em] flex flex-col gap-2 items-start">
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

            <div className="font-bold h-[5em] flex flex-col gap-4 items-end md:items-start">
              <h3>Sudah Sesuai?</h3>
              <CheckBox
                name="ijazah_skl"
                control={control}
                onChange={onChangeCheked}
                defaultChecked={ijazah?.isVerified}
              />
            </div>
          </section>
        )}

        <div className="flex w-full justify-center lg:justify-end py-4 mt-12 md:mt-8 relative md:left-16">
          <Button type="submit" variant="filled" size="md" height="h-6">
            Submit
          </Button>
        </div>
      </form>
    </Accordion>
  );
};
