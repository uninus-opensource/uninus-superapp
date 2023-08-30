export type TGetQuestionData = {
  results: Array<{
    no?: number;
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }>;
};

export type ReturnTypesQuestionData = {
  setQuestion: (val: TGetQuestionData | undefined) => void;
  getQuestion: TGetQuestionData | undefined;
};
export type TTimer = {
  minutes: number;
  seconds: number;
};
