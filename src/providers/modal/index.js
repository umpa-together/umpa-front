import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext(null);

export const useModal = () => useContext(ModalContext);

export default function ModalProvider({ children }) {
  const [isModal, setIsModal] = useState(false);
  const [isSearchModal, setIsSearchModal] = useState(false);
  const [isSideModal, setIsSideModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isPlaylistModal, setIsPlaylistModal] = useState(false);

  const [deleteParams, setDeleteParams] = useState({
    opt: '',
    targetId: '',
    childId: '',
  });
  const onCloseModal = () => {
    if (isModal) {
      setIsModal(false);
    } else if (isSearchModal) {
      setIsSearchModal(false);
    } else if (isSideModal) {
      setIsSideModal(false);
    } else if (isDeleteModal) {
      setIsDeleteModal(false);
    } else if (isPlaylistModal) {
      setIsPlaylistModal(false);
    }
  };

  const changeDeleteParams = ({ data }) => {
    setDeleteParams({
      opt: data.opt,
      targetId: data.targetId,
      childId: data.childId,
    });
  };

  const value = {
    isModal,
    isSearchModal,
    isSideModal,
    isDeleteModal,
    isPlaylistModal,
    deleteParams,
    setIsSideModal,
    setIsModal,
    setIsSearchModal,
    setIsDeleteModal,
    setIsPlaylistModal,
    setDeleteParams,
    changeDeleteParams,
    onCloseModal,
  };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}
