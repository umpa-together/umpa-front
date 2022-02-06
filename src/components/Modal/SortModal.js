import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import Modal from 'components/Modal';
import Icon from 'widgets/Icon';
import style from 'constants/styles';
import { COLOR_2, MAIN_COLOR } from 'constants/colors';
import Text from 'components/Text';

const ModalView = ({ sortInfo, onClose, actions }) => {
  const { current, func, list } = sortInfo;

  return (
    <View style={styles.viewContainer}>
      {list.map((option) => {
        const { key, title } = option;
        return (
          <TouchableOpacity
            style={[styles.touchArea, style.space_between, style.flexRow]}
            onPress={() => func(key)}
            activeOpacity={0.8}
            key={title}
          >
            <Text style={[styles.option, current === title && styles.active]}>{title}</Text>
            {current === title && (
              <Icon source={require('public/icons/check.png')} style={styles.icon} />
            )}
          </TouchableOpacity>
        );
      })}
      <View style={style.alignCenter}>
        <View style={styles.divider} />
        <TouchableOpacity onPress={onClose} activeOpacity={0.8}>
          <Text style={styles.exit}>닫기</Text>
        </TouchableOpacity>
      </View>
      {actions}
    </View>
  );
};

export default function SortModal({ modal, setModal, sortInfo, actions }) {
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
      <ModalView sortInfo={sortInfo} onClose={onBackdropPress} actions={actions} />
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
    paddingTop: 28 * SCALE_HEIGHT,
    backgroundColor: '#fff',
    borderTopRightRadius: 28 * SCALE_HEIGHT,
    borderTopLeftRadius: 28 * SCALE_HEIGHT,
  },
  touchArea: {
    paddingLeft: 21 * SCALE_WIDTH,
    paddingRight: 7 * SCALE_WIDTH,
    height: 40 * SCALE_HEIGHT,
    marginBottom: 5 * SCALE_HEIGHT,
  },
  divider: {
    width: 343 * SCALE_WIDTH,
    height: 1 * SCALE_HEIGHT,
    backgroundColor: '#DCDCDC',
    marginTop: 25 * SCALE_HEIGHT,
    marginBottom: 17 * SCALE_HEIGHT,
  },
  icon: {
    width: 40 * SCALE_WIDTH,
    height: 40 * SCALE_WIDTH,
  },
  option: {
    fontSize: FS(16),
    color: COLOR_2,
  },
  active: {
    color: MAIN_COLOR,
  },
  exit: {
    fontSize: FS(16),
    color: COLOR_2,
    marginBottom: 50 * SCALE_HEIGHT,
  },
});
