export type FormData = {
  file: FileList;
};

export type TUploadFile = {
  variant: 'sm' | 'md' | 'lg';
  className?: string;
  required?: boolean;
};
