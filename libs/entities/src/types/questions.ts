export type TCreateQuestionRequest = {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type TUpdateQuestionRequest = {
  question?: string;
  correct_answer?: string;
  incorrect_answers?: string[];
};

export type TDeleteQuestionResponse = {
  message: string;
};
