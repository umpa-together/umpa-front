import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { COLOR_1, COLOR_5 } from 'constants/colors';
import Modal from 'components/Modal';
import PrivacyPolicyForm from 'components/Setting/PrivatePolicyForm';
import TosForm from 'components/Setting/TosForm';

const ModalView = ({ onCloseModal, type }) => {
  const termLists = {
    useTerm: <TosForm />,
    privateTerm: <PrivacyPolicyForm />,
  };

  return (
    <View style={styles.modal}>
      <View>
        <Text style={styles.title}>
          {type === 'useTerm' ? '이용약관 동의' : '개인정보 수집 및 이용동의'}
        </Text>
        <TouchableOpacity onPress={onCloseModal}>
          <Text style={styles.actionText}>닫기</Text>
        </TouchableOpacity>
      </View>
      {termLists[type]}
    </View>
  );
};

export default function TermModalView({ modal, setModal, type }) {
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
      backdropOpacity={0.7}
      style={styles.container} // Needs to contain the width, 75% of screen width in our case
    >
      <ModalView onCloseModal={onBackdropPress} type={type} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modal: {
    borderTopRightRadius: 28 * SCALE_HEIGHT,
    borderTopLeftRadius: 28 * SCALE_HEIGHT,
    width: '100%',
    height: '80%',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: FS(16),
    color: COLOR_1,
    textAlign: 'center',
    marginTop: 25 * SCALE_HEIGHT,
  },
  actionText: {
    fontSize: FS(12),
    color: COLOR_5,
    position: 'absolute',
    right: 16 * SCALE_WIDTH,
    top: -15 * SCALE_HEIGHT,
  },
});
