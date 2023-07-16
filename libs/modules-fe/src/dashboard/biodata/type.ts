export type TTextFieldOne = {
  name:
    | 'identification_type'
    | 'identification_number'
    | 'nisn'
    | 'phone_number'
    | 'email';
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
