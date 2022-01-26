import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import style from 'constants/styles';
import { COLOR_2, MAIN_COLOR } from 'constants/colors';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { navigate } from 'lib/utils/navigation';
import Icon from 'widgets/Icon';

export default function CreateButton({ opt }) {
  const onClickPlaylist = () => {
    navigate('PlaylistCreate');
  };
  const onClickDaily = () => {
    navigate('DailyCreate');
  };
  const createOpt = {
    playlist: { title: '새 플레이리스트 추가', onClick: onClickPlaylist },
    daily: { title: '새 데일리 추가', onClick: onClickDaily },
  };

  return (
    <View style={[styles.container, style.flexRow]}>
      <TouchableOpacity onPress={createOpt[opt].onClick} style={styles.buttonBoxDaily}>
        <Icon style={styles.icon} source={require('public/icons/account-daily-create.png')} />
        <Text style={styles.textDaily}>{createOpt[opt].title}</Text>
      </TouchableOpacity>
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
    width: 336 * SCALE_WIDTH,
    height: 50 * SCALE_WIDTH,
    borderRadius: 4 * SCALE_HEIGHT,
    borderWidth: 1 * SCALE_WIDTH,
    borderColor: MAIN_COLOR,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonBoxPlaylist: {
    width: 85 * SCALE_WIDTH,
    height: 85 * SCALE_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DBDBDB',
  },
  icon: {
    height: 15 * SCALE_HEIGHT,
    width: 15 * SCALE_WIDTH,
  },
  textPlaylist: {
    fontSize: FS(14),
    marginLeft: 15 * SCALE_WIDTH,
    color: COLOR_2,
  },
  textDaily: {
    fontSize: FS(14),
    marginLeft: 15 * SCALE_WIDTH,
    color: MAIN_COLOR,
  },
});
