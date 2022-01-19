import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Divider({ containerStyle }) {
  return <View style={[styles.container, containerStyle]} />;
}

const styles = StyleSheet.create({
  container: {
    height: 7,
    backgroundColor: '#EBEBEB',
  },
});
