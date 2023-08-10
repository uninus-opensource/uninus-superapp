"use client";
import { selector, atom } from "recoil";
import axios from "axios";
import { TGetQuestionData } from "./type";
export const answerState = atom({
  key: "answer-state",
  default: {
    answer: 0,
  },
});

export const questionState = selector({
  key: "question-state",
  get: async () => {
    try {
      const { data } = await axios.get<TGetQuestionData>(
        "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple",
      );
      return data?.results;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
});

export const timerState = atom({
  key: "timer-state",
  default: 0,
});

export const incorrectAnswers = atom({
  key: "incorrect-answers",
  default: 0,
});
