export type TKelolaPertanyaan = {
  id: number;
  question: string;
  correct_answer: string;
  answers: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
};
export type TDeleteQuestion = {
  id: number;
};
