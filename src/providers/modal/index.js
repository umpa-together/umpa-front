import React, { createContext, useContext, useState } from 'react';
import { Animated } from 'react-native';

const ModalContext = createContext(null);

export const useModal = () => useContext(ModalContext);

export default function ModalProvider({ children }) {
  const [harmfulModal, setHarmfulModal] = useState(false);
  const [representModal, setRepresentModal] = useState(false);
  const [addedModal, setAddedModal] = useState(false);
  const [addedModalText, setAddedModalText] = useState('');
  const [validityModal, setValidityModal] = useState(false);
  const [guideModal, setGuideModal] = useState(null);

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

  const onClickAdded = ({ opt }) => {
    if (opt === 'save') {
      setAddedModalText('1곡을 저장한 곡 목록에 담았습니다.');
    } else if (opt === 'copy') {
      setAddedModalText('노래제목을 복사하였습니다.');
    } else {
      setAddedModalText('플레이리스트가 저장되었습니다.');
    }
    setAddedModal(true);
    setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        setAddedModal(false);
        opacity.setValue(1);
      }, 1000);
    }, 1000);
  };

  const onValidityModal = () => {
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
    addedModalText,
    validityModal,
    guideModal,
    opacity,
    deleteParams,
    setHarmfulModal,
    setRepresentModal,
    setDeleteParams,
    setGuideModal,
    onCloseHarmfulModal,
    onCloseRepresentModal,
    onClickAdded,
    onValidityModal,
  };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}
