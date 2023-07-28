export type TTextFieldOne = {
  name: 'nisn' | 'phone_number' | 'fullname' | 'email';
  item: string;
  placeholder: string;
  type: 'text';
};

export type TTextFieldAyah = {
  name: 'father_education' | 'father_occupation' | 'father_income';
  item: string;
  type: 'text';
  className: string;
};

export type TTextFieldIbu = {
  name: 'mother_education' | 'mother_occupation' | 'mother_income';
  item: string;
  type: 'text';
  className: string;
};
