import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';

export default memo(function Divider({ containerStyle }) {
  return <View style={[styles.container, containerStyle]} />;
});

const styles = StyleSheet.create({
  container: {
    height: 7,
    backgroundColor: '#EBEBEB',
  },
});
