import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { MAIN_COLOR } from 'constants/colors';
import Icon from 'widgets/Icon';
import style from 'constants/styles';
import Text from 'components/Text';

export default function NavigateButton({ text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={[style.flexRow, styles.container]}>
      <Text style={styles.textStyle}>{text}</Text>
      <Icon style={styles.icon} source={require('public/icons/empty-data-move.png')} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: MAIN_COLOR,
    borderRadius: 43 * SCALE_HEIGHT,
  },
  textStyle: {
    fontSize: FS(14),
    color: '#fff',
    paddingLeft: 15 * SCALE_WIDTH,
    paddingTop: 7 * SCALE_HEIGHT,
    paddingBottom: 6 * SCALE_HEIGHT,
  },
  icon: {
    width: 18 * SCALE_WIDTH,
    height: 18 * SCALE_WIDTH,
    marginRight: 8 * SCALE_WIDTH,
  },
});
