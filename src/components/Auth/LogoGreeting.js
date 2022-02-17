import { StyleSheet, View } from 'react-native';
import React from 'react';
import { COLOR_1 } from 'constants/colors';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import style from 'constants/styles';
import Icon from 'widgets/Icon';

export default function LogoGreeting() {
  return (
    <View style={[style.flexRow, styles.container]}>
      <Icon style={styles.icon} source={require('public/images/logo.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30 * SCALE_HEIGHT,
    paddingBottom: 25 * SCALE_HEIGHT,
  },
  icon: {
    width: 204 * SCALE_WIDTH,
    height: 57.2 * SCALE_WIDTH,
  },
  textContainer: {
    paddingLeft: 11 * SCALE_WIDTH,
  },
  text: {
    fontSize: FS(18),
    color: COLOR_1,
    lineHeight: 25 * SCALE_HEIGHT,
  },
});
