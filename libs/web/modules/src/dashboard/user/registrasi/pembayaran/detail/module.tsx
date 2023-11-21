"use client";
import { BreadCrumb, Button } from "@uninus/web/components";
import { FC, Fragment, ReactElement, useMemo, useState } from "react";
import { useStudentData, useUserData } from "@uninus/web/services";
import { useDegreeProgramGet, useDepartmentGet } from "../../../pendaftaran";
import { useCreatePaymentPMB, useObligationPaymentPMB } from "./hooks";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

export const detailBreadcrumb = [
  {
    name: "Beranda",
    link: "/dashboard",
  },
  {
    name: "Registrasi",
    link: "/dashboard/registrasi/biodata",
  },
  {
    name: "Pembayaran",
    link: "/dashboard/registrasi/pembayaran",
  },
];

export const DetailPembayaran: FC = (): ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { getStudent } = useStudentData();
  const { getUser } = useUserData();

  const { data } = useObligationPaymentPMB();

  const router = useRouter();

  const student = useMemo(() => {
    return getStudent;
  }, [getStudent]);

  const paymentPMB = useMemo(() => {
    return data?.[0];
  }, [data]);

  const degreeProgram = useMemo(() => {
    return getStudent?.degree_program_id;
  }, [getStudent?.degree_program_id]);

  const firstDepartement = useMemo(() => {
    return getStudent?.first_department_id;
  }, [getStudent?.first_department_id]);

  const secondDepartement = useMemo(() => {
    return getStudent?.second_department_id;
  }, [getStudent?.second_department_id]);

  const [programMeta] = useState({
    search: "",
    degree_program_id: "",
    department_id: "",
  });

  const { data: getDegreeProgram } = useDegreeProgramGet(programMeta);
  const { data: getDepartment } = useDepartmentGet({
    degree_program_id: "",
    faculty_id: "",
    search: "",
  });

  const DegreeProgramOptions = useMemo(
    () =>
      getDegreeProgram?.degree_program?.map((program) => ({
        label: program?.name,
        value: program?.id,
      })),
    [getDegreeProgram?.degree_program],
  );

  const DepartmentOptions = useMemo(
    () =>
      getDepartment?.department?.map((department) => ({
        label: department?.name,
        value: department?.id,
      })),
    [getDepartment?.department],
  );

  const { mutate } = useCreatePaymentPMB();

  const createPaymentPMB = () => {
    setIsLoading(true);
    return mutate(
      {
        payment_obligation_id: Number(paymentPMB?.id),
      },
      {
        onSuccess: (data) => {
          setIsLoading(false);
          router.push(data.responseData.endpointUrl);
        },
        onError: (error) => {
          setIsLoading(false);
          setTimeout(() => {
            toast.error(error.message, {
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
  };

  return (
    <Fragment>
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
      <section
        key="detail-pembayaran"
        className="flex flex-col text-center px-4 gap-y-6 lg:text-start"
      >
        <BreadCrumb items={detailBreadcrumb} />
        <h1 className="text-lg 2xl:text-2xl pt-2 font-extrabold text-secondary-green-4">
          Pembayaran Registrasi
        </h1>

        <section className="h-auto w-[90vw] lg:w-[60vw] xl:w-[70vw] shadow-md flex flex-col rounded-md bg-primary-white">
          <div className="flex flex-col w-full px-4 md:px-5">
            <h1 className="font-bold text-[1.2rem] mt-5">Detail Pembayaran</h1>
            <p className="py-2">
              Silahkan memilih metode pembayaran, dan segera selesaikan pembayaran
            </p>
          </div>

          <div className="bg-primary-green w-full h-[3px] mt-3"></div>
          <div className="px-2 md:px-4 py-2 text-sm md:text-base">
            <div className="flex justify-between p-4 text-left">
              <h1 className="font-extramedium flex flex-col md:flex-row">
                <p>Biaya Formulir - </p>
                <p>
                  {degreeProgram
                    ? DegreeProgramOptions?.find((x) => x.value === degreeProgram)?.label
                    : "loading data program pendidikan..."}
                </p>
              </h1>
              <p className="font-bold">Rp. {paymentPMB?.amount || "loading nominal..."}</p>
            </div>
            <div className="flex flex-col gap-y-2 pl-4 py-1 text-left">
              {student?.degree_program_id === 1 ? (
                <Fragment>
                  <h1 className="flex flex-col md:flex-row">
                    <p>Prodi pilihan 1 - </p>
                    <p>
                      {firstDepartement
                        ? DepartmentOptions?.find((x) => x.value === firstDepartement)?.label
                        : "loading prodi pilihan 1..."}
                    </p>
                  </h1>

                  <h1 className="flex flex-col md:flex-row">
                    <p>Prodi pilihan 2 - </p>
                    <p>
                      {secondDepartement
                        ? DepartmentOptions?.find((x) => x.value === secondDepartement)?.label
                        : "loading prodi pilihan 2..."}
                    </p>
                  </h1>
                </Fragment>
              ) : (
                <h1 className="flex flex-col md:flex-row">
                  <p>Prodi pilihan - </p>
                  <p>
                    {firstDepartement
                      ? DepartmentOptions?.find((x) => x.value === firstDepartement)?.label
                      : "loading prodi pilihan 1..."}
                  </p>
                </h1>
              )}
            </div>
            <div className="bg-slate-5 w-full h-[2px] mt-4"></div>
            <div className="flex justify-between p-4 text-left">
              <h1 className="font-bold">Total Pembayaran</h1>
              <p className="font-bold">Rp. {paymentPMB?.amount || "loading nominal..."}</p>
            </div>
          </div>
          <div className="flex flex-col w-full items-center lg:items-end p-8">
            <Button
              variant="filled"
              size="sm"
              width="w-70% lg:w-25% xl:w-15%"
              height="h-12"
              loading={isLoading}
              onClick={() => {
                createPaymentPMB();
              }}
              disabled={getUser?.registration_status === "Sudah Membayar"}
            >
              {getUser?.registration_status === "Sudah Membayar"
                ? "Sudah Melakukan Pembayaran"
                : "Lakukan Pembayaran"}
            </Button>
          </div>
        </section>
      </section>
    </Fragment>
  );
};
