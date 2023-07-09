export type TSelectType = {
  label: string;
  value: string;
  width?: string;
  size: 'sm' | 'md';
  name: string;
  options: string[];
  placeholder: string;
  message?: string;
  status?: 'success' | 'error' | 'warning' | 'none';
};
