import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import style from 'constants/styles';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { COLOR_3 } from 'constants/colors';
import Text from 'components/Text';

export default function SideMenu({ title, onClick }) {
  return (
    <TouchableOpacity style={[styles.container, style.flexRow]} onPress={onClick}>
      <Text style={styles.titleText}>{title}</Text>
      <View style={styles.smallicon} />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 17 * SCALE_HEIGHT,
    justifyContent: 'space-between',
    paddingLeft: 26 * SCALE_WIDTH,
    paddingRight: 9 * SCALE_WIDTH,
  },
  titleText: {
    fontSize: FS(14),
    color: COLOR_3,
  },
  smallicon: {
    width: 20 * SCALE_WIDTH,
    height: 20 * SCALE_WIDTH,
    borderWidth: 1,
  },
});
