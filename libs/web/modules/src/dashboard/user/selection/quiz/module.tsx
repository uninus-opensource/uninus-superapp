"use client";
import { FC, ReactElement, useState, useRef, useEffect, Fragment } from "react";
import { Button } from "@uninus/web/components";
import { Modal } from "@uninus/web/components";
import { PiWarningCircleBold } from "react-icons/pi";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";
import { useGetQuestions } from "./hook";
// import { TSelectedQuestion } from "./type";
import { useDashboardStateControl, useStudentData } from "@uninus/web/services";
import { redirect } from "next/navigation";
import { RedirectType } from "next/navigation";
import { useBiodataUpdate } from "../../registrasi";

export const QuizModule: FC = (): ReactElement => {
  const { getStudent } = useStudentData();
  const { getDashboardControlState, setDashboardControlState } = useDashboardStateControl();

  useEffect(() => {
    if (getStudent?.test_score) {
      redirect("/dashboard/selection/endtest", RedirectType.replace);
    } else if (
      !localStorage.getItem("selectedAnswer") &&
      !localStorage.getItem("isActiveQuestion")
    ) {
      redirect("/dashboard", RedirectType.replace);
    }
  });

  const [isActiveQuestion, setIsActiveQuestion] = useState<number>(
    Number(localStorage.getItem("isActiveQuestion")) || 0,
  );
  // const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [minutes, setMinutes] = useState<number>(Number(localStorage.getItem("minutes")));
  const [seconds, setSeconds] = useState<number>(Number(localStorage.getItem("seconds")));
  const [showModal, setShowModal] = useState<boolean>(false);
  const [mount, setMount] = useState(false);

  // const [showList, setShowList] = useState<boolean>(false);
  // const handleShowList = () => {
  //   setShowList(!showList);
  // };

  const { data, isLoading } = useGetQuestions();
  const { mutate } = useBiodataUpdate();

  const answerSelected = JSON.parse(localStorage.getItem("selectedAnswer") as string);

  const getQuestionData = data?.map((el) => ({
    no: el.id,
    question: el.question,
    // options: [...el.incorrect_answers, el.correct_answer],
    correct_answer: el.correct_answer,
  }));

  const result: number[] = [];

  const score = () => {
    try {
      for (let i = 0; i < answerSelected.length; i++) {
        if (answerSelected[i].answer === getQuestionData?.[i].correct_answer) {
          result.push(1);
        }
      }
      const finalResult = (result.length * 100 || 0) / (getQuestionData?.length || 0);

      mutate({ test_score: finalResult });
    } catch (error) {
      Promise.reject(error);
    }
  };

  const intervalRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prev) => prev - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(intervalRef.current);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => {
      localStorage.setItem("minutes", String(minutes));
      localStorage.setItem("seconds", String(seconds));
      clearInterval(intervalRef.current);
    };
  }, [minutes, seconds]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("minutes") &&
      localStorage.getItem("seconds")
    ) {
      setMount(true);
    }
  }, []);

  // const onOptionSelected = (answer: string, idx: number, no_answer: number): void => {
  //   setSelectedAnswer(answer);
  //   if (
  //     answerSelected.length > 0 &&
  //     !answerSelected.find((el: TSelectedQuestion) => el.index === idx)
  //   ) {
  //     answerSelected.push({ index: idx, answer, no_answer });
  //     localStorage.setItem("selectedAnswer", JSON.stringify(answerSelected));
  //   } else if (answerSelected.find((el: TSelectedQuestion) => el.index === idx)) {
  //     answerSelected[idx].answer = answer;
  //     answerSelected[idx].no_answer = no_answer;
  //     localStorage.setItem("selectedAnswer", JSON.stringify(answerSelected));
  //   } else {
  //     localStorage.setItem("selectedAnswer", JSON.stringify([{ index: idx, answer, no_answer }]));
  //   }
  // };

  const nextQuestion = (): void => {
    // setSelectedAnswer(null);
    setIsActiveQuestion((prev) => prev + 1);
    localStorage.setItem("isActiveQuestion", String(isActiveQuestion + 1));
  };
  const prevQuestion = (): void => {
    // setSelectedAnswer(null);
    if (isActiveQuestion !== 0) {
      setIsActiveQuestion((prev) => prev - 1);
      localStorage.setItem("isActiveQuestion", String(isActiveQuestion - 1));
    }
  };
  const handleShowModal = () => {
    setShowModal(!showModal);
  };
  // const optionsAlphabet: string[] = ["A", "B", "C", "D"];
  return (
    <section key="quiz" className="flex flex-col w-full h-auto justify-center items-center ">
      {mount && (
        <Fragment>
          {/* header */}
          <header className="w-full 2xl:text-2xl px-10 md:px-24 lg:px-0">
            <h1 className="text-slate-5">
              PMB <span className="text-secondary-green-4"> / Seleksi Test</span>
            </h1>
          </header>

          {/* body */}
          {/* <Modal
            showModal={showList}
            modalTitle="Nomor Soal"
            onClose={handleShowList}
            headerColor="white-shadow"
            size="modal-question"
            bodyClassName="h-[80vh] p-6 space-y-8"
            position="right-start"
          >
            <Fragment>
              <div className="flex flex-wrap gap-3 items-center justify-center  ">
                {getQuestionData.map((item, idx) => (
                  <div
                    className="bg-primary-green text-primary-white rounded-sm flex  items-center md:w-10 md:h-10 md:p-7 p-6 h-7 w-7 justify-center  cursor-pointer"
                    key={idx}
                    onClick={() => handleSelectQuiz(item.no)}
                  >
                    <p className="text-white text-center"> {item.no}</p>
                  </div>
                ))}
              </div>
              <div className="instruction px-7 flex flex-col">
                <div className="ansee flex flex-row gap-x-3  items-center">
                  <div className="bg-primary-green w-4 h-4"></div>
                  <p className="text-white text-center">= Sudah dijawab</p>
                </div>
                <div className="ansee flex flex-row gap-x-3  items-center">
                  <div className="bg-primary-white border-2 border-primary-black w-4 h-4"></div>
                  <p className="text-white text-center">= Belum dijawab</p>
                </div>
              </div>
            </Fragment>
          </Modal> */}

          {isLoading ? (
            <div className="bg-slate-3 w-full h-[30rem] lg:h-[27rem] xl:h-[75vh] rounded-md animate-pulse p-4 mt-5"></div>
          ) : (
            <section className="w-[80%] lg:w-full relative rounded-lg h-auto md:h-[30rem] lg:h-[27rem] xl:h-[83vh] xl:w-full bg-primary-white 2xl:w-full 2xl:h-[84vh] flex flex-col p-4 mt-5">
              <div className="flex flex-col gap-y-3">
                <h1 className="text-primary-green text-lg lg:text-3xl py-3 font-extrabold">
                  Seleksi Test
                </h1>

                <div className="flex w-full pb-3 justify-between items-center border-b-[3px] border-b-slate-5 mt-3 md:mt-0">
                  <h2 className="font-extrabold lg:text-2xl">
                    {`Soal No. ${isActiveQuestion + 1}`}{" "}
                  </h2>
                  <div className="flex flex-row justify-center items-center ">
                    <div className="bg-[#BDBDBD] px-4 py-1">
                      <p className="text-primary-white text-xs md:text-sm font-bold">Sisa Waktu</p>
                    </div>
                    <div className="px-2 lg:px-4 py-1 text-xs md:text-sm text-primary-white bg-secondary-green-1 font-bold mr-5">
                      {minutes === 0 && seconds === 0 ? null : (
                        <h1>
                          {minutes} : {seconds < 10 ? `0${seconds}` : seconds}
                        </h1>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  {getQuestionData && isActiveQuestion < getQuestionData.length ? (
                    <div>
                      <h3 className="text-sm lg:text-base">
                        {getQuestionData[isActiveQuestion].question}
                      </h3>
                      <ul>
                        {/* {getQuestionData[isActiveQuestion].options.map((option, idx) => (
                          <li
                            onClick={() => onOptionSelected(option, isActiveQuestion, idx)}
                            key={idx}
                            className={`flex gap-y-2 group items-center gap-x-2 cursor-pointer p-4 rounded-md font-medium hover:bg-slate-2
                    `}
                          >
                            <span
                              className={`border px-2 py-1 lg:px-3 text-sm lg:text-base ${
                                selectedAnswer === option ||
                                answerSelected?.[isActiveQuestion]?.no_answer === idx
                                  ? "bg-secondary-sky-2"
                                  : ""
                              }`}
                            >
                              {optionsAlphabet[idx]}
                            </span>
                            <p className="text-sm">{option}</p>
                          </li>
                        ))} */}
                      </ul>
                      <div className="flex w-full justify-between items-center mt-5">
                        <Button
                          variant="custom"
                          onClick={prevQuestion}
                          disabled={isActiveQuestion === 0}
                          styling="bg-primary-green text-xs lg:text-base justify-around text-primary-white text-center flex items-center"
                        >
                          <BiSolidLeftArrow /> Sebelumnya
                        </Button>
                        {isActiveQuestion === getQuestionData.length - 1 ? (
                          <Button
                            onClick={handleShowModal}
                            variant="custom"
                            styling="bg-primary-green text-xs lg:text-base justify-around text-primary-white text-center flex items-center"
                          >
                            Selesai <BiSolidRightArrow />
                          </Button>
                        ) : (
                          <Button
                            onClick={nextQuestion}
                            variant="custom"
                            styling="bg-primary-green  text-xs justify-around lg:text-base text-primary-white text-center flex items-center"
                          >
                            Selanjutnya <BiSolidRightArrow />
                          </Button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>

                <Modal showModal={showModal} onClose={handleShowModal} iconClose={false}>
                  <div className="flex flex-col justify-center items-center lg:flex lg:flex-row lg:py-10">
                    <div className="txt mt-4 lg:mt-0">
                      <div className="text-center flex flex-col items-center">
                        <PiWarningCircleBold className="text-red-6 text-center" size={120} />
                        <h1 className="font-extrabold text-3xl text-primary-black mb-2">
                          Perhatian
                        </h1>
                        <h1 className="text-primary-black">Apakah Anda ingin mengakhiri test?</h1>
                      </div>
                      <div className="flex gap-x-3 pt-4 justify-center">
                        <Button
                          variant="custom"
                          styling=" w-24 bg-primary-green text-primary-white font-semibold"
                          href="/dashboard/selection/endtest"
                          onClick={() => {
                            score();
                            localStorage.removeItem("minutes");
                            localStorage.removeItem("seconds");
                            localStorage.removeItem("selectedAnswer");
                            localStorage.removeItem("isActiveQuestion");
                            setDashboardControlState(!getDashboardControlState);
                          }}
                        >
                          Iya
                        </Button>
                        <Button
                          variant="green-outline"
                          onClick={handleShowModal}
                          styling="font-normal"
                        >
                          Kembali
                        </Button>
                      </div>
                    </div>
                  </div>
                </Modal>
              </div>
            </section>
          )}
        </Fragment>
      )}
    </section>
  );
};
