import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext(null);

export const useModal = () => useContext(ModalContext);

export default function ModalProvider({ children }) {
  const [harmfulModal, setHarmfulModal] = useState(false);
  const [representModal, setRepresentModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [sideModal, setSideModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [playlistModal, setPlaylistModal] = useState(false);

  const onCloseHarmfulModal = () => {
    setHarmfulModal(false);
  };

  const onCloseRepresentModal = () => {
    setRepresentModal(false);
  };

  const [deleteParams, setDeleteParams] = useState({
    opt: '',
    targetId: '',
    childId: '',
  });

  const onCloseSearchModal = () => {
    setSearchModal(false);
  };
  const onCloseSideModal = () => {
    setSideModal(false);
  };

  const onCloseDeleteModal = () => {
    setDeleteModal(false);
  };
  const onClosePlaylistModal = () => {
    setPlaylistModal(false);
  };

  const changeDeleteParams = ({ data }) => {
    setDeleteParams({
      opt: data.opt,
      targetId: data.targetId,
      childId: data.childId,
    });
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
    deleteModal,
    playlistModal,
    deleteParams,
    setDeleteModal,
    setPlaylistModal,
    setDeleteParams,
    changeDeleteParams,
    onCloseHarmfulModal,
    onCloseRepresentModal,
    onCloseSearchModal,
    onCloseSideModal,
    onCloseDeleteModal,
    onClosePlaylistModal,
  };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}
