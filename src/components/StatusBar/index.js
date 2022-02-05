import React from 'react';
import { View, StyleSheet, Platform, StatusBar as RnStatusBar } from 'react-native';

export const StatusBarHeight = Platform.select({
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
    backgroundColor: '#fff',
  },
});

export default StatusBar;
