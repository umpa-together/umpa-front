import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useModal } from 'providers/modal';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import Modal from '.';

const ModalView = () => {
  const { onCloseHarmfulModal } = useModal();
  return (
    <View style={styles.viewContainer}>
      <Text style={styles.title}>유해성 컨텐츠는 현재 감상할 수 없습니다.</Text>
      <TouchableOpacity onPress={onCloseHarmfulModal}>
        <Text style={styles.complete}>확인</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function HarmfulModal() {
  const { harmfulModal, onCloseHarmfulModal } = useModal();

  return (
    <Modal isVisible={harmfulModal} onBackdropPress={onCloseHarmfulModal} style={styles.container}>
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
  },
});
