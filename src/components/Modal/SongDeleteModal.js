import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { MAIN_COLOR } from 'constants/colors';
import Modal from '.';

const ModalView = ({ onClickDelete }) => {
  return (
    <TouchableOpacity style={styles.viewContainer} onPress={onClickDelete} activeOpacity={1}>
      <Text>삭제하기</Text>
    </TouchableOpacity>
  );
};

export default function SongDeleteModal({ song, setSong, modal, setModal }) {
  const onBackdropPress = () => {
    setModal(!modal);
  };
  const onClickDelete = () => {
    setSong((prev) => prev.filter((item) => item.id !== song.id));
    onBackdropPress();
  };
  return (
    <Modal
      isVisible={modal}
      onBackdropPress={onBackdropPress}
      style={styles.container}
      backdropOpacity={0}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <ModalView onClickDelete={onClickDelete} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  viewContainer: {
    width: '100%',
    height: 82 * SCALE_HEIGHT,
    backgroundColor: MAIN_COLOR,
    alignItems: 'center',
  },
});
