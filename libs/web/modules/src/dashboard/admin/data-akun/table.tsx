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
  TSelectOption,
} from "@uninus/web/components";
import { Control, FieldValues, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  useCreateDataUser,
  useDataUsers,
  useDeleteDataUsers,
  useGetUserRoles,
  useUpdateDataUsers,
} from "./hook";
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillFastBackward,
  AiFillFastForward,
} from "react-icons/ai";
import { PiWarningCircleBold } from "react-icons/pi";

const Table: FC = (): ReactElement => {
  const [tableAkun, setTableAkun] = useState([{}]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isDeleteModalShow, setIsDeleteModalShow] = useState<boolean>(false);
  const [ModalAdd, setModalAdd] = useState<boolean>(false);
  const [currentFullname, setCurrentFullname] = useState<string>("");
  const [currentId, setCurrentId] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);

  const { mutate: deleteUser, isLoading: deleteIsLoading } = useDeleteDataUsers();
  const { mutate: updateDataAkunUser } = useUpdateDataUsers();
  const { mutate: addDataAkunUser } = useCreateDataUser();
  const {
    data,
    isLoading: isLoadingData,
    refetch,
  } = useDataUsers({
    page: page,
    per_page: perPage,
    search: searchQuery,
  });
  const { data: getRoles } = useGetUserRoles();
  const {
    control: addControl,
    handleSubmit: addAkunHandleSubmit,
    formState: { isLoading: addAkunIsloading },
  } = useForm<TDataAkun>({
    mode: "all",
  });

  const {
    control: updateControl,
    handleSubmit: updateSubmit,
    formState: { isLoading: updateIsLoading },
    reset: updateReset,
  } = useForm<TDataAkun>({
    mode: "all",
  });

  const handleCloseModal = () => {
    setIsShowModal(!isShowModal);
  };

  const handleModalAdd = () => {
    setModalAdd(!ModalAdd);
  };

  const handleDeleteModal = () => {
    setIsDeleteModalShow(!isDeleteModalShow);
  };
  const handleDeleteAkun = (): void => {
    deleteUser(currentId, {
      onSuccess: () => {
        refetch();
        setTimeout(() => {
          toast.success("Berhasil Delete Akun", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }, 100);
        handleDeleteModal();
      },
    });
  };
  const onEditData = updateSubmit((data) => {
    try {
      updateDataAkunUser(
        {
          id: data?.id,
          fullname: data?.fullname,
          email: data?.email,
          password: data?.password,
          role_id: data?.role.id,
          phone_number: data?.phone_number,
        },
        {
          onSuccess: () => {
            refetch();
            setTimeout(() => {
              toast.success("Berhasil Update Data Akun", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }, 100);
            handleCloseModal();
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  });

  const onAddData = addAkunHandleSubmit((data) => {
    try {
      addDataAkunUser(
        {
          fullname: data?.fullname,
          email: data?.email,
          password: data?.password,
          role_id: data?.role.id,
          phone_number: data?.phone_number,
        },
        {
          onSuccess: () => {
            refetch();
            setTimeout(() => {
              toast.success("Berhasil Tambah Data Akun ", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }, 300);
            handleModalAdd();
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  });

  const selectRoleUser = getRoles?.map((role) => {
    const dataRoles = { label: role.name, value: role.id };
    return dataRoles;
  });

  const columnsAkun: TableColumn<TDataAkun>[] = useMemo(
    () => [
      {
        name: <div className="pl-4">No</div>,
        cell: (row, rowIndex) => <div className="pl-5">{rowIndex + 1}</div>,
        width: "80px",
      },
      {
        name: "Nama Lengkap",
        cell: (row) => row.fullname,
        width: "200px",
      },
      {
        name: "Role",
        cell: (row) => row.role.name,
        width: "200px",
      },
      {
        name: "No Telp",
        cell: (row) => row.phone_number,
        width: "200px",
      },
      {
        name: "Email",
        cell: (row) => row.email,
        width: "200px",
      },
      {
        name: <div className="w-full mr-10 text-center">Tindakan</div>,
        width: "250px",
        cell: (row) => (
          <div className="flex gap-2 w-full ml-10">
            <button
              onClick={handleCloseModal}
              className="flex gap-2 bg-primary-green text-primary-white rounded-md p-1 px-3 items-center"
              key="modal-edit-data"
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
                setCurrentFullname(row.fullname);
                handleDeleteModal();
              }}
              key="modal-delete-user"
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
    setTableAkun(columnsAkun);
  }, [columnsAkun, tableAkun]);

  const handleSearch = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Fragment>
      <section className="rounded-lg w-full">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
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
          fixedHeaderScrollHeight="400px"
          progressPending={isLoadingData}
          progressComponent={<TableLoadingData className="w-full h-80" />}
          noDataComponent={
            <div className="flex flex-col w-full h-screen justify-center items-center">
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
          responsive
        />
      </section>
      <Modal
        key="modal-edit-user"
        showModal={isShowModal}
        onClose={handleCloseModal}
        modalTitle="Edit Data Akun"
        modalFooter={false}
      >
        <form
          onSubmit={onEditData}
          className="w-full flex flex-col justify-center items-center gap-y-[2px]"
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
              labels="Role"
              className="text-left mb-2"
              labelClassName="text-left font-bold text-xs mb-2"
              control={updateControl as unknown as Control<FieldValues>}
              name="role.id"
              options={selectRoleUser as unknown as TSelectOption[]}
              isMulti={false}
              isClearable={true}
              required={true}
              status="error"
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
              placeholder="85797807376"
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
          <div className="w-full">
            <TextField
              inputHeight="h-10"
              name="password"
              variant="sm"
              type="text"
              labelclassname="text-sm font-semibold"
              label="Password"
              placeholder="********"
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
        modalTitle="Hapus Akun"
      >
        <div className="flex flex-col text-base items-center gap-2 -mt-9">
          <PiWarningCircleBold className="text-primary-yellow text-center mx-auto text-[5rem] md:text-[7rem]" />
          <h1 className="text-[10px] md:text-base">
            Apakah anda yakin ingin menghapus akun
            <span className="text-red-5 font-semibold"> {currentFullname}</span> ?
          </h1>
        </div>
        <div className="flex gap-x-6 justify-center">
          <Button
            loading={deleteIsLoading}
            width="w-20 md:w-24"
            variant="filled"
            size="md"
            onClick={handleDeleteAkun}
          >
            Iya
          </Button>
          <Button
            variant="green-outline"
            width="w-20 md:w-24"
            size="md"
            onClick={handleDeleteModal}
          >
            Batal
          </Button>
        </div>
      </Modal>
      <Modal
        key="modal-add-user"
        showModal={ModalAdd}
        onClose={handleModalAdd}
        modalTitle="Tambah Data Akun"
        modalFooter={false}
      >
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
              control={addControl}
            />
          </div>
          <div className="w-full">
            <SelectOption
              labels="Role"
              className="text-left mb-2"
              labelClassName="text-left font-bold text-xs mb-2"
              control={addControl as unknown as Control<FieldValues>}
              name="role.id"
              options={selectRoleUser as unknown as TSelectOption[]}
              isMulti={false}
              isClearable={true}
              required={true}
              status="error"
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
              control={addControl}
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
              control={addControl}
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
              control={addControl}
            />
          </div>

          <div className="w-full flex justify-end items-center gap-3 py-2">
            <Button variant="filled" size="md" loading={addAkunIsloading}>
              Tambahkan
            </Button>
          </div>
        </form>
      </Modal>
    </Fragment>
  );
};
export default Table;
