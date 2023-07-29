import { ReactNode } from 'react';

export interface ModalProps {
  showModal: boolean;
  onClose: () => void;
  iconClose?: boolean;
  modalTitle: string;
  children?: ReactNode;
  submitText?: string;
  closeText?: string;
}
