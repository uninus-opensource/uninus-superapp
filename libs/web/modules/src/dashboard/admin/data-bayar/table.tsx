"use client";
import { FC, ReactElement, useState, useEffect, SetStateAction } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { TDataBayar, TTabSection } from "./types";
import { dataBayar } from "./store";
import {
  TableLoadingData,
  // SearchInput,
  Button,
  Modal,
  TextField,
  RadioButton,
  Accordion,
  SearchInput,
} from "@uninus/web/components";
import { AuditOutlined } from "@ant-design/icons";
import { match } from "ts-pattern";
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillFastBackward,
  AiFillFastForward,
  AiOutlineFilter,
} from "react-icons/ai";
import { useForm } from "react-hook-form";

const Table: FC = (): ReactElement => {
  const [tableAkun, setTableAkun] = useState([{}]);
  const [isActive, setIsActive] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAccept, SetIsAccept] = useState<string | null>(null);
  const [pending, setPending] = useState(true);
  const [isValidModalShow, setIsValidModalShow] = useState<boolean>(false);
  const { control } = useForm();
  const columnsAkun: TableColumn<TDataBayar>[] = [
    {
      name: "No",
      cell: (row, rowIndex) => <div className="px-1">{rowIndex + 1}</div>,
      width: "5%",
    },
    {
      name: "Tanggal Pengajuan",
      cell: (row) => row.date_pengajuan as string,
      width: "15%",
    },
    {
      name: "Nama Pengajuan",
      cell: (row) => row.nama_pengajuan,
      width: "20%",
    },
    {
      name: "Nama Petugas",
      cell: (row) => row.nama_petugas,
      width: "25%",
    },
    {
      name: "Status",
      cell: (row) => (
        <button
          className={`${match(row.status)
            .with("Sudah Disetujui", () => "bg-[#CCEADA] text-grayscale-9")
            .with("Belum Disetujui", () => "bg-[#FFF6DC] text-[#FFC107]")
            .otherwise(
              () => "bg-red-3 text-red-5",
            )} text-white w-[150px] py-1 text-sm text-center rounded-md cursor-default`}
        >
          {row.status}
        </button>
      ),
      width: "200px",
    },
    {
      name: "Action",

      cell: (row) => (
        <div className="flex gap-2 w-full">
          <button
            onClick={handleShowModal}
            className="flex w-full gap-2 bg-primary-yellow  rounded-md p-1 px-1 items-center justify-center"
          >
            <div>
              <AuditOutlined />
            </div>
            Validasi
          </button>
        </div>
      ),
    },
  ];
  const handleShowModal = () => {
    setIsValidModalShow(!isValidModalShow);
  };
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
  }, [tableAkun]);

  const filteredDataAkun = dataBayar.filter(
    (item) =>
      item.nama_pengajuan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nama_petugas.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSearch = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchQuery(event.target.value);
  };
  const handleCloseModal = () => {
    setIsValidModalShow(false);
  };
  const tabList: TTabSection[] = [
    {
      no: 1,
      item: "Biaya Formulir",
    },
    {
      no: 2,
      item: "Uang Kuliah Tunggal",
    },
  ];
  return (
    <div>
      <Modal
        key="modal-edit-data"
        showModal={isValidModalShow}
        onClose={handleCloseModal}
        modalTitle="Validasi Pengajuan Dana"
        titleColor="black"
        iconClose={false}
        headerColor="white"
      >
        <div className="flex justify-between w-full items-center h-[52px] rounded-md shadow-md my-4 p-2 ">
          <section className="flex justify-between text-md gap-4 text-slate-5">
            {tabList.map((list, idx) => (
              <div
                key={idx}
                onClick={() => setIsActive(list.no)}
                className={`px-[4rem]  py-3 flex justify-center items-center hover:shadow-md hover:rounded-md hover:text-primary-green cursor-pointer ${
                  isActive === list.no ? "text-primary-green shadow-md rounded md" : ""
                }`}
              >
                {list.item}
              </div>
            ))}
          </section>
        </div>{" "}
        <div className="flex flex-col justify-center gap-2 text-sm">
          <div className={isActive === 1 ? "block" : "hidden"}>
            <TextField
              name="s1"
              label="Biaya Formulir - Program Sarjana(S1)"
              variant="lg"
              placeholder="Biaya Formulir - Program Sarjana(1)"
              control={control}
            />
            <TextField
              name="s2"
              label="Biaya Formulir - Program Pascarjana(S2)"
              variant="lg"
              placeholder="Biaya Formulir - Program PascaSarjana(S2)"
              control={control}
            />
            <TextField
              name="s3"
              label="Biaya Formulir - Program Pascarjana(S3)"
              variant="lg"
              placeholder="Biaya Formulir - Program Sarjana(S3)"
              control={control}
            />
            <p>Persetujuan</p>
            <div className="flex flex-col gap-y-2">
              <RadioButton
                name="difabel"
                label="Ya"
                control={control}
                options={[
                  { label: "Disetujui", value: "Ya" },
                  { label: "Tidak Disetujui", value: "Tidak" },
                ]}
                size="lg"
                variant="primary"
                onChange={(e) => SetIsAccept(e.target.value)}
              />
              {isAccept === "Tidak" && (
                <TextField
                  name="school_address"
                  variant="sm"
                  type="text"
                  labelclassname="text-xl font-semibold"
                  label="Alasan Tidak Disetujui"
                  control={control}
                  isTextArea
                  textAreaRow={5}
                  textAreaCols={30}
                  inputHeight="h-20"
                  inputWidth="md:w-[80vw] lg:w-[60vw] w-[70vw]"
                  className="resize-none bg-grayscale-2  "
                  disabled
                />
              )}
            </div>
            <div className="flex gap-x-6  justify-end">
              <Button variant="filled-red" width="w-36" height="h-6" onClick={handleCloseModal}>
                Batal
              </Button>
              <Button variant="filled" width="w-36" height="h-6" onClick={handleCloseModal}>
                Simpan
              </Button>
            </div>
          </div>
          <div className={isActive === 2 ? " flex flex-col gap-y-6 " : "hidden"}>
            <Accordion
              key="data-diri-section"
              title="Program Sarjana(S1)"
              titleClassName="lg:text-lg text-md font-extrabold text-secondary-green-4"
              className="w-full h-auto mt-[2rem] flex flex-col gap-5 items-center lg:items-baseline  xl:ml-[5vw] pb-6 md:pb-0"
            >
              <p className="ml-[3vw]">Fakultas </p>
              <div className=" px-5 flex flex-col gap-y-4 md:flex-row md:w-full md:px-0 md:justify-center gap-x-6">
                <TextField
                  placeholder="Nomor Handphone"
                  name="phone_number"
                  label="Nomor Handphone"
                  labelclassname="text-xl font-semibold"
                  variant="sm"
                  required
                  disabled
                  inputWidth="w-full md:w-[33vw] lg:w-[23vw] xl:w-[25vw]"
                  inputHeight="h-10"
                  type="text"
                  control={control}
                />
                <TextField
                  placeholder="Nomor Handphone"
                  name="phone_number"
                  label="Nomor Handphone"
                  labelclassname="text-xl font-semibold"
                  variant="sm"
                  required
                  disabled
                  inputWidth="w-full md:w-[33vw] lg:w-[23vw] xl:w-[25vw]"
                  inputHeight="h-10"
                  type="text"
                  control={control}
                />
              </div>
            </Accordion>
            <Accordion
              key="data-diri-section"
              title="Program Pascarjana(S2 S3)"
              titleClassName="lg:text-lg text-md font-extrabold text-secondary-green-4"
              className="w-full h-auto mt-[2rem] flex flex-col gap-5 items-center lg:items-baseline  xl:ml-[5vw] pb-6 md:pb-0"
            >
              <p className="ml-[3vw]">Fakultas </p>
              <div className=" px-5 flex flex-col gap-y-4 md:flex-row md:w-full md:px-0 md:justify-center gap-x-6">
                <TextField
                  placeholder="Nomor Handphone"
                  name="phone_number"
                  label="Nomor Handphone"
                  labelclassname="text-xl font-semibold"
                  variant="sm"
                  required
                  disabled
                  inputWidth="w-full md:w-[33vw] lg:w-[23vw] xl:w-[25vw]"
                  inputHeight="h-10"
                  type="text"
                  control={control}
                />
                <TextField
                  placeholder="Nomor Handphone"
                  name="phone_number"
                  label="Nomor Handphone"
                  labelclassname="text-xl font-semibold"
                  variant="sm"
                  required
                  disabled
                  inputWidth="w-full md:w-[33vw] lg:w-[23vw] xl:w-[25vw]"
                  inputHeight="h-10"
                  type="text"
                  control={control}
                />
              </div>
            </Accordion>
            <div className="flex gap-x-6  justify-end">
              <Button variant="filled-red" width="w-36" height="h-6" onClick={handleCloseModal}>
                Batal
              </Button>
              <Button variant="filled" width="w-36" height="h-6" onClick={handleCloseModal}>
                Simpan
              </Button>
            </div>
          </div>
        </div>
      </Modal>
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
    </div>
  );
};
export default Table;
