import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import style from 'constants/styles';
import { MAIN_COLOR } from 'constants/colors';
import Modal from '.';

const ModalView = ({ actionInfo }) => {
  const { mainTitle, func, list } = actionInfo;

  return (
    <View style={styles.viewContainer}>
      <Text style={styles.title}>{mainTitle}</Text>
      <View style={style.flexRow}>
        {list.map((item) => {
          const { key, title } = item;
          return (
            <TouchableOpacity
              key={key}
              style={[
                styles.box,
                // eslint-disable-next-line no-nested-ternary
                key === 'cancel' ? styles.left : key === 'report' ? styles.report : styles.main,
              ]}
              onPress={() => func(key)}
              activeOpacity={0.8}
            >
              <Text style={key === 'cancel' ? styles.leftText : styles.rightText}>{title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default function ActionModal({ modal, setModal, actionInfo }) {
  const onBackdropPress = () => {
    setModal(!modal);
  };
  return (
    <Modal isVisible={modal} onBackdropPress={onBackdropPress} style={styles.container}>
      <ModalView actionInfo={actionInfo} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
    alignItems: 'center',
  },
  viewContainer: {
    width: 302 * SCALE_WIDTH,
    backgroundColor: 'rgb(254,254,254)',
    borderRadius: 8 * SCALE_HEIGHT,
    alignItems: 'center',
    paddingTop: 28 * SCALE_HEIGHT,
    paddingBottom: 20 * SCALE_HEIGHT,
    paddingHorizontal: 20 * SCALE_WIDTH,
  },
  title: {
    fontSize: FS(15),
    marginBottom: 25 * SCALE_HEIGHT,
    textAlign: 'center',
    lineHeight: 24 * SCALE_HEIGHT,
  },
  box: {
    width: 116 * SCALE_HEIGHT,
    height: 36 * SCALE_HEIGHT,
    borderRadius: 8 * SCALE_HEIGHT,
    borderWidth: 1.5 * SCALE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 9 * SCALE_WIDTH,
  },
  left: {
    borderColor: '#e9e9e9',
  },
  main: {
    backgroundColor: MAIN_COLOR,
    borderColor: MAIN_COLOR,
  },
  report: {
    backgroundColor: '#E82C2C',
    borderColor: '#E82C2C',
  },
  leftText: {
    fontSize: FS(14),
    color: '#858585',
  },
  rightText: {
    fontSize: FS(14),
    color: '#fff',
  },
});
