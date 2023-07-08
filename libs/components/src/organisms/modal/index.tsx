import { Button } from '../../atoms';
import { ModalProps } from './interface';
import { IoCloseSharp } from 'react-icons/io5';
import { createPortal } from 'react-dom';
import { FC, ReactElement } from 'react';

export const Modal: FC<ModalProps> = ({
  showModal,
  onClose,
  onSubmit,
  modalTitle,
  children,
  submitText = 'Submit',
  closeText = 'Cancel',
}): ReactElement | null => {
  if (!showModal) {
    return null;
  }
  return (
    showModal &&
    createPortal(
      <div className="fixed w-full top-0 left-0 right-0 bottom-0 h-screen flex items-center justify-center bg-gray-800 bg-opacity-40 z-1000  p-4 overflow-x-hidden overflow-y-auto md:inset-0 ">
        <div className="relative w-full max-w-2xl max-h-full md:backdrop-blur-sm">
          <form
            onSubmit={onSubmit}
            className="relative bg-white rounded-lg shadow "
          >
            <div className="flex items-center justify-between p-4 rounded-t ">
              <h3 className="text-xl font-semibold text-gray-900">
                {modalTitle}
              </h3>
              <Button onClick={onClose} variant="text-icon" size="sm">
                <IoCloseSharp size={25} />
              </Button>
            </div>
            <div className="p-6 space-y-8">{children}</div>
            <div className="flex items-center p-6 space-x-2 rounded-lg">
              <Button
                type="submit"
                variant="filled"
                size="sm"
                width="w-16"
                height="h-8"
              >
                {submitText}
              </Button>
              <Button
                variant="filled-tonal"
                size="sm"
                width="w-16"
                height="h-8"
                onClick={onClose}
              >
                {closeText}
              </Button>
            </div>
          </form>
        </div>
      </div>,
      document.getElementById('modal')!
    )
  );
};
