import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import style from 'constants/styles';
import Text from 'components/Text';

export default function Header({ titleStyle, title, exit, action }) {
  return (
    <View style={[style.flexRow, styles.container]}>
      <View style={styles.landings}>{exit}</View>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      <View style={styles.actions}>{action}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 68 * SCALE_HEIGHT,
  },
  landings: {
    position: 'absolute',
    left: 15 * SCALE_WIDTH,
    zIndex: 99,
  },
  title: {
    textAlign: 'center',
    width: '100%',
  },
  actions: {
    position: 'absolute',
    right: 15 * SCALE_WIDTH,
    zIndex: 99,
  },
});
