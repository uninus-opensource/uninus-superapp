"use client";
import { FC, ReactElement, useState, useRef, useEffect } from "react";
import { Button } from "@uninus/web/components";
import { Modal } from "@uninus/web/components";
import { PiWarningCircleBold } from "react-icons/pi";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";
import { useRecoilState, useRecoilValue } from "recoil";
import { questionState, queyQuestionState, timerState } from "./store";
import { TTimer } from "./type";
export const QuizModule: FC = (): ReactElement => {
  const [isActiveQuestion, setIsActiveQuestion] = useRecoilState<number>(questionState);
  const [selectedAnsweridx, setSelectedAnsweridx] = useState<number | null>(null);
  const listDataQuestion = useRecoilValue(queyQuestionState);
  const timerQuiz = useRecoilValue(timerState);
  const timer: TTimer =
    typeof localStorage !== "undefined" && JSON.parse(String(localStorage.timer));
  const [minutes, setMinutes] = useState<number>(() => (timer ? timer.minutes : timerQuiz));
  const [seconds, setSeconds] = useState<number>(() => (timer ? timer.seconds : timerQuiz));
  const [showModal, setShowModal] = useState<boolean>(false);

  const getQuestionData = listDataQuestion?.map((el) => ({
    question: el.question,
    options: [...el.incorrect_answers, el.correct_answer],
  }));
  const intervalRef = useRef<any>();
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
          setSeconds(timerQuiz);
        }
      }
    }, 1000);

    return () => {
      localStorage.setItem(
        "timer",
        JSON.stringify({
          minutes,
          seconds,
        }),
      );

      clearInterval(intervalRef.current);
    };
  }, [minutes, seconds]);
  const onOptionSelected = (answer: string, idx: number): void => {
    setSelectedAnsweridx(idx);
  };
  const nextQuestion = (): void => {
    setSelectedAnsweridx(null);

    setIsActiveQuestion((prev) => prev + 1);
  };
  const prevQuestion = (): void => {
    setSelectedAnsweridx(null);

    if (isActiveQuestion !== 0) {
      setIsActiveQuestion((prev) => prev - 1);
    }
  };
  const handleShowModal = () => setShowModal(!showModal);
  const optionsAlphabet: string[] = ["A", "B", "C", "D"];
  return (
    <section className="flex flex-col w-full h-auto justify-center items-center ">
      {/* header */}
      <div className="w-[80%] lg:w-full flex flex-col justify-start items-start">
        <h1 className="text-slate-5">
          PMB <span className="text-secondary-green-4"> / Seleksi Test</span>
        </h1>
        <p className="text-lg 2xl:text-2xl font-bold text-secondary-green-4">Seleksi Test</p>
      </div>

      {/* body */}
      <div className="w-[80%] lg:w-full relative rounded-lg h-auto md:h-[30rem] lg:h-[27rem] xl:h-[83vh] xl:w-full bg-primary-white  2xl:w-full 2xl:h-[84vh] flex flex-col p-4">
        <div className="flex flex-col gap-y-3">
          <div className="flex w-full pb-3 justify-between items-center border-b-[3px] border-b-slate-5">
            <h1 className="text-primary-green text-lg lg:text-3xl py-3 font-extrabold">
              Seleksi Test
            </h1>
            <div className="px-2 lg:px-4 py-2 shadow-[0px_0px_2px_1px_#00000024] text-medium lg:text-2xl text-primary-green font-bold rounded-sm">
              {minutes === 0 && seconds === 0 ? null : (
                <h1>
                  {" "}
                  {minutes} : {seconds < 10 ? `0${seconds}` : seconds}
                </h1>
              )}
            </div>
          </div>
          <h2 className="font-extrabold lg:text-2xl">{`Soal No. ${isActiveQuestion + 1}/ ${
            listDataQuestion?.length
          }`}</h2>
          <div>
            {getQuestionData && isActiveQuestion < getQuestionData.length ? (
              <div>
                <h3 className="text-sm lg:text-base">
                  {getQuestionData[isActiveQuestion].question}
                </h3>
                <ul>
                  {getQuestionData[isActiveQuestion].options.map((option, idx) => (
                    <li
                      onClick={() => onOptionSelected(option, idx)}
                      key={idx}
                      className={`flex gap-y-2 group items-center gap-x-2 cursor-pointer p-4 rounded-md font-medium hover:bg-slate-2
                    `}
                    >
                      <span
                        className={`border px-2 py-1 lg:px-3 text-sm lg:text-base ${
                          selectedAnsweridx === idx ? "bg-secondary-sky-2" : ""
                        }`}
                      >
                        {optionsAlphabet[idx]}
                      </span>
                      <p className="text-sm">{option}</p>
                    </li>
                  ))}
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
          {showModal && (
            <Modal showModal={showModal} onClose={handleShowModal} iconClose={false}>
              <div className="flex flex-col justify-center items-center lg:flex lg:flex-row lg:py-10">
                <div className="txt mt-4 lg:mt-0">
                  <div className="text-center flex flex-col items-center">
                    <PiWarningCircleBold className="text-red-6 text-center" size={120} />
                    <h1 className="font-extrabold text-3xl text-primary-black mb-2">Perhatian</h1>
                    <h1 className="text-primary-black">Apakah Anda ingin mengakhiri test?</h1>
                  </div>
                  <div className="flex gap-x-3 pt-4 justify-center">
                    <Button
                      variant="custom"
                      styling=" w-24 bg-primary-green text-primary-white font-semibold"
                      href="/dashboard/selection/endtest"
                    >
                      Iya
                    </Button>
                    <Button variant="green-outline" onClick={handleShowModal} styling="font-normal">
                      Kembali
                    </Button>
                  </div>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </section>
  );
};
