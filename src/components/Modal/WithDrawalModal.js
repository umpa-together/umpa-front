import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { COLOR_1, MAIN_COLOR, COLOR_2, COLOR_3 } from 'constants/colors';
import style from 'constants/styles';
import Text from 'components/Text';
import Modal from '.';

const ModalView = ({ onCloseGenreModal, setReason, currentReason }) => {
  const [current, setCurrent] = useState(currentReason);
  const withDrawalLists = [
    '직접 입력',
    '콘텐츠가 부족해요.',
    '앱 기능이 잘 이해되지 않아요.',
    '앱 장애가 많아 이용이 불편해요.',
    '원하는 곡이 없어요.',
    '스트리밍이 지원되지 않아요.',
  ];

  const onClickReason = (reason) => {
    if (current === reason) {
      setCurrent(null);
    } else {
      setCurrent(reason);
    }
  };

  const onClickComplete = () => {
    onCloseGenreModal();
    setReason(current);
  };

  return (
    <View style={styles.viewContainer}>
      <Text style={styles.title}>탈퇴 사유</Text>
      <TouchableOpacity style={styles.completeView} onPress={onClickComplete}>
        <Text style={current ? styles.complete : styles.notComplete}>완료</Text>
      </TouchableOpacity>
      <ScrollView>
        {withDrawalLists.map((reason) => {
          return (
            <TouchableOpacity
              key={reason}
              style={[style.flexRow, styles.box]}
              onPress={() => onClickReason(reason)}
              activeOpacity={0.9}
            >
              <View style={styles.circle}>
                {current === reason && <View style={styles.activeCircle} />}
              </View>
              <Text style={styles.reason}>{reason}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default function WithdrawalModal({ modal, setModal, setReason, reason }) {
  const onCloseGenreModal = () => {
    setModal(!modal);
  };
  return (
    <Modal
      isVisible={modal}
      onBackdropPress={onCloseGenreModal}
      style={styles.container}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <ModalView
        onCloseGenreModal={onCloseGenreModal}
        setReason={setReason}
        currentReason={reason}
      />
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
    height: 659 * SCALE_HEIGHT,
    backgroundColor: '#fff',
    borderTopLeftRadius: 10 * SCALE_HEIGHT,
    borderTopRightRadius: 10 * SCALE_HEIGHT,
  },
  title: {
    fontSize: FS(16),
    color: COLOR_1,
    marginTop: 25 * SCALE_HEIGHT,
    textAlign: 'center',
    marginBottom: 42 * SCALE_HEIGHT,
  },
  completeView: {
    position: 'absolute',
    right: 14 * SCALE_WIDTH,
    top: 29 * SCALE_HEIGHT,
  },
  notComplete: {
    fontSize: FS(12),
    color: COLOR_3,
  },
  complete: {
    fontSize: FS(12),
    color: MAIN_COLOR,
  },
  box: {
    height: 42 * SCALE_HEIGHT,
    paddingLeft: 18 * SCALE_WIDTH,
    alignItems: 'center',
  },
  circle: {
    width: 20 * SCALE_WIDTH,
    height: 20 * SCALE_WIDTH,
    borderRadius: 20 * SCALE_HEIGHT,
    borderWidth: 1 * SCALE_WIDTH,
    borderColor: '#dbdbdb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCircle: {
    width: 12 * SCALE_WIDTH,
    height: 12 * SCALE_WIDTH,
    borderRadius: 12 * SCALE_HEIGHT,
    backgroundColor: MAIN_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reason: {
    fontSize: FS(15),
    color: COLOR_2,
    marginLeft: 20 * SCALE_WIDTH,
  },
});
