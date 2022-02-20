import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import FS, { SCALE_HEIGHT } from 'lib/utils/normalize';
import { MAIN_COLOR } from 'constants/colors';
import Text from 'components/Text';
import Modal from '.';

const ModalView = ({ onClickDelete }) => {
  return (
    <TouchableOpacity style={styles.viewContainer} onPress={onClickDelete} activeOpacity={1}>
      <Text style={styles.delete}>삭제하기</Text>
    </TouchableOpacity>
  );
};

export default function DeleteModal({ deleteFunc, modal, setModal }) {
  const onBackdropPress = () => {
    setModal(!modal);
  };
  const onClickDelete = () => {
    deleteFunc();
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
    height: 92 * SCALE_HEIGHT,
    backgroundColor: MAIN_COLOR,
    alignItems: 'center',
    borderWidth: 1,
    position: 'absolute',
    bottom: -10 * SCALE_HEIGHT,
  },
  delete: {
    color: '#fff',
    fontSize: FS(14),
    marginTop: 17 * SCALE_HEIGHT,
  },
});
