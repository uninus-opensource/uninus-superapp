"use client";
import { FC, ReactElement, useMemo } from "react";
import { DataMahasiswa } from "./store";
import { TDataTransaksi } from "./type";
import DataTable, { TableColumn } from "react-data-table-component";
import { match } from "ts-pattern";
import { PrinterOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useStudentData } from "@uninus/web/services";

export const ModulePembayaran: FC = (): ReactElement => {
  const { getStudent } = useStudentData();

  const student = useMemo(() => {
    return getStudent;
  }, [getStudent]);

  const checkPayment = (isPaid?: boolean): string => {
    if (isPaid) {
      return "Sudah Bayar";
    } else {
      return "Belum Bayar";
    }
  };

  const payment = student?.payment?.map((item) => ({
    jenis_pembayaran: item.name,
    total: item.amount,
    status: checkPayment(item.isPaid),
  })) as TDataTransaksi[];

  const columnsAkun: TableColumn<TDataTransaksi | undefined>[] = [
    {
      name: <div className="px-3">No</div>,
      cell: (row, rowIndex) => <div className="px-5">{rowIndex + 1}</div>,
      width: "80px",
    },
    {
      name: "Jenis Pembayaran",
      cell: (row) => row?.jenis_pembayaran,
      width: "240px",
    },
    {
      name: "Total Tagihan",
      cell: (row) => row?.total,
      width: "180px",
    },

    {
      name: "Status",
      cell: (row) => (
        <button
          className={`${match(row?.status)
            .with("Sudah Bayar", () => "bg-[#CCEADA] text-grayscale-9")
            .otherwise(
              () => "bg-red-3 text-red-5",
            )} text-white w-[100px] py-1 text-sm text-center rounded-md cursor-default`}
        >
          {row?.status}
        </button>
      ),
      width: "180px",
    },
    {
      name: "Tindakan",

      cell: (row) => (
        <div className="flex gap-2 w-20 ">
          {row?.status === "Belum Bayar" ? (
            ""
          ) : (
            <button
              // onClick={handleShowModal}
              className="flex w-full gap-2 bg-primary-yellow  rounded-md p-1 px-1 items-center justify-center"
            >
              <div>
                <PrinterOutlined />
              </div>
              Cetak
            </button>
          )}
        </div>
      ),
    },
  ];

  const customStyles = {
    rows: {
      style: {
        width: "100%",
        minHeight: "70px",
        background: "#F5F5F5",
      },
      stripedStyle: {
        background: "#FFFFFF",
      },
    },
    headCells: {
      style: {
        paddingLeft: "5px",
        paddingRight: "5px",
        backgroundColor: "#AFFFD4",
        color: "#000000",
        fontSize: "14px",
        fontWeight: "bold",
      },
    },
    cells: {
      style: {
        padding: "5px",
      },
    },
  };

  return (
    <section
      key="dashboard-pembayaran"
      className="flex flex-col text-center px-4 gap-y-6 lg:text-start"
    >
      <div className="2xl:text-2xl">
        <h1 className="text-slate-5">
          PMB <span className="text-secondary-green-4"> / Pembayaran</span>
        </h1>
        <p className="text-lg 2xl:text-2xl pt-2 font-extrabold text-secondary-green-4">
          Pembayaran
        </p>
      </div>
      <div className="flex flex-col gap-4 w-full bg-primary-white p-10 rounded-lg shadow-lg ">
        <h1 className="text-lg font-bold text-grayscale-9 text-left">Data Mahasiswa</h1>
        <div className="flex flex-col gap-y-5 md:gap-y-0 justify-center items-center md:flex-row md:justify-between lg:w-60% md:w-80%">
          <Image
            src={student?.avatar || ""}
            alt="printer"
            width={150}
            height={150}
            quality={100}
            className="border-2 md:hidden"
          />
          <div className="flex flex-row justify-start gap-x-7">
            <div className="title flex gap-y-3 flex-col font-medium text-sm text-grayscale-8 text-left">
              <h1 className="">Tahun Ajaran</h1>
              <h1 className="">NIM</h1>
              <h1 className="">Nama</h1>
              <h1 className="">Nama Ibu Kandung</h1>
              <h1 className="">Semester</h1>
            </div>
            <div className="title flex gap-y-3 flex-col font-medium text-sm text-primary-green text-left">
              <h1>{DataMahasiswa?.school_year}</h1>
              <h1>{DataMahasiswa?.nim}</h1>
              <h1>{student?.fullname}</h1>
              <h1>{student?.mother_name}</h1>
              <h1>{DataMahasiswa?.semester}</h1>
            </div>
          </div>
          <Image
            src={student?.avatar || ""}
            alt="printer"
            width={200}
            height={200}
            quality={100}
            className="hidden md:block"
          />
        </div>
        <h1 className="text-lg font-bold text-grayscale-9 text-left mt-6">Riwayat Transaksi</h1>
        <DataTable
          columns={columnsAkun}
          data={payment}
          customStyles={customStyles}
          fixedHeader={true}
          striped
          noDataComponent={
            <div className="flex flex-col w-full h-80 justify-center items-center">
              <h1 className="font-bold my-2">Data Tidak Tersedia</h1>
              <p>Table akan ditampilkan apabila sudah tersedia data yang diperlukan</p>
            </div>
          }
        />
      </div>
    </section>
  );
};
