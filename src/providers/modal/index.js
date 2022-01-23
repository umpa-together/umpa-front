import React, { createContext, useContext, useState } from 'react';
import { Animated } from 'react-native';

const ModalContext = createContext(null);

export const useModal = () => useContext(ModalContext);

export default function ModalProvider({ children }) {
  const [harmfulModal, setHarmfulModal] = useState(false);
  const [representModal, setRepresentModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addedModal, setAddedModal] = useState(false);
  const [validityModal, setValidityModal] = useState(false);

  const opacity = useState(new Animated.Value(1))[0];

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

  const onCloseDeleteModal = () => {
    setDeleteModal(false);
  };

  const changeDeleteParams = ({ data }) => {
    setDeleteParams({
      opt: data.opt,
      targetId: data.targetId,
      childId: data.childId,
    });
  };

  const onClickAdded = () => {
    setAddedModal(true);
    setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        setAddedModal(false);
        opacity.setValue(1);
      }, 1500);
    }, 1500);
  };

  const onPlayValidityModal = () => {
    setValidityModal(true);
    setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        setValidityModal(false);
        opacity.setValue(1);
      }, 1500);
    }, 1500);
  };

  const value = {
    harmfulModal,
    representModal,
    addedModal,
    validityModal,
    opacity,
    setHarmfulModal,
    setRepresentModal,
    deleteModal,
    deleteParams,
    setDeleteModal,
    setDeleteParams,
    changeDeleteParams,
    onCloseHarmfulModal,
    onCloseRepresentModal,
    onCloseDeleteModal,
    onClickAdded,
    onPlayValidityModal,
  };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}
