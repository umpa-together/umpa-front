import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext(null);

export const useModal = () => useContext(ModalContext);

export default function ModalProvider({ children }) {
  const [harmfulModal, setHarmfulModal] = useState(false);
  const [representModal, setRepresentModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [sideModal, setSideModal] = useState(false);

  const onCloseHarmfulModal = () => {
    setHarmfulModal(false);
  };

  const onCloseRepresentModal = () => {
    setRepresentModal(false);
  };

  const onCloseSearchModal = () => {
    setSearchModal(false);
  };

  const onCloseSideModal = () => {
    setSideModal(false);
  };

  const value = {
    harmfulModal,
    representModal,
    searchModal,
    sideModal,
    setHarmfulModal,
    setRepresentModal,
    setSideModal,
    setSearchModal,
    onCloseHarmfulModal,
    onCloseRepresentModal,
    onCloseSearchModal,
    onCloseSideModal,
  };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}
