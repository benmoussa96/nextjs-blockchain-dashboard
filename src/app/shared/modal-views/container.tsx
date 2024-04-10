'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Modal } from 'rizzui';
import { useModal } from './use-modal';

export default function GlobalModal() {
  const { isOpen, view, closeModal, customSize } = useModal();
  const pathname = usePathname();
  useEffect(() => {
    closeModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      customSize={customSize}
      overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
      containerClassName="dark:bg-gray-100"
      className="z-[9999]"
    >
      {view}
    </Modal>
  );
}
