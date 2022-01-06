import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useModal } from 'providers/modal';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import Modal from '.';

const ModalView = () => {
  return (
    <View style={[styles.viewContainer]}>
      <TouchableOpacity>
        <Text style={styles.complete}>플레이리스트 편집</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.complete}>플레이리스트 삭제</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.complete}>플레이리스트 공유</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function PlaylistModal() {
  const { playlistModal, onClosePlaylistModal } = useModal();

  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      isVisible={playlistModal}
      onBackdropPress={onClosePlaylistModal}
      style={styles.container}
    >
      <ModalView />
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  viewContainer: {
    width: '100%',
    height: 200 * SCALE_HEIGHT,
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
