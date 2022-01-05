import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useModal } from 'providers/modal';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import style from 'constants/styles';
import { Context as PlaylistContext } from 'context/Playlist';
import Modal from '.';

const ModalView = () => {
  const { deleteParams, onCloseModal } = useModal();
  const { deleteComment } = useContext(PlaylistContext);
  const { targetId, opt, childId } = deleteParams;
  const onPressDelete = () => {
    if (opt === 'playlistcomment') {
      deleteComment({ id: targetId, commentId: childId });
    }
    onCloseModal();
  };

  return (
    <View style={styles.viewContainer}>
      <Text style={styles.title}>{deleteParams.opt}삭제하시겠습니까?</Text>
      <View style={style.flexRow}>
        <TouchableOpacity onPress={onCloseModal}>
          <Text style={styles.complete}>취소하기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressDelete}>
          <Text style={styles.complete}>삭제하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function DeleteModal() {
  const { isDeleteModal, onCloseModal } = useModal();

  return (
    <Modal isVisible={isDeleteModal} onBackdropPress={onCloseModal} style={styles.container}>
      <ModalView />
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
    alignItems: 'center',
  },
  viewContainer: {
    width: 305 * SCALE_WIDTH,
    height: 94 * SCALE_HEIGHT,
    backgroundColor: 'rgb(254,254,254)',
    borderRadius: 8 * SCALE_HEIGHT,
    alignItems: 'center',
  },
  title: {
    fontSize: FS(16),
    color: 'rgb(86,86,86)',
    marginTop: 24 * SCALE_HEIGHT,
  },
  complete: {
    fontSize: FS(16),
    marginTop: 16 * SCALE_HEIGHT,
    marginRight: 10 * SCALE_WIDTH,
  },
});
