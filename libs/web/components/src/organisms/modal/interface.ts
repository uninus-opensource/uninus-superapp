import { ReactNode } from "react";

export interface ModalProps {
  showModal: boolean;
  onClose: () => void;
  iconClose?: boolean;
  modalTitle?: ReactNode;
  children?: ReactNode;
  className?: string;
  closeClassName?: string;
  headerColor?: string;
  bodyClassName?: string;
}
