"use client";
import { FC, ReactElement, useState, useEffect, SetStateAction, useMemo, Fragment } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { TDataAkun } from "./types";
import { dataAkun } from "./store";
import { SearchInput, Modal, TableLoadingData, Button, TextField } from "@uninus/web/components";
import { useForm, FieldValues } from "react-hook-form";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";

const Table: FC = (): ReactElement => {
  const [tableAkun, setTableAkun] = useState([{}]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
  const [ModalAdd, setModalAdd] = useState(false);
  const [pending, setPending] = useState(true);

  const { control } = useForm<FieldValues>({
    mode: "all",
    defaultValues: {},
  });

  const columnsAkun: TableColumn<TDataAkun>[] = useMemo(
    () => [
      {
        name: "No",
        cell: (_row, rowIndex) => <div className="px-1">{rowIndex + 1}</div>,
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
        cell: () => (
          <div className="flex gap-2">
            <button
              onClick={handleCloseModal}
              className="flex gap-2 bg-primary-green text-primary-white rounded-md p-1 px-3 items-center"
            >
              <div>
                <FormOutlined />
              </div>
            </button>
            <button className="flex gap-2 bg-red-4 text-primary-white rounded-md p-1 px-3 items-center">
              <div>
                <DeleteOutlined />
              </div>
            </button>
          </div>
        ),
      },
    ],
    [],
  );

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

  const handleModalAdd = () => {
    setModalAdd(!ModalAdd);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTableAkun(columnsAkun);
      setPending(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, [columnsAkun, tableAkun]);

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
    <Fragment>
      <div className="w-full flex p-2 py-4 justify-between">
        <Button
          variant="custom"
          styling="text-xs lg:text-base w-auto h-5 xl:h-10 border border-primary-green text-primary-green"
          onClick={handleModalAdd}
        >
          + Tambah Data
        </Button>
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
        <form className="w-full flex flex-col justify-center items-center gap-1">
          <div className="w-full">
            <TextField
              inputHeight="h-10"
              name="name"
              variant="sm"
              type="text"
              required
              labelclassname="text-sm font-semibold"
              label="Nama Lengkap"
              placeholder="Fenny Oktaviani"
              inputWidth="w-full"
              control={control}
            />
          </div>

          <div className="w-full">
            <TextField
              inputHeight="h-10"
              name="role"
              variant="sm"
              type="text"
              required
              labelclassname="text-sm font-semibold"
              label="Role"
              placeholder="Calon Mahasiswa"
              inputWidth="w-full"
              control={control}
            />
          </div>

          <div className="w-full">
            <TextField
              inputHeight="h-10"
              name="number"
              variant="sm"
              type="text"
              required
              labelclassname="text-sm font-semibold"
              label="Nomor Telepon"
              placeholder="085797807376"
              inputWidth="w-full"
              control={control}
            />
          </div>
          <div className="w-full">
            <TextField
              inputHeight="h-10"
              name="email"
              variant="sm"
              type="text"
              required
              labelclassname="text-sm font-semibold"
              label="Email"
              placeholder="Fnny04@gmail.com"
              inputWidth="w-full"
              control={control}
            />
          </div>
          <div className="w-full">
            <TextField
              inputHeight="h-10"
              name="passwd"
              variant="sm"
              type="text"
              required
              labelclassname="text-sm font-semibold"
              label="Password"
              placeholder="Anjay123"
              inputWidth="w-full"
              control={control}
            />
          </div>

          <div className="w-full flex justify-end items-center gap-3 py-2">
            <Button variant="filled" size="md">
              Edit
            </Button>
          </div>
        </form>
      </Modal>
      <Modal showModal={ModalAdd} onClose={handleModalAdd} modalTitle="Tambah Data Akun">
        <form className="w-full flex flex-col justify-center items-center gap-1">
          <div className="w-full">
            <TextField
              inputHeight="h-10"
              name="name"
              variant="sm"
              type="text"
              required
              labelclassname="text-sm font-semibold"
              label="Nama Lengkap"
              placeholder="Masukan Lengkap"
              inputWidth="w-full"
              control={control}
            />
          </div>

          <div className="w-full">
            <TextField
              inputHeight="h-10"
              name="role"
              variant="sm"
              type="text"
              required
              labelclassname="text-sm font-semibold"
              label="Role"
              placeholder="Role"
              inputWidth="w-full"
              control={control}
            />
          </div>

          <div className="w-full">
            <TextField
              inputHeight="h-10"
              name="number"
              variant="sm"
              type="text"
              required
              labelclassname="text-sm font-semibold"
              label="Nomor Telepon"
              placeholder="Nomor Telepon"
              inputWidth="w-full"
              control={control}
            />
          </div>
          <div className="w-full">
            <TextField
              inputHeight="h-10"
              name="email"
              variant="sm"
              type="text"
              required
              labelclassname="text-sm font-semibold"
              label="Email"
              placeholder="Email"
              inputWidth="w-full"
              control={control}
            />
          </div>
          <div className="w-full">
            <TextField
              inputHeight="h-10"
              name="passwd"
              variant="sm"
              type="text"
              required
              labelclassname="text-sm font-semibold"
              label="Password"
              placeholder="Password"
              inputWidth="w-full"
              control={control}
            />
          </div>

          <div className="w-full flex justify-end items-center gap-3 py-2">
            <Button variant="filled" size="md">
              Tambahkan
            </Button>
          </div>
        </form>
      </Modal>
    </Fragment>
  );
};
export default Table;
