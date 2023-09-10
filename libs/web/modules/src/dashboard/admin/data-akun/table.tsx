"use client";
import { FC, ReactElement, useState, useEffect, SetStateAction } from "react";
import { useForm, FieldValues } from "react-hook-form";
import DataTable, { TableColumn } from "react-data-table-component";
import { TDataAkun } from "./types";
import { dataAkun } from "./store";
import { SearchInput, Modal, TableLoadingData } from "@uninus/web/components";
import { FormOutlined } from "@ant-design/icons";

const Table: FC = (): ReactElement => {
  const [tableAkun, setTableAkun] = useState([{}]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [pending, setPending] = useState(true);

  const columnsAkun: TableColumn<TDataAkun>[] = [
    {
      name: "No",
      cell: (row, rowIndex) => <div className="px-1">{rowIndex + 1}</div>,
      width: "5%",
    },
    {
      name: "Nama Lengkap",
      cell: (row) => row.name,
      width: "15%",
    },
    {
      name: "Role",
      cell: (row) => row.role,
      width: "18%",
    },
    {
      name: "No Telp",
      cell: (row) => row.telp_number,
      width: "15%",
    },
    {
      name: "Email",
      cell: (row) => row.email,
      width: "20%",
    },
    {
      name: "Password",
      cell: (row) => row.password,
      width: "12%",
    },

    {
      name: "Action",
      cell: (row) => (
        <button
          onClick={handleCloseModal}
          className="flex gap-2 bg-primary-green text-primary-white rounded-md p-1 px-3 items-center"
        >
          <div>
            <FormOutlined />
          </div>
          Edit
        </button>
      ),
    },
  ];

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
        paddingLeft: "8px",
        paddingRight: "8px",
        backgroundColor: "#AFFFD4",
        color: "#000000",
        fontSize: "14px",
        fontWeight: "bold",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
      },
    },
  };

  const handleCloseModal = () => {
    setIsShowModal(!isShowModal);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTableAkun(columnsAkun);
      setPending(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, [tableAkun]);

  const filteredDataAkun = dataAkun.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.telp_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSearch = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <div className="w-full flex p-2 py-4 lg:justify-end justify-start">
        <SearchInput
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Cari Nama,Email dan Nomor telepon"
        />
      </div>
      <DataTable
        columns={columnsAkun}
        data={filteredDataAkun}
        customStyles={customStyles}
        fixedHeader={true}
        progressPending={pending}
        progressComponent={<TableLoadingData className="w-full h-80" />}
        noDataComponent={
          <div className="flex flex-col w-full h-screen justify-center items-center">
            <h1 className="font-bold my-2">Data Tidak Tersedia</h1>
            <p>Table akan ditampilkan apabila sudah tersedia data yang diperlukan</p>
          </div>
        }
      />
      <Modal showModal={isShowModal} onClose={handleCloseModal} modalTitle="Edit Data Akun">
        <div>ini buat ngedit</div>
      </Modal>
    </div>
  );
};
export default Table;
