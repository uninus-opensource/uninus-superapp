"use client";
import { FC, ReactElement, useEffect, useState, SetStateAction, Fragment } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { TDataMaster } from "./type";
import { dataMaster } from "./store";
import { TableLoadingData, SearchInput, Button } from "@uninus/web/components";
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillFastBackward,
  AiFillFastForward,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineFilter,
  AiOutlinePlus,
} from "react-icons/ai";

const Table: FC = (): ReactElement => {
  const [tableMaster, setTableMaster] = useState([{}]);

  const [searchQuery, setSearchQuery] = useState("");
  const [pending, setPending] = useState(true);

  const columns: TableColumn<TDataMaster>[] = [
    {
      name: <div className="pl-4">No</div>,
      cell: (row, rowIndex) => <div className="pl-5">{rowIndex + 1}</div>,
      width: "10%",
    },
    {
      name: "Jenis",
      cell: (row) => row.name,
      width: "15%",
    },
    {
      name: "Data Terkini",
      cell: (row) => (
        <div className="w-full">
          <ul className="list-disc pl-5">
            {row.current_data?.map((item, index) => <li key={index}>{item.data}</li>)}
          </ul>
        </div>
      ),
      width: "24%",
    },
    {
      name: "Penambahan Data",
      cell: (row) => (
        <div className="w-full">
          <Button variant="filled" height="h-9">
            <AiOutlinePlus className="text-lg" />
            <span className="text-sm font-medium pl-2">Tambah Data</span>
          </Button>
        </div>
      ),
      width: "24%",
    },

    {
      name: "Tindakan",
      cell: (row) => (
        <div className="flex gap-2 w-full">
          <Button variant="filled-yellow" height="h-6" width="w-24">
            <AiOutlineEdit className="text-lg text-primary-black cursor-pointer" />
            <span className="pl-2 text-[10px] text-primary-black">Edit</span>
          </Button>

          <Button
            variant="filled-red"
            height="h-6"
            width="w-24"
            styling="bg-secondary-orange-1 hover:bg-secondary-orange-2"
          >
            <AiOutlineDelete className="text-lg text-primary-white cursor-pointer " />
            <span className="pl-2 text-[10px]">Hapus</span>
          </Button>
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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTableMaster(columns);
      setPending(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, [tableMaster]);

  const filteredDataMaster = dataMaster.filter((item) => {
    const nameMatches = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const dataTerkiniMatches = item.current_data?.some((cd) =>
      cd.data.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return nameMatches || dataTerkiniMatches;
  });

  const handleSearch = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Fragment>
      {/* TAble */}
      <section className="rounded-lg w-full">
        <div className="w-full flex p-2 py-4 gap-4 lg:justify-end justify-start items-center">
          <Button variant="outlined" height="h-9" width="w-24">
            <AiOutlineFilter className="text-lg text-primary-black" />
            <span className="text-sm font-medium pl-2 text-primary-black">Filter</span>
          </Button>
          <SearchInput
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Cari Nama, dan Data Terkini"
            width="w-[100%]"
          />
        </div>
        <DataTable
          columns={columns}
          data={filteredDataMaster}
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
export default Table;
