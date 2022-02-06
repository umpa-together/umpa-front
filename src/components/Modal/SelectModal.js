import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import Modal from 'components/Modal';
import Text from 'components/Text';

const ModalView = ({ selectInfo, onClose }) => {
  const { func, list } = selectInfo;

  return (
    <View>
      <View style={styles.optionBox}>
        {list.map((item, index) => {
          const { key, title } = item;
          return (
            <TouchableOpacity
              style={styles.touchArea}
              key={title}
              activeOpacity={0.8}
              onPress={() => func(key)}
            >
              <Text style={[styles.option, key === 'report' && styles.report]}>{title}</Text>
              {index !== list.length - 1 && <View style={styles.divider} />}
            </TouchableOpacity>
          );
        })}
      </View>
      <TouchableOpacity style={styles.cancelBox} onPress={onClose} activeOpacity={0.8}>
        <Text style={styles.text}>취소</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function SelectModal({ modal, setModal, selectInfo }) {
  const onBackdropPress = () => {
    setModal(!modal);
  };

  return (
    <Modal
      isVisible={modal}
      onBackdropPress={onBackdropPress} // Android back press
      onSwipeComplete={onBackdropPress} // Swipe to discard
      animationIn="slideInUp" // Has others, we want slide in from the left
      animationOut="slideOutDown" // When discarding the drawer
      backdropOpacity={0.4}
      style={styles.container} // Needs to contain the width, 75% of screen width in our case
    >
      <ModalView selectInfo={selectInfo} onClose={onBackdropPress} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 49 * SCALE_HEIGHT,
  },
  text: {
    fontSize: FS(16),
    color: '#191919',
  },
  cancelBox: {
    width: 338 * SCALE_WIDTH,
    height: 60 * SCALE_HEIGHT,
    borderRadius: 12 * SCALE_HEIGHT,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16 * SCALE_HEIGHT,
  },
  optionBox: {
    backgroundColor: '#fff',
    borderRadius: 12 * SCALE_HEIGHT,
  },
  option: {
    fontSize: FS(16),
    color: '#191919',
  },
  touchArea: {
    width: '100%',
    height: 60 * SCALE_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    width: '100%',
    height: 1 * SCALE_HEIGHT,
    backgroundColor: '#DCDCDC',
    position: 'absolute',
    bottom: 0,
  },
  report: {
    color: '#e82c2c',
  },
});
