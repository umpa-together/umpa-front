import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Divider() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    height: 7,
    backgroundColor: '#000',
  },
});
