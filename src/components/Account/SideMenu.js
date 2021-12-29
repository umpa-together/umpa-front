import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import style from 'constants/styles';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';

export default function SideMenu({ title, onClick }) {
  return (
    <TouchableOpacity style={style.flexRow} onPress={onClick}>
      <View style={styles.circle} />
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  circle: {
    width: 19 * SCALE_WIDTH,
    height: 19 * SCALE_WIDTH,
    borderRadius: 19 * SCALE_HEIGHT,
    borderWidth: 1 * SCALE_WIDTH,
  },
});
