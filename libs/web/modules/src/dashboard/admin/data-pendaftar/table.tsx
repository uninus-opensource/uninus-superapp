"use client";
import { FC, ReactElement, useEffect, useState, SetStateAction, useMemo } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { TDataUser } from "./types";
import { TableLoadingData, SearchInput, Button } from "@uninus/web/components";

import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillFastBackward,
  AiFillFastForward,
  AiOutlineAudit,
  AiOutlineEdit,
  AiOutlineFilter,
} from "react-icons/ai";
import { useGetAllStudent } from "../hook";

const Table: FC = (): ReactElement => {
  const [tablePendaftar, setTablePendaftar] = useState([{}]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);

  const { data, isLoading } = useGetAllStudent({
    page: page,
    per_page: perPage,
    search: searchQuery,
  });

  const user = useMemo(() => {
    return data?.data?.map((item, i, arr: TDataUser[]) => {
      return arr[i];
    });
  }, [data]);

  const convertDate = (dateString: string) => {
    const date = new Date(dateString).getDate();
    const month = new Date(dateString).getMonth() + 1;
    const year = new Date(dateString).getFullYear();

    switch (month) {
      case 1:
        return `${date} Januari ${year}`;

      case 2:
        return `${date} Februari ${year}`;

      case 3:
        return `${date} Maret ${year}`;

      case 4:
        return `${date} April ${year}`;

      case 5:
        return `${date} Mei ${year}`;

      case 6:
        return `${date} Juni ${year}`;

      case 7:
        return `${date} Juli ${year}`;

      case 8:
        return `${date} Agustus ${year}`;

      case 9:
        return `${date} September ${year}`;

      case 10:
        return `${date} Oktober ${year}`;

      case 11:
        return `${date} November ${year}`;

      case 12:
        return `${date} Desember ${year}`;

      default: {
        return "";
      }
    }
  };

  const columns: TableColumn<TDataUser>[] = useMemo(() => {
    return [
      {
        name: <div className="pl-4">No</div>,
        cell: (row, rowIndex) => <div className="pl-5">{rowIndex + 1}</div>,
        width: "80px",
      },
      {
        name: "No Registrasi",
        cell: (row) => row.registration_number,
        width: "170px",
      },
      {
        name: "Tanggal Daftar",
        cell: (row) => convertDate(row.createdAt as string),
        width: "190px",
      },
      {
        name: "Nama Lengkap",
        cell: (row) => row.student?.user?.fullname,
        width: "180px",
      },
      {
        name: "Prodi Pilihan 1",
        cell: (row) => <div className="w-[80%] ">{row.first_deparment?.name}</div>,
        width: "200px",
      },
      {
        name: "Prodi Pilihan 2",
        cell: (row) => <div className="w-[80%]">{row.second_deparment?.name}</div>,
        width: "220px",
      },
      {
        name: <div className="ml-2">Jalur Seleksi</div>,
        cell: (row) => <div className="w-[80%]">{row.selection_path?.name}</div>,
        width: "150px",
      },
      {
        name: <div className="w-[80%] text-center">Rata - rata Rapor</div>,
        cell: (row) => <div className="ml-12">{row.average_grade}</div>,
        width: "140px",
      },
      {
        name: "Skor SNBT",
        cell: (row) => <div className="ml-8">{row.average_utbk}</div>,
        width: "140px",
      },
      {
        name: <div className="w-full mr-10 text-center">Status Registrasi</div>,
        cell: (row) => (
          <button
            className={` ${
              row.registration_status?.name === "Lolos Seleksi"
                ? "bg-[#CCEADA] text-grayscale-9"
                : "bg-red-3 text-red-7"
            } text-white w-[150px] py-1 text-xs text-center rounded-md cursor-default`}
          >
            {row.registration_status?.name}
          </button>
        ),
        width: "200px",
      },
      {
        name: <div className="w-full mr-10 text-center">Tindakan</div>,
        width: "250px",
        cell: (row) => (
          <div className="flex gap-2 w-full ml-2">
            <Button
              href={`/dashboard/data-pendaftar/edit-data-pendaftar/${row.id}`}
              variant="filled"
              height="h-4"
              width="w-20"
            >
              <AiOutlineEdit className="text-lg text-primary-white cursor-pointer" />
              <span className="pl-2 text-[10px]">Edit</span>
            </Button>

            <Button
              variant="filled"
              height="h-4"
              width="w-28"
              styling="bg-primary-yellow hover:bg-secondary-orange-2"
            >
              <AiOutlineAudit className="text-lg cursor-pointer text-primary-black" />
              <span className="pl-2 text-[10px] text-primary-black">Validasi</span>
            </Button>
          </div>
        ),
      },
    ];
  }, []);

  const customStyles = {
    rows: {
      style: {
        minHeight: "45px",

        "&:nth-child(odd)": {
          backgroundColor: "#FFFFFF",
        },
        "&:nth-child(even)": {
          backgroundColor: "#F5F5F5",
        },
      },
      stripedStyle: {
        background: "#F5F5F5",
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

  useEffect(() => {
    setTablePendaftar(columns);
  }, [columns, tablePendaftar]);

  const handleSearch = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchQuery(event.target.value);
  };

  return (
    <section className="rounded-lg w-full">
      <div className="w-full flex p-2 py-4 gap-4 lg:justify-end justify-start items-center">
        <Button variant="outlined" height="h-9" width="w-24">
          <AiOutlineFilter className="text-lg text-primary-black" />
          <span className="text-sm font-medium pl-2 text-primary-black">Filter</span>
        </Button>

        <SearchInput
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Cari No registrasi"
          width="w-[100%]"
        />
      </div>
      <DataTable
        columns={columns}
        data={user as TDataUser[]}
        customStyles={customStyles}
        fixedHeader={true}
        progressPending={isLoading}
        striped
        progressComponent={<TableLoadingData className="w-full h-80" />}
        noDataComponent={
          <div className="flex flex-col w-full h-80 justify-center items-center">
            <h1 className="font-bold my-2">Data Tidak Tersedia</h1>
            <p>Table akan ditampilkan apabila sudah tersedia data yang diperlukan</p>
          </div>
        }
        pagination
        paginationComponentOptions={{
          rangeSeparatorText: "ditampilkan dari",
          rowsPerPageText: "Tampilkan",
        }}
        paginationPerPage={perPage}
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
        paginationServer
        onChangePage={(page: number) => setPage(page)}
        onChangeRowsPerPage={(perPage: number) => setPerPage(perPage)}
        paginationTotalRows={data?.meta.total as number}
        paginationIconPrevious={<AiFillCaretLeft className="text-xl" />}
        paginationIconNext={<AiFillCaretRight className="text-xl ml-0.5" />}
        paginationIconFirstPage={<AiFillFastBackward className="text-xl" />}
        paginationIconLastPage={<AiFillFastForward className="text-xl ml-0.5" />}
      />
    </section>
  );
};
export default Table;
