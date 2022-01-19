import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import Modal from 'components/Modal';

const SortModalView = ({ sortList, sortFunction }) => {
  return (
    <View style={[styles.sortModal]}>
      {sortList.map((item, index) => {
        return (
          <View key={item.key} style={[index > 0 && styles.divider, styles.elementContainer]}>
            <TouchableOpacity
              style={styles.elementContainer}
              onPress={() => sortFunction(item.key)}
            >
              <Text style={styles.textTitle}>{item.title}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const CancleModalView = ({ onCloseModal }) => {
  return (
    <TouchableOpacity style={styles.cancelModal} onPress={onCloseModal}>
      <Text style={styles.textTitle}>취소</Text>
    </TouchableOpacity>
  );
};

export default function SortModal({ modal, setModal, sortList, sortFunction }) {
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
      backdropOpacity={0}
      style={styles.container} // Needs to contain the width, 75% of screen width in our case
    >
      <SortModalView sortFunction={sortFunction} sortList={sortList} />
      <CancleModalView onCloseModal={onBackdropPress} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 30 * SCALE_HEIGHT,
  },
  sortModal: {
    width: 350 * SCALE_WIDTH,
    height: 100 * SCALE_HEIGHT,
    borderRadius: 10 * SCALE_HEIGHT,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  cancelModal: {
    marginTop: 29 * SCALE_HEIGHT,
    width: 350 * SCALE_WIDTH,
    backgroundColor: '#eee',
    height: 50 * SCALE_HEIGHT,
    borderRadius: 10 * SCALE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  elementContainer: {
    width: '100%',
    height: 50 * SCALE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  divider: {
    borderTopWidth: 1,
    borderColor: '#333',
  },
  textTitle: {
    fontSize: FS(16),
  },
  dividerContainer: {
    width: '100%',
    height: 1 * SCALE_HEIGHT,
    backgroundColor: '#000',
  },
});
