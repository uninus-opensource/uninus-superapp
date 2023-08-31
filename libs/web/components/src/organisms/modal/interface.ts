import { ReactNode } from "react";

export interface ModalProps {
  showModal: boolean;
  onClose: () => void;
  iconClose?: boolean;
  modalTitle?: ReactNode;
  children?: ReactNode;
  position?: "center" | "right-start" ;
  size?: "full" | "modal-question";
  className?: string;
  closeClassName?: string;
  headerColor?: "secondary-green" | "white-shadow" | "red" | "white" | "orange" | "green";

  footerColor?: "green" | "white";
  bodyClassName?: string;
}
