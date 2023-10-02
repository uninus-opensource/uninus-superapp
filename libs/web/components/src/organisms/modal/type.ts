import { PropsWithChildren, ReactNode } from "react";

export type ModalProps = PropsWithChildren<{
  showModal: boolean;
  onClose: () => void;
  iconClose?: boolean;
  modalTitle?: ReactNode;
  position?: "center" | "right-start";
  size?: "full" | "modal-question" | "md";
  className?: string;
  closeClassName?: string;
  headerColor?: "secondary-green" | "white-shadow" | "red" | "white" | "orange" | "green";
  titleColor?: "black" | "white" | "green" | "yellow" | "red";
  footerColor?: "green" | "white";
  bodyClassName?: string;
  modalFooter?: boolean;
}>;
