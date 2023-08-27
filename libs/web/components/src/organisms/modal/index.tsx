import { Button } from "../../atoms";
import { ModalProps } from "./interface";
import { IoCloseSharp } from "react-icons/io5";
import { createPortal } from "react-dom";
import { FC, ReactElement } from "react";

export const Modal: FC<ModalProps> = ({
  showModal,
  onClose,
  iconClose = true,
  modalTitle,
  children,
  className = "max-w-2xl max-h-full rounded-lg bg-primary-white",
  closeClassName = "text-primary-black",
  headerColor = "",
  footerColor = "",
  bodyClassName = "p-6 space-y-8",
}): ReactElement | null => {
  if (!showModal) {
    return null;
  }

  return (
    showModal &&
    createPortal(
      <div className="fixed w-full top-0 left-0 right-0 bottom-0 h-screen flex items-center justify-center bg-primary-black bg-opacity-50 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 backdrop-blur-sm">
        <div data-testid="modal-landing" className={`relative w-full ${className}`}>
          <div className="relative bg-white rounded-lg shadow">
            <div className={`flex items-center justify-between py-4 px-4 rounded-t ${headerColor}`}>
              <div className="text-xl font-semibold text-gray-900 w-full md:px-10 lg:px-4 ">
                {modalTitle}
              </div>
              {iconClose ? (
                <Button onClick={onClose} variant="text-icon" size="sm">
                  <IoCloseSharp size={25} className={closeClassName} />
                </Button>
              ) : (
                ""
              )}
            </div>
            <div className={bodyClassName}>{children}</div>
            <div className={`w-full h-[30px] rounded-b ${footerColor}`}></div>
          </div>
        </div>
      </div>,
      document.getElementById("modal-landing") as HTMLElement,
    )
  );
};
