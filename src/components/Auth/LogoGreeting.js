import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLOR_1 } from 'constants/colors';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import style from 'constants/styles';
import Icon from 'widgets/Icon';

export default function LogoGreeting() {
  return (
    <View style={[style.flexRow, styles.container]}>
      <Icon style={styles.icon} source={require('public/icons/auth-logo.png')} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>음파에 오신</Text>
        <Text style={styles.text}>여러분 반가워요!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 35.5 * SCALE_HEIGHT,
    paddingBottom: 38.5 * SCALE_HEIGHT,
  },
  icon: {
    width: 58 * SCALE_WIDTH,
    height: 58 * SCALE_WIDTH,
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
