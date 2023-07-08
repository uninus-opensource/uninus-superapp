export type TTextFieldOne = {
  name:
    | 'namaLengkap'
    | 'email'
    | 'kartuIdentitas'
    | 'nomorKartuIdentitas'
    | 'nisn'
    | 'noWA';
  item: string;
  type: 'text' | 'email';
};

export type TTextFieldTwo = {
  name: 'rt' | 'rw';
  item: string;
  type: 'text' | 'number';
};

export type TTextFieldThree = {
  name: 'rt' | 'rw';
  item: string;
  type: 'text' | 'number';
};
