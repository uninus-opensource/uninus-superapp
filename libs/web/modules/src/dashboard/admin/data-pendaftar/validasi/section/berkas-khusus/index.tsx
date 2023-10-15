import { Accordion, Button, CheckBox } from "@uninus/web/components";
import { useStudentDataByIdValidation } from "@uninus/web/services";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChangeEvent, FC, Fragment, MouseEvent, ReactElement, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useBiodataUpdateById } from "../../../edit-data-pendaftar/hooks";

export const BerkasKhusus: FC = (): ReactElement => {
  const { getStudentbyId } = useStudentDataByIdValidation();

  const path = usePathname();
  const id = path.split("/")[4];

  const documents = useMemo(() => {
    return getStudentbyId?.documents;
  }, [getStudentbyId]);

  const scholarship = useMemo(() => {
    return getStudentbyId?.scholarship_id;
  }, [getStudentbyId]);

  const { control, handleSubmit, setValue } = useForm({
    mode: "all",
  });

  const sertifikat_aktif = documents?.find((doc) => doc.name === "Sertifikat Aktif Organisasi");
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
  const onChangeCheked = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.name, e.target.checked);
  };

  const { mutate } = useBiodataUpdateById(id);

  const onSubmit = handleSubmit((data) => {
    try {
      if (scholarship === 1) {
        mutate({
          documents: [
            { id: sertifikat_aktif?.id, isVerified: data?.sertifikat_aktif },
            { id: sertifikat_lainnya?.id, isVerified: data?.sertifikat_lainnya },
          ],
        });
      } else if (scholarship === 2) {
        mutate({
          documents: [
            { id: sertifikat_kejuaraan?.id, isVerified: data?.sertifikat_kejuaraan },
            { id: tahfizh?.id, isVerified: data?.tahfizh },
          ],
        });
      } else if (scholarship === 3) {
        mutate({
          documents: [{ id: surat_dokter?.id, isVerified: data?.surat_dokter }],
        });
      } else if (scholarship === 4) {
        mutate({
          documents: [
            { id: surat_anggota_nu?.id, isVerified: data?.surat_anggota_nu },
            { id: surat_tugas?.id, isVerified: data?.surat_tugas },
          ],
        });
      }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Accordion
      title="Berkas Khusus (Beasiswa)"
      key="berkas-khusus-section"
      titleClassName="lg:text-lg text-md font-extrabold text-secondary-green-4"
      className="w-full h-auto mt-[2rem] flex flex-col gap-5 items-center lg:items-baseline lg:ml-[3vw] xl:ml-[1.5vw] pb-6 md:pb-0 overflow-y-hidden"
    >
      <form
        onSubmit={onSubmit}
        className="w-full md:w-[85%] flex flex-col gap-5 bg-primary-white py-4 px-4 md:px-8 text-sm md:text-lg"
      >
        {/* 1 */}
        {scholarship === 1 && (
          <Fragment>
            <section className="w-full flex items-center justify-between mt-8 md:mt-0 text-xs md:text-lg">
              <div className="h-[5em] flex flex-col gap-2 items-start">
                <h3 className="font-bold text-left">Sertifikat Aktif Organisasi</h3>
                <div className="w-full flex flex-col md:flex-row gap-2">
                  <Link
                    href={`${sertifikat_aktif?.path}`}
                    className="text-primary-green underline truncate w-[10em] md:w-[18em]"
                    target="_blank"
                  >
                    {sertifikat_aktif?.path.split("/")[4].slice(10)}
                  </Link>
                  <Button
                    onClick={(e) => download(e, `${sertifikat_aktif?.path}`)}
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
                  name="sertifikat_aktif"
                  control={control}
                  onChange={onChangeCheked}
                  defaultChecked={sertifikat_aktif?.isVerified}
                />
              </div>
            </section>

            <section className="w-full flex items-center justify-between mt-8 md:mt-0">
              <div className="h-[5em] flex flex-col gap-2 items-start">
                <h3 className="font-bold">Sertifikat Lainnya</h3>
                <div className="w-full flex flex-col md:flex-row gap-2">
                  <Link
                    href={`${sertifikat_lainnya?.path}`}
                    className="text-primary-green underline truncate w-[10em] md:w-[18em]"
                    target="_blank"
                  >
                    {sertifikat_lainnya?.path.split("/")[4].slice(10)}
                  </Link>
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

              <div className="font-bold h-[5em] flex flex-col gap-4 items-end md:items-start">
                <h3>Sudah Sesuai?</h3>
                <CheckBox
                  name="sertifikat_lainnya"
                  control={control}
                  onChange={onChangeCheked}
                  defaultChecked={sertifikat_lainnya?.isVerified}
                />
              </div>
            </section>
          </Fragment>
        )}

        {/* 2 */}
        {scholarship === 2 && (
          <Fragment>
            <section className="w-full flex items-center justify-between mt-8 md:mt-0">
              <div className="h-[5em] flex flex-col gap-2 items-start">
                <h3 className="font-bold">Sertifikat Kejuaraan</h3>
                <div className="w-full flex flex-col md:flex-row gap-2">
                  <Link
                    href={`${sertifikat_kejuaraan?.path}`}
                    className="text-primary-green underline truncate w-[10em] md:w-[18em]"
                    target="_blank"
                  >
                    {sertifikat_kejuaraan?.path.split("/")[4].slice(10)}
                  </Link>
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

              <div className="font-bold h-[5em] flex flex-col gap-4 items-end md:items-start">
                <h3>Sudah Sesuai?</h3>
                <CheckBox
                  name="sertifikat_kejuaraan"
                  control={control}
                  onChange={onChangeCheked}
                  defaultChecked={sertifikat_kejuaraan?.isVerified}
                />
              </div>
            </section>

            <section className="w-full flex items-center justify-between mt-8 md:mt-0">
              <div className="h-[5em] flex flex-col gap-2 items-start">
                <h3 className="font-bold">Sertifikat Tahfizh Qur'an</h3>
                <div className="w-full flex flex-col md:flex-row gap-2">
                  <Link
                    href={`${tahfizh?.path}`}
                    className="text-primary-green underline truncate w-[10em] md:w-[18em]"
                    target="_blank"
                  >
                    {tahfizh?.path.split("/")[4].slice(10)}
                  </Link>
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

              <div className="font-bold h-[5em] flex flex-col gap-4 items-end md:items-start">
                <h3>Sudah Sesuai?</h3>
                <CheckBox
                  name="tahfizh"
                  control={control}
                  onChange={onChangeCheked}
                  defaultChecked={tahfizh?.isVerified}
                />
              </div>
            </section>
          </Fragment>
        )}

        {/* 3 */}
        {scholarship === 3 && (
          <section className="w-full flex items-center justify-between mt-8 md:mt-0">
            <div className="h-[5em] flex flex-col gap-2 items-start">
              <h3 className="font-bold">Surat Keterangan Dokter</h3>
              <div className="w-full flex flex-col md:flex-row gap-2">
                <Link
                  href={`${surat_dokter?.path}`}
                  className="text-primary-green underline truncate w-[10em] md:w-[18em]"
                  target="_blank"
                >
                  {surat_dokter?.path.split("/")[4].slice(10)}
                </Link>
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

            <div className="font-bold h-[5em] flex flex-col gap-4 items-end md:items-start">
              <h3>Sudah Sesuai?</h3>
              <CheckBox
                name="surat_dokter"
                control={control}
                onChange={onChangeCheked}
                defaultChecked={surat_dokter?.isVerified}
              />
            </div>
          </section>
        )}

        {/* 4 */}
        {scholarship === 4 && (
          <Fragment>
            <section className="w-full flex items-center justify-between mt-8 md:mt-0">
              <div className="h-[5em] flex flex-col gap-2 items-start">
                <h3 className="font-bold">Bukti Anggota NU</h3>
                <div className="w-full flex flex-col md:flex-row gap-2">
                  <Link
                    href={`${surat_anggota_nu?.path}`}
                    className="text-primary-green underline truncate w-[10em] md:w-[18em]"
                    target="_blank"
                  >
                    {surat_anggota_nu?.path.split("/")[4].slice(10)}
                  </Link>
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

              <div className="font-bold h-[5em] flex flex-col gap-4 items-end md:items-start">
                <h3>Sudah Sesuai?</h3>
                <CheckBox
                  name="surat_angota_nu"
                  control={control}
                  onChange={onChangeCheked}
                  defaultChecked={surat_anggota_nu?.isVerified}
                />
              </div>
            </section>

            <section className="w-full flex items-center justify-between mt-8 md:mt-0">
              <div className="h-[5em] flex flex-col gap-2 items-start">
                <h3 className="font-bold">Surat Tugas Dari Sekolah</h3>
                <div className="w-full flex flex-col md:flex-row gap-2">
                  <Link
                    href={`${surat_tugas?.path}`}
                    className="text-primary-green underline truncate w-[10em] md:w-[18em]"
                    target="_blank"
                  >
                    {surat_tugas?.path.split("/")[4].slice(10)}
                  </Link>
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

              <div className="font-bold h-[5em] flex flex-col gap-4 items-end md:items-start">
                <h3>Sudah Sesuai?</h3>
                <CheckBox
                  name="surat_tugas"
                  control={control}
                  onChange={onChangeCheked}
                  defaultChecked={surat_tugas?.isVerified}
                />
              </div>
            </section>
          </Fragment>
        )}

        <div className="flex w-full justify-center lg:justify-end py-4 mt-12 relative md:left-20">
          <Button type="submit" variant="filled" size="md" height="h-6">
            Submit
          </Button>
        </div>
      </form>
    </Accordion>
  );
};
