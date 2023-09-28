"use client";
import { FC, ReactElement, useState, useEffect, SetStateAction, useMemo, Fragment } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { TDataAkun } from "./types";
import {
  SearchInput,
  Modal,
  TableLoadingData,
  Button,
  TextField,
  SelectOption,
} from "@uninus/web/components";
import { Control, FieldValues, useForm } from "react-hook-form";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDataUsers, useDeleteDataUsers, useFilterAction } from "./hook";

const Table: FC = (): ReactElement => {
  const [tableAkun, setTableAkun] = useState([{}]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isDeleteModalShow, setIsDeleteModalShow] = useState<boolean>(false);
  const [ModalAdd, setModalAdd] = useState<boolean>(false);
  const [pending, setPending] = useState<boolean>(true);
  const [currentId, setCurrentId] = useState<string>("");

  const { mutate: deleteUser } = useDeleteDataUsers();
  const { getFilterAction } = useFilterAction();
  const { data, refetch } = useDataUsers(getFilterAction);
  const {
    control,
    handleSubmit,
    formState: { isLoading },
  } = useForm<TDataAkun>({
    mode: "all",
    defaultValues: {},
  });
  const {
    control: updateControl,
    handleSubmit: updateSubmit,
    formState: { isLoading: updateIsLoading, errors: updateErrors },
    reset: updateReset,
  } = useForm<TDataAkun>({
    mode: "all",
  });

  const selectUpdateRole = [
    {
      value: 1 as unknown as string,
      label: "Admin",
    },
    {
      value: 2 as unknown as string,
      label: "Calon Mahasiswa",
    },
  ];
  const handleCloseModal = () => {
    setIsShowModal(!isShowModal);
  };

  const handleModalAdd = () => {
    setModalAdd(!ModalAdd);
  };
  const handleDeleteAkun = (): void => {
    deleteUser(currentId, {
      onSuccess: () => refetch(),
    });
    handleDeleteModal();
    console.log(currentId);
  };
  const handleDeleteModal = () => {
    setIsDeleteModalShow(!isDeleteModalShow);
  };
  const onEditData = updateSubmit((data) => {
    try {
      // mutate({
      //    ...data,
      // });
    } catch (error) {
      console.log(error);
    }
  });
  const onAddData = handleSubmit((data) => {
    try {
      // mutate({
      //    ...data,
      // });
    } catch (error) {
      console.log(error);
    }
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
        cell: (row) => row.fullname,
        width: "15%",
      },
      {
        name: "Role",
        cell: (row) => row.role.name,
        width: "18%",
      },
      {
        name: "No Telp",
        cell: (row) => row.phone_number,
        width: "15%",
      },
      {
        name: "Email",
        cell: (row) => row.email,
        width: "20%",
      },

      {
        name: "Action",
        cell: (row) => (
          <div className="flex gap-2">
            <button
              onClick={handleCloseModal}
              className="flex gap-2 bg-primary-green text-primary-white rounded-md p-1 px-3 items-center"
            >
              <div className="flex items-center gap-x-2" onClick={() => updateReset({ ...row })}>
                <FormOutlined />
                <span>Edit</span>
              </div>
            </button>
            <button
              className="flex gap-2 bg-red-4 text-primary-white rounded-md p-1 px-3 items-center"
              onClick={() => {
                setCurrentId(row.id);
                handleDeleteModal();
              }}
            >
              <div className="flex items-center gap-x-2">
                <DeleteOutlined />
                <span>Hapus</span>
              </div>
            </button>
          </div>
        ),
      },
    ],
    [updateReset],
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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTableAkun(columnsAkun);
      setPending(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, [columnsAkun, tableAkun]);

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
          width="w-[24rem]"
        />
      </div>
      <DataTable
        columns={columnsAkun}
        data={data?.data as TDataAkun[]}
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

      <Modal
        key="modal-edit-user"
        showModal={isShowModal}
        onClose={handleCloseModal}
        modalTitle="Edit Data Akun"
      >
        <form
          onClick={onEditData}
          className="w-full flex flex-col justify-center items-center gap-1"
        >
          <div className="w-full">
            <TextField
              inputHeight="h-10"
              name="fullname"
              variant="sm"
              type="text"
              required
              labelclassname="text-sm font-semibold"
              label="Nama Lengkap"
              placeholder="Fenny Oktaviani"
              inputWidth="w-full"
              control={updateControl}
            />
          </div>
          <div className="w-full">
            <SelectOption
              labels="role"
              className="text-left"
              labelClassName="text-left py-2"
              control={updateControl as unknown as Control<FieldValues>}
              name="role"
              options={selectUpdateRole}
              isMulti={false}
              isClearable={true}
              required={true}
              status="error"
              message={updateErrors.root?.message}
            />
          </div>

          <div className="w-full">
            <TextField
              inputHeight="h-10"
              name="phone_number"
              variant="sm"
              type="text"
              required
              labelclassname="text-sm font-semibold"
              label="Nomor Telepon"
              placeholder="085797807376"
              inputWidth="w-full"
              control={updateControl}
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
              control={updateControl}
            />
          </div>

          <div className="w-full flex justify-end items-center gap-3 py-2">
            <Button variant="filled" size="md" loading={updateIsLoading} type="submit">
              Edit
            </Button>
          </div>
        </form>
      </Modal>
      <Modal
        key="modal-delete-user"
        showModal={isDeleteModalShow}
        onClose={handleDeleteModal}
        modalTitle="Delete Data Akun ?"
      >
        <div className="flex gap-x-6">
          <Button variant="filled" size="md" onClick={handleDeleteAkun}>
            Iya
          </Button>
          <Button variant="filled" size="md" onClick={handleDeleteModal}>
            Batal
          </Button>
        </div>
      </Modal>
      <Modal showModal={ModalAdd} onClose={handleModalAdd} modalTitle="Tambah Data Akun">
        <form
          onSubmit={onAddData}
          className="w-full flex flex-col justify-center items-center gap-1"
        >
          <div className="w-full">
            <TextField
              inputHeight="h-10"
              name="fullname"
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
              name="phone_number"
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
              name="password"
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
            <Button variant="filled" size="md" loading={isLoading}>
              Tambahkan
            </Button>
          </div>
        </form>
      </Modal>
    </Fragment>
  );
};
export default Table;
