"use client";
import { FC, ReactElement, useEffect, useState, SetStateAction, Fragment } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { TDataSoal } from "./types";
import { dataPegawai } from "./store";
import { TableLoadingData, SearchInput, Button } from "@uninus/web/components";
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillCopy,
  AiFillFastBackward,
  AiFillFastForward,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePlus,
} from "react-icons/ai";

const TableKuesioner: FC = (): ReactElement => {
  const [tableQuestion, setTableQuestion] = useState([{}]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pending, setPending] = useState(true);

  const columns: TableColumn<TDataSoal>[] = [
    {
      name: <div className="pl-4">No</div>,
      cell: (row, rowIndex) => <div className="pl-5">{rowIndex + 1}</div>,
      width: "10%",
    },
    {
      name: "Kategori",
      cell: (row) => <div className="text-left">{row.kategori}</div>,
      width: "18%",
    },
    {
      name: "Soal",
      cell: (row) => <div className="text-left">{row.soal}</div>,
      width: "47%",
    },
    {
      name: "Tindakan",
      cell: (row) => (
        <div className="flex gap-2 w-full">
          <Button variant="filled" height="h-6" width="w-20">
            <AiOutlineEdit className="text-lg text-primary-white cursor-pointer" />
            <span className="pl-2 text-[10px]">Edit</span>
          </Button>

          <Button variant="filled" height="h-6" width="w-32" styling="bg-red-5 hover:bg-red-3">
            <AiOutlineDelete className="text-lg text-primary-white cursor-pointer" />
            <span className="pl-2 text-[10px]">Hapus Data</span>
          </Button>
        </div>
      ),
      width: "25%",
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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTableQuestion(columns);
      setPending(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, [tableQuestion]);

  const filteredDataQuestion = dataPegawai.filter(
    (item) =>
      item.soal.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.kategori.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSearch = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Fragment>
      {/* Table */}
      <section className="rounded-lg w-full px-5 lg:px-0">
        <div className="w-full flex flex-wrap p-2 py-4  justify-between items-center">
          <div className="flex gap-4">
            <Button variant="filled" height="h-9">
              <AiOutlinePlus className="text-lg" />
              <span className="text-sm font-medium pl-2">Tambah Pertanyaan</span>
            </Button>
            <Button variant="filled" height="h-9" styling="bg-warning-500 hover:bg-warning-300">
              <AiFillCopy className="text-lg" />
              <span className="text-sm font-medium pl-2">Cetak</span>
            </Button>
          </div>
          <div>
            <SearchInput
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Cari Kategori Soal"
            />
          </div>
        </div>
        <DataTable
          columns={columns}
          data={filteredDataQuestion}
          customStyles={customStyles}
          fixedHeader={true}
          progressPending={pending}
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
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
          paginationIconPrevious={<AiFillCaretLeft className="text-xl" />}
          paginationIconNext={<AiFillCaretRight className="text-xl ml-0.5" />}
          paginationIconFirstPage={<AiFillFastBackward className="text-xl" />}
          paginationIconLastPage={<AiFillFastForward className="text-xl ml-0.5" />}
        />
      </section>
    </Fragment>
  );
};
export default TableKuesioner;
