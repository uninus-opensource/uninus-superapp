import DataTable, { TableColumn } from "react-data-table-component";
import { TDeleteQuestion, TKelolaPertanyaan } from "./types";
import {
  Button,
  Modal,
  SearchInput,
  TableLoadingData,
  //  TextField
} from "@uninus/web/components";
import { motion } from "framer-motion";
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillFastBackward,
  AiFillFastForward,
  AiOutlineFileDone,
} from "react-icons/ai";
import { DeleteOutlined, EditOutlined, PrinterOutlined } from "@ant-design/icons";
import { SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useGetQuestion,
  // useQuestionCreate,
  useQuestionDelete,
  // useQuestionUpdate
} from "./hook";
import { BiErrorCircle } from "react-icons/bi";

export const Table = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDataModalShow, setIsAddDataModalShow] = useState<boolean>(false);
  const [isSuccesAddModal, setIsSuccesAddModal] = useState<boolean>(false);
  const [isSuccesUpdateModal, setIsSuccesUpdateModal] = useState<boolean>(false);
  const [isSuccesDeleteModal, setIsSuccesDeleteModal] = useState<boolean>(false);
  const [isConfirmDeleteModal, setIsConfirmDeleteModal] = useState<boolean>(false);

  const [isEditModalShow, setIsEditModalShow] = useState<boolean>(false);
  const [activeRow, setActiveRow] = useState<TKelolaPertanyaan | null>(null);
  const [questions, setQuestions] = useState<TKelolaPertanyaan[]>([]);

  // const { control, handleSubmit, reset } = useForm<TKelolaPertanyaan>({
  //   mode: "all",
  // });

  // const {
  //   control: editControl,
  //   handleSubmit: editSubmit,
  //   reset: updateReset,
  // } = useForm<TKelolaPertanyaan>({
  //   mode: "all",
  // });

  const { handleSubmit: deleteSubmit } = useForm<TDeleteQuestion>({
    mode: "all",
  });

  const columnsPertanyaan: TableColumn<TKelolaPertanyaan>[] = [
    {
      name: "No",
      cell: (row, rowIndex) => <div className="px-1">{rowIndex + 1}</div>,
      width: "5%",
    },
    {
      name: "Soal",
      cell: (row) => row.question as string,
    },
    {
      name: "Jawaban Benar",
      cell: (row) => row.correct_answer as string,
    },
    {
      name: "Jawaban Salah",
      cell: (row) => (
        <ul className="list-disc">
          {row.incorrect_answers?.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-2 w-full p-3">
          <Button
            variant="filled"
            onClick={() => {
              setIsEditModalShow(true);
              setActiveRow(row);
              // updateReset({ ...row });
            }}
          >
            <EditOutlined />
          </Button>
          <Button
            variant="filled-red"
            onClick={() => {
              setIsConfirmDeleteModal(true);
              setActiveRow(row);
            }}
          >
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];
  const { data, refetch: refetchQeustion, isLoading: isLoadingData } = useGetQuestion();
  useEffect(() => {
    if (data) {
      const questionsArray = Array.isArray(data) ? data : [data];
      setQuestions(questionsArray as TKelolaPertanyaan[]);
    }
  }, [data]);

  const filteredQuestions = questions.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
      item.correct_answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.incorrect_answers.some((answer) =>
        answer.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );
  // const { mutate: AddQuestion } = useQuestionCreate();
  // const onAddQuestion = handleSubmit((data) => {
  //   try {
  //     AddQuestion(
  //       {
  //         question: data.question,
  //         correct_answer: data.correct_answer,
  //         incorrect_answers: data.incorrect_answers,
  //       },
  //       {
  //         onSuccess: () => {
  //           setIsSuccesAddModal(true);
  //           refetchQeustion();
  //           setIsAddDataModalShow(false);
  //         },
  //       },
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // });
  // const { mutate: updateQuestion } = useQuestionUpdate();
  // const onEditQuestion = editSubmit((data) => {
  //   try {
  //     updateQuestion(
  //       {
  //         id: data?.id,
  //         question: data?.question,
  //         correct_answer: data?.correct_answer,
  //         incorrect_answers: data?.incorrect_answers,
  //       },
  //       {
  //         onSuccess: () => {
  //           setIsSuccesUpdateModal(true);
  //           refetchQeustion();
  //           setIsEditModalShow(false);
  //         },
  //       },
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // });
  const { mutate: deleteQuestion } = useQuestionDelete();
  const onDeleteQuestion = deleteSubmit((data) => {
    try {
      deleteQuestion(Number(activeRow?.id), {
        onSuccess: () => {
          setIsSuccesDeleteModal(true);
          refetchQeustion();
          setIsConfirmDeleteModal(false);
        },
      });
    } catch (error) {
      console.error(error);
    }
  });

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
  const handleSearch = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchQuery(event.target.value);
  };

  const handleCloseAddData = () => {
    setIsAddDataModalShow(!isAddDataModalShow);
  };
  // const handleCloseEditData = () => {
  //   setIsEditModalShow(!isEditModalShow);
  // };

  const handleAddModal = () => {
    setIsAddDataModalShow(!isAddDataModalShow);
    // reset();
  };
  const handleCloseSuccesAdd = () => {
    setIsSuccesAddModal(!isSuccesAddModal);
  };
  const handleCloseConfirmDelete = () => {
    setIsConfirmDeleteModal(!isConfirmDeleteModal);
  };
  const handleCloseSuccesUpdate = () => {
    setIsSuccesUpdateModal(!isSuccesUpdateModal);
  };
  const handleCloseSuccesDelete = () => {
    setIsSuccesDeleteModal(!isSuccesDeleteModal);
  };
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
  return (
    <section className="rounded-lg w-full">
      <div className="flex flex-row gap-x-3 justify-end items-end">
        <Button onClick={handleAddModal} variant="filled">
          + Tambah Data
        </Button>
        <Button variant="filled-yellow">
          <div className="flex flex-row justify-center items-center gap-x-3">
            <PrinterOutlined />
            <p>Cetak</p>
          </div>
        </Button>
      </div>
      <div className="w-full flex flex-col gap-y-3 md:gap-y-0 md:flex-row p-2 py-4 justify-between">
        <h1 className="font-bold my-2">Data Soal</h1>
        <SearchInput
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Cari Pertanyaan atau Jawaban"
          width="w-[15rem] md:w-[24rem]"
        />
      </div>

      <DataTable
        columns={columnsPertanyaan}
        // data={data as unknown as TKelolaPertanyaan[]}
        data={filteredQuestions}
        customStyles={customStyles}
        fixedHeader={true}
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
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
        paginationIconPrevious={<AiFillCaretLeft className="text-xl" />}
        paginationIconNext={<AiFillCaretRight className="text-xl ml-0.5" />}
        paginationIconFirstPage={<AiFillFastBackward className="text-xl" />}
        paginationIconLastPage={<AiFillFastForward className="text-xl ml-0.5" />}
      />

      <Modal
        showModal={isAddDataModalShow}
        onClose={handleCloseAddData}
        iconClose={false}
        modalTitle="Tambah Pertanyaan"
      >
        {/* <form onSubmit={onAddQuestion}>
          <TextField control={control} name="question" label="Pertanyaan" variant="md" />
          <TextField control={control} name="correct_answer" label="Jawaban Benar" variant="md" />
          <ul>
            <p className="text-xs md:text-sm xl:text-md lg:text-xs 2xl:text-lg font-semibold">
              Jawaban Salah
            </p>
            {Array.from({ length: 3 }).map((_, index) => (
              <li key={index}>
                <TextField control={control} name={`incorrect_answers.${index}`} variant="md" />
              </li>
            ))}
          </ul>

          <div className="flex gap-x-6  justify-center">
            <Button variant="filled-red" width="w-36" height="h-6" onClick={handleCloseAddData}>
              Batal
            </Button>
            <Button variant="filled" width="w-36" height="h-6" type="submit">
              Simpan
            </Button>
          </div>
        </form> */}
      </Modal>

      <Modal
        showModal={isEditModalShow}
        onClose={handleCloseAddData}
        iconClose={false}
        modalTitle="Edit Pertanyaan"
      >
        {/* <form onSubmit={onEditQuestion}>
          <TextField control={editControl} name="question" label="Pertanyaan" variant="md" />
          <TextField
            control={editControl}
            name="correct_answer"
            label="Jawaban Benar"
            variant="md"
          />
          <ul>
            <p className="text-xs md:text-sm xl:text-md lg:text-xs 2xl:text-lg font-semibold">
              Jawaban Salah
            </p>
            {Array.from({ length: 3 }).map((_, index) => (
              <li key={index}>
                <TextField control={editControl} name={`incorrect_answers.${index}`} variant="md" />
              </li>
            ))}
          </ul>

          <div className="flex gap-x-6  justify-center">
            <Button variant="filled-red" width="w-36" height="h-6" onClick={handleCloseEditData}>
              Batal
            </Button>
            <Button variant="filled" width="w-36" height="h-6" type="submit">
              Simpan
            </Button>
          </div>
        </form> */}
      </Modal>

      <Modal
        showModal={isConfirmDeleteModal}
        onClose={handleCloseConfirmDelete}
        iconClose={false}
        size="sm"
      >
        <form onSubmit={onDeleteQuestion}>
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
                <Button variant="filled" width="w-36" height="h-6" type="submit">
                  Hapus
                </Button>
              </div>
            </div>
          </div>
        </form>
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
    </section>
  );
};
