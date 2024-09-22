import { useEffect, useRef, useState } from "react";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  id?: string;
  className?: string;
  testId?: string;
}

export default function BaseModal({
  isOpen,
  onClose,
  title,
  children,
  id,
  className = 'modal-w-sm',
  testId = "base-modal"
}: Props): JSX.Element {
  const modalTitle: React.ReactNode = title ? (
    <>
      <h1 className="text-2xl capitalize" data-testid="modal-title">
        {title}
      </h1>
      <hr className="h-px mt-1 mb-2 bg-gray-400 border-0 dark:bg-gray-700" />
    </>
  ) : null;

  const idString: string = id ? `${id}Modal` : "baseModal";

  const [isModalOpen, setModalOpen] = useState(isOpen);
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
    setModalOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const modalElement = modalRef.current;

    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);

  return (
    <dialog
      aria-modal="true"
      ref={modalRef}
      className={`${className} rounded p-4 backdrop:bg-black backdrop:bg-opacity-50`}
      onKeyDown={handleKeyDown}
      id={idString}
      data-testid={testId}
    >
      {modalTitle}
      <FontAwesomeIcon
        icon={faXmark}
        onClick={handleCloseModal}
        tabIndex={0}
        className="absolute top-4 right-4 h-6 w-6 text-gray-400 hover:text-gray-500 transition-all duration-150 cursor-pointer"
        id="close"
        data-testid="x-button"
      />
      {children}
    </dialog>
  );
}
