import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import style from 'constants/styles';
import { COLOR_2 } from 'constants/colors';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
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
    <View style={[styles.container, style.flexRow]}>
      <TouchableOpacity
        onPress={createOpt[opt].onClick}
        style={opt === 'playlist' ? styles.buttonBoxPlaylist : styles.buttonBoxDaily}
      >
        <View style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.text}>{createOpt[opt].title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16 * SCALE_WIDTH,
    alignItems: 'center',
    marginTop: 22 * SCALE_HEIGHT,
  },
  buttonBoxDaily: {
    width: 85 * SCALE_WIDTH,
    height: 85 * SCALE_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DBDBDB',
  },
  buttonBoxPlaylist: {
    width: 85 * SCALE_WIDTH,
    height: 85 * SCALE_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DBDBDB',
  },
  icon: {
    height: 25 * SCALE_HEIGHT,
    width: 10 * SCALE_WIDTH,
    borderWidth: 1,
  },
  text: {
    fontSize: FS(14),
    marginLeft: 15 * SCALE_WIDTH,
    color: COLOR_2,
  },
});
