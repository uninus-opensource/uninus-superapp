import { atom } from "recoil";

export const answerState = atom({
  key: "answer-state",
  default: {
    answer: 0,
  },
});

export const questionState = atom({
  key: "question-state",
  default: 0,
});
export const queyQuestionState = atom({
  key: "queyQuestionState",
  default: [
    {
      category: "Sports",
      type: "multiple",
      difficulty: "easy",
      question: "In golf, what name is given to a hole score of two under par?",
      correct_answer: "Eagle",
      incorrect_answers: ["Birdie", "Bogey", "Albatross"],
    },
    {
      category: "Sports",
      type: "multiple",
      difficulty: "easy",
      question: "Which English football club has the nickname 'The Foxes'?",
      correct_answer: "Leicester City",
      incorrect_answers: ["Northampton Town", "Bradford City", "West Bromwich Albion"],
    },
    {
      category: "Sports",
      type: "multiple",
      difficulty: "easy",
      question: "Which team won the 2014 FIFA World Cup in Brazil?",
      correct_answer: "Germany",
      incorrect_answers: ["Argentina", "Brazil", "Netherlands"],
    },

    {
      category: "Sports",
      type: "multiple",
      difficulty: "easy",
      question:
        "Which year did Jenson Button win his first ever Formula One World Drivers' Championship?",
      correct_answer: "2009",
      incorrect_answers: ["2010", "2007", "2006"],
    },
    {
      category: "Sports",
      type: "multiple",
      difficulty: "easy",
      question: "Who won the 2017 Formula One World Drivers' Championship?",
      correct_answer: "Lewis Hamilton",
      incorrect_answers: ["Sebastian Vettel", "Nico Rosberg", "Max Verstappen"],
    },
    {
      category: "Sports",
      type: "multiple",
      difficulty: "easy",
      question: "Which two teams played in Super Bowl XLII?",
      correct_answer: "The New York Giants & The New England Patriots",
      incorrect_answers: [
        "The Green Bay Packers & The Pittsburgh Steelers",
        "The Philadelphia Eagles & The New England Patriots",
        "The Seattle Seahawks & The Denver Broncos",
      ],
    },
  ],
});

export const timerState = atom({
  key: "timer-state",
  default: 0,
});

export const incorrectAnswers = atom({
  key: "incorrect-answers",
  default: 0,
});
