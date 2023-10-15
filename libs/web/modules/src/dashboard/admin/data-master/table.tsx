"use client";
import { FC, ReactElement, useEffect, useState, SetStateAction, Fragment, useMemo } from "react";
import { FieldValues, useForm } from "react-hook-form";
import DataTable, { TableColumn } from "react-data-table-component";
import { motion } from "framer-motion";
import { TDataMaster } from "./type";
import { dataMaster } from "./store";
import {
  TableLoadingData,
  SearchInput,
  Button,
  Modal,
  SelectOption,
  TextField,
} from "@uninus/web/components";
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillFastBackward,
  AiFillFastForward,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineFileDone,
  AiOutlineFileSearch,
  AiOutlinePlus,
} from "react-icons/ai";

import {
  useDepartmentCreate,
  useDepartmentDelete,
  useDepartmentUpdate,
  useFacultyCreate,
  useFacultyDelete,
  useFacultyUpdate,
  useGetBeasiswa,
  useGetEducation,
  useGetFaculties,
  useGetProdi,
  useGetSeleksi,
  useProgramGet,
  useScholarshipCreate,
  useScholarshipDelete,
  useScholarshipUpdate,
  useSelectionCreate,
  useSelectionDelete,
  useSelectionUpdate,
} from "./hook";
import { match } from "ts-pattern";
import { useCityGet, useProvinceGet, useSubdistrictGet } from "@uninus/web/services";
import { BiErrorCircle } from "react-icons/bi";

const Table: FC = (): ReactElement => {
  const [tableMaster, setTableMaster] = useState([{}]);
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
  const [isAddModalShow, setIsAddModalShow] = useState<boolean>(false);
  const [isDeleteModalShow, setIsDeleteModalShow] = useState<boolean>(false);
  const [isEditModalShow, setIsEditModalShow] = useState<boolean>(false);
  const [isDetailModalShow, setIsDetailModalShow] = useState<boolean>(false);
  const [isConfirmDeleteModal, setIsConfirmDeleteModal] = useState<boolean>(false);
  const [isSuccesDeleteModal, setIsSuccesDeleteModal] = useState<boolean>(false);
  const [isSuccesAddModal, setIsSuccesAddModal] = useState<boolean>(false);
  const [isSuccesUpdateModal, setIsSuccesUpdateModal] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<TDataMaster | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [pending, setPending] = useState(true);
  const [locationMeta] = useState({
    search: "",
    province_id: "",
    city_id: "",
  });
  const {
    control,
    handleSubmit,
    watch,
    reset: addReset,
    formState: { isLoading: isLoadingAdd },
  } = useForm<FieldValues>({
    mode: "all",
  });
  const {
    control: deleteControl,
    handleSubmit: deleteSubmit,
    reset: deleteReset,
  } = useForm<FieldValues>({
    mode: "all",
  });
  const {
    control: updateControl,
    handleSubmit: updateSubmit,
    reset: updateReset,
  } = useForm<FieldValues>({
    mode: "all",
  });
  const handleDeleteModal = (name: string) => {
    const Selected = dataMaster.find((item) => item.name === name);
    setActiveItem(Selected || null);
    setIsDeleteModalShow(!isDeleteModalShow);
    setIsConfirmDeleteModal(false);
  };
  const handleCloseDeleteModal = () => {
    setIsDeleteModalShow(!isDeleteModalShow);
  };
  const handleOpenModal = (name: string) => {
    const Selected = dataMaster.find((item) => item.name === name);
    setActiveItem(Selected || null);
    setIsEditModalShow(!isEditModalShow);
  };
  const handleOpenModalDetail = (name: string) => {
    const Selected = dataMaster.find((item) => item.name === name);
    setActiveItem(Selected || null);
    setIsDetailModalShow(!isDetailModalShow);
  };
  const handleCloseModalDetail = () => {
    setIsDetailModalShow(!isDetailModalShow);
  };
  const handleCloseConfirmDelete = () => {
    setIsConfirmDeleteModal(!isConfirmDeleteModal);
  };
  const handleCloseModal = () => {
    setIsEditModalShow(!isEditModalShow);
  };
  const handleOpenModalAdd = (name: string) => {
    const Selected = dataMaster.find((item) => item.name === name);
    setActiveItem(Selected || null);
    setIsAddModalShow(!isAddModalShow);
  };
  const handleCloseModalAdd = () => {
    setIsAddModalShow(!isAddModalShow);
  };
  const generateOptions = () => {
    if (activeItem) {
      const currentData = activeItem.current_data || [];
      const newOptions = currentData.map((item) => ({
        label: item.data,
        value: item.data,
      }));
      setOptions(newOptions);
    } else {
      setOptions([]);
    }
  };
  useEffect(() => {
    generateOptions();
  }, [activeItem]);
  const { data: getFaculties, refetch: refetchFaculty } = useGetFaculties({
    degree_program_id: watch("degree_program_id"),
    search: "",
  });

  const faculty = useMemo(
    () =>
      getFaculties?.faculty?.map((fakultas) => ({
        label: fakultas?.name,
        value: fakultas?.id.toString(),
      })),
    [getFaculties?.faculty],
  );
  const { data: getSubdistrictSchool } = useSubdistrictGet({
    city_id: watch("city"),
    search: "",
  });

  const subDistrictOptions = useMemo(
    () =>
      getSubdistrictSchool?.subdistrict?.map((subdistrict) => ({
        label: subdistrict?.name,
        value: subdistrict?.id.toString(),
      })),
    [getSubdistrictSchool?.subdistrict],
  );
  const { data: getCitySchool } = useCityGet({
    province_id: watch("province"),
    search: "",
  });

  const citySchoolOptions = useMemo(
    () =>
      getCitySchool?.city?.map((city) => ({
        label: city?.name,
        value: city?.id.toString(),
      })),
    [getCitySchool?.city],
  );
  const { data: getProvincies } = useProvinceGet(locationMeta);

  const schoolProvinceOptions = useMemo(
    () =>
      getProvincies?.province?.map((province) => ({
        label: province?.name,
        value: province?.id.toString(),
      })),
    [getProvincies?.province],
  );

  const { data: getProdi, refetch: refetchDepartment } = useGetProdi();
  const prodi = useMemo(
    () =>
      getProdi?.department?.map((prodi) => ({
        label: prodi?.name,
        value: prodi?.id.toString(),
      })),
    [getProdi?.department],
  );

  const { data: getSeleksi, refetch: refetchSelection } = useGetSeleksi();
  const seleksi = useMemo(
    () =>
      getSeleksi?.selection?.map((seleksi) => ({
        label: seleksi?.name,
        value: seleksi?.id.toString(),
      })),
    [getSeleksi?.selection],
  );
  const { data: getEducation } = useGetEducation();
  const education = useMemo(
    () =>
      getEducation?.school_type?.map((education) => ({
        label: education?.name,
        value: education?.id.toString(),
      })),
    [getEducation?.school_type],
  );
  const { data: getDegreProgram } = useProgramGet();
  const degreProgram = useMemo(
    () =>
      getDegreProgram?.degree_program?.map((degreProgram) => ({
        label: degreProgram?.name,
        value: degreProgram?.id.toString(),
      })),
    [getDegreProgram?.degree_program],
  );
  const { mutate: createScholarship } = useScholarshipCreate();
  const { mutate: createDepartment } = useDepartmentCreate();
  const { data: getBeasiswa, refetch: refetchScholarship } = useGetBeasiswa();
  // const { mutate: createSchool } = useSchoolCreate();
  const { mutate: createSelection } = useSelectionCreate();
  const { mutate: createFaculty } = useFacultyCreate();
  const { mutate: deleteFaculty } = useFacultyDelete();
  const { mutate: deleteScholarship } = useScholarshipDelete();
  const { mutate: deleteSelection } = useSelectionDelete();
  const { mutate: deleteDepartment } = useDepartmentDelete();
  const { mutate: updateScholarship } = useScholarshipUpdate();
  const { mutate: updateDepartment } = useDepartmentUpdate();
  const { mutate: updateFaculty } = useFacultyUpdate();
  const { mutate: updateSelection } = useSelectionUpdate();
  const beasiswa = useMemo(
    () =>
      getBeasiswa?.scholarship?.map((beasiswa) => ({
        label: beasiswa?.name,
        value: beasiswa?.id.toString(),
      })),
    [getBeasiswa?.scholarship],
  );
  useEffect(() => {
    if (isSuccesDeleteModal === true) {
      const timeout = setTimeout(() => {
        setIsSuccesDeleteModal(false);
      }, 2000);

      return () => {
        clearTimeout(timeout);
      };
    }
    if (isSuccesAddModal === true) {
      const timeout = setTimeout(() => {
        setIsSuccesAddModal(false);
      }, 2000);
      return () => {
        clearTimeout(timeout);
      };
    }
    if (isSuccesUpdateModal === true) {
      const timeout = setTimeout(() => {
        setIsSuccesUpdateModal(false);
      }, 2000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isSuccesDeleteModal, isSuccesAddModal, isSuccesUpdateModal]);
  const handleCloseSuccesDelete = () => {
    setIsSuccesDeleteModal(false);
  };
  const handleCloseSuccesAdd = () => {
    setIsSuccesAddModal(false);
  };
  const handleCloseSuccesUpdate = () => {
    setIsSuccesUpdateModal(false);
  };
  const onSubmit = handleSubmit((data) => {
    try {
      match(activeItem?.title)
        .with("scholarship", () => {
          createScholarship(
            {
              name: data.scholarship,
            },
            {
              onSuccess: () => {
                setIsSuccesAddModal(true);
                refetchScholarship();
                setIsAddModalShow(false);
              },
            },
          );
        })
        .with("department", () => {
          createDepartment(
            {
              name: data.department,
              degree_program_id: Number(data.degree_program_id),
              faculty_id: Number(data.faculty_id),
            },
            {
              onSuccess: () => {
                setIsSuccesAddModal(true);
                refetchDepartment();

                setIsAddModalShow(false);
              },
            },
          );
        })
        // .with("school_type", () => {
        //   createSchool({
        //     name: data.name,
        //     npsn: data.npsn,
        //     province: data.province,
        //     district_city: data.city,
        //     sub_district: data.subdistrict,
        //     street_address: data.address,
        //     education_type_id: data.education_type,
        //   });
        // })
        .with("selection_path", () => {
          createSelection(
            {
              name: data.selection_path,
              degree_program_id: Number(data.degree_program_id),
            },
            {
              onSuccess: () => {
                setIsSuccesAddModal(true);
                refetchSelection();
                setIsAddModalShow(false);
              },
            },
          );
        })
        .otherwise(() => {
          createFaculty(
            {
              name: data.faculty,
              degree_program_id: Number(data.degree_program_id),
            },
            {
              onSuccess: () => {
                setIsSuccesAddModal(true);
                refetchFaculty();
                setIsAddModalShow(false);
              },
            },
          );
        });
    } catch (error) {
      console.error(error);
    }
  });
  const onDeleteData = deleteSubmit((data) => {
    try {
      match(activeItem?.title)
        .with("faculty", () => {
          deleteFaculty(Number(data.id), {
            onSuccess: () => {
              setIsSuccesDeleteModal(true);
              refetchFaculty();
              setIsConfirmDeleteModal(false);
            },
          });
        })
        .with("scholarship", () => {
          deleteScholarship(Number(data.id), {
            onSuccess: () => {
              setIsSuccesDeleteModal(true);
              refetchScholarship();
              setIsConfirmDeleteModal(false);
            },
          });
        })
        .with("selection_path", () => {
          deleteSelection(Number(data.id), {
            onSuccess: () => {
              setIsSuccesDeleteModal(true);
              refetchSelection();
              setIsConfirmDeleteModal(false);
            },
          });
        })
        .with("department", () => {
          deleteDepartment(Number(data.id), {
            onSuccess: () => {
              setIsSuccesDeleteModal(true);
              refetchDepartment();
              setIsConfirmDeleteModal(false);
            },
          });
        });
    } catch (error) {
      console.error(error);
    }
  });
  const onUpdateData = updateSubmit((data) => {
    try {
      match(activeItem?.title)
        .with("scholarship", () => {
          updateScholarship(
            {
              id: data.id,
              name: data.scholarship,
            },
            {
              onSuccess: () => {
                setIsSuccesUpdateModal(true);
                refetchScholarship();

                setIsEditModalShow(false);
              },
            },
          );
        })
        .with("department", () => {
          updateDepartment(
            {
              id: data.id,
              name: data.department,
              degree_program_id: Number(data.degree_program_id),
              faculty_id: Number(data.faculty_id),
            },
            {
              onSuccess: () => {
                setIsSuccesUpdateModal(true);
                refetchDepartment();
                setIsEditModalShow(false);
              },
            },
          );
        })
        .with("faculty", () => {
          updateFaculty(
            {
              id: data.id,
              name: data.faculty,
              degree_program_id: Number(data.degree_program_id),
            },
            {
              onSuccess: () => {
                setIsSuccesUpdateModal(true);
                refetchFaculty();
                setIsEditModalShow(false);
              },
            },
          );
        })
        .with("selection_path", () => {
          updateSelection(
            {
              id: data.id,
              name: data.selection_path,
              degree_program_id: Number(data.degree_program_id),
            },
            {
              onSuccess: () => {
                setIsSuccesUpdateModal(true);
                refetchSelection();
                setIsEditModalShow(false);
              },
            },
          );
        });
    } catch (error) {
      console.error(error);
    }
  });
  const columns: TableColumn<TDataMaster>[] = useMemo(
    () => [
      {
        name: <div className="pl-4">No</div>,
        cell: (row, rowIndex) => <div className="pl-5">{rowIndex + 1}</div>,
        width: "100px",
      },
      {
        name: "Jenis",
        cell: (row) => row.name,
        width: "200px",
      },
      {
        name: "Data Terkini",
        cell: (row) => (
          <div className="w-full">
            <ul className={`${Number(row.current_data?.length) !== 1 ? "list-disc" : ""}`}>
              {row.name === "Fakultas" &&
                faculty?.slice(0, 3).map((item, index) => <li key={index}>{item.label}</li>)}
              {row.name === "Program Studi" &&
                prodi?.slice(0, 3).map((item, index) => <li key={index}>{item.label}</li>)}
              {row.name === "Jalur Seleksi" &&
                seleksi?.map((item, index) => <li key={index}>{item.label}</li>)}
              {row.name === "Data Sekolah" &&
                education?.map((item, index) => <li key={index}>{item.label}</li>)}
              {row.name === "Beasiswa" &&
                beasiswa?.map((item, index) => <li key={index}>{item.label}</li>)}
              {row.name === "Biaya Formulir" &&
                row.current_data?.map((item, index) => <li key={index}>{item.data}</li>)}
            </ul>
          </div>
        ),
        width: "350px",
      },

      {
        name: "Penambahan Data",
        cell: (row) => (
          <div className="w-full">
            {row.add_data ? (
              <Button
                variant="filled"
                height="h-9"
                onClick={() => {
                  setActiveItem(row);
                  handleOpenModalAdd(row.name);
                  addReset({ ...row });
                }}
              >
                <AiOutlinePlus className="text-lg" />
                <span className="text-sm font-medium pl-2">Tambah Data</span>
              </Button>
            ) : null}
          </div>
        ),

        width: "20%",
      },

      {
        name: "Tindakan",
        width: "350px",
        cell: (row) => (
          <div className="flex gap-2 w-full">
            <Button
              variant="filled-green-secondary"
              height="h-6"
              width="w-full"
              onClick={() => {
                setActiveItem(row);
                handleOpenModalDetail(row.name);
              }}
            >
              <AiOutlineFileSearch className="text-lg text-primary-white cursor-pointer" />
              <span className="pl-2 text-[10px] text-primary-white">Details</span>
            </Button>

            <Button
              variant="filled-yellow"
              height="h-6"
              width="w-full"
              onClick={() => {
                setActiveItem(row);
                handleOpenModal(row.name);
                updateReset({ ...row });
              }}
            >
              <AiOutlineEdit className="text-lg text-primary-black cursor-pointer" />
              <span className="pl-2 text-[10px] text-primary-black">Edit</span>
            </Button>

            <Button
              variant="filled-red"
              height="h-6"
              width="w-full"
              styling="bg-secondary-orange-1 hover:bg-secondary-orange-2"
              onClick={() => {
                setActiveItem(row);
                handleDeleteModal(row.name);
                deleteReset({ ...row });
              }}
            >
              <AiOutlineDelete className="text-lg text-primary-white cursor-pointer " />
              <span className="pl-2 text-[10px]">Hapus</span>
            </Button>
          </div>
        ),
      },
    ],
    [addReset, faculty, prodi, seleksi, education, beasiswa, deleteReset, handleOpenModalDetail],
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
      <section className="rounded-lg w-full mb-24 md:mb-0">
        <div className="w-full flex p-2 py-4 gap-4 lg:justify-end justify-start items-center">
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
          fixedHeaderScrollHeight="400px"
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
          paginationPerPage={6}
          paginationRowsPerPageOptions={[6, 10, 15, 20]}
          paginationIconPrevious={<AiFillCaretLeft className="text-xl" />}
          paginationIconNext={<AiFillCaretRight className="text-xl ml-0.5" />}
          paginationIconFirstPage={<AiFillFastBackward className="text-xl" />}
          paginationIconLastPage={<AiFillFastForward className="text-xl ml-0.5" />}
        />
      </section>
      <Modal
        key="modal-detail"
        showModal={isDetailModalShow}
        onClose={handleCloseModalDetail}
        modalTitle={`Detail ${activeItem?.name}`}
        bodyClassName="overflow-y-auto p-8"
        titleColor="white"
        size="md"
        closeClassName="text-primary-white"
        headerColor="green"
      >
        <div className="modal flex flex-col h-full max-h-[50vh] ">
          <ul>
            {activeItem?.name === "Fakultas" &&
              faculty?.map((item, index) => (
                <li
                  className="even:bg-grayscale-12 text-lg flex flex-col gap-y-8 font-medium odd:bg-primary-white"
                  key={index}
                >
                  {item.label}
                </li>
              ))}
            {activeItem?.name === "Program Studi" &&
              prodi?.map((item, index) => (
                <li
                  className="even:bg-grayscale-12 text-lg flex flex-col gap-y-8 font-medium odd:bg-primary-white"
                  key={index}
                >
                  {item.label}
                </li>
              ))}
            {activeItem?.name === "Jalur Seleksi" &&
              seleksi?.map((item, index) => (
                <li
                  className="even:bg-grayscale-12 text-lg flex flex-col gap-y-8 font-medium odd:bg-primary-white"
                  key={index}
                >
                  {item.label}
                </li>
              ))}
            {activeItem?.name === "Data Sekolah" &&
              education?.map((item, index) => (
                <li
                  className="even:bg-grayscale-12 text-lg flex flex-col gap-y-8 font-medium odd:bg-primary-white"
                  key={index}
                >
                  {item.label}
                </li>
              ))}
            {activeItem?.name === "Beasiswa" &&
              beasiswa?.map((item, index) => (
                <li
                  className="even:bg-grayscale-12 text-lg flex flex-col gap-y-8 font-medium odd:bg-primary-white"
                  key={index}
                >
                  {item.label}
                </li>
              ))}
            {activeItem?.name === "Biaya Formulir" &&
              activeItem?.current_data?.map((item, index) => (
                <li
                  className="even:bg-grayscale-12 text-lg flex flex-col gap-y-8 font-medium odd:bg-primary-white"
                  key={index}
                >
                  {item.data}
                </li>
              ))}
          </ul>
        </div>
      </Modal>
      {activeItem?.name === "Biaya Formulir" ? (
        <Modal
          key="modal-edit-data"
          showModal={isEditModalShow}
          onClose={handleCloseModal}
          iconClose={false}
          size="modal-question"
          modalTitle="Edit Data"
          titleColor="white"
          headerColor="green"
        >
          <div className=" flex flex-row gap-x-4 justify-between">
            <TextField
              name={`${activeItem?.title}`}
              control={control}
              label="Nama Pengajuan"
              variant="md"
              placeholder="Nama Keterangan"
            />
            <TextField
              name={`${activeItem?.title}`}
              control={control}
              label="Biaya Formulir Asal"
              variant="md"
              defaultValue={`${activeItem?.current_data?.map((item) => item.data)}`}
              placeholder="Rp."
            />
          </div>
          <div className="gap-x-4 flex flex-row  justify-between">
            <TextField
              name={`${activeItem?.title}`}
              control={control}
              label="Nama Petugas"
              variant="md"
              placeholder="Nama Petugas"
            />
            <TextField
              name={`${activeItem?.title}`}
              control={control}
              label="Biaya Formulir Baru"
              variant="md"
              placeholder="Rp."
            />
          </div>

          <div className="flex gap-x-3 items-end  justify-end">
            <Button variant="filled-red" width="w-36" height="h-6" onClick={handleCloseModal}>
              Batal
            </Button>
            <Button variant="filled" width="w-36" height="h-6" onClick={handleCloseModal}>
              Simpan
            </Button>
          </div>
        </Modal>
      ) : activeItem?.title === "faculty" ? (
        <Modal
          key="modal-edit-data"
          showModal={isEditModalShow}
          onClose={handleCloseModal}
          iconClose={false}
          modalTitle="Edit Data"
          titleColor="white"
          size="modal-question"
          headerColor="green"
        >
          <form onSubmit={onUpdateData}>
            <div className="gap-y-4 flex flex-col p-4">
              <SelectOption
                name="degree_program_id"
                options={degreProgram || []}
                control={updateControl}
                isClearable
                isSearchable
                placeholder="Pilih Program Pendidikan"
                labels="Program Pendidikan"
              />
              <SelectOption
                name="faculty_id"
                options={faculty || []}
                control={updateControl}
                isClearable
                isSearchable
                // disabled={!watch("degree_program_id")}
                placeholder={`Pilih ${activeItem?.name}`}
                labels={`${activeItem?.name} Asal`}
              />

              <TextField
                name={`${activeItem?.title}`}
                control={updateControl}
                label={`${activeItem?.name} Baru`}
                variant="md"
                placeholder={`Masukan ${activeItem?.name} Baru`}
              />
            </div>

            <div className="flex gap-x-6 items-end w- justify-center">
              <Button variant="filled-red" width="w-36" height="h-6" onClick={handleCloseModal}>
                Batal
              </Button>
              <Button variant="filled" width="w-36" height="h-6" type="submit">
                Simpan
              </Button>
            </div>
          </form>
        </Modal>
      ) : activeItem?.title === "selection_path" ? (
        <Modal
          key="modal-edit-data"
          showModal={isEditModalShow}
          onClose={handleCloseModal}
          iconClose={false}
          modalTitle="Edit Data"
          titleColor="white"
          size="modal-question"
          headerColor="green"
        >
          <form onSubmit={onUpdateData}>
            <div className="gap-y-4 flex flex-col p-4">
              <SelectOption
                name="degree_program_id"
                options={degreProgram || []}
                control={updateControl}
                isClearable
                isSearchable
                placeholder="Pilih Program Pendidikan"
                labels="Program Pendidikan"
              />
              <SelectOption
                name="id"
                options={seleksi || []}
                control={updateControl}
                isClearable
                isSearchable
                placeholder={`Pilih ${activeItem?.name}`}
                labels={`${activeItem?.name} Asal`}
              />
              <TextField
                name={`${activeItem?.title}`}
                control={updateControl}
                label={`${activeItem?.name} Baru`}
                variant="md"
                placeholder={`Masukan ${activeItem?.name} Baru`}
              />
            </div>

            <div className="flex gap-x-6 items-end w- justify-center">
              <Button variant="filled-red" width="w-36" height="h-6" onClick={handleCloseModal}>
                Batal
              </Button>
              <Button variant="filled" width="w-36" height="h-6" type="submit">
                Simpan
              </Button>
            </div>
          </form>
        </Modal>
      ) : (
        <Modal
          key="modal-edit-data"
          showModal={isEditModalShow}
          onClose={handleCloseModal}
          iconClose={false}
          modalTitle="Edit Data"
          titleColor="white"
          size="modal-question"
          headerColor="green"
        >
          <form onSubmit={onUpdateData}>
            <div className="gap-y-4 flex flex-col p-4">
              <SelectOption
                name="id"
                options={
                  activeItem?.name === "Fakultas"
                    ? faculty || []
                    : activeItem?.name === "Program Studi"
                    ? prodi || []
                    : activeItem?.name === "Jalur Seleksi"
                    ? seleksi || []
                    : activeItem?.name === "Data Sekolah"
                    ? education || []
                    : activeItem?.name === "Beasiswa"
                    ? beasiswa || []
                    : options
                }
                control={updateControl}
                isClearable
                isSearchable
                placeholder={`Pilih ${activeItem?.name}`}
                labels={`${activeItem?.name} Asal`}
              />

              <TextField
                name={`${activeItem?.title}`}
                control={updateControl}
                label={`${activeItem?.name} Baru`}
                variant="md"
                placeholder={`Masukan ${activeItem?.name} Baru`}
              />
            </div>

            <div className="flex gap-x-6 items-end w- justify-center">
              <Button variant="filled-red" width="w-36" height="h-6" onClick={handleCloseModal}>
                Batal
              </Button>
              <Button variant="filled" width="w-36" height="h-6" type="submit">
                Simpan
              </Button>
            </div>
          </form>
        </Modal>
      )}
      {activeItem?.title === "faculty" || activeItem?.title === "selection_path" ? (
        <Modal
          key="modal-add-data"
          showModal={isAddModalShow}
          onClose={handleCloseModalAdd}
          iconClose={false}
          modalTitle="Tambah Data"
          titleColor="white"
          size="modal-question"
          headerColor="green"
        >
          <form onSubmit={onSubmit}>
            <div className="gap-y-2 flex flex-col px-4  justify-center">
              <p className="text-primary-green text-center">
                Silahkan masukkan data yang akan ditambahkan!
              </p>
              <div className="gap-y-4 flex flex-col p-4">
                <SelectOption
                  name="degree_program_id"
                  options={degreProgram || []}
                  control={control}
                  isClearable
                  isSearchable
                  placeholder="Pilih Program Pendidikan"
                  labels="Program Pendidikan"
                />
                <TextField
                  name={`${activeItem?.title}`}
                  control={control}
                  label={`${activeItem?.name} Baru`}
                  variant="md"
                  placeholder={`Masukan ${activeItem?.name} Baru`}
                />
              </div>
            </div>

            <div className="flex gap-x-6  justify-center">
              <Button variant="filled-red" width="w-36" height="h-6" onClick={handleCloseModalAdd}>
                Batal
              </Button>
              <Button
                variant="filled"
                width="w-36"
                height="h-6"
                type="submit"
                loading={isLoadingAdd}
              >
                Simpan
              </Button>
            </div>
          </form>
        </Modal>
      ) : activeItem?.title === "scholarship" ? (
        <Modal
          key="modal-add-data"
          showModal={isAddModalShow}
          onClose={handleCloseModalAdd}
          iconClose={false}
          modalTitle="Tambah Data"
          titleColor="white"
          size="modal-question"
          headerColor="green"
        >
          <form onSubmit={onSubmit}>
            <div className="gap-y-2 flex flex-col px-4  justify-center">
              <p className="text-primary-green text-center">
                Silahkan masukkan data yang akan ditambahkan!
              </p>

              <TextField
                name={`${activeItem?.title}`}
                control={control}
                label={`${activeItem?.name} Baru`}
                variant="md"
                placeholder={`Masukan ${activeItem?.name} Baru`}
              />
            </div>

            <div className="flex gap-x-6  justify-center">
              <Button variant="filled-red" width="w-36" height="h-6" onClick={handleCloseModalAdd}>
                Batal
              </Button>
              <Button variant="filled" width="w-36" height="h-6" type="submit">
                Simpan
              </Button>
            </div>
          </form>
        </Modal>
      ) : activeItem?.title === "school_type" ? (
        <Modal
          key="modal-add-data"
          showModal={isAddModalShow}
          onClose={handleCloseModalAdd}
          iconClose={false}
          modalTitle="Tambah Data"
          titleColor="white"
          headerColor="green"
        >
          <form
            onSubmit={onSubmit}
            className="w-full flex flex-col justify-center items-center gap-2"
          >
            <div className="w-full">
              <TextField
                inputHeight="h-10"
                name="name"
                variant="sm"
                type="text"
                required
                labelclassname="text-sm font-semibold"
                label="Nama Asal Sekolah"
                placeholder="Masukan Nama Sekolah"
                inputWidth="w-full"
                control={control}
              />
            </div>

            <div className="w-full flex gap-2 justify-between items-center">
              <div className="w-[45%]">
                <SelectOption
                  name="education_type"
                  labels="Jenis Sekolah"
                  labelClassName="font-bold text-xs py-2"
                  placeholder="Pilih Jenis Sekolah"
                  options={education || []}
                  isSearchable={true}
                  isClearable={true}
                  control={control}
                  isMulti={false}
                  className="w-full"
                  required
                />
              </div>

              <div className="w-[55%] mt-4">
                <TextField
                  inputHeight="h-10"
                  name="npsn"
                  variant="sm"
                  type="text"
                  required
                  labelclassname="text-sm font-semibold"
                  label="NPSN ( Nomor Pokok Sekolah Nasional )"
                  placeholder="Masukan NPSN"
                  control={control}
                />
              </div>
            </div>

            <div className="w-full flex fle-col gap-3 justify-center items-center">
              <div className="w-[33%]">
                <SelectOption
                  labels="Provinsi"
                  labelClassName="font-bold text-xs py-2"
                  options={schoolProvinceOptions || []}
                  placeholder="Provinsi"
                  isSearchable={true}
                  name="province"
                  isClearable={true}
                  control={control}
                  isMulti={false}
                  className="w-full"
                />
              </div>

              <div className="w-[33%]">
                <SelectOption
                  labels="Kota/Kabupaten"
                  labelClassName="font-bold text-xs py-2"
                  options={citySchoolOptions || []}
                  placeholder="Kota/Kabupaten"
                  isSearchable={true}
                  name="city"
                  isClearable={true}
                  control={control}
                  isMulti={false}
                  disabled={!watch("province")}
                  className="w-full"
                />
              </div>

              <div className="w-[33%]">
                <SelectOption
                  labels="Kecamatan"
                  labelClassName="font-bold text-xs py-2"
                  options={subDistrictOptions || []}
                  placeholder="Kecamatan"
                  isSearchable={true}
                  name="subdistrict"
                  control={control}
                  isMulti={false}
                  isClearable={true}
                  disabled={!watch("city")}
                  className="w-full"
                />
              </div>
            </div>
            <div className="w-auto flex justify-center items-center">
              <TextField
                name="address"
                variant="sm"
                type="text"
                labelclassname="text-xl font-semibold"
                label="Alamat Lengkap Sekolah"
                control={control}
                isTextArea
                textAreaRow={5}
                textAreaCols={70}
                inputHeight="h-20"
                className="resize-none bg-grayscale-2"
                inputWidth="lg:w-full"
                placeholder="Masukan Alamat Lengkap Sekolah"
              />
            </div>

            <div className="flex gap-x-6  justify-center">
              <Button variant="filled-red" width="w-36" height="h-6" onClick={handleCloseModalAdd}>
                Batal
              </Button>
              <Button variant="filled" width="w-36" height="h-6" type="submit">
                Simpan
              </Button>
            </div>
          </form>
        </Modal>
      ) : (
        <Modal
          key="modal-add-data"
          showModal={isAddModalShow}
          onClose={handleCloseModalAdd}
          iconClose={false}
          modalTitle="Tambah Data"
          titleColor="white"
          size="modal-question"
          headerColor="green"
        >
          <form onSubmit={onSubmit}>
            <div className="gap-y-2 flex flex-col px-4  justify-center">
              <p className="text-primary-green text-center">
                Silahkan masukkan data yang akan ditambahkan!
              </p>
              <SelectOption
                name="degree_program_id"
                options={degreProgram || []}
                control={control}
                isClearable
                isSearchable
                placeholder="Pilih Program Pendidikan"
                labels="Program Pendidikan"
              />
              <SelectOption
                name="faculty_id"
                options={faculty || []}
                control={control}
                isClearable
                isSearchable
                placeholder="Pilih Fakultas"
                labels="Fakultas"
              />
              <TextField
                name={`${activeItem?.title}`}
                control={control}
                label={`${activeItem?.name} Baru`}
                variant="md"
                placeholder={`Masukan ${activeItem?.name} Baru`}
              />
            </div>

            <div className="flex gap-x-6  justify-center">
              <Button variant="filled-red" width="w-36" height="h-6" onClick={handleCloseModalAdd}>
                Batal
              </Button>
              <Button variant="filled" width="w-36" height="h-6" type="submit">
                Simpan
              </Button>
            </div>
          </form>
        </Modal>
      )}
      <form onSubmit={onDeleteData}>
        <Modal
          key="modal-delete-data"
          showModal={isDeleteModalShow}
          onClose={handleCloseDeleteModal}
          iconClose={false}
          modalTitle="Hapus Data"
          titleColor="white"
          size="modal-question"
          headerColor="green"
        >
          <div className="gap-y-[7vh] flex flex-col px-4  justify-center">
            <p className="text-primary-green text-center">Silahkan pilih data yang akan dihapus!</p>

            <SelectOption
              name="id"
              options={
                activeItem?.name === "Fakultas"
                  ? faculty || []
                  : activeItem?.name === "Program Studi"
                  ? prodi || []
                  : activeItem?.name === "Jalur Seleksi"
                  ? seleksi || []
                  : activeItem?.name === "Data Sekolah"
                  ? education || []
                  : activeItem?.name === "Beasiswa"
                  ? beasiswa || []
                  : options
              }
              control={deleteControl}
              isClearable
              isSearchable
              placeholder={`Pilih ${activeItem?.name}`}
              labels={`${activeItem?.name} Asal`}
            />

            <div className="flex gap-x-6  justify-center">
              <Button
                variant="filled-red"
                width="w-36"
                height="h-6"
                onClick={handleCloseDeleteModal}
              >
                Batal
              </Button>
              <Button
                variant="filled"
                width="w-36"
                height="h-6"
                onClick={() => {
                  handleCloseDeleteModal();
                  setIsConfirmDeleteModal(!isConfirmDeleteModal);
                }}
              >
                Simpan
              </Button>
            </div>
          </div>
        </Modal>
        <Modal
          showModal={isConfirmDeleteModal}
          onClose={handleCloseConfirmDelete}
          iconClose={false}
          size="sm"
        >
          <div className="flex gap-y-6  justify-center items-center flex-col ">
            <BiErrorCircle className="text-red-7 text-9xl" />
            <div className="flex flex-col items-center gap-y-4 px-5">
              <div className="text-center">
                <h1 className="text-xl font-bold">Perhatian</h1>
                <p>Apakah Anda ingin menghapus data ini?</p>
              </div>

              <div className="flex flex-row justify-center gap-x-6">
                <Button
                  variant="filled-red"
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
                  onClick={onDeleteData}
                >
                  Hapus
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </form>
      <Modal
        showModal={isSuccesDeleteModal}
        onClose={handleCloseSuccesDelete}
        iconClose={false}
        size="sm"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="flex flex-col items-center gap-y-4 px-5">
            <AiOutlineFileDone className="text-secondary-green-8 text-9xl text-center" />
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-center">
                <h1 className="text-xl font-bold">Berhasil</h1>
                <p>Data Berhasil Dihapus</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Modal>
      <Modal
        showModal={isSuccesAddModal}
        onClose={handleCloseSuccesAdd}
        iconClose={false}
        size="sm"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="flex flex-col items-center gap-y-4 px-5">
            <AiOutlineFileDone className="text-secondary-green-8 text-9xl text-center" />
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-center">
                <h1 className="text-xl font-bold">Berhasil</h1>
                <p>Data Berhasil Ditambahkan</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Modal>
      <Modal
        showModal={isSuccesUpdateModal}
        onClose={handleCloseSuccesUpdate}
        iconClose={false}
        size="sm"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="flex flex-col items-center gap-y-4 px-5">
            <AiOutlineFileDone className="text-secondary-green-8 text-9xl text-center" />
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-center">
                <h1 className="text-xl font-bold">Berhasil</h1>
                <p>Data Berhasil Diubah</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Modal>
    </Fragment>
  );
};
export default Table;
