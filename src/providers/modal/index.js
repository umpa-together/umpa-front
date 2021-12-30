import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext(null);

export const useModal = () => useContext(ModalContext);

export default function ModalProvider({ children }) {
  const [isModal, setIsModal] = useState(false);
  const [sideModal, setSideModal] = useState(false);
  const onCloseModal = () => {
    setIsModal(false);
  };
  const onCloseSideModal = () => {
    setSideModal(false);
  };

  const value = {
    isModal,
    sideModal,
    setSideModal,
    setIsModal,
    onCloseModal,
    onCloseSideModal,
  };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}
