export type TGetQuestionData = {
  results: Array<{
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }>;
};
export type TTimer = {
  minutes: number;
  seconds: number;
};
