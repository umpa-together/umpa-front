import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext(null);

export const useModal = () => useContext(ModalContext);

export default function ModalProvider({ children }) {
  const [isModal, setIsModal] = useState(false);

  const onCloseModal = () => {
    setIsModal(false);
  };

  const value = {
    isModal,
    setIsModal,
    onCloseModal,
  };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}
