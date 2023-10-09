"use client";
import { ReactElement, FC, useMemo, Fragment, useState, useEffect } from "react";
import { Button, Modal, SelectOption, TextField } from "@uninus/web/components";
import { BerkasKhusus, BerkasUmum, RaporSnbt } from "./section";
import { useGetStudentById } from "../edit-data-pendaftar/hooks";
import { usePathname } from "next/navigation";
import { useStudentDataByIdValidation } from "@uninus/web/services";
import { useForm } from "react-hook-form";

export const ModuleValidasiDataPendaftar: FC = (): ReactElement => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const path = usePathname();
  const id = path.split("/")[4];

  const { setStudentbyId } = useStudentDataByIdValidation();
  const { data, isError } = useGetStudentById(id);
  setStudentbyId(data);

  const degreeProgram = useMemo(() => {
    return data?.degree_program_id;
  }, [data]);

  const scholarship = useMemo(() => {
    return data?.scholarship_id;
  }, [data]);

  const fullname = useMemo(() => {
    return data?.fullname;
  }, [data]);

  const { control, reset } = useForm({
    mode: "all",
  });

  useEffect(() => {
    reset({ fullname });
  }, [fullname, reset]);

  return (
    <Fragment>
      <section
        key="dashboard-biodata"
        className="flex flex-col text-center px-4 gap-y-6  lg:text-start"
      >
        <div className="2xl:text-2xl">
          <h1 className="text-slate-5">
            Admin PMB <span className="text-secondary-green-4"> / Data Pendaftar / Validasi</span>
          </h1>
          <p className=" text-lg 2xl:text-2xl font-extrabold pt-2 text-secondary-green-4">
            Validasi Data Pendaftar
          </p>
        </div>

        {isError ? (
          <section className="flex flex-col justify-center items-center gap-4 w-full bg-primary-white p-4 rounded-lg shadow-lg">
            <h1 className="text-secondary-green-4 text-xl md:text-3xl lg:text-4xl font-bold">
              Data tidak tersedia!
            </h1>
          </section>
        ) : (
          <section className="flex flex-col gap-4 w-full bg-primary-white p-4 rounded-lg shadow-lg">
            <section className="flex flex-col gap-8 w-full justify-center items-center py-2 rounded-lg bg-primary-white overflow-x-hidden">
              <section key="validasi-accordion" className="w-full flex flex-col gap-y-10">
                {degreeProgram !== 1 ? (
                  <Fragment>
                    <BerkasUmum />
                    <BerkasKhusus />
                  </Fragment>
                ) : degreeProgram === 1 && !!scholarship ? (
                  <Fragment>
                    <BerkasUmum />
                    <RaporSnbt />
                    <BerkasKhusus />
                  </Fragment>
                ) : (
                  <Fragment>
                    <BerkasUmum />
                    <RaporSnbt />
                  </Fragment>
                )}
              </section>
            </section>
            <div className="flex w-full justify-center lg:justify-end py-4 mt-8 gap-x-3">
              <Button
                href={"/dashboard/data-pendaftar"}
                variant="filled-red"
                size="md"
                width="lg:w-15% xl:w-15%"
              >
                Batal
              </Button>
              <Button
                onClick={() => setIsModal(true)}
                type="submit"
                variant="filled"
                size="md"
                width="lg:w-15% xl:w-15%"
              >
                Hasil Seleksi
              </Button>
            </div>
          </section>
        )}
      </section>

      <Modal
        showModal={isModal}
        onClose={() => {}}
        iconClose={false}
        className="bg-primary-white max-w-md md:max-w-xl lg:max-w-4xl rounded-lg"
        bodyClassName="px-14 py-4"
        modalTitle={<h1 className="w-full py-4 text-2xl font-bold">Hasil Seleksi</h1>}
      >
        <form className="w-full flex flex-wrap items-center justify-between gap-5">
          <div>
            <TextField
              name="fullname"
              variant="sm"
              type="text"
              placeholder="Nama Lengkap"
              labelclassname="text-sm font-semibold"
              label="Nama Lengkap"
              inputWidth="w-70% lg:w-[27vw] xl:w-[25vw] text-base md:w-[33vw]"
              inputHeight="h-10"
              control={control}
              disabled
            />
            <SelectOption
              labels="Hasil Seleksi"
              name="hasil_seleksi"
              labelClassName="font-bold text-xs py-2"
              placeholder="Hasil Seleksi"
              options={[]}
              isClearable={true}
              isSearchable={false}
              control={control}
              status={"error"}
              className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw] mb-4"
            />
          </div>

          <div className="flex flex-col gap-4 mb-5">
            <SelectOption
              labels="Prodi Diterima"
              name="prodi_diterima"
              labelClassName="font-bold text-xs py-2"
              placeholder="Prodi Diterima"
              options={[]}
              isClearable={true}
              isSearchable={false}
              control={control}
              status={"error"}
              className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
            />

            <SelectOption
              labels="Jalur Diterima"
              name="jalur_diterima"
              labelClassName="font-bold text-xs py-2"
              placeholder="Jalur Diterima"
              options={[]}
              isClearable={true}
              isSearchable={false}
              control={control}
              status={"error"}
              className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
            />
          </div>

          <div className="flex w-full justify-center lg:justify-end py-4 mt-8 gap-x-3">
            <Button onClick={() => setIsModal(false)} variant="filled-red" size="md">
              Batal
            </Button>
            <Button type="submit" variant="filled" size="md">
              Simpan
            </Button>
          </div>
        </form>
      </Modal>
    </Fragment>
  );
};
