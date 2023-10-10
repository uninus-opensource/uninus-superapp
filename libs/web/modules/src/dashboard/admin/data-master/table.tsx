"use client";
import { FC, ReactElement, useEffect, useState, SetStateAction, Fragment, useMemo } from "react";
import { FieldValues, useForm } from "react-hook-form";
import DataTable, { TableColumn } from "react-data-table-component";
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
  AiOutlineFilter,
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
import { ToastContainer, toast } from "react-toastify";
import { match } from "ts-pattern";
import { useCityGet, useProvinceGet, useSubdistrictGet } from "@uninus/web/services";

const Table: FC = (): ReactElement => {
  const [tableMaster, setTableMaster] = useState([{}]);
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
  const [isAddModalShow, setIsAddModalShow] = useState<boolean>(false);
  const [isDeleteModalShow, setIsDeleteModalShow] = useState<boolean>(false);
  const [isEditModalShow, setIsEditModalShow] = useState<boolean>(false);
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
    formState: { isLoading: isLoadingDelete },
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
  };
  const handleCloseDeleteModal = () => {
    setIsDeleteModalShow(!isDeleteModalShow);
  };
  const handleOpenModal = (name: string) => {
    const Selected = dataMaster.find((item) => item.name === name);
    setActiveItem(Selected || null);
    setIsEditModalShow(!isEditModalShow);
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
                refetchScholarship();
                setTimeout(() => {
                  toast.success("Berhasil Menambahkan Beasiswa", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                }, 500);
                setIsAddModalShow(false);
              },
              onError: () => {
                setTimeout(() => {
                  toast.error("Gagal Menambahkan Beasiswa", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                }, 500);
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
                refetchDepartment();
                setTimeout(() => {
                  toast.success("Berhasil Menambahkan Program Studi", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                }, 500);
                setIsAddModalShow(false);
              },
              onError: () => {
                setTimeout(() => {
                  toast.error("Gagal Menambahkan Program Studi", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                }, 500);
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
                refetchSelection();
                setTimeout(() => {
                  toast.success("Berhasil Menambahkan Jalur Seleksi", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                }, 500);
                setIsAddModalShow(false);
              },
              onError: () => {
                setTimeout(() => {
                  toast.error("Gagal Menambahkan Jalur Seleksi", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                }, 500);
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
                refetchFaculty();
                setTimeout(() => {
                  toast.success("Berhasil Menambahkan Program Studi", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                }, 500);
                setIsAddModalShow(false);
              },
              onError: () => {
                setTimeout(() => {
                  toast.error("Gagal Menambahkan Program Studi", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                }, 500);
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
              refetchFaculty();
              setTimeout(() => {
                toast.success("Berhasil Menghapus Program Studi", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }, 500);
              setIsDeleteModalShow(false);
            },
            onError: () => {
              setTimeout(() => {
                toast.error("Gagal Menghapus Program Studi", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }, 500);
            },
          });
        })
        .with("scholarship", () => {
          deleteScholarship(Number(data.id), {
            onSuccess: () => {
              refetchScholarship();
              setTimeout(() => {
                toast.success("Berhasil Menghapus Beasiswa", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }, 500);
              setIsDeleteModalShow(false);
            },
            onError: () => {
              setTimeout(() => {
                toast.error("Gagal Menghapus Beasiswa", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }, 500);
            },
          });
        })
        .with("selection_path", () => {
          deleteSelection(Number(data.id), {
            onSuccess: () => {
              refetchSelection();
              setTimeout(() => {
                toast.success("Berhasil Menghapus Jalur Seleksi", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }, 500);
              setIsDeleteModalShow(false);
            },
            onError: () => {
              setTimeout(() => {
                toast.error("Gagal Menghapus Jalur Seleksi", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }, 500);
            },
          });
        })
        .with("department", () => {
          deleteDepartment(Number(data.id), {
            onSuccess: () => {
              refetchDepartment();
              setTimeout(() => {
                toast.success("Berhasil Menghapus Program Studi", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }, 500);
              setIsDeleteModalShow(false);
            },
            onError: () => {
              setTimeout(() => {
                toast.error("Gagal Menghapus Program Studi", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }, 500);
            },
          });
        });
      console.log(data);
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
                refetchScholarship();
                setTimeout(() => {
                  toast.success("Berhasil Mengubah Beasiswa", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                }, 500);
                setIsEditModalShow(false);
              },
              onError: () => {
                setTimeout(() => {
                  toast.error("Gagal Mengubah Beasiswa", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                }, 500);
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
                refetchDepartment();
                setTimeout(() => {
                  toast.success("Berhasil Mengubah Program Studi", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                }, 500);
                setIsEditModalShow(false);
              },
              onError: () => {
                setTimeout(() => {
                  toast.error("Gagal Mengubah Program Studi", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                }, 500);
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
                refetchFaculty();
                setTimeout(() => {
                  toast.success("Berhasil Mengubah Fakultas", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                }, 500);
                setIsEditModalShow(false);
              },
              onError: () => {
                setTimeout(() => {
                  toast.error("Gagal Mengubah Fakultas", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                }, 500);
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
                refetchSelection();
                setTimeout(() => {
                  toast.success("Berhasil Mengubah Jalur Seleksi", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                }, 500);
                setIsEditModalShow(false);
              },
              onError: () => {
                setTimeout(() => {
                  toast.error("Gagal Mengubah Jalur Seleksi", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                }, 500);
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
            <ul className={`${Number(row.current_data?.length) !== 1 ? "list-disc" : ""} pl-5`}>
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
        width: "24%",
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
        width: "24%",
      },

      {
        name: "Tindakan",
        cell: (row) => (
          <div className="flex gap-2 w-full">
            <Button
              variant="filled-yellow"
              height="h-6"
              width="w-24"
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
              width="w-24"
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
    [addReset, faculty, prodi, seleksi, education, beasiswa, deleteReset],
  );

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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
          paginationPerPage={6}
          paginationRowsPerPageOptions={[6, 10, 15, 20]}
          paginationIconPrevious={<AiFillCaretLeft className="text-xl" />}
          paginationIconNext={<AiFillCaretRight className="text-xl ml-0.5" />}
          paginationIconFirstPage={<AiFillFastBackward className="text-xl" />}
          paginationIconLastPage={<AiFillFastForward className="text-xl ml-0.5" />}
        />
      </section>
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

      <Modal
        key="modal-delete-data"
        showModal={isDeleteModalShow}
        onClose={handleCloseDeleteModal}
        iconClose={true}
        modalTitle="Apakah anda yakin akan menghapus?"
        titleColor="green"
      >
        <form onSubmit={onDeleteData}>
          <p className="text-grayscale-11">
            Penghapusan akan merubah data yang ada dan ini tidak bisa menampilkan kembali data
            tersebut
          </p>
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
          <div className="flex gap-x-6 items-end w- justify-end">
            <Button variant="filled" width="w-36" height="h-6" onClick={handleCloseDeleteModal}>
              Batal
            </Button>
            <Button
              variant="filled-red"
              width="w-36"
              height="h-6"
              type="submit"
              loading={isLoadingDelete}
            >
              Hapus
            </Button>
          </div>
        </form>
      </Modal>
    </Fragment>
  );
};
export default Table;
