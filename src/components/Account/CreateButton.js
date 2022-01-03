import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import style from 'constants/styles';
import { SCALE_WIDTH } from 'lib/utils/normalize';
import { navigate } from 'lib/utils/navigation';

export default function CreateButton({ opt }) {
  const onClickPlaylist = () => {
    navigate('PlaylistCreate');
  };
  const createOpt = {
    playlist: { title: '새 플레이리스트 추가', onClick: onClickPlaylist },
    daily: { title: '새 데일리 추가' },
  };
  return (
    <View style={style.flexRow}>
      <TouchableOpacity
        onPress={createOpt[opt].onClick}
        style={opt === 'playlist' ? styles.buttonBoxPlaylist : styles.buttonBoxDaily}
      />
      <Text>{createOpt[opt].title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonBoxDaily: {
    width: 60 * SCALE_WIDTH,
    height: 60 * SCALE_WIDTH,
    borderWidth: 1 * SCALE_WIDTH,
  },
  buttonBoxPlaylist: {
    width: 80 * SCALE_WIDTH,
    height: 80 * SCALE_WIDTH,
    borderWidth: 1 * SCALE_WIDTH,
  },
});
