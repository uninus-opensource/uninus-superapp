"use client";
import { BreadCrumb, Button, RedirectLink } from "@uninus/web/components";
import { FC, Fragment, ReactElement, useMemo, useState } from "react";
import {
  useRegistrationPath,
  useStudentData,
  useSelectionPath,
  useScholarship,
  useDepartment,
  useDegreeProgram,
} from "@uninus/web/services";
import { useDegreeProgramGet, useDepartmentGet } from "../../../pendaftaran";
import { useCreatePaymentPMB, useObligationPaymentPMB } from "./hooks";
import { ToastContainer, toast } from "react-toastify";
import dynamic from "next/dynamic";
import { DownloadOutlined } from "@ant-design/icons";
import { Page, Text, View, Document, Image, Font } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { formatDate } from "./util";
const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <p className="text-primary-green">Menyiapkan dokumen..</p>,
  },
);

const tw = createTw({
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
});

Font.register({
  family: "Montserrat",
  fonts: [
    {
      src: "/fonts/Montserrat.ttf",
    },
    {
      src: "/fonts/Montserrat-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});

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

  const { data } = useObligationPaymentPMB();
  const { data: registrationPath } = useRegistrationPath();
  const { data: selectionPath } = useSelectionPath();
  const { data: scholarship } = useScholarship();
  const { data: department } = useDepartment();
  const { data: degreeProgramData } = useDegreeProgram();

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

  const documents = useMemo(() => {
    return getStudent?.documents;
  }, [getStudent?.documents]);

  const paymentsIsPaid = getStudent?.payment?.find((payment) => {
    return payment?.name === "PMB";
  })?.isPaid;

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
          window.open(data.responseData.endpointUrl, "_blank");
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

  const registrationPathData = registrationPath?.registration_path.find(
    (value) => value.id === getStudent?.registration_path_id,
  );

  const selectionPathData = selectionPath?.selection.find(
    (value) => value.id === getStudent?.selection_path_id,
  );

  const scholarshipData = scholarship?.scholarship.find(
    (value) => value.id === getStudent?.scholarship_id,
  );

  const firstDepartementData = department?.department.find(
    (value) => value.id === getStudent?.first_department_id,
  );

  const secondDepartementData = department?.department.find(
    (value) => value.id === getStudent?.second_department_id,
  );

  const matchedDegreeProgram = degreeProgramData?.degree_program.find(
    (value) => value.id === getStudent?.degree_program_id,
  );

  // data kartu registrasi
  const registrationCard = {
    noRegistrasi: getStudent?.registration_number,
    namaLengkap: getStudent?.fullname,
    tanggalLahir: formatDate(getStudent?.birth_date as string),
    jenisKelamin: getStudent?.gender_id,
    jalurPendaftaran: getStudent?.registration_path_id,
    jalurSeleksi: getStudent?.selection_path_id,
    jurusan1: firstDepartementData?.name,
    jurusan2: secondDepartementData?.name,
    programPendidikan: matchedDegreeProgram?.name,
  };

  // untuk mapping
  const studentData = [
    { property: "No Registrasi", value: registrationCard.noRegistrasi },
    { property: "Nama Lengkap", value: registrationCard.namaLengkap },
    { property: "Tanggal Lahir", value: registrationCard.tanggalLahir },
    {
      property: "Jenis Kelamin",
      value: registrationCard.jenisKelamin === 1 ? "Laki-laki" : "Perempuan",
    },
    { property: "Jalur Pendaftaran", value: registrationPathData?.name },
    { property: "Jalur Seleksi", value: selectionPathData?.name },
    {
      property:
        scholarshipData?.name !== null && scholarshipData?.name !== undefined
          ? scholarshipData.name
          : "",
      value:
        scholarshipData?.name !== null && scholarshipData?.name !== undefined
          ? scholarshipData.name
          : "",
    },
  ];

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
          <div className="flex w-full">
            <div className="flex flex-col w-[70%] px-4 md:px-5">
              <h1 className="font-bold text-[1.2rem] mt-5">Detail Pembayaran</h1>
              <p className="py-2">
                Silahkan memilih metode pembayaran, dan segera selesaikan pembayaran
              </p>
            </div>
            <div className="w-[30%] flex justify-end items-center pt-3 pr-5">
              <PDFDownloadLink
                document={
                  <Document
                    title="Invoice PMB"
                    author="Informatika developer team"
                    language="Indonesia"
                    pageMode="fullScreen"
                  >
                    <Page size="A4" style={tw("bg-white")}>
                      {/* Header */}
                      <View style={tw("h-20 bg-[#009647] mt-10 flex flex-row items-center gap-10")}>
                        <Image
                          src="/illustrations/pdfIllustrations/uninus.png"
                          style={tw("w-14 h-14 object-cover ml-[15vw]")}
                        ></Image>
                        <Text style={tw("font-bold text-white font-montserrat")}>
                          PMB Universitas Islam Nusantara
                        </Text>
                      </View>

                      <Image
                        src="/illustrations/pdfIllustrations/ring.png"
                        style={tw("absolute right-[-60] top-[-50] w-[160px] h-[160px]")}
                      ></Image>

                      {/* Heading */}
                      <View style={tw("h-[60px] flex justify-center items-center")}>
                        <Text
                          style={tw(
                            "font-bold text-[#292929] text-[16px] font-montserrat uppercase",
                          )}
                        >
                          kartu pendaftaran
                        </Text>
                      </View>

                      {/* Line */}
                      <View style={tw("flex justify-center items-center")}>
                        <View style={tw("h-[2px] bg-[#292929] w-[90%]")}></View>
                      </View>

                      {/* Prospective student data */}
                      <View style={tw("h-auto flex flex-row")}>
                        <View
                          style={tw(
                            "h-auto flex flex-col w-[35%] pl-10 gap-3 pt-10 text-[#292929] text-[14px] font-montserrat",
                          )}
                        >
                          {studentData.map((item, index) => (
                            <Text key={index}>{item.property}</Text>
                          ))}
                        </View>
                        <View
                          style={tw(
                            "h-auto flex w-[75%] pl-10 gap-3 pt-10 font-bold text-[#009647] text-[14px] font-montserrat",
                          )}
                        >
                          {studentData.map((item, index) => (
                            <Text key={index}>{item.value}</Text>
                          ))}
                        </View>
                      </View>
                      <View style={tw("h-auto flex flex-row mt-5")}>
                        <View style={tw("h-auto w-[60%] flex flex-col gap-2 pl-10")}>
                          <Text style={tw("text-[#525252] font-bold text-[14px] font-montserrat")}>
                            Jurusan 1
                          </Text>
                          <Text style={tw("text-[#009647] font-bold text-[14px] font-montserrat")}>
                            {registrationCard.jurusan1}
                          </Text>
                        </View>
                        <View
                          style={tw(
                            `h-auto w-[40%] ${
                              getStudent?.degree_program_id === 3 ? "hidden" : "flex"
                            } flex-col gap-2`,
                          )}
                        >
                          <Text style={tw("text-[#525252] font-bold text-[14px] font-montserrat")}>
                            Jurusan 2
                          </Text>
                          <Text style={tw("text-[#009647] font-bold text-[14px] font-montserrat")}>
                            {registrationCard.jurusan2}
                          </Text>
                        </View>
                      </View>

                      {/* Details of registration fees */}
                      <View style={tw("flex flex-col mt-[3rem]")}>
                        <Text style={tw("font-montserrat font-bold text-black text-[16px] ml-10")}>
                          Rincian Biaya Pendaftaran
                        </Text>
                        <View
                          style={tw(
                            "ml-10 bg-[#F8BF02] font-montserrat h-10 w-[90%] mt-5 flex flex-row text-[#292929] font-montserrat text-[13px] justify-between px-5 items-center",
                          )}
                        >
                          <Text>Program Pendidikan</Text>
                          <Text>Nilai Tagihan</Text>
                        </View>
                        <View
                          style={tw(
                            "flex flex-row justify-between mx-14 mt-3 text-[#666666] font-montserrat text-[13px]",
                          )}
                        >
                          <Text>{registrationCard.programPendidikan}</Text>
                          <Text>Rp 250.000,-</Text>
                        </View>
                      </View>

                      {/* Procedure of payment */}
                      <View style={tw("mt-7 flex flex-col ml-10")}>
                        <View style={tw("font-bold text-[16px] font-montserrat")}>
                          <Text>Tata Cara Pembayaran</Text>
                        </View>
                        <View
                          style={tw(
                            "mt-3 text-black font-montserrat text-[12px] w-[90%] flex flex-row ml-2",
                          )}
                        >
                          <View style={tw("w-[5%] flex flex-col")}>
                            <Text style={tw("pb-[14px]")}>1.</Text>
                            <Text>2.</Text>
                            <Text>3.</Text>
                            <Text>4.</Text>
                          </View>
                          <View style={tw("w-[95%]")}>
                            <Text>
                              Buka aplikasi pembayaran yang mendukung Ottopay, seperti pede, kartu
                              kredit, kartu debit atau JakOne Mobile.
                            </Text>
                            <Text>Pindai QR Code.</Text>
                            <Text>Masukkan jumlah uang yang harus dibayarkan.</Text>
                            <Text>Selesai.</Text>
                          </View>
                        </View>
                        <View style={tw("mt-5 text-black font-montserrat text-[10px]")}>
                          <Text>
                            Pembayaran selambat-lambatnya{" "}
                            <Text style={tw("font-bold")}>2 minggu</Text> setelah Kartu Pendaftaran
                            ini terbit.
                          </Text>

                          <Text style={tw("mt-3 w-[90%]")}>
                            Setelah melakukan pembayaran, segera kirimkan bukti pembayaran melalui{" "}
                            <Text style={tw("font-bold")}>pmb.uninus.ac.id</Text>, pada halaman
                            upload bukti pembayaran klik tombol “upload bukti”, kemudian pilih bukti
                            pembayaran yang akan diupload.
                          </Text>
                        </View>
                      </View>

                      <View style={tw("absolute bottom-0 bg-[#009647] w-full h-[55px]")}></View>

                      <Image
                        src="/illustrations/pdfIllustrations/ring-bottom.png"
                        style={tw("absolute bottom-0 left-0 w-[100px] h-[100px]")}
                      ></Image>
                    </Page>
                  </Document>
                }
                fileName={`${getStudent?.fullname}_Kartu Pendaftaran.pdf`}
              >
                {({ loading }) =>
                  loading ? (
                    <p className="text-primary-green">hampir selesai...</p>
                  ) : (
                    <Button variant="green-outline" size="sm">
                      <div className="flex justify-center items-center gap-2">
                        <DownloadOutlined />
                        Download Bukti
                      </div>
                    </Button>
                  )
                }
              </PDFDownloadLink>
            </div>
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
              disabled={paymentsIsPaid}
            >
              {paymentsIsPaid ? "Sudah Melakukan Pembayaran" : "Lakukan Pembayaran"}
            </Button>
          </div>
        </section>

        {getStudent?.selection_path_id === 3 &&
          documents?.find((doc) => doc.name === "KTP") &&
          paymentsIsPaid && <RedirectLink link="/dashboard/selection">Tes Seleksi</RedirectLink>}
      </section>
    </Fragment>
  );
};
