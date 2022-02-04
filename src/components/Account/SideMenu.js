import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import style from 'constants/styles';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { COLOR_3 } from 'constants/colors';
import Icon from 'widgets/Icon';

export default function SideMenu({ title, onClick }) {
  return (
    <TouchableOpacity style={[styles.container, style.flexRow]} onPress={onClick}>
      <Text style={styles.titleText}>{title}</Text>
      <Icon source={require('public/icons/hamburger-next.png')} style={styles.icon} />
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
  icon: {
    width: 20 * SCALE_WIDTH,
    height: 20 * SCALE_WIDTH,
  },
});
