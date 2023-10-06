import { Accordion, Button, CheckBox } from "@uninus/web/components";
import { useStudentDataByIdValidation } from "@uninus/web/services";
import { FC, Fragment, MouseEvent, ReactElement, useMemo } from "react";
import { useForm } from "react-hook-form";

export const BerkasKhusus: FC = (): ReactElement => {
  const { getStudentbyId } = useStudentDataByIdValidation();

  const documents = useMemo(() => {
    return getStudentbyId?.documents;
  }, [getStudentbyId]);

  const scholarship = useMemo(() => {
    return getStudentbyId?.scholarship_id;
  }, [getStudentbyId]);

  const { control } = useForm({
    mode: "all",
  });

  const sertfikat_akif = documents?.find((doc) => doc.name === "Sertifikat Aktif Organisasi");
  const sertifikat_lainnya = documents?.find((doc) => doc.name === "Sertifikat Lainnya");
  const sertifikat_kejuaraan = documents?.find((doc) => doc.name === "Sertifkat Kejuaraan");
  const tahfizh = documents?.find((doc) => doc.name === "Tahfizh");
  const surat_dokter = documents?.find((doc) => doc.name === "Surat Dokter");
  const surat_anggota_nu = documents?.find((doc) => doc.name === "Surat Anggota NU");
  const surat_tugas = documents?.find((doc) => doc.name === "Surat Tugas");

  const download = (e: MouseEvent<HTMLButtonElement>, url: string) => {
    e.preventDefault();
    window.open(url, "_blank");
  };

  return (
    <Accordion
      title="Berkas Khusus (Beasiswa)"
      key="berkas-khusus-section"
      titleClassName="lg:text-lg text-md font-extrabold text-secondary-green-4"
      className="w-full h-auto mt-[2rem] flex flex-col gap-5 items-center lg:items-baseline lg:ml-[3vw] xl:ml-[1.5vw] pb-6 md:pb-0 overflow-y-hidden"
    >
      <form className="w-[85%] flex flex-col gap-5 bg-primary-white py-4 px-8">
        {/* Ijazah S1 */}
        {scholarship === 1 && (
          <Fragment>
            <section className="w-full flex items-center justify-between">
              <div className="h-[5em] flex flex-col gap-2">
                <h3 className="font-bold">Sertifikat Aktif Organisasi</h3>
                <div className="w-full  flex gap-2">
                  <h3 className="text-primary-green underline truncate w-[18em]">
                    {sertfikat_akif?.path.split("/")[4].slice(10)}
                  </h3>
                  <Button
                    onClick={(e) => download(e, `${sertfikat_akif?.path}`)}
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
                <CheckBox name="sertifikat-aktif" control={control} />
              </div>
            </section>

            <section className="w-full flex items-center justify-between">
              <div className="h-[5em] flex flex-col gap-2">
                <h3 className="font-bold">Sertifikat Lainnya</h3>
                <div className="w-full  flex gap-2">
                  <h3 className="text-primary-green underline truncate w-[18em]">
                    {sertifikat_lainnya?.path.split("/")[4].slice(10)}
                  </h3>
                  <Button
                    onClick={(e) => download(e, `${sertifikat_lainnya?.path}`)}
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
                <CheckBox name="sertifikat-lainnya" control={control} />
              </div>
            </section>
          </Fragment>
        )}

        {/* Transkrip Nilai */}
        {scholarship === 2 && (
          <Fragment>
            <section className="w-full flex items-center justify-between">
              <div className="h-[5em] flex flex-col gap-2">
                <h3 className="font-bold">Sertifikat Kejuaraan</h3>
                <div className="w-full  flex gap-2">
                  <h3 className="text-primary-green underline truncate w-[18em]">
                    {sertifikat_kejuaraan?.path.split("/")[4].slice(10)}
                  </h3>
                  <Button
                    onClick={(e) => download(e, `${sertifikat_kejuaraan?.path}`)}
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
                <CheckBox name="sertifikat-kejuaraan" control={control} />
              </div>
            </section>

            <section className="w-full flex items-center justify-between">
              <div className="h-[5em] flex flex-col gap-2">
                <h3 className="font-bold">Sertifikat Tahfizh Qur'an</h3>
                <div className="w-full  flex gap-2">
                  <h3 className="text-primary-green underline truncate w-[18em]">
                    {tahfizh?.path.split("/")[4].slice(10)}
                  </h3>
                  <Button
                    onClick={(e) => download(e, `${tahfizh?.path}`)}
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
                <CheckBox name="tahfizh" control={control} />
              </div>
            </section>
          </Fragment>
        )}

        {scholarship === 3 && (
          <section className="w-full flex items-center justify-between">
            <div className="h-[5em] flex flex-col gap-2">
              <h3 className="font-bold">Surat Keterangan Dokter</h3>
              <div className="w-full  flex gap-2">
                <h3 className="text-primary-green underline truncate w-[18em]">
                  {surat_dokter?.path.split("/")[4].slice(10)}
                </h3>
                <Button
                  onClick={(e) => download(e, `${surat_dokter?.path}`)}
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
              <CheckBox name="surat-dokter" control={control} />
            </div>
          </section>
        )}

        {scholarship === 4 && (
          <Fragment>
            <section className="w-full flex items-center justify-between">
              <div className="h-[5em] flex flex-col gap-2">
                <h3 className="font-bold">Bukti Anggota NU</h3>
                <div className="w-full  flex gap-2">
                  <h3 className="text-primary-green underline truncate w-[18em]">
                    {surat_anggota_nu?.path.split("/")[4].slice(10)}
                  </h3>
                  <Button
                    onClick={(e) => download(e, `${surat_anggota_nu?.path}`)}
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
                <CheckBox name="surat-angota-nu" control={control} />
              </div>
            </section>

            <section className="w-full flex items-center justify-between">
              <div className="h-[5em] flex flex-col gap-2">
                <h3 className="font-bold">Surat Tugas Dari Sekolah</h3>
                <div className="w-full  flex gap-2">
                  <h3 className="text-primary-green underline truncate w-[18em]">
                    {surat_tugas?.path.split("/")[4].slice(10)}
                  </h3>
                  <Button
                    onClick={(e) => download(e, `${surat_tugas?.path}`)}
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
                <CheckBox name="surat-tugas" control={control} />
              </div>
            </section>
          </Fragment>
        )}

        <div className="flex w-full justify-center lg:justify-end py-4 mt-8 relative left-20">
          <Button type="submit" variant="filled" size="md" width="w-[10%]" height="h-6">
            Submit
          </Button>
        </div>
      </form>
    </Accordion>
  );
};
