import { FC, ReactElement, useEffect, useState, SetStateAction, Fragment } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { TDataSoal } from "./types";
import { dataSoal } from "./store";
import { TableLoadingData, SearchInput, Button, Modal } from "@uninus/web/components";
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
import { BiErrorCircle } from "react-icons/bi";

const TableKuesioner: FC = (): ReactElement => {
  const [tableQuestion, setTableQuestion] = useState([{}]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pending, setPending] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isConfirmDeleteModal, setIsConfirmDeleteModal] = useState(false);

  const handleCloseConfirmDelete = () => {
    setIsConfirmDeleteModal(!isConfirmDeleteModal);
  };

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

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
          <Button onClick={handleEdit} variant="filled" height="h-6" width="w-20">
            <AiOutlineEdit className="text-lg text-primary-white cursor-pointer" />
            <span className="pl-2 text-[10px]">Edit</span>
          </Button>

          <Button
            onClick={() => {
              setIsConfirmDeleteModal(true);
            }}
            variant="filled"
            height="h-6"
            width="w-32"
            styling="bg-red-3 hover:bg-red-5 focus:bg-red-5"
          >
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

  const filteredDataQuestion = dataSoal.filter(
    (item) =>
      item.soal.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.kategori.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSearch = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Fragment>
      <Modal
        modalTitle="Tambah Pertanyaan"
        titleColor="white"
        headerColor="green"
        closeClassName="text-primary-white"
        showModal={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        bodyClassName="flex w-full h-auto flex-col px-4 "
        className="max-w-xl h-auto rounded-lg bg-primary-white"
      >
        <section className="py-4">
          <div className="text-md font-bold">Buat Pertanyaan Baru</div>
          <div className="py-2">
            <h1>Masukan Pertanyaan : </h1>
            <input
              type="text"
              className="w-full rounded-md p-2 border border-slate-4"
              placeholder="Bagaimana interaksi deosen terhadap mahasiswa?"
            />
          </div>
          <div className="py-2">
            <h1>Masukan Kategori : </h1>
            <select name="kategori" id="" className="w-full rounded-md p-2 border border-slate-4">
              <option value="Reability">Reability</option>
              <option value="Responsiveness">Responsiveness</option>
              <option value="Assurance">Assurance</option>
              <option value="Empathy">Empathy</option>
              <option value="Tangible">Tangible</option>
            </select>
          </div>
          <div className="flex flex-row justify-end py-4 gap-x-4">
            <Button variant="filled" width="w-36" height="h-6" type="submit">
              Simpan
            </Button>
          </div>
        </section>
      </Modal>
      {/* Table */}
      <section className="rounded-lg w-full px-5 lg:px-0">
        <div className="w-full flex flex-wrap p-2 py-4  justify-between items-center">
          <div className="flex gap-4">
            <Button
              onClick={() => {
                setShowModal(true);
              }}
              variant="filled"
              height="h-9"
            >
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
              width="w-[450px]"
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
      {/* edit */}
      <Modal
        modalTitle="Edit Pertanyaan"
        titleColor="white"
        headerColor="green"
        closeClassName="text-primary-white"
        showModal={isEdit}
        onClose={() => {
          setIsEdit(false);
        }}
        bodyClassName="flex w-full h-auto flex-col px-4 "
        className="max-w-xl h-auto rounded-lg bg-primary-white"
      >
        <section className="py-4">
          <div className="text-md font-bold">Buat Pertanyaan Baru</div>
          <div className="py-2">
            <h1>Masukan Pertanyaan : </h1>
            <input
              type="text"
              className="w-full rounded-md p-2 border border-slate-4"
              placeholder="Bagaimana interaksi deosen terhadap mahasiswa?"
            />
          </div>
          <div className="py-2">
            <h1>Masukan Kategori : </h1>
            <select name="kategori" id="" className="w-full rounded-md p-2 border border-slate-4">
              <option value="Reability">Reability</option>
              <option value="Responsiveness">Responsiveness</option>
              <option value="Assurance">Assurance</option>
              <option value="Empathy">Empathy</option>
              <option value="Tangible">Tangible</option>
            </select>
          </div>
          <div className="flex flex-row justify-end py-4 gap-x-4">
            <Button variant="filled" width="w-36" height="h-6" type="submit">
              Simpan
            </Button>
          </div>
        </section>
      </Modal>
      {/* delete */}
      <Modal
        showModal={isConfirmDeleteModal}
        onClose={() => {
          setIsConfirmDeleteModal(false);
        }}
        iconClose={false}
        size="sm"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex gap-y-6  justify-center items-center flex-col ">
            <BiErrorCircle className="text-red-4 text-9xl" />
            <div className="flex flex-col items-center gap-y-4 px-5">
              <div className="text-center">
                <h1 className="text-xl font-bold">Perhatian</h1>
                <p>Apakah Anda ingin menghapus data ini?</p>
              </div>

              <div className="flex flex-row justify-end py-4 gap-x-4">
                <Button
                  variant="filled"
                  width="w-36"
                  height="h-6"
                  onClick={handleCloseConfirmDelete}
                >
                  Batal
                </Button>
                <Button
                  variant="filled"
                  width="w-36"
                  height="h-6"
                  type="submit"
                  styling="bg-red-3 hover:bg-red-5 focus:bg-red-5"
                >
                  Hapus
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </Fragment>
  );
};
export default TableKuesioner;
