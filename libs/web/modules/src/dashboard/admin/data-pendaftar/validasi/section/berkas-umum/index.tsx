import { Accordion, Button, CheckBox } from "@uninus/web/components";
import { useStudentDataByIdValidation } from "@uninus/web/services";
import { FC, MouseEvent, ReactElement, useMemo } from "react";
import { useForm } from "react-hook-form";

export const BerkasUmum: FC = (): ReactElement => {
  const { getStudentbyId } = useStudentDataByIdValidation();

  const documents = useMemo(() => {
    return getStudentbyId?.documents;
  }, [getStudentbyId]);

  const degreeProgram = useMemo(() => {
    return getStudentbyId?.degree_program_id;
  }, [getStudentbyId]);

  const { control } = useForm({
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

  return (
    <Accordion
      title="Berkas Umum"
      key="berkas-umum-section"
      titleClassName="lg:text-lg text-md font-extrabold text-secondary-green-4"
      className="w-full h-auto mt-[2rem] flex flex-col gap-5 items-center lg:items-baseline lg:ml-[3vw] xl:ml-[1.5vw] pb-6 md:pb-0 overflow-y-hidden"
    >
      <form className="w-[85%] flex flex-col gap-5 bg-primary-white py-4 px-8">
        {/* Ijazah S1 */}
        {degreeProgram !== 1 && (
          <section className="w-full flex items-center justify-between">
            <div className="h-[5em] flex flex-col gap-2">
              <h3 className="font-bold">Ijazah S1</h3>
              <div className="w-full  flex gap-2">
                <h3 className="text-primary-green underline truncate w-[18em]">
                  {ijazah_S1?.path.split("/")[4].slice(10)}
                </h3>
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

            <div className="font-bold h-[5em] flex flex-col gap-4">
              <h3>Sudah Sesuai?</h3>
              <CheckBox name="ijasah-S1" control={control} />
            </div>
          </section>
        )}

        {/* Ijazah S2 */}
        {degreeProgram === 3 && (
          <section className="w-full flex items-center justify-between">
            <div className="h-[5em] flex flex-col gap-2">
              <h3 className="font-bold">Ijazah S2</h3>
              <div className="w-full  flex gap-2">
                <h3 className="text-primary-green underline truncate w-[18em]">
                  {ijazah_S2?.path.split("/")[4].slice(10)}
                </h3>
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

            <div className="font-bold h-[5em] flex flex-col gap-4">
              <h3>Sudah Sesuai?</h3>
              <CheckBox name="ijasah-S2" control={control} />
            </div>
          </section>
        )}

        {/* Transkrip Nilai */}
        {degreeProgram !== 1 && (
          <section className="w-full flex items-center justify-between">
            <div className="h-[5em] flex flex-col gap-2">
              <h3 className="font-bold">Transkip Nilai</h3>
              <div className="w-full  flex gap-2">
                <h3 className="text-primary-green underline truncate w-[18em]">
                  {transkrip_nilai?.path.split("/")[4].slice(10)}
                </h3>
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

            <div className="font-bold h-[5em] flex flex-col gap-4">
              <h3>Sudah Sesuai?</h3>
              <CheckBox name="transkip-nilai" control={control} />
            </div>
          </section>
        )}

        {/* Kartu Keluarga */}
        <section className="w-full flex items-center justify-between">
          <div className="h-[5em] flex flex-col gap-2">
            <h3 className="font-bold">Kartu Keluarga</h3>
            <div className="w-full  flex gap-2">
              <h3 className="text-primary-green underline truncate w-[18em]">
                {kartu_keluarga?.path.split("/")[4].slice(10)}
              </h3>
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

          <div className="font-bold h-[5em] flex flex-col gap-4">
            <h3>Sudah Sesuai?</h3>
            <CheckBox name="kartu-keluarga" control={control} />
          </div>
        </section>

        {/* Porlap Dikti */}
        {degreeProgram !== 1 && (
          <section className="w-full flex items-center justify-between">
            <div className="h-[5em] flex flex-col gap-2">
              <h3 className="font-bold">Porlap Dikti</h3>
              <div className="w-full  flex gap-2">
                <h3 className="text-primary-green underline truncate w-[18em]">
                  {porlap_dikti?.path.split("/")[4].slice(10)}
                </h3>
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

            <div className="font-bold h-[5em] flex flex-col gap-4">
              <h3>Sudah Sesuai?</h3>
              <CheckBox name="porlap-dikti" control={control} />
            </div>
          </section>
        )}

        {/* Akta Kelahiran */}
        {degreeProgram === 1 && (
          <section className="w-full flex items-center justify-between">
            <div className="h-[5em] flex flex-col gap-2">
              <h3 className="font-bold">Akta Kelahiran</h3>
              <div className="w-full  flex gap-2">
                <h3 className="text-primary-green underline truncate w-[18em]">
                  {akta_kelahiran?.path.split("/")[4].slice(10)}
                </h3>
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

            <div className="font-bold h-[5em] flex flex-col gap-4">
              <h3>Sudah Sesuai?</h3>
              <CheckBox name="akta-kelahiran" control={control} />
            </div>
          </section>
        )}

        {/* KTP */}
        <section className="w-full flex items-center justify-between">
          <div className="h-[5em] flex flex-col gap-2">
            <h3 className="font-bold">KTP</h3>
            <div className="w-full  flex gap-2">
              <h3 className="text-primary-green underline truncate w-[18em]">
                {ktp?.path.split("/")[4].slice(10)}
              </h3>
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

          <div className="font-bold h-[5em] flex flex-col gap-4">
            <h3>Sudah Sesuai?</h3>
            <CheckBox name="ktp" control={control} />
          </div>
        </section>

        {/* Ijazah/SKL */}
        {degreeProgram === 1 && (
          <section className="w-full flex items-center justify-between">
            <div className="h-[5em] flex flex-col gap-2">
              <h3 className="font-bold">Ijazah/SKL</h3>
              <div className="w-full  flex gap-2">
                <h3 className="text-primary-green underline truncate w-[18em]">
                  {ijazah?.path.split("/")[4].slice(10)}
                </h3>
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

            <div className="font-bold h-[5em] flex flex-col gap-4">
              <h3>Sudah Sesuai?</h3>
              <CheckBox name="ijasah-skl" control={control} />
            </div>
          </section>
        )}

        <div className="flex w-full justify-center lg:justify-end py-4 mt-8 relative left-16">
          <Button type="submit" variant="filled" size="md" width="w-[10%]" height="h-6">
            Submit
          </Button>
        </div>
      </form>
    </Accordion>
  );
};
