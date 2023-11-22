"use client";
import { FC, ReactElement, useEffect, useState, SetStateAction, Fragment, useMemo } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { TColumnPegawai, TDataPegawai } from "./types";
import { dataPegawai } from "./store";
import {
  TableLoadingData,
  SearchInput,
  Button,
  Modal,
  TSelectOption,
  SelectOption,
} from "@uninus/web/components";
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillCopy,
  AiFillFastBackward,
  AiFillFastForward,
  AiFillFileText,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineFileSearch,
  AiOutlineFilter,
  AiOutlinePlus,
} from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

const Table: FC = (): ReactElement => {
  const [tablePegawai, setTablePegawai] = useState([{}]);
  const [conditionModal, setConditionModal] = useState<string | null | undefined>(null);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState<number | null>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [pending, setPending] = useState(true);

  const { control, setValue } = useForm({
    mode: "all",
  });

  const onCloseModal = () => {
    setShowModal(false);
  };

  const statusOptions: TSelectOption[] = useMemo(
    () => [
      { label: "Cuti", value: "cuti" },
      { label: "Aktif", value: "aktif" },
      { label: "Sakit", value: "sakit" },
      { label: "Tidak Aktif", value: "tidak_aktif" },
    ],
    [],
  );

  const statusSelect = useMemo(() => {
    const colorsStatus = ["#FFE9C8", "#E6F5ED", "#D34B21", "#FBE8D9"];
    const textColorsStatus = ["#FFA41B", "#009647", "#FDF6EF", "#D34B21"];
    return statusOptions?.map((option, idx) => ({
      label: option?.label,
      value: option?.value,
      color: colorsStatus[idx],
      textColor: textColorsStatus[idx],
    }));
  }, [statusOptions]);

  const dataTableModal = dataPegawai?.find((item) => item.name === conditionModal);

  useEffect(() => {
    dataPegawai.map((item, i) => {
      return setValue(`status_${item.name}`, item.status);
    });
  }, [page]);

  const dataPegawaiModal: TColumnPegawai[] = [
    {
      name: <span className="text-base font-medium pl-2">Nama</span>,
      item: <span className="text-base font-medium">: {dataTableModal?.name}</span>,
    },
    {
      name: <span className="text-base font-medium pl-2">NIP</span>,
      item: <span className="text-base font-medium">: {dataTableModal?.nip}</span>,
    },
    {
      name: <span className="text-base font-medium pl-2">Status Tendik</span>,
      item: (
        <div className="w-full flex items-center text-base font-medium">
          :
          <Link href={`${dataTableModal?.tendik_status?.[0].link}`} target="_blank">
            <AiFillFileText className="text-2xl text-primary-green cursor-pointer" />
          </Link>
          <h3 className="ml-4">{dataTableModal?.tendik_status?.[0].nama}</h3>
        </div>
      ),
    },
    {
      name: <span className="text-base font-medium pl-2">SK Pengangkatan</span>,
      item: (
        <div className="w-full flex items-center text-base font-medium">
          :
          <Link href={`${dataTableModal?.sk_pengangkatan}`} target="_blank">
            <AiFillFileText className="text-2xl text-primary-green cursor-pointer" />
          </Link>
        </div>
      ),
    },
    {
      name: <span className="text-base font-medium pl-2">Lingkup Kerja</span>,
      item: (
        <div className="w-full flex items-center text-base font-medium">
          :
          <Link href={`${dataTableModal?.lingkup_kerja?.[0].link}`} target="_blank">
            <AiFillFileText className="text-2xl text-primary-green cursor-pointer" />
          </Link>
          <h3 className="ml-4">{dataTableModal?.lingkup_kerja?.[0].nama}</h3>
        </div>
      ),
    },
    {
      name: <span className="text-base font-medium pl-2">Unit Kerja</span>,
      item: (
        <div className="w-full flex items-center text-base font-medium">
          :
          <Link href={`${dataTableModal?.unit_kerja?.[0].link}`} target="_blank">
            <AiFillFileText className="text-2xl text-primary-green cursor-pointer" />
          </Link>
          <h3 className="ml-4">{dataTableModal?.unit_kerja?.[0].nama}</h3>
        </div>
      ),
    },
    {
      name: <span className="text-base font-medium pl-2">Tugas Tambahan</span>,
      item: (
        <div className="w-full flex items-center text-base font-medium">
          :
          <Link href={`${dataTableModal?.tugas_tambahan?.[0].link}`} target="_blank">
            <AiFillFileText className="text-2xl text-primary-green cursor-pointer" />
          </Link>
          <h3 className="ml-4">{dataTableModal?.tugas_tambahan?.[0].nama}</h3>
        </div>
      ),
    },

    {
      name: <span className="text-base font-medium pl-2">Sertifikat Profesi</span>,
      item: (
        <div className="w-full flex items-center text-base font-medium">
          :
          <Link href={`${dataTableModal?.sertifikat_profesi}`} target="_blank">
            <AiFillFileText className="text-2xl text-primary-green cursor-pointer" />
          </Link>
        </div>
      ),
    },
  ];

  const columns: TableColumn<TDataPegawai>[] = [
    {
      name: <div className="pl-4">No</div>,
      cell: (row, rowIndex) => <div className="pl-5">{rowIndex + 1}</div>,
      width: "70px",
    },
    {
      name: "Nama Dosen",
      cell: (row) => <div className="text-left">{row.name}</div>,
      width: "180px",
    },
    {
      name: "NIP",
      cell: (row) => row.nip,
      width: "150px",
    },
    {
      name: "Lingkup Kerja",
      cell: (row) => (
        <div className="flex flex-col gap-1 text-left">{row.lingkup_kerja?.[0]?.nama}</div>
      ),
      width: "150px",
    },
    {
      name: "Unit Kerja",
      cell: (row) => (
        <div className="flex flex-col gap-1 text-left">{row.unit_kerja?.[0]?.nama}</div>
      ),
      width: "240px",
    },
    {
      name: <div className="pl-2">Keterangan</div>,
      cell: (row) => (
        <SelectOption
          name={`status_${row.name}`}
          placeholder={"Status pelamar"}
          renderSelectColor
          options={statusSelect || []}
          isClearable={false}
          isSearchable={false}
          control={control}
          isMulti={false}
          size="sm"
          className="w-full md:w-[150px] mb-3 duration-300 font-semibold"
        />
      ),
      width: "200px",
    },
    {
      name: "Tindakan",
      cell: (row) => (
        <div className="flex gap-2 w-full">
          <Button variant="filled" height="h-6" width="w-20">
            <AiOutlineEdit className="text-lg text-primary-white cursor-pointer" />
            <span className="pl-2 text-[10px]">Edit</span>
          </Button>
          <Button
            variant="filled"
            height="h-6"
            width="w-24"
            styling="bg-secondary-green-4 hover:bg-secondary-green-5"
            onClick={() => {
              setShowModal(true);
              setConditionModal(row?.name);
            }}
          >
            <AiOutlineFileSearch className="text-lg text-primary-white cursor-pointer" />
            <span className="pl-2 text-[10px]">Detail</span>
          </Button>
          <Button variant="filled" height="h-6" width="w-32" styling="bg-red-7 hover:bg-red-6">
            <AiOutlineDelete className="text-lg text-primary-white cursor-pointer" />
            <span className="pl-2 text-[10px]">Hapus Data</span>
          </Button>
        </div>
      ),
      width: "350px",
    },
  ];

  const columnsModal: TableColumn<TColumnPegawai>[] = [
    {
      cell: (row) => row.name,
      width: "200px",
    },
    {
      cell: (row) => row.item,
      width: "250px",
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

  const customStylesTableModal = {
    rows: {
      style: {
        width: "100%",
        minHeight: "35px",
        background: "#F5F5F5",
      },
      stripedStyle: {
        background: "#FFFFFF",
      },
    },
    cells: {
      style: {
        padding: "10px",
      },
    },
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTablePegawai(columns);
      setPending(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, [tablePegawai]);

  const filteredDataPegawai = dataPegawai.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nip.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSearch = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Fragment>
      <Modal
        modalTitle="Detail Data Tendik"
        titleColor="black"
        headerColor="white"
        closeClassName="text-primary-black"
        showModal={showModal}
        onClose={onCloseModal}
        bodyClassName="flex w-full h-auto flex-col px-10 justify-center items-center"
        className="max-w-xl max-h-full rounded-lg bg-primary-white"
      >
        <figure className="flex justify-center items-center mt-4">
          <Image
            src={"/illustrations/dummy-avatar.webp"}
            alt="foto"
            width={500}
            height={500}
            quality={100}
            className="w-[40%] h-[40%] rounded-full"
          />
        </figure>
        <section className="rounded-lg w-full my-5">
          <DataTable
            columns={columnsModal}
            data={dataPegawaiModal}
            customStyles={customStylesTableModal}
            progressPending={pending}
            noTableHead
            striped
            fixedHeader
            fixedHeaderScrollHeight="400px"
            progressComponent={<TableLoadingData className="w-full h-80" />}
            noDataComponent={
              <div className="flex flex-col w-full h-80 justify-center items-center">
                <h1 className="font-bold my-2">Data Tidak Tersedia</h1>
                <p>Table akan ditampilkan apabila sudah tersedia data yang diperlukan</p>
              </div>
            }
          />
        </section>
      </Modal>

      {/* TAble */}
      <section className="rounded-lg w-full px-5 lg:px-0">
        <div className="w-full flex flex-wrap p-2 py-4 gap-4 lg:justify-end justify-start items-center">
          <Button variant="outlined" height="h-9" width="w-24">
            <AiOutlineFilter className="text-lg text-primary-black" />
            <span className="text-sm font-medium pl-2 text-primary-black">Filter</span>
          </Button>
          <SearchInput
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Cari Nama, NIP/NIDN, dan Status"
            width="w-[100%] md:w-[350px]"
          />
          <Button variant="filled" height="h-9">
            <AiOutlinePlus className="text-lg" />
            <span className="text-sm font-medium pl-2">Tambah Pegawai</span>
          </Button>
          <Button variant="filled" height="h-9">
            <AiFillCopy className="text-lg" />
            <span className="text-sm font-medium pl-2">Export</span>
          </Button>
        </div>
        <DataTable
          columns={columns}
          data={filteredDataPegawai}
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
          onChangePage={(page) => setPage(page)}
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
