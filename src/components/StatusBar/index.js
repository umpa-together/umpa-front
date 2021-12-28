import React from 'react';
import { View, StyleSheet, Platform, StatusBar as RnStatusBar } from 'react-native';
import { MAIN_COLOR } from 'constants/colors';

const StatusBarHeight = Platform.select({
  ios: 44,
  android: RnStatusBar.currentHeight,
  default: 0,
});

const StatusBar = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    height: StatusBarHeight,
    backgroundColor: MAIN_COLOR,
  },
});

export default StatusBar;
