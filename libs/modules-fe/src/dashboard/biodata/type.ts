export type TTextFieldOne = {
  name:
    | 'identification_type'
    | 'identification_number'
    | 'nisn'
    | 'phone_number';
  item: string;
  type: 'text';
};

export type TTextFieldTwo = {
  name: 'rt' | 'rw';
  item: string;
  type: 'text';
};

export type TTextFieldThree = {
  name: 'parent_rt' | 'parent_rw';
  item: string;
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
