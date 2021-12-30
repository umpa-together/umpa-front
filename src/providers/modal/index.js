import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext(null);

export const useModal = () => useContext(ModalContext);

export default function ModalProvider({ children }) {
  const [isModal, setIsModal] = useState(false);
  const [isSearchModal, setIsSearchModal] = useState(false);

  const onCloseModal = () => {
    if (isModal) {
      setIsModal(false);
    } else {
      setIsSearchModal(false);
    }
  };

  const value = {
    isModal,
    isSearchModal,
    setIsModal,
    setIsSearchModal,
    onCloseModal,
  };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}
