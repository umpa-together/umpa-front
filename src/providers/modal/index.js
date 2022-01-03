import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext(null);

export const useModal = () => useContext(ModalContext);

export default function ModalProvider({ children }) {
  const [isModal, setIsModal] = useState(false);
  const [isSearchModal, setIsSearchModal] = useState(false);
  const [sideModal, setSideModal] = useState(false);

  const onCloseModal = () => {
    if (isModal) {
      setIsModal(false);
    } else {
      setIsSearchModal(false);
    }
  };

  const onCloseSideModal = () => {
    setSideModal(false);
  };

  const value = {
    isModal,
    isSearchModal,
    sideModal,
    setSideModal,
    setIsModal,
    setIsSearchModal,
    onCloseModal,
    onCloseSideModal,
  };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}
