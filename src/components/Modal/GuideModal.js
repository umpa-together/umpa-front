import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useModal } from 'providers/modal';
import FastImage from 'react-native-fast-image';
import { checkGuide } from 'lib/utils/guideChecker';
import server from 'lib/api/server';
import Modal from '.';

const ModalView = ({ onClose }) => {
  const { guideModal } = useModal();
  const [guide, setGuide] = useState(null);
  const [currentIdx, setCureentIdx] = useState(0);

  const getGuide = async () => {
    const response = await server.get(`/user/guide/${guideModal}`);
    setGuide(response.data);
  };

  const onClickGuide = () => {
    if (currentIdx === guide.length - 1) {
      onClose();
    } else {
      setCureentIdx(currentIdx + 1);
    }
  };

  useEffect(() => {
    getGuide();
  }, []);

  return (
    <TouchableOpacity activeOpacity={1} onPress={onClickGuide}>
      {guide && (
        <FastImage style={styles.backgroundImg} source={{ uri: guide[currentIdx].image }} />
      )}
    </TouchableOpacity>
  );
};

export default function GuideModal({ modal, setModal }) {
  const { guideModal } = useModal();
  const onBackdropPress = () => {
    setModal(null);
    checkGuide(guideModal);
  };
  return (
    <Modal isVisible={modal} onBackdropPress={onBackdropPress} style={styles.container}>
      <ModalView onClose={onBackdropPress} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
    backgroundColor: '#00000040',
  },
  backgroundImg: {
    width: '100%',
    height: '100%',
  },
});
