import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import style from 'constants/styles';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';

export default function CreateButton({ opt, buttonStyle }) {
  const text = {
    playlist: '새 플레이리스트 추가',
    daily: '새 데일리 추가',
  };
  return (
    <View style={styles.flexRow}>
      <TouchableOpacity style={buttonStyle} />
      <Text>{text[opt]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  elementcontainer: {
    width: 80 * SCALE_WIDTH,
    height: 80 * SCALE_WIDTH,
    borderWidth: 1 * SCALE_WIDTH,
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
});
