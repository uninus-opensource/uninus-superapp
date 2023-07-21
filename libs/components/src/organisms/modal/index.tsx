import { Button } from '../../atoms';
import { ModalProps } from './interface';
import { IoCloseSharp } from 'react-icons/io5';
import { createPortal } from 'react-dom';
import { FC, ReactElement } from 'react';

export const Modal: FC<ModalProps> = ({
  showModal,
  onClose,
  iconClose = true,
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
      <div className="fixed w-full top-0 left-0 right-0 bottom-0 h-screen flex items-center justify-center bg-grayscale-6 bg-opacity-50 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0">
        <div className="relative w-full max-w-2xl max-h-full md:backdrop-blur-sm rounded-lg bg-primary-white">
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-center justify-between pt-4 px-4 rounded-t">
              <h3 className="text-xl font-semibold text-gray-900 w-full">
                {modalTitle}
              </h3>
              {iconClose ? (
                <Button onClick={onClose} variant="text-icon" size="sm">
                  <IoCloseSharp size={25} />
                </Button>
              ) : (
                ''
              )}
            </div>
            <div className="p-6 space-y-8">{children}</div>
          </div>
        </div>
      </div>,
      document.getElementById('modal')!
    )
  );
};
